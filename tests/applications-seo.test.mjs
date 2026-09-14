import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const page = (prefix, industry) => readFileSync(`dist/${prefix}solutions/${industry}/index.html`, 'utf8');
const card = (html, id) => html.split(`data-application-task="${id}"`)[1]?.split('</article>')[0] || '';
const text = html => html.replace(/<[^>]*>/g, ' ');

test('glabridin card uses licorice fraction and exact emulsion plan with inquiry context', () => {
  for (const prefix of ['', 'zh/']) {
    const html = page(prefix, 'cosmetics');
    const glabridin = card(html, 'glabridin-emulsion');
    assert.ok(glabridin, 'material-specific glabridin card');
    for (const term of prefix ? ['光甘草定', '分散', '溶解', '析出', '颜色'] : ['Glabridin', 'dispersion', 'dissolution', 'precipitation', 'color']) assert.ok(text(glabridin).includes(term), term);
    assert.ok(glabridin.includes(`/${prefix}products/licorice-root`));
    assert.ok(glabridin.includes(`/${prefix}plant-extracts/ingredients/licorice-root#formulation-glabridin-emulsion`));
    for (const request of ['sample','application']) {
      const href = glabridin.match(new RegExp(`href="([^"]*request=${request}[^"]*)"`))[1].replace(/&(?:amp|#38|#x26);/g, '&');
      const params = new URL(href, 'https://example.com').searchParams;
      assert.equal(params.get('source'), 'cosmetics');
      assert.match(params.get('form'), /[Gg]labridin|光甘草定/);
      assert.doesNotMatch(params.get('form'), /DGL/);
      for (const key of ['product','application','plan','problem']) assert.ok(params.get(key));
    }
    assert.match(html, /<meta name="description" content="[^"]*(?:glabridin|光甘草定)/);
  }
});

test('capsule evaluation connects flow/fill weight with hygroscopicity and bulk density', () => {
  for (const prefix of ['', 'zh/']) {
    const html = page(prefix, 'nutraceuticals');
    const module = html.split('id="capsule-powder-evaluation"')[1]?.split('</div>')[0] || '';
    for (const term of prefix ? ['吸湿性', '堆密度', '振实密度', '装量差异', '设备', '标志物均匀'] : ['hygroscopicity', 'bulk density', 'tapped density', 'fill-weight variation', 'equipment', 'marker uniformity']) assert.ok(text(module).includes(term), term);
    for (const [id, plan] of [['reishi-mushroom','defined-capsule'],['ginseng','capsule']]) {
      assert.ok(module.includes(`/${prefix}plant-extracts/ingredients/${id}#formulation-${plan}`));
      assert.ok(card(html, plan).includes('request=sample'));
    }
    assert.match(html, /<meta name="description" content="[^"]*(?:capsule|胶囊)/);
  }
});

test('beverage modules distinguish tea bitterness/astringency and stevia bitter/sweet aftertaste', () => {
  for (const prefix of ['', 'zh/']) {
    const html = page(prefix, 'beverages');
    const tea = html.split('id="tea-bitterness-astringency"')[1]?.split('</div>')[0] || '';
    for (const term of prefix ? ['苦味', '涩感', '热处理', '颜色'] : ['bitterness', 'astringency', 'heat treatment', 'color']) assert.ok(text(tea).includes(term), term);
    assert.ok(tea.includes(`/${prefix}plant-extracts/ingredients/green-tea#formulation-citrus-tea`));
    const stevia = card(html, 'citrus-beverage');
    for (const term of prefix ? ['苦后味', '甜味拖尾', '糖苷谱', '同一'] : ['bitter aftertaste', 'lingering sweetness', 'glycoside profile', 'same']) assert.ok(text(stevia).includes(term), term);
    assert.ok(stevia.includes(`/${prefix}plant-extracts/ingredients/stevia#formulation-citrus-beverage`));
    assert.match(html, /<meta name="description" content="[^"]*(?:bitterness|苦味)/);
  }
});
