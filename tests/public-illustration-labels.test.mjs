import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
const labels=/AI\s*(?:绘制|生成)|AI[- ](?:illustration|generated)/i;
function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]);}
test('public source and rendered pages omit AI drawing labels',()=>{
 for(const p of files('src').filter(p=>/\.(astro|json|ts|md)$/.test(p))) assert.doesNotMatch(readFileSync(p,'utf8'),labels,p);
 const pages=files('dist').filter(p=>p.endsWith('.html'));assert.ok(pages.length>=200);
 for(const p of pages) assert.doesNotMatch(readFileSync(p,'utf8'),labels,p);
});
