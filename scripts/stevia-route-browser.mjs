import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.argv[2]||'http://127.0.0.1:4497';
const out=process.env.QA_OUTPUT||'/data/hermes/research/seo-growth/2026-09-27-i07-module-release';
const browser=await chromium.launch({headless:true});const results=[],errors=[];
const norm=s=>s.replace(/\s+/g,' ').trim();
async function settle(p){let last=-1,stable=0;for(let i=0;i<80;i++){await p.waitForTimeout(100);const y=await p.evaluate(()=>scrollY);stable=Math.abs(y-last)<1?stable+1:0;last=y;if(stable>=5)return;}throw Error('scroll did not settle');}
const inspect=()=>{const n=document.querySelector('[data-rollout-article]').cloneNode(true);n.querySelector('#stevia-route-comparison')?.remove();n.querySelector('a[href="#stevia-route-comparison"]')?.closest('li').remove();return {text:[...n.querySelectorAll('h2,h3,p,li,figcaption,th,td')].map(e=>e.textContent.replace(/\s+/g,' ').trim()),ids:[...n.querySelectorAll('[id]')].map(e=>e.id),links:[...n.querySelectorAll('a')].map(e=>e.getAttribute('href')),images:[...n.querySelectorAll('img')].map(e=>e.getAttribute('src'))};};
try{
for(const lang of ['en','zh'])for(const width of [320,390,1440])for(const js of [true,false]){
 const id=`${lang}-${width}-js${+js}`,result={id,tables:[],citations:[],downloads:[]};
 const c=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js,acceptDownloads:true});
 await c.route('**/*',r=>['GET','HEAD'].includes(r.request().method())?r.continue():r.abort());
 const p=await c.newPage();p.on('pageerror',e=>errors.push({id,error:String(e)}));
 try{
 const url=base+(lang==='zh'?'/zh':'')+'/plant-extracts/ingredients/stevia';assert.equal((await p.goto(url)).status(),200);await p.evaluate(()=>document.fonts.ready);
 const old=await c.newPage();await old.setContent(await fs.readFile(`${out}/baseline-pages/${lang}.html`,'utf8'));assert.deepEqual(await p.evaluate(inspect),await old.evaluate(inspect));await old.close();result.originalDOMPreserved=true;
 const ids=await p.locator('[id]').evaluateAll(es=>es.map(e=>e.id));assert.equal(ids.length,new Set(ids).size);
 const nav=p.locator('[data-encyclopedia-toc] a[href="#stevia-route-comparison"]');await nav.focus();await settle(p);await nav.press('Enter');await p.waitForURL(u=>u.hash==='#stevia-route-comparison');await settle(p);
 const box=await p.locator('#stevia-route-comparison').boundingBox();assert.ok(box.y>=60&&box.y<1000,JSON.stringify(box));
 await p.screenshot({path:`${out}/${id}-entry.png`});
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 const module=p.locator('#stevia-route-comparison');assert.doesNotMatch(await module.innerText(),/\*\*/);
 const wrappers=module.locator('.i07-table-scroll');assert.equal(await wrappers.count(),3);
 for(let t=0;t<3;t++){
  const w=wrappers.nth(t);const rows=w.locator('tbody tr');assert.equal(await rows.count(),[5,6,6][t]);
  await w.focus();await w.press('Home');const before=await w.evaluate(e=>e.scrollLeft);await w.press('ArrowRight');await settle(p);const geometry=await w.evaluate(e=>({x:e.scrollLeft,sw:e.scrollWidth,cw:e.clientWidth}));if(geometry.sw>geometry.cw)assert.ok(geometry.x>before);
  for(let r=0;r<await rows.count();r++)for(let cell=0;cell<3;cell++){
   const td=rows.nth(r).locator('td').nth(cell);assert.ok(norm(await td.innerText()).length);await td.evaluate(e=>e.scrollIntoView({block:'center',inline:'center',behavior:'instant'}));await settle(p);
   const visible=await td.evaluate(e=>{const b=e.getBoundingClientRect(),w=e.closest('.i07-table-scroll').getBoundingClientRect();return {width:b.width,height:b.height,left:b.left,right:b.right,clipLeft:w.left,clipRight:w.right,top:b.top,bottom:b.bottom,sh:e.scrollHeight,ch:e.clientHeight};});
   assert.ok(visible.height>0&&visible.sh<=visible.ch+2);assert.ok(visible.right>visible.clipLeft&&visible.left<visible.clipRight);
  }
  await w.evaluate(e=>{e.scrollLeft=0;e.scrollIntoView({block:'start',behavior:'instant'});});await settle(p);await p.screenshot({path:`${out}/${id}-table-${t+1}.png`});result.tables.push({rows:await rows.count(),cells:await rows.count()*3,keyboard:geometry.sw<=geometry.cw?'fits':'scrolls'});
 }
 for(let n=1;n<=11;n++){
  const a=module.locator(`a[href="#i07-route-ref-${n}"]`).first();await a.focus();await settle(p);await a.press('Enter');await p.waitForURL(u=>u.hash===`#i07-route-ref-${n}`);await settle(p);const b=await p.locator(`#i07-route-ref-${n}`).boundingBox();assert.ok(b.y>=60&&b.y<1000,JSON.stringify(b));result.citations.push(n);
 }
 for(const n of [10,11]){const a=p.locator(`#stevia-segregation a[href="#research-stevia-rollout-source-${n}"]`);await a.focus();await settle(p);await a.press('Enter');await p.waitForURL(u=>u.hash===`#research-stevia-rollout-source-${n}`);await settle(p);assert.ok(await p.locator(`#research-stevia-rollout-source-${n}`).isVisible());}
 for(const file of ['sampling-record.csv','material-characterization.csv',`reader-${lang}.md`]){const name='stevia-segregation-'+file;const pending=p.waitForEvent('download');await p.locator(`#stevia-segregation a[href="/downloads/${name}"]`).click();const dl=await pending;assert.equal(dl.suggestedFilename(),name);const dest=`${out}/${id}-${name}`;await dl.saveAs(dest);assert.deepEqual(await fs.readFile(dest),await fs.readFile('public/downloads/'+name));result.downloads.push(name);}
 result.pass=true;
 }catch(e){result.pass=false;result.error=String(e);await p.screenshot({path:`${out}/${id}-failure.png`});}
 results.push(result);await fs.writeFile(`${out}/browser-results.json`,JSON.stringify({results,errors},null,2));await c.close();
}
assert.equal(errors.length,0);assert.ok(results.every(r=>r.pass),JSON.stringify(results.filter(r=>!r.pass)));console.log(`PASS ${results.length} cases; 612 table cells, 132 I07 citation journeys, 24 legacy citations, 36 real downloads; baseline DOM preserved`);
}finally{await browser.close();}
