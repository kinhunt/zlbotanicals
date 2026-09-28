"""Read-only independent regression checks. Run: python verify.py. Requires beautifulsoup4."""
from pathlib import Path
import hashlib,json,re,xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
R=Path(__file__).resolve().parent
checks=[]
def check(name,condition):
    assert condition,name
    checks.append(name)
def sha(b): return hashlib.sha256(b).hexdigest()
m=json.loads((R/'revision-manifest.json').read_text())
for f,h in m['files'].items(): check('frozen hash '+f,sha((R/f).read_bytes())==h)
s=BeautifulSoup((R/'sources/PMC7447712.html').read_bytes(),'html.parser')
x=ET.parse(R/'sources/PMC11971048.xml').getroot()
tables=[[[c.get_text(' ',strip=True) for c in row.find_all(['th','td'],recursive=False)] for row in t.select('tr')] for t in s.select('table')]
check('original cell archive',tables==json.loads((R/'original-table-cells.json').read_text()))
check('Table5 headers',tables[6][0][:6]==['Blend','Color','Odor','Crispness','Taste','Overall acceptability'])
for row,exp in zip(tables[6][1:],[['Control','7.83 a','7.43 a'],['B1','5.50 b','6.53 b'],['B2','3.70 c','5.87 c'],['B3','3.40 c','4.90 d']]):
    check('Table5 original cells '+exp[0],[row[0],row[4],row[5]]==exp)
check('Table2 sensory header',tables[3][1]==['Color','Appearance','Odor','Crispness','Taste','Overall acceptability'])
check('Table2 temperature row',tables[3][3]==['Temp','0.001','0.007','0.906','0.430','0.471','0.109'])
check('Table2 interactions nonsignificant',all(float(v)>0.05 for v in tables[3][4][1:]))
check('Table5 temperature colour/appearance', [r[6:] for r in tables[6][1:4]]==[['150 ( o C)','7.13 a','6.73 a'],['175 ( o C)','7.38 a','6.88 a'],['200 ( o C)','5.88 b','6.18 b']])
for c in json.loads((R/'claim-ledger.json').read_text()):
    h=c.pop('claim_sha256')
    check(c['id']+' claim hash',sha(json.dumps(c,sort_keys=True,ensure_ascii=False).encode())==h)
    check(c['id']+' source hash',sha((R/c['source']).read_bytes())==c['source_sha256'])
    loc=c['locator']
    if loc.startswith('#'): evidence=s.find(id=loc[1:]).get_text(' ',strip=True)
    elif loc.startswith('.//p'): evidence=''.join(x.findall('.//p')[int(re.search(r'\[(\d+)\]',loc)[1])].itertext())
    else: evidence=tables[int(re.search(r'index(\d+)',loc)[1])]
    check(c['id']+' original locator evidence',evidence==c['evidence'])
for lang in ['en','zh']:
    text=(R/f'draft.{lang}.md').read_text()
    rows=[l for l in text.splitlines() if l.startswith('|')]
    check(lang+' exactly one four-row table',len(rows)==6)
    for i,(taste,overall) in enumerate([('7.83','7.43'),('5.50','6.53'),('3.70','5.87'),('3.40','4.90')]):
        check(lang+' draft table row '+str(i),[v.strip() for v in rows[i+2].split('|')][2:4]==[taste,overall])
    check(lang+' p values',all(v in text for v in ['0.906','0.471','0.109']))
    check(lang+' citation IDs',set(re.findall(r'\[(\d+)\]',text))=={'1','2'})
    ledger=json.loads((R/'ledger.json').read_text())
    for source in ledger['sources']: check(lang+' reference '+str(source['id']),f"[{source['id']}] {source['url']}" in text)
check('scope EN','percentages of the flour blend' in (R/'draft.en.md').read_text())
check('scope ZH','百分比以混合粉为基准' in (R/'draft.zh.md').read_text())
print(json.dumps({'result':'PASS','checks':len(checks),'checked':checks,'note':'Mechanical invariants supplement the independent full bilingual editorial/source review in REVIEW.md; no browser/render or release claim.'},ensure_ascii=False,indent=2))
