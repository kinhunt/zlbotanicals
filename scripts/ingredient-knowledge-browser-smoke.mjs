import assert from 'node:assert/strict';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:4325';
const output=process.env.QA_OUTPUT||'/tmp/zl-ingredient-knowledge-qa';mkdirSync(output,{recursive:true});
const rows=JSON.parse(readFileSync('src/data/ingredient-knowledge.json'));
const dimensions=['processes','equipment','applications','standards','insights'];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[];
try {
 for(const javaScriptEnabled of [true,false]) for(const width of [390,1440]) for(const lang of ['en','zh']) {
  const prefix=lang==='zh'?'/zh':'';
  const context=await browser.newContext({javaScriptEnabled,viewport:{width,height:900}});
  const errors=[];
  for(const row of rows) {
   const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
   const routes=[`${prefix}/products/${row.productId}`];
   if(row.canonicalPath.startsWith('/plant-extracts'))routes.push(prefix+row.canonicalPath);
   for(const route of routes){
    assert.equal((await page.goto(base+route)).status(),200);await page.evaluate(()=>document.fonts.ready);
    const nav=page.locator(`[data-ingredient-nav="${row.productId}"]`);assert.equal(await nav.count(),1);
    const links=nav.locator('a');assert.equal(await links.count(),5);
    assert.deepEqual(await links.evaluateAll(els=>els.map(e=>e.getAttribute('href'))),dimensions.map(d=>`${prefix}${row.canonicalPath}#${d}`));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,route);
    for(const dim of dimensions){
     await page.goto(base+route);await page.locator(`[data-ingredient-nav] a[href$="#${dim}"]`).click();
     await page.waitForURL(base+prefix+row.canonicalPath+`#${dim}`);await page.waitForLoadState('load');
     const section=page.locator(`section#${dim}`);assert.equal(await section.count(),1);
     assert.ok((await section.textContent()).length>400);
     assert.ok(await section.locator('p').count()>0);
     assert.ok(await page.locator('[data-research-toc]').count()===1);
     assert.equal(await page.locator('[data-ingredient-content]').getAttribute('data-ingredient-content'),row.productId);
     await page.evaluate(()=>document.fonts.ready);
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
    }
    await page.goto(base+route);
    const general=page.locator('details.general-guides');assert.equal(await general.count(),1);
    assert.equal(await general.getAttribute('open'),null);await general.locator('summary').click();
    assert.equal(await general.locator('a').count(),7);
    if(route.includes('/products/')){
     const image=page.locator('img[src^="/images/products/"]');assert.equal(await image.count(),1);
     await image.scrollIntoViewIfNeeded();await image.evaluate(async el=>{if(!el.complete)await new Promise((resolve,reject)=>{el.onload=resolve;el.onerror=reject;});});
     assert.ok(await image.evaluate(el=>el.complete&&el.naturalWidth>0));assert.match(await image.getAttribute('src'),/\.webp$/);
    }
    if(row.productId!=='green-tea')assert.ok((await page.locator('#industry-updates').textContent()).includes(lang==='zh'?'暂无与本原料匹配':'No reviewed event records match'));
    if(javaScriptEnabled&&['green-tea','centella-asiatica','monk-fruit'].includes(row.productId)&&route.includes('/plant-extracts/')){
     await page.goto(base+route+'#equipment');await page.locator('section#equipment').scrollIntoViewIfNeeded();await page.screenshot({path:`${output}/${lang}-${row.productId}-${width}-equipment.png`});
    }
    results.push({javaScriptEnabled,width,lang,productId:row.productId,route,anchors:5});
   }
   await page.close();
  }
  assert.deepEqual(errors,[]);await context.close();
 }
 writeFileSync(`${output}/results.json`,JSON.stringify({passed:true,base,results},null,2));
 console.log(JSON.stringify({passed:true,pageChecks:results.length,anchorJourneys:results.length*5,output}));
}finally{await browser.close();}
