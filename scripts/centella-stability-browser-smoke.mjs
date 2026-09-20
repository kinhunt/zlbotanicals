const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'/tmp/zl-browser/node_modules/playwright/index.mjs');
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const base=process.argv[2]||'http://127.0.0.1:4403';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-20-continuation/centella-integration/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});const results=[],errors=[];let nonGet=0;
try{
for(const js of [true,false])for(const lang of ['en','zh'])for(const width of [390,1440]){
 const context=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:950}});
 await context.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){nonGet++;return route.abort();}return route.continue();});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(String(e)));
 const prefix=lang==='zh'?'/zh':'';const path=prefix+'/resources/blog/centella-cold-process-stability';const name=`${lang}-${width}-${js?'js':'nojs'}`;
 assert.equal((await page.goto(base+path)).status(),200);await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://zlbotanicals.com'+path);
 for(const other of ['en','zh'])assert.equal(await page.locator(`link[hreflang="${other==='zh'?'zh-CN':other}"]`).getAttribute('href'),'https://zlbotanicals.com'+(other==='zh'?'/zh':'')+'/resources/blog/centella-cold-process-stability');
 const reader=page.locator('.centella-stability-reader');assert.equal(await reader.count(),1);
 assert.equal(await page.locator('.centella-stability-table').count(),2);
 assert.equal(await page.locator('th[scope="row"]').count(),8);
 const geometry=await reader.evaluate(el=>({width:el.getBoundingClientRect().width,align:getComputedStyle(el).textAlign}));
 assert.equal(geometry.align,'left');if(width===1440)assert.equal(geometry.width,820);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no page overflow');
 assert.ok(!(await reader.innerText()).includes('**'),'no literal markdown');
 const ids=await page.locator('[id]').evaluateAll(nodes=>nodes.map(n=>n.id));assert.equal(new Set(ids).size,ids.length);
 await page.screenshot({path:`${out}/${name}-hero.png`});
 await page.screenshot({path:`${out}/${name}-full.png`,fullPage:true});
 for(let i=0;i<2;i++){
  const region=page.locator('.centella-stability-table').nth(i);
  await region.evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY-110,behavior:'instant'}));await page.waitForTimeout(100);
  await page.screenshot({path:`${out}/${name}-table-${i}-left-viewport.png`});
  await region.screenshot({path:`${out}/${name}-table-${i}-left.png`});
  if(width===390){
   await region.focus();for(let j=0;j<5;j++)await page.keyboard.press('ArrowRight');await page.waitForTimeout(500);
   assert.ok(await region.evaluate(el=>el.scrollLeft>0),'keyboard horizontal scroll');
   await region.evaluate(el=>{el.scrollLeft=el.scrollWidth;});
   assert.ok(await region.evaluate(el=>{const row=el.querySelector('tbody tr');return row.lastElementChild.getBoundingClientRect().left>=row.firstElementChild.getBoundingClientRect().right-1;}),'rightmost column fully readable beside row identity');
   const identity=await region.evaluate(el=>{const box=el.getBoundingClientRect();return [...el.querySelectorAll('tbody th')].every(th=>{const b=th.getBoundingClientRect();const top=Math.max(b.top,0)+Math.min(b.height/2,10);return b.left>=box.left-1&&b.right<box.right&&getComputedStyle(th).position==='sticky';});});assert.ok(identity,'all row identities persist at right edge');
   await page.screenshot({path:`${out}/${name}-table-${i}-right-viewport.png`});
   await region.screenshot({path:`${out}/${name}-table-${i}-right.png`});
  }
 }
 for(let n=1;n<=2;n++){
  await reader.locator(`a[href="#centella-stability-ref-${n}"]`).first().click();await page.waitForURL(`**#centella-stability-ref-${n}`);await page.waitForTimeout(1800);
  const ref=page.locator(`#centella-stability-ref-${n}`);assert.ok((await ref.innerText()).length>(lang==='zh'?15:30));
  assert.ok((await ref.boundingBox()).y>=75,'native reference below fixed header');
  assert.match(await ref.locator('a').getAttribute('href'),/^https:\/\/www.ebi.ac.uk\//);
 }
 const toc=page.locator('#centella-stability-toc a').first();const target=await toc.getAttribute('href');await toc.click();await page.waitForURL(url=>decodeURIComponent(url.hash)===target);await page.waitForTimeout(1800);
 assert.ok((await page.locator(target).boundingBox()).y>=75,'native heading below fixed header');
 for(const suffix of ['/plant-extracts/ingredients/centella-asiatica','/products/centella-asiatica']){
  await page.goto(base+path);await page.evaluate(()=>document.fonts.ready);const outbound=reader.locator(`a[href="${prefix}${suffix}"]`).first();await outbound.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));await outbound.click();await page.waitForURL('**'+prefix+suffix);assert.ok((await page.locator('main').innerText()).length>500);
 }
 for(const hub of ['/resources','/resources/application-guides','/resources/blog','/solutions/cosmetics','/products/centella-asiatica']){
  assert.equal((await page.goto(base+prefix+hub)).status(),200);await page.evaluate(()=>document.fonts.ready);const discovery=page.locator(`a[href="${path}"]`).first();await discovery.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));await discovery.click();await page.waitForURL('**'+path);assert.equal(await reader.count(),1);
 }
 results.push({lang,width,js,status:'pass',geometry});writeFileSync(`${out}/results.json`,JSON.stringify({results,errors,nonGet},null,2));await context.close();
}
assert.equal(errors.length,0);assert.equal(nonGet,0);console.log(JSON.stringify({cases:results.length,errors,nonGet}));
}finally{await browser.close();}
