import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:4322', out=process.env.QA_OUTPUT||'/tmp/turmeric-procurement-qa';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({args:['--no-sandbox']}), results=[];
try{
for(const js of [true,false]) for(const width of [390,1440]) for(const lang of ['en','zh']){
 const prefix=lang==='zh'?'/zh':'', route=`${prefix}/products/turmeric`, science=`${prefix}/plant-extracts/ingredients/turmeric`;
 const context=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:900}}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://formsubmit.co/**',r=>r.abort());
 assert.equal((await page.goto(base+route)).status(),200);await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('h1').count(),1);assert.equal((await page.locator('h1').innerText()).trim(),lang==='zh'?'姜黄提取物采购':'Turmeric Extract Procurement');
 for(const selector of ['title','meta[name="description"]','meta[property="og:title"]','meta[property="og:description"]','meta[name="twitter:title"]','meta[name="twitter:description"]','link[rel="canonical"]','link[hreflang="en"]','link[hreflang="zh-CN"]']) assert.equal(await page.locator('head '+selector).count(),1,selector);
 assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://zlbotanicals.com'+route);
 const body=page.locator('[data-turmeric-procurement]');assert.equal(await body.locator('table').count(),2);
 assert.equal(await page.locator('[data-research-card],[data-news-card],[data-commercial-knowledge-summary]').count(),0);
 const paragraphs=await body.locator('p').allTextContents();assert.equal(new Set(paragraphs).size,paragraphs.length,'duplicate paragraphs');
 const ids=await page.locator('[id]').evaluateAll(els=>els.map(e=>e.id));assert.equal(ids.length,new Set(ids).size,'duplicate IDs');
 for(const id of ['material-selection','specifications','cost-comparison','samples','qualification','supply-terms','quote','processes','equipment','applications','standards','insights']){
  assert.equal(await page.locator('#'+id).count(),1);await page.locator('#'+id).evaluate(e=>e.scrollIntoView({behavior:'instant',block:'start'}));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${lang}/${width}/${id}: overflow`);
 }
 await page.locator('img[src="/images/products/turmeric.webp"]').evaluate(e=>e.decode());
 for(const id of ['forms','formulations','processes','standards']){
  await page.goto(base+route);await page.locator(`a[href="${science}#${id}"]`).first().click();await page.waitForURL('**'+science+'#'+id);
  assert.equal(await page.locator('#'+id).count(),1);await page.locator('#'+id).evaluate(e=>e.scrollIntoView({behavior:'instant'}));
 }
 for(const id of ['material-selection','samples','quote']){
  await page.goto(base+science);await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';});await page.evaluate(()=>document.fonts.ready);const link=page.locator(`[data-procurement-link] a[href="${route}#${id}"]`);await link.evaluate(e=>e.scrollIntoView({behavior:'instant',block:'center'}));await link.click();await page.waitForURL('**'+route+'#'+id);assert.equal(await page.locator('#'+id).count(),1);
 }
 await page.goto(base+route);await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`${out}/${lang}-${width}-${js?'js':'nojs'}-full.png`,fullPage:true});
 if(js){for(const request of ['quote','sample','TDS']){
  await page.goto(base+route);await page.locator(`[data-procurement-action="${request}"]`).click();await page.waitForURL('**/request-quote?**');
  const values=await page.locator('form').first().evaluate(f=>Object.fromEntries(new FormData(f)));assert.equal(values.product,lang==='zh'?'姜黄提取物':'Turmeric Extract');
  assert.ok(JSON.stringify(values).includes(request),request);
 }}
 assert.deepEqual(errors,[]);results.push({lang,width,js,route,passed:true});await context.close();
}
writeFileSync(out+'/results.json',JSON.stringify(results,null,2));console.log(`PASS ${results.length} turmeric procurement mobile/desktop EN/ZH JS-on/off journeys; no submissions`);
}finally{await browser.close();}
