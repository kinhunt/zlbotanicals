#!/usr/bin/env python3
"""Offline source-byte, original-cell, quote and bilingual-table regression checks.
Run: python verify.py. Hash manifest is frozen separately; this script never updates it.
Passing does not constitute scientific/editorial approval.
"""
from pathlib import Path
import hashlib,json,re,xml.etree.ElementTree as ET
from decimal import Decimal
B=Path(__file__).resolve().parent
checks=[]
def check(ok,label):
    checks.append({'check':label,'pass':bool(ok)})
    if not ok: raise AssertionError(label)
def text(n): return ''.join(n.itertext())
def tables(root):
    return [{'id':t.get('id'),'label':t.findtext('label'),'caption':text(t.find('caption')) if t.find('caption') is not None else '', 'rows':[[{'text':text(c),'tag':c.tag,**c.attrib} for c in row if c.tag in ['td','th']] for row in t.findall('.//tr')], 'footnotes':[text(x) for x in t.findall('table-wrap-foot')]} for t in root.findall('.//table-wrap')]
for name,sha in json.loads((B/'hashes.json').read_text()).items():
    check(hashlib.sha256((B/name).read_bytes()).hexdigest()==sha,'sha256 '+name)
for pmc in ['PMC12071967','PMC8875529','PMC7912806','PMC11759640']:
    root=ET.parse(B/'sources'/f'{pmc}.xml').getroot()
    check(root.find('.//body') is not None,pmc+' full body')
    parsed=tables(root);saved=json.loads((B/'sources'/f'{pmc}.tables.json').read_text())
    check(parsed==saved,pmc+' all original table cells/attributes/footnotes')
root=ET.parse(B/'sources/PMC12071967.xml').getroot()
rows=root.find('.//table-wrap[@id="foods-14-01447-t002"]').findall('.//tr')[1:5]
expected=json.loads((B/'data/tiger-nut-counts.json').read_text())
normalized=[]
for row,saved in zip(rows,expected):
    cells=[text(c) for c in row];check(cells[-6]==saved['starter'],'starter identity '+saved['starter'])
    out=[]
    for cell,key in zip(list(row)[-3:],['no_added_glucose','glucose_7_5_g_per_100mL','glucose_15_g_per_100mL']):
        check(text(cell)==saved[key],saved['starter']+' '+key+' exact original cell')
        # Preserve exponent boundaries directly from original <sup> nodes.
        s=ET.tostring(cell,encoding='unicode');s=re.sub(r'<sup>(.*?)</sup>',r'^\1',s);s=re.sub(r'<[^>]+>','',s)
        mean,spread=s.split(' ± ')
        def norm(part):
            if ' × 10^' not in part:return Decimal(part)/Decimal(10)**8
            m,e=part.split(' × 10^');return Decimal(m)*Decimal(10)**int(e)/Decimal(10)**8
        out.append((norm(mean),norm(spread)))
    normalized.append((saved['starter'],out))
for lang in ['en','zh']:
    draft=(B/f'tiger-nut-fermentation.{lang}.md').read_text()
    for starter,values in normalized:
        line=next(x for x in draft.splitlines() if x.startswith('| '+starter+' |'))
        cells=line.strip('|').split('|')[1:]
        for shown,(mean,spread) in zip(cells,values):
            a,b=shown.strip().split(' ± ')
            check(Decimal(a)==mean and Decimal(b)==spread,lang+' normalized '+starter+' '+shown.strip())
    ids=set(map(int,re.findall(r'\[(\d+)\]',draft)))
    check(ids=={1,5,6},lang+' exact source scope')
    check('0–3' in draft and '0–100' in draft,lang+' sensory contradiction retained')
    check('CFU/mL' in draft and 'INFOGEST 2.0' in draft,lang+' digestion denominator/protocol retained')
    check('7.5 g/100 mL' in draft and '15 g/100 mL' in draft,lang+' glucose additions explicit')
for claim in json.loads((B/'claims.json').read_text()):
    check(claim['quote'] in (B/claim['file']).read_text(),claim['id']+' literal quote')
# Regression for the known counterexample, no significance inference.
check(normalized[3][1][1][0] < normalized[3][1][0][0] < normalized[3][1][2][0],'VEGE061 middle-glucose not maximum mean')
# The displayed abstract range must not overwrite a negative original film-table finding.
film=ET.parse(B/'sources/PMC8875529.xml').getroot()
check(any('29.38 ± 1.91' in text(c) for c in film.findall('.//table-wrap[@id="membranes-12-00213-t003"]//td')),'film lower inhibition original cell')
ledger=json.loads((B/'ledger.json').read_text())['sources']
check(len({x['id'] for x in ledger})==len(ledger),'unique source IDs')
check(len({x['url'] for x in ledger})==len(ledger),'unique source URLs')
for sid in [1,5,6]:check(bool(next(s for s in ledger if s['id']==sid)['quotes']),'source evidence '+str(sid))
report={'status':'PASS','checks':len(checks),'scope':'offline provenance and exact original-cell regression; not independent content approval','results':checks}
(B/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({k:v for k,v in report.items() if k!='results'},ensure_ascii=False))
