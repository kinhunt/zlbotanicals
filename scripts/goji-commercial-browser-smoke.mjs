import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import {createServer} from 'node:http';
import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,join,extname} from 'node:path';
import assert from 'node:assert/strict';
const dist=resolve(process.env.QA_DIST||'dist'), out=resolve(process.env.QA_OUTPUT||'/tmp/goji-commercial-qa');
mkdirSync(out,{recursive:true});
const server=createServer((req,res)=>{let p=resolve(dist,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));if(!p.startsWith(dist+'/')){res.writeHead(403).end();return;}if(!extname(p))p=join(p,'index.html');if(!existsSync(p)){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp'})[extname(p)]||'application/octet-stream');res.end(readFileSync(p));});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true});const results=[];
async function settle(page){let last=-1,stable=0;for(let i=0;i<50;i++){await page.waitForTimeout(100);const y=await page.evaluate(()=>scrollY);stable=Math.abs(y-last)<1?stable+1:0;last=y;if(stable>=5)return;}throw Error('scroll did not settle');}
try{
for(const lang of ['en','zh'])for(const width of [390,1440])for(const js of [true,false]){
 const key=`${lang}-${width}-${js?'js':'nojs'}`, ctx=await browser.newContext({viewport:{width,height:900},javaScriptEnabled:js});
 const errors=[], nonGet=[];await ctx.route('**/*',route=>{const q=route.request();if(!['GET','HEAD'].includes(q.method())){nonGet.push(q.url());return route.abort();}if(!q.url().startsWith(origin))return route.abort();return route.continue();});
 const page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));const prefix=lang==='zh'?'/zh':'',science=`${prefix}/plant-extracts/ingredients/goji-berry`,sales=`${prefix}/products/goji-berry`;
 const record={key,passed:false,citations:0,cards:0};results.push(record);
 const response=await page.goto(origin+science);assert.equal(response.status(),200);assert.equal(await response.text(),readFileSync(join(dist,science,'index.html'),'utf8'));
 await page.evaluate(()=>document.fonts.ready);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 const module=page.locator('#goji-commercial-materials');assert.equal(await module.locator('table').count(),0);assert.equal(await module.locator('[data-goji-reference-card]').count(),3);assert.ok(!((await module.innerText()).includes('**')));
 for(let i=0;i<3;i++){const card=module.locator('[data-goji-reference-card]').nth(i);await card.evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY-95,behavior:'instant'}));await page.screenshot({path:join(out,`${key}-card-${i+1}.png`)});assert.ok((await card.boundingBox()).width>=width*.5 || width===1440);await card.screenshot({path:join(out,`${key}-card-${i+1}-element.png`)});record.cards++;}
 for(const id of ['C1','C4','C5','S1']){
  await page.goto(origin+science);const link=page.locator(`#goji-commercial-materials a[href="#goji-commercial-ref-${id}"]`).first();await link.focus();await settle(page);await page.keyboard.press('Enter');await page.waitForURL(u=>u.hash===`#goji-commercial-ref-${id}`);await settle(page);
  const target=page.locator(`#goji-commercial-ref-${id}`),box=await target.boundingBox();assert.ok(box.y>=64&&box.y<850,`${key} ${id} native target y=${box.y}`);assert.ok((await target.innerText()).length>20);assert.match(await target.locator('a').getAttribute('href'),/^https:\/\//);record.citations++;
 }
 await page.goto(origin+sales);const inbound=page.locator(`a[href="${science}#components"]`).first();assert.equal(await inbound.count(),1);await inbound.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));await inbound.click();await page.waitForURL(u=>u.pathname===science&&u.hash==='#components');await page.waitForLoadState('load');assert.equal(await module.count(),1);
 await module.evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY-95,behavior:'instant'}));await page.screenshot({path:join(out,`${key}-module.png`)});
 const back=page.locator(`#components a[href="${sales}#material-selection"]`);await back.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));await back.click();await page.waitForURL(u=>u.pathname===sales&&u.hash==='#material-selection');assert.equal(await page.locator('#goji-commercial-materials').count(),0);
 assert.deepEqual(errors,[]);assert.deepEqual(nonGet,[]);Object.assign(record,{passed:true,inbound:1,outbound:1,pageErrors:errors,nonGet});writeFileSync(join(out,'results.json'),JSON.stringify(results,null,2));await ctx.close();
}
}catch(e){writeFileSync(join(out,'failure.txt'),e.stack);throw e;}finally{writeFileSync(join(out,'results.json'),JSON.stringify(results,null,2));await browser.close();server.close();}
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length,citations:results.reduce((a,r)=>a+r.citations,0)},null,2));
