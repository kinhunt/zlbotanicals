import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'/tmp/zl-browser/node_modules/playwright/index.mjs');
const base=process.argv[2]||'http://127.0.0.1:4406';
const output=process.env.QA_OUTPUT||'/data/hermes/research/market-research-visuals/release/exhibits';
mkdirSync(output,{recursive:true});
const browser=await chromium.launch(); const results=[];
try {
for(const js of [true,false]) for(const width of [320,375,390,720,1280,1440]) for(const lang of ['en','zh']) {
 const context=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js}); const errors=[],nonGet=[];
 await context.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){nonGet.push(route.request().url());return route.abort();}return route.continue();});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto(`${base}/${lang==='zh'?'zh/':''}research/market/functional-mushrooms`);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('article figure').count(),4);assert.equal(await page.locator('article table caption').count(),5);
 const geometry=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,figures:[...document.querySelectorAll('article figure')].map(e=>({width:e.clientWidth,x:e.getBoundingClientRect().x}))}));assert.ok(geometry.overflow<=1,JSON.stringify(geometry));
 const names=await page.locator('article [role=region]').evaluateAll(es=>es.map(e=>e.getAttribute('aria-labelledby')));assert.equal(new Set(names).size,5);
 for(let n=1;n<=4;n++){
  const fig=page.locator(`#exhibit-${n}`);await fig.evaluate(e=>e.scrollIntoView({behavior:'instant',block:'start'}));
  assert.ok(await fig.isVisible());
  if(n<4){assert.ok(await fig.locator('.compact').evaluate(e=>e.scrollWidth<=e.clientWidth+1),'quantitative table fits viewport');assert.equal(await fig.locator('tbody tr').count(),[0,2,4,3][n]);assert.equal(await fig.locator('svg').count(),[0,2,4,3][n]);
   const fontsize=await fig.locator('.bar-label').first().evaluate(e=>parseFloat(getComputedStyle(e).fontSize));assert.ok(fontsize>=14);
  }
  if(js&&[390,1440].includes(width)) await fig.screenshot({path:`${output}/${lang}-${width}-exhibit-${n}.png`});
 }
 for(const id of ['supplements','segments','product-positioning','reishi','north-america','method']){
  const link=page.locator(`.market-toc a[href="#${id}"]`);await link.evaluate(e=>e.scrollIntoView({behavior:'instant',block:'center'}));await link.click();assert.equal(new URL(page.url()).hash,`#${id}`);
  await page.locator(`#${id}`).evaluate(e=>e.scrollIntoView({behavior:'instant',block:'start'}));assert.ok(await page.locator(`#${id}`).isVisible());
 }
 const table=page.locator('.product-matrix');await table.evaluate(e=>e.scrollIntoView({behavior:'instant',block:'center'}));
 if(await table.evaluate(e=>e.scrollWidth>e.clientWidth+1)){await table.focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(150);assert.ok(await table.evaluate(e=>e.scrollLeft)>0);}
 if(js&&width===1440){await page.emulateMedia({media:'print'});assert.equal(await page.locator('article figure:visible').count(),4);await page.pdf({path:`${output}/${lang}-print.pdf`,format:'A4',printBackground:true});}
 assert.deepEqual(errors,[]);assert.deepEqual(nonGet,[]);results.push({lang,width,js,passed:true,geometry,errors,nonGet});await context.close();
}
}finally{writeFileSync(`${output}/results.json`,JSON.stringify(results,null,2));await browser.close();}
console.log(JSON.stringify({passed:results.length,anchorJourneys:results.length*6,notes:'720 CSS px additionally exercises desktop 200% reflow equivalent; no non-GET requests.'}));
