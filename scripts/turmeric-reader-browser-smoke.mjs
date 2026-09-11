import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:4321';
const out=process.env.QA_OUTPUT||'/tmp/turmeric-reader-qa';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});const results=[];
try{
 for(const js of [true,false]) for(const width of [390,768,1440]) for(const lang of ['en','zh']){
  const prefix=lang==='zh'?'/zh':'',route=`${prefix}/plant-extracts/ingredients/turmeric`;
  const context=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:900}}),page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  assert.equal((await page.goto(base+route)).status(),200);await page.evaluate(()=>document.fonts.ready);
  await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';});
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),`https://zlbotanicals.com${route}`);
  const head=page.locator('head');
  for(const key of ['og:title','og:description','og:url','og:image','og:image:width','og:image:height','og:image:alt']) assert.equal(await head.locator(`meta[property="${key}"]`).count(),1);
  const imageURL=await head.locator('meta[property="og:image"]').getAttribute('content');
  assert.ok(imageURL.startsWith('https://zlbotanicals.com/'));
  assert.equal((await page.request.get(base+new URL(imageURL).pathname)).status(),200);
  assert.equal(await head.locator('meta[property="og:url"]').getAttribute('content'),`https://zlbotanicals.com${route}`);
  assert.equal(await page.locator('h1').count(),1);
  const boxes={};
  for(const selector of ['h1','#identity','[data-encyclopedia-toc]','#research-turmeric-references']) {
   boxes[selector]=await page.locator(selector).boundingBox();
   if(width===1440){const b=boxes[selector];assert.ok(b.width>=760&&b.width<=860,selector);assert.ok(Math.abs(b.x+b.width/2-width/2)<2,selector+' centered');}
  }
  const first=page.locator('[data-encyclopedia-toc] a').first();await first.focus();await page.keyboard.press('Enter');assert.equal(new URL(page.url()).hash,'#identity');
  assert.equal(await page.locator('[data-process-branches] .flow-option').count(),2);
  const body=page.locator('[data-deep-research]');
  assert.equal(await body.locator('nav').count(),1);
  assert.equal(await body.locator('[data-application-matrix] tbody tr').count(),5);
  for(const img of await body.locator('.concept-figure img').all()) {
   await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());assert.ok(await img.evaluate(el=>el.naturalWidth>0));
   const caption=await img.locator('..').locator('figcaption').innerText();assert.ok(caption.includes('AI'));assert.ok(caption.length<150);
  }
  for(const details of await body.locator('[data-study-box]').all()) {
   await details.locator('summary').click();assert.equal(await details.getAttribute('open'),'');
   assert.ok((await details.innerText()).includes('WOMAC'));await details.locator('summary').click();
  }
  for(const n of [1,2]) {
   const target=`#research-turmeric-clinical-source-${n}`;
   await body.locator(`a[href="${target}"]`).first().click();assert.equal(new URL(page.url()).hash,target);
   assert.ok((await page.locator(target).innerText()).length>80);
  }
  for(const region of await body.locator('.research-table').all()) {
   const hint=await region.locator('.table-hint').boundingBox(),box=await region.boundingBox();
   assert.ok(hint.width<=box.width-16,'scroll hint fits region');
   if(width===390) {await region.focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(150);assert.ok(await region.evaluate(el=>el.scrollLeft>0),'keyboard table scroll');}
  }
  const paragraphs=await body.locator('p').allTextContents();
  assert.equal(new Set(paragraphs).size,paragraphs.length,'no repeated paragraphs');
  for(const anchor of ['identity','effects','components','applications','formulations','patents','processes','standards','faq','insights']){
   await body.locator(`nav a[href="#${anchor}"]`).click();assert.equal(new URL(page.url()).hash,`#${anchor}`);
   assert.ok((await page.locator(`#${anchor}`).innerText()).length>30);
  }
  assert.equal(await body.locator('[data-formulation-concept]').count(),4);
  const productImages=[];
  for(const card of await body.locator('[data-formulation-concept]').all()) {
   const id=await card.getAttribute('data-formulation-concept'),img=card.locator('img');
   assert.equal(await img.count(),1);await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());
   assert.equal(await img.getAttribute('loading'),'lazy');
   assert.deepEqual(await img.evaluate(el=>[el.naturalWidth,el.naturalHeight]),[762,506]);
   const src=await img.getAttribute('src');assert.ok(src.includes(id));productImages.push(src);
   const b=await card.boundingBox(),ib=await img.boundingBox();
   assert.ok(b.width<=820.5&&ib.width<=b.width&&ib.x>=0&&ib.x+ib.width<=width);
   if(width===1440) assert.ok(Math.abs(b.x+b.width/2-width/2)<2,'card centered');
   if(js){await img.evaluate(el=>el.scrollIntoView({behavior:'instant',block:'center'}));await page.screenshot({path:`${out}/${lang}-${width}-${id}.png`});}
  }
  assert.equal(new Set(productImages).size,4);
  assert.deepEqual(await body.evaluate(el=>Array.from(el.children).filter(e=>e.tagName==='SECTION').slice(-3).map(e=>e.id)),['insights','patents','research-turmeric-references']);
  const allIds=await page.locator('[id]').evaluateAll(els=>els.map(el=>el.id));assert.equal(new Set(allIds).size,allIds.length);

  assert.equal(await body.locator('[data-patent-family]').count(),4);
  for(const [n,id] of [[1,'WO2007101551A2'],[2,'US10245238B2'],[3,'WO2012156979A1'],[5,'WO2007143635A1']]){
   const target=`#research-turmeric-formulation-source-${n}`;
   await body.locator(`a[href="${target}"]`).first().click();assert.equal(new URL(page.url()).hash,target);
   assert.equal(await page.locator(target+' a').getAttribute('href'),`https://patents.google.com/patent/${id}/en`);
  }
  assert.ok((await page.locator('#formulations').boundingBox()).width<=820.5);
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
   await body.locator('.research-table').evaluateAll(els=>els.forEach(el=>el.scrollLeft=0));
   for(const [name,selector] of [['intro','#identity'],['effects','#effects'],['applications','#applications'],['formulations','#formulations'],['patents','#patents'],['forms','#components'],['process','#processes'],['equipment','#equipment'],['case','#research-turmeric-insights-8'],['references','#research-turmeric-references']]){
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
  assert.deepEqual(errors,[]);results.push({lang,width,js,boxes,citations,productImages,patentsLast:true,productJourneys:5,originalImage:true});await context.close();
 }
 writeFileSync(`${out}/results.json`,JSON.stringify({passed:true,base,results},null,2));console.log(JSON.stringify({passed:true,cases:results.length,out}));
}finally{await browser.close();}
