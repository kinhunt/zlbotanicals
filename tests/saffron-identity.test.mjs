import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

for (const lang of ['en', 'zh']) {
  const prefix = lang === 'zh' ? 'zh/' : '';
  test(`${lang}: saffron research guide retains approved prose, comparison fields and sources`, () => {
    const path = `dist/${prefix}resources/blog/saffron-identity/index.html`;
    assert.ok(existsSync(path), 'substantive saffron article exists');
    const html = readFileSync(path, 'utf8');
    assert.match(html, /saffron-identity/);
    assert.equal((html.match(/class="saffron-table"/g) || []).length, 1);
    assert.equal((html.match(/scope="row"/g) || []).length, 3);
    assert.equal((html.match(/class="mobile-label"/g) || []).length, 6);
    for (const id of [1, 2]) {
      assert.equal((html.match(new RegExp(`id="saffron-ref-${id}"`, 'g')) || []).length, 1);
      assert.match(html, new RegExp(`href="#saffron-ref-${id}"`));
    }
    assert.match(html, /PMC10474180\/fullTextXML/);
    assert.match(html, /PMC9601413\/fullTextXML/);
    assert.match(html, lang === 'en' ? /not its mass fraction in saffron/ : /不是它在藏红花中的质量分数/);
    assert.match(html, lang === 'en' ? /not a test of a manufactured extract ingredient/ : /并非对工业生产的提取物原料进行验证/);
    assert.match(html, lang === 'en' ? /Sources<\/h2>/ : /来源<\/h2>/);
    assert.doesNotMatch(html, /Interested in our botanical extracts\?|对我们的植物提取物感兴趣？|\/products\/saffron/);
    assert.ok(!existsSync(`dist/${prefix}products/saffron/index.html`));
  });
}

for (const prefix of ['', 'zh/']) {
  test(`${prefix || 'en'}: existing quality and botanical pages offer research discovery`, () => {
    for (const route of ['quality', 'products/botanical-extracts']) {
      const html = readFileSync(`dist/${prefix}${route}/index.html`, 'utf8');
      assert.ok(html.includes(`href="/${prefix}resources/blog/saffron-identity"`), `${route} inbound link`);
    }
    for (const route of ['resources/blog', 'resources/sourcing-guides']) {
      const html = readFileSync(`dist/${prefix}${route}/index.html`, 'utf8');
      assert.ok(html.includes(`/${prefix}resources/blog/saffron-identity`), `${route} archive discovery`);
    }
  });
}
