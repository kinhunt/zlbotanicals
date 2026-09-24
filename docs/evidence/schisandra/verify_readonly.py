"""Read-only artifact/table/hash checks. Run from any directory; writes nothing."""
from pathlib import Path
import hashlib
import json
import re
import subprocess
import xml.etree.ElementTree as ET

BASE = Path(__file__).resolve().parent

def tables(name):
    root = ET.parse(BASE / 'sources' / (name + '.xml')).getroot()
    return {t.findtext('label'): [[ ''.join(c.itertext()) for c in row] for row in t.findall('.//tr')] for t in root.findall('.//table-wrap')}

def main():
    en = (BASE / 'article.en.md').read_text()
    zh = (BASE / 'article.zh.md').read_text()
    deacid = tables('PMC7766944')
    omija = tables('PMC7918357')
    for text in [en, zh]:
        assert len(re.findall(r'^\|---', text, re.M)) == 3
        for row in omija['Table 3'][1:]:
            value = re.sub(r' [ab]$', '', row[-1])
            assert value in text, value
        for acid, lignan in zip(deacid['Table 1'][1:], deacid['Table 2'][1:]):
            for value in [acid[2], re.sub(r' a$', '', lignan[2])]:
                assert value in text, value
        for value in ['86.29', '88.00', '70.60', '38.32', '>9%', '47.42 ± 2.81', '3.20 ± 0.44']:
            assert value in text, value
        assert sorted(set(re.findall(r'\[(\d+)\]', text))) == ['1','2','3','4','5']
    # Table numeric parity independent of prose/date/tokenization.
    nums = lambda text: [re.findall(r'\d+(?:\.\d+)?', line) for line in text.splitlines() if line.startswith('|') and not line.startswith('|---')]
    assert nums(en) == nums(zh)
    script = '/data/hermes/skills/research/grounded-citations/scripts/sources.py'
    for lang in ['en','zh']:
        subprocess.run(['python',script,'--ledger',str(BASE/'ledger.json'),'verify',str(BASE/f'article.{lang}.md'),'--strict','--evidence'],check=True)
    manifest = json.loads((BASE/'SHA256SUMS.json').read_text())
    for rel, expected in manifest.items():
        assert hashlib.sha256((BASE/rel).read_bytes()).hexdigest() == expected, rel
    print(json.dumps({'status':'PASS','article_languages':['en','zh'],'tables_per_language':3,'source_table_cells':'matched original XML','table_numeric_parity':True,'sha256_files_verified':len(manifest),'scope':'content artifact checks, not rendered site or deployment'},ensure_ascii=False))

if __name__ == '__main__':
    main()
