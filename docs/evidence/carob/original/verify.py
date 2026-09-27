from pathlib import Path
import hashlib,json,re,subprocess,xml.etree.ElementTree as ET
B=Path(__file__).resolve().parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
checks=[]
def check(name,value):
    assert value,name
    checks.append(name)
original=json.loads((B/'original-input-hashes.json').read_text())
for path,digest in original.items():check('original unchanged: '+path,sha(Path(path))==digest)
manifest=json.loads((B/'source-manifest.json').read_text())
for item in manifest:check('source hash: '+item['path'],sha(B/item['path'])==item['sha256'])
tables={}
for name in ['cake','muffin','efsa']:
    root=ET.parse(B/'sources'/f'{name}.xml').getroot()
    check(name+' body present',root.find('body') is not None)
    tables[name]=[[[''.join(c.itertext()) for c in tr if c.tag in ['td','th']] for tr in t.iter('tr')] for t in root.iter('table')]
    check(name+' original JATS matches every saved table cell',tables[name]==json.loads((B/'sources'/f'{name}-tables.json').read_text()))
t=tables['cake']
for row,pct in zip(t[0][1:],[0,2.5,7.5,12.5,17.5]):
    vals=[0 if x=='-' else float(x) for x in row[1:]]
    check('recipe '+row[0]+' listed total300',sum(vals)==300)
    check('recipe '+row[0]+' powder75',vals[0]+vals[1]+vals[-1]==75)
    check('recipe '+row[0]+' listed mass fraction',vals[1]/300*100==pct)
check('10 wheat increases vs control',float(t[0][2][1])-float(t[0][1][1])==7.5)
check('30 cocoa absent',t[0][3][-1]=='-')
check('specific volume letters',[t[1][i][2] for i in [1,3,4]]==['2.22 ± 0.12 a','1.93 ± 0.00 abc','1.78 ± 0.10 bc'])
check('acceptability all a',all(row[-1].endswith(' a') for row in t[2][1:]))
check('muffin nominal proportions sum100',sum([25.5,19,14,13,9.5,6.5,6,5,1,.5])==100)
check('reported BIBD lambda inconsistent',12*(3-1)/(5-1)==6 and 6!=2)
for name,asin in [('medium','B07JX6YCKR'),('dark','B0F67QBGL3'),('raw','B01D2975KS')]:
    x=json.loads((B/'sources'/f'{name}-result.json').read_text())
    d=x['result']['result']
    check(name+' completed identity',x['result']['status']=='completed' and d['success'] and not d['blocked'] and d['asin']==asin and d['details']['ASIN']==asin)
    if name!='raw':check(name+' deduplicated5bullets',len(d['bullets'])==10 and len(set(d['bullets']))==5)
    else:check('raw anomaly preserved',d['bullets']==[] and d['details']['Type of item']=='Video Game')
search=json.loads((B/'sources/search-result.json').read_text())['result']['result']
check('search8records',search['query']=='carob powder' and search['count']==len(search['items'])==8)
ledger=json.loads((B/'ledger.json').read_text())['sources']
check('9unique source IDs',len(ledger)==9 and len({s['id'] for s in ledger})==9)
logs={}
S='/data/hermes/skills/research/grounded-citations/scripts/sources.py'
for locale in ['zh','en']:
    draft=B/f'article.{locale}.md'
    res=subprocess.run(['python',S,'--ledger',str(B/'ledger.json'),'verify',str(draft),'--strict','--evidence'],capture_output=True,text=True)
    check(locale+' citation map gate',res.returncode==0)
    logs[locale]=res.stdout+res.stderr
    check(locale+' all9cited',set(map(int,re.findall(r'\[(\d+)\]',draft.read_text())))==set(range(1,10)))
receipt={'status':'mechanical PASS; substantive revision NEEDS_SECOND_REVIEW','checks_passed':len(checks),'checks':checks,'citation_logs':logs,'original_files_unchanged':len(original),'source_artifacts_hashed':len(manifest),'table_counts':{k:len(v) for k,v in tables.items()},'draft_and_review_hashes':{n:sha(B/n) for n in ['article.zh.md','article.en.md','claims.json','ledger.json','citation-map.json','figure-review.json','REVIEW.md']},'limits':['No publication approval','No rendered-site or responsive visual check','Figure letters manually read from originals, not numerically digitized','Citation verification alone is not factual validation']}
(B/'verification.json').write_text(json.dumps(receipt,ensure_ascii=False,indent=2))
files={str(p.relative_to(B)):sha(p) for p in B.rglob('*') if p.is_file() and p.name!='SHA256SUMS.json' and '__pycache__' not in p.parts}
(B/'SHA256SUMS.json').write_text(json.dumps(files,ensure_ascii=False,indent=2))
print(json.dumps(receipt,ensure_ascii=False,indent=2))
