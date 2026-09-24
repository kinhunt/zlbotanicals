import {chromium} from '/tmp/zl-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const base=process.env.QA_URL||'http://127.0.0.1:8917',out=process.env.QA_OUT||'/data/hermes/research/seo-growth/2026-09-24-schisandra-release/browser';
mkdirSync(out,{recursive:true});
const slug='schisandra-beverage-materials',results=[];
const b=await chromium.launch({headless:true});
async function settle(p){await p.waitForTimeout(1800);}
try{for(const width of [320,390,1440])for(const lang of ['en','zh'])for(const js of [true,false]){
 const key=`${lang}-${width}-${js?'js':'nojs'}`,c=await b.newContext({viewport:{width,height:900},javaScriptEnabled:js});
 const rec={key,passed:false,citations:0,inbound:0,outbound:0,mobileCells:0,rowHeaders:0,desktopHeaders:0,screenshots:[]};results.push(rec);
 const p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(String(e)));
 await c.route('**/*',route=>['GET','HEAD'].includes(route.request().method())?route.continue():route.abort());
 const pre=lang==='zh'?'/zh':'',url=base+pre+'/resources/blog/'+slug+'/';
 const load=async()=>{const res=await p.goto(url);assert.equal(res.status(),200);await p.evaluate(()=>document.fonts.ready);};
 const snap=async name=>{const path=`${out}/${key}-${name}.png`;await p.screenshot({path});rec.screenshots.push(path);};
 await load();assert.equal(await p.locator('h1').count(),1);assert.equal(await p.locator('.schisandra-table').count(),3);
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 assert.ok(!(await p.locator('article').innerText()).includes('**'));await snap('hero');
 for(let t=0;t<3;t++){
  const tab=p.locator('.schisandra-table').nth(t),headers=await tab.locator('thead th').allTextContents();
  const rows=tab.locator('tbody tr');
  if(width<640){for(let i=0;i<await rows.count();i++){
   const row=rows.nth(i),cells=row.locator('th,td');
   for(let j=0;j<await cells.count();j++){
    const cell=cells.nth(j),v=await cell.locator('.cell-value').innerText(),aria=await cell.ariaSnapshot();
    assert.ok(aria.includes(headers[j]),aria);assert.ok(aria.includes(v.replace(/\s+/g,' ')),aria);
    if(j===0)rec.rowHeaders++;else rec.mobileCells++;
   }
   if(js){await row.evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-90,behavior:'instant'}));await snap(`table${t+1}-row${i+1}`);}
  }}else{
   for(const h of await tab.locator('thead th').all()){assert.ok(await h.isVisible());assert.ok((await h.ariaSnapshot()).includes((await h.innerText())));rec.desktopHeaders++;}
   if(js){await tab.evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-90,behavior:'instant'}));await snap(`table${t+1}`);}
  }
 }
 // Fresh native keyboard citation journeys; do not reposition destinations.
 for(let i=1;i<=5;i++){
  await load();const a=p.locator(`article a[href="#schisandra-ref-${i}"]`).first();await a.focus();await settle(p);await a.press('Enter');await p.waitForURL(u=>u.hash===`#schisandra-ref-${i}`);await settle(p);
  const box=await p.locator(`#schisandra-ref-${i}`).boundingBox();assert.ok(box.y>=64&&box.y<900,JSON.stringify(box));rec.citations++;
 }
 await snap('sources');
 for(const route of ['research','solutions/beverages','resources/application-guides','resources/blog']){
  assert.equal((await p.goto(base+pre+'/'+route+'/')).status(),200);
  const a=p.locator(`a[href="${pre}/resources/blog/${slug}"]`).first();await a.focus();await settle(p);await a.press('Enter');await p.waitForURL(u=>u.pathname.includes(slug));await p.waitForLoadState();assert.equal(await p.locator('.schisandra-table').count(),3);rec.inbound++;
 }
 for(const route of ['solutions/beverages','plant-extracts/ingredients']){
  await load();const a=p.locator(`article .prose a[href="${pre}/${route}"]`).last();await a.focus();await settle(p);await a.press('Enter');await p.waitForURL(u=>u.pathname.replace(/\/$/,'')===pre+'/'+route);rec.outbound++;
 }
 await load();const alternate=lang==='en'?'/zh/resources/blog/'+slug:'/resources/blog/'+slug;
 await p.locator(`article nav a[href="${alternate}"]`).click();await p.waitForURL(u=>u.pathname.replace(/\/$/,'')===alternate);rec.language=true;
 assert.deepEqual(errors,[]);rec.passed=true;writeFileSync(out+'/results.json',JSON.stringify(results,null,2));await c.close();
 }}finally{writeFileSync(out+'/results.json',JSON.stringify(results,null,2));await b.close();}
console.log(JSON.stringify({passed:results.filter(r=>r.passed).length,total:results.length}));
