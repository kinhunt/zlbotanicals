import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const dir='docs/evidence/tea-haze/';
const hash=s=>createHash('sha256').update(s).digest('hex');
const read=p=>readFileSync(p,'utf8');
const norm=t=>t.replace(/\s+/g,'').replaceAll('’',"'").replaceAll('“','"').replaceAll('”','"');
test('approved artifacts and complete claim quotations keep original hashes and locators',()=>{
 const manifest=JSON.parse(read(dir+'sha256.json'));
 for(const [file,expected] of Object.entries(manifest))assert.equal(hash(readFileSync(dir+file)),expected,file);
 const acceptance=JSON.parse(read(dir+'acceptance.json'));
 for(const lang of ['en','zh'])assert.equal(manifest[`tea-haze-diagnosis.${lang}.md`],acceptance.sha256[`tea-paper/tea-haze-diagnosis.${lang}.md`]);
 const claims=JSON.parse(read(dir+'claim-locations.json'));assert.equal(claims.length,11);
 for(const claim of claims){assert.equal(hash(readFileSync(dir+claim.artifact)),claim.sha256);assert.ok(norm(read(dir+claim.artifact).split('\n')[claim.line-1]).includes(norm(claim.quote)));}
});
test('integration preserves every approved body line except citation markup and table wrappers',()=>{
 for(const lang of ['en','zh']){
 const original=read(dir+`tea-haze-diagnosis.${lang}.md`).split('\n## Sources\n')[0].split('\n').slice(1);
 const integrated=read(`src/content/blog/${lang}/tea-haze-diagnosis.md`).replace(/<a href="#tea-haze-ref-([1-4])">\[\1\]<\/a>/g,'[$1]');
 for(const line of original)if(line.trim())assert.ok(integrated.includes(line),`${lang}: ${line.slice(0,80)}`);
 assert.match(integrated,/category: "research"/);assert.match(integrated,/guideCategory: "application-guides"/);
 }
});
