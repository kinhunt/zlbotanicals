#!/usr/bin/env python3
"""Archive/quote/citation/cell integrity, not independent editorial approval."""
import hashlib,json,pathlib,re,subprocess,sys
B=pathlib.Path(__file__).resolve().parent
checks=[]
def check(name,ok):
    checks.append({'name':name,'pass':bool(ok)})
for s in json.loads((B/'retrieval-manifest.json').read_text()):
    data=(B/s['file']).read_bytes()
    check('source hash '+s['name'],hashlib.sha256(data).hexdigest()==s['sha256'])
    check('source response '+s['name'],s['status']==200 and len(data)==s['bytes'])
for c in json.loads((B/'source-claim-ledger.json').read_text()):
    check('quote '+c['claim_id'],c['quote'] in (B/c['source_text']).read_text())
import pymupdf
pdf=pymupdf.open(B/'alcohol-paper.raw')
text=pdf[2].get_text()
t=json.loads((B/'table-conditions.json').read_text())
for name,values in t['rows'].items():
    expected='\n'.join([name]+[str(v) for v in values])
    check('original PDF cells '+name,expected in text)
check('table label conflict','Table 3' in text and 'Table 4' in text)
check('incomplete original unit','COMPOUNDS IN μG/' in text)
check('geraniol dip preserved',t['rows']['Geraniol'][-1]<t['rows']['Geraniol'][-2])
check('real PDF',(B/'alcohol-paper.raw').read_bytes().startswith(b'%PDF-'))
S=pathlib.Path('/data/hermes/skills/research/grounded-citations/scripts/sources.py')
for name in ['draft.en.md','draft.zh.md','DISCOVERY.md']:
    r=subprocess.run([sys.executable,str(S),'--ledger',str(B/'ledger.json'),'verify',str(B/name),'--evidence'],capture_output=True,text=True)
    (B/(name+'.verification.txt')).write_text(r.stdout+r.stderr)
    check('citation evidence '+name,r.returncode==0)
    if name.startswith('draft'):
        d=(B/name).read_text()
        for values in t['rows'].values():
            for v in values[1:]:
                check(name+' table number '+str(v),str(v) in d)
result={'passed':sum(x['pass'] for x in checks),'total':len(checks),'checks':checks,'independent_source_editorial_approval':False}
(B/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print(json.dumps(result,ensure_ascii=False,indent=2))
sys.exit(0 if all(x['pass'] for x in checks) else 1)
