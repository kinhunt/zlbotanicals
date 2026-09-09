"""One-time, strict conversion of reviewed EN/ZH packs to escaped structured content.
Usage: python scripts/import-deep-ingredients.py /path/to/deep-ingredients
No HTML is accepted or evaluated. Source IDs remain group-local under a namespace.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACKS = {'a':['green-tea','centella','monk-fruit'], 'b':['turmeric','reishi','ginseng'], 'c':['ginkgo-biloba','grape-seed','goji-berry'], 'd':['licorice-root','stevia','resveratrol']}
DIMS = ['processes','equipment','applications','standards','insights']


def blocks(text):
    lines = text.strip().splitlines()
    result = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line or line == '---':
            i += 1
            continue
        if line.startswith('|'):
            rows = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                row = [c.strip() for c in lines[i].strip().strip('|').split('|')]
                if not all(re.fullmatch(r':?-+:?', c) for c in row):
                    rows.append(row)
                i += 1
            if len(rows) < 2 or any(len(r) != len(rows[0]) for r in rows):
                raise ValueError('Invalid table')
            result.append({'type':'table','headers':rows[0],'rows':rows[1:]})
        elif line.startswith('#'):
            result.append({'type':'heading','text':re.sub(r'^#+\s*','',line)})
            i += 1
        elif re.match(r'^[-*] ',line):
            items=[]
            while i < len(lines) and re.match(r'^[-*] ',lines[i].strip()):
                items.append(lines[i].strip()[2:]); i+=1
            result.append({'type':'list','items':items})
        else:
            para=[line]; i+=1
            while i<len(lines) and lines[i].strip() and not re.match(r'^(#|\||[-*] |---$)',lines[i].strip()):
                para.append(lines[i].strip()); i+=1
            result.append({'type':'paragraph','text':' '.join(para)})
    return result


def convert(base):
    output=[]
    for group,names in PACKS.items():
        ledger=json.loads((base/f'group-{group}/sources.json').read_text())
        sources={int(s['id']):s for s in (ledger['sources'] if isinstance(ledger,dict) else ledger)}
        for name in names:
            raw=(base/f'group-{group}/{name}.md').read_text().split('## Sources')[0]
            if group=='a':
                starts=list(re.finditer(r'^## 1\. ',raw,re.M))
                locales={'zh':raw[starts[0].start():starts[1].start()], 'en':raw[starts[1].start():]}
                pattern=r'^## ([1-5])\. (.+)$'
            else:
                zh,en=re.split(r'^## English[^\n]*\n',raw,flags=re.M)
                locales={'zh':zh.split('## 中文',1)[1], 'en':en}
                pattern=r'^### (?:([1-5])[. ]|([一二三四五])、)\s*(.+)$'
            content={}
            for lang,text in locales.items():
                matches=list(re.finditer(pattern,text,re.M))
                if len(matches)!=5: raise ValueError((name,lang,'five sections required'))
                sections=[]
                prelude=text[:matches[0].start()].strip()
                for index,m in enumerate(matches):
                    body=text[m.end():matches[index+1].start() if index<4 else len(text)]
                    # Identity orientation becomes part of process, not an extra generic introduction.
                    if index==0 and prelude: body=prelude+'\n\n'+body
                    body=body.replace('本包','本文').replace('This pack','This profile')
                    sections.append({'id':DIMS[index],'heading':m.groups()[-1],'blocks':blocks(body)})
                content[lang]=sections
            used=sorted({int(n) for n in re.findall(r'\[(\d+)\]',json.dumps(content,ensure_ascii=False))})
            records=[]
            for n in used:
                s=sources[n]
                title=re.sub(r'<[^>]+>','',s['title']).replace('__','').replace('\n',' ')
                try: title=title.encode('latin1').decode('utf8')
                except (UnicodeError, UnicodeEncodeError): pass
                records.append({'id':n,'title':title,'url':s['url'],'accessed':s.get('accessed',s.get('retrieved_on','2026-09-09')),'scope':s.get('access_scope',s.get('retrieval_level',s.get('kind',s.get('type',''))))})
            output.append({'productId':{'centella':'centella-asiatica','reishi':'reishi-mushroom'}.get(name,name),'group':group,'pack':f'group-{group}/{name}.md','content':content,'sources':records})
    return output

if __name__=='__main__':
    data=convert(Path(sys.argv[1]))
    (ROOT/'src/data/deep-ingredients.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
    print(f'Converted {len(data)} bilingual ingredients; {sum(len(d["sources"]) for d in data)} ingredient/source associations')
