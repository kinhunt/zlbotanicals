#!/usr/bin/env python3
"""Read-only offline integrity, literal quote, original-cell and draft regression checks.
Stdlib only. Does NOT establish independent factual/editorial/publication approval.
Run: python verify.py
"""
from pathlib import Path
import json, hashlib, re, xml.etree.ElementTree as ET
B=Path(__file__).resolve().parent
checks=[]
def check(ok,label):
 checks.append({'check':label,'pass':bool(ok)})
 if not ok: raise AssertionError(label)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
for m in json.loads((B/'source-manifest.json').read_text()):
 check(sha(B/m['file'])==m['sha256'],'source SHA256 '+m['file'])
for m in json.loads((B/'artifact-manifest.json').read_text()):
 check(sha(B/m['file'])==m['sha256'],'artifact SHA256 '+m['file'])
claims=json.loads((B/'claims.json').read_text())
for c in claims:
 if 'quote'in c:check(c['quote'] in (B/c['evidence_file']).read_text(),'literal quote '+c['id'])
 if 'table_id'in c:
  root=ET.parse(B/c['evidence_file']).getroot();t=root.find(f'.//table-wrap[@id="{c["table_id"]}"]')
  rows=[[''.join(x.itertext()) for x in r if x.tag in ['td','th']] for r in t.findall('.//tr')]
  check(rows==c['rows'],'original table rows '+c['table_id'])
 if 'visual_files'in c:
  for f in c['visual_files']:check((B/f).read_bytes().startswith(b'\x89PNG'),'rendered PDF image '+f)
x=json.loads(json.loads((B/'inherited/pumpkin-search-completed.json').read_text())['output'])['result']['result']
check(x['count']==len(x['items'])==8,'8 original search rows')
check([i['asin'] for i in x['items'] if 'Sprout Living' in i['title']]==['B01N7CLYX7','B0BHFG8DNT'],'2 Sprout size variants')
for name,asin in [('sprout','B01N7CLYX7'),('anthony','B0CWVTCT7G'),('micro','B0FWJGBPWM')]:
 p=json.loads(json.loads((B/'sources'/f'{name}.json').read_text())['output'])['result']['result']
 check(p['asin']==asin and not p['blocked'],'detail identity '+asin)
 check((B/'sources'/f'{name}.json').read_bytes()==(B/'inherited'/f'{asin}.json').read_bytes(),'exact inherited bytes '+asin)
check(json.loads((B/'sources/sprout.txt').read_text())['details']['Protein Source']=='Blend','unresolved Blend field')
# Numeric regressions re-read original XML cells, never the derived table JSON.
r=ET.parse(B/'sources/PMC9777787.xml').getroot()
def rows(tid):return [[''.join(c.itertext()) for c in tr] for tr in r.find(f'.//table-wrap[@id="{tid}"]').findall('.//tr')]
t=rows('foods-11-04029-t001')
check(t[3]==['Protein','60.24 ± 0.05 a','68.68 ± 0.13 b'],'Table1 protein cells')
check(t[2]==['Fat','13.38 ± 0.12 a','0.77 ± 0.14 b'],'Table1 fat cells')
t=rows('foods-11-04029-t002')
check(t[4][1]=='8.05 ± 0.72 c' and t[1][1]=='4.82 ± 0.44 b','AE+US d10 grows not shrinks')
check(t[4][3]=='179.93 ± 13.24 a','AE+US d90')
t=rows('foods-11-04029-t003')
check(t[4][2]=='6.59 ± 0.99 d' and t[5][2]=='4.90 ± 0.05 c','UAE higher at pH5')
check(t[4][4].endswith(' c') and t[5][4].endswith(' c'),'pH9 same group not superiority')
r=ET.parse(B/'sources/PMC11748320.xml').getroot()
t=rows('tbl4')
check(t[1][2]=='10.32\u00a0±\u00a00.05c' and t[2][1]=='9.75\u00a0±\u00a00.02d' and t[3][1]=='15.99\u00a0±\u00a00.04a','second study alkali UT CH MH original cells')
check(r.find('.//table-wrap[@id="tbl4"]//tbody/tr/td[2]').get('rowspan')=='3','alkali spans three treatment rows')
for name,expected in [('austrade-unroasted',['≥ 60%','≤ 10%','≤ 10%']),('austrade-roasted',['≥ 57%','≤ 8%','≤ 17%'])]:
 cells=json.loads((B/'sources'/f'{name}-cells.json').read_text());html=(B/'sources'/f'{name}.html').read_text()
 check([x['value'] for x in cells[:3]]==expected,'supplier limits '+name)
 for c in cells:check(c['label'] in html and c['value'].split()[-1] in html,'supplier literal cell '+name+' '+c['label'])
for lang in ['en','zh']:
 draft=(B/f'draft.{lang}.md').read_text();body=draft.split('## Sources')[0]
 ids=set(re.findall(r'\[(\d+)\]',body))
 check(ids==set(map(str,[1,2,3,4,5,6,8,9,10,11])),'cited source set '+lang)
 for number in ['60.24','68.68','13.38','0.77','2.42','15.17','37.82','6.59','18.80','46.87','4.90','23.07','46.93','179.93','8.05','4.82','10.32','9.75','15.99']:
  check(number in body,'bilingual numeric presence '+lang+' '+number)
 for asin in ['B01N7CLYX7','B0CWVTCT7G','B0FWJGBPWM']:
  check('https://www.amazon.com/dp/'+asin in body,'contextual product link '+lang+' '+asin)
 check('≥80%' in body and '≥57%' in body,'actual supplier comparators '+lang)
 check('[7]' not in body,'blocked source unused '+lang)
print(json.dumps({'status':'PASS','checks':len(checks),'scope':'offline integrity, literal quote, source-cell and draft regressions; not independent acceptance','results':checks},ensure_ascii=False,indent=2))
