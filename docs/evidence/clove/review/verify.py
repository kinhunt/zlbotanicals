import hashlib
import json
import subprocess
import xml.etree.ElementTree as ET
from pathlib import Path

D = Path(__file__).resolve().parent
S = D.parent / '2026-09-27-clove-depth'
checks = []

def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()

def txt(e):
    return ''.join(e.itertext()).strip()

for name, expected in json.loads((S / 'hashes.json').read_text()).items():
    assert sha(S / name) == expected, name
    checks.append('author-preserved:' + name)
for name, expected in json.loads((D / 'hashes.json').read_text()).items():
    assert sha(D / name) == expected, name
    checks.append('review-hash:' + name)
ids = ['PMC11764740', 'PMC11899151', 'PMC11510493']
roots = {}
for n, id_ in enumerate(ids, 1):
    assert (D / (id_ + '.fresh.xml')).read_bytes() == (S / (id_ + '.xml')).read_bytes()
    roots[n] = ET.parse(D / (id_ + '.fresh.xml')).getroot()
    checks.append('independent-refetch-identical:' + id_)
for claim in json.loads((S / 'claim-map.json').read_text()):
    assert any(claim['verbatim'] == ''.join(e.itertext()) for e in roots[claim['source_id']].iter()), claim['claim_id']
    checks.append('author-claim-original-node:' + claim['claim_id'])
ledger = json.loads((D / 'ledger.json').read_text())
assert [s['id'] for s in ledger['sources']] == [1, 2, 3]
for source in ledger['sources']:
    assert source['url'].endswith(ids[source['id']-1] + '/fullTextXML')
    nodes = {''.join(e.itertext()) for e in roots[source['id']].iter()}
    for quote in source['quotes']:
        assert quote['text'] in nodes, (source['id'], quote['text'][:50])
        checks.append('ledger-exact-node:' + str(source['id']))

def rows(sid, table_id):
    return [[txt(c) for c in row if c.tag in ('td', 'th')] for row in roots[sid].find(".//table-wrap[@id='" + table_id + "']").findall('.//tr')]

r = rows(1, 'foods-14-00237-t002')
chart = json.loads((S / 'chart-data.json').read_text())
assert chart['rows'] == [[v[0], v[4], v[5]] for v in r[1:7]]
assert r[-1][4:6] == ['0.17', '<0.01']
assert [v[5].split()[-1] for v in r[1:7]] == ['a', 'a', 'b', 'b', 'b', 'b']
checks.append('main-table-p-values-groups')
eug = rows(1, 'foods-14-00237-t004')
assert min(float(v[3].split()[0]) for v in eug[1:7]) == 70.5
assert max(float(v[3].split()[0]) for v in eug[1:7]) == 75.6
assert eug[-1][3] == '0.78'
checks.append('clove-eugenol-range-and-p')
elder = rows(2, 'foods-14-00723-t002')
assert elder[1][1] == '5.63 ± 0.15 a' and elder[6][1] == '4.10 ± 0.09 c'
checks.append('elderberry-endpoint-cells')
spray = rows(3, 'pharmaceutics-16-01251-t003')
assert spray[1][:3] == ['DF06', '65.35', '47.37']
assert spray[2][:3] == ['DF16', '33.72', '96.07']
checks.append('spray-eugenol-cells')
for lang in ('en', 'zh'):
    p = D / ('draft.' + lang + '.reviewed.md')
    draft = p.read_text()
    actual = [line for line in draft.splitlines() if line.startswith('| ')][1:]
    expected = ['| ' + v[0].replace('MD', '').replace('GA', '') + ' | ' + v[4] + ' | ' + v[5] + ' |' for v in r[1:7]]
    assert actual == expected, (lang, actual, expected)
    checks.append('full-row-label-value-parity:' + lang)
    proc = subprocess.run(['python', '/data/hermes/skills/research/grounded-citations/scripts/sources.py', '--ledger', str(D / 'ledger.json'), 'verify', str(p), '--strict', '--evidence'], capture_output=True, text=True)
    assert proc.returncode == 0, proc.stdout + proc.stderr
    checks.append('citation-strict-evidence:' + lang + '\n' + proc.stdout + proc.stderr)
result = {'status': 'PASS', 'checks': checks, 'check_count': len(checks), 'scope': 'Exact reviewed-file binding, original preservation, fresh source parity, exact quote nodes, full numeric rows and citation gates. Editorial verdict is in REVIEW.md; no live-site checks.'}
(D / 'verification.json').write_text(json.dumps(result, indent=2, ensure_ascii=False))
print(json.dumps(result, indent=2, ensure_ascii=False))
