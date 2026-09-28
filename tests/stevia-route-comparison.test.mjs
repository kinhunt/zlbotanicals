import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=p=>readFileSync(p,'utf8');
for (const [lang,prefix] of [['en',''],['zh','zh/']]) {
 test(`${lang}: all reviewed module wording and table cells are byte-preserved`,()=>{
  const approvedHashes={en:'15b926dc4ccfb35bec1379de4ff7574bcd720dd54bc0239d981363e88164d407',zh:'2ec148b5038d352c1cea0fb269d9db4c5c72cbf01b106ed366c9397f36e79278'};
  const original=read(`src/data/stevia-route-comparison/${lang}.md`).replace(/<div class="i07-table-scroll"[^>]*>\n\n/g,'').replace(/\n\n<\/div>/g,'');
  assert.equal(createHash('sha256').update(original).digest('hex'),approvedHashes[lang]);
 });
 test(`${lang}: reviewed I07 module is rendered only inside existing stevia standards`,()=>{
  const html=read(`dist/${prefix}plant-extracts/ingredients/stevia/index.html`);
  assert.match(html,/id="stevia-route-comparison"/);
  const module=html.split(/<section id="stevia-route-comparison"[^>]*>/)[1].split('</section>')[0];
  assert.equal((module.match(/<table/g)||[]).length,3);
  assert.equal((module.match(/class="i07-table-scroll" role="region" tabindex="0" aria-label=/g)||[]).length,3);
  assert.match(module,/data-i07-scroll-hint/);
  assert.deepEqual([...module.matchAll(/<tbody>([\s\S]*?)<\/tbody>/g)].map(m=>(m[1].match(/<tr/g)||[]).length),[5,6,6]);
  assert.equal((module.match(/id="i07-route-ref-/g)||[]).length,11);
  for(const m of module.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${m[1]}"`));
  assert.ok(html.indexOf('id="standards"')<html.indexOf('id="stevia-route-comparison"'));
  assert.ok(html.indexOf('data-procurement-link',html.indexOf('id="stevia-route-comparison"'))>html.indexOf('id="stevia-route-comparison"'));
  assert.match(html,/href="#stevia-route-comparison"/);
  assert.match(html,/id="stevia-segregation"/);
  for(let n=1;n<=11;n++) assert.match(html,new RegExp(`id="research-stevia-rollout-source-${n}"`));
  assert.doesNotMatch(module,/<h[12][ >]/);
 });
}
