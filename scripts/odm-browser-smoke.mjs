import assert from 'node:assert/strict';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:4349';
const output=process.env.QA_OUTPUT||'/tmp/zl-odm-qa';mkdirSync(output,{recursive:true});
const concepts=JSON.parse(readFileSync('src/data/odm.json'));
const products=JSON.parse(readFileSync('src/data/product-dossiers.json'));
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[];let externalSubmissions=0;
try{
 for(const width of [390,768,1024,1440])for(const lang of ['en','zh']){
  const page=await browser.newPage({viewport:{width,height:900}});const prefix=lang==='zh'?'/zh':'';const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/formsubmit.co/**',route=>{externalSubmissions++;return route.abort();});
  const routes=['/odm',...concepts.map(c=>'/odm/'+c.slug),'/resources/research','/resources/news',...products.map(p=>'/products/'+p.slug)];
  for(const route of routes){
   const response=await page.goto(base+prefix+route,{waitUntil:'domcontentloaded'});assert.equal(response.status(),200);
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('html').getAttribute('lang'),lang);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`overflow: ${width} ${prefix}${route}`);
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://zlbotanicals.com'+prefix+route);
   if(route==='/odm'){
    await page.locator('main img').evaluate(img=>img.decode());
    await page.screenshot({path:`${output}/odm-${lang}-${width}.png`,fullPage:true});
   }
  }
  for(const c of concepts){
   await page.goto(base+prefix+'/odm/'+c.slug);
   await page.locator('[data-odm-quote]').click();
   await page.waitForLoadState('load');
   assert.equal(await page.locator('#request').inputValue(),'odm');
   assert.equal(await page.locator('#concept').inputValue(),c.slug);
   assert.equal(await page.locator('#product').inputValue(),c.title[lang]);
   assert.ok((await page.locator('#application').inputValue()).includes(c.title[lang]));
   assert.equal(await page.locator('form').evaluate(f=>f.checkValidity()),false);
   const formData=await page.locator('form').evaluate(f=>Object.fromEntries(new FormData(f)));
   assert.equal(formData.concept,c.slug);
  }
  await page.goto(base+prefix+'/request-quote?request=odm&concept='+encodeURIComponent('<img src=x onerror=alert(1)>')+'&application='+('x'.repeat(900)));
  assert.equal(await page.locator('#concept').inputValue(),'<img src=x onerror=alert(1)>');
  assert.equal((await page.locator('#application').inputValue()).length,500);
  assert.equal(await page.locator('form img').count(),0);
  assert.deepEqual(errors,[]);results.push({width,lang,routes:routes.length,conceptJourneys:3,passed:true});await page.close();
 }
 const page=await browser.newPage({javaScriptEnabled:false});await page.goto(base+'/zh/odm');assert.equal(await page.locator('main a[href^="/zh/odm/"]').count(),3);await page.close();
 assert.equal(externalSubmissions,0);
 const result={base,passed:true,results,routeVisits:results.reduce((n,r)=>n+r.routes,0),conceptJourneys:24,externalSubmissions,noJavaScript:true};writeFileSync(output+'/results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{await browser.close();}
