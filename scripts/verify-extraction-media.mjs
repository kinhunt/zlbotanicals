import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';
import {execFileSync,spawnSync} from 'node:child_process';
const load=p=>JSON.parse(readFileSync(p,'utf8'));
const steps=load('src/data/extraction-video.json');
const timing=load('src/data/extraction-timing.json');
assert.deepEqual(steps,load('media/plant-extraction/src/steps.json'));
assert.deepEqual(timing,load('media/plant-extraction/src/timing.json'));
const captionsSource=load('media/plant-extraction/captions.json');
const reports=[];
const stamp=s=>{const m=Math.round(s*1000);return `${String(Math.floor(m/3600000)).padStart(2,'0')}:${String(Math.floor(m/60000)%60).padStart(2,'0')}:${String(Math.floor(m/1000)%60).padStart(2,'0')}.${String(m%1000).padStart(3,'0')}`;};
for(const lang of ['en','zh']){
 const file=`public/media/extraction-${lang}.mp4`;
 const metadata=JSON.parse(execFileSync('ffprobe',['-v','error','-show_entries','format=duration,size:stream=codec_type,codec_name,width,height,r_frame_rate,sample_rate,channels,duration','-of','json',file],{encoding:'utf8'}));
 assert.equal(metadata.streams.length,2,'Exactly video and narration streams required');
 const video=metadata.streams.find(s=>s.codec_type==='video');
 const audio=metadata.streams.find(s=>s.codec_type==='audio');
 assert.equal(video.codec_name,'h264');assert.equal(video.width,1280);assert.equal(video.height,720);assert.equal(video.r_frame_rate,'30/1');
 assert.equal(audio.codec_name,'aac');assert.ok(Number(audio.sample_rate)>=24000);
 assert.ok(Math.abs(Number(audio.duration)-timing.duration)<0.1);
 assert.ok(Math.abs(Number(metadata.format.duration)-timing.duration)<0.1);assert.ok(statSync(file).size<3_000_000);
 const bytes=readFileSync(file);assert.ok(bytes.indexOf('moov')<bytes.indexOf('mdat'),'MP4 must use faststart');
 const captions=readFileSync(`public/media/extraction-${lang}.vtt`,'utf8');
 assert.equal((captions.match(/-->/g)||[]).length,8);
 let end=0;
 const levels=[];
 for(const [i,[h,t]] of steps[lang].entries()){
  const scene=timing.scenes[i];assert.equal(scene.startFrame,end);end+=scene.durationInFrames;
  const start=scene.startFrame/timing.fps,finish=end/timing.fps;
  assert.ok(timing.leadSeconds+timing.segments[lang][i].duration+0.59<=finish-start,'Speech fits with natural lead/tail; no speed squeeze');
  assert.ok(captions.includes(`${stamp(start)} --> ${stamp(finish)}\n${h}. ${t}`));
  assert.equal(captionsSource[lang][i].startMs,Math.round(start*1000));
  assert.equal(captionsSource[lang][i].endMs,Math.round(finish*1000));
  const volume=spawnSync('ffmpeg',['-hide_banner','-ss',String(start),'-i',file,'-t',String(finish-start),'-af','volumedetect,silencedetect=noise=-45dB:d=0.3','-vn','-f','null','-'],{encoding:'utf8'});
  assert.equal(volume.status,0,volume.stderr);
  const mean=Number(volume.stderr.match(/mean_volume: ([-\d.]+) dB/)?.[1]);
  const peak=Number(volume.stderr.match(/max_volume: ([-\d.]+) dB/)?.[1]);
  assert.ok(Number.isFinite(mean)&&mean>-35,`${lang} scene ${i+1} must be audible, got ${mean}dB`);
  const silence=[...volume.stderr.matchAll(/silence_duration: ([\d.]+)/g)].reduce((s,m)=>s+Number(m[1]),0);
  assert.ok(silence/(finish-start)<0.65,`${lang} scene ${i+1} mostly silent`);
  levels.push({scene:i+1,meanDb:mean,peakDb:peak,silenceSeconds:Number(silence.toFixed(3))});
 }
 assert.equal(end,timing.durationInFrames);
 assert.ok(statSync(`public/media/extraction-${lang}.webp`).size<50_000);
 reports.push({lang,file,...metadata,levels});
}
console.log(JSON.stringify({passed:true,reports},null,2));
