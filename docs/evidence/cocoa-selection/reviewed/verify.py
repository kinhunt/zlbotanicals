"""Read-only checks; writes nothing. Run from any working directory."""
from pathlib import Path
import json, hashlib, subprocess, re
P=Path(__file__).parent
R=Path('/data/hermes/research/seo-growth/2026-09-23-midday-discovery/new-material')
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert json.loads((P/'original-hashes.json').read_text())=={str(p.relative_to(R)):sha(p) for p in R.rglob('*') if p.is_file()}
L=json.loads((P/'sources-ledger.json').read_text())
paths={1:'d11a-spec.txt',2:'s8.txt',3:'acticoa-extracted.txt',4:'fsai.txt',5:'miller-abstract.txt'}
assert [s['id'] for s in L['sources']]==[1,2,3,4,5]
for s in L['sources']:
 text=(P/'evidence'/paths[s['id']]).read_text()
 for q in s['quotes']: assert q['text'] in text,(s['id'],'quote mismatch')
for lang in ['en','zh']:
 f=P/f'draft-{lang}.md'
 result=subprocess.run(['python','/data/hermes/skills/research/grounded-citations/scripts/sources.py','--ledger',str(P/'sources-ledger.json'),'verify',str(f),'--strict','--evidence'],capture_output=True,text=True)
 print(result.stdout,result.stderr)
 assert result.returncode==0
 text=f.read_text(); assert set(re.findall(r'\[(\d+)\]',text))==set('12345')
 assert 'ZL' not in text
 for s in L['sources'][:3]: assert ']('+s['url']+')' in text
 print(f.name,sha(f))
assert round(2.1/100*5*1000,6)==105
assert round(.2/100*5*1000,6)==10
assert round(375/730*100,1)==51.4
print('PASS: complete literal quotes, citation identities, supplier links, calculations, no ZL supply claim, all original files unchanged.')
