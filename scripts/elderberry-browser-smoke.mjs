import { chromium } from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
const base=process.argv[2] || 'http://127.0.0.1:8794';
const out=process.env.QA_OUT || '/tmp/elderberry-qa';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[],requests=[],errors=[];
const slug='elderberry-material-selection';
async function settle(page){await page.waitForTimeout(1900);}
async function click(page,link){await link.evaluate(el=>el.scrollIntoView({behavior:'instant',block:'center'}));await page.waitForTimeout(300);await link.click();await page.waitForLoadState('load');await page.evaluate(()=>document.fonts.ready);}
try {
for(const lang of ['en','zh']) for(const width of [390,1440]) for(const js of [true,false]) {
 const key=`${lang}-${width}-js${Number(js)}`,prefix=lang==='en'?'':'/zh';
 const context=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:900}});
 await context.route('**/*',route=> {const r=route.request();requests.push({key,method:r.method(),url:r.url()});if(!['GET','HEAD'].includes(r.method()))return route.abort();return route.continue();});
 const page=await context.newPage();page.on('pageerror',e=>errors.push({key,message:e.message}));
 const record={key,passed:false};results.push(record);
 try {
  let response=await page.goto(`${base}${prefix}/solutions/nutraceuticals/`);assert.equal(response.status(),200);
  await click(page,page.locator(`a[href="${prefix}/resources/blog/${slug}"]`).first());
  assert.equal(new URL(page.url()).pathname.replace(/\/$/,''),`${prefix}/resources/blog/${slug}`);
  const articleUrl=page.url();await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.elderberry-table').count(),2);
  assert.ok(!(await page.locator('article').innerText()).includes('**'));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.goto(articleUrl);await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`${out}/${key}-hero.png`});
  record.tables=[];
  for(let i=0;i<2;i++){
   const table=page.locator('.elderberry-table').nth(i);await table.evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-110,behavior:'instant'}));
   const captionBox=await table.locator('caption').boundingBox();assert.ok(captionBox.width>250,`caption width ${captionBox.width}`);
   const geometry=await table.evaluate(el=>({width:el.getBoundingClientRect().width,rows:[...el.querySelectorAll('tbody tr')].map(row=>({identity:row.querySelector('th').textContent,values:[...row.querySelectorAll('td')].map(cell=>({label:cell.dataset.label,value:cell.querySelector('.table-value').textContent,box:(()=>{let r=cell.getBoundingClientRect();return {x:r.x,right:r.right}})()}))}))}));
   for(const row of geometry.rows) for(const cell of row.values){assert.ok(cell.label&&cell.value&&row.identity);assert.ok(cell.box.x>=0&&cell.box.right<=width);}
   if(width===390)assert.equal(await table.locator('.mobile-label').first().isVisible(),true);
   if(width===1440)await table.screenshot({path:`${out}/${key}-table${i+1}.png`});
   await page.screenshot({path:`${out}/${key}-table${i+1}-viewport.png`});record.tables.push(geometry);
  }
  // Every original citation ID: fresh native keyboard journey, never reposition the target.
  record.citations=[];
  for(const id of [1,2,5,7,8,9,10,11]) {
   await page.goto(articleUrl);await page.evaluate(()=>document.fonts.ready);
   const link=page.locator(`a[href="#elderberry-ref-${id}"]`).first();await link.focus();await settle(page);await page.keyboard.press('Enter');
   await page.waitForURL(url=>url.hash===`#elderberry-ref-${id}`);await settle(page);
   const target=page.locator(`#elderberry-ref-${id}`),box=await target.boundingBox();assert.ok(box.y>=64&&box.y<900,`citation ${id} y=${box.y}`);
   assert.ok(await target.locator('a').getAttribute('href'));record.citations.push(id);
  }
  await page.screenshot({path:`${out}/${key}-sources.png`});
  // Actual local links, including inquiry navigation, without external form submission.
  record.links=[];
  for(const route of ['solutions/nutraceuticals','solutions/beverages','request-quote']){
   await page.goto(articleUrl);await click(page,page.locator(`article .prose a[href="${prefix}/${route}"]`).first());
   assert.equal(new URL(page.url()).pathname.replace(/\/$/,''),`${prefix}/${route}`);
   assert.ok((await page.locator('h1').innerText()).length>0);record.links.push(route);
  }
  // Real sourcing category discovery path.
  await page.goto(`${base}${prefix}/resources/sourcing-guides/`);await click(page,page.locator(`a[href="${prefix}/resources/blog/${slug}"]`).first());assert.ok(page.url().includes(slug));
  record.passed=true;
 }catch(error){record.error=String(error);throw error;}finally{writeFileSync(`${out}/results.json`,JSON.stringify({results,requests,errors},null,2));await context.close();}
}
assert.equal(errors.length,0);assert.ok(requests.every(r=>['GET','HEAD'].includes(r.method)));
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,citations:results.reduce((n,r)=>n+(r.citations?.length||0),0),errors},null,2));
}finally{await browser.close();}
