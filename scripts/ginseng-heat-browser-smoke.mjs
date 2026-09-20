import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const base=process.env.QA_URL||'http://127.0.0.1:4473';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-20-ginseng-release/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});const results=[];
try {
for(const lang of (process.env.QA_QUICK?['zh']:['en','zh'])) for(const width of (process.env.QA_QUICK?[390]:[390,1440])) for(const javaScriptEnabled of (process.env.QA_QUICK?[false]:[true,false])) {
 const key=`${lang}-${width}-${javaScriptEnabled?'js':'nojs'}`, prefix=lang==='zh'?'/zh':'', route=`${prefix}/resources/blog/ginseng-heat-bitterness`;
 const context=await browser.newContext({viewport:{width,height:900},javaScriptEnabled,acceptDownloads:true});const page=await context.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(e.message));await context.route('**/*',route=>['GET','HEAD'].includes(route.request().method())?route.continue():route.abort());
 async function load(){const response=await page.goto(base+route);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);}
 async function native(id){
  await load();const link=page.locator(`.prose a[href="#${id}"]`).first();await link.focus();await page.waitForTimeout(1800);await page.keyboard.press('Enter');await page.waitForURL(url=>url.hash===`#${id}`);await page.waitForTimeout(1800);
  const box=await page.locator(`#${id}`).boundingBox();assert.ok(box.y>=65&&box.y<900,`${key} ${id} native y=${box.y}`);
 }
 await load();assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),`https://zlbotanicals.com${route}`);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 assert.equal(await page.locator('.prose table').count(),1);assert.equal(await page.locator('.prose thead th').count(),3);assert.equal(await page.locator('.prose tbody tr').count(),4);
 await page.screenshot({path:`${out}/${key}-hero.png`});
 await native('ginseng-heat-trials');await page.screenshot({path:`${out}/${key}-trial-anchor.png`});
 const region=page.locator('.ginseng-trial-table');await region.scrollIntoViewIfNeeded();await region.focus();await page.waitForTimeout(700);
 const before=await page.locator('.prose tbody tr:first-child td:first-child').boundingBox();
 if(width<720){for(let i=0;i<12;i++)await page.keyboard.press('ArrowRight');await page.waitForTimeout(600);assert.ok(await region.evaluate(e=>e.scrollLeft>0));const after=await page.locator('.prose tbody tr:first-child td:first-child').boundingBox();assert.ok(Math.abs(after.x-before.x)<2,'row identity stays visible');}
 await page.screenshot({path:`${out}/${key}-table.png`});
 if(width<720){
  await region.evaluate(e=>e.scrollLeft=e.scrollWidth); // inspect the explicit end state after native keyboard scrolling above
  const first=await page.locator('.prose thead th:first-child').boundingBox(),last=await page.locator('.prose thead th:last-child').boundingBox(),frame=await region.boundingBox();
  assert.ok(last.x>=first.x+first.width-1 && last.x+last.width<=frame.x+frame.width+1,`${key} last header must be fully visible beside sticky identity: ${JSON.stringify({first,last,frame})}`);
  await page.screenshot({path:`${out}/${key}-table-end.png`});
 }

 for(const id of ['ginseng-heat-ref-1','ginseng-heat-ref-2','ginseng-heat-ref-4','ginseng-heat-download'])await native(id);
 const download=page.locator(`a[download][href="/downloads/ginseng-heat-trial-${lang}.txt"]`);const event=page.waitForEvent('download');await download.click();const file=await event;assert.equal(file.suggestedFilename(),`ginseng-heat-trial-${lang}.txt`);assert.equal(readFileSync(await file.path(),'utf8'),readFileSync(`public/downloads/ginseng-heat-trial-${lang}.txt`,'utf8'));
 for(const target of ['products/ginseng','plant-extracts/ingredients/ginseng']){
  await load();await page.locator(`.prose a[href="${prefix}/${target}"]`).click();await page.waitForURL(`**/${target}`);assert.equal((await page.request.get(page.url())).status(),200);
  await page.evaluate(()=>document.fonts.ready);
  const back=page.locator(`a[href="${route}"]`).first();await back.evaluate(e=>e.scrollIntoView({behavior:'instant',block:'center'}));await page.waitForTimeout(500);await back.click();await page.waitForURL(`**${route}`);
 }
 assert.deepEqual(errors,[]);results.push({key,passed:true,nativeAnchors:5,download:true,roundTrips:2});writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));await context.close();
}
} finally {await browser.close();}
console.log(JSON.stringify({passed:results.length,results},null,2));
