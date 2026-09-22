import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || '/tmp/zl-browser/node_modules/playwright/index.mjs');
const base = process.argv[2] || 'http://127.0.0.1:8941';
const out = process.env.QA_OUT || '/tmp/chicory-fibre-selection-qa';
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
    const route = `${prefix}/resources/blog/chicory-fibre-selection`;
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
      assert.equal(metrics.tables,1); assert.equal(metrics.cards,10); assert.ok(parseFloat(metrics.font)>=16);
      const ids=await page.locator('[id]').evaluateAll(els=>els.map(el=>el.id));assert.equal(ids.length,new Set(ids).size);
      record.metrics=metrics;
      const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');assert.equal(canonical,'https://zlbotanicals.com'+route);
      assert.equal(await page.locator('link[hreflang="en"]').getAttribute('href'),'https://zlbotanicals.com/resources/blog/chicory-fibre-selection');
      assert.equal(await page.locator('link[hreflang="zh-CN"]').getAttribute('href'),'https://zlbotanicals.com/zh/resources/blog/chicory-fibre-selection');
      await page.screenshot({path:`${out}/${key}-hero.jpg`,type:'jpeg',quality:70});
      const rows=page.locator('.chicory-table tbody tr');
      assert.equal(await rows.count(),5);
      for(let i=0;i<5;i++) {
        const row=rows.nth(i);
        await row.evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
        await page.evaluate(()=>scrollBy(0,-100));
        const boxes=await row.locator('th,td').evaluateAll(els=>els.map(el=>({text:el.innerText,rect:el.getBoundingClientRect().toJSON(),font:getComputedStyle(el).fontSize})));
        assert.equal(boxes.length,3);
        for(const cell of boxes) {assert.ok(cell.rect.x>=0&&cell.rect.right<=width+1,JSON.stringify(cell));assert.ok(cell.text.trim().length>0);}
        if(width<=390) {assert.ok(boxes[1].rect.y>=boxes[0].rect.bottom-1);assert.ok(boxes[2].rect.y>=boxes[1].rect.bottom-1);assert.ok(boxes.every(c=>parseFloat(c.font)>=16));}
        await page.screenshot({path:`${out}/${key}-row${i}.jpg`,type:'jpeg',quality:75});
        await row.screenshot({path:`${out}/${key}-whole-row${i}.jpg`,type:'jpeg',quality:75});
      }
      const table=page.locator('.chicory-table');
      await table.evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));await page.evaluate(()=>scrollBy(0,-100));
      await page.screenshot({path:`${out}/${key}-table-start.jpg`,type:'jpeg',quality:75});
      if(width===1440) await table.screenshot({path:`${out}/${key}-whole-table.jpg`,type:'jpeg',quality:75});
      const selectors=[['study','20%'],['composition','99.5%'],['formula',lang==='en'?'Quoted ingredient cost per kilogram':'每公斤来料纤维的原料成本'],['decimal','0.945'],['fos','pH 3.5']];
      for(const [label,text] of selectors) {
        const p=page.locator('article .prose p').filter({hasText:text}).first();assert.equal(await p.count(),1);
        await p.evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));await page.evaluate(()=>scrollBy(0,-100));
        const box=await p.boundingBox();assert.ok(box.x>=0&&box.x+box.width<=width+1);
        await page.screenshot({path:`${out}/${key}-${label}.jpg`,type:'jpeg',quality:80});
        await p.screenshot({path:`${out}/${key}-${label}-complete.jpg`,type:'jpeg',quality:80});
      }
      for (const id of [1,2,3,7,8,9]) {
        await page.goto(base+route); await page.evaluate(() => document.fonts.ready);
        const link = page.locator(`article a[href="#chicory-ref-${id}"]`).first();
        await link.focus(); await settled(page); await page.keyboard.press('Enter');
        await page.waitForURL(u => u.hash === `#chicory-ref-${id}`); await settled(page);
        const target = page.locator(`#chicory-ref-${id}`);
        const box = await target.boundingBox();
        assert.ok(box.y >= 65 && box.y < 900, JSON.stringify(box));
        assert.ok((await target.innerText()).startsWith(`[${id}]`));
        record.citations++;
      }
      for (const source of ['research', 'resources/application-guides', 'resources/blog', 'solutions/food']) {
        assert.equal((await page.goto(`${base}${prefix}/${source}`)).status(),200);
        const link=page.locator(`a[href="${route}"]`).first();
        await link.scrollIntoViewIfNeeded(); await settled(page); await link.click();
        await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===route);
        assert.equal(await page.locator('.chicory-reader').count(),1); record.inbound++;
      }
      await page.goto(base+route);
      const quote=page.locator(`article .prose a[href="${prefix}/request-quote"]`);
      await quote.scrollIntoViewIfNeeded();await settled(page);await quote.click();
      await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===`${prefix}/request-quote`);
      assert.ok(await page.locator('form').count()>0);record.quote=true;
      await page.goto(base+route);
      const food=page.locator(`article .prose a[href="${prefix}/solutions/food"]`);
      await food.scrollIntoViewIfNeeded();await settled(page);await food.click();
      await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===`${prefix}/solutions/food`);record.food=true;
      record.passed=true;
    } catch(e) { record.error=e.stack; throw e; }
    finally { writeFileSync(`${out}/results.json`,JSON.stringify({results,nonGet,errors},null,2)); await context.close(); }
  }
  assert.equal(nonGet.length,0); assert.equal(errors.length,0);
} finally { await browser.close(); }
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,nonGet,errors}));
