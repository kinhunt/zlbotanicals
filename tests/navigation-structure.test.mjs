import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

test('layout consumes one taxonomy with keyboard-visible dropdowns and compact responsive controls', () => {
  for (const name of ['Navigation', 'MobileMenu', 'Footer']) {
    const component = source(`src/components/layout/${name}.astro`);
    assert.match(component, /getSiteNavigation\(t,/);
    assert.doesNotMatch(component, /const navItems = \[/);
  }
  const desktop = source('src/components/layout/Navigation.astro');
  assert.match(desktop, /group-focus-within:visible/);
  assert.match(desktop, /group-focus-within:opacity-100/);
  assert.match(desktop, /focus-visible:outline/);
  assert.match(desktop, /gap-2 xl:gap-4/);
  const header = source('src/components/layout/Header.astro');
  assert.match(header, /text-xs xl:text-sm/);
  assert.match(header, /aria-controls="mobile-menu"/);
  const mobile = source('src/components/layout/MobileMenu.astro');
  assert.match(mobile, /break-words/);
  assert.match(mobile, /inert/);
  assert.match(mobile, /Escape/);
  assert.match(mobile, /aria-expanded/);
});

const root = new URL('../', import.meta.url);
const source = (path) => readFileSync(new URL(path, root), 'utf8');

test('shared navigation exposes the bilingual buyer taxonomy and localized destinations', async () => {
  const moduleURL = new URL('src/data/site-navigation.ts', root);
  assert.ok(existsSync(moduleURL), 'desktop, mobile and footer need a shared buyer taxonomy');
  const { getSiteNavigation } = await import(moduleURL.href);
  for (const lang of ['en', 'zh']) {
    const translations = JSON.parse(source(`src/i18n/translations/${lang}.json`));
    const t = (key) => key.split('.').reduce((value, part) => value?.[part], translations);
    const localize = (path) => `${lang === 'zh' ? '/zh' : ''}${path}`;
    const ingredient = { label: 'Example ingredient', href: localize('/products/example') };
    const items = getSiteNavigation(t, localize, [ingredient]);
    assert.deepEqual(items.map(({ label }) => label), lang === 'en'
      ? ['Plant Extracts', 'Products', 'Applications', 'Resources', 'Quality & Documents', 'About', 'Contact']
      : ['植物提取物', '产品中心', '行业应用', '技术与采购指南', '质量与文件', '关于振隆', '联系我们']);
    assert.deepEqual(items.map(({ href }) => href), ['/plant-extracts', '/products', '/solutions', '/resources', '/quality', '/about', '/contact'].map(localize));
    assert.deepEqual(items[1].children.map(({ href }) => href), ['/products/example', '/products/herbal-powders', '/products/custom-formulation'].map(localize));
    assert.deepEqual(items[3].children.map(({ href }) => href), ['/resources/ingredient-guides', '/resources/application-guides', '/resources/quality-guides', '/resources/sourcing-guides', '/resources/faq', '/resources/downloads', '/resources/blog'].map(localize));
    assert.deepEqual(items[4].children.map(({ href }) => href), ['/quality', '/about/certifications', '/resources/downloads', '/request-quote?request=TDS'].map(localize));
    assert.deepEqual(items[5].children.map(({ href }) => href), ['/about/story', '/about/facility'].map(localize));
    for (const item of items) for (const child of item.children ?? []) {
      assert.ok(child.label && !child.label.startsWith('nav.'), 'every link has a translated label');
      if (lang === 'zh' && child !== ingredient) assert.match(child.label, /[\u3400-\u9fff]/);
    }
    assert.equal(translations.nav.requestQuote, lang === 'en' ? 'Request Samples / Quote' : '申请样品／询价');
  }
});
