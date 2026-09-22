import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
// HTTP200 production observation, 2026-09-21; never filesystem order.
for (const [prefix, last] of [['', 'green-tea'], ['zh/', 'green-tea']]) {
  test(`${prefix}homepage preserves production featured selection and order`, () => {
    const html = readFileSync(`dist/${prefix}index.html`, 'utf8');
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
    const actual = [...main.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)].map(m => m[1]).filter(h => h.startsWith(`/${prefix}products/`));
    assert.deepEqual(actual, ['centella-asiatica','ginkgo-biloba','ginseng','goji-berry','grape-seed',last].map(id => `/${prefix}products/${id}`));
  });
}
