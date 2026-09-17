import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import sharp from 'sharp';

const image = '/images/research/mushroom-comparison-zh.webp';
const page = lang => readFileSync(`dist/${lang === 'zh' ? 'zh/' : ''}research/market/functional-mushrooms/index.html`, 'utf8');

test('Chinese market article serves a decoded square infographic without changing English imagery', async () => {
  assert.ok(existsSync(`public${image}`), 'approved infographic exists');
  const { info } = await sharp(`public${image}`).raw().toBuffer({ resolveWithObject: true });
  assert.equal(info.width, 1254);
  assert.equal(info.height, info.width);
  const zh = page('zh');
  const tag = zh.match(/<img\b[^>]*mushroom-comparison-zh\.webp[^>]*>/g) || [];
  assert.equal(tag.length, 1);
  assert.match(tag[0], /width="1254"/);
  assert.match(tag[0], /height="1254"/);
  assert.match(tag[0], /loading="lazy"/);
  assert.match(tag[0], /alt="[^"]*子实体[^"]*菌丝体[^"]*提取物[^"]*"/);
  assert.ok(!page('en').includes(image));
  assert.match(zh, /提取物可来自子实体或菌丝体/);
  assert.match(zh, /含量标示口径/);
  for (const lang of ['zh', 'en']) {
    for (const match of page(lang).matchAll(/<img\b[^>]*src="(\/[^"?#]+)[^"]*"/g)) {
      assert.ok(existsSync(`dist${match[1]}`), `missing ${match[1]}`);
    }
  }
});
