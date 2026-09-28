"""Independent raw-cell, claim-boundary and revision verifier; does not write source drafts."""
from pathlib import Path
import hashlib, json, re, subprocess, sys
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
R = Path(__file__).resolve().parent
I = R / 'inputs'
ORIGINAL = Path('/data/hermes/research/seo-growth/2026-09-28-midday-discovery')
S = '/data/hermes/skills/research/grounded-citations/scripts/sources.py'
checks = []
def ck(name, condition):
    checks.append({'check': name, 'pass': bool(condition)})
def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()
def text(n):
    return ' '.join(''.join(n.itertext()).split())
for name, expected in json.loads((I/'artifact-hashes.json').read_text()).items():
    ck('snapshot hash '+name, sha(I/name) == expected)
    ck('source unchanged '+name, sha(ORIGINAL/name) == expected)
for row in json.loads((I/'retrieval-manifest.json').read_text()):
    ck('raw retrieval hash '+row['name'], sha(I/row['raw_path']) == row['sha256'])
root = ET.parse(I/'evidence/sunflower-emulsions.xml').getroot()
ck('full primary article body', root.find('body') is not None and len(text(root.find('body'))) > 20000)
ck('DOI identity', any(text(n)=='10.3390/foods14050824' for n in root.findall('.//article-id')))
ck('publication year', root.find('.//article-meta/pub-date/year').text=='2025')
raw_tables = {}
for t in root.findall('.//table-wrap'):
    raw_tables[t.get('id')] = [[text(c) for c in tr if c.tag in ('td','th')] for tr in t.findall('.//tr')]
expected_rows = {
 'E-YSF': ['E-YSF', '0.90 ± 0.01 d', '3.39 ± 0.02 b', '−35.70 ± 0.26 c', '0.03 ± <0.01 e', '0.79 ± 0.01 b', '29.6 ± 1.8 e'],
 'E-GSF': ['E-GSF', '1.34 ± 0.02 c', '2.67 ± 0.02 cd', '−33.67 ± 0.71 ab', '0.36 ± 0.01 c', '0.59 ± <0.01 f', '135.2 ± 12.6 c']
}
t2 = raw_tables['foods-14-00824-t002']
ck('Table2 metric header exact', t2[0] == ['Composition','D32 (μm)','Span','Zeta Potential (mV)','k (Pa.sn)','n','η at 10 s−1(mPa.s)'])
for key, expected in expected_rows.items():
    actual = next(row for row in t2 if row[0]==key)
    for idx, cell in enumerate(expected):
        ck(f'original JATS {key} cell {idx}', actual[idx] == cell)
# Compare the separately archived parser output to fresh parsing, not to flattened text.
parsed = json.loads((R/'original-cells.json').read_text())
for t in parsed['jats']:
    ck('saved raw-cell extraction '+t['id'], [[c['text'] for c in row] for row in t['rows']] == raw_tables[t['id']])
recipe = raw_tables['foods-14-00824-t001']
for key in ['E-YSF','E-GSF']:
    row = next(row for row in recipe if row[0] == key)
    ck(key+' no CNC or CNF original cells', row[-2:] == ['', ''])
foot = text(root.find(".//table-wrap[@id='foods-14-00824-t002']/table-wrap-foot"))
ck('original column footnote', foot=='Means with the same letters in the same column do not show statistical differences (p > 0.05).')
article = text(root)
for phrase in ['3000 rpm for 20 min','2% (w/w) protein solution','3, 5, 7, 9, and 11','1 h at room temperature','Kjeldahl method','rheological assessments were made at 25 °C','nominal power during emulsification was 525 W','frequency of 20 kHz','homogenization was carried out for 2 min','minimum of three measurements per sample','Tukey’s test','135.2–296.5 Pa.s','All other chemicals used were of analytical grade','80.5% proteins','SUNPROTEIN']:
    ck('raw methods/prose '+phrase, phrase in article)
soup = BeautifulSoup((I/'evidence/aot-comparison.html').read_bytes(),'html.parser')
aot = [[c.get_text(' ',strip=True) for c in row.find_all(['th','td'],recursive=False)] for row in soup.find('table').find_all('tr')]
ck('supplier all column labels', aot[0] == ['', 'Heliaflor®  45','Heliaflor®  50 HO','Heliaflor®  Extrufix 50 HO','Heliaflor®  55'])
ck('supplier independently parsed archive', aot == [[c['text'] for c in row] for row in parsed['supplier'][0]])
for row,col,needle in [(3,1,'min 45 % dry mass'),(3,4,'min 55 % dry mass'),(3,1,'approx. 10 %'),(3,4,'max. approx. 2 %'),(4,1,'> 160 %'),(4,4,'> 200 %'),(2,1,'appearance: beige'),(1,4,'CO²-extracted')]:
    ck(f'AOT raw row {row} column {col}: '+needle, needle in aot[row][col])
