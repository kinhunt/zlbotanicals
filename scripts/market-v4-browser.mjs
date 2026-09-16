import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const out=process.env.QA_OUT||'/data/hermes/research/amazon-mushroom-v4/release';
const base=process.env.QA_URL||'http://127.0.0.1:8764';
const data=JSON.parse(fs.readFileSync('src/data/market-v4.json','utf8'));
const browser=await chromium.launch({headless:true});const results=[];
try{
for(const js of [true,false])for(const lang of ['en','zh'])for(const width of [320,390,768,1440]){
 const context=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:900}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const prefix=lang==='zh'?'/zh':'';const url=`${base}${prefix}/research/market/functional-mushrooms/`;
 await page.goto(url);await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('figure').count(),5);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'page overflow');
 assert.ok(!(await page.locator('article').innerText()).includes('**'));
 const ids=await page.locator('[id]').evaluateAll(es=>es.map(e=>e.id));assert.equal(ids.length,new Set(ids).size);
 for(const a of await page.locator('article a[href^="#"]').evaluateAll(es=>es.map(e=>e.getAttribute('href').slice(1))))assert.ok(ids.includes(a),a);
 for(const p of data.products){const scope=page.locator(width<=900?'.matrix-mobile':'.matrix-desktop');const a=scope.locator(`a[href="${p.canonical_url}"]`);assert.equal(await a.count(),1);assert.ok((await a.textContent()).includes(p.brand));}
 for(const cell of data.charts.find(c=>c.id==='material-format').rows){const sel=`[data-form="${cell.form}"][data-material="${cell.material_claim}"]`;const el=page.locator((width<=900?'.matrix-mobile ':'.matrix-desktop ')+sel);assert.ok((await el.innerText()).includes(String(cell.count)));for(const asin of cell.asins)assert.equal(await el.locator(`a[href$="${asin}"]`).count(),1);}
 for(const value of await page.locator('.chart-value').all()){if(await value.isVisible()){const b=await value.boundingBox();assert.ok(b.x>=0&&b.x+b.width<=width+1,`hidden chart value ${await value.textContent()}`);}}
 for(const source of await page.locator('figure .source').all())assert.ok(await source.evaluate(e=>parseFloat(getComputedStyle(e).fontSize)>=14));
 const cards=await page.locator('.dose-pair>div').evaluateAll(es=>es.map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})));assert.ok(Math.abs(cards[0].w-cards[1].w)<1&&Math.abs(cards[0].h-cards[1].h)<1,'equal dose card area');
 const link=page.locator('a[href="#market-v4-ref-25"]').first();await link.focus();await page.keyboard.press('Enter');await page.waitForURL(/#market-v4-ref-25$/);assert.equal(await page.locator('#market-v4-ref-25 a').getAttribute('href'),'https://www.amazon.com/dp/B0C4166SSW');
 const table=page.locator('.market-table');await table.focus();const before=await table.evaluate(e=>e.scrollLeft);await page.keyboard.press('ArrowRight');await page.waitForTimeout(200);if(width<768)assert.ok(await table.evaluate(e=>e.scrollLeft)>before,'keyboard table scrolling');
 if(width===1440){const matrix=page.locator('.matrix-desktop');await matrix.focus();await page.keyboard.press('End');await page.waitForTimeout(200);const summary=matrix.locator('summary').first();await summary.focus();await page.keyboard.press('Enter');assert.ok(await summary.evaluate(e=>e.parentElement.open));}
 if(js){for(const id of ['sample-form','material-format','dose-basis','retail-sales','global-forecast']){const el=page.locator(`#${id}`);await el.scrollIntoViewIfNeeded();await el.screenshot({path:`${out}/${lang}-${width}-${id}.png`});}await page.goto(url);await page.screenshot({path:`${out}/${lang}-${width}-hero.png`});}
 await page.goto(`${base}${prefix}/research/`);const entry=page.locator(`a[href="${prefix}/research/market/functional-mushrooms"]`).first();await entry.click();await page.waitForURL(/functional-mushrooms\/?$/);assert.ok((await page.locator('article').innerText()).includes('Amazon'));
 for(const target of ['products/reishi-mushroom','plant-extracts/ingredients/reishi-mushroom'])assert.equal(await page.locator(`article a[href="${prefix}/${target}"]`).count(),1);
 assert.deepEqual(errors,[]);results.push({lang,width,js,passed:true});await context.close();
}
}finally{await browser.close();fs.writeFileSync(`${out}/browser-results.json`,JSON.stringify(results,null,2));}
console.log(JSON.stringify({passed:results.length,results}));
