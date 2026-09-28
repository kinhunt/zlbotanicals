import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const base=process.env.QA_BASE||'http://127.0.0.1:8977';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-28-psyllium-release/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}); const results=[];
const tables={"en": [{"labels": ["Product listing", "Material wording in the captured record", "What it resolves—and what it leaves open"], "rows": [["NOW Whole Psyllium Husks, B000N7DP6G", "The title says “Whole Psyllium Husks”; the Item Form attribute says “Powder”, and a bullet refers to “psyllium husk powder”.", "The record contains inconsistent form wording. It cannot establish that whole husks and milled powder are physically equivalent.[4]"], ["NOW Psyllium Husk Powder, B007729DSE", "The title says “Psyllium Husk Powder”; Item Form is “Powder”. Its directions and fibre-related bullet wording also appear in the whole-husk record.", "The shared wording does not establish equal spoon weights or a baking substitution ratio.[5]"], ["Anthony’s Psyllium Husk Powder, B06XXN9CTG", "The title says “Finely Ground”; a bullet suggests adding the powder to water or smoothies.", "“Finely ground” communicates a form preference but provides no measured sieve distribution in the captured text.[6]"]]}, {"labels": ["Study formulation", "Psyllium, g per 100 g flour/starch base", "Added water, g on the same basis", "Fresh specific volume, cm³/g", "Fresh crumb firmness, N"], "rows": [["No-psyllium control", "0", "100.00", "1.41 ± 0.02", "24.72 ± 2.10"], ["Lower-psyllium formulation", "2.86", "82.14", "2.15 ± 0.12", "8.27 ± 0.89"], ["Intermediate formulation", "7.14", "91.10", "2.06 ± 0.04", "8.33 ± 0.71"], ["Higher-psyllium formulation", "17.14", "117.86", "2.08 ± 0.05", "6.12 ± 0.58"]]}], "zh": [{"labels": ["商品", "记录中的原料描述", "对选料有什么启示"], "rows": [["NOW Whole Psyllium Husks，B000N7DP6G", "标题写“Whole Psyllium Husks”（完整洋车前子壳），Item Form属性却是“Powder”，一条卖点也用了“psyllium husk powder”。", "同一记录的形态表述并不一致，不能据此认定完整种壳与磨粉后的壳粉在实物上相同。[4]"], ["NOW Psyllium Husk Powder，B007729DSE", "标题明确写壳粉，Item Form也是“Powder”；食用方法和纤维相关卖点的文字，在完整种壳记录中也出现了。", "相同文案不能证明一勺的质量相同，更不能直接给出烘焙替换比例。[5]"], ["Anthony’s Psyllium Husk Powder，B06XXN9CTG", "标题写“Finely Ground”（细磨），卖点建议加入水或冰沙。", "“细磨”传达了产品形态，但所取文字没有给出实测筛分分布。[6]"]]}, {"labels": ["研究配方", "壳粉，克/100克粉料基底", "同一基准下的加水量，克", "新鲜面包比容，cm³/g", "新鲜面包芯硬度，N"], "rows": [["不加壳粉的对照", "0", "100.00", "1.41 ± 0.02", "24.72 ± 2.10"], ["较低添加组", "2.86", "82.14", "2.15 ± 0.12", "8.27 ± 0.89"], ["中间添加组", "7.14", "91.10", "2.06 ± 0.04", "8.33 ± 0.71"], ["较高添加组", "17.14", "117.86", "2.08 ± 0.05", "6.12 ± 0.58"]]}]};
const settle=async page=>{let previous=-1,stable=0;for(let i=0;i<40;i++){await page.waitForTimeout(100);const y=await page.evaluate(()=>scrollY);if(Math.abs(y-previous)<.5)stable++;else stable=0;previous=y;if(stable>=4)return;}throw Error('scroll did not settle');};
try {
for(const width of [390,1440,320]) for(const lang of ['en','zh']) for(const js of [true,false]) {
 const expected=tables[lang];
 const key=`${lang}-${width}-${js?'js':'nojs'}`, prefix=lang==='zh'?'/zh':'', path=`${prefix}/resources/blog/psyllium-gluten-free-bread-water`;
 const c=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js});
 const page=await c.newPage();const errors=[],badResponses=[],nonGet=[]; const result={key,passed:false,citations:[],inbound:[],rows:[],errors,badResponses,nonGet};
 results.push(result);const save=()=>writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
 page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)badResponses.push([r.status(),r.url()]);});
 await c.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){nonGet.push(route.request().url());return route.abort();}return route.continue();});
 try{
  const response=await page.goto(base+path);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.psyllium-reader').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:`${out}/${key}-top.png`});
  assert.equal(await page.locator('.psyllium-table').count(),2);
  for(let t=0;t<2;t++) {
   const table=page.locator('.psyllium-table').nth(t), {labels,rows}=expected[t];
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
  for(const id of [1,2,3,4,5,6]){
   await page.goto(base+path);await page.evaluate(()=>document.fonts.ready);
   const link=page.locator(`.psyllium-reader a[href="#psyllium-ref-${id}"]`).first();await link.focus();await settle(page);await page.keyboard.press('Enter');await page.waitForURL(u=>u.hash===`#psyllium-ref-${id}`);await settle(page);
   const box=await page.locator(`#psyllium-ref-${id}`).boundingBox();const header=await page.locator('header').first().boundingBox();assert.ok(box.y>=header.y+header.height,JSON.stringify({box,header}));assert.ok(box.y+box.height<=1000);
   result.citations.push({id,box,header});await page.screenshot({path:`${out}/${key}-citation-${id}.png`});
  }
  for(const route of ['/resources/application-guides','/resources/research','/solutions/food']){
   await page.goto(base+prefix+route);await page.evaluate(()=>document.fonts.ready);const link=page.locator(`a[href="${path}"]`).first();await link.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await settle(page);await link.click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===path);assert.equal(await page.locator('.psyllium-table tbody tr').count(),7);result.inbound.push(route);
  }
  assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);assert.deepEqual(nonGet,[]); result.passed=true;save(); console.log('PASS',key);
 }catch(e){result.error=String(e);save();throw e;}finally{await c.close();}
}
}finally{await browser.close();}
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,citations:results.reduce((n,r)=>n+r.citations.length,0),inbound:results.reduce((n,r)=>n+r.inbound.length,0)}));
