import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('navigation separates applications from project collaboration without extra top-level groups', () => {
  const nav = readFileSync('src/data/site-navigation.ts','utf8');
  assert.ok(nav.includes("link('nav.applicationsProjects','/solutions')"));
  for (const path of ['/solutions/food','/solutions/nutraceuticals','/odm#concept-development','/odm#formula-transfer']) assert.ok(nav.includes(path), path);
});
test('application pages link terminal problems to specific science and sample context', () => {
  for (const prefix of ['', 'zh/']) for (const industry of ['beverages','cosmetics','food','nutraceuticals']) {
    const html = page(prefix+'solutions/'+industry);
    assert.ok(html.includes('data-application-task'), industry);
    assert.ok(html.includes('#formulation-'), industry);
    assert.ok(html.includes('request=sample'), industry);
    assert.ok(html.includes('problem='), industry);
    if(industry==='cosmetics') {
      const cards=html.split('data-application-task=');
      const bodies=cards.slice(1).map(c=>c.match(/<p class="mt-2 text-gray-700">(.*?)<\/p>/)?.[1]);
      assert.equal(new Set(bodies).size,3,'each skincare format needs its own practical explanation');
    }
  }
});
test('non-beverage science does not default to beverage ODM; transfer has its own final action', () => {
  for (const prefix of ['', 'zh/']) {
    const science=page(prefix+'plant-extracts/ingredients/centella-asiatica');
    const resources=science.split('data-related-resources')[1].split('</section>')[0];
    assert.ok(!resources.includes(`href="/${prefix}odm"`));
    const odm=page(prefix+'odm');
    assert.ok(odm.includes('id="formula-transfer"'));
    assert.ok(odm.includes('data-transfer-final'));
    for(const tag of odm.matchAll(/<a[^>]*data-transfer-final[^>]*>/g)) assert.ok(tag[0].includes('product='),'every transfer CTA carries project direction');
    assert.ok(odm.includes('id="concept-development"'));
  }
});
test('contact/privacy preserve third-party disclosure without stale never-verified delivery claim',()=>{
  for(const prefix of ['', 'zh/']) for(const route of ['contact','privacy']) {
    const html=page(prefix+route);
    assert.ok(html.includes('FormSubmit'));
    assert.ok(html.includes('mailto:info@zlbotanicals.com'));
    assert.ok(!/activation (?:are not|have not been) verified|尚未验证|状态尚未验证/.test(html));
  }
});
test('catalog exposes application, repeat and distribution tasks; custom blends retain intent',()=>{
 for(const prefix of ['', 'zh/']) {
  const catalog=page(prefix+'products');
  for(const key of ['data-catalog-application','request=repeat','request=distribution']) assert.ok(catalog.includes(key),key);
  assert.ok(page(prefix+'products/custom-formulation').includes('source=custom-formulation'));
  const category=page(prefix+'products/botanical-extracts');
  assert.ok(!category.includes('Read ingredient profile'));
  assert.ok(category.includes('request=quote'));
 }
});
test('capsule task explanation and all generic transfer actions keep the right scope',()=>{
 for(const prefix of ['', 'zh/']) {
  const html=page(prefix+'solutions/nutraceuticals');
  const card=html.split('data-application-task="defined-capsule"')[1].split('</article>')[0];
  assert.ok(!/Clear drinks|cocoa\/oat|清亮饮料|可可.*燕麦/.test(card));
  const odm=page(prefix+'odm');
  const href=odm.match(/data-odm-intent="transfer" href="([^"]+)/)[1];
  assert.ok(!decodeURIComponent(href).replaceAll('+',' ').includes(prefix?'植物饮品项目':'Botanical beverage project'));
 }
});
const page = p => readFileSync(`dist/${p ? p+'/' : ''}index.html`, 'utf8');
for (const prefix of ['', 'zh/']) {
  test(`${prefix}home offers four distinct tasks on existing URLs`, () => {
    const html = page(prefix.replace(/\/$/,''));
    for (const task of ['source','application','concept','transfer']) assert.ok(html.includes(`data-buyer-task="${task}"`), task);
    assert.ok(html.includes('/odm#formula-transfer'));
    assert.doesNotMatch(html.split('<!-- Latest')[0].split('采购资源')[0], /提取物采购指南|sourcing guid(?:e|ance)/i);
  });
}
