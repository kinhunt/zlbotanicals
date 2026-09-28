from pathlib import Path
import requests, json, hashlib, datetime, subprocess
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET
ROOT=Path(__file__).parent
S='/data/hermes/skills/research/grounded-citations/scripts/sources.py'
sources=[
('aot-process','https://www.all-organic-treasures.com/food/heliaflor/sunflowerproteins.html'),
('aot-comparison','https://www.all-organic-treasures.com/food/heliaflor/sunflowerproteins-in-comparison.html'),
('sunbloom-products','https://www.sunbloom-proteins.com/sunflower-protein/products/'),
('sunflower-emulsions','https://www.ebi.ac.uk/europepmc/webservices/rest/PMC11899123/fullTextXML'),
('sunflower-cake','https://www.ebi.ac.uk/europepmc/webservices/rest/PMC8882756/fullTextXML')]
(ROOT/'evidence').mkdir(exist_ok=True)
manifest=[]
for name,url in sources:
 r=requests.get(url,timeout=60); ext='xml' if 'fullTextXML' in url else 'html'
 raw=ROOT/'evidence'/f'{name}.{ext}';raw.write_bytes(r.content)
 row={'name':name,'url':url,'final_url':r.url,'status':r.status_code,'content_type':r.headers.get('content-type'),'retrieved_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'raw_path':str(raw.relative_to(ROOT)),'sha256':hashlib.sha256(r.content).hexdigest(),'bytes':len(r.content)}
 if r.status_code==200:
  if ext=='xml':
   tree=ET.fromstring(r.content); text='\n\n'.join(''.join(e.itertext()) for e in tree.iter() if e.tag in ['article-title','abstract','title','p','table-wrap'])
   tables=[]
   for t in tree.iter('table-wrap'):
    tables.append({'id':t.get('id'),'caption':''.join(t.find('caption').itertext()) if t.find('caption') is not None else '', 'rows':[[''.join(c.itertext()) for c in tr if c.tag in ('td','th')] for tr in t.iter('tr')]})
   (ROOT/'evidence'/f'{name}.tables.json').write_text(json.dumps(tables,ensure_ascii=False,indent=2))
  else:
   soup=BeautifulSoup(r.content,'html.parser')
   for e in soup(['script','style','nav','footer','header']):e.decompose()
   text=soup.get_text(' ',strip=True)
  path=ROOT/'evidence'/f'{name}.txt';path.write_text(text)
  row['text_path']=str(path.relative_to(ROOT))
  p=subprocess.run(['python',S,'--ledger',str(ROOT/'ledger.json'),'add',url,'--title',name],capture_output=True,text=True)
  row['ledger_output']=p.stdout.strip(); print(name,row['ledger_output'],len(text))
 manifest.append(row)
(ROOT/'retrieval-manifest.json').write_text(json.dumps(manifest,indent=2))
