from pathlib import Path
import json,hashlib,re
from PIL import Image
SRC=Path('/data/hermes/research/seo-growth/2026-09-23-night-commerce')
OUT=Path(__file__).resolve().parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
manifest=json.loads((SRC/'image-manifest.json').read_text())
rows=[];identities=[]
for asin in dict.fromkeys(x['asin'] for x in manifest):
    subset=[x for x in manifest if x['asin']==asin]
    g=json.loads(json.loads((SRC/subset[0]['rawFile']).read_text())['output'])['result']['result']
    d=json.loads(json.loads((SRC/f'{asin}-detail.json').read_text())['output'])['result']['result']
    assert g['asin']==d['asin']==asin
    assert '/dp/'+asin in g['url']
    identities.append({'asin':asin,'galleryTitle':g['title'],'detailTitle':d.get('title'),'url':g['url'],'galleryCount':len(g['initial']),'status':'PASS','nowUPCInDetail':('733739047229' in json.dumps(d)) if asin=='B0019LPMDY' else None})
    for x in subset:
        m=re.fullmatch(r'initial\[(\d+)\]\.(\w+)',x['rawField']); item=g['initial'][int(m[1])]
        checks={'hash':sha(SRC/x['file'])==x['sha256'],'url':item[m[2]]==x['url'],'variant':item['variant']==x['variant'],'title':g['title']==x['title'],'pageUrl':g['url']==x['pageUrl'],'dimensions':list(Image.open(SRC/x['file']).size)==x['dimensions']}
        assert all(checks.values()), (x,checks)
        rows.append({**x,'computedSha256':sha(SRC/x['file']),'checks':checks,'status':'PASS'})
sourcefiles=sorted(p for p in SRC.rglob('*') if p.is_file())
sourcehashes={str(p.relative_to(SRC)):sha(p) for p in sourcefiles}
old=[]
for line in (SRC/'SHA256SUMS').read_text().splitlines():
    if not line.strip():continue
    h,name=line.split(maxsplit=1); name=name.lstrip('*'); p=Path(name);p=p if p.is_absolute() else SRC/p
    old.append({'path':name,'status':'PASS' if p.exists() and sha(p)==h else 'FAIL'})
assert all(x['status']=='PASS' for x in old),old
result={'scope':'Independent read-only archived evidence verification; no live-page or physical-bottle verification','sourceRoot':str(SRC),'identities':identities,'images':rows,'sourceFilesSHA256':sourcehashes,'upstreamSHA256SUMS':old,'imagesPassed':len(rows),'moduleSha256':sha(OUT/'MODULE-ENZH.md')}
(OUT/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'identities':identities,'imagesPassed':len(rows),'upstreamHashesPassed':len(old),'sourceFilesHashed':len(sourcefiles),'moduleSha256':result['moduleSha256']},ensure_ascii=False,indent=2))
