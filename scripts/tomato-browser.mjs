import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const base=process.env.QA_BASE||'http://127.0.0.1:9174';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-28-final-tomato-integration/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}); const results=[];
const tables={"en": [{"labels": ["Serum-pectin property", "Break-65", "Break-90", "US-Break-22", "US-Break-65"], "rows": [["Pectin content, mg GalA/g serum", "14.65 ± 1.11 d", "22.85 ± 2.17 c", "26.37 ± 1.33 b", "31.50 ± 3.81 a"], ["Degree of methoxylation (DM), %", "20.89 ± 1.71 c", "36.63 ± 2.30 a", "19.53 ± 1.43 c", "27.75 ± 2.91 b"], ["Weight-average molecular weight (Mw), kDa", "67.27 ± 9.77 d", "161.23 ± 10.88 b", "74.09 ± 1.89 d", "131.38 ± 4.19 c"]]}], "zh": [{"labels": ["液相果胶指标", "Break-65", "Break-90", "US-Break-22", "US-Break-65"], "rows": [["果胶含量，mg GalA/g液相", "14.65 ± 1.11 d", "22.85 ± 2.17 c", "26.37 ± 1.33 b", "31.50 ± 3.81 a"], ["甲酯化度（DM），%", "20.89 ± 1.71 c", "36.63 ± 2.30 a", "19.53 ± 1.43 c", "27.75 ± 2.91 b"], ["重均分子量（Mw），kDa", "67.27 ± 9.77 d", "161.23 ± 10.88 b", "74.09 ± 1.89 d", "131.38 ± 4.19 c"]]}]};
const settle=async page=>{let previous=-1,stable=0;for(let i=0;i<40;i++){await page.waitForTimeout(100);const y=await page.evaluate(()=>scrollY);if(Math.abs(y-previous)<.5)stable++;else stable=0;previous=y;if(stable>=4)return;}throw Error('scroll did not settle');};
try {
for(const width of [390,1440,320]) for(const lang of ['en','zh']) for(const js of [true,false]) {
 const expected=tables[lang];
 const key=`${lang}-${width}-${js?'js':'nojs'}`;if(process.env.QA_CASE && process.env.QA_CASE!==key)continue;const prefix=lang==='zh'?'/zh':'', path=`${prefix}/resources/blog/tomato-powder-hot-cold-break`;
 const c=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js});
 const page=await c.newPage();const errors=[],badResponses=[],nonGet=[]; const result={key,passed:false,citations:[],inbound:[],rows:[],errors,badResponses,nonGet};
 results.push(result);const save=()=>writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
 page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)badResponses.push([r.status(),r.url()]);});
 await c.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){nonGet.push(route.request().url());return route.abort();}return route.continue();});
 try{
  const response=await page.goto(base+path);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.tomato-reader').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:`${out}/${key}-top.png`});
  assert.equal(await page.locator('.tomato-table').count(),1);
  for(let t=0;t<1;t++) {
   const table=page.locator('.tomato-table').nth(t), {labels,rows}=expected[t];
   assert.equal(await table.locator('tbody tr').count(),rows.length);
   for(let i=0;i<rows.length;i++) {
    const row=table.locator('tbody tr').nth(i);const vals=await row.locator('.cell-value').allTextContents();const norm=s=>s.replace(/[‘’]/g,"'").replace(/[“”]/g,'"');assert.deepEqual(vals.map(norm),rows[i].map(norm));
    const cells=row.locator('th,td');const snapshots=[];
    for(let j=0;j<labels.length;j++) {
     const cell=cells.nth(j),aria=await cell.ariaSnapshot();assert.ok(aria.includes(rows[i][j].slice(0,12)),aria);if(width<641)assert.ok(aria.includes(labels[j]),aria);
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
  const citationHrefs=['#tomato-ref-1','#tomato-ref-2'];
  for(let ci=0;ci<citationHrefs.length;ci++){const id=citationHrefs[ci].split('-').at(-1);
   await page.goto(base+path);await page.evaluate(()=>document.fonts.ready);
   const link=page.locator(`.tomato-reader a[href="#tomato-ref-${id}"]`).first();await link.focus();await settle(page);await page.keyboard.press('Enter');await page.waitForURL(u=>u.hash===`#tomato-ref-${id}`);await settle(page);
   const box=await page.locator(`#tomato-ref-${id}`).boundingBox();const header=await page.locator('header').first().boundingBox();assert.ok(box.y>=header.y+header.height,JSON.stringify({box,header}));assert.ok(box.y+box.height<=1000);
   result.citations.push({id,box,header});await page.screenshot({path:`${out}/${key}-citation-${ci+1}-${id}.png`});
  }
  for(const route of ['/resources/application-guides','/solutions/food']){
   await page.goto(base+prefix+route);await page.evaluate(()=>document.fonts.ready);const link=page.locator(`a[href="${path}"]`).first();await link.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await settle(page);await link.click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===path);assert.equal(await page.locator('.tomato-table tbody tr').count(),3);result.inbound.push(route);
  }
  await page.goto(base+path);const canon=await page.locator('link[rel="canonical"]').getAttribute('href');assert.equal(canon,'https://zlbotanicals.com'+path);
  assert.equal(await page.locator('html').getAttribute('lang'),lang);
  const localHrefs=await page.locator('.tomato-reader a[href^="/"]').evaluateAll(es=>[...new Set(es.map(e=>e.getAttribute('href')))]);
  result.localLinks=[];
  for(const href of localHrefs){const response=await page.request.get(base+href);assert.equal(response.status(),200,href);result.localLinks.push(href);}
  for(const dest of ['/solutions/food']){await page.goto(base+path);const link=page.locator(`.prose a[href="${prefix+dest}"]`);await link.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await settle(page);await link.click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===prefix+dest);}
  await page.goto(base+path);const other=(lang==='en'?'/zh':'')+'/resources/blog/tomato-powder-hot-cold-break';await page.locator(`article a[href="${other}"]`).click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===other);assert.equal(await page.locator('.tomato-table').count(),1);
  assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);assert.deepEqual(nonGet,[]); result.passed=true;save(); console.log('PASS',key);
 }catch(e){result.error=String(e);save();throw e;}finally{await c.close();}
}
}finally{await browser.close();}
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,citations:results.reduce((n,r)=>n+r.citations.length,0),inbound:results.reduce((n,r)=>n+r.inbound.length,0)}));
