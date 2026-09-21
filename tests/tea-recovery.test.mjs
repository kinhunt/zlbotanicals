import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8');
for(const [lang,prefix] of [['en',''],['zh','zh/']]) test(`${lang}: existing tea hub offers native manual-record disclosures and downloads`,()=>{
 const html=read(`dist/${prefix}products/tea-extracts/index.html`);
 assert.match(html,/id="tea-recovery"/);
 assert.match(html,/<details[^>]*data-tea-recovery-module/);
 assert.match(html,/<details[^>]*data-tea-recovery-guide/);
 for(const file of ['boundary.blank.csv','acceptance.blank.csv','streams.blank.csv','reader.bilingual.md']) assert.ok(html.includes(`/downloads/tea-recovery-${file}`),file);
 for(const id of [6,7]) {
  assert.ok(html.includes(`href="#tea-recovery-ref-${id}"`));
  assert.equal(html.split(`id="tea-recovery-ref-${id}"`).length-1,1);
 }
 assert.match(html,lang==='en'?/manual records, not an automatic calculator/:/手工记录表，不是自动计算器/);
});

test('all approved CSV bytes and reader-field instructions survive publication',()=>{
 for(const name of ['boundary','acceptance','streams']) assert.deepEqual(readFileSync(`dist/downloads/tea-recovery-${name}.blank.csv`),readFileSync(`docs/evidence/tea-recovery/revision/${name}.blank.csv`));
 const guide=read('dist/downloads/tea-recovery-reader.bilingual.md');
 const approved=read('docs/evidence/tea-recovery/revision/worksheet-spec.bilingual.md');
 assert.ok(guide.includes(approved.split('## 1.')[1].split('Run `python -B')[0]));
 assert.doesNotMatch(guide,/validate\.py|independent re-review|schema\.json|Python tests|Original evidence, citation ledger/);
 for(const [lang,prefix] of [['en',''],['zh','zh/']]) {
  const html=read(`dist/${prefix}products/tea-extracts/index.html`);
  assert.equal((html.match(/data-recovery-dictionary=/g)||[]).length,3);
  assert.equal((html.match(/<table/g)||[]).length,0,'lookup dictionaries use stacked field cards, not wide tables');
  assert.doesNotMatch(html,/\*\*/);
  const module=read(`docs/evidence/tea-recovery/revision/module.${lang}.md`).split('\n## Sources\n')[0];
  const strip=s=>s.replace(/<[^>]*>/g,'').replace(/&#(?:39|x27);/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
  const visible=strip(html);
  for(const paragraph of module.split('\n\n').slice(1)) assert.ok(visible.includes(strip(paragraph.replace(/\*\*/g,''))),paragraph);
 }
});
