import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const base=process.env.QA_BASE||'http://127.0.0.1:8963';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-27-gardenia-integration/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}); const results=[];
const fixture=lang=>{const md=readFileSync(`docs/evidence/gardenia/reviewed/gardenia-blue.${lang}.md`,'utf8');const lines=md.split('\n').filter(l=>l.startsWith('|'));return {labels:lines[0].split('|').slice(1,-1).map(x=>x.trim()),rows:lines.slice(2).map(l=>l.split('|').slice(1,-1).map(x=>x.trim()))};};
const settle=async page=>{let previous=-1,stable=0;for(let i=0;i<40;i++){await page.waitForTimeout(100);const y=await page.evaluate(()=>scrollY);if(Math.abs(y-previous)<.5)stable++;else stable=0;previous=y;if(stable>=4)return;}throw Error('scroll did not settle');};
try {
for(const width of [390,1440,320]) for(const lang of ['en','zh']) for(const js of [true,false]) {
 const key=`${lang}-${width}-${js?'js':'nojs'}`, prefix=lang==='zh'?'/zh':'', path=`${prefix}/resources/blog/gardenia-blue-us-uses`;
 const c=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js});
 const page=await c.newPage();const errors=[],badResponses=[],nonGet=[]; const result={key,passed:false,citations:[],inbound:[],rows:[],errors,badResponses,nonGet};
 results.push(result);const save=()=>writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
 page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)badResponses.push([r.status(),r.url()]);});
 await c.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){nonGet.push(route.request().url());return route.abort();}return route.continue();});
 try{
  const response=await page.goto(base+path);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.gardenia-reader').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:`${out}/${key}-top.png`});
  const {labels,rows}=fixture(lang);
  assert.equal(await page.locator('.gardenia-table tbody tr').count(),4);
  for(let i=0;i<4;i++){
   const row=page.locator('.gardenia-table tbody tr').nth(i); const vals=await row.locator('.cell-value').allTextContents();assert.deepEqual(vals,rows[i]);
   const cells=row.locator('th,td');const snapshots=[];
   for(let j=0;j<3;j++){const cell=cells.nth(j);const aria=await cell.ariaSnapshot();assert.ok(aria.includes(rows[i][j]),aria);if(width<641)assert.ok(aria.includes(labels[j]),aria);assert.ok(await cell.evaluate(e=>parseFloat(getComputedStyle(e).fontSize)>=16));snapshots.push(aria);}
   await row.evaluate(e=>window.scrollTo({top:scrollY+e.getBoundingClientRect().top-100,behavior:'instant'}));
   await page.waitForTimeout(100);const box=await row.boundingBox();assert.ok(box.x>=0&&box.x+box.width<=width+1);assert.ok(box.y>=65);
   await page.screenshot({path:`${out}/${key}-row-${i+1}.png`});result.rows.push({values:vals,aria:snapshots,box});
   if(width<641) for(let j=0;j<3;j++){const cell=cells.nth(j);await cell.evaluate(e=>window.scrollTo({top:scrollY+e.getBoundingClientRect().top-100,behavior:'instant'}));const cb=await cell.boundingBox();assert.ok(cb.y>=65&&cb.y+cb.height<=1000);await page.screenshot({path:`${out}/${key}-row-${i+1}-cell-${j+1}.png`});}
  }
  if(width>640){assert.deepEqual(await page.locator('.gardenia-table thead th').allTextContents(),labels);await page.locator('.gardenia-table').evaluate(e=>window.scrollTo({top:scrollY+e.getBoundingClientRect().top-100,behavior:'instant'}));await page.screenshot({path:`${out}/${key}-table.png`});}
  for(const id of [1,2,3,4,5,6,7]){
   await page.goto(base+path);await page.evaluate(()=>document.fonts.ready);
   const link=page.locator(`.gardenia-reader a[href="#gardenia-ref-${id}"]`).first();await link.focus();await settle(page);await page.keyboard.press('Enter');await page.waitForURL(u=>u.hash===`#gardenia-ref-${id}`);await settle(page);
   const box=await page.locator(`#gardenia-ref-${id}`).boundingBox();const header=await page.locator('header').first().boundingBox();assert.ok(box.y>=header.y+header.height,JSON.stringify({box,header}));assert.ok(box.y+box.height<=1000);
   result.citations.push({id,box,header});await page.screenshot({path:`${out}/${key}-citation-${id}.png`});
  }
  for(const route of ['/resources/application-guides','/resources/research','/solutions/beverages']){
   await page.goto(base+prefix+route);await page.evaluate(()=>document.fonts.ready);const link=page.locator(`a[href="${path}"]`).first();await link.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await settle(page);await link.click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===path);assert.equal(await page.locator('.gardenia-table tbody tr').count(),4);result.inbound.push(route);
  }
  assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);assert.deepEqual(nonGet,[]); result.passed=true;save(); console.log('PASS',key);
 }catch(e){result.error=String(e);save();throw e;}finally{await c.close();}
}
}finally{await browser.close();}
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,citations:results.reduce((n,r)=>n+r.citations.length,0),inbound:results.reduce((n,r)=>n+r.inbound.length,0)}));
