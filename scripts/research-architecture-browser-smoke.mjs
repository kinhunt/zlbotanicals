import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:4331';
const out=process.env.QA_OUTPUT||'/tmp/zl-research-qa';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[];let submissions=0;
try{
 for(const width of [390,768,1024,1440]) for(const lang of ['en','zh']){
  const prefix=lang==='zh'?'/zh':'';
  const page=await browser.newPage({viewport:{width,height:900}});const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/formsubmit.co/**',r=>{submissions++;return r.abort();});
  for(const route of ['/research','/plant-extracts/ingredients/green-tea','/plant-extracts/ingredients/centella-asiatica','/plant-extracts/ingredients/monk-fruit','/resources/research']){
   assert.equal((await page.goto(base+prefix+route)).status(),200);
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${lang} ${width} ${route}`);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://zlbotanicals.com'+prefix+route);
   if(route==='/research'){
    if(width<1024){
     await page.locator('#open-menu').click();
     assert.equal(await page.locator('#mobile-menu').evaluate(e=>e.inert),false);
     assert.equal(await page.locator('#mobile-menu nav > div').count(),5);
     await page.locator(`#mobile-menu nav > div > a[href="${prefix}/research"]`).click();
     await page.waitForLoadState();
    }else{
     const nav=page.locator('header nav').first();
     assert.equal(await nav.locator(':scope > div').count(),5);
     await nav.locator(`a[href="${prefix}/research"]`).focus();
     await nav.locator(`a[href="${prefix}/resources/research"]`).waitFor({state:'visible'});
    }
    await page.evaluate(()=>{if(document.activeElement instanceof HTMLElement)document.activeElement.blur();});
    await page.mouse.move(0,0);
    await page.screenshot({path:`${out}/${lang}-${width}-research.png`,fullPage:true});
    await page.locator('main a[href="#market"]').click();
    assert.equal(new URL(page.url()).hash,'#market');
   }
   if(route.includes('/ingredients/')){
    const slug=route.split('/').pop();
    await page.locator(`.science-profile a[href="${prefix}/products/${slug}"]`).click();
    await page.waitForLoadState();assert.equal(new URL(page.url()).pathname.replace(/\/$/,''),`${prefix}/products/${slug}`);
    await page.locator(`#processing-dossier nav a[href="${prefix}/plant-extracts/ingredients/${slug}"]`).click();
    await page.waitForLoadState();
   }
   if(route==='/resources/research'){
    await page.locator('[data-research-filter=ingredient]').selectOption('centella-asiatica');
    assert.equal(await page.locator('[data-research-card]:visible').count(),1);
    assert.equal(await page.locator('[data-research-card]:visible').getAttribute('data-ingredient'),'centella-asiatica');
    await page.locator('[data-research-filter=application]').selectOption('sweeteners');
    assert.equal(await page.locator('[data-research-card]:visible').count(),0);
    assert.ok(await page.locator('[data-research-empty]').isVisible());
    await page.locator('[data-research-reset]').click();
    assert.equal(await page.locator('[data-research-card]:visible').count(),12);
   }
  }
  assert.deepEqual(errors,[]);results.push({width,lang,routes:5,navigation:true,filters:true,productRoundTrip:true});await page.close();
 }
 for(const lang of ['en','zh']){
  const prefix=lang==='zh'?'/zh':'';const page=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:900}});
  await page.goto(base+prefix+'/research');
  await page.locator(`main a[href="${prefix}/plant-extracts/ingredients/green-tea"]`).click();await page.waitForLoadState();
  assert.ok(await page.locator('#identity').isVisible());
  await page.goto(base+prefix+'/resources/research');
  assert.equal(await page.locator('[data-research-card]:visible').count(),12);
  assert.equal(await page.locator('[data-research-controls]:visible').count(),0);
  await page.close();
 }
 assert.equal(submissions,0);const result={passed:true,base,results,noJavaScript:['en','zh'],submissions};
 writeFileSync(out+'/results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{await browser.close();}
