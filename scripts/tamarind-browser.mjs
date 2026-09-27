import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const base=process.env.QA_BASE||'http://127.0.0.1:8967';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-27-tamarind-integration/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}); const results=[];
const allRows={"en": [["GLYLOID®2A", "Hot-water soluble. “Heat to a minimum of 80°C for at least 15 minutes.”[2]", "Can the process accommodate this preparation step? This is a hydration instruction, not a food-safety heat treatment."], ["GLYLOID®3S", "Cold-water-soluble grade for applications without a heating process.[2]", "Ask for preparation instructions, including mixing time and equipment, for the intended cold process."], ["Glyate®", "Cold-water soluble; “Low-viscosity grade.”[2]", "Establish whether the objective is thickening or another function. Cold solubility alone does not establish equivalent thickening."]], "zh": [["GLYLOID®2A", "热水溶解型；加热至至少 80°C，持续至少 15 分钟。[2]", "生产流程能否安排这一步？这是水化要求，不是食品安全意义上的杀菌参数。"], ["GLYLOID®3S", "冷水溶解型，面向不经过加热的应用。[2]", "索取适用于拟用冷配工艺的制备说明，包括搅拌时间和设备要求。"], ["Glyate®", "冷水溶解、低黏度型号。[2]", "明确主要目的是增稠还是其他功能；同样能冷溶，不代表增稠效果相同。"]]};
const allLabels={"en": ["Published grade", "Distributor's description", "What to check before sampling"], "zh": ["公开型号", "经销商的描述", "询样前先确认什么"]};
const settle=async page=>{let previous=-1,stable=0;for(let i=0;i<40;i++){await page.waitForTimeout(100);const y=await page.evaluate(()=>scrollY);if(Math.abs(y-previous)<.5)stable++;else stable=0;previous=y;if(stable>=4)return;}throw Error('scroll did not settle');};
try {
for(const width of [390,1440,320]) for(const lang of ['en','zh']) for(const js of [true,false]) {
 const rows=allRows[lang];
 const key=`${lang}-${width}-${js?'js':'nojs'}`, prefix=lang==='zh'?'/zh':'', path=`${prefix}/resources/blog/tamarind-grade-selection`;
 const c=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js});
 const page=await c.newPage();const errors=[],badResponses=[],nonGet=[]; const result={key,passed:false,citations:[],inbound:[],rows:[],errors,badResponses,nonGet};
 results.push(result);const save=()=>writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
 page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)badResponses.push([r.status(),r.url()]);});
 await c.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){nonGet.push(route.request().url());return route.abort();}return route.continue();});
 try{
  const response=await page.goto(base+path);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.tamarind-reader').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:`${out}/${key}-top.png`});
  const labels=allLabels[lang];
  assert.equal(await page.locator('.tamarind-table tbody tr').count(),3);
  for(let i=0;i<3;i++){
   const row=page.locator('.tamarind-table tbody tr').nth(i); const vals=await row.locator('.cell-value').allTextContents();const norm=s=>s.replace(/[‘’]/g,"'").replace(/[“”]/g,'"');assert.deepEqual(vals.map(norm),rows[i].map(norm));
   const cells=row.locator('th,td');const snapshots=[];
   for(let j=0;j<3;j++){const cell=cells.nth(j);const aria=await cell.ariaSnapshot();assert.ok(norm(aria).includes(norm(rows[i][j])),aria);if(width<641)assert.ok(aria.includes(labels[j]),aria);assert.ok(await cell.evaluate(e=>parseFloat(getComputedStyle(e).fontSize)>=16));snapshots.push(aria);}
   await row.evaluate(e=>window.scrollTo({top:scrollY+e.getBoundingClientRect().top-100,behavior:'instant'}));
   await page.waitForTimeout(100);const box=await row.boundingBox();assert.ok(box.x>=0&&box.x+box.width<=width+1);assert.ok(box.y>=65&&box.y+box.height<=1000);
   await page.screenshot({path:`${out}/${key}-row-${i+1}.png`});result.rows.push({values:vals,aria:snapshots,box});
  }
  if(width>640){assert.deepEqual(await page.locator('.tamarind-table thead th').allTextContents(),labels);await page.locator('.tamarind-table').evaluate(e=>window.scrollTo({top:scrollY+e.getBoundingClientRect().top-100,behavior:'instant'}));await page.screenshot({path:`${out}/${key}-table.png`});}
  for(const id of [1,2,3,6]){
   await page.goto(base+path);await page.evaluate(()=>document.fonts.ready);
   const link=page.locator(`.tamarind-reader a[href="#tamarind-ref-${id}"]`).first();await link.focus();await settle(page);await page.keyboard.press('Enter');await page.waitForURL(u=>u.hash===`#tamarind-ref-${id}`);await settle(page);
   const box=await page.locator(`#tamarind-ref-${id}`).boundingBox();const header=await page.locator('header').first().boundingBox();assert.ok(box.y>=header.y+header.height,JSON.stringify({box,header}));assert.ok(box.y+box.height<=1000);
   result.citations.push({id,box,header});await page.screenshot({path:`${out}/${key}-citation-${id}.png`});
  }
  for(const route of ['/resources/application-guides','/resources/research','/solutions/food']){
   await page.goto(base+prefix+route);await page.evaluate(()=>document.fonts.ready);const link=page.locator(`a[href="${path}"]`).first();await link.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await settle(page);await link.click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===path);assert.equal(await page.locator('.tamarind-table tbody tr').count(),3);result.inbound.push(route);
  }
  assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);assert.deepEqual(nonGet,[]); result.passed=true;save(); console.log('PASS',key);
 }catch(e){result.error=String(e);save();throw e;}finally{await c.close();}
}
}finally{await browser.close();}
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,citations:results.reduce((n,r)=>n+r.citations.length,0),inbound:results.reduce((n,r)=>n+r.inbound.length,0)}));
