const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'/tmp/zl-browser/node_modules/playwright/index.mjs');
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const base=process.argv[2]||'http://127.0.0.1:4321';
const ids=['green-tea','centella-asiatica','monk-fruit','ginseng','reishi-mushroom','ginkgo-biloba','grape-seed','goji-berry','licorice-root','stevia','resveratrol'];
const out=process.env.QA_OUT||'/tmp/extract-sales-qa';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});let count=0,formCount=0;const errors=[];let posts=0;
try{
 for(const js of [true,false])for(const width of [390,1440])for(const lang of ['en','zh'])for(const id of ids){
  const context=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:1000}});
  await context.route('**/*',route=>{if(route.request().method()==='POST'){posts++;return route.abort();}return route.continue();});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(String(e)));
  const prefix=lang==='zh'?'/zh':'';const path=`${prefix}/products/${id}`;
  const response=await page.goto(base+path);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('h1').count(),1);assert.match(await page.locator('h1').innerText(),lang==='zh'?/采购$/:/ Procurement$/);
  const heading=await page.locator('h1').boundingBox();assert.ok(heading.y>=0&&heading.y+heading.height<1000,`${path} heading visible`);
  assert.ok(await page.locator('[data-procurement-action="quote"]').first().isVisible());
  const head=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name="description"]').content,canonical:document.querySelector('link[rel="canonical"]').href,alternates:[...document.querySelectorAll('link[hreflang]')].map(a=>[a.hreflang,a.href])}));
  assert.ok(head.title.includes(lang==='zh'?'采购':'Procurement'));assert.ok(head.description.length>(lang==='zh'?40:80));assert.ok(head.canonical.endsWith(path));assert.ok(head.alternates.some(([l,u])=>l==='en'&&u.endsWith(`/products/${id}`)));assert.ok(head.alternates.some(([l,u])=>l==='zh-CN'&&u.endsWith(`/zh/products/${id}`)));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${path} ${width} overflow`);
  for(const image of await page.locator('.extract-sales img').all()){await image.scrollIntoViewIfNeeded();await image.evaluate(i=>i.decode());assert.ok(await image.evaluate(i=>i.complete&&i.naturalWidth>0));}
  const arts=await page.locator('.application img').evaluateAll(imgs=>imgs.map(i=>({src:i.getAttribute('src'),w:i.naturalWidth,h:i.naturalHeight,r:i.getBoundingClientRect().width/i.getBoundingClientRect().height})));assert.equal(arts.length,3);assert.ok(arts.every(a=>a.src.includes(`/landscape/${id}/`)&&a.w>a.h&&Math.abs(a.r-1.5)<.02));
  for(const a of await page.locator('.extract-sales a[href*="/plant-extracts/ingredients/"]').all()){
   const url=new URL(await a.getAttribute('href'),base);const target=await context.request.get(url.href);assert.equal(target.status(),200);if(url.hash)assert.ok((await target.text()).includes(`id="${url.hash.slice(1)}"`),url.href);
  }
  await page.goto(base+path);await page.evaluate(()=>document.fonts.ready);
  if(js)await page.screenshot({path:`${out}/${lang}-${id}-${width}.png`});
  for(const request of ['quote','sample']){
   await page.goto(base+path);await page.locator(`[data-procurement-action="${request}"]`).first().click();await page.waitForURL('**/request-quote?**');await page.waitForLoadState('load');
   assert.equal(new URL(page.url()).searchParams.get('request'),request);
   const product=page.locator('#product');if(js){assert.equal(await product.inputValue(),new URL(page.url()).searchParams.get('product'));assert.equal(await page.locator('#request').inputValue(),request);}else{assert.equal(await product.inputValue(),'');}
   await product.fill('Editable local QA');assert.equal(await product.inputValue(),'Editable local QA');assert.ok(await page.locator('body').innerText().then(s=>s.includes('FormSubmit')));formCount++;
  }
  count++;console.log(`PASS ${count} ${js?'JS':'noJS'} ${width} ${lang}/${id}`);await context.close();
 }
 assert.equal(errors.length,0,errors.join('\n'));assert.equal(posts,0);writeFileSync(`${out}/summary.json`,JSON.stringify({cases:count,formJourneys:formCount,posts,errors},null,2));console.log(JSON.stringify({cases:count,formJourneys:formCount,posts,errors}));
}finally{await browser.close();}
