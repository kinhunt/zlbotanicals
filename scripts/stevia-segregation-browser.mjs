import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const base=process.argv[2]||'http://127.0.0.1:4493';
const out=process.env.QA_OUTPUT||'/data/hermes/research/seo-growth/2026-09-21-segregation-release/browser';
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[], requests=[], errors=[];
async function settled(page){
 let last=-1,stable=0;
 for(let i=0;i<60;i++){await page.waitForTimeout(100);const y=await page.evaluate(()=>scrollY);stable=Math.abs(y-last)<1?stable+1:0;last=y;if(stable>=5)return;}
 throw Error('scroll did not settle');
}
try {
for(const lang of ['en','zh'])for(const width of [390,1440])for(const js of [true,false]) {
 const id=`${lang}-${width}-js${Number(js)}`;
 const context=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js,acceptDownloads:true});
 await context.route('**/*',route=>{const req=route.request();requests.push({case:id,method:req.method(),url:req.url()});return ['GET','HEAD'].includes(req.method())?route.continue():route.abort();});
 const page=await context.newPage();page.on('pageerror',err=>errors.push({case:id,message:String(err)}));
 const prefix=lang==='zh'?'/zh':'';
 const url=base+prefix+'/plant-extracts/ingredients/stevia';
 const result={id,downloads:[],anchors:[]};
 try {
  assert.equal((await page.goto(base+prefix+'/products/stevia')).status(),200);
  const inbound=page.locator('a[href="'+prefix+'/plant-extracts/ingredients/stevia#formulation-tabletop-sachet"]').first();
  await page.evaluate(()=>document.fonts.ready);await inbound.focus();await settled(page);await inbound.press('Enter');await page.waitForURL(u=>u.hash==='#formulation-tabletop-sachet');await page.waitForLoadState('load');await settled(page);
  assert.equal(await page.locator('#formulation-tabletop-sachet #stevia-segregation').count(),1);
  result.inbound=true;
  await page.goto(url);await page.evaluate(()=>document.fonts.ready);
  const nav=page.locator('a[href="#formulation-tabletop-sachet"]').first();
  await nav.focus();await settled(page);await nav.press('Enter');await page.waitForURL(u=>u.hash==='#formulation-tabletop-sachet');await settled(page);
  const target=await page.locator('#formulation-tabletop-sachet').boundingBox();assert.ok(target.y>=64&&target.y<1000,JSON.stringify(target));
  result.anchors.push('native-keyboard-plan');
  const module=page.locator('#stevia-segregation');
  assert.doesNotMatch(await module.innerText(),/\*\*|validate\.py|Checking the files|文件检查/);
  assert.ok(await module.locator('strong').count()>=2);
  assert.equal(await module.locator('h4').count(),1);assert.equal(await module.locator('h5').count(),2);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  await module.scrollIntoViewIfNeeded();await settled(page);await module.screenshot({path:path.join(out,`${id}-module.png`)});
  await page.screenshot({path:path.join(out,`${id}-viewport.png`)});
  for(const number of [10,11]) {
   await page.goto(url);const link=page.locator(`#stevia-segregation a[href="#research-stevia-rollout-source-${number}"]`);
   await link.focus();await settled(page);await link.press('Enter');await page.waitForURL(u=>u.hash===`#research-stevia-rollout-source-${number}`);await settled(page);
   const ref=page.locator(`#research-stevia-rollout-source-${number}`),box=await ref.boundingBox();
   assert.ok(box.y>=64&&box.y+box.height<=1001,JSON.stringify(box));
   assert.match(await ref.locator('a').getAttribute('href'),number===10?/documents\.thermofisher\.com/:/static\.horiba\.com/);
   result.anchors.push(`native-keyboard-citation-${number}`);
  }
  await page.goto(url);
  for(const file of ['sampling-record.csv','material-characterization.csv',`reader-${lang}.md`]) {
   const filename='stevia-segregation-'+file;
   const link=page.locator(`#stevia-segregation a[href="/downloads/${filename}"]`);
   const promise=page.waitForEvent('download');await link.click();const dl=await promise;
   assert.equal(dl.suggestedFilename(),filename);const dest=path.join(out,`${id}-${filename}`);await dl.saveAs(dest);
   const bytes=await fs.readFile(dest);assert.deepEqual(bytes,await fs.readFile('public/downloads/'+filename));
   result.downloads.push({filename,sha256:createHash('sha256').update(bytes).digest('hex')});
  }
  const ids=await page.locator('[id]').evaluateAll(els=>els.map(e=>e.id));assert.equal(new Set(ids).size,ids.length);
  const old=await context.newPage();await old.setContent(await fs.readFile(`/data/hermes/research/seo-growth/2026-09-21-segregation-release/baseline-pages/${lang}.html`,'utf8'));
  const inspect=()=>{const node=document.querySelector('[data-rollout-article]').cloneNode(true);node.querySelector('#stevia-segregation')?.remove();for(const n of [10,11])node.querySelector(`#research-stevia-rollout-source-${n}`)?.remove();return {text:[...node.querySelectorAll('h2,h3,p,li,figcaption,th,td')].map(e=>e.textContent.replace(/\s+/g,' ').trim()),ids:[...node.querySelectorAll('[id]')].map(e=>e.id),links:[...node.querySelectorAll('a')].map(e=>e.getAttribute('href')),images:[...node.querySelectorAll('img')].map(e=>e.getAttribute('src'))};};
  assert.deepEqual(await page.evaluate(inspect),await old.evaluate(inspect));await old.close();result.originalContentPreserved=true;
  result.pass=true;
 } catch(err){result.pass=false;result.error=String(err);await page.screenshot({path:path.join(out,`${id}-failure.png`)});}
 results.push(result);await fs.writeFile(path.join(out,'results.json'),JSON.stringify({results,errors,requests},null,2));await context.close();
}
assert.equal(errors.length,0);assert.equal(requests.filter(r=>!['GET','HEAD'].includes(r.method)).length,0);assert.ok(results.every(r=>r.pass),JSON.stringify(results.filter(r=>!r.pass)));
console.log(`PASS ${results.length}/8 cases; ${results.reduce((n,r)=>n+r.downloads.length,0)} actual downloads; no non-GET/HEAD requests`);
} finally {await browser.close();}
