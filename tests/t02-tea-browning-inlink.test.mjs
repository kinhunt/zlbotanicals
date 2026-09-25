import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';

// T02 follow-up: the green tea encyclopedia must give the tea browning
// diagnosis article its own contextual internal link (EN + ZH).
const html = (p) => readFileSync(`dist${p}/index.html`, 'utf8');

test('green tea encyclopedia carries exactly one contextual tea-browning link per language', () => {
  for (const lang of ['en', 'zh']) {
    const prefix = lang === 'zh' ? '/zh' : '';
    assert.ok(
      existsSync(`dist${prefix}/resources/blog/tea-browning-diagnosis/index.html`),
      `${lang}: tea-browning-diagnosis article must exist in dist`
    );
    const page = html(`${prefix}/plant-extracts/ingredients/green-tea`);
    const anchors = [...page.matchAll(/<a\s[^>]*href="([^"]*\/resources\/blog\/tea-browning-diagnosis[^"]*)"[^>]*>([\s\S]*?)<\/a>/g)];
    assert.equal(
      anchors.length,
      1,
      `${lang}: expected exactly one tea-browning anchor on the green tea encyclopedia, found ${anchors.length}`
    );
    const [href, labelHtml] = anchors[0].slice(1);
    assert.equal(
      href,
      `${prefix}/resources/blog/tea-browning-diagnosis`,
      `${lang}: anchor must point to the same-language article`
    );
    const label = labelHtml.replace(/<[^>]*>/g, '').trim();
    assert.ok(label.length >= 10, `${lang}: anchor label is missing or too short: "${label}"`);
    assert.ok(
      lang === 'zh' ? label.includes('褐') : /brown|haze|colour|color/i.test(label),
      `${lang}: anchor label should describe the browning topic, got "${label}"`
    );
  }
});

test('tea-browning target pages keep their own inbound links from the tea family article', () => {
  // The diagnosis article stays reachable from tea-haze-diagnosis in both languages,
  // so the new encyclopedia link is additive rather than a replacement.
  for (const lang of ['en', 'zh']) {
    const prefix = lang === 'zh' ? '/zh' : '';
    const page = html(`${prefix}/resources/blog/tea-haze-diagnosis`);
    assert.ok(page.includes(`href="${prefix}/resources/blog/tea-browning-diagnosis"`), `${lang}: existing tea-haze inbound link lost`);
  }
});
