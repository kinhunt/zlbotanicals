import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || '/tmp/zl-browser/node_modules/playwright/index.mjs');
const base = process.argv[2] || 'http://127.0.0.1:8963';
const out = process.env.QA_OUT || '/tmp/oat-apple-qa';
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
  const jobs=[]; for (const kind of ["apple-extract-phloridzin-fibre-pectin", "oat-beta-glucan-material-selection"]) for (const width of [390,1440,320]) for (const lang of ['en','zh']) for (const javaScriptEnabled of [true,false]) jobs.push({kind,width,lang,javaScriptEnabled});
  async function run({kind,width,lang,javaScriptEnabled}) {
    const key = `${kind}-${lang}-${width}-js${+javaScriptEnabled}`;
    const context = await browser.newContext({ viewport: { width, height: 900 }, javaScriptEnabled });
    await context.route('**/*', route => {
      if (!['GET','HEAD'].includes(route.request().method())) { nonGet.push(route.request().url()); return route.abort(); }
      return route.continue();
    });
    const page = await context.newPage(); page.on('pageerror', e => errors.push({ key, error: e.message }));
    const prefix = lang === 'zh' ? '/zh' : '';
    const route = `${prefix}/resources/blog/${kind}`;
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
      assert.equal(metrics.tables,kind.startsWith('oat')?1:2); assert.ok(metrics.cards>0); assert.ok(parseFloat(metrics.font)>=16);
      const ids=await page.locator('[id]').evaluateAll(els=>els.map(el=>el.id));assert.equal(ids.length,new Set(ids).size);
      record.metrics=metrics;
      const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');assert.equal(canonical,'https://zlbotanicals.com'+route);
      assert.equal(await page.locator('link[hreflang="en"]').getAttribute('href'),`https://zlbotanicals.com/resources/blog/${kind}`);
      assert.equal(await page.locator('link[hreflang="zh-CN"]').getAttribute('href'),`https://zlbotanicals.com/zh/resources/blog/${kind}`);
      {
       await page.screenshot({path:`${out}/${key}-hero.jpg`,type:'jpeg',quality:65});
       const headings=page.locator('article .prose h2');
       for(let i=0;i<await headings.count();i++) {
        await headings.nth(i).evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
        await page.evaluate(()=>scrollBy(0,-100));
        await page.screenshot({path:`${out}/${key}-section${i}.jpg`,type:'jpeg',quality:60});
       }
      }
      const cells=page.locator('article tbody td'); record.accessibleCells=0; record.aria=[];
      for(let i=0;i<await cells.count();i++) {
        const cell=cells.nth(i), label=(await cell.locator('.mobile-label').textContent()).trim();
        const value=(await cell.locator('.cell-value').innerText()).trim();
        const aria=await cell.ariaSnapshot();
        assert.ok(aria.replace(/\\"/g,'"').includes(value) || value.split(/\s+/).every(v=>aria.includes(v)),aria);
        if(width<=640) { assert.ok(aria.includes(label),aria); record.accessibleCells++; }
        record.aria.push({label,value,aria});
      }
      const headers=page.locator('article thead th'); record.desktopHeaders=0;
      if(width>640) for(let i=0;i<await headers.count();i++) {
       const th=headers.nth(i);assert.ok(await th.isVisible());
       const name=(await th.innerText()).trim();assert.ok((await th.ariaSnapshot()).includes(name)); record.desktopHeaders++;
      }
      record.rowHeaders=[];
      for(const row of await page.locator('article tbody th').all()) {
       const name=(await row.innerText()).trim();const aria=await row.ariaSnapshot();assert.ok(aria.includes(name.replace(/\n/g,' ')) || name.split(/\s+/).every(v=>aria.includes(v)));record.rowHeaders.push({name,aria});
      }
      for(const table of await page.locator('article table').all()) {
       const capbox=await table.locator('caption').boundingBox(),tablebox=await table.boundingBox();
       assert.ok(capbox.width>=tablebox.width*.95,JSON.stringify({capbox,tablebox}));
      }
      assert.equal(await page.locator('article a[href="/contact"],article a[href="/zh/contact"]').count(),0);
      const other=lang==='en'?'/zh/resources/blog/'+kind:'/resources/blog/'+kind;
      const languageLink=page.locator(`a[href="${other}"]`).first();assert.ok(await languageLink.count());
      await languageLink.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));await settled(page);await languageLink.click();
      await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===other);record.languageJourney=true;
      await page.goto(base+route);await page.evaluate(()=>document.fonts.ready);
      for(let i=0;i<await page.locator('article tbody tr').count();i++) {
        const row=page.locator('article tbody tr').nth(i);
        await row.evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-90,behavior:'instant'}));
        await page.screenshot({path:`${out}/${key}-row${i}.jpg`,type:'jpeg',quality:70});
      }
      for(let i=0;i<await page.locator('article table').count();i++) await page.locator('article table').nth(i).screenshot({path:`${out}/${key}-table${i}.jpg`,type:'jpeg',quality:80});
      for (const id of (kind==='apple-extract-phloridzin-fibre-pectin'?[1,2,3,4,5]:[1,2,3,4,5,6])) {
        await page.goto(base+route); await page.evaluate(() => document.fonts.ready);
        const link = page.locator(`article a[href="#${kind}-ref-${id}"]`).first();
        await link.focus(); await settled(page); await page.keyboard.press('Enter');
        await page.waitForURL(u => u.hash === `#${kind}-ref-${id}`); await settled(page);
        const target = page.locator(`#${kind}-ref-${id}`);
        const box = await target.boundingBox();
        assert.ok(box.y >= 65 && box.y < 900, JSON.stringify(box));
        assert.ok((await target.innerText()).length>20);
        record.citations++;
      }
      for (const source of ['research', 'solutions/beverages', 'solutions/food', kind.startsWith('oat')?'resources/application-guides':'resources/quality-guides', 'resources/blog']) {
        assert.equal((await page.goto(`${base}${prefix}/${source}`)).status(),200);
        const link=page.locator(`a[href="${route}"]`).first();
        await page.evaluate(()=>document.fonts.ready); await link.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'})); await settled(page); await link.click();
        await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===route);
        assert.equal(await page.locator(`.oat-apple-reader`).count(),1); record.inbound++;
      }
      record.passed=true;
    } catch(e) { record.error=e.stack; }
    finally { writeFileSync(`${out}/results.json`,JSON.stringify({results,nonGet,errors},null,2)); await context.close(); }
  }
  await Promise.all(Array.from({length:2},async()=>{while(jobs.length) await run(jobs.shift());}));
  assert.equal(results.filter(r=>r.passed).length,24, 'complete matrix');
  assert.equal(nonGet.length,0); assert.equal(errors.length,0);
} finally { await browser.close(); }
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,nonGet,errors}));
