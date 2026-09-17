import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'/tmp/zl-browser/node_modules/playwright/index.mjs');
const base=process.argv[2]||'http://127.0.0.1:4376';
const out=process.env.QA_OUT||'/data/hermes/research/gsc-plant-based-beverages/release/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({args:['--no-sandbox']});
const results=[], errors=[], nonGET=[], responses=[];
async function ready(p){await p.waitForLoadState('load');await p.evaluate(()=>document.fonts.ready);}
async function click(p,a){await a.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await a.click();await ready(p);}
async function overflow(p){assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no page overflow');}
try {
for(const lang of ['en','zh'])for(const width of [390,1440])for(const js of [true,false]) {
 const prefix=lang==='zh'?'/zh':'';
 const ctx=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js});
 await ctx.route('**/*',route=>{if(route.request().method()!=='GET'){nonGET.push(route.request().url());return route.abort();}return route.continue();});
 const p=await ctx.newPage();p.on('pageerror',err=>errors.push(String(err)));
 p.on('response',r=>{if(r.url().startsWith(base))responses.push({status:r.status(),url:r.url()});});
 const go=async()=>{const res=await p.goto(base+prefix+'/solutions/beverages');assert.equal(res.status(),200);await ready(p);await overflow(p);};
 await go();assert.equal(await p.locator('h1').innerText(),lang==='zh'?'饮料':'Beverages');
 assert.equal(await p.locator('[data-application-task]').count(),4);
 const stem=`${lang}-${width}-js-${js?'on':'off'}`;
 await p.locator('#plant-based-ingredients').evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));
 await p.screenshot({path:`${out}/${stem}-module.png`});
 await click(p,p.locator('#plant-based-ingredients a'));
 assert.ok(p.url().endsWith('#formulation-oat-latte'));
 assert.match(await p.locator('#formulation-oat-latte').innerText(),lang==='zh'?/基底.*蛋白质/s:/base.*protein/s);
 await overflow(p);
 for(const [plan,id] of [['oat-latte','green-tea'],['instant-drink','goji-berry']]) {
  await go();const card=p.locator(`[data-application-task="${plan}"]`);
  await card.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
  await p.screenshot({path:`${out}/${stem}-${plan}.png`});
  await click(p,card.locator(`a[href="${prefix}/products/${id}"]`));
  assert.equal(new URL(p.url()).pathname,prefix+'/products/'+id);assert.ok((await p.locator('h1').innerText()).length>2);await overflow(p);
  await go();await click(p,p.locator(`[data-application-task="${plan}"] [data-task-science]`));
  assert.ok(p.url().endsWith('#formulation-'+plan));
  const target=p.locator('#formulation-'+plan);const prose=await target.innerText();
  assert.ok(prose.length>(lang==='zh'?150:350));
  assert.match(prose,plan==='oat-latte'?(lang==='zh'?/单独溶解/:/dissolve separately/):(lang==='zh'?/果汁粉/:/juice powder/));
  await target.evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));
  for(const img of await target.locator('img').all())await img.evaluate(async e=>{await e.decode();if(!e.naturalWidth)throw Error('image decode failed');});
  await overflow(p);await p.screenshot({path:`${out}/${stem}-${plan}-science.png`});
  await go();const link=p.locator(`[data-application-task="${plan}"] [data-task-sample]`);
  const expected=new URL(await link.getAttribute('href'),base);
  await click(p,link);assert.equal(new URL(p.url()).pathname,prefix+'/request-quote');
  assert.equal(new URL(p.url()).search,expected.search);
  if(js){
   assert.equal(await p.locator('#request').inputValue(),'sample');
   for(const key of ['source','product','application','form','plan','problem'])assert.equal(await p.locator('#'+key).inputValue(),expected.searchParams.get(key));
  }else{
   // Static forms deliberately require manual entry when URL-prefill JavaScript is off.
   await p.locator('#request').selectOption('sample');
   for(const key of ['product','application','form','plan','problem'])await p.locator('#'+key).fill(expected.searchParams.get(key));
  }
  for(const key of ['product','application','form','plan','problem']){
   await p.locator('#'+key).fill('Editable '+key);
   assert.equal(await p.locator('#'+key).inputValue(),'Editable '+key);
  }
  assert.equal(await p.evaluate(()=>new FormData(document.querySelector('form')).get('problem')),'Editable problem');
  await overflow(p);
  results.push({lang,width,js,plan,sampleURL:p.url(),context:js?'prefilled and editable':'GET context retained; manual editable fields'});
 }
 await ctx.close();
}
assert.deepEqual(errors,[]);assert.deepEqual(nonGET,[]);assert.ok(responses.every(r=>r.status===200));
console.log(JSON.stringify({cases:results.length,errors,nonGET,localResponses:responses.length}));
} finally {
 writeFileSync(out+'/results.json',JSON.stringify({results,errors,nonGET,responses},null,2));
 await browser.close();
}
