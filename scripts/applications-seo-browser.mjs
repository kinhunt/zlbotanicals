import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'/tmp/zl-browser/node_modules/playwright/index.mjs');
const base=process.argv[2]||'http://127.0.0.1:4347';
const out=process.env.QA_OUT||'/data/hermes/research/applications-seo-release/targeted';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({args:['--no-sandbox']});
const results=[],errors=[];let blockedWrites=0;
const cases=[['beverages','citrus-beverage','stevia'],['nutraceuticals','defined-capsule','reishi-mushroom'],['nutraceuticals','capsule','ginseng'],['cosmetics','glabridin-emulsion','licorice-root']];
async function ready(p){await p.waitForLoadState('load');await p.evaluate(()=>document.fonts.ready);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
async function click(p,l){await l.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await l.click();await ready(p);}
try{
for(const lang of ['en','zh'])for(const width of [390,1440]){
 const prefix=lang==='zh'?'/zh':'';
 const ctx=await browser.newContext({viewport:{width,height:1000}});
 await ctx.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){blockedWrites++;return route.abort();}return route.continue();});
 for(const [industry,plan,ingredient] of cases){
  const p=await ctx.newPage();p.on('pageerror',e=>errors.push(String(e)));
  const go=async()=>{assert.equal((await p.goto(base+prefix+'/solutions/'+industry)).status(),200);await ready(p);};
  const selector=`[data-application-task="${plan}"]`;
  await go();await p.locator(selector).evaluate(e=>window.scrollTo({top:scrollY+e.getBoundingClientRect().top-100,behavior:'instant'}));
  assert.ok(await p.locator(`${selector} h3`).evaluate(e=>e.getBoundingClientRect().top>=90));
  await p.screenshot({path:`${out}/${lang}-${width}-${plan}.png`});
  await click(p,p.locator(`${selector} a[href="${prefix}/products/${ingredient}"]`));
  if(ingredient==='licorice-root')assert.ok((await p.locator('main').innerText()).includes(lang==='zh'?'光甘草定型组分':'Glabridin-oriented fraction'));
  await go();await click(p,p.locator(`${selector} [data-task-science]`));
  assert.equal(new URL(p.url()).hash,'#formulation-'+plan);
  assert.ok((await p.locator('#formulation-'+plan).innerText()).length>200);
  await p.locator('#formulation-'+plan).evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));
  await p.screenshot({path:`${out}/${lang}-${width}-${plan}-science.png`});
  for(const request of ['sample','application']){
   await go();await click(p,p.locator(`${selector} [data-task-${request}]`));
   assert.equal(await p.locator('#request').inputValue(),request);
   assert.equal(await p.locator('#source').inputValue(),industry);
   for(const key of ['product','form','application','plan','problem'])assert.ok(await p.locator('#'+key).inputValue());
   if(ingredient==='licorice-root')assert.match(await p.locator('#form').inputValue(),/Glabridin|光甘草定/);
   const before=await p.locator('#problem').inputValue();await p.locator('#problem').fill(before+' — editable');
   assert.equal(await p.evaluate(()=>new FormData(document.querySelector('form')).get('problem')),before+' — editable');
   results.push({lang,width,industry,plan,request,url:p.url()});
  }
  await p.close();
 }
 const p=await ctx.newPage();await p.goto(base+prefix+'/solutions/beverages');await ready(p);
 await p.locator('#tea-bitterness-astringency').evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
 await p.screenshot({path:`${out}/${lang}-${width}-tea-sensory.png`});
 await click(p,p.locator('#tea-bitterness-astringency a'));
 assert.equal(new URL(p.url()).hash,'#formulation-citrus-tea');
 assert.ok((await p.locator('#formulation-citrus-tea').innerText()).length>200);
 await p.goto(base+prefix+'/solutions/nutraceuticals');await ready(p);
 await p.locator('#capsule-powder-evaluation').evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
 await p.screenshot({path:`${out}/${lang}-${width}-powder-evaluation.png`});
 await ctx.close();
}
assert.equal(blockedWrites,0);assert.deepEqual(errors,[]);
writeFileSync(out+'/results.json',JSON.stringify({journeys:results.length,teaAnchors:4,blockedWrites,errors,results},null,2));
console.log(JSON.stringify({journeys:results.length,teaAnchors:4,blockedWrites,errors}));
}finally{await browser.close();}
