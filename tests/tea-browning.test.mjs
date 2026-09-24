import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync, readdirSync} from 'node:fs';

const slug = 'resources/blog/tea-browning-diagnosis';
const files = { zh: `src/content/blog/zh/tea-browning-diagnosis.md`, en: `src/content/blog/en/tea-browning-diagnosis.md` };
const titles = {
  zh: '茶汤变深但不变浑：先查碱度，再看矿物盐与持液时间',
  en: 'Why Tea Drinks Turn Brown Without Turning Hazy: Alkalinity, Minerals and Holding Time',
};
const REF_COUNT = 9;
const H2_COUNT = 12; // 11 reviewed sections + the reference heading
const read = p => readFileSync(p, 'utf8');
const frontmatter = text => text.match(/^---\n([\s\S]*?)\n---\n/)?.[1];
const line = (fm, key) => fm.match(new RegExp(`^${key}: (.*)$`, 'm'))?.[1];

// Resolve a site-internal path to a route source under src/pages.
function routeExists(fullPath) {
  const zh = fullPath.startsWith('/zh/');
  const prefix = zh ? 'zh/' : '';
  const clean = fullPath.replace(/^\/(zh\/)?/, '').replace(/#.*$/, '');
  if (existsSync(`src/pages/${prefix}${clean}.astro`)) return true;
  if (existsSync(`src/pages/${prefix}${clean}/index.astro`)) return true;
  if (clean.startsWith('resources/blog/')) {
    const name = clean.split('/').pop();
    return existsSync(`src/pages/${prefix}resources/blog/[slug].astro`) && existsSync(`src/content/blog/${zh ? 'zh' : 'en'}/${name}.md`);
  }
  const parts = clean.split('/').filter(Boolean);
  for (let i = parts.length; i > 0; i--) {
    const dir = `src/pages/${prefix}${parts.slice(0, i).join('/')}`;
    if (existsSync(`${dir}/[...path].astro`)) return true;
    if (i < parts.length && existsSync(`${dir}/[slug].astro`)) return true;
  }
  return false;
}

for (const lang of ['zh', 'en']) {
  test(`${lang} browning article exists with the required frontmatter`, () => {
    assert.ok(existsSync(files[lang]), `${files[lang]} must exist`);
    const text = read(files[lang]);
    const fm = frontmatter(text);
    assert.ok(fm, 'frontmatter block present');
    for (const key of ['title', 'lang', 'publishDate', 'category', 'guideCategory', 'relatedIndustries', 'tags', 'description', 'relatedProducts', 'relatedSolutions', 'sources']) {
      assert.ok(new RegExp(`^${key}:`, 'm').test(fm), `${key} required`);
    }
    assert.equal(line(fm, 'lang'), `"${lang}"`);
    assert.equal(line(fm, 'publishDate'), '"2026-09-24"');
    assert.equal(line(fm, 'category'), '"research"');
    assert.equal(line(fm, 'guideCategory'), '"application-guides"');
    assert.match(line(fm, 'title') ?? '', new RegExp(titles[lang].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(fm, /^relatedIndustries: \["beverages"\]/m);
    assert.match(fm, /^relatedProducts: \["green-tea"\]/m);
    assert.match(fm, /^relatedSolutions: \["green-tea-energy-sparkling"\]/m);
    assert.ok((line(fm, 'tags') ?? '').length > 5, 'tags non-empty');
    assert.ok((line(fm, 'description') ?? '').replace(/"/g, '').length > 60, 'description is specific');
    assert.doesNotMatch(text, /\]\(\/en\//, 'English copy must use root routes');
  });

  test(`${lang} body keeps the reviewed heading blocks and reference list`, () => {
    const text = read(files[lang]);
    assert.equal((text.match(/^## /gm) || []).length, H2_COUNT, 'H2 blocks');
    assert.match(text, /^## (参考文献|Sources)$/m, 'reference heading present');
    const body = text.split(/^## (?:参考文献|Sources)$/m)[0];
    assert.equal((body.match(/^## /gm) || []).length, H2_COUNT - 1, 'reviewed H2 blocks');
    assert.doesNotMatch(body, /## 元信息|## Sources/, 'draft meta blocks must not be published');
  });

  test(`${lang} citation anchors match the sources list one-to-one`, () => {
    const text = read(files[lang]);
    const [body, sources] = text.split(/^## (?:参考文献|Sources)$/m);
    assert.ok(sources, 'sources section exists');
    const cited = [...new Set([...body.matchAll(/#tea-browning-ref-(\d+)/g)].map(m => Number(m[1])))].sort((a, b) => a - b);
    assert.deepEqual(cited, Array.from({ length: REF_COUNT }, (_, i) => i + 1), 'every source is cited in the body');
    const listed = [...sources.matchAll(/<p id="tea-browning-ref-(\d)">/g)].map(m => Number(m[1])).sort((a, b) => a - b);
    assert.deepEqual(listed, Array.from({ length: REF_COUNT }, (_, i) => i + 1), 'sources list is numbered 1..9 with unique ids');
    for (const [, n] of sources.matchAll(/<p id="tea-browning-ref-(\d)">\[<a href="https:\/\/[^"]+">/g)) assert.ok(n);
    assert.equal((sources.match(/<a href="https:\/\/[^"]+">/g) || []).length, REF_COUNT, 'each source carries a link');
    assert.equal((sources.match(/2026-09-24/g) || []).length, REF_COUNT, 'accessed date on every source');
    for (const entry of sources.split('\n').filter(l => l.startsWith('<p id='))) assert.ok(/2026-09-24/.test(entry), 'dated source line');
    for (let n = 1; n <= REF_COUNT; n++) {
      assert.equal((text.match(new RegExp(`id="tea-browning-ref-${n}"`, 'g')) || []).length, 1, `unique anchor ${n}`);
      assert.ok(body.includes(`href="#tea-browning-ref-${n}"`), `body links to ${n}`);
      assert.ok(body.includes(`>[${n}]</a>`), `inline marker ${n} rendered as a link`);
    }
  });

  test(`${lang} internal links point at routes that exist`, () => {
    const text = read(files[lang]);
    const hrefs = [...text.matchAll(/<a href="(\/[^"]*)"/g)].map(m => m[1]);
    assert.ok(hrefs.length >= 3, 'body carries the approved internal links');
    const expected = lang === 'zh'
      ? ['/zh/resources/blog/tea-haze-diagnosis', '/zh/plant-extracts/ingredients/green-tea', '/zh/resources/blog/green-tea-energy-beverage-2026']
      : ['/resources/blog/tea-haze-diagnosis', '/plant-extracts/ingredients/green-tea', '/resources/blog/green-tea-energy-beverage-2026'];
    for (const path of expected) assert.ok(hrefs.includes(path), `missing internal link ${path}`);
    for (const path of hrefs) assert.ok(routeExists(path), `no route for ${path}`);
  });
}

test('T01 tea-haze article links back to the browning companion in both languages', () => {
  for (const lang of ['zh', 'en']) {
    const text = read(`src/content/blog/${lang}/tea-haze-diagnosis.md`);
    const path = lang === 'zh' ? '/zh/resources/blog/tea-browning-diagnosis' : '/resources/blog/tea-browning-diagnosis';
    assert.ok(text.includes(`<a href="${path}">`), `${lang} backlink`);
    const line25 = text.split('\n').find(l => l.includes('#tea-haze-ref-3') && (l.includes('如果颜色明显加深') || l.includes('darkening is pronounced')));
    assert.ok(line25, `${lang} browning triage paragraph kept`);
    assert.ok(line25.includes(path), `${lang} backlink sits in the triage paragraph`);
    assert.ok(line25.includes('而不是直接收紧滤芯') || line25.includes('before specifying a finer filter'), 'original sentence untouched');
  }
});

test('built pages render the browning article and its discovery links', () => {
  for (const lang of ['zh', 'en']) {
    const prefix = lang === 'zh' ? 'zh/' : '';
    const path = `dist/${prefix}${slug}/index.html`;
    assert.ok(existsSync(path), `${path} must be built`);
    const html = read(path);
    assert.ok(html.includes(`https://zlbotanicals.com/${prefix}${slug}`), 'canonical');
    assert.equal((html.match(/<h1\b/g) || []).length, 1, 'single H1');
    assert.ok(html.includes('<h2'), 'sections rendered');
    assert.equal((html.match(/id="tea-browning-ref-/g) || []).length, REF_COUNT, 'anchors survive the build');
    assert.ok(html.includes('href="#tea-haze-ref-3"') || html.includes('href="#tea-browning-ref-3"'));
    assert.ok(readFileSync(`dist/${prefix}resources/blog/tea-haze-diagnosis/index.html`, 'utf8').includes(`/${prefix}${slug}`), 'T01 discovery link');
    for (const inbound of ['resources/blog', 'resources/application-guides']) {
      assert.ok(readFileSync(`dist/${prefix}${inbound}/index.html`, 'utf8').includes(`/${prefix}${slug}`), `${inbound} lists the article`);
    }
    for (const path of ['/zh/plant-extracts/ingredients/green-tea', '/plant-extracts/ingredients/green-tea', '/zh/resources/blog/green-tea-energy-beverage-2026', '/resources/blog/green-tea-energy-beverage-2026']) {
      assert.ok(existsSync(`dist${path}/index.html`), `${path} built`);
    }
  }
  assert.equal(readdirSync('src/content/blog/zh').filter(f => f.endsWith('.md')).length, 36, 'one new bilingual article per language');
});
