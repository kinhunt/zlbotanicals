import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const base=process.env.QA_BASE||'http://127.0.0.1:8994';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-28-sunflower-release/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}); const results=[];
const tables={"en": [{"labels": ["Named material", "What the primary supplier page actually says", "What that tells a sample buyer"], "rows": [["Heliaflor 45", "Mechanically partially defatted, finely ground; minimum 45% protein on a dry-mass basis in the comparison table.[2]", "A candidate to examine when seed character and the remaining non-protein fraction can be part of the product concept."], ["Heliaflor 55", "Additional CO₂ extraction; minimum 55% protein on a dry-mass basis; process page describes a relatively neutral taste.[1][2]", "A distinct defatting option—not proof of complete solubility or low chlorogenic acid."], ["SUNBLOOM PRO", "Positioned for medium/high viscosity and emulsifying applications.[3]", "A supplier-positioned starting point for spreads, dressings and desserts."], ["SUNBLOOM BEV", "Described as finer, with a focus on low-viscosity mouthfeel and protein/fibre enrichment.[3]", "A reason to request beverage-relevant particle-size and sensory evidence, not to assume a clear solution."]]}, {"labels": ["Reported result", "Yellowish-protein emulsion, E-YSF", "Greenish-protein emulsion, E-GSF"], "rows": [["Volume–surface mean droplet diameter, D₃₂", "0.90 ± 0.01 µm, group d", "1.34 ± 0.02 µm, group c"], ["Apparent viscosity at 10 s⁻¹, measured at 25 °C", "29.6 ± 1.8 mPa·s, group e", "135.2 ± 12.6 mPa·s, group c"]]}], "zh": [{"labels": ["具体牌号", "原供应商页面提供的信息", "对选样的实际意义"], "rows": [["Heliaflor 45", "机械部分脱脂、细磨；比较表列蛋白质最低为干物质的 45%。[2]", "如果产品允许保留种子风味，并能利用蛋白之外的组分，可以纳入候选。"], ["Heliaflor 55", "额外 CO₂ 萃取；蛋白质最低为干物质的 55%；工艺页称其风味相对中性。[1][2]", "这是另一种脱脂选择，不等于完全水溶，也不等于低绿原酸。"], ["SUNBLOOM PRO", "供应商着重介绍中高黏度体系及乳化用途。[3]", "可作为涂抹酱、沙拉酱和甜品项目的选样起点。"], ["SUNBLOOM BEV", "页面称其更细，面向低黏度口感及蛋白、纤维强化。[3]", "值得进一步索取与饮料有关的粒度和感官资料，但不能据此认定其适合制成澄清饮料。"]]}, {"labels": ["指标", "偏黄色蛋白乳液 E-YSF", "偏绿色蛋白乳液 E-GSF"], "rows": [["体积–表面积平均液滴直径 D₃₂", "0.90 ± 0.01 µm，d 组", "1.34 ± 0.02 µm，c 组"], ["25 °C、剪切速率 10 s⁻¹ 下的表观黏度", "29.6 ± 1.8 mPa·s，e 组", "135.2 ± 12.6 mPa·s，c 组"]]}]};
const settle=async page=>{let previous=-1,stable=0;for(let i=0;i<40;i++){await page.waitForTimeout(100);const y=await page.evaluate(()=>scrollY);if(Math.abs(y-previous)<.5)stable++;else stable=0;previous=y;if(stable>=4)return;}throw Error('scroll did not settle');};
try {
for(const width of [390,1440,320]) for(const lang of ['en','zh']) for(const js of [true,false]) {
 const expected=tables[lang];
 const key=`${lang}-${width}-${js?'js':'nojs'}`, prefix=lang==='zh'?'/zh':'', path=`${prefix}/resources/blog/sunflower-protein-selection`;
 const c=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js});
 const page=await c.newPage();const errors=[],badResponses=[],nonGet=[]; const result={key,passed:false,citations:[],inbound:[],rows:[],errors,badResponses,nonGet};
 results.push(result);const save=()=>writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
 page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)badResponses.push([r.status(),r.url()]);});
 await c.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){nonGet.push(route.request().url());return route.abort();}return route.continue();});
 try{
  const response=await page.goto(base+path);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.sunflower-reader').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:`${out}/${key}-top.png`});
  assert.equal(await page.locator('.sunflower-table').count(),2);
  for(let t=0;t<2;t++) {
   const table=page.locator('.sunflower-table').nth(t), {labels,rows}=expected[t];
   assert.equal(await table.locator('tbody tr').count(),rows.length);
   for(let i=0;i<rows.length;i++) {
    const row=table.locator('tbody tr').nth(i);const vals=await row.locator('.cell-value').allTextContents();const norm=s=>s.replace(/[‘’]/g,"'").replace(/[“”]/g,'"');assert.deepEqual(vals.map(norm),rows[i].map(norm));
    const cells=row.locator('th,td');const snapshots=[];
    for(let j=0;j<labels.length;j++) {
     const cell=cells.nth(j),aria=await cell.ariaSnapshot();assert.ok(norm(aria).includes(norm(rows[i][j])),aria);if(width<641)assert.ok(aria.includes(labels[j]),aria);
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
  for(const id of [1,2,3,4]){
   await page.goto(base+path);await page.evaluate(()=>document.fonts.ready);
   const link=page.locator(`.sunflower-reader a[href="#sunflower-ref-${id}"]`).first();await link.focus();await settle(page);await page.keyboard.press('Enter');await page.waitForURL(u=>u.hash===`#sunflower-ref-${id}`);await settle(page);
   const box=await page.locator(`#sunflower-ref-${id}`).boundingBox();const header=await page.locator('header').first().boundingBox();assert.ok(box.y>=header.y+header.height,JSON.stringify({box,header}));assert.ok(box.y+box.height<=1000);
   result.citations.push({id,box,header});await page.screenshot({path:`${out}/${key}-citation-${id}.png`});
  }
  for(const route of ['/resources/application-guides','/resources/research','/resources/blog/fenugreek-flavour-processing']){
   await page.goto(base+prefix+route);await page.evaluate(()=>document.fonts.ready);const link=page.locator(`a[href="${path}"]`).first();await link.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await settle(page);await link.click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===path);assert.equal(await page.locator('.sunflower-table tbody tr').count(),6);result.inbound.push(route);
  }
  assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);assert.deepEqual(nonGet,[]); result.passed=true;save(); console.log('PASS',key);
 }catch(e){result.error=String(e);save();throw e;}finally{await c.close();}
}
}finally{await browser.close();}
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,citations:results.reduce((n,r)=>n+r.citations.length,0),inbound:results.reduce((n,r)=>n+r.inbound.length,0)}));
