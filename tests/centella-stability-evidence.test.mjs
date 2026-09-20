import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const dir='docs/evidence/centella-stability/';
const read=p=>readFileSync(p,'utf8');
const hash=b=>createHash('sha256').update(b).digest('hex');
const plain=s=>s.replace(/<a href="#centella-stability-ref-([12])">\[\1\]<\/a>/g,'[$1]').replace(/<[^>]*>/g,'').replace(/\*\*/g,'').replaceAll('&amp;','&').replaceAll('&gt;','>').replaceAll('&lt;','<').replaceAll('&#x27;',"'").replaceAll('&#39;',"'").replaceAll('&quot;','"').replace(/\s+/g,'');
test('Centella original evidence bytes and ledger remain complete',()=>{
 const manifest=JSON.parse(read(dir+'manifest.json'));assert.equal(Object.keys(manifest).length,77);
 for(const [file,record] of Object.entries(manifest)){const bytes=readFileSync(dir+file);assert.equal(bytes.length,record.bytes,file);assert.equal(hash(bytes),record.sha256,file);}
 const claims=JSON.parse(read(dir+'claim-quotes.json'));assert.equal(claims.length,30);
 for(const claim of claims){const section=read(`${dir}evidence/${claim.locator}-molecules-29-05583.txt`);assert.ok(plain(section).includes(plain(claim.quote)),claim.locator);}
});
test('Centella complete approved prose and all table cells survive integration with review N1/N2/N3 corrections',()=>{
 for(const lang of ['en','zh']){
  const original=read(dir+`centella-cold-process-stability.${lang}.md`);
  let corrected=original.replace('海藻酸钠','海藻酸（Algin）');
  for(const [before,after] of JSON.parse(read(dir+'approved-edits.json'))[lang]){assert.ok(corrected.includes(before));corrected=corrected.replace(before,after);}
  assert.equal(read(dir+`approved-corrected.${lang}.md`),corrected);
  const integrated=plain(read(`src/content/blog/${lang}/centella-cold-process-stability.md`));
  for(const line of corrected.split('\n## Sources\n')[0].split('\n').slice(1)){
   if(!line.trim()||/^\|[-|: ]+\|$/.test(line))continue;
   for(const cell of line.startsWith('|')?line.split('|').filter(c=>c.trim()):[line])assert.ok(integrated.includes(plain(cell)),`${lang}: ${cell.slice(0,90)}`);
  }
 }
});
