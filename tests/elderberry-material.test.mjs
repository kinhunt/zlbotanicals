import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const slug = 'elderberry-material-selection';
for (const lang of ['en', 'zh']) {
  test(`${lang}: complete elderberry commercial research, contextual tables and native sources`, () => {
    const prefix = lang === 'en' ? '' : 'zh/';
    const path = `dist/${prefix}resources/blog/${slug}/index.html`;
    assert.ok(existsSync(path), 'substantive bilingual article exists');
    const html = readFileSync(path, 'utf8');
    for (const value of ['B086BXMF5X','B0FF6GT2NY','B097YTRXG5','HighFiber','B0120169','B0120253','7.00–8.80','6.50–8.10','4.00–5.40','4.10–5.30']) assert.ok(html.includes(value), value);
    assert.equal((html.match(/class="elderberry-table"/g) || []).length, 2);
    assert.equal((html.match(/data-label=/g) || []).length, 12, 'each mobile value carries its method/constituent label');
    for (const id of [1,2,5,7,8,9,10,11]) {
      assert.ok(html.includes(`href="#elderberry-ref-${id}"`));
      assert.equal((html.match(new RegExp(`id="elderberry-ref-${id}"`, 'g')) || []).length, 1);
    }
    for (const route of ['solutions/nutraceuticals','solutions/beverages','request-quote']) assert.ok(html.includes(`href="/${prefix}${route}"`));
    for (const inbound of ['solutions/nutraceuticals','resources/sourcing-guides','resources/blog']) assert.ok(readFileSync(`dist/${prefix}${inbound}/index.html`,'utf8').includes(`/resources/blog/${slug}`), inbound);
    assert.ok(!html.includes('**'), 'no raw strong delimiters');
    assert.ok(!html.includes('175 mg per serving is not 175 mg of anthocyanins'));
    assert.ok(!html.includes('每份175 mg，不等于175 mg花青素'));
  });
}
