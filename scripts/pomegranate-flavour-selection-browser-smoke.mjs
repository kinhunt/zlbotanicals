import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || '/tmp/zl-browser/node_modules/playwright/index.mjs');
const base = process.argv[2] || 'http://127.0.0.1:8943';
const out = process.env.QA_OUT || '/tmp/pomegranate-flavour-selection-qa';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [], nonGet = [], errors = [];
async function settled(page) {
  await page.waitForTimeout(1800);
  let last = -1;
  for (let i = 0; i < 20; i++) {
    const y = await page.evaluate(() => scrollY);
    if (Math.abs(y - last) < 1) return;
    last = y; await page.waitForTimeout(150);
  }
  throw Error('scroll did not settle');
}
try {
  for (const width of [390, 1440, 320]) for (const lang of ['en', 'zh']) for (const javaScriptEnabled of [true, false]) {
    const key = `${lang}-${width}-js${+javaScriptEnabled}`;
    const context = await browser.newContext({ viewport: { width, height: 900 }, javaScriptEnabled });
    await context.route('**/*', route => {
      if (!['GET','HEAD'].includes(route.request().method())) { nonGet.push(route.request().url()); return route.abort(); }
      return route.continue();
    });
    const page = await context.newPage(); page.on('pageerror', e => errors.push({ key, error: e.message }));
    const prefix = lang === 'zh' ? '/zh' : '';
    const route = `${prefix}/resources/blog/pomegranate-flavour-selection`;
    const record = { key, passed: false, citations: 0, inbound: 0 };
    results.push(record);
    try {
      assert.equal((await page.goto(base + route)).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('article img').count(), 0);
      assert.ok(!(await page.locator('article').innerText()).includes('**'));
      const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth, tables:document.querySelectorAll('article table').length, cards:document.querySelectorAll('article .mobile-label').length, font:getComputedStyle(document.querySelector('article .prose p')).fontSize}));
      assert.ok(metrics.overflow<=1,JSON.stringify(metrics));
      assert.equal(metrics.tables,0); assert.equal(metrics.cards,0); assert.ok(parseFloat(metrics.font)>=16);
      const ids=await page.locator('[id]').evaluateAll(els=>els.map(el=>el.id));assert.equal(ids.length,new Set(ids).size);
      record.metrics=metrics;
      const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');assert.equal(canonical,'https://zlbotanicals.com'+route);
      assert.equal(await page.locator('link[hreflang="en"]').getAttribute('href'),'https://zlbotanicals.com/resources/blog/pomegranate-flavour-selection');
      assert.equal(await page.locator('link[hreflang="zh-CN"]').getAttribute('href'),'https://zlbotanicals.com/zh/resources/blog/pomegranate-flavour-selection');
      {
       await page.screenshot({path:`${out}/${key}-hero.jpg`,type:'jpeg',quality:65});
       const headings=page.locator('article .prose h2');
       for(let i=0;i<await headings.count();i++) {
        await headings.nth(i).evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
        await page.evaluate(()=>scrollBy(0,-100));
        await page.screenshot({path:`${out}/${key}-section${i}.jpg`,type:'jpeg',quality:60});
       }
      }
      for (const id of [1,2,5,6]) {
        await page.goto(base+route); await page.evaluate(() => document.fonts.ready);
        const link = page.locator(`article a[href="#pomegranate-ref-${id}"]`).first();
        await link.focus(); await settled(page); await page.keyboard.press('Enter');
        await page.waitForURL(u => u.hash === `#pomegranate-ref-${id}`); await settled(page);
        const target = page.locator(`#pomegranate-ref-${id}`);
        const box = await target.boundingBox();
        assert.ok(box.y >= 65 && box.y < 900, JSON.stringify(box));
        assert.match(await target.innerText(), /Commercial Pomegranate|De Astringency|Sunmet|Supplementary files/);
        record.citations++;
      }
      for (const source of ['research', 'solutions/beverages', 'resources/application-guides', 'resources/blog']) {
        assert.equal((await page.goto(`${base}${prefix}/${source}`)).status(),200);
        const link=page.locator(`a[href="${route}"]`).first();
        await link.scrollIntoViewIfNeeded(); await settled(page); await link.click();
        await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===route);
        assert.equal(await page.locator('.pomegranate-reader').count(),1); record.inbound++;
      }
      record.passed=true;
    } catch(e) { record.error=e.stack; throw e; }
    finally { writeFileSync(`${out}/results.json`,JSON.stringify({results,nonGet,errors},null,2)); await context.close(); }
  }
  assert.equal(nonGet.length,0); assert.equal(errors.length,0);
} finally { await browser.close(); }
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,nonGet,errors}));
