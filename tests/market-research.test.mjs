import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
const read = p => readFileSync(new URL(`../dist/${p}/index.html`, import.meta.url), 'utf8');
for (const [prefix, title] of [['', 'Mushroom Supplements Market Expected to Reach USD 8.83 Billion by 2031'], ['zh/', '蘑菇补充剂市场预计2031年达88.3亿美元']]) {
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
    for (const number of ['8.66%', '46.43%', '9.78%', '36.22%', '10.69%', '75.8%', '34.57%', '114.5%']) assert.ok(article.includes(number), number);
    assert.match(article, /Mordor Intelligence/);
    assert.match(article, prefix ? /预计|预测/ : /forecast/);
    assert.doesNotMatch(article.replace(/<[^>]+>/g, ""), /\bAmazon\b|\bASIN\b|B07D32VNLP|\bgoji\b|枸杞/i);
    for (let id=1; id<=22; id++) {
      assert.ok(article.includes(`href="#market-v3-ref-${id}"`), `clickable citation ${id}`);
      assert.ok(article.includes(`id="market-v3-ref-${id}"`), `reference ${id}`);
    }
    assert.match(article, /https:\/\/www.mordorintelligence.com\/industry-reports\/mushroom-supplements-market/);
    assert.match(article, /hg144-hmr.pdf/);
    for (const target of ['products/reishi-mushroom','plant-extracts/ingredients/reishi-mushroom']) assert.ok(article.includes(`href="/${prefix}${target}"`));
    assert.equal((article.match(/role="region"/g)||[]).length, 4);
    assert.equal((article.match(/tabindex="0"/g)||[]).length, 4);
    assert.ok(read(`${prefix}research`).includes(`href="/${path}"`), 'market entry links article');
    const legacy = read(`${prefix}resources/blog/functional-mushroom-market-2026`);
    assert.match(legacy, prefix ? /采购|质量/ : /Sourcing|Quality|quality/);
  });
}
