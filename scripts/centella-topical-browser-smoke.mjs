import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=process.env.BASE_URL||'http://127.0.0.1:8956';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-27-i06-release/browser';
fs.mkdirSync(out,{recursive:true});
const results=[];
const browser=await chromium.launch({headless:true});
const target='research-centella-asiatica-rollout-source-15';
async function settled(page){
 let last=-1,stable=0;
 for(let i=0;i<80;i++){
  await page.waitForTimeout(100);
  const y=await page.evaluate(()=>scrollY);
  stable=Math.abs(y-last)<.5?stable+1:0;last=y;
  if(stable>=5)return;
 }
 throw new Error('scroll did not settle');
}
try{
 for(const lang of ['en','zh'])for(const width of [390,1440])for(const js of [true,false]){
  const key=`${lang}-${width}-${js?'on':'off'}`;
  const row={key,passed:false,jumps:[]};results.push(row);
  const ctx=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js});
  const errors=[];const blocked=[];
  await ctx.route('**/*',route=>{
   const req=route.request();
   if(!['GET','HEAD'].includes(req.method())){blocked.push(req.url());return route.abort();}
   return route.continue();
  });
  const page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));
  const url=`${base}${lang==='zh'?'/zh':''}/plant-extracts/ingredients/centella-asiatica/`;
  for(let index=0;index<2;index++){
   const response=await page.goto(url,{waitUntil:'networkidle'});assert.equal(response.status(),200);
   await page.evaluate(()=>document.fonts.ready);
   const effects=page.locator('#effects');
   const paragraphs=effects.locator(':scope > p');
   assert.equal(await paragraphs.count(),5);
   const link=effects.locator(`a[href="#${target}"]`).nth(index);
   assert.equal(await effects.locator(`a[href="#${target}"]`).count(),2);
   // Preparing the source link is allowed; never manually position the target.
   await link.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
   await settled(page);
   if(index===0){
    await page.screenshot({path:`${out}/${key}-study.png`});
    await effects.screenshot({path:`${out}/${key}-effects.png`});
    await link.click();
   }else{
    await page.screenshot({path:`${out}/${key}-boundary.png`});
    await link.focus();await settled(page);await page.keyboard.press('Enter');
   }
   await page.waitForURL(u=>u.hash===`#${target}`);await settled(page);
   const bounds=await page.locator(`#${target}`).evaluate(el=>({top:el.getBoundingClientRect().top,bottom:el.getBoundingClientRect().bottom,header:document.querySelector('header').getBoundingClientRect().bottom,href:el.querySelector('a').href,text:el.textContent}));
   assert.ok(bounds.top>=bounds.header,JSON.stringify(bounds));assert.ok(bounds.bottom<=1000,JSON.stringify(bounds));
   assert.equal(bounds.href,'https://pmc.ncbi.nlm.nih.gov/articles/PMC4852572/');assert.match(bounds.text,/Ratz-Łyko/);
   assert.equal(await page.locator(`[id="${target}"]`).count(),1);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await page.screenshot({path:`${out}/${key}-citation-${index}.png`});
   row.jumps.push({method:index?'Enter':'click',...bounds});
  }
  assert.deepEqual(errors,[]);assert.deepEqual(blocked,[]);row.passed=true;
  fs.writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));await ctx.close();
 }
}finally{
 fs.writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));await browser.close();
}
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,jumps:results.reduce((n,r)=>n+r.jumps.length,0)}));
