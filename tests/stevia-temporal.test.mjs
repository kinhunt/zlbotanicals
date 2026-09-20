import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
for(const lang of ['en','zh']) test(`${lang} stevia temporal guide renders a distinct practical method and source journeys`,()=>{
 const prefix=lang==='zh'?'zh/':''; const route=prefix+'resources/blog/stevia-temporal-sensory';
 assert.ok(existsSync(`dist/${route}/index.html`),'temporal guide route exists');
 const html=readFileSync(`dist/${route}/index.html`,'utf8');
 assert.ok(html.includes(`https://zlbotanicals.com/${route}`));
 for(const id of ['stevia-method','stevia-interpret','stevia-download','stevia-ref-1','stevia-ref-2']) {
  assert.equal((html.match(new RegExp(`id="${id}"`,'g'))||[]).length,1);
  assert.ok(html.includes(`href="#${id}"`));
 }
 for(const target of ['products/stevia','plant-extracts/ingredients/stevia','solutions/beverages']) assert.ok(html.includes(`href="/${prefix}${target}"`));
 for(const hub of ['resources','resources/application-guides','resources/blog','products/stevia']) assert.ok(readFileSync(`dist/${prefix}${hub}/index.html`,'utf8').includes(`/${route}`),`${hub} discovers guide`);
 assert.match(html,/126/); assert.match(html,/0\.10%/); assert.match(html,/14%/);
 assert.ok(html.includes(lang==='en'?'not a continuous time–intensity curve':'不是连续时间—强度曲线'));
});

for(const lang of ['en','zh']) test(`${lang} downloadable record is blank and preserves protocol boundaries`,()=>{
 const file=`stevia-temporal-sensory-${lang}.txt`;
 assert.ok(existsSync(`dist/downloads/${file}`),'download exists');
 const txt=readFileSync(`dist/downloads/${file}`,'utf8');
 for(const marker of ['v1.0','0–10','5','60','____']) assert.ok(txt.includes(marker));
 assert.ok(txt.includes(lang==='en'?'Missing is blank, not zero':'漏记留空，不填零'));
 assert.ok(txt.includes(lang==='en'?'Normal-drinking follow-up':'正常饮用复评'));
 const html=readFileSync(`dist/${lang==='zh'?'zh/':''}resources/blog/stevia-temporal-sensory/index.html`,'utf8');
 assert.ok(html.includes(`href="/downloads/${file}" download`));
});
