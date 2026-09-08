import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const steps=JSON.parse(readFileSync('src/data/extraction-video.json','utf8'));
assert.deepEqual(steps,JSON.parse(readFileSync('media/plant-extraction/src/steps.json','utf8')));
const reports=[];
for(const lang of ['en','zh']){
 const file=`public/media/extraction-${lang}.mp4`;
 const metadata=JSON.parse(execFileSync('ffprobe',['-v','error','-show_entries','format=duration,size:stream=codec_name,width,height,r_frame_rate','-of','json',file],{encoding:'utf8'}));
 assert.equal(metadata.streams.length,1,'Silent video should not ship unused audio');
 const video=metadata.streams[0];assert.equal(video.codec_name,'h264');assert.equal(video.width,1280);assert.equal(video.height,720);assert.equal(video.r_frame_rate,'30/1');
 assert.equal(Number(metadata.format.duration),40);assert.ok(statSync(file).size<3_000_000);
 const bytes=readFileSync(file);assert.ok(bytes.indexOf('moov')<bytes.indexOf('mdat'),'MP4 must use faststart');
 const captions=readFileSync(`public/media/extraction-${lang}.vtt`,'utf8');
 assert.equal((captions.match(/-->/g)||[]).length,8);
 for(const [h,t] of steps[lang])assert.ok(captions.includes(h+'. '+t));
 assert.ok(statSync(`public/media/extraction-${lang}.webp`).size<50_000);
 reports.push({lang,file,...metadata});
}
console.log(JSON.stringify({passed:true,reports},null,2));
