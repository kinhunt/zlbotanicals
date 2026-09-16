import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const baseline=JSON.parse(fs.readFileSync('tests/fixtures/market-legacy-anchors.json','utf8'));
const base=process.env.QA_URL||'http://127.0.0.1:8774';
const out=process.env.QA_OUT;
assert.ok(out,'QA_OUT required');
const results=[];const browser=await chromium.launch({headless:true});
try{
 for(const js of [true,false])for(const lang of ['en','zh'])for(const width of [320,390,1440]){
  const context=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:900}});
  await context.route('**/*',route=>['GET','HEAD'].includes(route.request().method())?route.continue():route.abort());
  const page=await context.newPage();
  const url=`${base}/${lang==='zh'?'zh/':''}research/market/functional-mushrooms/`;
  for(const id of baseline.ids[lang]){
   // Start without hash, then actual browser hash navigation; no manual scrollIntoView.
   await page.goto(url);await page.evaluate(()=>document.fonts.ready);
   const response=await page.goto(`${url}#${encodeURIComponent(id)}`);
   await page.waitForURL(u=>decodeURIComponent(u.hash.slice(1))===id);
   await page.waitForTimeout(1500); // Native smooth scroll must settle, including nearby anchors initially visible.
   await page.waitForFunction(id=>{const e=document.getElementById(id);return e&&e.getBoundingClientRect().y>=0&&e.getBoundingClientRect().y<900;},id,{timeout:10000});
   const state=await page.evaluate(id=>{
    const e=document.getElementById(id);if(!e)return null;
    let heading=e.closest('p')||e;while(heading&&!/^H[1-6]$/.test(heading.tagName))heading=heading.nextElementSibling;
    const box=e.getBoundingClientRect();
    return {count:[...document.querySelectorAll('[id]')].filter(n=>n.id===id).length,y:box.y,scrollY,heading:heading?.textContent,headingY:heading?.getBoundingClientRect().y};
   },id);
   assert.ok(state,id);assert.equal(state.count,1,id);assert.ok(state.scrollY>0,id);
   assert.ok(state.y>=0&&state.y<900,`${id} native hash destination outside viewport: ${JSON.stringify(state)}`);
   assert.ok(state.heading?.trim().length>=2,`${id} has substantive heading`);
   results.push({lang,js,width,id,...state,passed:true});
  }
  await context.close();
 }
}finally{await browser.close();fs.writeFileSync(`${out}/anchor-browser-results.json`,JSON.stringify(results,null,2));}
console.log(JSON.stringify({passed:results.length}));
