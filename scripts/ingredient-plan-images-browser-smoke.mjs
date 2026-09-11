import assert from 'node:assert/strict';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:4321';
const packs=JSON.parse(readFileSync('src/data/ingredient-reader-packs.json'));
const profiles=JSON.parse(readFileSync('src/data/science-profiles.json'));
const out=process.env.QA_OUTPUT||'/tmp/pr21-image-qa';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[],decoded=new Set();
try {
 for(const js of [true,false]) for(const width of [390,820,1440]){
  const context=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:950}});
  for(const lang of ['en','zh']) for(const profile of profiles){
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   const route=`/${lang==='zh'?'zh/':''}plant-extracts/ingredients/${profile.id}`;
   assert.equal((await page.goto(base+route)).status(),200);await page.evaluate(()=>document.fonts.ready);
   const box=await page.locator('[data-ingredient-content]').boundingBox();assert.ok(box.width<=820.5);
   const pack=packs.find(p=>p.productId===profile.id);
   if(pack){
    assert.equal(await page.locator('[data-formulation-plan]').count(),3);
    for(const plan of pack.plans){
     const section=page.locator(`[data-formulation-plan="${plan.id}"]`),image=section.locator('img');
     await image.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
     await image.evaluate(el=>el.decode());
     assert.equal(await image.getAttribute('src'),plan.image.src);assert.equal(await image.getAttribute('alt'),plan.image.alt[lang]);
     assert.equal(await section.locator('figcaption').innerText(),plan.image.caption[lang]);
     const dimensions=await image.evaluate(el=>({w:el.naturalWidth,h:el.naturalHeight}));
     assert.deepEqual(dimensions,{w:plan.image.width,h:plan.image.height});decoded.add(plan.image.src);
     const imageBox=await image.boundingBox();assert.ok(imageBox.width<=768.5&&imageBox.width>imageBox.height&&Math.abs(imageBox.width/imageBox.height-1.5)<0.02,`${route}/${plan.id}: image too large`);
     assert.equal(await image.evaluate(el=>getComputedStyle(el).objectFit),'contain');
    }
    if(js&&lang==='en'&&['green-tea','ginseng','goji-berry','resveratrol'].includes(profile.id)){
     await page.locator('.plan-illustration').first().evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
     await page.screenshot({path:`${out}/${profile.id}-${width}.png`});
    }
   }
   for(const image of await page.locator('[data-ingredient-content] img').all()){
    await image.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));await image.evaluate(el=>el.decode());
    const d=await image.evaluate(el=>({w:el.naturalWidth,h:el.naturalHeight}));const b=await image.boundingBox();
    assert.ok(d.w>d.h,`${route}: non-landscape decoded article image`);assert.ok(b.width>b.height,`${route}: non-landscape rendered article image`);
    assert.ok(b.width<=820.5&&b.height<=550,`${route}: oversized article illustration`);
   }
   for(const a of await page.locator('[data-ingredient-content] a[href^="#"]').all())assert.equal(await page.locator(await a.getAttribute('href')).count(),1);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,route);
   assert.deepEqual(errors,[]);results.push({route,width,js,images:pack?3:0});await page.close();
  }
  await context.close();
 }
 assert.equal(decoded.size,33);
 writeFileSync(`${out}/results.json`,JSON.stringify({passed:true,cases:results.length,decodedImages:decoded.size,results},null,2));
 console.log(JSON.stringify({passed:true,cases:results.length,decodedImages:decoded.size,out}));
}finally{await browser.close();}
