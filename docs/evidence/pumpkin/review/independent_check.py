#!/usr/bin/env python3
"""Read-only independent regression checker. No imports of upstream authoring code.
Stdlib only. stdout JSON; no writes, network, OCR or claim of automatic semantic approval.
"""
from pathlib import Path
import hashlib, json, re, xml.etree.ElementTree as ET
from html.parser import HTMLParser
R=Path(__file__).resolve().parent
B=R.with_name('2026-09-28-afternoon-pumpkin')
L=R.with_name('2026-09-28-afternoon-pumpkin-labels')
checks=[]
def ck(ok,label):
    checks.append({'check':label,'pass':bool(ok)})
    if not ok: raise AssertionError(label)
def load(p): return json.loads(p.read_text())
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def norm(s):return ' '.join(s.split())
for file,digest in load(R/'original-byte-manifest.json').items():
    ck(sha(Path(file))==digest,'immutable original '+file)
for file,digest in load(R/'review-manifest.json').items():
    ck(sha(R/file)==digest,'frozen review '+file)
# Reparse every original scientific table cell, including spans, independent of derived JSON.
roots={}
for name in ['PMC9777787','PMC11748320']:
    root=ET.parse(B/'sources'/f'{name}.xml').getroot();roots[name]=root
    cells=[]
    for table in root.findall('.//table-wrap'):
        for row,tr in enumerate(table.findall('.//tr')):
            for col,cell in enumerate(tr):
                cells.append({'table':table.get('id'),'row':row,'cell':col,'text':''.join(cell.itertext()),'rowspan':cell.get('rowspan','1'),'colspan':cell.get('colspan','1')})
    ck(cells==load(B/'sources'/f'{name}-cells.json'),'ALL original XML cells and spans '+name)
def table(name,tid):return roots[name].find(f'.//table-wrap[@id="{tid}"]')
def rows(t):return [[norm(''.join(c.itertext())) for c in tr] for tr in t.findall('.//tr')]
def mean(s):return float(s.split('±')[0])
a=table('PMC9777787','foods-11-04029-t001');a1=rows(a)
ck(a1[3]==['Protein','60.24 ± 0.05 a','68.68 ± 0.13 b'],'T1 protein actual cells')
ck(a1[2]==['Fat','13.38 ± 0.12 a','0.77 ± 0.14 b'],'T1 fat actual cells')
ck('half deviation range' in ''.join(a.itertext()),'T1 uncertainty is half range')
a2=rows(table('PMC9777787','foods-11-04029-t002'))
ck(mean(a2[4][1])>mean(a2[1][1]),'d10 increases')
ck(mean(a2[4][3])==min(mean(row[3]) for row in a2[1:]),'d90 minimum only not whole distribution')
a3=rows(table('PMC9777787','foods-11-04029-t003'))
ck(mean(a3[4][2])>mean(a3[5][2]),'UAE higher pH5')
ck(mean(a3[4][3])<mean(a3[5][3]),'AE+US higher pH7')
ck(a3[4][4].endswith(' c') and a3[5][4].endswith(' c'),'same statistical group pH9')
t4=table('PMC11748320','tbl4');r4=rows(t4)
ck(t4.find('.//tbody/tr/td[2]').get('rowspan')=='3','Alkali binding rowspan3')
ck(r4[1][2]=='10.32 ± 0.05c' and r4[2][1]=='9.75 ± 0.02d' and r4[3][1]=='15.99 ± 0.04a','T4 original PS and significance letters')
ck(mean(r4[2][1])<mean(r4[1][2])<mean(r4[3][1]),'CH<UT<MH alkali')
ck('SE' in ''.join(t4.itertext()),'T4 uncertainty SE not SD')
# Source methods and denominator original-byte predicates, not derivative quote files.
txt4=norm(''.join(roots['PMC9777787'].itertext()))
txt5=norm(''.join(roots['PMC11748320'].itertext()))
for phrase in ['5 mg/mL','agitated for 2 h','amount of protein in the supernatant','amount of protein in the initial sample','two runs performed on a single day were then pooled','four independent extractions per condition','Duncan']:
    ck(phrase in txt4,'2022 method '+phrase)
for phrase in ['1:4 (w/w)','300 rpm for 1 day','Lowry','Tukey','Each trial was repeated in triplicate']:
    ck(phrase in txt5,'2025 method '+phrase)
# Minimal DOM parser: pair actual composition labels, operator and number within original HTML div.
class Composition(HTMLParser):
    def __init__(self):super().__init__();self.depth=0;self.parts=[];self.items=[]
    def handle_starttag(self,tag,attrs):
        at=dict(attrs)
        if self.depth: self.depth+=1
        elif tag=='div' and 'composition-item' in at.get('class','').split():self.depth=1;self.parts=[]
    def handle_endtag(self,tag):
        if self.depth:
            self.depth-=1
            if self.depth==0:self.items.append(norm(' '.join(self.parts)))
    def handle_data(self,data):
        if self.depth:self.parts.append(data)
for name,expected in [('austrade-unroasted',['Protein ≥ 60%','Moisture ≤ 10%','Fat ≤ 10%','Carbohydrates ≤ 18%','Dietary Fiber ≤ 16%']),('austrade-roasted',['Protein ≥ 57%','Moisture ≤ 8%','Fat ≤ 17%','Total Carbohydrates ≤ 19%','Dietary Fiber ≤ 15%'])]:
    parser=Composition();parser.feed((B/'sources'/f'{name}.html').read_text())
    ck(parser.items==expected,'ALL supplier original DOM limits '+name)
    ck(parser.items==[norm(c['label']+' '+c['value']) for c in load(B/'sources'/f'{name}-cells.json')],'supplier derived cells faithful '+name)
