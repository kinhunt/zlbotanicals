import subprocess,json,pathlib,datetime,re,sys
ROOT=pathlib.Path(__file__).resolve().parent

def sanitize(x):
    if isinstance(x,dict):
        return {k:('[REDACTED]' if re.search(r'token|authorization|cookie|password|email|browserId|socketId|instanceId|extensionId|extensionKey',k,re.I) or k=='id' and isinstance(v,str) and re.fullmatch(r'[0-9a-f-]{36}',v) else sanitize(v)) for k,v in x.items()}
    if isinstance(x,list): return [sanitize(v) for v in x]
    if isinstance(x,str): return re.sub(r'\b[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}\b','[REDACTED-UUID]',x)
    return x

def run(name,args):
    p=subprocess.run(['browserman']+args,capture_output=True,text=True,timeout=90)
    try: out=json.loads(p.stdout)
    except ValueError: out=p.stdout
    receipt=sanitize({'timestamp_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'command':['browserman']+args,'exit_code':p.returncode,'stdout':out,'stderr':p.stderr})
    (ROOT/(name+'.json')).write_text(json.dumps(receipt,ensure_ascii=False,indent=2))
    print(json.dumps(receipt,ensure_ascii=False))
    return receipt
if __name__=='__main__': run(sys.argv[1],sys.argv[2:])
