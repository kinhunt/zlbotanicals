import assert from 'node:assert/strict';
import {mkdirSync, readdirSync, writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:4321';
const output=process.env.QA_OUTPUT||'/tmp/zl-product-imagery-qa';
mkdirSync(output,{recursive:true});
const slugs=readdirSync('src/content/products/en').filter(f=>f.endsWith('.md')).map(f=>f.slice(0,-3));
assert.equal(slugs.length,12);
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[];
try{
 for(const width of [390,1440])for(const lang of ['en','zh']){
  const prefix=lang==='zh'?'/zh':'';
  const page=await browser.newPage({viewport:{width,height:900}});const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  for(const route of ['/','/products',...slugs.map(s=>`/products/${s}`)]){
   assert.equal((await page.goto(base+prefix+route)).status(),200);
   await page.evaluate(()=>document.fonts.ready);
   const images=page.locator('img[src^="/images/products/"]');
   assert.equal(await images.count(),route==='/'?6:route==='/products'?12:1);
   for(const image of await images.all()){
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(async el=>{if(!el.complete)await new Promise((resolve,reject)=>{el.onload=resolve;el.onerror=reject;});});
    assert.ok(await image.evaluate(el=>el.complete&&el.naturalWidth>0));
    assert.match(await image.getAttribute('src'),/\/images\/products\/[^/]+\.webp$/);
    assert.match(await image.getAttribute('alt'),lang==='zh'?/概念插画，非批次样品/:/concept illustration, not a batch sample/);
   }
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   if(['/','/products','/products/green-tea'].includes(route)){
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:`${output}/${lang}-${width}-${route.replaceAll('/','_')}.png`,fullPage:true});
    await images.first().screenshot({path:`${output}/${lang}-${width}-${route.replaceAll('/','_')}-image.png`});
   }
   results.push({lang,width,route,images:await images.count()});
  }
  assert.deepEqual(errors,[]);await page.close();
 }
 writeFileSync(`${output}/results.json`,JSON.stringify({passed:true,base,results},null,2));
 console.log(JSON.stringify({passed:true,base,pageChecks:results.length,productPageChecks:results.filter(r=>r.route.startsWith('/products/')).length,output}));
}finally{await browser.close();}
