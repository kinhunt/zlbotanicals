import subprocess,json,re,sys,pathlib,datetime
base=pathlib.Path(__file__).parent
cfg=json.loads(pathlib.Path.home().joinpath('.browserman/config.json').read_text())
secrets=[]
def collect(v):
 if isinstance(v,dict):
  for k,x in v.items():
   if re.search('token|extensionkey',k,re.I) and isinstance(x,str): secrets.append(x)
   else: collect(x)
 elif isinstance(v,list):
  for x in v: collect(x)
collect(cfg)
args=sys.argv[2:]
p=subprocess.run(['browserman',*args],capture_output=True,text=True,timeout=180)
s=p.stdout+'\n'+p.stderr
for x in secrets:
 if x:s=s.replace(x,'[REDACTED]')
s=re.sub(r'("(?:token|extensionKey)"\s*:\s*")[^"]*',r'\1[REDACTED]',s,flags=re.I)
out={'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'command':['browserman',*args],'returncode':p.returncode,'output':s}
base.joinpath(sys.argv[1]+'.json').write_text(json.dumps(out,ensure_ascii=False,indent=2))
print(json.dumps(out,ensure_ascii=False))
