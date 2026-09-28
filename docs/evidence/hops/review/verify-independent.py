#!/usr/bin/env python3
"""Read-only verification; stdout is the report. No source or ledger mutations."""
import hashlib,json,pathlib,re,subprocess,sys
from bs4 import BeautifulSoup
import pymupdf
R=pathlib.Path(__file__).resolve().parent
P=R.parent.parent/'2026-09-28-afternoon-discovery'/'hops'
checks=[]
def check(name,ok): checks.append({'check':name,'pass':bool(ok)})
def sha(f): return hashlib.sha256(f.read_bytes()).hexdigest()
before=json.loads((R/'original-hashes.before.json').read_text())
after={str(f.relative_to(P)):sha(f) for f in P.rglob('*') if f.is_file()}
check('All original files unchanged, including verifier outputs',before==after)
for s in json.loads((P/'retrieval-manifest.json').read_text()):
 check('Raw-byte hash '+s['name'],sha(P/s['file'])==s['sha256'])
 check('Raw-byte size '+s['name'],(P/s['file']).stat().st_size==s['bytes'])
pdf=pymupdf.open(P/'alcohol-paper.raw'); text=pdf[2].get_text()
check('Four-page PDF',len(pdf)==4)
conditions=json.loads((P/'table-conditions.json').read_text())
for row,vals in conditions['rows'].items():
 check('Original PDF row including base n.d.: '+row,'\n'.join([row]+list(map(str,vals))) in text)
check('Incomplete source unit preserved','COMPOUNDS IN μG/' in text)
check('Original table-label conflict','Table 3' in text and 'Table 4' in text)
for c in json.loads((P/'source-claim-ledger.json').read_text())+json.loads((R/'additional-evidence.json').read_text()):
 check('Literal source quote '+str(c.get('claim_id',c['source_id'])),c['quote'] in (P/c['source_text']).read_text())
 if c['source_id'] in [5,6,7]:
  raw=P/(pathlib.Path(c['source_text']).stem+'.raw')
  rendered=' '.join(BeautifulSoup(raw.read_bytes(),'html.parser').get_text(' ',strip=True).split())
  check('Quote exists in parsed ORIGINAL supplier HTML '+str(c.get('claim_id',c['source_id'])),' '.join(c['quote'].split()) in rendered)
check('Dose conversion pellets',250/100==2.5)
check('Dose conversion diluted oil',3/100==0.03 and 6/100==0.06)
S=pathlib.Path('/data/hermes/skills/research/grounded-citations/scripts/sources.py')
for n in ['draft.en.md','draft.zh.md']:
 d=(R/n).read_text()
 v=subprocess.run([sys.executable,str(S),'--ledger',str(R/'ledger.json'),'verify',str(R/n),'--evidence'],capture_output=True,text=True)
 check('Citation evidence '+n,v.returncode==0)
 check('One qualitative matrix, no ambiguous quantitative table '+n,len([x for x in d.splitlines() if x.startswith('|')])==5 and '13718' not in d)
 check('Dose/basis parity '+n,all(x in d for x in ['0.03','0.06','250','2.5','30.0 ± 2.0%'] if x!='30.0 ± 2.0%'))
 check('No public workflow approval language '+n,not any(x in d for x in ['Research draft','publication-approved','证据档案','研究初稿','发布批准']))
result={'passed':sum(x['pass'] for x in checks),'total':len(checks),'checks':checks,'scope':'Offline original-byte, quote, original-cell, unit and corrected-draft checks; not fresh HTTP, scientific replication or publication approval','corrected_draft_hashes':{n:sha(R/n) for n in ['draft.en.md','draft.zh.md']}}
print(json.dumps(result,ensure_ascii=False,indent=2))
sys.exit(0 if all(c['pass'] for c in checks) else 1)
