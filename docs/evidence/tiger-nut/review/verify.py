#!/usr/bin/env python3
"""Independent offline original-cell/hash regression. Writes only review/verification.json.
Run from any directory with Python3 stdlib. Frozen manifests are never regenerated.
Does not prove editorial judgement or rendering and never runs the author verifier.
"""
from pathlib import Path
from decimal import Decimal
import hashlib,json,re,xml.etree.ElementTree as ET
B=Path(__file__).resolve().parent
O=B.parent/'2026-09-28-night-discovery'
checks=[]
def ck(ok,label):
    checks.append({'check':label,'pass':bool(ok)})
    if not ok: raise AssertionError(label)
def text(e): return ''.join(e.itertext())
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
for rel,digest in json.loads((B/'original-hashes.json').read_text()).items():
    ck(sha(O/rel)==digest,'unchanged original '+rel)
for rel,digest in json.loads((B/'review-hashes.json').read_text()).items():
    ck(sha(B/rel)==digest,'review sha256 '+rel)
saved=json.loads((B/'original-cells.json').read_text())
for name,table_data in saved.items():
    root=ET.parse(O/'sources'/name).getroot()
    tables=root.findall('.//table-wrap')
    ck(len(tables)==len(table_data),name+' table count')
    for tb,st in zip(tables,table_data):
        ck(tb.get('id')==st['id'],name+' table identity '+st['id'])
        ck(text(tb.find('caption'))==st['caption'],st['id']+' caption')
        rows=tb.findall('.//tr');ck(len(rows)==len(st['rows']),st['id']+' row count')
        for i,(row,ss) in enumerate(zip(rows,st['rows'])):
            ck(len(row)==len(ss),st['id']+' row '+str(i)+' cell boundaries')
            for j,(cell,s) in enumerate(zip(row,ss)):
                ck({'tag':cell.tag,'attributes':dict(cell.attrib),'xml':ET.tostring(cell,encoding='unicode'),'text':text(cell)}==s,st['id']+f' original cell {i},{j}')
        ck([text(n) for n in tb.findall('table-wrap-foot')]==st['footnotes'],st['id']+' complete footnotes')
root=ET.parse(O/'sources/PMC12071967.xml').getroot()
table=root.find('.//table-wrap[@id="foods-14-01447-t002"]')
ck([text(c) for c in table.findall('.//tr')[0]][-3:]==['Level 1 *','Level 2 **','Level 3 ***'],'count original glucose headers')
foot=text(table.find('table-wrap-foot'))
for s in ['All tests at different sugar levels were conducted at 37 °C','7.5 g/100 mL','15 g/100 mL','n.d.: Not determined']:
    ck(s in foot,'count footnote '+s)
# Read actual exponent nodes, not flattened strings or pre-derived author numbers.
def number(cell):
    buf=cell.text or ''
    for n in cell:
        ck(n.tag=='sup','count exponent is sup')
        buf+='^'+text(n)+(n.tail or '')
    pieces=buf.split(' ± ');ck(len(pieces)==2,'mean/spread split')
    out=[]
    for s in pieces:
        if s.strip()=='0':out.append(Decimal(0));continue
        m=re.fullmatch(r'([\d.]+) × 10\^(\d+)',s.strip())
        ck(m is not None,'scientific number syntax')
        out.append(Decimal(m[1])*(Decimal(10)**int(m[2]))/(Decimal(10)**8))
    return out
expect_names=['VEGE022','VEGE033','VEGE053','VEGE061']
parsed=[]
for row,name in zip(table.findall('.//tr')[1:5],expect_names):
    ck(text(list(row)[-6])==name,'count row identity '+name)
    parsed.append([number(c) for c in list(row)[-3:]])
