import requests,json,hashlib,shutil,concurrent.futures
from pathlib import Path
from bs4 import BeautifulSoup
from datetime import datetime,timezone
D=Path(__file__).parent
P=D.parent/'2026-09-20-policy-check'
shutil.copy2(P/'ledger.json',D/'ledger.json')
L=json.loads((D/'ledger.json').read_text())
def fetch(s):
 r=requests.get(s['url'],timeout=60);r.raise_for_status();r.encoding='utf-8'
 soup=BeautifulSoup(r.text,'html.parser'); main=soup.find('main') or soup.find('body') or soup
 text=main.get_text('\n',strip=True)
 (D/f"source-{s['id']}.html").write_text(r.text)
 (D/f"source-{s['id']}.txt").write_text(text)
 return {'id':s['id'],'url':r.url,'status':r.status_code,'retrieved_utc':datetime.now(timezone.utc).isoformat(),'html_sha256':hashlib.sha256(r.content).hexdigest(),'text_sha256':hashlib.sha256(text.encode()).hexdigest(),'chars':len(text)}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 records=list(pool.map(fetch,L['sources']))
(D/'retrieval.json').write_text(json.dumps(records,indent=2))
print(json.dumps(records,indent=2))
