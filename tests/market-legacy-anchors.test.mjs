import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const baseline=JSON.parse(readFileSync('tests/fixtures/market-legacy-anchors.json','utf8'));
for(const lang of ['en','zh'])test(`${lang}: all real-base non-bibliographic anchors remain unique`,()=>{
 const source=execFileSync('git',['show',`${baseline.base}:src/articles/functional-mushrooms.${lang}.md`],{encoding:'utf8'});
 const original=[...source.matchAll(/id="([^"]+)"/g)].map(m=>m[1]).filter(id=>!id.startsWith('market-v3-ref-'));
 assert.deepEqual(baseline.ids[lang],original);
 const html=readFileSync(`dist/${lang==='zh'?'zh/':''}research/market/functional-mushrooms/index.html`,'utf8');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.deepEqual(original.filter(id=>ids.filter(v=>v===id).length!==1),[],'missing/duplicate old anchors');
});
