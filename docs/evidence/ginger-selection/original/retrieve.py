from pathlib import Path
import requests, json, hashlib, datetime, xml.etree.ElementTree as ET, subprocess
ROOT=Path(__file__).parent
RAW=ROOT/'raw';RAW.mkdir(exist_ok=True)
manifest=[]
def get(url,name,params=None):
 r=requests.get(url,params=params,timeout=90); r.raise_for_status(); p=RAW/name;p.write_bytes(r.content)
 manifest.append(dict(url=r.url,file=str(p.relative_to(ROOT)),sha256=hashlib.sha256(r.content).hexdigest(),status=r.status_code,retrieved_utc=datetime.datetime.now(datetime.timezone.utc).isoformat()))
 return r
queries=['ginger drying volatile gingerol shogaol OPEN_ACCESS:Y FIRST_PDATE:[1900-01-01 TO 2026-09-23]','TITLE_ABS:ginger AND (TITLE_ABS:aroma OR TITLE_ABS:volatile) AND (TITLE_ABS:heating OR TITLE_ABS:drying) AND OPEN_ACCESS:Y FIRST_PDATE:[1900-01-01 TO 2026-09-23]']
for i,q in enumerate(queries):
 j=get('https://www.ebi.ac.uk/europepmc/webservices/rest/search',f'search-{i}.json',{'query':q,'format':'json','pageSize':80}).json()
 print('\nSEARCH',i,[(x.get('pmcid'),x['title']) for x in j.get('resultList',{}).get('result',[])])
repo=Path('/data/hermes/workspaces/zl-pomegranate-release/src/content/blog')
inventory=[]
for p in sorted(repo.rglob('*.md')):
 text=p.read_text(); inventory.append({'file':str(p.relative_to(repo)),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'frontmatter':text.split('---')[1] if text.startswith('---') else text[:500],'ginger_mentions':[s for s in text.splitlines() if 'ginger' in s.lower() or '生姜' in s or '姜辣' in s]})
(ROOT/'dedup-inventory.json').write_text(json.dumps(inventory,ensure_ascii=False,indent=2))
(ROOT/'retrieval-manifest.json').write_text(json.dumps(manifest,indent=2))
