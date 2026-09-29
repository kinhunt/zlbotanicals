#!/usr/bin/env python3
"""Read-only offline verifier. No author verification code is imported or run."""
from pathlib import Path
import hashlib,json,re,xml.etree.ElementTree as ET
P=Path(__file__).resolve().parent
norm=lambda s:' '.join(s.split())
def text(e): return norm(' '.join(e.itertext()))
checks=0
def check(ok,msg):
 global checks
 checks+=1
 if not ok: raise AssertionError(msg)
manifest=json.loads((P/'hashes.json').read_text())
for name,h in manifest['review_files'].items():
 check(hashlib.sha256((P/name).read_bytes()).hexdigest()==h,'Review hash '+name)
for name,h in manifest['original_files'].items():
 check(hashlib.sha256((Path(manifest['original_directory'])/name).read_bytes()).hexdigest()==h,'Original changed '+name)
roots={n:ET.parse(P/'sources'/f'{n}.xml').getroot() for n in ['PMC8065946','PMC9913908']}
physical=json.loads((P/'physical-tables.json').read_text())
for t in physical:
 el=roots[t['paper']].find(f".//table-wrap[@id='{t['id']}']")
 rows=[[{'text':text(c),'rowspan':int(c.get('rowspan','1')),'colspan':int(c.get('colspan','1'))} for c in row] for row in el.findall('.//tr')]
 check(rows==t['rows'],'Physical structure '+t['id'])
 check(text(el.find('caption'))==t['caption'],'Caption '+t['id'])
 check(text(el.find('table-wrap-foot'))==t['foot'],'Footnote '+t['id'])
for c in json.loads((P/'approved-cells.json').read_text()):
 el=roots[c['paper']].find(f".//table-wrap[@id='{c['table']}']")
 check(text(list(el.findall('.//tr')[c['row']])[c['physical_cell']])==c['text'],'Approved coordinate '+str(c))
# Verify every quantitative Markdown exhibit against physical XML cells, not text presence.
for lang in ['en','zh']:
 s=(P/f'draft.{lang}.md').read_text()
 tables=re.findall(r'(?:^\|.*\n)+',s,re.M)
 check(len(tables)==3,'Exhibit count '+lang)
 parsed=[[ [x.strip() for x in line.strip().strip('|').split('|')] for line in table.strip().splitlines()[2:]] for table in tables]
 t7=roots['PMC8065946'].find(".//table-wrap[@id='foods-10-00716-t007']").findall('.//tr')
 check([r[1:] for r in parsed[0]]==[[text(list(t7[r])[c]) for c in [1,2]] for r in range(2,6)],'Mixolab '+lang)
 t8=roots['PMC8065946'].find(".//table-wrap[@id='foods-10-00716-t008']").findall('.//tr')
 check([r[1:] for r in parsed[1]]==[[text(list(t8[r])[c]) for c in range(1,5)] for r in [12,10,7]],'Sensory '+lang)
 t1=roots['PMC9913908'].find(".//table-wrap[@id='foods-12-00533-t001']").findall('.//tr')
 check(parsed[2]==[[text(list(t1[r])[c]) for c in [0,3,6]] for r in range(2,7)],'Replacement '+lang)
 for r in parsed[2]: check(abs(float(r[1])+float(r[2])-4.8)<1e-9,'Allocation sum')
 check(set(re.findall(r'\[(\d+)\]',s))=={'1','2','3'},'Citation IDs '+lang)
 check('12..63' not in s,'Malformed value excluded from public numeric prose')
 check('4.70 ± 0.57' in s and '3.93 ± 0.19' in s,'Protein means')
 check('22 ± 1 °C' in s and '25 °C' in s,'Temperature conflict')
# Source defects remain literal in evidence, never silently repaired.
ice=text(roots['PMC9913908'])
check('12..63' in ice,'Malformed source preserved')
check('means ± SD' in ice and 'Duncan' in ice,'Ice statistics')
check('14% moisture' in text(roots['PMC8065946']),'Moisture basis')
print(json.dumps({'status':'PASS','checks':checks,'physical_tables':len(physical),'physical_cells':sum(len(r) for t in physical for r in t['rows']),'scope':'hashes, original preservation, physical cells/spans, captions/footnotes, all 3 bilingual quantitative exhibits and targeted regressions; not factual approval by itself'},indent=2))
