import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

for (const prefix of ['', 'zh/']) {
 test(`goji commercial references are inside existing components, never sales: ${prefix || 'en'}`, () => {
  const html=readFileSync(`dist/${prefix}plant-extracts/ingredients/goji-berry/index.html`,'utf8');
  const start=html.indexOf('id="goji-commercial-materials"');
  assert.ok(start>0,'reviewed commercial module must render');
  assert.ok(start>html.indexOf('id="components"'));
  assert.ok(start<html.indexOf('id="applications"'));
  const module=html.slice(start,html.indexOf('<!-- /goji-commercial-materials -->',start));
  assert.equal((module.match(/data-goji-reference-card/g)||[]).length,3);
  assert.doesNotMatch(module,/<table\b/);
  for(const card of module.split('data-goji-reference-card').slice(1)) {
   const body=card.split('</section>')[0];
   assert.match(body, /href="#goji-commercial-ref-C[145]"/, 'each card declaration needs its own native citation');
  }
  for(const id of ['C1','C4','C5','S1']) {
   assert.ok(module.includes(`href="#goji-commercial-ref-${id}"`));
   assert.equal((html.match(new RegExp(`id="goji-commercial-ref-${id}"`,'g'))||[]).length,1);
  }
  for(const text of ['Kalustyan','ORGANICWAY','Croda','Water (and) Glycerin (and) Lycium Barbarum Fruit Extract','2026-09-24']) assert.ok(module.includes(text),text);
  const sales=readFileSync(`dist/${prefix}products/goji-berry/index.html`,'utf8');
  assert.doesNotMatch(sales,/Kalustyan|ORGANICWAY|Croda|goji-commercial-materials/);
 });
}
