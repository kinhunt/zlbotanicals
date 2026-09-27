import { chromium } from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const out=process.env.QA_OUT; mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}); const results=[];
try {
 for(const lang of ['en','zh']) for(const width of [390,1440]) for(const js of [true,false]) {
 const key=`${lang}-${width}-${js?'js':'nojs'}`;
 const context=await browser.newContext({viewport:{width,height:900},javaScriptEnabled:js});
 const page=await context.newPage(); const errors=[]; const writes=[]; const requests=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',route=>{const req=route.request();requests.push(req.url());if(!['GET','HEAD'].includes(req.method())){writes.push(req.method());return route.abort();}return route.continue();});
 await page.goto(`${process.env.QA_URL || 'http://127.0.0.1:8942'}/${lang==='zh'?'zh/':''}resources/blog/green-tea-energy-beverage-2026/`);
 const root=page.locator('#tea-cost-calculator'); await root.scrollIntoViewIfNeeded();
 if(js){
 assert.equal(await root.locator('[data-calculate]').isEnabled(),true,'JS calculator must enable inputs');
 await root.locator('[data-calculate]').click(); assert.equal(await root.locator('[data-results]').isVisible(),false);
 const values={analyte:'Synthetic marker',assayReference:'SYNTHETIC only',assay:'40',targetMg:'50',bottles:'1000',moqKg:'5',packKg:'1',pricePerKg:'100',currency:'USD'};
 for(const [key,value] of Object.entries(values)) await root.locator(`[data-field=${key}]`).fill(value);
 await root.locator('#tc-unit').selectOption('%w/w');await root.locator('#tc-basis').selectOption('as-supplied');
 await root.locator('[data-calculate]').focus(); await page.keyboard.press('Enter');
 const result=root.locator('[data-results]');assert.equal(await result.isVisible(),true);
 assert.equal(await result.locator('[data-value=requiredKg]').textContent(),'0.125 kg');
 assert.equal(await result.locator('[data-value=purchaseCash]').textContent(),'500 USD');
 await result.scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/${key}-result.png`});
 writeFileSync(`${out}/${key}-aria.txt`,await result.ariaSnapshot());
 await root.locator('#tc-assay').fill('0.30000000000000004');assert.equal(await result.isVisible(),false,'edits clear stale results');
 await root.locator('[data-calculate]').click();assert.equal(await result.isVisible(),false,'unsupported precision rejected');
 await root.locator('[data-status]').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/${key}-invalid.png`});
 await root.locator('#tc-assay').fill('0.4');await root.locator('#tc-pricePerKg').fill('');await root.locator('[data-calculate]').click();
 assert.equal(await result.locator('[data-value=assaySupplyMgG]').textContent(),'4 mg/g');assert.equal(await result.locator('[data-value=purchaseCash]').count(),0);
 await root.locator('#tc-pricePerKg').fill('0');await root.locator('[data-calculate]').click();assert.equal(await result.isVisible(),false);
 await root.locator('#tc-zeroPriceConfirmed').check();await root.locator('[data-calculate]').click();assert.equal(await result.locator('[data-value=purchaseCash]').textContent(),'0 USD');
 await root.locator('#tc-basis').selectOption('dry-basis');await root.locator('[data-calculate]').click();assert.equal(await result.isVisible(),false);
 await root.locator('#tc-correctionKind').selectOption('LOD');await root.locator('#tc-correctionPercent').fill('5');await root.locator('#tc-correctionReference').fill('Synthetic same lot/method');await root.locator('#tc-sameLotAndMethod').check();await root.locator('#tc-appropriateForAssay').check();await root.locator('[data-calculate]').click();
 assert.equal(await result.locator('[data-value=assaySupplyMgG]').textContent(),'3.8 mg/g');
 await root.locator('#tc-basis').selectOption('as-supplied'); assert.equal(await root.locator('[data-correction]').isVisible(),false);assert.equal(await root.locator('#tc-correctionPercent').isDisabled(),true);
 await root.locator('[data-calculate]').click();assert.equal(await result.locator('[data-value=assaySupplyMgG]').textContent(),'4 mg/g');
 await root.locator('[data-clear]').click();assert.equal(await root.locator('#tc-assay').inputValue(),'');assert.equal(await result.isVisible(),false);
 assert.deepEqual(await page.evaluate(()=>[localStorage.length,sessionStorage.length]),[0,0]);
 await page.reload();assert.equal(await root.locator('#tc-assay').inputValue(),'');
 } else {assert.equal(await root.locator('[data-calculate]').isDisabled(),true);assert.match(await root.locator('noscript').innerText(),lang==='zh'?/不可用/:/unavailable/);await root.locator('summary').click();assert.match(await root.innerText(),/4.875/);}
 await root.locator('h2').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/${key}-top.png`});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'page overflow');
 for(const input of await root.locator('input,select').all()) assert.ok(await input.getAttribute('id'));
 assert.deepEqual(errors,[]);assert.deepEqual(writes,[]);assert.ok(!requests.some(x=>x.includes('Synthetic')||x.includes('SYNTHETIC')));
 results.push({key,passed:true,requests:requests.length});writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2)); await context.close();
 }
}finally{await browser.close();}
