import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const page = p => readFileSync(`dist/${p}/index.html`, 'utf8');
const text = s => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
for (const prefix of ['', 'zh/']) {
  const zh = Boolean(prefix);
  test(`${prefix}beverage scope distinguishes tea ingredients from plant-milk bases`, () => {
    const html = page(prefix+'solutions/beverages');
    const module = html.match(/<section[^>]*id="plant-based-ingredients"[\s\S]*?<\/section>/)?.[0];
    assert.ok(module, 'substantive plant-based ingredient module is present');
    assert.match(text(module), zh ? /植物基饮料中的茶与草本配料/ : /Tea and botanical ingredients for plant-based drinks/);
    assert.match(text(module), zh ? /基底.*乳化.*另行/ : /base.*emulsifier.*separate/i);
    assert.match(text(module), zh ? /蛋白质.*盐.*pH/ : /protein.*salt.*pH/);
    assert.match(module, new RegExp(`href="/${prefix}plant-extracts/ingredients/green-tea#formulation-oat-latte"`));
    assert.equal(text(html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/)[0]).trim(), zh ? '饮料' : 'Beverages');
    assert.ok(html.includes('id="tea-bitterness-astringency"'));
  });
  for (const [plan, ingredient] of [['oat-latte','green-tea'], ['instant-drink','goji-berry']]) {
    test(`${prefix}${plan} card keeps material, precise science and sample context`, () => {
      const html = page(prefix+'solutions/beverages');
      const card = html.match(new RegExp(`<article[^>]*data-application-task="${plan}"[\\s\\S]*?<\\/article>`))?.[0];
      assert.ok(card, `${plan} application card exists`);
      const prose = text(card);
      if (plan === 'oat-latte') {
        assert.match(prose, zh ? /可溶.*茶提取物/ : /soluble tea extract/i);
        assert.match(prose, zh ? /儿茶素.*咖啡因.*载体/ : /catechin.*caffeine.*carrier/i);
      } else {
        assert.match(prose, zh ? /果汁粉.*多糖富集物/ : /juice powder.*polysaccharide-enriched/i);
        assert.match(prose, zh ? /冷.*温水.*复溶/ : /cool.*warm water.*reconstitution/i);
        assert.doesNotMatch(prose, /oat|soy|protein|燕麦|豆奶|蛋白/i);
      }
      assert.ok(card.includes(`href="/${prefix}products/${ingredient}"`));
      assert.ok(card.includes(`href="/${prefix}plant-extracts/ingredients/${ingredient}#formulation-${plan}"`));
      const science = page(prefix+'plant-extracts/ingredients/'+ingredient);
      assert.equal(science.split(`id="formulation-${plan}"`).length-1, 1);
      const sample = card.match(/data-task-sample[^>]*href="([^"]+)"/)[1].replace(/&(?:amp|#38|#x26);/g,'&');
      const url = new URL(sample, 'https://example.test');
      assert.equal(url.pathname, `/${prefix}request-quote`);
      for (const [key,value] of [['request','sample'],['source','beverages']]) assert.equal(url.searchParams.get(key),value);
      for (const key of ['product','application','form','plan','problem']) assert.ok(url.searchParams.get(key),key);
      assert.match(url.searchParams.get('form'), plan==='oat-latte' ? /Soluble tea extract|速溶茶提取物/ : /Juice-derived powder|果汁来源粉末/);
    });
  }
}
