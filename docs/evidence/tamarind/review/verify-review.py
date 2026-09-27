"""Read-only validation: writes neither originals nor reviewed artifacts."""
from pathlib import Path
import hashlib
import json
import re
import subprocess
import sys

P = Path(__file__).resolve().parent
inputs = json.loads((P / 'input-hashes.json').read_text())
root = Path(inputs['root'])
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
actual = {str(p.relative_to(root)): sha(p) for p in root.rglob('*') if p.is_file()}
assert actual == inputs['sha256'], 'Original package changed'
binding = json.loads((P / 'review-binding.json').read_text())
for name, digest in binding['reviewed_sha256'].items():
    assert sha(P / name) == digest, name
manifest = json.loads((root / 'retrieval-manifest.json').read_text())
for item in manifest:
    suffix = '.pdf' if item['name'] == 'brochure' else '.xml' if item['name'] == 'tamarind-study' else '.html'
    assert sha(root / 'sources' / (item['name'] + suffix)) == item['sha256']
claims = json.loads((P / 'claim-source-ledger.json').read_text())
norm = lambda s: ' '.join(s.split())
for item in claims:
    assert norm(item['quote']) in norm((root / item['evidence_file']).read_text()), item['claim_id']
ledger = json.loads((P / 'ledger.json').read_text())['sources']
assert len({s['id'] for s in ledger}) == len(ledger)
original = json.loads((root / 'ledger.json').read_text())['sources']
assert {s['id']: s['url'] for s in ledger} == {s['id']: s['url'] for s in original}
checks = []
for name in ['tamarind-grade-selection.en.md', 'tamarind-grade-selection.zh.md', 'REVIEW.md']:
    proc = subprocess.run([sys.executable, '/data/hermes/skills/research/grounded-citations/scripts/sources.py', '--ledger', str(P / 'ledger.json'), 'verify', str(P / name), '--evidence'], text=True, capture_output=True)
    checks.append({'file': name, 'exit_code': proc.returncode, 'output': proc.stdout + proc.stderr})
    assert proc.returncode == 0, checks[-1]
    if name != 'REVIEW.md':
        body = (P / name).read_text().split('## Sources')[0]
        assert set(re.findall(r'\[(\d+)\]', body)) == {'1', '2', '3', '6'}
        assert 'ZL' not in body
        for grade in ['GLYLOID®2A', 'GLYLOID®3S', 'Glyate®']:
            assert grade in body
print(json.dumps({'status': 'PASS', 'original_files_unchanged': len(actual), 'bound_review_files': len(binding['reviewed_sha256']), 'primary_archives_matched': len(manifest), 'claim_quotes_matched': len(claims), 'citation_checks': checks, 'scope': 'Integrity checks support, but do not replace, the independent factual/editorial verdict in REVIEW.md.'}, ensure_ascii=False, indent=2))
