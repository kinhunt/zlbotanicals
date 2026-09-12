import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const ids=['green-tea','centella-asiatica','monk-fruit','ginseng','reishi-mushroom','ginkgo-biloba','grape-seed','goji-berry','licorice-root','stevia','resveratrol'];
const html=(id,lang)=>readFileSync(`dist/${lang==='zh'?'zh/':''}products/${id}/index.html`,'utf8');
const text=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const section=(s,id)=>s.split(`id="${id}"`)[1].split('</section>')[0];
test('each ingredient has four distinct localized commercial benefit bodies',()=>{
 for(const lang of ['en','zh']){
  const seen=new Set();
  for(const id of ids){
   const bodies=[...section(html(id,lang),'why-choose-us').matchAll(/<p[^>]*>(.*?)<\/p>/gs)].map(m=>text(m[1]));
   assert.equal(bodies.length,4,`${lang}/${id} four benefits`);
   for(const body of bodies){assert.ok(body.length>20);assert.ok(!seen.has(body),`${lang}/${id} duplicates benefit: ${body}`);seen.add(body);}
  }
  assert.equal(seen.size,44);
 }
});

test('supplier-led offers and material-specific assay reporting replace editorial blockers',()=>{
 const expected={
  'green-tea':['Our quotation range distinguishes','选型报价区分风味型'],
  'centella-asiatica':['native-extract solids','原生提取物固形物'],
  'monk-fruit':['solids and structure','餐桌用甜味剂'],
  ginseng:['We match white- or red-ginseng','我们按粉剂'],
  'reishi-mushroom':['mushroom-method version','方法版本'],
  'ginkgo-biloba':['capsule and tablet development','胶囊及片剂开发'],
  stevia:['an HPLC method suited','糖苷选项'],
  resveratrol:['source, production route','载体配制选项']
 };
 for(const [id,markers] of Object.entries(expected))for(const [i,lang] of ['en','zh'].entries()) assert.ok(text(html(id,lang)).includes(markers[i]),`${lang}/${id}: ${markers[i]}`);
 for(const id of ids)for(const lang of ['en','zh']){
  const s=html(id,lang);const hero=text(section(s,'procurement-summary'));
  assert.doesNotMatch(hero,/Match tea flavour|Build a serum|Specify Mogroside|Define white|Separate polysaccharide|Build your quotation|Compare offers|Choose fruit solids|Set the Reb|assay-led ingredient projects/);
  assert.doesNotMatch(text(section(s,'material-selection')),/Use these material options|literature values|不将提取比/);
  assert.doesNotMatch(text(section(s,'supply-terms')),/blanket stock|不以统一库存/);
 }
});

test('technical reading stays concise, nonduplicative and preserves five substantive same-ingredient dimensions',()=>{
 for(const id of ids)for(const lang of ['en','zh']){
  const s=html(id,lang),reading=s.split('id="processing-dossier"')[1];
  for(const dimension of ['processes','equipment','applications','standards','insights']){
   const block=section(s,dimension);const p=text(block.match(/<p[^>]*>(.*?)<\/p>/s)[1]);
   assert.ok(p.length>12&&p.length<(lang==='zh'?100:230),`${lang}/${id}/${dimension}: concise meaningful prose`);
   assert.ok(block.includes(`href="/${lang==='zh'?'zh/':''}plant-extracts/ingredients/${id}#${dimension}"`));
   assert.equal(text(s).split(p).length-1,1,`${lang}/${id}/${dimension}: no duplicated prose`);
  }
  for(const target of ['components','formulations','standards','processes'])assert.ok(reading.includes(`#${target}"`));
  assert.doesNotMatch(text(reading),/Extraction, separation and drying choices|的提取、分离和干燥设备选择/);
 }
 for(const id of ['stevia','resveratrol']){
  assert.match(text(section(html(id,'en'),'processes')),/Processing routes/);
  assert.match(text(section(html(id,'zh'),'equipment')),/加工设备/);
 }
});

test('C material and safety distinctions remain visible on every localized sales page',()=>{
 const markers={
  'grape-seed':{en:['degree-of-polymerization','reference standard','not interchangeable','adulteration'],zh:['聚合度','对照品','不能互换','掺假']},
  'goji-berry':{en:['free-sugar correction','drying carrier','whole-berry study','Betaine and carotenoids'],zh:['游离糖校正','干燥载体','整果研究','甜菜碱和类胡萝卜素']},
  'licorice-root':{en:['DGL does not mean zero residue','blood-pressure, potassium and drug-interaction','not a universal safety guarantee','glabridin precipitation'],zh:['DGL 不代表零残留','血压、血钾及药物相互作用','不是通用安全保证','光甘草定析晶']}
 };
 for(const [id,languages] of Object.entries(markers))for(const lang of ['en','zh'])for(const marker of languages[lang])assert.ok(text(html(id,lang)).includes(marker),`${lang}/${id}: ${marker}`);
});
