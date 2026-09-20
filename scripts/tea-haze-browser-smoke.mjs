const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || '/tmp/zl-browser/node_modules/playwright/index.mjs');
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const base=process.argv[2]||'http://127.0.0.1:4397';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/tea-haze-release/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});const results=[];const errors=[];let nonGet=0;
try {
for(const js of [true,false])for(const lang of ['en','zh'])for(const width of [390,1440]){
 const context=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:950}});
 await context.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){nonGet++;return route.abort();}return route.continue();});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(String(e)));
 const prefix=lang==='zh'?'/zh':'';const path=prefix+'/resources/blog/tea-haze-diagnosis';const name=`${lang}-${width}-${js?'js':'nojs'}`;
 assert.equal((await page.goto(base+path)).status(),200);await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://zlbotanicals.com'+path);
 for(const other of ['en','zh'])assert.equal(await page.locator(`link[hreflang="${other==='zh'?'zh-CN':other}"]`).getAttribute('href'),'https://zlbotanicals.com'+(other==='zh'?'/zh':'')+'/resources/blog/tea-haze-diagnosis');
 assert.ok(await page.locator('h1').innerText());
 assert.equal(await page.locator('.tea-haze-table').count(),2);
 assert.equal(await page.locator('.design-pair').count(),4);
 assert.equal(await page.locator('.storage-pair span').count(),8);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no page overflow');
 const ids=await page.locator('[id]').evaluateAll(nodes=>nodes.map(n=>n.id));assert.equal(new Set(ids).size,ids.length,'unique IDs');
 await page.screenshot({path:`${out}/${name}-hero.png`});
 await page.locator('#tea-haze-design').evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY-110,behavior:'instant'}));
 await page.waitForTimeout(250);await page.screenshot({path:`${out}/${name}-design-viewport.png`});
 await page.locator('#tea-haze-design').screenshot({path:`${out}/${name}-design.png`});
 for(let i=0;i<2;i++){
  const table=page.locator('.tea-haze-table').nth(i);await table.scrollIntoViewIfNeeded();await table.focus();
  if(width===390){await page.keyboard.press('End');await page.waitForTimeout(350);let scrolled=await table.evaluate(el=>el.scrollLeft);if(!scrolled){await page.keyboard.press('ArrowRight');await page.waitForTimeout(350);scrolled=await table.evaluate(el=>el.scrollLeft);}assert.ok(scrolled>0,'table keyboard scroll');}
  await table.screenshot({path:`${out}/${name}-table-${i}.png`});
 }
 for(let n=1;n<=4;n++){
  await page.locator(`.tea-haze-reader a[href="#tea-haze-ref-${n}"]`).first().click();await page.waitForURL(`**#tea-haze-ref-${n}`);await page.waitForTimeout(1800);
  const ref=page.locator(`#tea-haze-ref-${n}`);assert.ok((await ref.innerText()).length>40);assert.match(await ref.locator('a').getAttribute('href'),/^https:\/\//);
 }
 const toc=page.locator('#tea-haze-toc a').first();const target=await toc.getAttribute('href');await toc.click();await page.waitForURL(url=>decodeURIComponent(url.hash)===target);await page.waitForTimeout(1800);assert.ok(await page.locator(target).isVisible());
 for(const suffix of ['/plant-extracts/ingredients/green-tea','/plant-extracts/ingredients/green-tea#formulation-citrus-tea','/solutions/beverages','/products/green-tea']){
  await page.goto(base+path);const link=page.locator(`article a[href="${prefix}${suffix}"]`).first();await link.click();await page.waitForURL('**'+prefix+suffix);assert.ok((await page.locator('main').innerText()).length>500);
 }
 for(const hub of ['/resources','/resources/application-guides','/resources/blog','/solutions/beverages','/products/green-tea']){
  assert.equal((await page.goto(base+prefix+hub)).status(),200);const link=page.locator(`a[href="${path}"]`).first();await link.click();await page.waitForURL('**'+path);assert.equal(await page.locator('.tea-haze-reader').count(),1);
 }
 results.push({lang,width,js,status:'pass'});writeFileSync(`${out}/results.json`,JSON.stringify({results,errors,nonGet},null,2));await context.close();
}
assert.equal(errors.length,0);assert.equal(nonGet,0);console.log(JSON.stringify({cases:results.length,errors,nonGet}));
}finally{await browser.close();}