for lang in ['en','zh']:
    draft=(B/f'tiger-nut-fermentation.{lang}.md').read_text()
    lines=draft.splitlines()
    for name,values in zip(expect_names,parsed):
        rows=[l for l in lines if l.startswith('| '+name+' |')];ck(len(rows)==1,lang+' unique starter row '+name)
        cols=rows[0].strip('|').split('|')[1:];ck(len(cols)==3,lang+' exactly three glucose cells '+name)
        for i,(cell,nums) in enumerate(zip(cols,values)):
            actual=[Decimal(x.strip()) for x in cell.split('±')]
            ck(actual==nums,lang+f' original exponent conversion {name} glucose{i}')
    ck(sum(l.startswith('|---') for l in lines)==2,lang+' exactly two proposed tables')
    ck('![' not in draft,lang+' no embedded chart added')
    ck(set(map(int,re.findall(r'\[(\d+)\]',draft)))=={1,5,6},lang+' source scope')
    for s in ['Tigernuts Traders','Defatted Tigernuts Flour','×10⁸ CFU/mL','0–3','0–100','INFOGEST 2.0','9.1 g','25 g','250 mL','150 mL']:
        ck(s in draft,lang+' retained identity/unit '+s)
    ck('降酸' not in draft,lang+' no deacidification mistranslation')
    if lang=='zh':
        for s in ['复合发酵剂','不是同一轮试验','取样时间','香气强度分，而不是喜好分','上清液','没有开展储存稳定性评价']:
            ck(s in draft,'zh bound claim '+s)
    else:
        for s in ['not four individual strains','separate from the initial temperature','exact harvest time','not a consumer liking test','supernatant','not a direct mass-balanced survival percentage','did not include a storage-stability assessment']:
            ck(s in draft,'en bound claim '+s)
ck(parsed[3][1][0]<parsed[3][0][0]<parsed[3][2][0],'VEGE061 counterexample retained')
# Exact independent method/interpretation anchors from original body.
body=text(root.find('body'))
for s in ['Four freeze-dried microbial consortia','water (80%) and tiger nut (20%)','85 °C for 5 min','80 °C for 10 min','a new fermentation process from scratch','3–5 replicates in at least two different experiments','Digestions were performed in duplicate','a final volume of 40 mL','centrifuged (90 min, 4 °C, 3100× g)','absence of storage stability assessments','2 mL of methanol','200 μL of dimethyl sulfoxide','Carbohydrates = 100']:
    ck(s in body,'original method '+s)
for fid,anchor in [('foods-14-01447-f002','tiger nut (A)'),('foods-14-01447-f003','within the same LAB starter'),('foods-14-01447-f005','tiger nut (A)'),('foods-14-01447-f006','in the same sample')]:
    fig=root.find('.//fig[@id="'+fid+'"]');ck(fig is not None and anchor in text(fig),'original caption '+fid)
# Raw supplier HTML, not inferred manufacturer capability.
html=(O/'sources/supplier0.html').read_text()
for s in ['innovative milling technique','meet their technical specifications','including a sterilised version']:
    ck(s in html,'raw manufacturer HTML '+s)
pdftext=(O/'sources/supplier1.txt').read_text().split('PAGE 8')[1].split('PAGE 9')[0]
for s in ['DEFATTED TIGERNUTS FLOUR','por 100 g','9.1 g','25 g','May contain traces of allergens.']:
    ck(s in pdftext,'supplier page8 verified image/text anchor '+s)
# Author's quotes remain literal; their scope is separately assessed in REVIEW.
for claim in json.loads((O/'claims.json').read_text()):
    ck(claim['quote'] in (O/claim['file']).read_text(),'literal claim '+claim['id'])
ledger=json.loads((B/'ledger.json').read_text())['sources']
ck([s['id'] for s in ledger]==list(range(1,8)),'contiguous unchanged ledger IDs')
ck(json.loads((B/'ledger.json').read_text())==json.loads((O/'ledger.json').read_text()),'source identity unchanged')
result={'status':'PASS','checks':len(checks),'scope':'original bytes/cells, corrected-copy bindings and method regressions; not rendering or release approval','results':checks}
(B/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print(json.dumps({k:v for k,v in result.items() if k!='results'},ensure_ascii=False))
