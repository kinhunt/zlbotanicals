import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const base=process.env.QA_BASE||'http://127.0.0.1:8947';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-27-clove-integration/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}); const results=[];
const rows=[['0:100','0.29 ± 0.02','10.1 ± 0.40 a'],['50:50','0.26 ± 0.03','9.10 ± 0.26 a'],['62.5:37.5','0.24 ± 0.03','7.17 ± 0.36 b'],['75:25','0.23 ± 0.01','6.67 ± 0.47 b'],['87.5:12.5','0.28 ± 0.02','6.74 ± 0.45 b'],['100:0','0.28 ± 0.03','6.70 ± 0.36 b']];
const settle=async page=>{let previous=-1,stable=0;for(let i=0;i<40;i++){await page.waitForTimeout(100);const y=await page.evaluate(()=>scrollY);if(Math.abs(y-previous)<.5)stable++;else stable=0;previous=y;if(stable>=4)return;}throw Error('scroll did not settle');};
try {
for(const width of [390,1440,320]) for(const lang of ['en','zh']) for(const js of [true,false]) {
 const key=`${lang}-${width}-${js?'js':'nojs'}`, prefix=lang==='zh'?'/zh':'', path=`${prefix}/resources/blog/clove-powder-humidity`;
 const c=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js});
 const page=await c.newPage();const errors=[],badResponses=[],nonGet=[]; const result={key,passed:false,citations:[],inbound:[],rows:[],errors,badResponses,nonGet};
 results.push(result);const save=()=>writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
 page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)badResponses.push([r.status(),r.url()]);});
 await c.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){nonGet.push(route.request().url());return route.abort();}return route.continue();});
 try{
  const response=await page.goto(base+path);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.clove-reader').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:`${out}/${key}-top.png`});
  const labels=lang==='en'?['Carrier blend, MD:GA','Initial water activity','Reported hygroscopicity, %']:['载体配比，MD:GA','初始水分活度','论文报告的吸湿性，%'];
  assert.equal(await page.locator('.clove-table tbody tr').count(),6);
  for(let i=0;i<6;i++){
   const row=page.locator('.clove-table tbody tr').nth(i); const vals=await row.locator('.cell-value').allTextContents();assert.deepEqual(vals,rows[i]);
   const cells=row.locator('th,td');const snapshots=[];
   for(let j=0;j<3;j++){const cell=cells.nth(j);const aria=await cell.ariaSnapshot();assert.ok(aria.includes(rows[i][j]),aria);if(width<641)assert.ok(aria.includes(labels[j]),aria);assert.ok(await cell.evaluate(e=>parseFloat(getComputedStyle(e).fontSize)>=16));snapshots.push(aria);}
   await row.evaluate(e=>window.scrollTo({top:scrollY+e.getBoundingClientRect().top-100,behavior:'instant'}));
   await page.waitForTimeout(100);const box=await row.boundingBox();assert.ok(box.x>=0&&box.x+box.width<=width+1);assert.ok(box.y>=65&&box.y+box.height<=1000);
   await page.screenshot({path:`${out}/${key}-row-${i+1}.png`});result.rows.push({values:vals,aria:snapshots,box});
  }
  if(width>640){assert.deepEqual(await page.locator('.clove-table thead th').allTextContents(),labels);await page.locator('.clove-table').evaluate(e=>window.scrollTo({top:scrollY+e.getBoundingClientRect().top-100,behavior:'instant'}));await page.screenshot({path:`${out}/${key}-table.png`});}
  for(const id of [1,2,3]){
   await page.goto(base+path);await page.evaluate(()=>document.fonts.ready);
   const link=page.locator(`.clove-reader a[href="#clove-ref-${id}"]`).first();await link.focus();await settle(page);await page.keyboard.press('Enter');await page.waitForURL(u=>u.hash===`#clove-ref-${id}`);await settle(page);
   const box=await page.locator(`#clove-ref-${id}`).boundingBox();const header=await page.locator('header').first().boundingBox();assert.ok(box.y>=header.y+header.height,JSON.stringify({box,header}));assert.ok(box.y+box.height<=1000);
   result.citations.push({id,box,header});await page.screenshot({path:`${out}/${key}-citation-${id}.png`});
  }
  for(const route of ['/resources/application-guides','/resources/research','/plant-extracts/standards/moisture-vs-loss-on-drying']){
   await page.goto(base+prefix+route);await page.evaluate(()=>document.fonts.ready);const link=page.locator(`a[href="${path}"]`).first();await link.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await settle(page);await link.click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===path);assert.equal(await page.locator('.clove-table tbody tr').count(),6);result.inbound.push(route);
  }
  assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);assert.deepEqual(nonGet,[]); result.passed=true;save(); console.log('PASS',key);
 }catch(e){result.error=String(e);save();throw e;}finally{await c.close();}
}
}finally{await browser.close();}
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,citations:results.reduce((n,r)=>n+r.citations.length,0),inbound:results.reduce((n,r)=>n+r.inbound.length,0)}));
