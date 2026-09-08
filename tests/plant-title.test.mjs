import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('plant extracts hubs use exact keyword titles and H1',()=>{
 for(const [p,title] of [['plant-extracts','Plant Extracts'],['zh/plant-extracts','植物提取物']]){
 const s=readFileSync(`dist/${p}/index.html`,'utf8');
 assert.ok(s.includes(`<title>${title}</title>`));
 assert.match(s,new RegExp(`<h1[^>]*>${title}</h1>`));
 assert.ok(s.includes(`property="og:title" content="${title}"`));
 }
});
