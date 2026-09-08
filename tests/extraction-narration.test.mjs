import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';

test('both delivered extraction videos contain audible AAC narration',()=>{
 for(const lang of ['en','zh']){
  const file=`public/media/extraction-${lang}.mp4`;
  const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-of','json',file]));
  assert.ok(probe.streams.some(s=>s.codec_type==='audio' && s.codec_name==='aac'),`${lang}: AAC narration required`);
 }
 execFileSync('node',['scripts/verify-extraction-media.mjs'],{stdio:'pipe'});
});