for q in json.loads((I/'quote-ledger.json').read_text()):
    if 'quote' in q:
        ck('input quote '+q['location'], q['quote'] in (I/q['text_path']).read_text())
        # Independently match against original source text, allowing only whitespace changes.
        if q['source_id']==4:
            raw = article
        else:
            name={1:'aot-process',2:'aot-comparison',3:'sunbloom-products'}[q['source_id']]
            raw=BeautifulSoup((I/f'evidence/{name}.html').read_bytes(),'html.parser').get_text(' ',strip=True)
        compact=lambda v: re.sub(r'\s+','',v)
        ck('quote in raw original '+q['location'], compact(q['quote']) in compact(raw))
ledger=json.loads((R/'ledger.json').read_text())
ck('unchanged source identity mapping',[(s['id'],s['url']) for s in ledger['sources']]==[(s['id'],s['url']) for s in json.loads((I/'ledger.json').read_text())['sources']])
logs={}
for lang in ['en','zh']:
    f=R/f'sunflower-protein-selection.{lang}.md'
    draft=f.read_text()
    result=subprocess.run([sys.executable,S,'--ledger',str(R/'ledger.json'),'verify',str(f),'--strict','--evidence'],capture_output=True,text=True)
    logs[lang]=result.stdout+result.stderr
    ck('citation/evidence gate '+lang,result.returncode==0)
    # Parse both proposed displays; numeric table must preserve coordinate relationships.
    tables=[];current=[]
    for line in draft.splitlines()+['']:
        if line.startswith('|'):
            current.append([c.strip() for c in line.strip('|').split('|')])
        elif current:
            tables.append(current);current=[]
    ck('exactly two displays '+lang,len(tables)==2)
    ck('commercial table four attributed grade rows '+lang,len(tables[0])==6 and all(len(row)==3 for row in tables[0]))
    ck('scientific table two metric rows '+lang,len(tables[1])==4 and all(len(row)==3 for row in tables[1]))
    for idx,key in enumerate(['E-YSF','E-GSF'],1):
        ck('metric-column label '+lang+key,key in tables[1][0][idx])
        source=expected_rows[key]
        for dest,src,unit in [(2,1,'µm'),(3,6,'mPa·s')]:
            num,letter=source[src].rsplit(' ',1)
            expected=f'{num} {unit}, group {letter}' if lang=='en' else f'{num} {unit}，{letter} 组'
            ck('original-to-display cell '+lang+key+str(dest),tables[1][dest][idx]==expected)
    for required in (['across each row','as-supplied basis','minimums do not tell','food-grade or food-contact','not a controlled test','25 °C','p < 0.05','absolute viscosity values need clarification'] if lang=='en' else ['同一行内横向比较字母','按原样计','两个蛋白含量下限','食品级或食品接触','不能把全部性能差异都归因于绿原酸','25 °C','p < 0.05','应先澄清这一差异']):
        ck('corrected boundary '+lang+required,required in draft)
    ck('no erroneous display orientation '+lang,('within each column' not in draft if lang=='en' else '同一列中字母不同' not in draft))
    ck('no unsupported milling claim in title '+lang,('milling' not in draft.splitlines()[0] if lang=='en' else '细化' not in draft.splitlines()[0]))
report={'status':'PASS' if all(x['pass'] for x in checks) else 'FAIL','passed':sum(x['pass'] for x in checks),'total':len(checks),'scope':'Independent parsing of archived original HTML/JATS, exact display coordinates, method and boundary regression, citation and SHA256 checks. Human editorial/source judgment is in VERDICT.md; no publication approval.','checks':checks,'citation_logs':logs,'draft_sha256':{f.name:sha(f) for f in R.glob('sunflower-protein-selection.*.md')}}
(R/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:report[k] for k in ['status','passed','total','draft_sha256']},ensure_ascii=False,indent=2))
for c in checks:
    if not c['pass']:print('FAILED',c['check'])
sys.exit(0 if report['status']=='PASS' else 1)
