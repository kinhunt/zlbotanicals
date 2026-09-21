const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || '/tmp/zl-browser/node_modules/playwright/index.mjs');
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const base=process.argv[2]||'http://127.0.0.1:8796';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-21-quillaja-release/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
try{
for(const lang of ['en','zh']) for(const width of [390,1440]) for(const js of [true,false]){
 const name=`${lang}-${width}-js${Number(js)}`;
 const context=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js});
 const page=await context.newPage();
 const errors=[],badRequests=[];
 page.on('pageerror',err=>errors.push(String(err)));
 await context.route('**/*',route=>{
  if(!['GET','HEAD'].includes(route.request().method())){badRequests.push(route.request().url());return route.abort();}
  return route.continue();
 });
 const prefix=lang==='zh'?'/zh':'';
 const path=`${prefix}/solutions/beverages`;
 const response=await page.goto(base+path);assert.equal(response.status(),200);
 await page.evaluate(()=>document.fonts.ready);
 const module=page.locator('#quillaja-grade-selection');
 await module.scrollIntoViewIfNeeded();
 assert.equal(await module.locator('h2').count(),1);
 assert.equal(await module.locator('tbody tr').count(),3);
 assert.equal(await module.locator('tbody td').count(),9);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 for(const cell of await module.locator('tbody td').all()){
  const box=await cell.boundingBox();assert.ok(box.x>=0&&box.x+box.width<=width+1);
 }
 assert.equal(await module.locator('tbody td').first().evaluate(el=>getComputedStyle(el).display),width<640?'block':'table-cell');
 await module.screenshot({path:`${out}/${name}-module.png`});
 await module.locator('table').screenshot({path:`${out}/${name}-comparison.png`});
 // Actual native keyboard citation journeys; never manually scroll the destination.
 for(const id of [1,2]){
  await page.goto(base+path);await page.evaluate(()=>document.fonts.ready);
  const link=page.locator(`.quillaja-body a[href="#quillaja-ref-${id}"]`).first();
  await link.focus();await page.waitForTimeout(1800);await page.keyboard.press('Enter');
  await page.waitForURL(url=>url.hash===`#quillaja-ref-${id}`);await page.waitForTimeout(1800);
  const target=page.locator(`#quillaja-ref-${id}`);const rect=await target.boundingBox();
  assert.ok(rect.y>=65&&rect.y<1000,`${name} ref ${id} y=${rect.y}`);
  assert.ok(await target.locator('a').getAttribute('href'));
 }
 await page.screenshot({path:`${out}/${name}-sources-viewport.png`});
 const cta=page.locator('.quillaja-cta');await cta.focus();await page.waitForTimeout(1800);await page.keyboard.press('Enter');
 await page.waitForURL(url=>url.pathname===`${prefix}/request-quote`);await page.waitForLoadState('load');
 assert.equal(new URL(page.url()).searchParams.get('source'),'beverages');
 assert.match(new URL(page.url()).searchParams.get('application'),lang==='zh'?/皂树/:/Quillaja/);
 assert.equal(errors.length,0);assert.equal(badRequests.length,0);
 results.push({name,passed:true,rows:3,cells:9,nativeCitations:2,localizedInquiry:true,pageErrors:errors,nonGet:badRequests});
 writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
 await context.close();
}
}finally{await browser.close();}
console.log(JSON.stringify({passed:results.length,total:8,results},null,2));
