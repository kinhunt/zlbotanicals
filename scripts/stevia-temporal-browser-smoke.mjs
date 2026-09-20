import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'/tmp/zl-browser/node_modules/playwright/index.mjs');
const base=process.argv[2]||'http://127.0.0.1:4402';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-20-continuation/stevia/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});const results=[],errors=[];let nonGet=0;
try{
for(const js of [true,false])for(const lang of ['en','zh'])for(const width of [390,1440]){
 const context=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:950},acceptDownloads:true});
 await context.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){nonGet++;return route.abort();}return route.continue();});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(String(e)));
 const prefix=lang==='zh'?'/zh':'';const path=prefix+'/resources/blog/stevia-temporal-sensory';const name=`${lang}-${width}-${js?'js':'nojs'}`;
 assert.equal((await page.goto(base+path)).status(),200);await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://zlbotanicals.com'+path);
 for(const other of ['en','zh'])assert.equal(await page.locator(`link[hreflang="${other==='zh'?'zh-CN':'en'}"]`).getAttribute('href'),'https://zlbotanicals.com'+(other==='zh'?'/zh':'')+'/resources/blog/stevia-temporal-sensory');
 await page.screenshot({path:`${out}/${name}-hero.png`});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no page overflow');
 const ids=await page.locator('[id]').evaluateAll(ns=>ns.map(n=>n.id));assert.equal(ids.length,new Set(ids).size);
 assert.ok(!(await page.locator('article').innerText()).includes('**'),'no raw markdown');
 for(const id of ['stevia-method','stevia-interpret','stevia-download','stevia-ref-1','stevia-ref-2']){
  await page.locator(`article a[href="#${id}"]`).first().click();await page.waitForURL(`**#${id}`);await page.waitForTimeout(1800);
  const box=await page.locator('#'+id).boundingBox();assert.ok(box.y>=65&&box.y<950,`native ${id} navigation`);
  assert.ok((await page.locator('#'+id).innerText()).length>6);
  if(id==='stevia-method'||id==='stevia-download')await page.screenshot({path:`${out}/${name}-${id}.png`});
 }
 const downloadLink=page.locator(`a[download][href="/downloads/stevia-temporal-sensory-${lang}.txt"]`);
 const [download]=await Promise.all([page.waitForEvent('download'),downloadLink.click()]);
 assert.equal(download.suggestedFilename(),`stevia-temporal-sensory-${lang}.txt`);
 await download.saveAs(`${out}/${name}-download.txt`);
 assert.equal(readFileSync(`${out}/${name}-download.txt`,'utf8'),readFileSync(`public/downloads/stevia-temporal-sensory-${lang}.txt`,'utf8'));
 for(const target of ['products/stevia','plant-extracts/ingredients/stevia','solutions/beverages']){
  await page.goto(base+path);await page.locator(`article a[href="${prefix}/${target}"]`).first().click();await page.waitForURL('**'+prefix+'/'+target);assert.ok((await page.locator('main').innerText()).length>500);
 }
 for(const hub of ['resources','resources/application-guides','resources/blog','products/stevia']){
  assert.equal((await page.goto(base+prefix+'/'+hub)).status(),200);await page.locator(`a[href="${path}"]`).first().click();await page.waitForURL('**'+path);
 }
 results.push({lang,width,js,status:'pass'});writeFileSync(`${out}/results.json`,JSON.stringify({results,errors,nonGet},null,2));await context.close();
}
assert.equal(errors.length,0);assert.equal(nonGet,0);console.log(JSON.stringify({cases:results.length,errors,nonGet}));
}finally{await browser.close();}
