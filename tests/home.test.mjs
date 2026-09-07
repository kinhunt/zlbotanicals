import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('both homepages follow the buyer journey after the hero', () => {
  for (const prefix of ['', 'zh/']) {
    const page = read(`src/pages/${prefix}index.astro`).split('</BaseLayout>')[0].split('<BaseLayout')[1];
    const sections = ['Hero', 'ProductCategories', 'AboutPreview', 'WhyChooseUs', 'Applications', 'LatestBlogs', 'CTASection'];
    let previous = -1;
    for (const section of sections) {
      const position = page.indexOf(`<${section} `);
      assert.ok(position > previous, `${prefix}${section} should follow the previous buyer step`);
      previous = position;
    }
    assert.ok(!page.includes('<TrustIndicators '), 'no metric-led interruption before products');
  }
});

test('localized homepage offers sample and COA review without blanket credentials', () => {
  for (const lang of ['en', 'zh']) {
    const copy = JSON.parse(read(`src/i18n/translations/${lang}.json`));
    assert.match(copy.hero.ctaSecondary, /COA/);
    assert.match(copy.cta.primary, /COA/);
    assert.match(copy.whyUs.gmpDesc, lang === 'en' ? /scope/ : /范围/);
    assert.match(copy.about.description, lang === 'en' ? /product/ : /产品/);
    assert.doesNotMatch(JSON.stringify(copy), /fully certified|GMP Certified|pharmaceutical-grade|GMP认证生产|制药级|厂家直供|GMP conditions/i);
  }
  for (const name of readdirSync(new URL('../src/components/home/', import.meta.url))) {
    const source = read(`src/components/home/${name}`);
    assert.doesNotMatch(source, /50\+|20,000|24K|GMP Certified|GMP认证|Production Facility|振隆药业生产设施/);
  }
});

test('company pages replace blanket claims with product-specific review guidance in both languages', () => {
  for (const prefix of ['', 'zh/']) {
    for (const route of ['about/index', 'about/story', 'about/facility', 'about/certifications', 'quality']) {
      const source = read(`src/pages/${prefix}${route}.astro`);
      assert.doesNotMatch(source, /50\+|50多个|20,000|24,000|GMP-certified|GMP认证生产|制药级|1970|generations of|世代相传|NMPA certified/);
      assert.match(source, /request-quote/);
      if (route.includes('certifications') || route === 'quality') {
        assert.match(source, prefix ? /有效期/ : /validity/);
        assert.match(source, prefix ? /范围/ : /scope/);
        assert.match(source, /COA/);
      }
      if (route.includes('facility')) assert.match(source, prefix ? /生产场地/ : /manufacturing site/);
    }
  }
});

test('homepage presents buyer guides and an application suitability reminder', () => {
  const guides = read('src/components/home/LatestBlogs.astro');
  assert.match(guides, /Buyer Guides/);
  assert.match(guides, /采购指南/);
  assert.match(guides, /specification|sourcing/);
  const applications = read('src/components/home/Applications.astro');
  assert.match(applications, /destination market/);
  assert.match(applications, /目标市场/);
});
