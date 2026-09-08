import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

test('offline refresh is draft-only, deduplicates identifiers and refuses publication flags',()=>{
 assert.ok(fs.existsSync('scripts/refresh-editorial.mjs'),'refresh CLI exists');
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'editorial-'));
 const input=path.join(dir,'input.json'),output=path.join(dir,'draft.json');
 fs.writeFileSync(input,JSON.stringify([{pmid:'123',doi:'10.1000/ABC',title:'One'},{doi:'https://doi.org/10.1000/abc',title:'Duplicate'},{pmid:'456',title:'Second',status:'reviewed'}]));
 const run=()=>spawnSync(process.execPath,['scripts/refresh-editorial.mjs','--input',input,'--output',output],{encoding:'utf8'});
 assert.equal(run().status,0); assert.equal(run().status,0);
 const drafts=JSON.parse(fs.readFileSync(output));assert.equal(drafts.length,2);
 assert.ok(drafts.every(x=>x.status==='draft' && x.reviewRequired===true));
 assert.notEqual(spawnSync(process.execPath,['scripts/refresh-editorial.mjs','--input',input,'--publish']).status,0);
 assert.notEqual(spawnSync(process.execPath,['scripts/refresh-editorial.mjs','--input',input,'--output','src/data/research.json']).status,0);
 fs.rmSync(dir,{recursive:true});
});

test('draft importer rejects malformed data and symlinked publication paths without modifying published records',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'editorial-gate-'));
 const input=path.join(dir,'input.json');
 const original=fs.readFileSync('src/data/research.json','utf8');
 fs.writeFileSync(input,JSON.stringify([{title:'Missing identifier'}]));
 assert.notEqual(spawnSync(process.execPath,['scripts/refresh-editorial.mjs','--input',input,'--output',path.join(dir,'bad.json')]).status,0);
 fs.writeFileSync(input,JSON.stringify([{pmid:'123456',title:'Candidate'}]));
 fs.symlinkSync(path.resolve('src/data'),path.join(dir,'linked'),'dir');
 assert.notEqual(spawnSync(process.execPath,['scripts/refresh-editorial.mjs','--input',input,'--output',path.join(dir,'linked/research.json')]).status,0);
 assert.equal(fs.readFileSync('src/data/research.json','utf8'),original);
 fs.rmSync(dir,{recursive:true});
});

test('event cards remain dated historical records and renderers exclude drafts',()=>{
 const rows=JSON.parse(fs.readFileSync('src/data/news.json'));
 for(const r of rows){assert.match(r.eventDate,/^\d{4}-\d{2}-\d{2}$/);assert.ok(r.sourceUrl.startsWith('https://'));assert.ok(r.reviewScope);}
 for(const prefix of ['','zh/']){
  const html=fs.readFileSync(`dist/${prefix}resources/news/index.html`,'utf8');
  assert.ok(html.includes('2022-11-30'));assert.ok(html.includes(prefix?'历史事件':'Historical event'));
 }
 for(const component of ['ResearchCards','NewsCards'])assert.match(fs.readFileSync(`src/components/${component}.astro`,'utf8'),/status==='reviewed'/);
});

test('all bilingual product pages provide research, processing dossier and topic-specific paths',()=>{
 for(const lang of ['','zh/']) for(const slug of ['green-tea','turmeric','reishi-mushroom','ginseng','ginkgo-biloba','grape-seed','goji-berry','licorice-root','centella-asiatica','monk-fruit','stevia','resveratrol']){
  const html=fs.readFileSync(`dist/${lang}products/${slug}/index.html`,'utf8');
  assert.ok(html.includes('id="research"'),`${lang}${slug} research cards`);
  assert.ok(html.includes('id="processing-dossier"'));
  assert.ok(html.includes(`/${lang}resources/research`));
  assert.ok(html.includes(`/${lang}plant-extracts/`));
  assert.ok(!html.includes('"@type":"Offer"'));
 }
});

test('published research offers verified stable identifiers, bilingual context and explicit review scope for all products', () => {
 const path = 'src/data/research.json';
 assert.ok(fs.existsSync(path), 'research catalogue must exist');
 const rows=JSON.parse(fs.readFileSync(path));
 assert.equal(rows.length,12);
 assert.equal(new Set(rows.map(x=>x.id)).size,rows.length);
 for(const x of rows){
  assert.match(x.pmid,/^\d+$/); assert.ok(x.doi && x.title && x.authors && x.year);
  assert.equal(x.status,'reviewed'); assert.ok(x.reviewedAt && x.sourceUrl.startsWith('https://'));
  for(const lang of ['en','zh']) for(const k of ['scope','material','doseContext','limitations']) assert.ok(x[k][lang].length>20,`${x.id} ${k} ${lang}`);
 }
});
