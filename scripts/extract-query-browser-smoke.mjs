import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'/tmp/zl-browser/node_modules/playwright/index.mjs');
const base=process.argv[2]||'http://127.0.0.1:4398';
const out=process.env.QA_OUT||'/tmp/extract-query-qa';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[];const errors=[];let blocked=0;
const topics=[['green-tea','material-selection'],['goji-berry','components'],['stevia','identity'],['licorice-root','identity'],['centella-asiatica','processes'],['reishi-mushroom','reishi-extract-market']];
try {
 for(const js of [true,false])for(const width of [390,1440])for(const lang of ['en','zh'])for(const [id,anchor] of topics){
  const context=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:1000}});
  await context.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){blocked++;return route.abort();}return route.continue();});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(String(e)));
  const prefix=lang==='zh'?'/zh':'';
  const path=prefix+(id==='green-tea'?'/products/green-tea':id==='reishi-mushroom'?'/research/market/functional-mushrooms':`/plant-extracts/ingredients/${id}`);
  const go=async target=>{const res=await page.goto(base+target);assert.equal(res.status(),200);await page.evaluate(()=>document.fonts.ready);};
  const click=async selector=>{const link=page.locator(selector).first();await link.evaluate(e=>e.scrollIntoView({behavior:'instant',block:'center'}));await link.click();await page.waitForLoadState('load');};
  await go(path);
  assert.equal(await page.locator('h1').count(),1);
  const meta=await page.evaluate(()=>({title:document.title,canonical:document.querySelector('link[rel=canonical]').href,alternates:[...document.querySelectorAll('link[hreflang]')].map(e=>e.href),description:document.querySelector('meta[name=description]').content}));
  assert.ok(meta.canonical.endsWith(path));assert.equal(meta.title.split(lang==='zh'?'振隆药业':'ZL Botanicals').length,2);assert.ok(meta.description.length>30);
  assert.ok(meta.alternates.some(a=>a.endsWith(path.replace(/^\/zh/,''))));assert.ok(meta.alternates.some(a=>a.endsWith('/zh'+path.replace(/^\/zh/,''))));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${path} overflow`);
  // Decode article imagery before native hash navigation so lazy-image layout shifts
  // do not move a correctly reached section while the screenshot is captured.
  await page.locator('main img').evaluateAll(async imgs=>{for(const i of imgs){i.loading='eager';await i.decode();}});
  const target=page.locator(`#${anchor}`);assert.equal(await target.count(),1);
  await click(`a[href="#${anchor}"]`);await page.waitForURL(u=>u.hash===`#${anchor}`);
  // Long articles need more than 650 ms for native smooth scrolling to settle.
  let previousY=null,stable=0;
  for(let i=0;i<40&&stable<3;i++){await page.waitForTimeout(100);const y=await page.evaluate(()=>scrollY);stable=previousY!==null&&Math.abs(y-previousY)<1?stable+1:0;previousY=y;}
  assert.ok(stable>=3,'native scrolling settled');
  assert.ok((await target.innerText()).length>(anchor==='reishi-extract-market'?8:30));
  const box=await target.boundingBox();assert.ok(box.y<1000&&box.y>=0,`${path} native hash landing ${box.y}`);
  if(js)await page.screenshot({path:`${out}/${lang}-${id}-${width}-section.png`});
  if(id==='green-tea'){
   for(const a of ['components','formulation-citrus-tea','formulation-instant-tea']){
    await go(path);await click(`a[href="${prefix}/plant-extracts/ingredients/green-tea#${a}"]`);await page.waitForURL(u=>u.hash===`#${a}`);assert.ok((await page.locator(`#${a}`).innerText()).length>50);
   }
  } else if(id==='reishi-mushroom') {
   await click(`a[href="${prefix}/products/reishi-mushroom#material-selection"]`);assert.ok((await page.locator('#material-selection').innerText()).length>50);
   await click(`a[href="${prefix}/research/market/functional-mushrooms#reishi-extract-market"]`);await page.waitForURL(u=>u.hash==='#reishi-extract-market');
   await click('a[href="#materials"]');await page.waitForURL(u=>u.hash==='#materials');
   assert.ok((await page.locator('article').innerText()).includes('Double Wood'));
  } else {
   await click(`a[href="${prefix}/products/${id}#material-selection"]`);await page.waitForURL(u=>u.hash==='#material-selection');assert.ok((await page.locator('#material-selection').innerText()).length>50);
   await click(`a[href="${prefix}/plant-extracts/ingredients/${id}#components"]`);await page.waitForURL(u=>u.hash==='#components');assert.ok((await page.locator('#components').innerText()).length>50);
  }
  await go(`${prefix}/products/${id}`);
  const image=page.locator(`img[src="/images/products/${id}.webp"]`);await image.evaluate(i=>i.decode());assert.ok(await image.evaluate(i=>i.naturalWidth>0));
  for(const request of ['quote','sample','TDS']){
   await go(`${prefix}/products/${id}`);await click(`[data-procurement-action="${request}"]`);await page.waitForURL('**/request-quote?**');
   assert.equal(new URL(page.url()).searchParams.get('request'),request);
   if(js){assert.equal(await page.locator('#request').inputValue(),request);assert.equal(await page.locator('#product').inputValue(),new URL(page.url()).searchParams.get('product'));}
  }
  results.push({lang,id,width,js,path,meta,status:'passed'});console.log(`PASS ${lang} ${id} ${width} JS=${js}`);await context.close();
 }
 assert.deepEqual(errors,[]);assert.equal(blocked,0);
} finally {await browser.close();writeFileSync(`${out}/results.json`,JSON.stringify({results,errors,blocked},null,2));}
console.log(`Completed ${results.length} theme/locale/viewport/JS cases; no submissions.`);
