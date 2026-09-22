import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
const expected=JSON.parse(readFileSync('tests/fixtures/astro7-route-order.json','utf8'));
const decode=s=>s.replace(/&#(?:x([0-9a-f]+)|(\d+));/gi,(_,h,d)=>String.fromCodePoint(parseInt(h||d,h?16:10))).replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
test('all routes match the production-derived Astro5 reference contract',()=>{
 assert.equal(Object.keys(expected).length,222);
 const files=readdirSync('dist',{recursive:true}).filter(f=>f.endsWith('.html')).sort();
 assert.deepEqual(files,Object.keys(expected).sort());
 const failures=[];
 for(const [file,hrefs] of Object.entries(expected)){
  const actual=[...readFileSync(`dist/${file}`,'utf8').matchAll(/<a\b[^>]*?\bhref="([^"]*)"/g)].map(m=>decode(m[1]));
  try{assert.deepEqual(actual,hrefs);}catch{failures.push(file);}
 }
 assert.deepEqual(failures,[]);
});
