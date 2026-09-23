import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const fixtures=JSON.parse(readFileSync(new URL('./fixtures/responsive-mobile-labels.json',import.meta.url),'utf8'));
// Frozen labels and values originate from the read-only PR59 audit, not the fix.
for(const f of fixtures) test(`responsive cells retain accessible mobile field labels: ${f.route}`,()=>{
 const html=readFileSync(`dist${f.route}/index.html`,'utf8');
 const tables=[...html.matchAll(/<table\b[^>]*>[\s\S]*?<\/table>/g)].map(m=>m[0]);
 for(const expected of f.tables){
  const cells=[...tables[expected.index].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/g)].map(m=>m[1]);
  assert.equal(cells.length,expected.cells.length);
  for(const c of expected.cells){
   const label=cells[c.index].match(/<span\b([^>]*class="mobile-label"[^>]*)>([\s\S]*?)<\/span>/);
   assert.ok(label,`cell ${c.index} missing mobile label`);
   assert.equal(label[2],c.label);
   assert.doesNotMatch(label[1],/aria-hidden\s*=\s*["']true["']/i,`cell ${c.index}: field label hidden from accessibility tree`);
  }
 }
});
