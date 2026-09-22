import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || '/tmp/zl-browser/node_modules/playwright/index.mjs');
const base = process.argv[2] || 'http://127.0.0.1:8893';
const out = process.env.QA_OUT || '/tmp/hibiscus-qa';
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
    const route = `${prefix}/resources/blog/hibiscus-color-endpoints`;
    const record = { key, passed: false, citations: 0, inbound: 0 };
    results.push(record);
    try {
      assert.equal((await page.goto(base + route)).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('article img').count(), 0);
      assert.ok(!(await page.locator('article').innerText()).includes('**'));
      const metrics = await page.evaluate(() => {
        const table = document.querySelector('.hibiscus-table');
        const rect = el => { const r=el.getBoundingClientRect();return {x:r.x,width:r.width,right:r.right}; };
        return { overflow: document.documentElement.scrollWidth-innerWidth, caption:rect(table.caption), table:rect(table), rows:[...table.tBodies[0].rows].map(row=>({ ...rect(row), cells:[...row.cells].map(c=>({...rect(c),text:c.innerText, font:getComputedStyle(c).fontSize})), display:getComputedStyle(row).display })), labels:[...table.querySelectorAll('.mobile-label')].map(el=>getComputedStyle(el).display) };
      });
      assert.ok(metrics.overflow <= 1, JSON.stringify(metrics));
      assert.ok(metrics.caption.width > 200, 'caption cannot collapse');
      assert.equal(metrics.rows.length, 5);
      for (const row of metrics.rows) {
        assert.equal(row.cells.length, 4);
        assert.equal(row.display, width <= 600 ? 'block' : 'table-row');
        for (const cell of row.cells) { assert.ok(cell.x >= 0 && cell.right <= width+1); assert.ok(parseFloat(cell.font) >= 16); }
      }
      assert.ok(metrics.labels.every(v => v === (width <= 600 ? 'block':'none')));
      record.metrics = metrics;
      await page.screenshot({path:`${out}/${key}-hero.png`});
      await page.locator('.hibiscus-table').scrollIntoViewIfNeeded(); await settled(page);
      await page.screenshot({path:`${out}/${key}-comparison-viewport.png`});
      await page.locator('.hibiscus-table').screenshot({path:`${out}/${key}-comparison.png`});
      for (const id of [2,3]) {
        await page.goto(base+route); await page.evaluate(() => document.fonts.ready);
        const link = page.locator(`article a[href="#hibiscus-ref-${id}"]`).first();
        await link.focus(); await settled(page); await page.keyboard.press('Enter');
        await page.waitForURL(u => u.hash === `#hibiscus-ref-${id}`); await settled(page);
        const target = page.locator(`#hibiscus-ref-${id}`);
        const box = await target.boundingBox();
        assert.ok(box.y >= 65 && box.y < 900, JSON.stringify(box));
        assert.match(await target.innerText(), id===2 ? /Influence of storage temperature/ : /Physiochemical and antioxidant/);
        record.citations++;
      }
      for (const source of ['research', 'solutions/beverages', 'resources/application-guides', 'resources/blog']) {
        assert.equal((await page.goto(`${base}${prefix}/${source}`)).status(),200);
        const link=page.locator(`a[href="${route}"]`).first();
        await link.scrollIntoViewIfNeeded(); await settled(page); await link.click();
        await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===route);
        assert.equal(await page.locator('.hibiscus-table').count(),1); record.inbound++;
      }
      record.passed=true;
    } catch(e) { record.error=e.stack; throw e; }
    finally { writeFileSync(`${out}/results.json`,JSON.stringify({results,nonGet,errors},null,2)); await context.close(); }
  }
  assert.equal(nonGet.length,0); assert.equal(errors.length,0);
} finally { await browser.close(); }
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,nonGet,errors}));
