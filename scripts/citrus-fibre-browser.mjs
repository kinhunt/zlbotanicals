import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const base=process.env.QA_BASE||'http://127.0.0.1:9142';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-28-citrus-fibre-release/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}); const results=[];
const tables={"en": [{"labels": ["Study material", "Insoluble dietary fibre, % dry matter", "Soluble dietary fibre, % dry matter"], "rows": [["CF AQ", "74.56 ± 0.34", "14.57 ± 0.83"], ["CF Cl", "39.80 ± 0.16", "23.30 ± 0.22"]]}, {"labels": ["Fibre in the study formula, %", "Pressure, bar", "Sedimentation, %", "Creaming index, %", "Viscosity, mPa·s"], "rows": [["0.100", "100", "17.96 ± 0.53", "59.15 ± 2.07", "77.99 ± 0.30"], ["0.100", "300", "3.96 ± 0.29", "29.31 ± 0.11", "94.36 ± 0.79"], ["0.400", "100", "0.00 ± 0.00", "0.00 ± 0.00", "161.10 ± 0.66"], ["0.400", "300", "0.75 ± 0.12", "2.46 ± 0.22", "201.60 ± 1.08"]]}, {"labels": ["Month", "Sedimentation, %", "Creaming index, %", "WHC, %", "Viscosity, mPa·s"], "rows": [["1", "nd", "nd", "95.80 ± 0.42a", "204.95 ± 6.29a"], ["2", "nd", "nd", "95.45 ± 0.49a", "213.45 ± 3.46a"], ["3", "nd", "nd", "94.80 ± 0.14a", "225.90 ± 4.53b"], ["4", "nd", "nd", "93.75 ± 1.06a", "238.43 ± 3.80bc"], ["5", "nd", "0.01 ± 0.0008a", "93.18 ± 0.32a", "244.38 ± 4.61c"], ["6", "nd", "0.01 ± 0.0011a", "92.85 ± 0.21a", "259.70 ± 3.11cd"], ["7", "nd", "0.02 ± 0.0016a", "91.03 ± 0.32a", "276.69 ± 3.44d"], ["8", "nd", "0.02 ± 0.0021a", "90.30 ± 0.14b", "290.08 ± 2.52e"], ["9", "nd", "0.03 ± 0.0016a", "89.65 ± 0.35b", "305.10 ± 6.08e"]]}], "zh": [{"labels": ["研究原料", "不溶性膳食纤维，占干物质%", "可溶性膳食纤维，占干物质%"], "rows": [["CF AQ", "74.56 ± 0.34", "14.57 ± 0.83"], ["CF Cl", "39.80 ± 0.16", "23.30 ± 0.22"]]}, {"labels": ["研究配方中的纤维添加量，%", "均质压力，bar", "沉降率，%", "上浮指数，%", "黏度，mPa·s"], "rows": [["0.100", "100", "17.96 ± 0.53", "59.15 ± 2.07", "77.99 ± 0.30"], ["0.100", "300", "3.96 ± 0.29", "29.31 ± 0.11", "94.36 ± 0.79"], ["0.400", "100", "0.00 ± 0.00", "0.00 ± 0.00", "161.10 ± 0.66"], ["0.400", "300", "0.75 ± 0.12", "2.46 ± 0.22", "201.60 ± 1.08"]]}, {"labels": ["月份", "沉降率，%", "上浮指数，%", "持水率，%", "黏度，mPa·s"], "rows": [["1", "nd", "nd", "95.80 ± 0.42a", "204.95 ± 6.29a"], ["2", "nd", "nd", "95.45 ± 0.49a", "213.45 ± 3.46a"], ["3", "nd", "nd", "94.80 ± 0.14a", "225.90 ± 4.53b"], ["4", "nd", "nd", "93.75 ± 1.06a", "238.43 ± 3.80bc"], ["5", "nd", "0.01 ± 0.0008a", "93.18 ± 0.32a", "244.38 ± 4.61c"], ["6", "nd", "0.01 ± 0.0011a", "92.85 ± 0.21a", "259.70 ± 3.11cd"], ["7", "nd", "0.02 ± 0.0016a", "91.03 ± 0.32a", "276.69 ± 3.44d"], ["8", "nd", "0.02 ± 0.0021a", "90.30 ± 0.14b", "290.08 ± 2.52e"], ["9", "nd", "0.03 ± 0.0016a", "89.65 ± 0.35b", "305.10 ± 6.08e"]]}]};
const settle=async page=>{let previous=-1,stable=0;for(let i=0;i<40;i++){await page.waitForTimeout(100);const y=await page.evaluate(()=>scrollY);if(Math.abs(y-previous)<.5)stable++;else stable=0;previous=y;if(stable>=4)return;}throw Error('scroll did not settle');};
try {
for(const width of [390,1440,320]) for(const lang of ['en','zh']) for(const js of [true,false]) {
 const expected=tables[lang];
 const key=`${lang}-${width}-${js?'js':'nojs'}`, prefix=lang==='zh'?'/zh':'', path=`${prefix}/resources/blog/citrus-fibre-grade-process`;
 const c=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js});
 const page=await c.newPage();const errors=[],badResponses=[],nonGet=[]; const result={key,passed:false,citations:[],inbound:[],rows:[],errors,badResponses,nonGet};
 results.push(result);const save=()=>writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
 page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)badResponses.push([r.status(),r.url()]);});
 await c.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){nonGet.push(route.request().url());return route.abort();}return route.continue();});
 try{
  const response=await page.goto(base+path);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.citrus-fibre-reader').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:`${out}/${key}-top.png`});
  assert.equal(await page.locator('.citrus-fibre-table').count(),3);
  for(let t=0;t<3;t++) {
   const table=page.locator('.citrus-fibre-table').nth(t), {labels,rows}=expected[t];
   assert.equal(await table.locator('tbody tr').count(),rows.length);
   for(let i=0;i<rows.length;i++) {
    const row=table.locator('tbody tr').nth(i);const vals=await row.locator('.cell-value').allTextContents();const norm=s=>s.replace(/[‘’]/g,"'").replace(/[“”]/g,'"');assert.deepEqual(vals.map(norm),rows[i].map(norm));
    const cells=row.locator('th,td');const snapshots=[];
    for(let j=0;j<labels.length;j++) {
     const cell=cells.nth(j),aria=await cell.ariaSnapshot();for(const token of rows[i][j].match(/nd|[0-9.]+|±|[a-e]+$/g)??[rows[i][j]])assert.ok(aria.includes(token),aria);if(width<641)assert.ok(aria.includes(labels[j]),aria);
     assert.ok(await cell.evaluate(e=>parseFloat(getComputedStyle(e).fontSize)>=16));snapshots.push(aria);
     await cell.evaluate(e=>window.scrollTo({top:scrollY+e.getBoundingClientRect().top-100,behavior:'instant'}));await page.waitForTimeout(100);
     const b=await cell.boundingBox();assert.ok(b.x>=0&&b.x+b.width<=width+1);assert.ok(b.y>=65&&b.y+b.height<=1000,JSON.stringify(b));
     await page.screenshot({path:`${out}/${key}-table-${t+1}-row-${i+1}-cell-${j+1}.png`});
    }
    await row.evaluate(e=>window.scrollTo({top:scrollY+e.getBoundingClientRect().top-100,behavior:'instant'}));await page.waitForTimeout(100);
    await row.screenshot({path:`${out}/${key}-table-${t+1}-row-${i+1}-full.png`});result.rows.push({table:t+1,values:vals,aria:snapshots});
   }
   await table.screenshot({path:`${out}/${key}-table-${t+1}-full.png`});
   if(width>640){assert.deepEqual(await table.locator('thead th').allTextContents(),labels);await table.evaluate(e=>window.scrollTo({top:scrollY+e.getBoundingClientRect().top-100,behavior:'instant'}));await page.screenshot({path:`${out}/${key}-table-${t+1}-viewport.png`});}
  }
  for(const id of ['S1','S2','S4']){
   await page.goto(base+path);await page.evaluate(()=>document.fonts.ready);
   const link=page.locator(`.citrus-fibre-reader a[href="#citrus-fibre-ref-${id}"]`).first();await link.focus();await settle(page);await page.keyboard.press('Enter');await page.waitForURL(u=>u.hash===`#citrus-fibre-ref-${id}`);await settle(page);
   const box=await page.locator(`#citrus-fibre-ref-${id}`).locator('..').boundingBox();const header=await page.locator('header').first().boundingBox();assert.ok(box.y>=header.y+header.height,JSON.stringify({box,header}));assert.ok(box.y+box.height<=1000);
   result.citations.push({id,box,header});await page.screenshot({path:`${out}/${key}-citation-${id}.png`});
  }
  for(const route of ['/resources/application-guides','/resources/research','/resources/blog/citrus-pectin-gel-selection']){
   await page.goto(base+prefix+route);await page.evaluate(()=>document.fonts.ready);const link=page.locator(`a[href="${path}"]`).first();await link.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await settle(page);await link.click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===path);assert.equal(await page.locator('.citrus-fibre-table tbody tr').count(),15);result.inbound.push(route);
  }
  assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);assert.deepEqual(nonGet,[]); result.passed=true;save(); console.log('PASS',key);
 }catch(e){result.error=String(e);save();throw e;}finally{await c.close();}
}
}finally{await browser.close();}
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,citations:results.reduce((n,r)=>n+r.citations.length,0),inbound:results.reduce((n,r)=>n+r.inbound.length,0)}));
