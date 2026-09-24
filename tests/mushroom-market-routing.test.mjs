import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const baseline = 'ad1be2518197567deacc5918c7a3ae7947f1e8b7';
for (const lang of ['en', 'zh']) {
  const prefix = lang === 'zh' ? '/zh' : '';
  const destination = `${prefix}/research/market/functional-mushrooms#reishi-extract-market`;
  test(`${lang}: market reading route follows the introduction without replacing procurement content`, () => {
    const path = `src/content/blog/${lang}/functional-mushroom-market-2026.md`;
    const original = execFileSync('git', ['show', `${baseline}:${path}`], { encoding: 'utf8' });
    const source = readFileSync(path, 'utf8');
    const oldOpening = original.slice(0, original.indexOf('\n## '));
    const oldRemainder = original.slice(original.indexOf('\n## '));
    assert.ok(source.startsWith(oldOpening), 'metadata and introduction preserved');
    assert.ok(source.endsWith(oldRemainder), 'entire existing procurement body and footer preserved');
    const added = source.slice(oldOpening.length, source.length - oldRemainder.length);
    assert.ok(added.includes(`](${destination})`), 'missing market reading link immediately after introduction');
    assert.equal(added.trim().split('\n').length, 1, 'one bounded reading paragraph, no report rewrite');
    assert.match(added, lang === 'en' ? /product formats/ : /商品形态/);
    assert.match(added, lang === 'en' ? /below/ : /下文/);
    const html = readFileSync(`dist${prefix}/resources/blog/functional-mushroom-market-2026/index.html`, 'utf8');
    const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1];
    assert.ok(article, 'rendered article exists');
    const opening = article.split('<h2')[0];
    assert.ok(opening.includes(`href="${destination}"`), 'native link appears before first procurement heading');
    const target = readFileSync(`dist${prefix}/research/market/functional-mushrooms/index.html`, 'utf8');
    assert.equal((target.match(/id="reishi-extract-market"/g) || []).length, 1, 'destination anchor exists exactly once');
  });
}
