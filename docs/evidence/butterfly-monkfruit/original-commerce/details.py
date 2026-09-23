from collect_receipt import *
import contextlib,io
for asin in ['B07B4D9TF3','B0CP9Q47LK','B098H7XWQ6','B0CLBVY6VY']:
    with contextlib.redirect_stdout(io.StringIO()):
        start=run('detail-'+asin+'-dispatch',['script','run','--platform','amazon','--marketplace','us','--action','get_product','--asin',asin,'--json'])
    result=start['stdout'].get('result',{})
    if 'executionId' not in result:
        print(json.dumps(start));break
    with contextlib.redirect_stdout(io.StringIO()):
        end=run('detail-'+asin,['execution','wait',result['executionId'],'--json'])
    print(json.dumps(end,ensure_ascii=False))
    r=end['stdout'].get('result',{})
    if r.get('status')!='completed' or r.get('result',{}).get('blocked'):break
for file in ROOT.glob('*.json'):
    file.write_text(json.dumps(sanitize(json.loads(file.read_text())),ensure_ascii=False,indent=2))
