import assert from 'node:assert/strict';
import fs from 'node:fs';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || '/tmp/zl-browser/node_modules/playwright/index.mjs');
const base = process.env.QA_URL || 'http://127.0.0.1:18991';
const out = process.env.QA_OUT || '/tmp/t05-native';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const results = [];
// Wait for native smooth scrolling, without moving the destination ourselves.
async function settled(page) {
  let previous = -1, stable = 0;
  for (let n = 0; n < 40; n++) {
    await page.waitForTimeout(100);
    const y = await page.evaluate(() => scrollY);
    stable = Math.abs(y - previous) < 0.5 ? stable + 1 : 0;
    previous = y;
    if (n >= 18 && stable >= 4) return;
  }
  throw new Error('Native scroll did not settle');
}
try {
  for (const lang of ['en', 'zh']) for (const width of [390, 1440]) for (const js of [true, false]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, javaScriptEnabled: js });
    await context.route('**/*', route => route.request().url().startsWith(base) && route.request().method() === 'GET' ? route.continue() : route.abort());
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    const url = `${base}${lang === 'zh' ? '/zh' : ''}/resources/blog/tea-scum-vs-tea-cream/`;
    const r = { lang, width, js, citations: [], tables: [] }; results.push(r);
    try {
      for (const id of ['s01', 's29']) {
        await page.goto(url); await page.evaluate(() => document.fonts.ready);
        const link = page.locator(`a[href="#tea-scum-ref-${id}"]`).first();
        await link.focus(); await settled(page); await page.keyboard.press('Enter');
        await page.waitForURL(u => u.hash === `#tea-scum-ref-${id}`); await settled(page);
        const bounds = await page.locator(`#tea-scum-ref-${id}`).evaluate(e => {
          const b = e.getBoundingClientRect();
          return { top: b.top, bottom: b.bottom, header: document.querySelector('header').getBoundingClientRect().bottom, height: innerHeight, margin: getComputedStyle(e).scrollMarginTop };
        });
        r.citations.push({ id, ...bounds });
        await page.screenshot({ path: `${out}/${lang}-${width}-${js}-${id}.png` });
        assert.ok(bounds.top >= bounds.header && bounds.bottom <= bounds.height, `Native ${lang}/${width}/${js}/${id} source hidden: ${JSON.stringify(bounds)}`);
      }
      if (!process.env.QA_CITATIONS_ONLY) {
        await page.goto(url); await page.evaluate(() => document.fonts.ready);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
        const tables = page.locator('.md-table-scroll'); assert.equal(await tables.count(), 4);
        for (let i = 0; i < 4; i++) {
          const table = tables.nth(i);
          await table.focus(); await settled(page);
          // Table screenshots only: position frame, never citation targets.
          await table.evaluate(e => window.scrollTo({ top: scrollY + e.getBoundingClientRect().top - 110, behavior: 'instant' }));
          const aria = await table.ariaSnapshot();
          const cells = await table.locator('th,td').allTextContents();
          for (const text of cells) assert.ok(aria.replace(/\s+/g, ' ').includes(text.replace(/\s+/g, ' ').trim()), `Missing accessible cell ${text}`);
          fs.writeFileSync(`${out}/${lang}-${width}-${js}-table${i + 1}-aria.txt`, aria);
          await page.screenshot({ path: `${out}/${lang}-${width}-${js}-table${i + 1}-start.png` });
          const before = await table.evaluate(e => ({ client: e.clientWidth, scroll: e.scrollWidth }));
          if (before.scroll > before.client + 1) {
            for (let key = 0; key < 40; key++) await page.keyboard.press('ArrowRight');
            await page.waitForTimeout(400);
          }
          const end = await table.evaluate(e => { const frame = e.getBoundingClientRect(), last = e.querySelector('th:last-child').getBoundingClientRect(); return { left: e.scrollLeft, max: e.scrollWidth - e.clientWidth, lastLeft: last.left, lastRight: last.right, frameLeft: frame.left, frameRight: frame.right }; });
          assert.ok(end.left >= end.max - 2, 'keyboard reaches table end');
          assert.ok(end.lastLeft >= end.frameLeft - 2 && end.lastRight <= end.frameRight + 2, 'last header visible');
          await page.screenshot({ path: `${out}/${lang}-${width}-${js}-table${i + 1}-end.png` });
          r.tables.push({ index: i + 1, cells: cells.length, ...before, ...end });
        }
      }
      r.passed = true;
    } catch (error) { r.passed = false; r.error = String(error); throw error; }
    finally { fs.writeFileSync(`${out}/results.json`, JSON.stringify(results, null, 2)); await context.close(); }
  }
} finally { await browser.close(); }
console.log(JSON.stringify({ passed: results.filter(r => r.passed).length, citations: results.reduce((n,r)=>n+r.citations.length,0), tables: results.reduce((n,r)=>n+r.tables.length,0) }));
