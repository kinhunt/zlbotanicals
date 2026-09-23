import subprocess,json,pathlib,sys
b=pathlib.Path(__file__).parent
for asin in ['B0019LPMDY','B0C15XRRDJ','B010YH0BS4']:
 def call(name,args):
  p=subprocess.run([sys.executable,str(b/'safe_cli.py'),name,*args],capture_output=True,text=True)
  o=json.loads(p.stdout); d=json.loads(o['output']);
  if not d.get('ok'): print(d);sys.exit(1)
  return d
 d=call(asin+'-dispatch',['script','run','--platform','amazon','--action','get_product','--marketplace','us','--params-json',json.dumps({'asin':asin}),'--json'])
 eid=d['result']['executionId']
 d=call(asin+'-detail',['execution','wait',eid,'--json'])
 print(json.dumps(d,ensure_ascii=False))
 if d['result'].get('status')!='completed':sys.exit(1)
