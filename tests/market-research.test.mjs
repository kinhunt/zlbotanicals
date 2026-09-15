import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
const read = p => readFileSync(new URL(`../dist/${p}/index.html`, import.meta.url), 'utf8');
for (const [prefix, title] of [['', 'Functional Mushroom Market: Size, Growth Segments and Brand Positioning'], ['zh/', '功能性蘑菇市场：规模、增长细分与品牌定位']]) {
  test(`${prefix || 'en'} market article has a distinct, discoverable, attributed reading journey`, () => {
    const path = `${prefix}research/market/functional-mushrooms`;
    assert.ok(existsSync(new URL(`../dist/${path}/index.html`, import.meta.url)), 'new market article route exists');
    const html = read(path);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok(html.includes(title));
    assert.ok(html.includes(`rel="canonical" href="https://zlbotanicals.com/${path}"`));
    for (const [locale, p] of [['en', ''], ['zh-CN', 'zh/']]) assert.ok(html.includes(`hreflang="${locale}" href="https://zlbotanicals.com/${p}research/market/functional-mushrooms"`));
    assert.match(html, /<time[^>]+datetime="2026-09-15"/);
    assert.match(html, /"@type":"Article"/);
    const article = html.match(/<article\b[\s\S]*?<\/article>/)[0];
    for (const number of ['8.66%', '46.43%', '9.78%', '36.22%', '10.69%', '22.81%', '34.57%', '9.04%']) assert.ok(article.includes(number), number);
    assert.match(article, /Mordor Intelligence/);
    assert.match(article, prefix ? /预计|预测/ : /forecast/);
    assert.match(article, prefix ? /不能相加或相除/ : /not added together or divided/);
    const asins = [...new Set(article.match(/B[A-Z0-9]{9}/g))];
    assert.deepEqual(asins.sort(), ['B07D32VNLP','B07NY3WR4L','B002WJ1BZK','B08LP6CZQR','B01JNNAQVW'].sort());
    assert.doesNotMatch(article, /goji|枸杞/i);
    for (let id=1; id<=10; id++) {
      assert.ok(article.includes(`href="#market-ref-${id}"`), `clickable citation ${id}`);
      assert.ok(article.includes(`id="market-ref-${id}"`), `reference ${id}`);
    }
    assert.match(article, /https:\/\/www.mordorintelligence.com\/industry-reports\/mushroom-supplements-market/);
    assert.match(article, /https:\/\/www.amazon.com\/dp\/B07D32VNLP\?th=1/);
    for (const target of ['products/reishi-mushroom','plant-extracts/ingredients/reishi-mushroom']) assert.ok(article.includes(`href="/${prefix}${target}"`));
    assert.equal((article.match(/role="region"/g)||[]).length, 2);
    assert.equal((article.match(/tabindex="0"/g)||[]).length, 2);
    assert.ok(read(`${prefix}research`).includes(`href="/${path}"`), 'market entry links article');
    const legacy = read(`${prefix}resources/blog/functional-mushroom-market-2026`);
    assert.match(legacy, prefix ? /采购|质量/ : /Sourcing|Quality|quality/);
  });
}
