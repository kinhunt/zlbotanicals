import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const base=process.env.QA_URL||'http://127.0.0.1:4483';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-20-sdil-release/author/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});const results=[];
try {
for(const lang of ['en','zh']) for(const width of [390,1440]) for(const javaScriptEnabled of [true,false]) {
 const key=`${lang}-${width}-${javaScriptEnabled?'js':'nojs'}`, prefix=lang==='zh'?'/zh':'', route=`${prefix}/resources/blog/uk-sdil-milk-tea-2028`;
 const context=await browser.newContext({viewport:{width,height:900},javaScriptEnabled,acceptDownloads:true});const page=await context.newPage();const errors=[],blocked=[];
 page.on('pageerror',e=>errors.push(e.message));await context.route('**/*',r=>{if(['GET','HEAD'].includes(r.request().method()))return r.continue();blocked.push(r.request().url());return r.abort();});
 async function load(){const response=await page.goto(base+route);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);}
 async function native(id){await load();const link=page.locator(`.prose a[href="#${id}"]`).first();await link.focus();await page.waitForTimeout(1800);await page.keyboard.press('Enter');await page.waitForURL(url=>url.hash===`#${id}`);await page.waitForTimeout(1800);const box=await page.locator(`#${id}`).boundingBox();assert.ok(box.y>=65&&box.y<900,`${key} ${id} y=${box.y}`);}
 await load();assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),`https://zlbotanicals.com${route}`);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.equal(await page.locator('.prose table').count(),2);
 assert.ok(!(await page.locator('.prose').innerText()).includes('**'));
 await page.screenshot({path:`${out}/${key}-hero.png`});
 await native('sdil-current');await page.screenshot({path:`${out}/${key}-current.png`});
 for(let n=0;n<2;n++){
  const region=page.locator('.sdil-table').nth(n);await region.scrollIntoViewIfNeeded();await region.focus();await page.waitForTimeout(700);
  if(width===390){for(let i=0;i<30;i++)await page.keyboard.press('ArrowRight');await page.waitForTimeout(800);assert.ok(await region.evaluate(e=>e.scrollLeft>0));const last=await region.locator('th:last-child').boundingBox(),frame=await region.boundingBox();assert.ok(last.x>=frame.x-1&&last.x+last.width<=frame.x+frame.width+1,`${key} final column ${JSON.stringify({last,frame})}`);}
  await page.screenshot({path:`${out}/${key}-table-${n+1}.png`});
 }
 for(const id of ['sdil-lactose','sdil-plant','sdil-ref-1','sdil-ref-2','sdil-ref-4','sdil-ref-5','sdil-ref-6','sdil-ref-7','sdil-ref-8','sdil-download'])await native(id);
 await page.screenshot({path:`${out}/${key}-download.png`});
 const download=page.locator(`a[download][href="/downloads/sdil-worksheet-${lang}.txt"]`),event=page.waitForEvent('download');await download.click();const file=await event;assert.equal(file.suggestedFilename(),`sdil-worksheet-${lang}.txt`);assert.deepEqual(readFileSync(await file.path()),readFileSync(`public/downloads/sdil-worksheet-${lang}.txt`));await file.saveAs(`${out}/${key}-sdil-worksheet-${lang}.txt`);
 for(const target of ['products/stevia','products/green-tea','resources/application-guides','solutions/beverages']){
  const response=await page.goto(`${base}${prefix}/${target}`);assert.equal(response.status(),200);const back=page.locator(`a[href="${route}"]`).first();await back.focus();await page.waitForTimeout(1800);await page.keyboard.press('Enter');await page.waitForURL(url=>url.pathname===route||url.pathname===route+'/');
 }
 await load();const cta=page.locator(`.prose a[href^="${prefix}/request-quote?"]`);await cta.focus();await page.waitForTimeout(1800);await page.keyboard.press('Enter');await page.waitForURL(url=>url.pathname===prefix+'/request-quote');assert.equal((await page.request.get(page.url())).status(),200);assert.equal(new URL(page.url()).searchParams.get('application'),'UK milk tea');assert.ok(await page.locator('form').count());await page.screenshot({path:`${out}/${key}-procurement.png`});
 assert.deepEqual(errors,[]);assert.deepEqual(blocked,[]);results.push({key,passed:true,nativeAnchors:11,download:true,inboundJourneys:4,procurement:true,tableKeyboard:width===390,errors,nonGetRequests:blocked});writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));await context.close();
}
} finally {await browser.close();}
console.log(JSON.stringify({passed:results.length,results},null,2));
