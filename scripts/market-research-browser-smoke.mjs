import assert from 'node:assert/strict';
import {mkdirSync, writeFileSync} from 'node:fs';
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || '/tmp/zl-browser/node_modules/playwright/index.mjs');
const base = process.argv[2] || 'http://127.0.0.1:4397';
const output = process.env.QA_OUTPUT || '/data/hermes/research/market-research-release/browser';
mkdirSync(output, {recursive:true});
const browser = await chromium.launch({headless:true});
const results = [];
try {
  for (const js of [true, false]) for (const width of [390,1440]) for (const prefix of ['', '/zh']) {
    const context = await browser.newContext({viewport:{width,height:1000}, javaScriptEnabled:js});
    const forbidden = [], errors = [];
    await context.route('**/*', route => {
      if (!['GET','HEAD'].includes(route.request().method())) { forbidden.push(route.request().url()); return route.abort(); }
      return route.continue();
    });
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(e.message));
    const id = `${prefix ? 'zh':'en'}-${width}-js-${js}`;
    const article = `${prefix}/research/market/functional-mushrooms`;
    const load = async path => {const response=await page.goto(base+path); assert.equal(response.status(),200); await page.evaluate(()=>document.fonts.ready);};
    const click = async locator => {
      await locator.evaluate(el=>el.scrollIntoView({behavior:'instant',block:'center'}));
      await locator.click();
      await page.waitForLoadState('load');
    };
    await load(`${prefix}/research`);
    await click(page.locator('nav a[href="#market"]'));
    await page.locator('[data-market-article-card]').evaluate(el=>el.scrollIntoView({behavior:'instant',block:'center'}));
    await page.screenshot({path:`${output}/${id}-entry.png`});
    await click(page.locator(`[data-market-article-card] a[href="${article}"]`));
    assert.equal(new URL(page.url()).pathname,article);
    await page.evaluate(()=>document.fonts.ready);
    const geometry = await page.locator('.market-reader').evaluate(el=>{
      const r=el.getBoundingClientRect(); return {x:r.x,width:r.width,alignment:getComputedStyle(el).textAlign,overflow:document.documentElement.scrollWidth-innerWidth};
    });
    assert.equal(geometry.alignment,'left'); assert.ok(geometry.overflow<=1);
    assert.ok(Math.abs(geometry.x-(width-geometry.width)/2)<2);
    assert.equal(await page.locator('h1').count(),1);
    await page.screenshot({path:`${output}/${id}-article.png`});
    for (let i=0;i<2;i++) {
      const table=page.locator('.market-table').nth(i);
      await table.evaluate(el=>el.scrollIntoView({behavior:'instant',block:'center'}));
      if(width<740) {
        await table.focus(); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(300);
        assert.ok(await table.evaluate(el=>el.scrollLeft)>0,'keyboard scrolls table');
      }
      await page.screenshot({path:`${output}/${id}-table-${i}.png`});
    }
    for(let i=1;i<=10;i++) {
      await click(page.locator(`article a[href="#market-ref-${i}"]`).first());
      const ref=page.locator(`#market-ref-${i} a`);
      assert.ok(await ref.getAttribute('href'));
      assert.ok(await ref.innerText());
    }
    const text=await page.locator('article').innerText(); assert.ok(!/goji|枸杞/i.test(text));
    for (const path of [`${prefix}/products/reishi-mushroom`,`${prefix}/plant-extracts/ingredients/reishi-mushroom`]) {
      await click(page.locator(`article a[href="${path}"]`).first());
      assert.equal(new URL(page.url()).pathname,path);
      assert.ok((await page.locator('main').innerText()).length>500);
      assert.match(await page.locator('h1').innerText(),prefix ? /灵芝/ : /Reishi/i);
      await page.screenshot({path:`${output}/${id}-${path.includes('/products/')?'product':'science'}.png`});
      await load(article);
    }
    assert.deepEqual(forbidden,[]); assert.deepEqual(errors,[]);
    results.push({id,passed:true,geometry,citations:10,tables:2,journeys:2,nonGetRequests:forbidden,errors});
    await context.close();
  }
} finally {
  writeFileSync(`${output}/results.json`,JSON.stringify(results,null,2));
  await browser.close();
}
console.log(JSON.stringify({passed:results.length,citationJourneys:results.length*10,productScienceJourneys:results.length*2}));
