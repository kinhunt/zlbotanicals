from pathlib import Path
import hashlib,json,subprocess,re
R=Path(__file__).parent
S='/data/hermes/skills/research/grounded-citations/scripts/sources.py'
checks=[]
def ck(name,ok):
 checks.append({'check':name,'pass':bool(ok)})
for m in json.loads((R/'retrieval-manifest.json').read_text()):
 ck('raw hash '+m['name'],hashlib.sha256((R/m['raw_path']).read_bytes()).hexdigest()==m['sha256'])
for i,q in enumerate(json.loads((R/'quote-ledger.json').read_text())):
 if 'quote' in q:ck('verbatim passage '+str(i),q['quote'] in (R/q['text_path']).read_text())
 else:
  tables=json.loads((R/q['table_path']).read_text());ck('original table cells '+str(i),any(q['cells'] in t['rows'] for t in tables))
rows=json.loads((R/'evidence/aot-comparison.tables.json').read_text())
ck('supplier columns mapped',rows[0][-1]=='Heliaflor®  55' and rows[0][1]=='Heliaflor®  45')
ck('supplier protein dry basis', 'min 45 % dry mass' in rows[3][1] and 'min 55 % dry mass' in rows[3][4])
ck('supplier thresholds retained','> 160 %' in rows[4][1] and '> 200 %' in rows[4][4])
logs={}
for lang in ['en','zh']:
 f=R/f'sunflower-protein-selection.{lang}.md'
 result=subprocess.run(['python',S,'--ledger',str(R/'ledger.json'),'render','--replace-in',str(f)],capture_output=True,text=True)
 ck('render sources '+lang,result.returncode==0)
 result=subprocess.run(['python',S,'--ledger',str(R/'ledger.json'),'verify',str(f),'--evidence','--strict'],capture_output=True,text=True)
 logs[lang]=result.stdout+result.stderr;ck('citation evidence gate '+lang,result.returncode==0)
 t=f.read_text();ck('four sources '+lang,set(re.findall(r'\[(\d+)\]',t))=={'1','2','3','4'})
 for value in ['0.90 ± 0.01','1.34 ± 0.02','29.6 ± 1.8','135.2 ± 12.6','mPa·s','pH 11']:
  ck(lang+' bounded numeric '+value,value in t)
 ck('substantial draft '+lang,len(t)>8000 if lang=='en' else len(re.findall(r'[\u4e00-\u9fff]',t))>1800)
report={'status':'PASS' if all(c['pass'] for c in checks) else 'FAIL','scope':'Mechanical provenance and exact numeric/citation checks only; not independent factual or language approval','checks':checks,'citation_logs':logs,'draft_sha256':{f.name:hashlib.sha256(f.read_bytes()).hexdigest() for f in R.glob('sunflower-protein-selection.*.md')}}
(R/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({'status':report['status'],'passed':sum(c['pass'] for c in checks),'total':len(checks),'citation_logs':logs},ensure_ascii=False,indent=2))
raise SystemExit(0 if report['status']=='PASS' else 1)
