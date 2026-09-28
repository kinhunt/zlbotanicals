#!/usr/bin/env python3
"""Read-only regression checks. Stdlib only; does not regenerate expected data."""
from pathlib import Path
import xml.etree.ElementTree as ET
import hashlib, json, re, sys
R = Path(__file__).resolve().parent
O = R.parent / '2026-09-28-evening-discovery'
checks = []
def ck(name, actual, expected=True):
    checks.append({'name': name, 'pass': actual == expected})
def text(e):
    return ' '.join(''.join(e.itertext()).split()) if e is not None else ''
def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()
roots = {s: ET.parse(R/'sources'/f'{s}xml').getroot() for s in ['S1','S2']}
def rows(s, tid):
    return [[text(c) for c in r if c.tag in ('th','td')] for r in roots[s].find(f'.//table-wrap[@id="{tid}"]').findall('.//tr')]
expected = json.loads((R/'original-tables.json').read_text())
for s,n in [('S1',5),('S2',3)]:
    ck(s+' complete back', roots[s].find('back') is not None)
    ts=roots[s].findall('.//table-wrap')
    ck(s+' table count',len(ts),n)
    for t,saved in zip(ts,expected[s]):
        ck(s+' id '+t.get('id'), t.get('id'), saved['id'])
        ck(s+' caption '+t.get('id'),text(t.find('caption')),saved['caption'])
        ck(s+' footnote '+t.get('id'),text(t.find('table-wrap-foot')),saved['footnote'])
        rr=t.findall('.//tr')
        ck(s+' row count '+t.get('id'),len(rr),len(saved['rows']))
        for i,(row,want) in enumerate(zip(rr,saved['rows'])):
            cells=[c for c in row if c.tag in ('th','td')]
            ck(f'{s}/{t.get("id")}/r{i} length',len(cells),len(want))
            for j,(cell,ex) in enumerate(zip(cells,want)):
                ck(f'{s}/{t.get("id")}/r{i}/c{j}',{'tag':cell.tag,'rowspan':cell.get('rowspan','1'),'colspan':cell.get('colspan','1'),'text':text(cell)},ex)
t1=rows('S1','tbl1');t2=rows('S1','tbl2');t5=rows('S1','tbl5');f2=rows('S2','foods-12-03663-t002')
byrun={row[0]:row for row in t1[1:12]}
# Assertions independent of derived archive, including counterexamples and units.
ck('0.4/100 exact', [byrun['11'][i] for i in [1,2,3,4,5,7]],['0.400','100','92.36 ± 0.23','0.00 ± 0.00','0.00 ± 0.00','161.10 ± 0.66'])
ck('0.4/300 exact', [byrun['5'][i] for i in [1,2,3,4,5,7]],['0.400','300','95.35 ± 0.49','0.75 ± 0.12','2.46 ± 0.22','201.60 ± 1.08'])
ck('centre creaming variation',[byrun[x][5] for x in ['3','9','10']],['0.00 ± 0.00','2.46 ± 0.22','0.69 ± 0.11'])
ck('viscosity header',t1[0][7],'viscosity (mPa·s)')
ck('sedimentation nd nine months',[x[2] for x in t5[1:]],['nd']*9)
ck('creaming nd first4',[x[3] for x in t5[1:5]],['nd']*4)
ck('month5 creaming',t5[5][3],'0.01 ± 0.0008a')
ck('month9 creaming',t5[9][3],'0.03 ± 0.0016a')
ck('viscosity groups',[re.search(r'[a-z]+$',x[5]).group() for x in t5[1:]],['a','a','b','bc','c','cd','d','e','e'])
ck('WHC groups',[re.search(r'[a-z]+$',x[1]).group() for x in t5[1:]],['a']*7+['b']*2)
ck('optimal experimental nd',t2[2][2:4],['nd','nd'])
ck('optimal viscosity',t2[2][5],'197.22 ± 0.91')
ck('predicted torque table',t2[1][6],'0.834')
ck('fractionation CF AQ',rows('S2','foods-12-03663-t003')[1],['CF AQ','1.00 ± 0.01','0.25 ± 0.01'])
ck('CF AQ measured row',f2[1],['CF AQ','74.56 ± 0.34','14.57 ± 0.83'])
ck('CF Cl measured row',f2[2],['CF Cl','39.80 ± 0.16','23.30 ± 0.22'])
for lang in ['en','zh']:
    draft=(R/f'citrus-fibre.{lang}.md').read_text()
    groups=[]; group=[]
    for line in draft.splitlines()+['']:
        if line.startswith('|'):
            if not re.match(r'^\|[ :|\-]+$',line):group.append([c.strip() for c in line.strip('|').split('|')])
        elif group:groups.append(group);group=[]
    ck(lang+' exactly three article tables',len(groups),3)
    if len(groups)==3:
        ck(lang+' composition complete row relationships',groups[0][1:],f2[1:3])
        ck(lang+' pressure complete row relationships',groups[1][1:],[[byrun[str(n)][i] for i in [1,2,4,5,7]] for n in [7,1,11,5]])
        ck(lang+' storage complete row relationships',groups[2][1:],[[x[i] for i in [0,2,3,1,5]] for x in t5[1:]])
    for phrase in ['197.22 ± 0.91','272.67','92.36 ± 0.23','95.35 ± 0.49','0.69%','225 kJ/L','AOAC 991.43','100 rpm','R-2']:
        ck(lang+' supported prose '+phrase,phrase in draft)
    ck(lang+' no unsupported ultrasound Pa values','84.4' not in draft)
    ck(lang+' no torque conflict propagated','0.972' not in draft)
# Scoped methods assertions; no fabricated temperature inference.
for s,r in roots.items():
    alltext=text(r)
    phrases = ['Each measurement was triplicated on the same sample.','4 ± 1 °C for 21 days','95 °C/4 min','0.972 mN·m','0.250% and above'] if s=='S1' else ['did not exceed 40 °C','energy density = 225 kJ/L','t = 150 s','containing 1% fiber','AOAC procedure No. 991.43','All experiments were conducted in duplicate']
    for phrase in phrases:ck(s+' original method '+phrase,phrase in alltext)
store=next(e for e in roots['S1'].findall('.//sec') if text(e.find('label'))=='2.14')
ck('storage subsection no stated temperature','°C' not in text(store) and 'temperature' not in text(store).lower())
supplier=(R/'sources/S4').read_text()
for phrase in ['can recover mouthfeel','contribute to fibre enrichment','provides thickening','emulsification']:
    ck('full supplier claim '+phrase,phrase in supplier)
ck('S3 is unusable 403','403 Forbidden' in (R/'sources/S3').read_text())
for file,digest in json.loads((R/'original-input-hashes.json').read_text()).items():
    ck('original unchanged '+file,sha(O/file),digest)
for file,entry in json.loads((R/'binding.json').read_text())['files'].items():
    ck('immutable binding '+file,sha(R/file),entry['sha256'])
result={'status':'PASS' if all(c['pass'] for c in checks) else 'FAIL','passed':sum(c['pass'] for c in checks),'total':len(checks),'scope':'source cells, row relationships, methods and fixed hashes; no rendered/publication gate','checks':checks}
print(json.dumps(result,ensure_ascii=False,indent=2))
sys.exit(0 if result['status']=='PASS' else 1)
