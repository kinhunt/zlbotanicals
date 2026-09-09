import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const data=JSON.parse(readFileSync('src/data/deep-ingredients.json','utf8'));
const by=id=>data.find(k=>k.productId===id);

test('monk fruit III E research sentence cites source 8 separately from regulatory records',()=>{
 for(const lang of ['en','zh']) {
  const text=by('monk-fruit').content[lang].find(s=>s.id==='insights').blocks[0].text;
  assert.match(text,lang==='en'?/material status\.\[5\]\[6\]\[7\] The original III E abstract reports structural conversion and resin purification\.\[8\]/:/监管记录。\[5\]\[6\]\[7\] 原始III E论文摘要展示结构转化与树脂纯化的实验结果。\[8\]/);
 }
});

test('published stevia source titles retain clean Unicode without changing source identities',()=>{
 const sources=by('stevia').sources;
 assert.equal(sources.find(s=>s.id===6).title,'JECFA — Steviol glycosides');
 assert.equal(sources.find(s=>s.id===8).title,'Approval report – Application A1268');
 assert.doesNotMatch(JSON.stringify(sources),/â|Ã|�/);
 assert.equal(sources.find(s=>s.id===8).url,'https://www.foodstandards.gov.au/sites/default/files/2023-11/A1268%20Approval%20Report.pdf');
});

test('goji source 39 separates traditional optimization from three apparatus yields in EN/ZH',()=>{
 for(const lang of ['en','zh']) {
  const sections=by('goji-berry').content[lang];
  const body=JSON.stringify(sections);
  assert.doesNotMatch(body,/20\/40|controlled pulsing|固定声功率密度300 W\/L及脉冲方式/);
  const process=sections.find(s=>s.id==='processes').blocks.find(b=>b.text?.includes('[39]')).text;
  for(const value of ['30 min','60°C','20 g/600 mL','300 W/L','28 kHz','38.93%','33.60%','26.38%']) assert.ok(process.includes(value),`${lang}: missing ${value}`);
  if(lang==='en') {
   assert.match(process,/counterflow dual-frequency.*38\.93%/);
   assert.match(process,/opposite-sit dual-frequency.*33\.60%/);
   assert.match(process,/counterflow single-frequency.*26\.38%/);
   assert.match(process,/does not establish complete frequency pairs or pulse settings/);
  } else {
   assert.match(process,/能量聚集逆流双频.*38\.93%/);
   assert.match(process,/对置双频.*33\.60%/);
   assert.match(process,/能量聚集逆流单频.*26\.38%/);
   assert.match(process,/未给出.*完整频率组合或脉冲设置/);
  }
  for(const id of ['equipment','insights']) {
   const rows=sections.find(s=>s.id===id).blocks.filter(b=>b.type==='table').flatMap(b=>b.rows).filter(r=>r.join(' ').includes('[39]'));
   assert.equal(rows.length,1);
   assert.match(rows[0].join(' '),lang==='en'?/optimization context/:/优化背景/);
  }
 }
});
