"""Read-only candidate checks; outputs JSON to stdout. No plant results fabricated."""
from pathlib import Path
import csv, io, json, hashlib, re
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
ROOT = Path(__file__).resolve().parent.parent
hashes = json.loads((ROOT/'independent/input-sha256.json').read_text())
changed = [p for p,h in hashes.items() if hashlib.sha256((ROOT/p).read_bytes()).hexdigest()!=h]
rows = list(csv.reader(io.StringIO((ROOT/'streams.blank.csv').read_text(encoding='utf-8-sig'))))
assert all(len(r)==19 for r in rows)
assert len(rows)==11
assert all(not cell for row in rows[1:] for i,cell in enumerate(row) if i!=2)
xml=ET.parse(ROOT/'evidence/PMC13115093.xml').getroot()
table=next(t for t in xml.findall('.//table-wrap') if t.findtext('label')=='Table 2')
white_rows=[[''.join(c.itertext()) for c in r] for r in table.findall('.//tr')]
expected={'Tea polyphenol':('427 ± 2 a','386 ± 3 b'),'Caffeine':('91 ± 0.1 a','62 ± 0.1 b'),'GA':('10 ± 0.2 b','39 ± 0.1 a')}
assert all(tuple(r[1:3])==expected[r[0]] for r in white_rows if r[0] in expected)
soup=BeautifulSoup((ROOT/'evidence/concentrate-query.html').read_text(),'html.parser')
tables=soup.find_all('table')
concentrate_rows=[[c.get_text(' ',strip=True) for c in r.find_all(['th','td'])] for r in tables[0].find_all('tr')]
for b,expected_value in [('40','77.4'),('50','28.2'),('60','32.2')]:
    assert any(r[0]==b and r[1].startswith(expected_value) for r in concentrate_rows)
ledger=json.loads((ROOT/'independent/ledger.json').read_text())
norm=lambda s: re.sub(r'\s+',' ',s).strip()
quote_checks=[]
for sid,file in [(1,'evidence/PMC10453089.txt'),(6,'evidence/PMC13115093.txt'),(7,'evidence/concentrate-full-readable.txt')]:
    source=next(s for s in ledger['sources'] if s['id']==sid)
    for q in source.get('quotes',[]):
        quote_checks.append({'source_id':sid,'verbatim_match':norm(q['text']) in norm((ROOT/file).read_text())})
assert all(q['verbatim_match'] for q in quote_checks)
assert not changed, changed
print(json.dumps({'input_files_hashed':len(hashes),'changed_inputs':changed,'csv':{'columns':19,'template_rows':10,'numeric_cells_blank':True,'only_role_labels_populated':True,'utf8_bom':(ROOT/'streams.blank.csv').read_bytes().startswith(b'\xef\xbb\xbf')},'white_table2':white_rows,'concentrate_table1':concentrate_rows,'composition_ratios_not_recoveries':{'caffeine_62_over_91':62/91,'GA_39_over_10':39/10,'polyphenol_386_over_427':386/427},'white_table2_naive_sum_ug_per_mg_not_mass_closure':{'WTCs':379+114+427+91+10,'WTMPs':412+109+386+62+39},'quote_checks':quote_checks,'scope':'Actual archived table values and blank-file validation only; no calculator or plant trial executed.'},ensure_ascii=False,indent=2))
