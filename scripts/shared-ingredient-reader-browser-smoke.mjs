import assert from 'node:assert/strict';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:4321';
const profiles=JSON.parse(readFileSync('src/data/science-profiles.json','utf8'));
const out=process.env.QA_OUTPUT||'/tmp/zl-shared-reader-qa';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});const results=[];
try {
 for(const js of [true,false]) for(const width of [390,1440]) {
  const context=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:1000}});
  for(const lang of ['en','zh']) for(const p of profiles) {
   const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
   const route=`/${lang==='zh'?'zh/':''}plant-extracts/ingredients/${p.id}`;
   assert.equal((await page.goto(base+route)).status(),200);await page.evaluate(()=>document.fonts.ready);
   assert.doesNotMatch(await page.locator('body').innerText(),/AI\s*(?:绘制|生成)|AI[- ](?:illustration|generated)/i);
   for(const selector of ['[data-ingredient-content]','[data-related-resources]','[data-family-reading]']) {
    const box=await page.locator(selector).boundingBox();assert.ok(box.width<=820.5,`${route} ${selector} width`);assert.ok(Math.abs(box.x+box.width/2-width/2)<2,`${route} centered`);
   }
   for(const a of await page.locator('[data-ingredient-content] a[href^="#"]').all()) assert.equal(await page.locator(await a.getAttribute('href')).count(),1);
   for(const id of ['processes','equipment','applications','standards','insights']) assert.ok((await page.locator(`#${id}`).innerText()).length>100);
   for(const region of await page.locator('[data-ingredient-content] .research-table').all()) {assert.equal(await region.getAttribute('tabindex'),'0');assert.ok(await region.locator('th[scope="col"]').count()>1);}
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,route);
   const first=page.locator('[data-resource-cards] a').first();assert.equal(await first.getAttribute('href'),`/${lang==='zh'?'zh/':''}products/${p.id}`);
   if(js&&['turmeric','green-tea'].includes(p.id)) {await page.locator('[data-related-resources]').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));await page.screenshot({path:`${out}/${p.id}-${lang}-${width}.png`});}
   assert.deepEqual(errors,[]);results.push({route,width,js});await page.close();
  }
  await context.close();
 }
 writeFileSync(`${out}/results.json`,JSON.stringify({passed:true,results},null,2));console.log(JSON.stringify({passed:true,cases:results.length,out}));
} finally {await browser.close();}
