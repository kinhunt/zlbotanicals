from pathlib import Path
import json, subprocess, hashlib
from bs4 import BeautifulSoup
R=Path(__file__).parent
S='/data/hermes/skills/research/grounded-citations/scripts/sources.py'
Q=[]
def quote(i,name,start,end,claim,location):
 t=(R/'evidence'/f'{name}.txt').read_text();a=t.index(start);b=t.index(end,a)+len(end);q=t[a:b]
 p=subprocess.run(['python',S,'--ledger',str(R/'ledger.json'),'quote',str(i),'--text',q,'--from',str(R/'evidence'/f'{name}.txt')],capture_output=True,text=True)
 assert p.returncode==0,p.stdout+p.stderr
 Q.append({'source_id':i,'claim':claim,'location':location,'quote':q,'text_path':f'evidence/{name}.txt'})
quote(1,'aot-process','For the production','product-friendly process.','Cold pressing then oxygen-excluded controlled grinding','Production paragraph')
quote(1,'aot-process','Heliaflor® 45 is characterised','little foreign colouring.','45/55 sensory/process positioning and qualitative binding claims','45 and 55 paragraphs')
quote(2,'aot-comparison','Nutrition Energy','Water binding capacity','Protein dry basis and approximate residual fat: supplier values, not batch results','Nutrition row; cell map archived')
quote(2,'aot-comparison','Water binding capacity','Amino acids','Binding thresholds; tension with qualitative ranking; no declared assay conditions','Water/fat binding table rows')
quote(3,'sunbloom-products','Sunbloom® PRO is','fruit preparations.','PRO medium/high viscosity versus finer BEV low-viscosity positioning','Named product paragraphs')
quote(4,'sunflower-emulsions','The compounds and chemicals','analytical grade.','SUNPROTEIN commercial Y/G materials; composition supplier provided','2.1')
quote(4,'sunflower-emulsions','The solubility profile','Equation (1).','2% w/w, five pHs, 1h room-temperature stirring, centrifuged supernatant Kjeldahl','2.2.2')
quote(4,'sunflower-emulsions','The aqueous phase of emulsions','Section 2.4.','pH11 emulsion preparation; ultrasonication; duplicate preparations; not drink recipe','2.3')
quote(4,'sunflower-emulsions','Each experiment was conducted','among the treatments.','Duplicate experiments, at least three readings not independent industrial batches','2.7')
quote(4,'sunflower-emulsions','The sunflower protein used in our study','Figure 2a.','YSF clarification process and higher CGA in GSF','3.1')
quote(4,'sunflower-emulsions','As presented in Figure 2b','protein–phenolic complexes [9,10].','Reduced solubility near pH5; maxima at pH11; do not transfer to neutral beverage','3.1')
quote(4,'sunflower-emulsions','Emulsions made with GSF demonstrated','Table 2).','Narrative has Pa.s versus table mPa.s conflict; table values govern bounded example','3.2')
soup=BeautifulSoup((R/'evidence/aot-comparison.html').read_bytes(),'html.parser')
rows=[[x.get_text(' ',strip=True) for x in tr.select('td,th')] for tr in soup.select('tr')]
(R/'evidence/aot-comparison.tables.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2))
tables=json.loads((R/'evidence/sunflower-emulsions.tables.json').read_text())
t=next(x for x in tables if x['id']=='foods-14-00824-t002') if any(x['id']=='foods-14-00824-t002' for x in tables) else tables[1]
for row in t['rows']:
 if row and row[0] in ['E-YSF','E-GSF']:
  Q.append({'source_id':4,'claim':'Table2 exact values including significance groups; mPa.s header not prose Pa.s','location':'Table2 '+row[0],'cells':row,'table_path':'evidence/sunflower-emulsions.tables.json'})
(R/'quote-ledger.json').write_text(json.dumps(Q,ensure_ascii=False,indent=2))
print('Verified textual quotes',sum('quote' in q for q in Q),'table rows',sum('cells' in q for q in Q));print(json.dumps(t,ensure_ascii=False))