# Nested original search and product wrappers.
def unwrap(p):return json.loads(load(p)['output'])['result']['result']
s=unwrap(B/'inherited/pumpkin-search-completed.json')
ck(s['count']==len(s['items'])==8,'search denominator8')
ck([x['asin'] for x in s['items'] if 'Sprout Living' in x['title']]==['B01N7CLYX7','B0BHFG8DNT'],'two Sprout sizes')
asins=['B01N7CLYX7','B0CWVTCT7G','B0FWJGBPWM']
for asin in asins:
    obj=unwrap(B/'inherited'/f'{asin}.json')
    ck(obj['asin']==asin and not obj['blocked'],'detail scoped identity '+asin)
    g=load(L/f'{asin}-gallery.json')
    ck(g['asin']==g['expectedAsin']==asin and g['validated'] and '/dp/'+asin in g['url'],'gallery input/URL identity '+asin)
    ck(json.loads(g['rawInitial'])==g['initial'],'gallery raw array parse '+asin)
ck(unwrap(B/'inherited/B01N7CLYX7.json')['details']['Protein Source']=='Blend','original Blend field')
ck(unwrap(B/'inherited/B0CWVTCT7G.json')['details']['Total Servings Per Container']=='30','original Anthony30 retained')
for image in load(L/'image-provenance.json'):
    ck(sha(L/image['file'])==image['sha256'],'original JPEG '+image['file'])
    g=load(L/f'{image["asin"]}-gallery.json')
    ck(g['initial'][image['gallery_index']]['hiRes']==image['url'],'exact initial hiRes '+image['file'])
    ck(sha(L/f'{image["asin"]}-receipt.json')==image['receipt_sha256'],'receipt binding '+image['file'])
for image in load(R/'vision-review.json'):
    ck(sha(Path(image['file']))==image['sha256'],'manual vision bound bytes '+image['file'])
# Full old evidence retained, not capped quotations. XML quote semantics reviewed separately in REVIEW.md.
ck(load(R/'original-claim-evidence.json')==load(B/'claims.json'),'all original claim evidence retained')
ledger=load(R/'claim-ledger.json')
for lang in ['en','zh']:
    file=f'draft.{lang}.md';t=(R/file).read_text();body=t.split('## Sources')[0].strip()
    ck(sha(R/file)==ledger['draft_hashes'][file],'exact accepted draft '+lang)
    article_blocks=body.split('\n\n');mapped=[b for b in ledger['blocks'] if b['language']==lang]
    ck(article_blocks==[b['text'] for b in mapped],'ALL article blocks mapped '+lang)
    for block in mapped:ck(hashlib.sha256(block['text'].encode()).hexdigest()==block['sha256'],'block '+block['id'])
    ck(len(re.findall(r'^\|---',body,re.M))==4,'four reviewed tables '+lang)
    for asin in asins:ck('https://www.amazon.com/dp/'+asin in body,'context link '+lang+asin)
    for x in ['≥57%','≥60%','≥80%','60.24','68.68','13.38','0.77','10.32','9.75','15.99','32.5','56','907']:
        ck(x in body,'critical bilingual value '+lang+x)
    ck('[7]' not in body,'blocked source excluded '+lang)
    # Manual vision transcriptions are explicit cells, not inferred purity; verify presentation in both languages.
    if lang=='en':
        expected_label_rows=['| Serving size | 2 scoops (32.5 g) | 1 Tbsp (8 g) | 2 scoops (30 g approx.) |','| Protein per labeled serving | 20 g | 5 g | 18 g |','| Servings on nutrition panel | About 14 | 56 | 30 |']
    else:
        expected_label_rows=['| 每份用量 | 2勺（32.5克） | 1汤匙（8克） | 2勺（约30克） |','| 标签所列每份蛋白质 | 20克 | 5克 | 18克 |','| 营养标签所列每袋份数 | 约14份 | 56份 | 30份 |']
    for label_row in expected_label_rows:ck(label_row in body,'manual vision cell row '+lang+label_row)
    ck('Organic Pressed Pumpkin Seed Powder | Organic Toasted Pumpkin Seeds | Organic Pumpkin Seed Protein Powder' in body,'literal ingredient row '+lang)
    # Exact scientific display rows must retain means, error and significance letters.
    table_lines=[x for x in body.splitlines() if x.startswith('|')]
    for row in [a3[2],a3[4],a3[5]]:
        expected=row[2:5]
        ck(any(all(norm(value).replace(' ','') in line.replace(' ','') for value in expected) for line in table_lines),'original scientific row in '+lang+row[0])
    # References generated upstream; ID and URL parity checked, no citation-only factual claim.
    registry={str(s['id']):s['url'] for s in load(R/'citations.json')['sources']}
    refs=dict(re.findall(r'^\[(\d+)\] (\S+)$',t.split('## Sources')[1],re.M))
    ids=set(re.findall(r'\[(\d+)\]',body))
    ck(set(refs)==ids and all(registry[k]==v for k,v in refs.items()),'exact reference map '+lang)
print(json.dumps({'status':'PASS','checks':len(checks),'scope':'Read-only byte/cell/identity/display regression; semantic and visual findings are separately recorded, no deployment approval','results':checks},ensure_ascii=False,indent=2))
