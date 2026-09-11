import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:4321';
const out=process.env.QA_OUTPUT||'/tmp/turmeric-reader-qa';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});const results=[];
try{
 for(const js of [true,false]) for(const width of [390,1440]) for(const lang of ['en','zh']){
  const prefix=lang==='zh'?'/zh':'',route=`${prefix}/plant-extracts/ingredients/turmeric`;
  const context=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:900}}),page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  assert.equal((await page.goto(base+route)).status(),200);await page.evaluate(()=>document.fonts.ready);
  await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';});
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),`https://zlbotanicals.com${route}`);
  const body=page.locator('[data-deep-research]');
  assert.equal(await body.locator('nav').count(),1);
  const paragraphs=await body.locator('p').allTextContents();
  assert.equal(new Set(paragraphs).size,paragraphs.length,'no repeated paragraphs');
  for(const anchor of ['raw-material','components','processes','equipment','applications','end-products','standards','insights']){
   await body.locator(`nav a[href="#${anchor}"]`).click();assert.equal(new URL(page.url()).hash,`#${anchor}`);
   assert.ok((await page.locator(`#${anchor}`).innerText()).length>30);
  }
  const citations=[];
  for(const n of [4,7,10,11,13]){
   const target=`#research-b-turmeric-source-${n}`,entry=page.locator(target);
   const label=entry.locator('.source-number');assert.equal(await label.innerText(),`[${n}]`);assert.ok(await label.isVisible());
   assert.equal(await entry.evaluate(el=>getComputedStyle(el).listStyleType),'none','no competing CSS counter');
   assert.equal(await entry.getAttribute('value'),String(n));
   const link=body.locator(`a[href="${target}"]`).first();assert.equal((await link.innerText()).trim(),`[${n}]`);
   await link.click();assert.equal(new URL(page.url()).hash,target);
   await entry.evaluate(el=>el.scrollIntoView({behavior:'instant',block:'center'}));
   assert.ok(await entry.isVisible());citations.push({id:n,label:await label.innerText(),url:await entry.locator('a').getAttribute('href')});
  }
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  if(js){
   for(const [name,selector] of [['intro','#identity'],['forms','#components'],['equipment','#equipment'],['case','#research-turmeric-insights-8'],['references','#research-turmeric-references']]){
    await page.locator(selector).evaluate(el=>el.scrollIntoView({behavior:'instant',block:'start'}));
    await page.screenshot({path:`${out}/${lang}-${width}-${name}.png`});
   }
  }
  const product=`${prefix}/products/turmeric`;await page.goto(base+product);await page.evaluate(()=>document.fonts.ready);
  const img=page.locator('img[src="/images/products/turmeric.webp"]');await img.scrollIntoViewIfNeeded();
  await img.evaluate(el=>el.decode());assert.ok(await img.evaluate(el=>el.complete&&el.naturalWidth>0));
  if(js)await page.screenshot({path:`${out}/${lang}-${width}-original-image.png`});
  for(const anchor of ['processes','equipment','applications','standards','insights']){
   await page.goto(base+product);await page.locator(`section#${anchor} a[href="${route}#${anchor}"]`).click();await page.waitForLoadState('load');
   assert.equal(new URL(page.url()).pathname,route);assert.equal(new URL(page.url()).hash,`#${anchor}`);
   assert.ok((await page.locator(`section#${anchor}`).innerText()).length>130);
  }
  assert.deepEqual(errors,[]);results.push({lang,width,js,citations,productJourneys:5,originalImage:true});await context.close();
 }
 writeFileSync(`${out}/results.json`,JSON.stringify({passed:true,base,results},null,2));console.log(JSON.stringify({passed:true,cases:results.length,out}));
}finally{await browser.close();}
