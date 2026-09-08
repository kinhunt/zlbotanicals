import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const expected = {
  'functional-mushroom-market-2026': 'quality-guides',
  'green-tea-energy-beverage-2026': 'application-guides',
  'turmeric-golden-milk-market-2026': 'ingredient-guides',
  'zero-calorie-sweetener-market-2026': 'sourcing-guides',
  'reishi-sleep-market-2026': 'application-guides',
};

test('every existing bilingual article has one honest guide category and industry metadata without changing legacy metadata', () => {
  for (const lang of ['en', 'zh']) {
    const files = readdirSync(new URL(`src/content/blog/${lang}/`, root));
    assert.equal(files.length, 5);
    const populated = new Set();
    for (const file of files) {
      const frontmatter = read(`src/content/blog/${lang}/${file}`).split('---')[1];
      const category = frontmatter.match(/^guideCategory: ["']?([\w-]+)/m)?.[1];
      assert.equal(category, expected[file.replace('.md', '')], file);
      assert.equal((frontmatter.match(/^guideCategory:/gm) || []).length, 1);
      assert.match(frontmatter, /^relatedIndustries: \[(?:["']?(?:beverages|food|cosmetics|nutraceuticals)["']?(?:, )?)+\]/m);
      assert.match(frontmatter, /^category: "ingredient-spotlight"/m);
      assert.match(frontmatter, /^publishDate: "2026-09-07"/m);
      populated.add(category);
    }
    assert.equal(populated.size, 4);
  }
  const schema = read('src/content/config.ts');
  assert.match(schema, /guideCategory: z\.enum\(\[/);
  assert.match(schema, /relatedIndustries: z\.array\(z\.enum\(\[/);
});


test('shared categories provide four bilingual useful scopes without Astro coupling', async () => {
  assert.ok(existsSync(new URL('src/data/resource-guides.ts', root)), 'shared taxonomy exists');
  const { guideCategories } = await import('../src/data/resource-guides.ts');
  assert.equal(guideCategories.length, 4);
  assert.deepEqual(new Set(guideCategories.map(c => c.slug)), new Set(Object.values(expected)));
  for (const lang of ['en', 'zh']) {
    assert.equal(new Set(guideCategories.map(c => c[lang].description)).size, 4);
    for (const c of guideCategories) {
      assert.ok(c[lang].title.length > 2);
      assert.ok(c[lang].description.length > 30);
    }
  }
  assert.doesNotMatch(read('src/data/resource-guides.ts'), /from ['"]astro/);
});


test('resource hubs and archives render accessible filterable guide lists; bilingual categories have static routes', async () => {
  assert.ok(existsSync(new URL('src/components/resources/GuideList.astro', root)), 'shared SSR guide list exists');
  const list = read('src/components/resources/GuideList.astro');
  for (const marker of ['id="ingredient-filter"', 'data-guide-card', 'data-products=', 'aria-live="polite"', 'data-filter-reset', 'data-filter-empty']) assert.ok(list.includes(marker), marker);
  assert.doesNotMatch(list, /<article[^>]*\shidden(?:\s|=|>)/);
  assert.match(list, /post\.data\.relatedProducts\.join\(' '\)/);
  for (const prefix of ['', 'zh/']) {
    assert.match(read(`src/pages/${prefix}resources/index.astro`), /ResourceHub/);
    assert.match(read(`src/pages/${prefix}resources/blog/index.astro`), /GuideList/);
    const category = read(`src/pages/${prefix}resources/[category].astro`);
    assert.match(category, /getStaticPaths/);
    assert.match(category, /guideCategories\.filter/);
    assert.match(category, /data\.guideCategory === category\.slug/);
    assert.match(category, /CategoryPage/);
    const detail = read(`src/pages/${prefix}resources/blog/[slug].astro`);
    assert.match(detail, /post\.data\.guideCategory/);
    assert.match(detail, /\/resources\/\$\{guideCategory\.slug\}/);
  }
  const hub = read('src/components/resources/ResourceHub.astro');
  for (const path of ['/resources/downloads', '/resources/faq', '/quality', '/resources/blog']) assert.ok(hub.includes(path), path);
  const categoryPage = read('src/components/resources/CategoryPage.astro');
  for (const marker of ['aria-label=', 'category[lang].description', '/products/', '/resources/downloads', '/request-quote', 'posts.length']) assert.ok(categoryPage.includes(marker), marker);
  const { transform } = await import('@astrojs/compiler');
  const files = readdirSync(new URL('src/components/resources/', root)).filter(f => f.endsWith('.astro')).map(f => `src/components/resources/${f}`);
  for (const prefix of ['', 'zh/']) for (const file of ['index.astro', '[category].astro', 'blog/index.astro', 'blog/[slug].astro']) files.push(`src/pages/${prefix}resources/${file}`);
  for (const file of files) {
    const result = await transform(read(file), { filename: file });
    assert.equal(result.diagnostics.filter(d => d.severity === 1).length, 0, file);
  }
});

test('actual filter script matches whole ingredient slugs, updates live count, handles empty state and resets', async () => {
  const { transform } = await import('esbuild');
  const { runInNewContext } = await import('node:vm');
  const script = read('src/components/resources/GuideList.astro').match(/<script>([\s\S]*?)<\/script>/)[1];
  const { code } = await transform(script, { loader: 'ts' });
  for (const suffix of ['guides', '篇指南']) {
    const events = {};
    const select = { value: '', addEventListener: (event, fn) => { events[event] = fn; }, focus: () => { events.focused = true; } };
    const reset = { addEventListener: (event, fn) => { events.reset = fn; } };
    const count = { textContent: '' }, empty = { hidden: true }, controls = { hidden: true };
    const cards = ['green-tea monk-fruit', 'turmeric', 'reishi-mushroom green-tea'].map(products => ({ dataset: { products }, hidden: false }));
    const nodes = { '#ingredient-filter': select, '[data-filter-count]': count, '[data-filter-empty]': empty, '[data-filter-controls]': controls, '[data-filter-reset]': reset };
    const list = { dataset: { countSuffix: suffix }, querySelector: key => nodes[key], querySelectorAll: () => cards };
    runInNewContext(code, { document: { querySelectorAll: () => [list] } });
    assert.equal(controls.hidden, false);
    assert.equal(count.textContent, `3 ${suffix}`);
    select.value = 'green-tea'; events.change();
    assert.deepEqual(cards.map(c => c.hidden), [false, true, false]);
    assert.equal(count.textContent, `2 ${suffix}`);
    select.value = 'tea'; events.change();
    assert.ok(cards.every(c => c.hidden));
    assert.equal(empty.hidden, false);
    assert.equal(count.textContent, `0 ${suffix}`);
    events.reset();
    assert.ok(cards.every(c => !c.hidden));
    assert.equal(empty.hidden, true);
    assert.equal(select.value, '');
    assert.equal(events.focused, true);
  }
});
