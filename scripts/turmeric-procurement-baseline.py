"""Compare built scope against an independently built base directory (requires beautifulsoup4)."""
import json
import sys
from pathlib import Path
from bs4 import BeautifulSoup

old, new = Path(sys.argv[1]), Path(sys.argv[2] if len(sys.argv) > 2 else 'dist')
parse = lambda p: BeautifulSoup(p.read_text(), 'html.parser')
old_routes = {str(p.relative_to(old)) for p in old.rglob('index.html')}
new_routes = {str(p.relative_to(new)) for p in new.rglob('index.html')}
assert old_routes == new_routes
changed = []
for route in sorted(old_routes):
    a, b = parse(old / route), parse(new / route)
    assert a.body is not None and b.body is not None
    if a.body.get_text(' ', strip=True) != b.body.get_text(' ', strip=True):
        changed.append(route)
    if '/products/' in '/' + route and not route.endswith('turmeric/index.html'):
        # Turmeric descriptions are reused in category cards, not other product bodies.
        if route.endswith(('botanical-extracts/index.html', 'products/index.html')):
            continue
        assert a.body.get_text(' ', strip=True) == b.body.get_text(' ', strip=True), route
for prefix in ['', 'zh/']:
    route = prefix + 'products/turmeric/index.html'
    a, b = parse(old / route), parse(new / route)
    assert {str(e['id']) for e in a.select('[id]')} <= {str(e['id']) for e in b.select('[id]')}
    route = prefix + 'plant-extracts/ingredients/turmeric/index.html'
    a, b = [parse(p / route).select_one('[data-ingredient-content="turmeric"]') for p in [old, new]]
    assert a is not None and b is not None
    for link in b.select('[data-procurement-link]'):
        link.decompose()
    assert a.get_text(' ', strip=True) == b.get_text(' ', strip=True), 'scientific body changed'
    assert [e['href'] for e in a.select('a[href]')] == [e['href'] for e in b.select('a[href]')]
    assert {str(e['id']) for e in a.select('[id]')} <= {str(e['id']) for e in b.select('[id]')}
print(json.dumps({'passed': True, 'routes': len(old_routes), 'changedVisibleRoutes': changed,
                  'otherProductBodies': 'unchanged', 'scienceMinusProcurementLinks': 'identical',
                  'legacyTurmericIds': 'all retained'}, indent=2))
