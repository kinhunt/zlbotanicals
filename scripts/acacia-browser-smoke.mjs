import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || '/tmp/zl-browser/node_modules/playwright/index.mjs');
const base = process.argv[2] || 'http://127.0.0.1:18957';
const out = process.env.QA_OUT || '/tmp/acacia-fibre-emulsification-qa';
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
    const route = `${prefix}/resources/blog/acacia-fibre-emulsification`;
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
      assert.equal(metrics.tables,3); assert.equal(metrics.cards,18); assert.ok(parseFloat(metrics.font)>=16);
      const ids=await page.locator('[id]').evaluateAll(els=>els.map(el=>el.id));assert.equal(ids.length,new Set(ids).size);
      assert.equal(await page.locator('article a[href*="request-quote"], article a[href*="contact"]').count(),0);
      const sourceIds=[1,2,3,4,5,8,10,11,14,15,16,17,18,19];
      assert.equal(await page.locator('article p[id^="acacia-ref-"]').count(),14);
      record.metrics=metrics;
      record.accessibility=[];
      for(let t=0;t<3;t++) {
        const table=page.locator('.acacia-table').nth(t);
        const snapshot=await table.ariaSnapshot();
        const headers=await table.locator('thead th').allTextContents();
        const cells=table.locator('tbody td');
        assert.equal(await cells.count(),6);
        for(let i=0;i<6;i++) {
          const cell=cells.nth(i);
          const label=await cell.locator('.mobile-label').textContent();
          const ax=await cell.ariaSnapshot();
          const entry={table:t,cell:i,label,ax,labelPresent:ax.includes(label)};
          record.accessibility.push(entry);
          if(width<=390) assert.ok(entry.labelPresent,`${key} table${t} cell${i}: accessible column label missing: ${label}; ${ax}`);
          else {
            assert.ok(!entry.labelPresent,`${key}: desktop repeated label must stay hidden`);
            for(const header of headers) assert.ok(snapshot.includes(header),`${key}: desktop header missing: ${header}`);
          }
        }
      }
      const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');assert.equal(canonical,'https://zlbotanicals.com'+route);
      assert.equal(await page.locator('link[hreflang="en"]').getAttribute('href'),'https://zlbotanicals.com/resources/blog/acacia-fibre-emulsification');
      assert.equal(await page.locator('link[hreflang="zh-CN"]').getAttribute('href'),'https://zlbotanicals.com/zh/resources/blog/acacia-fibre-emulsification');
      await page.screenshot({path:`${out}/${key}-hero.jpg`,type:'jpeg',quality:70});
      const rows=page.locator('.acacia-table tbody tr');
      assert.equal(await rows.count(),9);
      for(let i=0;i<9;i++) {
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
      for(let t=0;t<3;t++) {
        const table=page.locator('.acacia-table').nth(t);
        await table.evaluate(el=>scrollTo({top:scrollY+el.getBoundingClientRect().top-100,behavior:'instant'}));
        await page.screenshot({path:`${out}/${key}-table${t}-start.jpg`,type:'jpeg',quality:85});
        if(width===1440) await table.screenshot({path:`${out}/${key}-table${t}-complete.jpg`,type:'jpeg',quality:85});
      }
      for (const id of sourceIds) {
        await page.goto(base+route); await page.evaluate(() => document.fonts.ready);
        const link = page.locator(`article a[href="#acacia-ref-${id}"]`).first();
        await link.focus(); await settled(page); await page.keyboard.press('Enter');
        await page.waitForURL(u => u.hash === `#acacia-ref-${id}`); await settled(page);
        const target = page.locator(`#acacia-ref-${id}`);
        const box = await target.boundingBox();
        assert.ok(box.y >= 65 && box.y < 900, JSON.stringify(box));
        assert.ok((await target.innerText()).startsWith(`[${id}]`));
        record.citations++;
      }
      for (const source of ['research', 'resources/application-guides', 'resources/blog', 'solutions/beverages', 'solutions/food']) {
        assert.equal((await page.goto(`${base}${prefix}/${source}`)).status(),200);
        const link=page.locator(`a[href="${route}"]`).first();
        await link.scrollIntoViewIfNeeded(); await settled(page); await link.click();
        await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===route);
        assert.equal(await page.locator('.acacia-reader').count(),1); record.inbound++;
      }
      for(const dest of ['food','beverages']) {
        await page.goto(base+route);await page.evaluate(()=>document.fonts.ready);
        const link=page.locator(`article a[href="${prefix}/solutions/${dest}"]`).first();
        await link.scrollIntoViewIfNeeded();await settled(page);await link.click();
        await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===`${prefix}/solutions/${dest}`);
        record.outbound=(record.outbound||0)+1;
      }
      record.passed=true;
    } catch(e) { record.error=e.stack; throw e; }
    finally { writeFileSync(`${out}/results.json`,JSON.stringify({results,nonGet,errors},null,2)); await context.close(); }
  }
  assert.equal(nonGet.length,0); assert.equal(errors.length,0);
} finally { await browser.close(); }
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,nonGet,errors}));
