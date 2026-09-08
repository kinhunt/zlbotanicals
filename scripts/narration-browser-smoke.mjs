import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const timing=JSON.parse(readFileSync('src/data/extraction-timing.json','utf8'));
const base=process.argv[2]||'http://127.0.0.1:4321';
const output=process.env.QA_OUTPUT||'/tmp/zl-narration-qa';mkdirSync(output,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[];
try{
 for(const lang of ['en','zh']){
  const page=await browser.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  assert.equal((await page.goto(`${base}/${lang==='zh'?'zh/':''}plant-extracts`)).status(),200);
  const video=page.locator('video');
  assert.equal(await video.evaluate(v=>v.paused&&!v.autoplay&&!v.muted),true);
  assert.ok((await page.locator('video source').getAttribute('src')).includes(`?v=${timing.version}`));
  // A real user gesture starts an unmuted media element and WebAudio context.
  await page.evaluate(()=>{
   const button=document.createElement('button');button.id='qa-play';button.textContent='Play narration';
   button.onclick=async()=>{
    const v=document.querySelector('video');
    const context=new AudioContext();const source=context.createMediaElementSource(v);const analyser=context.createAnalyser();
    source.connect(analyser);analyser.connect(context.destination);await context.resume();
    window.qaAudio={context,analyser};v.muted=false;v.volume=1;await v.play();
   };document.body.append(button);
  });
  await page.locator('#qa-play').click();
  await page.waitForFunction(()=>document.querySelector('video').currentTime>1);
  const energy=await page.evaluate(async()=>{
   const a=window.qaAudio.analyser;let peak=0;
   for(let i=0;i<30;i++){const data=new Float32Array(a.fftSize);a.getFloatTimeDomainData(data);peak=Math.max(peak,...data.map(Math.abs));await new Promise(r=>setTimeout(r,50));}
   return {peak,state:window.qaAudio.context.state,muted:document.querySelector('video').muted};
  });
  assert.equal(energy.state,'running');assert.equal(energy.muted,false);assert.ok(energy.peak>0.01,'Decoded narration must reach audio output graph');
  await video.evaluate(v=>{v.pause();v.textTracks[0].mode='showing';v.currentTime=v.duration-1;});
  await page.waitForFunction(()=>document.querySelector('track').readyState===2);
  const meta=await video.evaluate(v=>({duration:v.duration,decodedAudioBytes:v.webkitAudioDecodedByteCount,cues:[...v.textTracks[0].cues].map(c=>({start:c.startTime,end:c.endTime,text:c.text}))}));
  assert.ok(Math.abs(meta.duration-timing.duration)<0.1);assert.equal(meta.cues.length,8);
  assert.ok(Math.abs(meta.cues.at(-1).end-timing.duration)<0.01);
  await page.locator('#video-transcript summary').click();
  await video.screenshot({path:`${output}/video-${lang}.png`});
  assert.deepEqual(errors,[]);results.push({lang,energy,...meta,passed:true});await page.close();
 }
 writeFileSync(`${output}/results.json`,JSON.stringify({base,results},null,2));
 console.log(JSON.stringify({passed:true,base,results},null,2));
}finally{await browser.close();}
