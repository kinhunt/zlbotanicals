import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

for (const prefix of ['', 'zh/']) {
  test(`${prefix}contact form is labeled with external processing disclosure and fallback`, () => {
    const page = source(`${prefix}contact`);
    assert.match(page, /<form[^>]+action="https:\/\/formsubmit.co\/info@zlbotanicals.com"/);
    assert.match(page, /third-party|第三方/);
    assert.match(page, /mailto:info@zlbotanicals.com/);
    assert.match(page, /not verified|尚未验证/);
    assert.match(page, /privacy/);
    const controls = [...page.matchAll(/<(?:input|textarea|select)\b[^>]*>/g)].map(m => m[0]).filter(tag => !/type="hidden"/.test(tag));
    assert.ok(controls.length >= 4);
    for (const tag of controls) {
      const id = tag.match(/id="([^"]+)"/)?.[1];
      assert.ok(id, `Missing control ID: ${tag}`);
      assert.ok(page.includes(`for="${id}"`), `Missing associated label: ${id}`);
    }
    assert.doesNotMatch(page, /8888|Keling|科灵路|sales@|facility visit|工厂参观/);
  });
}


for (const prefix of ['', 'zh/']) {
  test(`${prefix}thank-you URL cannot attest to delivery`, () => {
    const page = source(`${prefix}thank-you`);
    assert.match(page, /does not confirm|不能确认/);
    assert.match(page, /FormSubmit/);
    assert.match(page, /mailto:info@zlbotanicals.com/);
    assert.doesNotMatch(page, /successfully submitted|[Ww]e.*[Rr]eceived|1[-–]2|已收到|提交成功|成功提交/);
  });
}


for (const prefix of ['', 'zh/']) {
  test(`${prefix}legal notice routes explain actual website boundaries`, () => {
    for (const slug of ['privacy', 'terms']) assert.ok(existsSync(new URL(`src/pages/${prefix}${slug}.astro`, root)), `${prefix}${slug} route missing`);
    const privacy = source(`${prefix}privacy`);
    for (const term of [/FormSubmit/, /Google Fonts/, /hosting|托管/, /logs|日志/, /mailto:info@zlbotanicals.com/]) assert.match(privacy, term);
    const terms = source(`${prefix}terms`);
    for (const term of [/written|书面/, /specification|规格/, /concept|概念/, /mailto:info@zlbotanicals.com/]) assert.match(terms, term);
    assert.doesNotMatch(privacy + terms, /GDPR compliant|delete within|governed by the laws|保证.*合规|日内删除/);
  });
}

const root = new URL('../', import.meta.url);
const source = (path) => readFileSync(new URL(`src/pages/${path}.astro`, root), 'utf8');

for (const prefix of ['', 'zh/']) {
  test(`${prefix}powders and custom projects require feasibility review`, () => {
    for (const category of ['herbal-powders', 'custom-formulation']) {
      const page = source(`${prefix}products/${category}`);
      assert.match(page, /feasibility|可行性/);
      assert.match(page, /written|书面/);
      assert.match(page, /contact/);
      assert.doesNotMatch(page, /href:\s*['"]#['"]|\d+ mesh|\d+目|GMP|exact specifications|精确规格|确保批次/);
    }
  });
}

for (const prefix of ['', 'zh/']) {
  test(`${prefix}botanical category uses published content and real detail links`, () => {
    const page = source(`${prefix}products/botanical-extracts`);
    assert.match(page, /getCollection\('products'/);
    assert.match(page, /!data.draft/);
    assert.match(page, /data.lang === lang/);
    assert.match(page, /product.slug/);
    assert.doesNotMatch(page, /href:\s*['"]#['"]|\d+%|guaranteed/i);
  });
}
