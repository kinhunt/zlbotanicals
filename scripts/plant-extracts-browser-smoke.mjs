import assert from 'node:assert/strict';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const data=JSON.parse(readFileSync('src/data/plant-extracts.json','utf8'));
const base=process.argv[2]||'http://127.0.0.1:4321';
const output=process.env.QA_OUTPUT||'/tmp/zl-plant-qa';mkdirSync(output,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[];
try {
 for(const width of [390,1024,1280,1440]) for(const lang of ['en','zh']){
  const page=await browser.newPage({viewport:{width,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const prefix=lang==='zh'?'/zh':'';
  const routes=['',...data.sections.map(s=>'/'+s.slug),...data.topics.map(t=>'/'+t.section+'/'+t.slug)];
  for(const route of routes){
   const r=await page.goto(base+prefix+'/plant-extracts'+route,{waitUntil:'domcontentloaded'});
   assert.equal(r.status(),200);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('html').getAttribute('lang'),lang);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`overflow ${width} ${lang} ${route}`);
   const canon=await page.locator('link[rel="canonical"]').getAttribute('href');
   assert.equal(canon,'https://zlbotanicals.com'+prefix+'/plant-extracts'+route);
   const bad=await page.locator('main a[href^="/"]').evaluateAll((els,zh)=>els.map(e=>e.getAttribute('href')).filter(h=>!h.startsWith('/media/') && (zh?!h.startsWith('/zh'):h.startsWith('/zh'))),lang==='zh');
   assert.deepEqual(bad,[],`unlocalized content links ${lang} ${route}`);
  }
  await page.goto(base+prefix+'/plant-extracts',{waitUntil:'networkidle'});
  await page.screenshot({path:`${output}/hub-${lang}-${width}.png`,fullPage:true});
  const video=page.locator('video');
  assert.equal(await video.evaluate(v=>v.paused),true);
  assert.equal(await video.getAttribute('preload'),'none');
  assert.equal(await video.evaluate(v=>v.autoplay),false);
  await video.evaluate(v=>{v.muted=true;return v.play();});
  await page.waitForFunction(()=>document.querySelector('video').currentTime>0.1);
  const meta=await video.evaluate(v=>({duration:v.duration,width:v.videoWidth,height:v.videoHeight}));
  assert.ok(meta.duration>=39.9&&meta.duration<41);assert.equal(meta.width,1280);assert.equal(meta.height,720);
  await video.evaluate(v=>{v.pause();v.textTracks[0].mode='showing';});
  await page.waitForFunction(()=>document.querySelector('track').readyState===2);
  assert.equal(await page.locator('track').evaluate(t=>t.track.cues.length),8);
  await page.locator('#video-transcript summary').click();assert.equal(await page.locator('#video-transcript').getAttribute('open'),'');
  if(width===390){
   await page.locator('#open-menu').click();
   assert.equal(await page.locator('#open-menu').getAttribute('aria-expanded'),'true');
   await page.keyboard.press('Escape');
  }
  await page.goto(base+prefix+'/plant-extracts/processes',{waitUntil:'networkidle'});
  await page.screenshot({path:`${output}/processes-${lang}-${width}.png`,fullPage:true});
  assert.deepEqual(errors,[]);
  results.push({width,lang,routes:routes.length,video:meta,captions:8,passed:true});await page.close();
 }
 const page=await browser.newPage({javaScriptEnabled:false});
 await page.goto(base+'/zh/plant-extracts');assert.ok(await page.locator('main a[href="/zh/plant-extracts/basics"]').count()>0);await page.close();
 writeFileSync(output+'/results.json',JSON.stringify({base,results,noJavaScript:true},null,2));
 console.log(JSON.stringify({passed:true,combinations:results.length,routeVisits:results.reduce((n,r)=>n+r.routes,0),noJavaScript:true,output}));
}finally{await browser.close();}
