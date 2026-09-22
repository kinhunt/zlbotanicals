import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { parse } from 'parse5';

const read = path => readFileSync(path, 'utf8');
const entries = read('dist/sitemap-0.xml').match(/<url>.*?<\/url>/g);
const loc = entry => entry.match(/<loc>(.*?)<\/loc>/)[1];
const teaUrl = /^https:\/\/zlbotanicals\.com\/(?:zh\/)?products\/tea-extracts\/?$/;
const nodes = node => [node, ...(node.childNodes ?? []).flatMap(nodes)];
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;

for (const prefix of ['', 'zh/']) {
  test(`${prefix || 'en/'}tea sitemap loc and localized alternates exactly match HTML canonical policy`, () => {
    const canonical = `https://zlbotanicals.com/${prefix}products/tea-extracts`;
    const html = nodes(parse(read(`dist/${prefix}products/tea-extracts/index.html`)));
    assert.equal(attr(html.find(n => attr(n, 'rel') === 'canonical'), 'href'), canonical);
    const entry = entries.find(e => loc(e).replace(/\/$/, '') === canonical);
    assert.ok(entry, 'tea entry exists');
    assert.equal(loc(entry), canonical, 'sitemap loc must be exactly slashless canonical');
    const links = [...entry.matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\/>/g)];
    assert.deepEqual(links.map(m => m[1]).sort(), ['en', 'zh-CN']);
    for (const [, lang, href] of links) {
      assert.equal(href, attr(html.find(n => attr(n, 'hreflang') === lang), 'href'), `${lang} exact HTML hreflang parity`);
    }
  });
}

test('bounded tea serialization preserves every pre-existing sitemap entry byte-for-byte', () => {
  assert.equal(entries.length, 232);
  const existing = entries.filter(entry => !teaUrl.test(loc(entry)) && !/\/resources\/blog\/(?:chicory-fibre-selection|vanilla-authentication|vanilla-material-choice|cranberry-pac-purchasing|hesperidin-material-choice|hibiscus-color-endpoints|saffron-identity|elderberry-material-selection|paprika-extract-format-selection|ginseng-heat-bitterness|uk-sdil-milk-tea-2028)\/?$/.test(loc(entry)));
  assert.equal(existing.length, 208);
  // Frozen pre-remediation sitemap, excluding only the new bilingual tea pair.
  assert.equal(createHash('sha256').update(existing.join('')).digest('hex'),
    'ece3fc4725ae6ea92536e832a98e42c235bb3852ab966382a47380cb739b75aa');
});
