import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
test('sales pages retain exact ingredient science and sourcing-tool links',()=>{
 for(const prefix of ['', 'zh/']){
 const text=readFileSync(`dist/${prefix}products/green-tea/index.html`,'utf8');
 assert.ok(text.includes(`href="/${prefix}plant-extracts/ingredients/green-tea#standards"`));
 assert.ok(text.includes(`href="/${prefix}resources/downloads#sourcing-checklist"`));
 assert.ok(!text.includes('General guides for all ingredients'));
 }
});
test('all industry pages connect recommendations and relevant guides',()=>{
 for(const prefix of ['', 'zh/'])for(const industry of ['beverages','food','cosmetics','nutraceuticals']){
 const text=readFileSync(`src/pages/${prefix}solutions/${industry}.astro`,'utf8');
 assert.ok(text.includes(`<IndustryResources lang="${prefix?'zh':'en'}" industry="${industry}"`),`${prefix}${industry}`);
 }
});
