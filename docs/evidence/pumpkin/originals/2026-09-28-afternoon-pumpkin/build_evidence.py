"""Authoring utility; rewrites local derived evidence and Sources. Not the read-only verifier."""
from pathlib import Path
import json, subprocess, xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
B=Path(__file__).resolve().parent
S='/data/hermes/skills/research/grounded-citations/scripts/sources.py'
claims=[]
for name,sid in [('sprout',1),('anthony',2),('micro',3)]:
 d=json.loads((B/'sources'/f'{name}.txt').read_text())
 for i,q in enumerate(dict.fromkeys(d['bullets'])):
  claims.append(dict(id=f'R{sid}-{i}',source=sid,evidence_file=f'sources/{name}.txt',quote=q,claim='Seller wording and positioning only',limitation='No inspected labels, independent nutrition, certification or performance verification'))
 for key in ['Protein Source','Total Servings Per Container']:
  if key in d['details']:claims.append(dict(id=f'R{sid}-{key}',source=sid,evidence_file=f'sources/{name}.txt',quote=f'"{key}": "{d["details"][key]}"',claim='Captured field; preserve mismatch or missing serving denominator',limitation='No physical composition inference'))
for name,sid in [('PMC9777787',4),('PMC11748320',5)]:
 root=ET.parse(B/'sources'/f'{name}.xml').getroot()
 paras=[' '.join(''.join(p.itertext()).split()) for p in root.findall('.//body//p')]
 (B/'sources'/f'{name}-paragraphs.txt').write_text('\n'.join(paras))
 needles=['Milled press cake from pumpkin','To identify the most appropriate conditions','Protein solubility was determined using','Following one day of storage','A solvent-to-solid ratio of 29'] if sid==4 else ['WSI was determined','For the analysis, the Lowry method','First, pumpkin seed flour was mixed','When the results of different heat treatments']
 for i,needle in enumerate(needles):
  q=next(p for p in paras if needle in p)
  claims.append(dict(id=f'P{sid}-{i}',source=sid,evidence_file=f'sources/{name}-paragraphs.txt',quote=q,claim=needle,limitation='Experimental material and conditions only; second paper generalized preheat prose conflicts with Table4 alkali cells'))
 cells=[]
 for t in root.findall('.//table-wrap'):
  for ri,row in enumerate(t.findall('.//tr')):
   for ci,c in enumerate(row):
    if c.tag in ['td','th']:cells.append(dict(table=t.get('id'),row=ri,cell=ci,text=''.join(c.itertext()),rowspan=c.get('rowspan','1'),colspan=c.get('colspan','1')))
 (B/'sources'/f'{name}-cells.json').write_text(json.dumps(cells,ensure_ascii=False,indent=2))
 for t in json.loads((B/'sources'/f'{name}-tables.json').read_text()):
  if t['id'] in ['foods-11-04029-t001','foods-11-04029-t002','foods-11-04029-t003','tbl4']:
   claims.append(dict(id='T-'+t['id'],source=sid,claim=t['caption'],evidence_file=f'sources/{name}.xml',table_id=t['id'],rows=t['rows'],notes=t['notes'],limitation='Original cell order and spans retained; statistics within columns except2022Table1 within rows. n not commercial batches.'))
for name,sid in [('austrade-unroasted',8),('austrade-roasted',9)]:
 soup=BeautifulSoup((B/'sources'/f'{name}.html').read_bytes(),'html.parser')
 cells=[{'label':el.select_one('.composition-type').get_text(' ',strip=True),'value':el.select_one('.composition-amount').get_text(' ',strip=True),'html':str(el)} for el in soup.select('.composition-item')]
 (B/'sources'/f'{name}-cells.json').write_text(json.dumps(cells,ensure_ascii=False,indent=2))
 text=(B/'sources'/f'{name}.txt').read_text()
 start=text.index('comes from');end=text.index('Request TDS',start)
 claims.append(dict(id=f'S{sid}',source=sid,evidence_file=f'sources/{name}.txt',quote=text[start:end],claim='Named material, processing, sensory positioning',limitation='Supplier assertion, no independent manufacturing audit or batch analysis'))
 start=text.index('Specifications');end=text.index('These statements',start)
 claims.append(dict(id=f'S{sid}-limits',source=sid,evidence_file=f'sources/{name}.txt',quote=text[start:end],claim='Published protein, moisture and fat limits',limitation='Method and dry/as-supplied basis unspecified; bounds do not rank actual batches',cells=cells))
text=(B/'sources/frontiers-milling.txt').read_text();a=text.index('The coffee grinder was pushed');z=text.index('Figure 2 Protein isolation',a)
claims.append(dict(id='P10',source=10,evidence_file='sources/frontiers-milling.txt',quote=text[a:z],claim='Thorough cooled grinding before isolation and changed protein profile',limitation='Grinding/cooling confounded; cell-culture-media application, no food-grade or retail dispersibility inference'))
x=json.loads(json.loads((B/'inherited/pumpkin-search-completed.json').read_text())['output'])['result']['result'];(B/'sources/search.txt').write_text(json.dumps(x,ensure_ascii=False,indent=2))
claims.append(dict(id='R11',source=11,evidence_file='sources/search.txt',quote=x['items'][4]['title'],claim='Eight rows, two Sprout size variants; three selected distinct-brand details',limitation='Not8brands; no market share; only3details'))
claims.append(dict(id='S6-visual',source=6,evidence_file='sources/cambridge.pdf',pages=[1,3,4],claim='Title60%; rendered protein spec≥80%; protein65 under Amount per100g without own unit; machine sieving→expression→cake→milling',limitation='2020 historical inconsistent document, not current spec. Text layer >80% loses equals stroke visible in rendered page.',visual_files=['sources/cambridge-page1.png','sources/cambridge-page3.png','sources/cambridge-page4.png']))
(B/'claims.json').write_text(json.dumps(claims,ensure_ascii=False,indent=2))
for sid in [1,2,3,4,5,6,8,9,10,11]:
 if sid==6:q='Cambridge Commodities, Inc.\n3071 Venture Dr. Ste. 100\nLincoln, CA 95648';f=B/'sources/cambridge.txt'
 else:
  c=next(c for c in claims if c['source']==sid and 'quote' in c and len(c['quote'].split())>8);q=c['quote'];f=B/c['evidence_file']
 r=subprocess.run(['python',S,'--ledger',str(B/'citations.json'),'quote',str(sid),'--text',q,'--from',str(f)],capture_output=True,text=True)
 print(sid,r.returncode,r.stdout,r.stderr);assert r.returncode==0
for lang in ['en','zh']:
 p=B/f'draft.{lang}.md'
 r=subprocess.run(['python',S,'--ledger',str(B/'citations.json'),'render','--replace-in',str(p),'--cited-in',str(p)],capture_output=True,text=True);print(r.stdout,r.stderr);assert r.returncode==0
