"""Read-only integrity checks for this research package. Run: python verify_package.py."""
from pathlib import Path
import hashlib
import json
import re
import subprocess
import sys

root = Path(__file__).resolve().parent
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
inputs = json.loads((root / 'input-hashes.json').read_text())
for name, digest in inputs.items():
    assert sha(root.parent / name) == digest, ('changed original', name)
    assert sha(root / 'provenance' / name) == digest, ('changed archive', name)
reviews = json.loads((root / 'all-line-review.json').read_text())
ledger = json.loads((root / 'ledger.json').read_text())
sources = {s['id']: s for s in ledger['sources']}
manifest = json.loads((root / 'source-file-map.json').read_text())
norm = lambda s: re.sub(r'\s+', ' ', s).strip().casefold()
quote_count = 0
for sid, name in manifest.items():
    text = (root / name).read_text()
    for quote in sources[int(sid)].get('quotes', []):
        assert norm(quote['text']) in norm(text), ('quote mismatch', sid)
        quote_count += 1
hashes = {}
for lang in ['en', 'zh']:
    path = root / f'hesperidin-material-choice.{lang}.md'
    lines = path.read_text().splitlines()
    rows = [r for r in reviews if r['language'] == lang]
    assert len(lines) == len(rows)
    assert [(i + 1, t) for i, t in enumerate(lines)] == [(r['line'], r['text']) for r in rows]
    body = path.read_text().split('## Sources')[0]
    for asin in ['B0896SJSK8', 'B001F0QVX4', 'B0FPYN3J4Z', 'B07JZDPJHK']:
        assert f'https://www.amazon.com/dp/{asin}' in body
    assert '本次未取得' not in body and 'ZL' not in body
    ids = set(map(int, re.findall(r'\[(\d+)\]', body)))
    assert all(sources[i].get('quotes') for i in ids)
    tool = Path('/data/hermes/skills/research/grounded-citations/scripts/sources.py')
    result = subprocess.run([sys.executable, str(tool), '--ledger', str(root / 'ledger.json'), 'verify', str(path), '--evidence'], capture_output=True, text=True)
    assert result.returncode == 0, result.stdout + result.stderr
    hashes[path.name] = sha(path)
manifest_path = root / 'SHA256.json'
if manifest_path.exists():
    for name, digest in json.loads(manifest_path.read_text()).items():
        assert sha(root / name) == digest, ('package hash mismatch', name)
print(json.dumps({'status': 'PASS', 'original_files_unchanged': len(inputs), 'preserved_files_identical': len(inputs), 'reviewed_lines': len(reviews), 'matched_evidence_quotes': quote_count, 'draft_sha256': hashes}, indent=2))
