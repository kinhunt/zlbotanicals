import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const base=process.env.QA_BASE||'http://127.0.0.1:9189';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-29-baobab-integration/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}); const results=[];
const tables={"en": [{"labels": ["Composite flour", "Water absorption (% b14)", "Stability (min)"], "rows": [["Wheat control", "59.1 ± 0.9 c", "8.82 ± 0.41 a"], ["5% flour substitution", "60.3 ± 0.7 c", "7.78 ± 0.52 a"], ["10% flour substitution", "62.4 ± 0.6 b", "5.35 ± 0.19 b"], ["15% flour substitution", "64.6 ± 0.5 a", "4.45 ± 0.67 c"]]}, {"labels": ["Sensory endpoint", "Wheat control", "5% substitution", "10% substitution", "15% substitution"], "rows": [["Overall acceptability, /100", "86.33 ± 3.41 a", "82.92 ± 1.76 a", "77.67 ± 1.61 b", "73.33 ± 2.82 b"], ["Tenderness, /10", "9.00 ± 0.30 a", "8.17 ± 0.33 b", "7.83 ± 0.30 b", "7.42 ± 0.34 b,c"], ["Crumb-cell uniformity, /10", "8.75 ± 0.33 a", "7.92 ± 0.28 b", "7.17 ± 0.30 c", "6.50 ± 0.37 d"]]}, {"labels": ["Sample", "Skim milk powder (g/100 g mix)", "Baobab pulp powder (g/100 g mix)"], "rows": [["IB-0", "4.8", "0"], ["IB-25", "3.6", "1.2"], ["IB-50", "2.4", "2.4"], ["IB-75", "1.2", "3.6"], ["IB-100", "0", "4.8"]]}], "zh": [{"labels": ["复合粉", "吸水率（% b14）", "稳定时间（min）"], "rows": [["小麦粉对照", "59.1 ± 0.9 c", "8.82 ± 0.41 a"], ["替换5%小麦粉", "60.3 ± 0.7 c", "7.78 ± 0.52 a"], ["替换10%小麦粉", "62.4 ± 0.6 b", "5.35 ± 0.19 b"], ["替换15%小麦粉", "64.6 ± 0.5 a", "4.45 ± 0.67 c"]]}, {"labels": ["感官指标", "小麦粉对照", "替换5%", "替换10%", "替换15%"], "rows": [["总体接受度，满分100", "86.33 ± 3.41 a", "82.92 ± 1.76 a", "77.67 ± 1.61 b", "73.33 ± 2.82 b"], ["嫩度，满分10", "9.00 ± 0.30 a", "8.17 ± 0.33 b", "7.83 ± 0.30 b", "7.42 ± 0.34 b,c"], ["内部气孔均匀性，满分10", "8.75 ± 0.33 a", "7.92 ± 0.28 b", "7.17 ± 0.30 c", "6.50 ± 0.37 d"]]}, {"labels": ["试验组", "脱脂乳粉（g/100 g混合料）", "猴面包树果肉粉（g/100 g混合料）"], "rows": [["IB-0", "4.8", "0"], ["IB-25", "3.6", "1.2"], ["IB-50", "2.4", "2.4"], ["IB-75", "1.2", "3.6"], ["IB-100", "0", "4.8"]]}]};
const settle=async page=>{let previous=-1,stable=0;for(let i=0;i<40;i++){await page.waitForTimeout(100);const y=await page.evaluate(()=>scrollY);if(Math.abs(y-previous)<.5)stable++;else stable=0;previous=y;if(stable>=4)return;}throw Error('scroll did not settle');};
try {
for(const width of [390,1440]) for(const lang of ['en','zh']) for(const js of [true,false]) {
 const expected=tables[lang];
 const key=`${lang}-${width}-${js?'js':'nojs'}`;if(process.env.QA_CASE && process.env.QA_CASE!==key)continue;const prefix=lang==='zh'?'/zh':'', path=`${prefix}/resources/blog/baobab-pulp-flour-milk-replacement`;
 const c=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js});
 const page=await c.newPage();const errors=[],badResponses=[],nonGet=[]; const result={key,passed:false,citations:[],inbound:[],rows:[],errors,badResponses,nonGet};
 results.push(result);const save=()=>writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
 page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)badResponses.push([r.status(),r.url()]);});
 await c.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){nonGet.push(route.request().url());return route.abort();}return route.continue();});
 try{
  const response=await page.goto(base+path);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.baobab-reader').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:`${out}/${key}-top.png`});
  assert.equal(await page.locator('.baobab-table-scroll').count(),3);
  for(let ti=0;ti<3;ti++) {
   const region=page.locator('.baobab-table-scroll').nth(ti), table=region.locator('table');
   assert.deepEqual(await table.locator('thead th').allTextContents(),expected[ti].labels);
   const rows=table.locator('tbody tr');
   for(let ri=0;ri<expected[ti].rows.length;ri++)assert.deepEqual(await rows.nth(ri).locator('th,td').allTextContents(),expected[ti].rows[ri]);
   await region.focus();assert.equal(await region.evaluate(e=>e===document.activeElement),true);
   await region.evaluate(e=>window.scrollTo({top:scrollY+e.getBoundingClientRect().top-110,behavior:'instant'}));
   await page.screenshot({path:`${out}/${key}-table-${ti+1}-left.png`});
   const aria=await table.ariaSnapshot();
   for(const row of expected[ti].rows)for(const cell of row)assert.ok(aria.includes(cell),cell);
   const extent=await region.evaluate(e=>e.scrollWidth-e.clientWidth);
   for(let k=0;k<Math.ceil(extent/20)+12;k++)await page.keyboard.press('ArrowRight');
   await page.waitForTimeout(300);
   const end=await region.evaluate(e=>({left:e.scrollLeft,extent:e.scrollWidth-e.clientWidth}));
   assert.ok(Math.abs(end.left-end.extent)<2,JSON.stringify(end));
   const last=await table.locator('thead th').last().boundingBox(), rb=await region.boundingBox();
   assert.ok(last.x>=rb.x-1 && last.x+last.width<=rb.x+rb.width+1);
   await page.screenshot({path:`${out}/${key}-table-${ti+1}-right.png`});
   for(let k=0;k<Math.ceil(extent/20)+12;k++)await page.keyboard.press('ArrowLeft');
   await page.waitForTimeout(300);assert.ok(await region.evaluate(e=>e.scrollLeft<2));
   result.rows.push({table:ti+1,aria,end,values:expected[ti].rows});
  }
  const citationHrefs=await page.locator('.baobab-reader a[href^="#baobab-ref-"]').evaluateAll(es=>es.map(e=>e.getAttribute('href')));
  for(let ci=0;ci<citationHrefs.length;ci++){const id=citationHrefs[ci].split('-').at(-1);
   await page.goto(base+path);await page.evaluate(()=>document.fonts.ready);
   const link=page.locator('.baobab-reader a[href^="#baobab-ref-"]').nth(ci);await link.focus();await settle(page);await page.keyboard.press('Enter');await page.waitForURL(u=>u.hash===`#baobab-ref-${id}`);await settle(page);
   const box=await page.locator(`#baobab-ref-${id}`).boundingBox();const header=await page.locator('header').first().boundingBox();assert.ok(box.y>=header.y+header.height,JSON.stringify({box,header}));assert.ok(box.y+box.height<=1000);
   result.citations.push({id,box,header});await page.screenshot({path:`${out}/${key}-citation-${ci+1}-${id}.png`});
  }
  for(const route of ['/resources/application-guides','/solutions/food']){
   await page.goto(base+prefix+route);await page.evaluate(()=>document.fonts.ready);const link=page.locator(`a[href="${path}"]`).first();await link.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await settle(page);await link.click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===path);assert.equal(await page.locator('.baobab-table-scroll').count(),3);result.inbound.push(route);
  }
  await page.goto(base+path);const canon=await page.locator('link[rel="canonical"]').getAttribute('href');assert.equal(canon,'https://zlbotanicals.com'+path);
  assert.equal(await page.locator('html').getAttribute('lang'),lang);
  const localHrefs=await page.locator('.baobab-reader a[href^="/"]').evaluateAll(es=>[...new Set(es.map(e=>e.getAttribute('href')))]);
  result.localLinks=[];
  for(const href of localHrefs){const response=await page.request.get(base+href);assert.equal(response.status(),200,href);result.localLinks.push(href);}
  for(const dest of ['/solutions/food','/contact']){await page.goto(base+path);const link=page.locator(`.prose a[href="${prefix+dest}"]`);await link.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await settle(page);await link.click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===prefix+dest);}
  await page.goto(base+path);const other=(lang==='en'?'/zh':'')+'/resources/blog/baobab-pulp-flour-milk-replacement';await page.locator(`article a[href="${other}"]`).click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===other);assert.equal(await page.locator('.baobab-table-scroll').count(),3);
  assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);assert.deepEqual(nonGet,[]); result.passed=true;save(); console.log('PASS',key);
 }catch(e){result.error=String(e);save();throw e;}finally{await c.close();}
}
}finally{await browser.close();}
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,citations:results.reduce((n,r)=>n+r.citations.length,0),inbound:results.reduce((n,r)=>n+r.inbound.length,0)}));
