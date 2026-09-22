"""Read-only repeat checks for the cranberry review package (stdlib only)."""
from pathlib import Path
import hashlib
import json
import xml.etree.ElementTree as ET

HERE = Path(__file__).resolve().parent
ORIGINAL = HERE.parent / '2026-09-22-morning-discovery'
hashes = json.loads((HERE / 'original-hashes.json').read_text())
assert all(hashlib.sha256((ORIGINAL / n).read_bytes()).hexdigest() == h for n, h in hashes.items())
root = ET.fromstring((HERE / 'source-2.raw').read_bytes())
table = next(t for t in root.findall('.//table-wrap') if t.findtext('label') == 'Table 2')
rows = [[''.join(c.itertext()).strip() for c in r] for r in table.findall('.//tr')][2:]
assert len(rows) == 24
assert sum(r[2] == 'BL-DMAC' for r in rows) == 9
numeric = 0
for number, declared, method, result, percentage in rows:
    mean, sd = map(float, result.split(' ± '))
    if declared != 'n.d.':
        numeric += 1
        assert round(mean / float(declared) * 100, 2) == float(percentage.rstrip('%'))
assert numeric == 16
assert round(1.73 / 34.86 * 100, 2) == 4.96
assert 100 / (1000 * .10) == 1
print(json.dumps({'original_files_unchanged': len(hashes), 'table_rows': len(rows), 'numeric_ratios_verified': numeric, 'BL_DMAC_table_count': 9, 'sample4_CV_percent': 4.96, 'hypothetical_USD_per_g': 1, 'status': 'PASS'}, indent=2))
