from pathlib import Path
import hashlib,json,re,subprocess,xml.etree.ElementTree as ET
P=Path(__file__).resolve().parent
checks=[]
def check(name,ok,detail=''):
 checks.append(dict(check=name,passed=bool(ok),detail=detail))
def norm(t):return ' '.join(t.split())
def rows(name,tid):
 t=next(x for x in ET.parse(P/'sources'/f'{name}.xml').findall('.//table-wrap') if x.get('id')==tid)
 return [[norm(''.join(c.itertext())) for c in row] for row in t.findall('.//tr')]
for m in json.loads((P/'source-manifest.json').read_text()):
 check('original-byte SHA '+m['name'],hashlib.sha256((P/m['file']).read_bytes()).hexdigest()==m['sha256'])
for i,e in enumerate(json.loads((P/'independent-evidence.json').read_text())):
 if e['kind']=='table': ok=rows(e['source'],e['id'])==e['rows']
 elif e['kind']=='paragraph':ok=any(''.join(p.itertext())==e['quote'] for p in ET.parse(P/'sources'/f"{e['source']}.xml").findall('.//p'))
 else:ok=e['quote'] in (P/'sources/bfr.html').read_text()
 check('independent evidence '+str(i),ok)
r=rows('extraction','Tab4');d=[x for x in r if len(x)==9]
check('nine original material rows',len(d)==9)
check('TCG original means',[[float(x[5].split(' ± ')[0]) for x in d[i:i+3]] for i in (0,3,6)]==[[11.09,11.59,9.11],[.60,.62,.56],[89.83,79.23,71.25]])
check('HCN original means',[[int(x[6].split(' ± ')[0]) for x in d[i:i+3]] for i in (0,3,6)]==[[300,313,246],[16,17,15],[2428,2141,1926]])
check('recovery is separate column',[x[8].split(' %')[0] for x in d[6:]]==['69.8','66.4','69.8'])
# HCN molecular mass check is arithmetic only, not a free-HCN measurement.
check('HCN equivalent arithmetic',all(abs(float(x[5].split(' ± ')[0])*27.03-int(x[6].split(' ± ')[0]))<1 for x in d))
check('abstract milli versus table micro','mmol' in ''.join(ET.parse(P/'sources/extraction.xml').find('.//abstract').itertext()) and any('μmol' in c for row in r for c in row))
r=rows('efsa','efs25004-tbl-0001')
check('EFSA batch 3 exact eleven',r[4]==['3','97','11'])
check('EFSA four censored batches',sum(row[-1]=='< 10' for row in r)==4)
r=rows('extrusion','Tab1')
check('140C result and oil',any(x[0]=='140' and '31.5' in x[1] and '29.8' in x[4] for x in r))
check('separate lower moisture row',any(x[0]=='Feed moisture (%)' and x[1]=='10' and '26.4' in x[2] for x in r))
check('84 percent',round((198.4-31.5)/198.4*100)==84)
r=rows('fermentation','foods-15-00632-t002')
check('ND is 500 each',sum('ND (<500)' in ' '.join(x) for x in r)==2)
check('HCN separate less-than-ten',any(x[0]=='Total HCN (mg/kg)' and x[2]=='<10' for x in r))
for lang in ['en','zh']:
 f=P/f'draft.{lang}.md';t=f.read_text();body=t.split('## Sources')[0]
 run=subprocess.run(['python','/data/hermes/skills/research/grounded-citations/scripts/sources.py','--ledger',str(P/'ledger.json'),'verify',str(f),'--evidence'],capture_output=True,text=True)
 check('citation evidence '+lang,run.returncode==0,run.stdout+run.stderr)
 check('cited sources '+lang,set(re.findall(r'\[(\d+)\]',body))=={'1','2','4','5','6'})
 check('single deliberate compact table '+lang,sum(x.startswith('|') for x in body.splitlines())==5)
 check('table means in both languages '+lang,all(x in body for x in ['9.11–11.59','0.56–0.62','71.25–89.83','246–313','15–17','1926–2428']))
 check('corrected numerical boundaries '+lang,all(x in body for x in ['26.4 ± 0.3','500 mg/kg','<10 mg/kg','66.4–69.8','178']))
 check('six body sections '+lang,len(re.findall(r'^## ',body,re.M))==6)
check('EN explicit EFSA conflict','one at 11 mg/kg, although the accompanying prose says' in (P/'draft.en.md').read_text())
check('ZH explicit EFSA conflict','另一批为11 mg/kg；但相邻正文' in (P/'draft.zh.md').read_text())
result={'status':'PASS' if all(c['passed'] for c in checks) else 'FAIL','checks':checks,'count':len(checks),'draft_sha256':{f.name:hashlib.sha256(f.read_bytes()).hexdigest() for f in P.glob('draft.*.md')}}
(P/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print(json.dumps({k:v for k,v in result.items() if k!='checks'},indent=2));print('FAILURES',json.dumps([c for c in checks if not c['passed']]))
raise SystemExit(result['status']!='PASS')
