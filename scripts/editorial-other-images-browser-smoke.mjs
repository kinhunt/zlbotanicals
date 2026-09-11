import assert from 'node:assert/strict';
import {readFileSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
import {join,relative} from 'node:path';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:4321';
const out=process.env.QA_OUTPUT||'docs/evidence/editorial-landscape/other-browser';mkdirSync(out,{recursive:true});
function walk(p){return readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(p,e.name)):[join(p,e.name)]);}
const routes=walk('dist').filter(p=>p.endsWith('/index.html')&&/(?:resources\/blog|solutions|odm)\/.+\/index.html$/.test(p)).map(p=>'/'+relative('dist',p).replace(/\/index.html$/,''));
assert.ok(routes.length>=24);
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});const results=[];
try{
 for(const js of [true,false]) for(const width of [390,1440]){
  const c=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:950}});
  for(const route of routes){
   const p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));assert.equal((await p.goto(base+route)).status(),200);await p.evaluate(()=>document.fonts.ready);
   // Open concept disclosures so hidden illustrations are measured as rendered content.
   await p.evaluate(()=>document.querySelectorAll('main details').forEach(d=>d.open=true));
   const images=[];
   for(const image of await p.locator('main img').all()){
    await image.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));await image.evaluate(el=>el.decode());
    const d=await image.evaluate(el=>({src:el.getAttribute('src'),w:el.naturalWidth,h:el.naturalHeight}));const b=await image.boundingBox();
    assert.ok(d.w>d.h,`${route}/${d.src}: portrait file`);assert.ok(b.width>b.height,`${route}/${d.src}: portrait frame`);images.push(d);
   }
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,route);assert.deepEqual(errors,[]);
   results.push({route,width,js,images});await p.close();
  }await c.close();
 }
 writeFileSync(`${out}/results.json`,JSON.stringify({passed:true,cases:results.length,routes:routes.length,results},null,2));console.log(JSON.stringify({passed:true,cases:results.length,routes:routes.length}));
}finally{await browser.close();}
