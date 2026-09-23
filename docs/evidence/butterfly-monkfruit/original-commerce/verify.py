from collect_receipt import *
import hashlib
# Redact server-provided key previews; no credential config is read.
for p in ROOT.glob('*.json'):
    data=sanitize(json.loads(p.read_text()))
    def scrub(x):
        if isinstance(x,dict): return {k:('[REDACTED]' if k=='keyPreview' else scrub(v)) for k,v in x.items()}
        if isinstance(x,list):return [scrub(v) for v in x]
        return x
    p.write_text(json.dumps(scrub(data),ensure_ascii=False,indent=2))
m=json.loads((ROOT/'image-manifest.json').read_text())
for row in m:
    assert hashlib.sha256(pathlib.Path(row['path']).read_bytes()).hexdigest()==row['sha256']
    row['visual_status']='contact_sheet_individual_tile_inspected'
    if (row['asin']=='B07B4D9TF3' and row['path'].endswith('-02.jpg')) or (row['asin']!='B07B4D9TF3' and row['path'].endswith('-01.jpg')):row['visual_status']='original_full_resolution_label_inspected'
    row['observations_file']=str(ROOT/'image-observations.md')
(ROOT/'image-manifest.json').write_text(json.dumps(m,ensure_ascii=False,indent=2))
search=json.loads((ROOT/'07-search-result.json').read_text())['stdout']['result']['result']
rows=json.loads((ROOT/'14-gallery-result.json').read_text())['stdout']['result']['result']['rows']
assert len(rows)==4 and all(r['asin']==r['requestedAsin'] and r['title'] for r in rows)
assert all(any(s['asin']==r['asin'] for s in search['items']) for r in rows)
assert len(m)==31
checks={'search_count':len(search['items']),'search_page':search['page'],'detail_count':4,'brands':['NOW','DureLife','Lakanto'],'matching_dom_asin_title_url':True,'original_images':len(m),'image_hashes_reverified':True,'visual_contact_tiles_inspected':31,'original_labels_separately_inspected':4,'browser_task_ended_utc':'2026-09-23T16:07:54Z','release_note':'local script returned success; standard CLI lifecycle handles completion/cleanup. No dedicated lease-state field exposed by browser list. No further page commands issued.'}
(ROOT/'verification.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2))
sums={str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(ROOT.rglob('*')) if p.is_file() and p.name!='SHA256SUMS.json' and '__pycache__' not in str(p)}
(ROOT/'SHA256SUMS.json').write_text(json.dumps(sums,ensure_ascii=False,indent=2))
print(json.dumps(checks,ensure_ascii=False));print('hashed_files',len(sums))
