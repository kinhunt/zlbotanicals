"""Read-only verification; emits JSON to stdout, never rewrites reviewed artifacts."""
from pathlib import Path
import hashlib,json,re,subprocess,sys,xml.etree.ElementTree as ET
R=Path(__file__).resolve().parent
checks=[]
def check(name,ok): checks.append({'check':name,'pass':bool(ok)})
for row in json.loads((R/'artifact-manifest.json').read_text()):
 p=R/row['path'];check('sha256:'+row['path'],p.is_file() and hashlib.sha256(p.read_bytes()).hexdigest()==row['sha256'])
orig=json.loads((R/'inputs/source-manifest.json').read_text())
for row in orig:
 if row['id'] in ['S1','S2','S3']:check('original source hash:'+row['id'],hashlib.sha256((R/row['archive']).read_bytes()).hexdigest()==row['sha256'])
def rows(sid,suffix):
 root=ET.parse(R/'sources'/f'{sid}.xml').getroot()
 t=next(t for t in root.findall('.//table-wrap') if t.get('id').endswith(suffix))
 return [[''.join(c.itertext()).strip() for c in tr if c.tag in ['td','th']] for tr in t.findall('.//tr')]
s1=rows('S1','t001')
v=next(r for r in s1 if r[0].startswith('Specific volume'))
f=next(r for r in s1 if r[0]=='Crumb firmness (N)')
check('S1 volume cells and letters',v[1:5]==['1.41 c ± 0.02','2.15 b ± 0.12','2.06 b ± 0.04','2.08 b ± 0.05'])
check('S1 firmness cells and letters',f[1:5]==['24.72 a ± 2.10','8.27 b ± 0.89','8.33 b ± 0.71','6.12 c ± 0.58'])
s2=rows('S2','t006');fc=next(r for r in s2 if r[0]=='FC');f2=next(r for r in s2 if r[0]=='F2')
check('S2 gumminess significant letters',fc[4]=='35.3 ± 4.9 b' and f2[4]=='40.7 ± 7.5 c')
check('S2 hardness shared letters',fc[1]=='58.9 ± 7.9 b' and f2[1]=='64.7 ± 13.8 b')
form=rows('S2','t001');check('S2 formulation exact rows',['FC','3.2','3.6','9.8','159.7'] in form and ['F2','3.2','3.6','13.2','173.6'] in form)
s3=rows('S3','t003');nine=[r[1] for r in s3 if r[0]=='9%']
check('S3 original9percent hydration cells',nine==['74.9 ± 1.46 cd','75.8 ± 0.62 c','98.1 ± 1.89 a'])
for lang in ['en','zh']:
 text=(R/f'corrected.{lang}.md').read_text()
 for raw in v[1:5]+f[1:5]:
  plain=re.sub(r' ([a-z]+) ±',' ±',raw);check(lang+' table '+plain,plain in text)
 for number in ['2.86','82.14','7.14','91.10','17.14','117.86','74.9','75.8','98.1','61.2','159.7','173.6','40.7 ± 7.5','35.3 ± 4.9','91.2','5.5','3.3','17.9']:
  check(lang+' number '+number,number in text)
 check(lang+' no internal draft label','Research draft' not in text and '研究草稿' not in text)
 cmd=['python','/data/hermes/skills/research/grounded-citations/scripts/sources.py','--ledger',str(R/'citation-ledger.json'),'verify',str(R/f'corrected.{lang}.md'),'--strict','--evidence']
 p=subprocess.run(cmd,capture_output=True,text=True);check(lang+' strict citation/evidence',p.returncode==0)
for asin in ['B000N7DP6G','B007729DSE','B06XXN9CTG']:
 j=json.loads((R/'sources'/f'{asin}-result.json').read_text())['result']['result'];check('ASIN identity:'+asin,j['asin']==asin and j['canonicalUrl'].endswith(asin));check('Powder attribute:'+asin,j['details']['Item Form']=='Powder')
for name in ['psyllium-search-result.json','powder-search-result.json']:
 j=json.loads((R/'sources'/name).read_text())['result']['result'];check(name+' eight records',j['count']==8 and len(j['items'])==8)
ledger=json.loads((R/'review-ledger.json').read_text());check('26 review entries final PASS',len(ledger)==26 and all(x['final_verdict']=='PASS' for x in ledger))
for c in ledger:
 if 'original_xml_quote' in c:
  root=ET.parse(R/'sources'/f"{c['source']}.xml").getroot();check('complete original quote '+c['id'],c['original_xml_quote'] in [''.join(p.itertext()) for p in root.findall('.//p')])
result={'status':'PASS' if all(c['pass'] for c in checks) else 'REVISE','passed':sum(c['pass'] for c in checks),'total':len(checks),'checks':checks,'scope':'Integrity and exact-source regression only; semantic/editorial decisions are recorded in REVIEW.md.'}
print(json.dumps(result,ensure_ascii=False,indent=2));sys.exit(0 if result['status']=='PASS' else 1)
