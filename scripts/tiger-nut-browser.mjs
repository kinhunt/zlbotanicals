import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const base=process.env.QA_BASE||'http://127.0.0.1:9168';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-28-late-tigernut-integration/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}); const results=[];
const tables={"en": [{"labels": ["Candidate route", "What the available evidence actually describes", "What to resolve before comparing cultures"], "rows": [["Pressed and screened tiger nut base", "The material used in the fermentation paper; a processed beverage rather than a whole-flour suspension.[1]", "Extraction yield, retained solids, added ingredients and the exact heat history of the delivered base."], ["Extra-fine tiger nut flour", "Tigernuts Traders describes its milling technique and work to meet customers’ technical specifications.[5]", "Particle-size distribution, dispersion, sediment, and whether the customer will retain or remove insoluble material. “Fine” does not establish dissolution or fermentation performance."], ["Defatted tiger nut flour", "Tigernuts Traders’ catalogue lists 9.1 g fat and 25 g fibre per 100 g for its Defatted Tigernuts Flour.[6]", "Whether this ingredient, marketed as defatted and containing fibre, fits the intended drink, and how much of that composition remains after processing. These catalogue figures are not batch results or finished-drink nutrition."]]}, {"labels": ["Starter", "No glucose added", "7.5 g glucose/100 mL", "15 g glucose/100 mL"], "rows": [["VEGE022", "3.70 ± 0.10", "4.25 ± 0.15", "4.50 ± 0.30"], ["VEGE033", "4.45 ± 0.35", "4.50 ± 0", "2.50 ± 0.015"], ["VEGE053", "2.06 ± 0.255", "2.15 ± 0.165", "2.35 ± 0.385"], ["VEGE061", "3.95 ± 1.65", "3.15 ± 0.15", "6.30 ± 1.10"]]}], "zh": [{"labels": ["候选路线", "现有资料实际描述了什么", "比较菌种前应先明确什么"], "rows": [["压榨、筛滤的油莎豆基底", "这是发酵论文使用的材料，是加工后的饮料，不是全粉悬浮液。[1]", "提取收率、保留固形物、额外添加物，以及交付基底的完整热处理历史。"], ["超细油莎豆粉", "Tigernuts Traders介绍了自有研磨技术，以及按客户技术规格开展调整的做法。[5]", "粒径分布、分散与沉降情况，以及客户后续是否去除不溶物。“细”不等于已证明可溶，也不等于已验证发酵表现。"], ["脱脂油莎豆粉", "Tigernuts Traders目录中，Defatted Tigernuts Flour每100 g标示脂肪9.1 g、膳食纤维25 g。[6]", "这种标称脱脂、含有膳食纤维的原料是否适合目标饮料，以及加工后各成分实际保留多少。目录值不是批次实测，也不是成品营养值。"]]}, {"labels": ["发酵剂", "不额外添加葡萄糖", "葡萄糖7.5 g/100 mL", "葡萄糖15 g/100 mL"], "rows": [["VEGE022", "3.70 ± 0.10", "4.25 ± 0.15", "4.50 ± 0.30"], ["VEGE033", "4.45 ± 0.35", "4.50 ± 0", "2.50 ± 0.015"], ["VEGE053", "2.06 ± 0.255", "2.15 ± 0.165", "2.35 ± 0.385"], ["VEGE061", "3.95 ± 1.65", "3.15 ± 0.15", "6.30 ± 1.10"]]}]};
const settle=async page=>{let previous=-1,stable=0;for(let i=0;i<40;i++){await page.waitForTimeout(100);const y=await page.evaluate(()=>scrollY);if(Math.abs(y-previous)<.5)stable++;else stable=0;previous=y;if(stable>=4)return;}throw Error('scroll did not settle');};
try {
for(const width of [390,1440,320]) for(const lang of ['en','zh']) for(const js of [true,false]) {
 const expected=tables[lang];
 const key=`${lang}-${width}-${js?'js':'nojs'}`;if(process.env.QA_CASE && process.env.QA_CASE!==key)continue;const prefix=lang==='zh'?'/zh':'', path=`${prefix}/resources/blog/tiger-nut-fermented-drinks`;
 const c=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js});
 const page=await c.newPage();const errors=[],badResponses=[],nonGet=[]; const result={key,passed:false,citations:[],inbound:[],rows:[],errors,badResponses,nonGet};
 results.push(result);const save=()=>writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
 page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)badResponses.push([r.status(),r.url()]);});
 await c.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){nonGet.push(route.request().url());return route.abort();}return route.continue();});
 try{
  const response=await page.goto(base+path);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.tiger-nut-reader').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:`${out}/${key}-top.png`});
  assert.equal(await page.locator('.tiger-nut-table').count(),2);
  for(let t=0;t<2;t++) {
   const table=page.locator('.tiger-nut-table').nth(t), {labels,rows}=expected[t];
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
  const citationHrefs=await page.locator('.tiger-nut-reader a[href^="#tiger-nut-ref-"]').evaluateAll(es=>es.map(e=>e.getAttribute('href')));
  for(let ci=0;ci<citationHrefs.length;ci++){const id=citationHrefs[ci].split('-').at(-1);
   await page.goto(base+path);await page.evaluate(()=>document.fonts.ready);
   const link=page.locator('.tiger-nut-reader a[href^="#tiger-nut-ref-"]').nth(ci);await link.focus();await settle(page);await page.keyboard.press('Enter');await page.waitForURL(u=>u.hash===`#tiger-nut-ref-${id}`);await settle(page);
   const box=await page.locator(`#tiger-nut-ref-${id}`).boundingBox();const header=await page.locator('header').first().boundingBox();assert.ok(box.y>=header.y+header.height,JSON.stringify({box,header}));assert.ok(box.y+box.height<=1000);
   result.citations.push({id,box,header});await page.screenshot({path:`${out}/${key}-citation-${ci+1}-${id}.png`});
  }
  for(const route of ['/resources/application-guides','/resources/blog/oat-beta-glucan-material-selection']){
   await page.goto(base+prefix+route);await page.evaluate(()=>document.fonts.ready);const link=page.locator(`a[href="${path}"]`).first();await link.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await settle(page);await link.click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===path);assert.equal(await page.locator('.tiger-nut-table tbody tr').count(),7);result.inbound.push(route);
  }
  await page.goto(base+path);const canon=await page.locator('link[rel="canonical"]').getAttribute('href');assert.equal(canon,'https://zlbotanicals.com'+path);
  assert.equal(await page.locator('html').getAttribute('lang'),lang);
  const localHrefs=await page.locator('.tiger-nut-reader a[href^="/"]').evaluateAll(es=>[...new Set(es.map(e=>e.getAttribute('href')))]);
  result.localLinks=[];
  for(const href of localHrefs){const response=await page.request.get(base+href);assert.equal(response.status(),200,href);result.localLinks.push(href);}
  for(const dest of ['/solutions/beverages','/request-quote']){await page.goto(base+path);const link=page.locator(`.prose a[href="${prefix+dest}"]`);await link.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await settle(page);await link.click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===prefix+dest);}
  await page.goto(base+path);const other=(lang==='en'?'/zh':'')+'/resources/blog/tiger-nut-fermented-drinks';await page.locator(`article a[href="${other}"]`).click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===other);assert.equal(await page.locator('.tiger-nut-table').count(),2);
  assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);assert.deepEqual(nonGet,[]); result.passed=true;save(); console.log('PASS',key);
 }catch(e){result.error=String(e);save();throw e;}finally{await c.close();}
}
}finally{await browser.close();}
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,citations:results.reduce((n,r)=>n+r.citations.length,0),inbound:results.reduce((n,r)=>n+r.inbound.length,0)}));
