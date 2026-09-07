import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = p => readFileSync(new URL(`../dist/${p}`, import.meta.url), 'utf8');
test('product directory metadata does not claim blanket certification', () => {
 for(const prefix of ['', 'zh/']) assert.doesNotMatch(read(`${prefix}products/index.html`), /GMP certified|GMP认证/i);
});
test('product pages have page-specific canonical and language alternates', () => {
  for (const prefix of ['', 'zh/']) {
    const html = read(`${prefix}products/green-tea/index.html`);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://zlbotanicals.com/${prefix}products/green-tea"`));
    assert.match(html, /hreflang="en" href="https:\/\/zlbotanicals.com\/products\/green-tea"/);
    assert.match(html, /hreflang="zh-CN" href="https:\/\/zlbotanicals.com\/zh\/products\/green-tea"/);
    assert.match(html, /property="og:title"/);
  }
});
