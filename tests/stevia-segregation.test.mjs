import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8');
test('approved wording, unit examples and CSV bytes are preserved',()=>{
 for(const lang of ['en','zh']) {
  const approved=read(`docs/evidence/stevia-segregation/${lang}.md`).split('\n## Sources\n')[0];
  const normalized=read(`src/data/stevia-segregation/${lang}.md`)
   .replace(/^(#{4,5}) /gm,m=>m.slice(1))
   .replace(/\[(10|11)\]\(#research-stevia-rollout-source-\d+\)/g,(_,n)=>`[${Number(n)-9}]`)
   .replace(/<a href="\/downloads\/stevia-segregation-([^"]+)" download>([^<]+)<\/a>/g,'[$2]($1)');
  assert.equal(normalized,approved);
  const heading=lang==='en'?'Checking the files':'文件检查';
  assert.equal(read(`dist/downloads/stevia-segregation-reader-${lang}.md`),read(`docs/evidence/stevia-segregation/reader-${lang}.md`).split(`\n## ${heading}\n`)[0].trimEnd()+'\n');
 }
 for(const name of ['sampling-record','material-characterization']) assert.deepEqual(readFileSync(`dist/downloads/stevia-segregation-${name}.csv`),readFileSync(`docs/evidence/stevia-segregation/${name}.csv`));
 const pack=JSON.parse(read('src/data/ingredient-reader-packs.json')).find(p=>p.productId==='stevia');
 assert.equal(new Set(pack.sources.map(s=>s.url)).size,pack.sources.length);
 assert.equal(pack.sources.find(s=>s.id===10).url,'https://documents.thermofisher.com/TFS-Assets/CMD/Application-Notes/AN-1040-Analysis-Products-Containing-Stevia-AN70278.pdf');
 assert.equal(pack.sources.find(s=>s.id===11).url,'https://static.horiba.com/fileadmin/Horiba/Application/Food_and_Beverage/Food/AN213_Sugar_Substitutes.pdf');
});
test('download templates remain blank and public guides omit developer checks',()=>{
 for(const [name,cols] of [['sampling-record',33],['material-characterization',18]]) {
  const text=read(`dist/downloads/stevia-segregation-${name}.csv`);
  const rows=text.trimEnd().split(/\r?\n/).map(r=>r.split(','));
  assert.equal(rows.length,2); assert.equal(rows[0].length,cols);
  assert.equal(rows[1].length,cols); assert.ok(rows[1].every(c=>c===''));
 }
 for(const lang of ['en','zh']) {
  const text=read(`dist/downloads/stevia-segregation-reader-${lang}.md`);
  assert.ok(text.includes('concentration_as_received_mg_g'));
  assert.ok(text.includes('% w/w; as_received'));
  assert.ok(text.includes('mg/sachet; whole_sachet'));
  assert.doesNotMatch(text,/validate\.py|test_validate|Checking the files|文件检查/);
 }
});
for(const [lang,prefix,title] of [['en','','Sachet content: read weight and concentration together'],['zh','zh/','小袋含量：把袋重和浓度放在一起看']]) {
 test(`${lang}: approved sachet module lives inside the existing science plan`,()=>{
  const html=read(`dist/${prefix}plant-extracts/ingredients/stevia/index.html`);
  const plan=html.slice(html.indexOf('id="formulation-tabletop-sachet"'));
  assert.match(plan, /id="stevia-segregation"/);
  assert.ok(plan.includes(title));
  for(const id of [10,11]) assert.ok(plan.includes(`href="#research-stevia-rollout-source-${id}"`));
  for(const name of ['sampling-record.csv','material-characterization.csv',`reader-${lang}.md`]) assert.ok(plan.includes(`/downloads/stevia-segregation-${name}`));
  assert.ok(!plan.includes('href="sampling-record.csv"'));
 });
}
