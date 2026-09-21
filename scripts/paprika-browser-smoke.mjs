const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.argv[2]||'http://127.0.0.1:4387';
const output=process.env.QA_OUTPUT||'/data/hermes/research/seo-growth/2026-09-21-paprika-release/browser';
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[], errors=[], blocked=[];
try {
 for(const lang of ['en','zh']) for(const width of [390,1440]) for(const js of [true,false]) {
  const key=`${lang}-${width}-${js?'js':'nojs'}`;
  const context=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js});
  await context.route('**/*',route=>['GET','HEAD'].includes(route.request().method())?route.continue():(blocked.push(route.request().url()),route.abort()));
  const page=await context.newPage(); page.on('pageerror',e=>errors.push(String(e)));
  const prefix=lang==='zh'?'/zh':'';
  const path=`${prefix}/resources/blog/paprika-extract-format-selection`;
  assert.equal((await page.goto(base+prefix+'/solutions/food')).status(),200);
  const incoming=page.locator(`a[href="${path}"]`).first();
  await incoming.click(); await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===path);
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.paprika-choice').count(),5);
  const prose=page.locator('article .prose');
  assert.ok(!(await prose.innerText()).includes('**'));
  assert.equal(await page.locator('h1').count(),1);
  const ids=await page.locator('[id]').evaluateAll(ns=>ns.map(n=>n.id)); assert.equal(ids.length,new Set(ids).size);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:`${output}/${key}-hero.png`});
  for(let i=0;i<5;i++) {
   const card=page.locator('.paprika-choice').nth(i); await card.scrollIntoViewIfNeeded();
   const rect=await card.boundingBox(); assert.ok(rect.x>=0&&rect.x+rect.width<=width+1);
   assert.equal(await card.locator('strong').count(),3);
   if(js) await card.screenshot({path:`${output}/${key}-choice-${i+1}.png`});
  }
  for(const n of [1,2]) {
   await page.goto(base+path); await page.evaluate(()=>document.fonts.ready);
   const link=page.locator(`.prose a[href="#paprika-ref-${n}"]`).first();
   await link.focus(); await page.waitForTimeout(1800); await page.keyboard.press('Enter');
   await page.waitForURL(u=>u.hash===`#paprika-ref-${n}`); await page.waitForTimeout(1800);
   const target=page.locator(`#paprika-ref-${n}`); const box=await target.boundingBox();
   assert.ok(box.y>=65&&box.y<1000,`native citation y=${box.y}`);
   assert.ok((await target.innerText()).includes('JECFA'));
  }
  await page.screenshot({path:`${output}/${key}-sources.png`});
  await page.locator(`.prose a[href="${prefix}/request-quote"]`).click();
  await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===prefix+'/request-quote');
  assert.ok(await page.locator('form').count()>0);
  results.push({key,passed:true,cards:5,nativeCitations:2,inquiryNavigation:true});
  await writeFile(`${output}/results.json`,JSON.stringify({results,errors,blocked},null,2));
  await context.close();
 }
 assert.equal(errors.length,0); assert.equal(blocked.length,0);
} finally {await browser.close(); await writeFile(`${output}/results.json`,JSON.stringify({results,errors,blocked},null,2));}
console.log(JSON.stringify({passed:results.length,errors,blocked}));
