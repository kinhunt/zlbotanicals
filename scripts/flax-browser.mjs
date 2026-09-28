import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const base=process.env.QA_BASE||'http://127.0.0.1:8993';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-28-flax-release/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}); const results=[];
const tables={"en": [{"labels": ["Material in the experiment", "Total cyanogenic glycosides, μmol/g of that material", "Calculated HCN equivalent, mg/kg of that material"], "rows": [["Defatted starting meals, three varieties", "9.11–11.59", "246–313"], ["Dried aqueous extracts", "0.56–0.62", "15–17"], ["Dried ethanolic extracts", "71.25–89.83", "1926–2428"]]}], "zh": [{"labels": ["实验中的物料", "该物料的生氰糖苷总量，μmol/g", "该物料的计算 HCN 当量，mg/kg"], "rows": [["三个品种的脱脂起始粉体", "9.11–11.59", "246–313"], ["干燥水提物", "0.56–0.62", "15–17"], ["干燥乙醇提取物", "71.25–89.83", "1926–2428"]]}]};
const settle=async page=>{let previous=-1,stable=0;for(let i=0;i<40;i++){await page.waitForTimeout(100);const y=await page.evaluate(()=>scrollY);if(Math.abs(y-previous)<.5)stable++;else stable=0;previous=y;if(stable>=4)return;}throw Error('scroll did not settle');};
try {
for(const width of [390,1440,320]) for(const lang of ['en','zh']) for(const js of [true,false]) {
 const expected=tables[lang];
 const key=`${lang}-${width}-${js?'js':'nojs'}`, prefix=lang==='zh'?'/zh':'', path=`${prefix}/resources/blog/flax-cyanogenic-material-selection`;
 const c=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js});
 const page=await c.newPage();const errors=[],badResponses=[],nonGet=[]; const result={key,passed:false,citations:[],inbound:[],rows:[],errors,badResponses,nonGet};
 results.push(result);const save=()=>writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
 page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)badResponses.push([r.status(),r.url()]);});
 await c.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){nonGet.push(route.request().url());return route.abort();}return route.continue();});
 try{
  const response=await page.goto(base+path);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.flax-reader').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:`${out}/${key}-top.png`});
  assert.equal(await page.locator('.flax-table').count(),1);
  for(let t=0;t<1;t++) {
   const table=page.locator('.flax-table').nth(t), {labels,rows}=expected[t];
   assert.equal(await table.locator('tbody tr').count(),rows.length);
   for(let i=0;i<rows.length;i++) {
    const row=table.locator('tbody tr').nth(i);const vals=await row.locator('.cell-value').allTextContents();const norm=s=>s.replace(/[‘’]/g,"'").replace(/[“”]/g,'"');assert.deepEqual(vals.map(norm),rows[i].map(norm));
    const cells=row.locator('th,td');const snapshots=[];
    for(let j=0;j<labels.length;j++) {
     const cell=cells.nth(j),aria=await cell.ariaSnapshot();assert.ok(norm(aria).includes(norm(rows[i][j])),aria);if(width<641)assert.ok(aria.includes(labels[j]),aria);
     assert.ok(await cell.evaluate(e=>parseFloat(getComputedStyle(e).fontSize)>=16));snapshots.push(aria);
     await cell.evaluate(e=>window.scrollTo({top:scrollY+e.getBoundingClientRect().top-100,behavior:'instant'}));await page.waitForTimeout(100);
     const b=await cell.boundingBox();assert.ok(b.x>=0&&b.x+b.width<=width+1);assert.ok(b.y>=65&&b.y+b.height<=1000,JSON.stringify(b));
     if(width<641)await page.screenshot({path:`${out}/${key}-table-${t+1}-row-${i+1}-cell-${j+1}.png`});
    }
    await row.evaluate(e=>window.scrollTo({top:scrollY+e.getBoundingClientRect().top-100,behavior:'instant'}));await page.waitForTimeout(100);
    await row.screenshot({path:`${out}/${key}-table-${t+1}-row-${i+1}-full.png`});result.rows.push({table:t+1,values:vals,aria:snapshots});
   }
   await table.screenshot({path:`${out}/${key}-table-${t+1}-full.png`});
   if(width>640){assert.deepEqual(await table.locator('thead th').allTextContents(),labels);await table.evaluate(e=>window.scrollTo({top:scrollY+e.getBoundingClientRect().top-100,behavior:'instant'}));await page.screenshot({path:`${out}/${key}-table-${t+1}-viewport.png`});}
  }
  for(const id of [1,2,4,5,6]){
   await page.goto(base+path);await page.evaluate(()=>document.fonts.ready);
   const link=page.locator(`.flax-reader a[href="#flax-ref-${id}"]`).first();await link.focus();await settle(page);await page.keyboard.press('Enter');await page.waitForURL(u=>u.hash===`#flax-ref-${id}`);await settle(page);
   const box=await page.locator(`#flax-ref-${id}`).boundingBox();const header=await page.locator('header').first().boundingBox();assert.ok(box.y>=header.y+header.height,JSON.stringify({box,header}));assert.ok(box.y+box.height<=1000);
   result.citations.push({id,box,header});await page.screenshot({path:`${out}/${key}-citation-${id}.png`});
  }
  for(const route of ['/resources/application-guides','/resources/research','/resources/blog/psyllium-gluten-free-bread-water']){
   await page.goto(base+prefix+route);await page.evaluate(()=>document.fonts.ready);const link=page.locator(`a[href="${path}"]`).first();await link.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await settle(page);await link.click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===path);assert.equal(await page.locator('.flax-table tbody tr').count(),3);result.inbound.push(route);
  }
  assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);assert.deepEqual(nonGet,[]); result.passed=true;save(); console.log('PASS',key);
 }catch(e){result.error=String(e);save();throw e;}finally{await c.close();}
}
}finally{await browser.close();}
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,citations:results.reduce((n,r)=>n+r.citations.length,0),inbound:results.reduce((n,r)=>n+r.inbound.length,0)}));
