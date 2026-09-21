const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || '/tmp/zl-browser/node_modules/playwright/index.mjs');
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base=process.argv[2]||'http://127.0.0.1:8793';
const output=process.env.QA_OUTPUT||'/tmp/rosemary-qa';fs.mkdirSync(output,{recursive:true});
const browser=await chromium.launch({headless:true});const results=[];const statuses=[];
try{
for(const lang of ['en','zh'])for(const width of [390,1440])for(const js of [true,false]){
 const context=await browser.newContext({viewport:{width,height:900},javaScriptEnabled:js});
 await context.route('**/*',route=>['GET','HEAD'].includes(route.request().method())?route.continue():route.abort());
 const page=await context.newPage();page.on('response',r=>statuses.push({url:r.url(),status:r.status()}));
 const url=`${base}/${lang==='zh'?'zh/':''}solutions/food/`;
 const response=await page.goto(url);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
 const section=page.locator('#rosemary-selection');assert.equal(await section.locator('.rosemary-choice').count(),6);
 const text=await section.innerText();assert.ok(!text.includes('**'));assert.ok(text.includes(lang==='zh'?'感官平均评分最高':'highest mean sensory scores'));
 assert.ok(text.includes(lang==='zh'?'加入油相的具体方法和工艺条件':'actual oil-incorporation instructions'));
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 for(const id of [1,5,6]){
  await page.goto(url);await page.evaluate(()=>document.fonts.ready);
  const link=page.locator(`#rosemary-selection a[href="#rosemary-ref-${id}"]`).first();
  await link.evaluate(el=>el.scrollIntoView({behavior:'instant',block:'center'}));await link.focus();await page.waitForTimeout(1800);await page.keyboard.press('Enter');
  await page.waitForURL(u=>u.hash===`#rosemary-ref-${id}`);await page.waitForTimeout(1800);
  const box=await page.locator(`#rosemary-ref-${id}`).boundingBox();assert.ok(box.y>=64 && box.y<900,JSON.stringify(box));
 }
 await section.locator('.rosemary-choice').first().scrollIntoViewIfNeeded();await page.screenshot({path:`${output}/${lang}-${width}-${js}.png`});
 const cta=section.locator('.rosemary-cta');await cta.evaluate(el=>el.scrollIntoView({behavior:'instant',block:'center'}));await cta.click();await page.waitForURL(u=>u.pathname.includes('request-quote'));
 assert.ok(new URL(page.url()).searchParams.get('application').includes(lang==='zh'?'迷迭香':'Rosemary'));
 results.push({lang,width,js,passed:true});fs.writeFileSync(`${output}/results.json`,JSON.stringify({results,statuses},null,2));await context.close();
}
console.log(JSON.stringify({passed:results.length}));
}finally{await browser.close();fs.writeFileSync(`${output}/results.json`,JSON.stringify({results,statuses},null,2));}
