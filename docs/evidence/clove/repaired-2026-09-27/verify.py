"""Read-only verification of this frozen research package; stdout is JSON."""
from pathlib import Path
import hashlib, json, re, xml.etree.ElementTree as ET
B = Path(__file__).resolve().parent
checks = []
def check(label, result):
    checks.append({'check': label, 'pass': bool(result)})
def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()
ids = ['PMC11764740', 'PMC11899151', 'PMC11510493']
roots = {i: ET.parse(B/'sources'/f'{i}.xml').getroot() for i in ids}
for r in json.loads((B/'retrieval.json').read_text()):
    check('fresh source hash '+r['id'], sha(B/'sources'/f"{r['id']}.xml") == r['sha256'])
for path, expected in json.loads((B/'preserved-hashes.json').read_text()).items():
    check('preserved '+path, sha(B/path) == expected)
claims = json.loads((B/'claim-ledger.json').read_text())
for c in claims:
    root = roots[ids[c['source_id']-1]]
    if 'rows' in c:
        tid = re.search("@id='([^']+)'", c['locator']).group(1)
        table = root.find(f".//table-wrap[@id='{tid}']")
        rows = [[''.join(cell.itertext()).strip() for cell in row if cell.tag in ('td','th')] for row in table.findall('.//tr')]
        check(c['claim_id']+' original cells', rows == c['rows'])
    else:
        check(c['claim_id']+' verbatim original node', c['verbatim'] in ''.join(root.itertext()))
table = roots[ids[0]].find(".//table-wrap[@id='foods-14-00237-t002']")
rows = [[''.join(c.itertext()).strip() for c in r if c.tag in ('td','th')] for r in table.findall('.//tr')]
for lang in ('en','zh'):
    text = (B/f'article.{lang}.md').read_text()
    for row in rows[1:7]:
        ratio = row[0].replace('MD','').replace('GA','')
        expected = f'| {ratio} | {row[4]} | {row[5]} |'
        check(f'{lang} row {ratio}', expected in text)
    check(lang+' p values', 'p = 0.17' in text and 'p < 0.01' in text and rows[-1][4] == '0.17' and rows[-1][5] == '<0.01')
    check(lang+' new ratio conflict retained', '1:6' in text and '1:2' in text)
    sentences = re.split(r'(?<=[.!?。！？])(?=(?:\[\d+\])*\s)', text.split('## Sources')[0])
    check(lang+' at most three distinct source IDs per sentence', all(len(set(re.findall(r'\[(\d+)\]',s))) <= 3 for s in sentences))
for p in json.loads((B/'numeric-claims.json').read_text()):
    lines = (B/f"article.{p['language']}.md").read_text().splitlines()
    check('numeric paragraph '+p['language']+':'+str(p['line']), lines[p['line']-1] == p['text'] and bool(p['claim_ids']) and all(any(c['claim_id']==i for c in claims) for i in p['claim_ids']))
for path, expected in json.loads((B/'final-hashes.json').read_text()).items():
    check('final binding '+path, sha(B/path) == expected)
print(json.dumps({'passed':sum(c['pass'] for c in checks), 'total':len(checks),'checks':checks},indent=2))
raise SystemExit(0 if all(c['pass'] for c in checks) else 1)
