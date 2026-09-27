import hashlib
import json
from pathlib import Path
import subprocess
import xml.etree.ElementTree as ET

D = Path(__file__).resolve().parent
checks = []
for name, expected in json.loads((D / 'hashes.json').read_text()).items():
    assert hashlib.sha256((D / name).read_bytes()).hexdigest() == expected, name
    checks.append('hash:' + name)
for item in json.loads((D / 'retrieval-ledger.json').read_text()):
    b = (D / item['path']).read_bytes()
    assert len(b) == item['bytes']
    assert hashlib.sha256(b).hexdigest() == item['sha256']
    checks.append('retrieval:' + item['path'])
files = {1: 'PMC11764740.xml', 2: 'PMC11899151.xml', 3: 'PMC11510493.xml'}
roots = {k: ET.parse(D / v).getroot() for k, v in files.items()}
for c in json.loads((D / 'claim-map.json').read_text()):
    root = roots[c['source_id']]
    assert any(c['verbatim'] == ''.join(e.itertext()) for e in root.iter()), c['claim_id']
    checks.append('claim:' + c['claim_id'])
chart = json.loads((D / 'chart-data.json').read_text())
table = roots[1].find(".//table-wrap[@id='" + chart['table_id'] + "']")
rows = [[''.join(c.itertext()).strip() for c in row if c.tag in ['td', 'th']] for row in table.findall('.//tr')]
assert chart['rows'] == [[row[0], row[4], row[5]] for row in rows[1:7]]
assert rows[-1][4:6] == [chart['p_values']['aw'], chart['p_values']['hygroscopicity']]
checks.append('chart:original-cell-parity')
for draft in ['draft.en.md', 'draft.zh.md']:
    text = (D / draft).read_text()
    for row in chart['rows']:
        assert row[1] in text and row[2] in text
    result = subprocess.run(['python', '/data/hermes/skills/research/grounded-citations/scripts/sources.py', '--ledger', str(D / 'ledger.json'), 'verify', str(D / draft), '--strict', '--evidence'], text=True, capture_output=True)
    assert result.returncode == 0, result.stdout + result.stderr
    checks.append('citations:' + draft + '\n' + result.stdout + result.stderr)
output = {'status': 'PASS', 'checks': checks, 'check_count': len(checks), 'limits': 'Mechanical evidence/hash/table checks; not independent editorial approval or publication verification.'}
(D / 'verification.json').write_text(json.dumps(output, ensure_ascii=False, indent=2))
print(json.dumps(output, ensure_ascii=False, indent=2))
