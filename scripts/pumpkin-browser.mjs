import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const base=process.env.QA_BASE||'http://127.0.0.1:8996';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-28-pumpkin-release/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}); const results=[];
const tables={"en": [{"labels": ["Detail-page example", "What the captured listing emphasizes", "What a developer can learn from it"], "rows": [["Sprout Living, B01N7CLYX7", "Cold-pressed pumpkin seeds; 20 grams of protein per serving; unflavored powder", "Processing provenance and a recognizable protein-serving proposition lead the offer.[1]"], ["Anthony’s, B0CWVTCT7G", "No added sweeteners or fillers; smoothies, baked goods, water or milk", "The powder is positioned as an ingredient the buyer can fit into an existing recipe or routine.[2]"], ["Micro Ingredients, B0FWJGBPWM", "Single-ingredient and raw wording; finely milled powder; 18 grams of protein per serving; smoothies, baking, oatmeal and coffee", "Texture language and a wider set of everyday uses carry the proposition.[3]"]]}, {"labels": ["Seller-label field", "Sprout Living", "Anthony’s", "Micro Ingredients"], "rows": [["Front net weight", "1 lb (454 g)", "1 lb (454 g)", "2 lb (907 g)"], ["Serving size", "2 scoops (32.5 g)", "1 Tbsp (8 g)", "2 scoops (30 g approx.)"], ["Protein per labeled serving", "20 g", "5 g", "18 g"], ["Servings on nutrition panel", "About 14", "56", "30"], ["Listed ingredient", "Organic Pressed Pumpkin Seed Powder", "Organic Toasted Pumpkin Seeds", "Organic Pumpkin Seed Protein Powder"]]}, {"labels": ["Supplier-declared field", "Organic Unroasted Pumpkin Protein Concentrate 60", "Organic Roasted Pumpkin Protein Concentrate 60"], "rows": [["Named seed material", "Shine skin pumpkin, Cucurbita moschata", "Austrian Styrian pumpkin, Cucurbita pepo var. styriaca"], ["Protein", "≥60%", "≥57%"], ["Moisture", "≤10%", "≤8%"], ["Fat", "≤10%", "≤17%"], ["Described sensory direction", "Mild flavor", "Distinctive roasted, nutty flavor; olive-green to brown powder"]]}, {"labels": ["Treatment", "Solubility (%) at pH 5", "At pH 7 (%)", "At pH 9 (%)"], "rows": [["Alkaline extraction control", "2.42 ± 0.06 a", "15.17 ± 0.20 a", "37.82 ± 1.07 a"], ["Ultrasound during alkaline extraction, UAE", "6.59 ± 0.99 d", "18.80 ± 0.52 b", "46.87 ± 0.17 c"], ["Ultrasound after alkaline extraction, AE+US", "4.90 ± 0.05 c", "23.07 ± 0.06 c", "46.93 ± 0.61 c"]]}], "zh": [{"labels": ["商品样本", "页面着重表达的内容", "对产品定位的启发"], "rows": [["Sprout Living，B01N7CLYX7", "冷压南瓜籽、每份20克蛋白质、无调味", "用加工方式和明确的每份蛋白质数字，让消费者迅速理解产品用途。[1]"], ["Anthony’s，B0CWVTCT7G", "不添加甜味剂或填充料，可加入奶昔、烘焙食品、水或牛奶", "把产品当作一种可自由搭配的厨房原料，风味和吃法留给使用者决定。[2]"], ["Micro Ingredients，B0FWJGBPWM", "单一原料、生原料、细磨，每份18克蛋白质；列出奶昔、烘焙、燕麦和咖啡等用途", "借助口感描述和更多日常场景，让蛋白粉不只出现在运动后的饮品里。[3]"]]}, {"labels": ["卖家标签项目", "Sprout Living", "Anthony’s", "Micro Ingredients"], "rows": [["正面净含量", "1 lb（454克）", "1 lb（454克）", "2 lb（907克）"], ["每份用量", "2勺（32.5克）", "1汤匙（8克）", "2勺（约30克）"], ["标签所列每份蛋白质", "20克", "5克", "18克"], ["营养标签所列每袋份数", "约14份", "56份", "30份"], ["配料原文", "Organic Pressed Pumpkin Seed Powder", "Organic Toasted Pumpkin Seeds", "Organic Pumpkin Seed Protein Powder"]]}, {"labels": ["供应商公开项目", "Organic Unroasted Pumpkin Protein Concentrate 60（未烘烤款）", "Organic Roasted Pumpkin Protein Concentrate 60（烘烤款）"], "rows": [["所述种籽", "Shine skin pumpkin，Cucurbita moschata", "奥地利施蒂利亚南瓜，Cucurbita pepo var. styriaca"], ["蛋白质", "≥60%", "≥57%"], ["水分", "≤10%", "≤8%"], ["脂肪", "≤10%", "≤17%"], ["所述风味、外观", "风味温和", "有烘烤形成的坚果风味，粉末为橄榄绿至棕色"]]}, {"labels": ["处理方式", "pH 5时蛋白溶解性（%）", "pH 7时（%）", "pH 9时（%）"], "rows": [["仅碱提，对照组", "2.42 ± 0.06 a", "15.17 ± 0.20 a", "37.82 ± 1.07 a"], ["碱提同时超声，UAE", "6.59 ± 0.99 d", "18.80 ± 0.52 b", "46.87 ± 0.17 c"], ["碱提后超声，AE+US", "4.90 ± 0.05 c", "23.07 ± 0.06 c", "46.93 ± 0.61 c"]]}]};
const settle=async page=>{let previous=-1,stable=0;for(let i=0;i<40;i++){await page.waitForTimeout(100);const y=await page.evaluate(()=>scrollY);if(Math.abs(y-previous)<.5)stable++;else stable=0;previous=y;if(stable>=4)return;}throw Error('scroll did not settle');};
try {
for(const width of [390,1440,375,320]) for(const lang of ['en','zh']) for(const js of [true,false]) {
 const expected=tables[lang];
 const key=`${lang}-${width}-${js?'js':'nojs'}`, prefix=lang==='zh'?'/zh':'', path=`${prefix}/resources/blog/pumpkin-seed-protein-processing`;
 const c=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js});
 const page=await c.newPage();const errors=[],badResponses=[],nonGet=[]; const result={key,passed:false,citations:[],inbound:[],rows:[],errors,badResponses,nonGet};
 results.push(result);const save=()=>writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
 page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)badResponses.push([r.status(),r.url()]);});
 await c.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){nonGet.push(route.request().url());return route.abort();}return route.continue();});
 try{
  const response=await page.goto(base+path);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.pumpkin-reader').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:`${out}/${key}-top.png`});
  assert.equal(await page.locator('.pumpkin-table').count(),4);
  for(let t=0;t<4;t++) {
   const table=page.locator('.pumpkin-table').nth(t), {labels,rows}=expected[t];
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
  for(const id of [1,2,3,4,5,6,8,9,10,11]){
   await page.goto(base+path);await page.evaluate(()=>document.fonts.ready);
   const link=page.locator(`.pumpkin-reader a[href="#pumpkin-ref-${id}"]`).first();await link.focus();await settle(page);await page.keyboard.press('Enter');await page.waitForURL(u=>u.hash===`#pumpkin-ref-${id}`);await settle(page);
   const box=await page.locator(`#pumpkin-ref-${id}`).boundingBox();const header=await page.locator('header').first().boundingBox();assert.ok(box.y>=header.y+header.height,JSON.stringify({box,header}));assert.ok(box.y+box.height<=1000);
   result.citations.push({id,box,header});await page.screenshot({path:`${out}/${key}-citation-${id}.png`});
  }
  for(const route of ['/resources/application-guides','/resources/research','/resources/blog/sunflower-protein-selection']){
   await page.goto(base+prefix+route);await page.evaluate(()=>document.fonts.ready);const link=page.locator(`a[href="${path}"]`).first();await link.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await settle(page);await link.click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===path);assert.equal(await page.locator('.pumpkin-table tbody tr').count(),16);result.inbound.push(route);
  }
  assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);assert.deepEqual(nonGet,[]); result.passed=true;save(); console.log('PASS',key);
 }catch(e){result.error=String(e);save();throw e;}finally{await c.close();}
}
}finally{await browser.close();}
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,citations:results.reduce((n,r)=>n+r.citations.length,0),inbound:results.reduce((n,r)=>n+r.inbound.length,0)}));
