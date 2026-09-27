import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const base=process.env.QA_BASE||'http://127.0.0.1:8973';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-27-carob-release/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true}); const results=[];
const tables={"en": [{"labels": ["Product and ASIN", "How the listing positions it", "Question for a sample trial"], "rows": [["Worldwide Botanicals medium roast, B07JX6YCKR", "Uses “regular cocoa” and recipes calling for milk chocolate as reference points.[6]", "Do sweetness, cocoa taste and baked aroma work together in the target cake?"], ["Worldwide Botanicals dark roast, B0F67QBGL3", "Uses “dark cocoa” and recipes calling for dark chocolate as reference points.[7]", "Does the baked product achieve the intended color and flavor, rather than merely starting with a darker powder?"], ["The Australian Carob Co., B01D2975KS", "Titled “Raw,” under The Australian Carob Co.; product bullets are absent from the detail sample.[8]", "If the aim is a deliberately carob-flavored product, is this worth testing alongside roasted candidates?"]]}, {"labels": ["Study treatment", "Wheat flour", "Cocoa powder", "Carob pulp flour", "Carob share of the listed 300 g ingredient total, calculated here"], "rows": [["Control", "60 g", "15 g", "0", "0"], ["10", "67.5 g", "0", "7.5 g", "2.5%"], ["30", "52.5 g", "0", "22.5 g", "7.5%"], ["50", "37.5 g", "0", "37.5 g", "12.5%"], ["70", "22.5 g", "0", "52.5 g", "17.5%"]]}], "zh": [{"labels": ["商品及ASIN", "页面如何定位", "选样时值得验证什么"], "rows": [["Worldwide Botanicals中焙，B07JX6YCKR", "以“regular cocoa”和需要牛奶巧克力风味的配方作为参照。[6]", "在目标蛋糕中，甜味、可可味及烘烤香气是否协调？"], ["Worldwide Botanicals深焙，B0F67QBGL3", "以“dark cocoa”和需要黑巧克力风味的配方作为参照。[7]", "成品是否达到所需深色和风味，而不只是原粉看起来更深？"], ["The Australian Carob Co.，B01D2975KS", "标题以“Raw”定位，品牌为The Australian Carob Co.；详情采样不含商品要点。[8]", "如果项目本来就要开发角豆自身的风味，是否值得与焙烤款并列试样？"]]}, {"labels": ["论文组别", "小麦粉", "可可粉", "角豆果肉粉", "果肉粉占表列300克配料总量（本文计算）"], "rows": [["对照", "60克", "15克", "0", "0"], ["10组", "67.5克", "0", "7.5克", "2.5%"], ["30组", "52.5克", "0", "22.5克", "7.5%"], ["50组", "37.5克", "0", "37.5克", "12.5%"], ["70组", "22.5克", "0", "52.5克", "17.5%"]]}]};
const settle=async page=>{let previous=-1,stable=0;for(let i=0;i<40;i++){await page.waitForTimeout(100);const y=await page.evaluate(()=>scrollY);if(Math.abs(y-previous)<.5)stable++;else stable=0;previous=y;if(stable>=4)return;}throw Error('scroll did not settle');};
try {
for(const width of [390,1440,320]) for(const lang of ['en','zh']) for(const js of [true,false]) {
 const expected=tables[lang];
 const key=`${lang}-${width}-${js?'js':'nojs'}`, prefix=lang==='zh'?'/zh':'', path=`${prefix}/resources/blog/carob-powder-cocoa-baking`;
 const c=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js});
 const page=await c.newPage();const errors=[],badResponses=[],nonGet=[]; const result={key,passed:false,citations:[],inbound:[],rows:[],errors,badResponses,nonGet};
 results.push(result);const save=()=>writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
 page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)badResponses.push([r.status(),r.url()]);});
 await c.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){nonGet.push(route.request().url());return route.abort();}return route.continue();});
 try{
  const response=await page.goto(base+path);assert.equal(response.status(),200);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.carob-reader').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:`${out}/${key}-top.png`});
  assert.equal(await page.locator('.carob-table').count(),2);
  for(let t=0;t<2;t++) {
   const table=page.locator('.carob-table').nth(t), {labels,rows}=expected[t];
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
  for(const id of [1,2,3,4,5,6,7,8,9]){
   await page.goto(base+path);await page.evaluate(()=>document.fonts.ready);
   const link=page.locator(`.carob-reader a[href="#carob-ref-${id}"]`).first();await link.focus();await settle(page);await page.keyboard.press('Enter');await page.waitForURL(u=>u.hash===`#carob-ref-${id}`);await settle(page);
   const box=await page.locator(`#carob-ref-${id}`).boundingBox();const header=await page.locator('header').first().boundingBox();assert.ok(box.y>=header.y+header.height,JSON.stringify({box,header}));assert.ok(box.y+box.height<=1000);
   result.citations.push({id,box,header});await page.screenshot({path:`${out}/${key}-citation-${id}.png`});
  }
  for(const route of ['/resources/application-guides','/resources/research','/solutions/food']){
   await page.goto(base+prefix+route);await page.evaluate(()=>document.fonts.ready);const link=page.locator(`a[href="${path}"]`).first();await link.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await settle(page);await link.click();await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===path);assert.equal(await page.locator('.carob-table tbody tr').count(),8);result.inbound.push(route);
  }
  assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);assert.deepEqual(nonGet,[]); result.passed=true;save(); console.log('PASS',key);
 }catch(e){result.error=String(e);save();throw e;}finally{await c.close();}
}
}finally{await browser.close();}
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,citations:results.reduce((n,r)=>n+r.citations.length,0),inbound:results.reduce((n,r)=>n+r.inbound.length,0)}));
