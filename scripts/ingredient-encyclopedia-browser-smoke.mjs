import assert from 'node:assert/strict';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:4322';
const profiles=JSON.parse(readFileSync('src/data/science-profiles.json'));
const out=process.env.QA_OUTPUT||'/tmp/zl-encyclopedia-qa';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});const results=[];
const anchors=['raw-material','components','applications','end-products','processes','equipment','standards','insights'];
try{
 for(const js of [true,false]) for(const width of [390,1440]) for(const lang of ['en','zh']){
  const prefix=lang==='zh'?'/zh':'';
  const context=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:900}});
  const errors=[];context.on('page',page=>page.on('pageerror',e=>errors.push(e.message)));
  const index=await context.newPage();
  assert.equal((await index.goto(`${base}${prefix}/plant-extracts/ingredients`)).status(),200);
  await index.evaluate(()=>document.fonts.ready);
  assert.equal(await index.locator('#extract-directory [data-extract-id]').count(),12);
  assert.equal(await index.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  if(js) await index.screenshot({path:`${out}/index-${lang}-${width}.png`,fullPage:true});
  results.push({kind:'index',lang,width,js});await index.close();
  for(const profile of profiles){
   const page=await context.newPage();const path=`${prefix}/plant-extracts/ingredients/${profile.id}`;
   assert.equal((await page.goto(base+path)).status(),200);await page.evaluate(()=>document.fonts.ready);
   await page.addStyleTag({content:'html { scroll-behavior: auto !important; }'});
   assert.equal(await page.locator('h1').innerText(),profile.title[lang]);
   assert.ok(await page.locator('#identity').innerText());
   for(const anchor of anchors){
    await page.locator(`[data-encyclopedia-toc] a[href="#${anchor}"]`).click();
    assert.equal(new URL(page.url()).hash,`#${anchor}`);
    const body=await page.locator(`#${anchor}`).innerText();
    assert.ok(body.length>(lang==='zh'?30:80),`${profile.id}/${lang}/${anchor}: missing readable body`);
   }
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   if(js&&['green-tea','turmeric','reishi-mushroom'].includes(profile.id)){
    await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${out}/science-${profile.id}-${lang}-${width}.png`});
   }
   results.push({kind:'science',id:profile.id,lang,width,js,anchors:anchors.length});
   const product=`${prefix}/products/${profile.id}`;
   assert.equal((await page.goto(base+product)).status(),200);await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('[data-deep-research]').count(),0);
   const image=page.locator('img[src^="/images/products/"]');await image.scrollIntoViewIfNeeded();
   await image.evaluate(el=>el.decode());assert.ok(await image.evaluate(el=>el.complete&&el.naturalWidth>0));
   assert.match(await image.getAttribute('src'),/\.webp$/);
   for(const anchor of ['processes','equipment','applications','standards','insights']){
    await page.goto(`${base}${product}#${anchor}`);await page.waitForLoadState('load');
    await page.addStyleTag({content:'html { scroll-behavior: auto !important; }'});
    const section=page.locator(`section#${anchor}`);await section.scrollIntoViewIfNeeded();
    assert.ok((await section.innerText()).length>100);
    await section.locator(`a[href="${path}#${anchor}"]`).click();await page.waitForLoadState('load');
    assert.equal(new URL(page.url()).pathname.replace(/\/$/,''),path);
    assert.equal(new URL(page.url()).hash,`#${anchor}`);
    assert.ok((await page.locator(`section#${anchor}`).innerText()).length>130);
   }
   results.push({kind:'product',id:profile.id,lang,width,js,anchors:5,image:true});await page.close();
  }
  assert.deepEqual(errors,[]);await context.close();
 }
 writeFileSync(`${out}/results.json`,JSON.stringify({passed:true,base,results},null,2));
 console.log(JSON.stringify({passed:true,cases:results.length,science:results.filter(r=>r.kind==='science').length,products:results.filter(r=>r.kind==='product').length,index:results.filter(r=>r.kind==='index').length,out}));
}finally{await browser.close();}
