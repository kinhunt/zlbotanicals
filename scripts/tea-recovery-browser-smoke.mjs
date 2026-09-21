import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'/tmp/zl-browser/node_modules/playwright/index.mjs');
const base=process.argv[2]||'http://127.0.0.1:4476';
const out=process.env.QA_OUT; assert.ok(out,'QA_OUT required');mkdirSync(out,{recursive:true});
const browser=await chromium.launch({args:['--no-sandbox']});const results=[],errors=[];let nonGet=0;
try {
 for(const js of [true,false]) for(const width of [390,1440]) for(const lang of ['en','zh']) {
  const key=`${lang}-${width}-js-${js}`,prefix=lang==='zh'?'/zh':'';
  const context=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:1000},acceptDownloads:true});
  const page=await context.newPage();page.setDefaultTimeout(12000);page.on('pageerror',e=>errors.push(String(e)));
  await context.route('**/*',route=>{if(!['GET','HEAD'].includes(route.request().method())){nonGet++;return route.abort();}return route.continue();});
  const settle=async()=>{let previous=-1,stable=0;for(let i=0;i<40&&stable<4;i++){await page.waitForTimeout(100);const y=await page.evaluate(()=>scrollY);stable=Math.abs(y-previous)<1?stable+1:0;previous=y;}assert.ok(stable>=4);};
  const click=async locator=>{await locator.evaluate(e=>e.scrollIntoView({behavior:'instant',block:'center'}));await locator.click();await settle();};
  try {
   const response=await page.goto(base+prefix+'/products/green-tea');assert.equal(response.status(),200);
   await click(page.locator(`a[href="${prefix}/products/tea-extracts"]`));await page.waitForURL(u=>u.pathname.replace(/\/$/,'')===prefix+'/products/tea-extracts');await page.evaluate(()=>document.fonts.ready);
   const module=page.locator('[data-tea-recovery-module]'),guide=page.locator('[data-tea-recovery-guide]');
   assert.equal(await module.getAttribute('open'),null);assert.equal(await guide.getAttribute('open'),null);
   await page.locator('#tea-recovery').evaluate(e=>e.scrollIntoView({behavior:'instant',block:'start'}));await page.screenshot({path:`${out}/${key}-closed.png`});
   await module.locator('summary').focus();await settle();await page.keyboard.press('Enter');assert.notEqual(await module.getAttribute('open'),null);
   await page.locator('#tea-recovery').evaluate(e=>e.scrollIntoView({behavior:'instant',block:'start'}));await page.screenshot({path:`${out}/${key}-module.png`});
   for(const id of [6,7]) {
    await click(module.locator(`a[href="#tea-recovery-ref-${id}"]`).first());await page.waitForURL(u=>u.hash===`#tea-recovery-ref-${id}`);await settle();
    const box=await page.locator(`#tea-recovery-ref-${id}`).boundingBox();assert.ok(box.y>=64&&box.y<1000,`native citation below header ${box.y}`);
   }
   for(const name of ['boundary.blank.csv','acceptance.blank.csv','streams.blank.csv','reader.bilingual.md']) {
    const filename='tea-recovery-'+name;
    const downloadEvent=page.waitForEvent('download');await click(page.locator(`#tea-recovery a[href="/downloads/${filename}"]`));const download=await downloadEvent;
    assert.equal(download.suggestedFilename(),filename);assert.deepEqual(readFileSync(await download.path()),readFileSync('public/downloads/'+filename));
   }
   await guide.locator('summary').focus();await settle();await page.keyboard.press('Enter');assert.notEqual(await guide.getAttribute('open'),null);
   const dictionaries=guide.locator('[data-recovery-dictionary]');assert.equal(await dictionaries.count(),3);
   const dictionaryChecks=[];
   for(let i=0;i<3;i++) {
    const dictionary=dictionaries.nth(i);const fields=dictionary.locator('dt');assert.ok(await fields.count()>=9);
    const metrics=await dictionary.locator('dt,dd').evaluateAll(es=>es.map(e=>({text:e.textContent,size:parseFloat(getComputedStyle(e).fontSize),width:e.getBoundingClientRect().width,right:e.getBoundingClientRect().right,left:e.getBoundingClientRect().left})));
    for(const m of metrics){assert.ok(m.size>=15);assert.ok(m.left>=0&&m.right<=width);assert.ok(m.width>=260);assert.ok(m.text.length>0);}
    await fields.first().evaluate(e=>e.scrollIntoView({behavior:'instant',block:'center'}));await page.screenshot({path:`${out}/${key}-dictionary-${i+1}-first.png`});
    await fields.last().evaluate(e=>e.scrollIntoView({behavior:'instant',block:'center'}));await page.screenshot({path:`${out}/${key}-dictionary-${i+1}-last.png`});
    dictionaryChecks.push({dictionary:i+1,fields:await fields.count(),minFont:Math.min(...metrics.map(m=>m.size)),allTextWithinViewport:true});
   }
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.equal(await guide.locator('table').count(),0);
   results.push({key,status:'passed',nativeInbound:1,nativeCitations:2,downloadBytes:4,keyboardDisclosures:2,dictionaryChecks});console.log('PASS',key);
  } catch(e){results.push({key,status:'failed',error:String(e)});await page.screenshot({path:`${out}/${key}-failure.png`});throw e;}
  finally {writeFileSync(`${out}/results.json`,JSON.stringify({results,errors,nonGet},null,2));await context.close();}
 }
 assert.deepEqual(errors,[]);assert.equal(nonGet,0);
} finally {await browser.close();writeFileSync(`${out}/results.json`,JSON.stringify({results,errors,nonGet},null,2));}
