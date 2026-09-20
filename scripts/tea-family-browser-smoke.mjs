import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'/tmp/zl-browser/node_modules/playwright/index.mjs');
const base=process.argv[2]||'http://127.0.0.1:4458';
const out=process.env.QA_OUT||'/data/hermes/research/seo-growth/tea-family-release/integration/browser';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[],errors=[];let blocked=0;
const deadline=setTimeout(()=>{console.error('Bounded smoke exceeded 180 seconds');process.exit(2);},180000);
try{
 for(const js of [true,false])for(const width of [390,1440])for(const lang of ['en','zh']){
  const context=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:1000}});
  await context.route('**/*',r=>{if(!['GET','HEAD'].includes(r.request().method())){blocked++;return r.abort();}return r.continue();});
  const page=await context.newPage();page.setDefaultTimeout(8000);page.on('pageerror',e=>errors.push(String(e)));
  const prefix=lang==='zh'?'/zh':'',path=prefix+'/products/tea-extracts',key=`${lang}-${width}-js-${js}`;
  const go=async p=>{assert.equal((await page.goto(base+p,{waitUntil:'domcontentloaded'})).status(),200);await page.evaluate(()=>document.fonts.ready);};
  const click=async l=>{await l.evaluate(e=>e.scrollIntoView({behavior:'instant',block:'center'}));await l.click();};
  const settle=async()=>{let prev=-1,stable=0;for(let i=0;i<35&&stable<3;i++){await page.waitForTimeout(100);const y=await page.evaluate(()=>scrollY);stable=Math.abs(y-prev)<1?stable+1:0;prev=y;}assert.ok(stable>=3,'native scroll settled');};
  try{
   for(const entry of ['/products','/products/green-tea','/solutions/beverages']){
    await go(prefix+entry);const l=page.locator(`a[href="${path}"]`);assert.equal(await l.count(),1);await click(l);await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===path);assert.equal(await page.locator('[data-tea-family] h1').count(),1);
   }
   await go(path);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'page overflow');
   await page.screenshot({path:`${out}/${key}-hero.png`});
   const cards=page.locator('.tea-material');assert.ok(await cards.count()>=3);
   const boxes=await cards.evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,right:r.right,text:e.textContent};}));
   for(const b of boxes){assert.ok(b.x>=0&&b.right<=width+1);assert.ok(b.text.length>50);}
   if(width===390)for(let i=1;i<boxes.length;i++)assert.ok(boxes[i].y>boxes[i-1].y,'mobile cards stack');
   await cards.first().evaluate(e=>e.scrollIntoView({behavior:'instant',block:'center'}));await page.screenshot({path:`${out}/${key}-matrix.png`});
   for(const id of [5,6,7,8,19]){
    await go(path);await click(page.locator(`.tea-citation[href="#tea-family-ref-${id}"]`).first());await page.waitForURL(u=>u.hash===`#tea-family-ref-${id}`);await settle();
    const b=await page.locator(`#tea-family-ref-${id}`).boundingBox();const header=await page.locator('body > header').evaluateAll(es=>Math.max(0,...es.map(e=>e.getBoundingClientRect().bottom)));
    assert.ok(b.y>=Math.max(65,header)-1&&b.y<1000,`citation ${id} below fixed header: y=${b.y}, header=${header}`);
   }
   await page.screenshot({path:`${out}/${key}-citation.png`});
   for(let i=0;i<3;i++){
    await go(path);const l=page.locator('[data-tea-family] a[href*="request-quote"]').nth(i);const href=await l.getAttribute('href');const params=new URL(href,base).searchParams;
    await click(l);await page.waitForURL('**/request-quote?**');await page.waitForLoadState('domcontentloaded');assert.equal(params.get('request'),i===1?'sample':'quote');
    if(js){for(const field of ['request','product','form','source'])assert.equal(await page.locator('#'+field).inputValue(),params.get(field),field+' prefill');}
    else {assert.equal(await page.locator('#product').inputValue(),'');await page.locator('#request').selectOption(params.get('request'));}
    await page.locator('#product').fill('Editable tea project');assert.equal(await page.locator('#product').inputValue(),'Editable tea project');
    assert.equal(await page.locator('form').evaluate(f=>new FormData(f).get('product')),'Editable tea project');
   }
   results.push({key,status:'passed',inbound:3,citations:5,ctas:3,prefill:js?'verified':'JS-off manual fallback; URL context retained'});console.log('PASS',key);
  }catch(e){results.push({key,status:'failed',error:String(e)});await page.screenshot({path:`${out}/${key}-failure.png`}).catch(()=>{});throw e;}
  finally{writeFileSync(`${out}/results.json`,JSON.stringify({results,errors,blocked},null,2));await context.close();}
 }
 assert.deepEqual(errors,[]);assert.equal(blocked,0);console.log(`PASS ${results.length} cases, 24 inbound links, 40 citation landings, 24 editable quote/sample journeys; zero submissions`);
}finally{clearTimeout(deadline);await browser.close();writeFileSync(`${out}/results.json`,JSON.stringify({results,errors,blocked},null,2));}
