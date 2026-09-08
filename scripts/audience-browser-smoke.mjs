import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:4321';
const output=process.env.QA_OUTPUT||'/tmp/zl-audience-qa';mkdirSync(output,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[];let externalSubmissions=0;
try{
 for(const width of [390,768,1024,1440])for(const lang of ['en','zh']){
  const prefix=lang==='zh'?'/zh':'';const page=await browser.newPage({viewport:{width,height:900}});const errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.route('**/formsubmit.co/**',r=>{externalSubmissions++;return r.abort();});
  for(const route of ['/','/products/ginseng','/odm','/resources/research']){
   assert.equal((await page.goto(base+prefix+route)).status(),200);await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${prefix}${route} overflow ${width}`);
   await page.screenshot({path:`${output}/${lang}-${width}-${route.replaceAll('/','_')}.png`,fullPage:true});
  }
  const select=key=>page.locator(`[data-research-filter="${key}"]`);
  const visible=()=>page.locator('[data-research-card]:visible').count();
  assert.equal(await visible(),12);
  await select('ingredient').selectOption('green-tea');assert.equal(await visible(),1);
  await select('application').selectOption('packaging');assert.equal(await visible(),0);assert.ok(await page.locator('[data-research-empty]').isVisible());
  assert.match(await page.locator('[data-research-count]').innerText(),lang==='zh'?/显示 0 \/ 12/:/Showing 0 of 12/);
  await page.locator('[data-research-reset]').click();assert.equal(await visible(),12);
  await select('application').selectOption('packaging');assert.equal(await visible(),1);assert.equal(await page.locator('[data-research-card]:visible').getAttribute('data-ingredient'),'grape-seed');
  await page.locator('[data-research-reset]').click();await select('evidence').selectOption('review');assert.equal(await visible(),12);
  await page.locator('[data-evidence-details] summary').first().focus();await page.keyboard.press('Enter');assert.equal(await page.locator('[data-evidence-details]').first().getAttribute('open'),'');
  await page.goto(base+prefix+'/products/ginseng');await page.locator('[data-procurement-action="sample"]').click();await page.waitForLoadState('load');
  assert.equal(await page.locator('#request').inputValue(),'sample');assert.ok((await page.locator('#product').inputValue()).length>0);
  for(const intent of ['idea','transfer']){
   await page.goto(base+prefix+'/odm');await page.locator(`[data-odm-intent="${intent}"]`).click();await page.waitForLoadState('load');
   assert.equal(await page.locator('#request').inputValue(),intent==='transfer'?'odm-transfer':'odm');
   await page.locator('#concept').fill('Editable nonconfidential context');assert.equal(await page.locator('#concept').inputValue(),'Editable nonconfidential context');
   assert.equal(await page.locator('form').evaluate(f=>f.checkValidity()),false);
   for(const [key,value] of Object.entries({company:'Internal QA not submitted',name:'QA',email:'qa@example.invalid',country:'Undecided',market:'Undecided',product:'Early idea, specification undecided'}))await page.locator('#'+key).fill(value);
   assert.equal(await page.locator('form').evaluate(f=>f.checkValidity()),true);
  }
  assert.deepEqual(errors,[]);results.push({width,lang,filters:true,sample:true,idea:true,transfer:true});await page.close();
 }
 for(const lang of ['en','zh']){
  const prefix=lang==='zh'?'/zh':'';const page=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:900}});
  await page.goto(base+prefix+'/resources/research');assert.equal(await page.locator('[data-research-card]:visible').count(),12);assert.equal(await page.locator('[data-research-controls]').isVisible(),false);
  await page.locator('[data-evidence-details] summary').first().click();assert.equal(await page.locator('[data-evidence-details]').first().getAttribute('open'),'');
  await page.goto(base+prefix+'/odm');assert.ok(await page.locator('[data-odm-intent="transfer"]').isVisible());
  await page.goto(base+prefix+'/request-quote');await page.locator('#request').selectOption('odm-transfer');assert.equal(await page.locator('#request').inputValue(),'odm-transfer');await page.close();
 }
 assert.equal(externalSubmissions,0);const result={passed:true,base,results,noJavaScript:['en','zh'],externalSubmissions};writeFileSync(output+'/results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{await browser.close();}
