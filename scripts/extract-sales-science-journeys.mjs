const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'/tmp/zl-browser/node_modules/playwright/index.mjs');
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
const ids=JSON.parse(readFileSync('src/data/ingredient-reader-packs.json')).map(p=>p.productId);
const base=process.argv[2]||'http://127.0.0.1:4321';const browser=await chromium.launch({args:['--no-sandbox']});let journeys=0;let keyboard=0;
try{for(const js of [true,false])for(const lang of ['en','zh'])for(const id of ids){
 const context=await browser.newContext({javaScriptEnabled:js,viewport:{width:390,height:900}});const page=await context.newPage();const prefix=lang==='zh'?'/zh':'';
 await page.goto(`${base}${prefix}/products/${id}`);await page.evaluate(()=>document.fonts.ready);
 const table=page.locator('.sales-table').first();await table.scrollIntoViewIfNeeded();await table.focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(250);assert.ok(await table.evaluate(t=>t.scrollLeft>0),`${lang}/${id} keyboard table`);keyboard++;
 const science=page.locator(`#standards a`);await science.evaluate(a=>a.scrollIntoView({block:'center',behavior:'instant'}));await science.click();await page.waitForURL(`**/plant-extracts/ingredients/${id}#standards`);await page.waitForLoadState('load');assert.ok((await page.locator('section#standards').innerText()).length>150);
 const back=page.locator('[data-procurement-link] a');await back.evaluate(a=>a.scrollIntoView({block:'center',behavior:'instant'}));await back.click();await page.waitForURL(`**/products/${id}#qualification`);await page.waitForLoadState('load');assert.ok((await page.locator('#qualification').innerText()).includes('COA'));journeys++;await context.close();console.log(`PASS ${js?'JS':'noJS'} ${lang}/${id}`);
}writeFileSync('/tmp/extract-sales-qa/journeys.json',JSON.stringify({journeys,keyboard}));console.log(JSON.stringify({journeys,keyboard}));}finally{await browser.close();}
