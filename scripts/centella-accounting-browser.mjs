import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
const base = process.argv[2] || 'http://127.0.0.1:4388';
const out = process.env.QA_OUTPUT || '/data/hermes/research/seo-growth/2026-09-20-accounting/author/browser';
await mkdir(out, {recursive:true});
const browser = await chromium.launch({headless:true});
const results = [];
try {
for (const lang of ['en','zh']) for (const width of [390,1440]) for (const javaScriptEnabled of [true,false]) {
  const context = await browser.newContext({viewport:{width,height:900},javaScriptEnabled,acceptDownloads:true});
  const page = await context.newPage();
  const errors = [], writes = [];
  page.on('pageerror', error => errors.push(error.message));
  await context.route('**/*', route => {
    if (!['GET','HEAD'].includes(route.request().method())) { writes.push(route.request().url()); return route.abort(); }
    return route.continue();
  });
  const response = await page.goto(`${base}/${lang==='zh'?'zh/':''}plant-extracts/ingredients/centella-asiatica`);
  assert.equal(response.status(),200);
  await page.evaluate(() => document.fonts.ready);
  const link = page.locator('#components a[href="#centella-accounting"]');
  await link.focus();
  await page.waitForTimeout(1800);
  await page.keyboard.press('Enter');
  await page.waitForURL('**#centella-accounting');
  await page.waitForTimeout(2000);
  const root = page.locator('#centella-accounting');
  assert.ok((await root.boundingBox()).y >= 65, 'native anchor clears header');
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  assert.match(await root.innerText(), /C × A ÷ 100/);
  for (const input of await root.locator('input').all()) assert.equal(await input.inputValue(),'');
  const unknown = lang==='zh'?'未知':'Unknown';
  const button = root.locator('[data-calculate]');
  if (javaScriptEnabled) {
    await button.click();
    assert.match(await root.locator('[data-status]').innerText(),lang==='zh'?/无法计算/:/Cannot calculate/);
    await root.locator('[data-basis]').selectOption('as-supplied');
    await root.locator('[data-addition]').fill('1');
    await root.locator('[data-concentration]').nth(0).fill('20');
    await root.locator('[data-concentration]').nth(1).fill('2');
    await root.locator('[data-unit]').nth(1).selectOption('%');
    await root.locator('[data-concentration]').nth(2).fill('0');
    await root.locator('[data-concentration]').nth(4).fill('50');
    await root.locator('[data-unit]').nth(4).selectOption('%');
    await button.focus(); await page.keyboard.press('Enter');
    const outputs = root.locator('output');
    assert.deepEqual(await outputs.allTextContents(),['0.2 mg/g · 0.02% w/w','0.2 mg/g · 0.02% w/w','0 mg/g · 0% w/w',unknown,'5 mg/g · 0.5% w/w']);
    // The fifth row is a distinct component sharing the whole-material denominator.
    for (const input of await root.locator('[data-concentration]').all()) await input.fill('');
    await root.locator('[data-unit]').first().selectOption('%');
    await root.locator('[data-concentration]').first().fill('60');
    await root.locator('[data-concentration]').nth(4).fill('50');
    const overmass = [];
    for (const addition of ['1','0']) {
      await root.locator('[data-addition]').fill(addition);
      await button.click();
      overmass.push({addition, outputs:await outputs.allTextContents(), rejected:/Cannot calculate|无法计算/.test(await root.locator('[data-status]').innerText())});
    }
    assert.deepEqual(overmass, ['1','0'].map(addition=>({addition,outputs:Array(5).fill(unknown),rejected:true})), '60% marker + fifth-row 50% must reject at both A=1 and A=0');
    await root.locator('[data-addition]').fill('1');
    await root.locator('[data-concentration]').nth(4).fill('40');
    await button.click();
    assert.deepEqual(await outputs.allTextContents(),['6 mg/g · 0.6% w/w',unknown,unknown,unknown,'4 mg/g · 0.4% w/w']);
    assert.equal(await outputs.count(),5,'individual outputs only, no total-active result');
    await root.locator('[data-unit]').first().selectOption('mg/g');
    await root.locator('[data-concentration]').first().fill('20');
    await root.locator('[data-concentration]').nth(4).fill('50');
    await button.click();
    assert.deepEqual(await outputs.allTextContents(),['0.2 mg/g · 0.02% w/w',unknown,unknown,unknown,'5 mg/g · 0.5% w/w']);
    await root.locator('[data-addition]').fill('2');
    assert.ok((await outputs.allTextContents()).every(v=>v===unknown),'stale outputs cleared');
    for (const [selector,value] of [['[data-basis]','dry'],['[data-addition]','101'],['[data-concentration]','-1']]) {
      await root.locator('[data-basis]').selectOption('as-supplied');
      await root.locator('[data-addition]').fill('1');
      await root.locator('[data-concentration]').first().fill('20');
      if (selector==='[data-basis]') await root.locator(selector).selectOption(value);
      else await root.locator(selector).first().fill(value);
      await button.click();
      assert.match(await root.locator('[data-status]').innerText(),lang==='zh'?/无法计算/:/Cannot calculate/);
      assert.ok((await outputs.allTextContents()).every(v=>v===unknown));
    }
    await root.locator('[data-concentration]').first().fill('990');
    await button.click();
    assert.match(await root.locator('[data-status]').innerText(),lang==='zh'?/无法计算/:/Cannot calculate/);
    await root.locator('[data-concentration]').first().fill('20');
    await button.click();
  } else {
    assert.equal(await button.isVisible(),false);
    assert.match(await root.locator('noscript').innerText(),/JavaScript/);
  }
  const downloadPromise = page.waitForEvent('download');
  await root.locator('a[download]').click();
  const download = await downloadPromise;
  assert.equal(download.suggestedFilename(),`centella-accounting-${lang}.txt`);
  const text = await readFile(await download.path(),'utf8');
  assert.equal(text,await readFile(`public/downloads/centella-accounting-${lang}.txt`,'utf8'));
  await download.saveAs(`${out}/${lang}-${width}-${javaScriptEnabled}.txt`);
  await page.evaluate(() => document.querySelector('#centella-accounting').scrollIntoView({behavior:'instant',block:'start'}));
  await page.screenshot({path:`${out}/${lang}-${width}-${javaScriptEnabled}.png`});
  assert.deepEqual(errors,[]); assert.deepEqual(writes,[]);
  results.push({lang,width,javaScriptEnabled,passed:true,errors,writes});
  await writeFile(`${out}/results.json`,JSON.stringify(results,null,2));
  await context.close();
}
} finally { await browser.close(); }
console.log(`${results.length}/8 accounting browser cases passed; no non-GET/HEAD requests.`);
