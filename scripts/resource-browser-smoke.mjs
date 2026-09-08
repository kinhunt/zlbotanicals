import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:4321';
const output=process.env.QA_OUTPUT||'/tmp/zl-resource-qa';mkdirSync(output,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[];
try {
for(const width of [390,1024,1280,1440]){
 const page=await browser.newPage({viewport:{width,height:900}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const prefix of ['', '/zh']){
  const response=await page.goto(base+prefix+'/resources',{waitUntil:'networkidle'});
  assert.equal(response.status(),200);
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'horizontal overflow');
  const cards=page.locator('[data-guide-card]');assert.equal(await cards.count(),5);
  const filter=page.locator('#ingredient-filter');
  await filter.selectOption('green-tea');
  const visible=await cards.evaluateAll(els=>els.filter(el=>!el.hidden&&getComputedStyle(el).display!=='none').map(el=>el.dataset.products));
  assert.ok(visible.length>0);assert.ok(visible.every(p=>p.split(' ').includes('green-tea')));
  await page.locator('[data-filter-reset]').click();
  assert.equal(await filter.inputValue(),'');
  assert.equal(await cards.evaluateAll(els=>els.filter(el=>!el.hidden&&getComputedStyle(el).display!=='none').length),5);
  for(const slug of ['ingredient-guides','application-guides','quality-guides','sourcing-guides']){
   const r=await page.goto(base+prefix+'/resources/'+slug,{waitUntil:'networkidle'});assert.equal(r.status(),200);
   assert.equal(await page.locator('h1').count(),1);
   assert.ok(await page.locator('main a[href*="/resources/blog/"]').count()>0,'populated category');
  }
  await page.goto(base+prefix+'/products/green-tea',{waitUntil:'networkidle'});
  assert.ok(await page.locator('main a[href*="/resources/blog/green-tea-energy-beverage-2026"]').count()>0);
  await page.goto(base+prefix+'/solutions/beverages',{waitUntil:'networkidle'});
  assert.ok(await page.locator('main a[href$="/products/green-tea"]').count()>0);
  assert.ok(await page.locator('main a[href*="/resources/blog/green-tea-energy-beverage-2026"]').count()>0);
  for(const detail of ['/resources/blog','/resources/blog/green-tea-energy-beverage-2026','/resources/blog/turmeric-golden-milk-market-2026']) {
   await page.goto(base+prefix+detail,{waitUntil:'networkidle'});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`overflow ${prefix}${detail} ${width}`);
  }
  await page.goto(base+prefix+'/resources',{waitUntil:'networkidle'});
  await page.screenshot({path:`${output}/${width}-${prefix?'zh':'en'}.png`,fullPage:true});
  results.push({width,lang:prefix?'zh':'en',passed:true});
 }
 assert.deepEqual(errors,[]);await page.close();
}
const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto(base+'/resources');assert.equal(await nojs.locator('[data-guide-card]').count(),5);await nojs.close();
writeFileSync(output+'/results.json',JSON.stringify({base,results,noJavaScript:true},null,2));console.log(JSON.stringify({passed:true,combinations:results.length,noJavaScript:true,output}));
}finally{await browser.close();}
