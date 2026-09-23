import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || '/tmp/zl-browser/node_modules/playwright/index.mjs');
const base = process.argv[2] || 'http://127.0.0.1:8963';
const out = process.env.QA_OUT || '/tmp/citrus-delayed-bitterness-qa';
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
    const route = `${prefix}/resources/blog/citrus-delayed-bitterness`;
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
      assert.equal(metrics.tables,1); assert.equal(metrics.cards,6); assert.ok(parseFloat(metrics.font)>=16);
      const ids=await page.locator('[id]').evaluateAll(els=>els.map(el=>el.id));assert.equal(ids.length,new Set(ids).size);
      assert.equal(await page.locator('article a[href*="request-quote"], article a[href*="contact"]').count(),0);
      const values=await page.locator('.citrus-delayed-bitterness-table tbody td').evaluateAll(els=>els.map(el=>el.lastChild.textContent.trim()));
      assert.deepEqual(values,['0.38 ± 0.07','3.60 ± 0.20','2.15 ± 0.17','3.66 ± 0.19','2.15 ± 0.13','3.68 ± 0.18']);
      // Inspect the browser accessibility tree, not DOM text/attributes: mobile headers are hidden.
      const tableAccessibility = await page.locator('.citrus-delayed-bitterness-table').ariaSnapshot();
      const cellAccessibility = await Promise.all(Array.from({ length: 6 }, (_, i) => page.locator('.citrus-delayed-bitterness-table tbody td').nth(i).ariaSnapshot()));
      writeFileSync(`${out}/${key}-accessibility.json`, JSON.stringify({ key, tableAccessibility, cellAccessibility }, null, 2));
      if (width <= 640) {
        for (const [i, snapshot] of cellAccessibility.entries()) {
          const day = lang === 'en' ? (i % 2 ? 'day 10' : 'day 0') : (i % 2 ? '第10天' : '第0天');
          assert.ok(snapshot.includes(day) && snapshot.includes('mg/L') && snapshot.includes(values[i]), `${key} cell ${i}: day and concentration units must be accessible beside the value`);
        }
      } else {
        const labelsVisible = await page.locator('.citrus-delayed-bitterness-table .mobile-label').evaluateAll(els => els.some(el => getComputedStyle(el).display !== 'none'));
        assert.equal(labelsVisible, false, 'desktop must not repeat mobile labels');
        for (const day of lang === 'en' ? ['day 0', 'day 10'] : ['第0天', '第10天']) assert.ok(tableAccessibility.includes(day) && tableAccessibility.includes('mg/L'), 'desktop column headings must remain accessible');
      }
      record.accessibility = { checkedCells: width <= 640 ? 6 : 0, desktopHeadings: width > 640 };
      for(const [i,url] of ["https://www.ebi.ac.uk/europepmc/webservices/rest/PMC6222338/fullTextXML", "https://www.frontiersin.org/journals/horticulture/articles/10.3389/fhort.2024.1425366/full", "https://www.ebi.ac.uk/europepmc/webservices/rest/PMC6222338/supplementaryFiles"].entries()) assert.equal(await page.locator(`#citrus-delayed-bitterness-ref-${i+1} a`).getAttribute('href'),url);
      record.metrics=metrics;
      const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');assert.equal(canonical,'https://zlbotanicals.com'+route);
      assert.equal(await page.locator('link[hreflang="en"]').getAttribute('href'),'https://zlbotanicals.com/resources/blog/citrus-delayed-bitterness');
      assert.equal(await page.locator('link[hreflang="zh-CN"]').getAttribute('href'),'https://zlbotanicals.com/zh/resources/blog/citrus-delayed-bitterness');
      const heroBox=await page.locator('h1').boundingBox(); assert.ok(heroBox.y>=65 && heroBox.y+heroBox.height<=900,JSON.stringify(heroBox));
      await page.screenshot({path:`${out}/${key}-hero.jpg`,type:'jpeg',quality:70});
      const rows=page.locator('.citrus-delayed-bitterness-table tbody tr');
      assert.equal(await rows.count(),3);
      for(let i=0;i<3;i++) {
        const row=rows.nth(i);
        await row.evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
        await page.evaluate(()=>scrollBy({top:-100,behavior:"instant"}));
        const boxes=await row.locator('th,td').evaluateAll(els=>els.map(el=>({text:el.innerText,rect:el.getBoundingClientRect().toJSON(),font:getComputedStyle(el).fontSize})));
        assert.equal(boxes.length,3);
        for(const cell of boxes) {assert.ok(cell.rect.x>=0&&cell.rect.right<=width+1,JSON.stringify(cell));assert.ok(cell.text.trim().length>0);}
        if(width<=390) {assert.ok(boxes[1].rect.y>=boxes[0].rect.bottom-1);assert.ok(boxes[2].rect.y>=boxes[1].rect.bottom-1);assert.ok(boxes.every(c=>parseFloat(c.font)>=16));}
        await page.screenshot({path:`${out}/${key}-row${i}.jpg`,type:'jpeg',quality:75});
        await row.screenshot({path:`${out}/${key}-whole-row${i}.jpg`,type:'jpeg',quality:75});
      }
      const heading=page.locator('article h2').nth(1);
      await heading.evaluate(el=>scrollTo({top:scrollY+el.getBoundingClientRect().top-100,behavior:'instant'}));
      const headingBox=await heading.boundingBox();assert.ok(headingBox.y>=65&&headingBox.y<150);
      await page.screenshot({path:`${out}/${key}-table-heading.jpg`,type:'jpeg',quality:80});
      const scope=page.locator('.citrus-delayed-bitterness-table + p');
      await scope.evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));await page.evaluate(()=>scrollBy({top:-100,behavior:"instant"}));
      await page.screenshot({path:`${out}/${key}-scope.jpg`,type:'jpeg',quality:80});
      const table=page.locator('.citrus-delayed-bitterness-table');
      await table.evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));await page.evaluate(()=>scrollBy({top:-100,behavior:"instant"}));
      await page.screenshot({path:`${out}/${key}-table-start.jpg`,type:'jpeg',quality:75});
      if(width===1440) await table.screenshot({path:`${out}/${key}-whole-table.jpg`,type:'jpeg',quality:75});
      for (const id of [1,2,3]) {
        await page.goto(base+route); await page.evaluate(() => document.fonts.ready);
        const link = page.locator(`article a[href="#citrus-delayed-bitterness-ref-${id}"]`).first();
        await link.focus(); await settled(page); await page.keyboard.press('Enter');
        await page.waitForURL(u => u.hash === `#citrus-delayed-bitterness-ref-${id}`); await settled(page);
        const target = page.locator(`#citrus-delayed-bitterness-ref-${id}`);
        const box = await target.boundingBox();
        assert.ok(box.y >= 65 && box.y < 900, JSON.stringify(box));
        assert.ok((await target.innerText()).startsWith(`[${id}]`));
        record.citations++;
      }
      for (const source of ['research', 'resources/application-guides', 'resources/blog', 'solutions/beverages']) {
        assert.equal((await page.goto(`${base}${prefix}/${source}`)).status(),200);
        const link=page.locator(`a[href="${route}"]`).first();
        await link.scrollIntoViewIfNeeded(); await settled(page); await link.click();
        await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===route);
        assert.equal(await page.locator('.citrus-delayed-bitterness-reader').count(),1); record.inbound++;
      }
      for (const path of ['/research','/solutions/beverages']) {
        await page.goto(base+route);
        const link=page.locator(`footer a[href="${prefix}${path}"]`).first();
        await link.scrollIntoViewIfNeeded(); await settled(page); await link.click();
        await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===prefix+path);
        assert.equal(await page.locator('h1').count(),1);
        record.outbound=(record.outbound||0)+1;
      }
      record.passed=true;
    } catch(e) { record.error=e.stack; throw e; }
    finally { writeFileSync(`${out}/results.json`,JSON.stringify({results,nonGet,errors},null,2)); await context.close(); }
  }
  assert.equal(nonGet.length,0); assert.equal(errors.length,0);
} finally { await browser.close(); }
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,nonGet,errors}));
