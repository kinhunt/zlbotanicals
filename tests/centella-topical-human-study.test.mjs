import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const file='src/data/ingredient-reader-packs.json';
const packs=JSON.parse(fs.readFileSync(file,'utf8'));
const base=JSON.parse(execFileSync('git',['show','39f7350a893f54c9783b19d0324d774f5bbf845c:'+file],{encoding:'utf8',maxBuffer:10000000}));
const pack=packs.find(p=>p.productId==='centella-asiatica');
const original=base.find(p=>p.productId==='centella-asiatica');
test('Centella effects adds only the approved bilingual topical study with its own source',()=>{
 for(const lang of ['en','zh']){
  const draft=fs.readFileSync(`docs/evidence/centella-topical-human-study/INSERTIONS.${lang}.md`,'utf8');
  const expected=draft.split('\n').filter(line=>line.endsWith('[S15]')).slice(0,2).map(text=>({type:'paragraph',text:text.replaceAll('[S15]','[15]')}));
  assert.equal(expected.length,2);
  const effects=pack.content[lang].find(s=>s.id==='effects');
  assert.deepEqual(effects.blocks.slice(1,3),expected,'approved topical pair belongs after the EMA context');
  const stripped=structuredClone(pack.content[lang]);
  stripped.find(s=>s.id==='effects').blocks.splice(1,2);
  assert.deepEqual(stripped,original.content[lang],'all original prose/safety/patents/IDs preserved');
 }
 assert.deepEqual(pack.sources.find(s=>s.id===15),{id:15,title:'Ratz-Łyko et al. (2016). Moisturizing and Antiinflammatory Properties of Cosmetic Formulations Containing Centella asiatica Extract.',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC4852572/',accessed:'2026-09-27'});
 assert.deepEqual(pack.sources.filter(s=>s.id!==15),original.sources);
 assert.deepEqual(pack.plans,original.plans);
 assert.deepEqual(packs.filter(p=>p.productId!=='centella-asiatica'),base.filter(p=>p.productId!=='centella-asiatica'));
});
