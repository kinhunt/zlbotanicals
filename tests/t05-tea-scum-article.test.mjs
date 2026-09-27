import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync, readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

// T05: the re-review-approved bilingual "tea scum / tea film" water-check
// article must exist as a published (non-draft) article in both languages,
// with the reviewed titles, the two expected internal links, a Sources /
// 参考文献 section, and citations that resolve to their own anchors.

const base = fileURLToPath(new URL('../src/content/blog/', import.meta.url));
const SLUG = 'tea-scum-vs-tea-cream';

const expected = {
  en: {
    file: `${base}en/${SLUG}.md`,
    title: 'Surface Film or Bottom Sediment? Two Mechanisms, Two Water Checks for Tea Scum',
    sourcesHeading: '## Sources',
    linked: ['/resources/blog/tea-haze-diagnosis', '/resources/blog/tea-browning-diagnosis'],
  },
  zh: {
    file: `${base}zh/${SLUG}.md`,
    title: '杯口的膜与瓶底的浑分属两套机制：茶膜（tea scum）的水质排查',
    sourcesHeading: '## 参考文献',
    // zh articles hardcode the /zh/ prefix on internal links (site convention).
    linked: ['/zh/resources/blog/tea-haze-diagnosis', '/zh/resources/blog/tea-browning-diagnosis'],
  },
};

const frontmatter = (text) => {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(m, 'frontmatter block present');
  return m[1];
};
const field = (fm, name) => {
  const m = fm.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'));
  return m ? m[1].trim() : null;
};

for (const lang of ['en', 'zh']) {
  const spec = expected[lang];

  test(`T05 ${lang}: article file exists with reviewed title, lang and publishDate`, () => {
    assert.ok(existsSync(spec.file), `${spec.file} must exist`);
    const text = readFileSync(spec.file, 'utf8');
    const fm = frontmatter(text);
    assert.equal(field(fm, 'title'), `"${spec.title}"`, 'title matches the reviewed H1 exactly');
    assert.equal(field(fm, 'lang'), '"en"'.replace('en', lang), 'lang matches');
    assert.equal(field(fm, 'publishDate'), '"2026-09-25"', 'publishDate kept from the reviewed draft');
    assert.equal(field(fm, 'sources'), '[]', 'published precedent keeps sources: []');
    assert.equal(field(fm, 'draft'), null, 'published articles omit the draft flag entirely');
  });

  test(`T05 ${lang}: structure — single H1 source, linked articles, Sources section`, () => {
    const text = readFileSync(spec.file, 'utf8');
    const body = text.replace(/^---\n[\s\S]*?\n---\n/, '');
    // The title frontmatter is the page H1; the markdown body must not add another.
    const h1 = body.match(/^# [^#]/gm) || [];
    assert.equal(h1.length, 0, `body must not contain a markdown H1 (found ${h1.length})`);
    assert.ok((body.match(/^## /gm) || []).length >= 5, 'sections rendered as H2');
    assert.ok(body.includes(spec.sourcesHeading), `${spec.sourcesHeading} section present`);
    for (const href of spec.linked) {
      assert.ok(body.includes(`href="${href}"`), `internal link to ${href} present`);
    }
  });

  test(`T05 ${lang}: citation ids resolve both ways`, () => {
    const text = readFileSync(spec.file, 'utf8');
    const anchors = [...text.matchAll(/href="#(tea-scum-ref-s\d+)"/g)].map(m => m[1]);
    const ids = [...text.matchAll(/<p id="(tea-scum-ref-s\d+)">/g)].map(m => m[1]);
    assert.ok(anchors.length > 0, 'article cites at least one source');
    assert.equal(new Set(ids).size, ids.length, 'no duplicate source ids');
    const idSet = new Set(ids);
    const orphan = anchors.filter(a => !idSet.has(a));
    assert.deepEqual(orphan, [], `every anchor resolves to a <p id>: ${orphan.join(', ')}`);
    const unused = ids.filter(id => !anchors.includes(id));
    assert.deepEqual(unused, [], `every source id is cited: ${unused.join(', ')}`);
  });
}

test('T05 built pages exist, carry exactly one H1 and keep both internal links', () => {
  for (const lang of ['en', 'zh']) {
    const prefix = lang === 'zh' ? '/zh' : '';
    const page = `dist${prefix}/resources/blog/${SLUG}/index.html`;
    assert.ok(existsSync(page), `${page} must be built`);
    const html = readFileSync(page, 'utf8');
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${lang}: exactly one H1`);
    assert.ok(html.includes(`https://zlbotanicals.com${prefix}/resources/blog/${SLUG}`), `${lang}: canonical`);
    for (const href of ['/resources/blog/tea-haze-diagnosis', '/resources/blog/tea-browning-diagnosis']) {
      assert.ok(html.includes(`href="${prefix}${href}"`), `${lang}: ${href} link rendered`);
    }
    assert.ok(/<p id="tea-scum-ref-s\d+">/.test(html), `${lang}: source anchors survive the build`);
  }
  // The blog index lists the new article in both languages.
  for (const lang of ['en', 'zh']) {
    const prefix = lang === 'zh' ? '/zh' : '';
    const listing = readFileSync(`dist${prefix}/resources/blog/index.html`, 'utf8');
    assert.ok(listing.includes(`${prefix}/resources/blog/${SLUG}`), `${lang}: blog index lists the article`);
  }
});

test('T05 baseline counts reflect the two new bilingual pages', () => {
  const count = lang => readdirSync(`${base}${lang}`).filter(f => f.endsWith('.md')).length;
  assert.equal(count('en'), 40, 'en blog article count including T05');
  assert.equal(count('zh'), 40, 'zh blog article count including T05');
});
