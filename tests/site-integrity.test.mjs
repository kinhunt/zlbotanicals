import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync, existsSync} from 'node:fs';
import {join, resolve} from 'node:path';
const dist = resolve('dist');
function files(dir) { return readdirSync(dir, {withFileTypes: true}).flatMap(e => e.isDirectory() ? files(join(dir,e.name)) : [join(dir,e.name)]); }
const pages = files(dist).filter(p => p.endsWith('.html'));
assert.ok(pages.length >= 96, 'Run a complete build before the integrity suite');
assert.ok(pages.includes(join(dist, 'index.html')) && pages.includes(join(dist, 'zh/index.html')), 'Both localized homepages must exist');
test('every internal page and asset link resolves in the static build', () => {
  const missing = [];
  for (const page of pages) {
    const html = readFileSync(page,'utf8');
    for (const [,raw] of html.matchAll(/(?:href|src)="(\/[^"\s]*)"/g)) {
      if (raw.startsWith('//')) continue;
      const path = decodeURIComponent(raw.split(/[?#]/)[0]);
      const target = join(dist, path);
      if (!existsSync(target) && !existsSync(join(target,'index.html'))) missing.push(`${page.replace(dist,'')} -> ${path}`);
    }
  }
  assert.deepEqual([...new Set(missing)], []);
});
test('every page has a single H1, title, description and canonical', () => {
  const failures = [];
  for (const page of pages) {
    const html = readFileSync(page,'utf8');
    for (const [name, pattern] of [['h1', /<h1\b/g], ['title', /<title>/g], ['description', /<meta name="description"/g], ['canonical', /<link rel="canonical"/g]]) {
      // SVG accessibility titles are valid additional title elements.
      if (name === 'title') { if (!/<head>[\s\S]*?<title>[^<]+<\/title>/.test(html)) failures.push(page + ': missing head title'); continue; }
      const count = [...html.matchAll(pattern)].length;
      if(count !== 1) failures.push(`${page.replace(dist,'')}: ${name}=${count}`);
    }
  }
  assert.deepEqual(failures, []);
});
