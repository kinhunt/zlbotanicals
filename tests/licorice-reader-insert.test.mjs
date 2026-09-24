import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

// Sole-writer integration of the fact-and-language-approved licorice reader-pack
// insertion (approved inputs: insert.en.md sha256 ee05795f509e42fc19aeaadc33d8fa26c124319938909223e6d008f96fb0679c,
// insert.zh.md sha256 133efc776e0867cdda069bccbff00336a98d43c6548e8aba947dd24e284ed6d1) at base ad1be25.
// Only src/data/ingredient-reader-packs.json changes, and inside it only the
// productId=licorice-root pack (effects + standards blocks and sources).

const packs=JSON.parse(readFileSync('src/data/ingredient-reader-packs.json','utf8'));
const licorice=packs.find(p=>p.productId==='licorice-root');
assert.ok(licorice,'licorice-root pack missing');
const section=(lang,id)=>licorice.content[lang].find(s=>s.id===id);
const sha=o=>createHash('sha256').update(JSON.stringify(o)).digest('hex');
const refs=t=>[...JSON.stringify(t).matchAll(/\[(\d+)\]/g)].map(m=>Number(m[1]));

// SHA-256 of every pre-insertion effects/standards block, keyed lang/section/ORIGINAL index.
const PRESERVED={
"en/effects/0":"efe76afd45e7def1ed2bfda06848ad8643e132d0030a482e4f928b17157d91de",
"en/effects/1":"a8e413b80fc01c6ba50c0bbd4b48a6d7b90456cf970a88d7868d6577b1143c2b",
"en/effects/2":"768431e6a01b1d9788415130d7a342a89362e3f2d390620fb1daf57171efdc76",
"en/effects/3":"a1b9be050339abad37dcc68013f0d758f86b6966a295a9d9753fc5dbfd9cbe5e",
"en/standards/0":"7479028e5c84b0b1fe97e5b67c4d5c84e6703a46039e05cbacfb335b01878803",
"en/standards/1":"10b28554276733da0dbf908147a5bdb9c84e15cc173d72ddff42692222b410cc",
"en/standards/2":"46d9e370004d049d56c14cea52b9b27fdb4abd969883b194dbc86fbc9ec29099",
"en/standards/3":"570b5430fe0fe6745b34eb85521625ff01d7ee9a2675227cc16aed257cb553ee",
"en/standards/4":"21b453c1294b7bbfc4ec24c73bebdb7cd55e3534d4951f48147c677ca642ef93",
"zh/effects/0":"7fdfdf256fc15ecaa28719612415cce3512b9fba76af3b3896a7ffd25aa65191",
"zh/effects/1":"704d81abaf556ec4ecee3a5fc94cfa0aac35bafa860f44226a7a17d39f77e40e",
"zh/effects/2":"feb03945981f923fbfca37d52d16119ead694c0e9cb6f68fe211247485f5c4e8",
"zh/effects/3":"8a4d6a4a6c0ddfac1a1e8b350298cb2d9eab795e9f196c7fa40b673c54036e34",
"zh/standards/0":"c11a43c20dd99c88cd7df1d5ac62226bb6d4fd9dd8790e5ef6b78fcb9bf75f52",
"zh/standards/1":"3d11efa160df3474f6b0cbf690104421843c5ae905544ae33977e1633f8d107a",
"zh/standards/2":"637cf70add754e992dc071cb7b6c94e4b531ba7854b17fdfc707fd26a05515db",
"zh/standards/3":"118c6b9a71e23ee024a995fae83354b40a4d8b22a281f0fd1815809719a04bff",
"zh/standards/4":"af162934c4f49d27e04275668f1632a3be70e25ade78a63bf047fc9e0e7c4e16",
};
// heading + three paragraphs land at effects 2..5, pushing NCCIH/glabridin to 6/7
const EFFECTS_NEW_TO_ORIGINAL={0:0,1:1,6:2,7:3};
const STANDARDS_UNCHANGED=[0,1,2,3,4];

// SHA-256 of the inserted blocks exactly as integrated (approved wording after the
// documented citation remap insert[1]->pack[4], [2]->11, [3]->12, [4]->13, [5]->14,
// and removal of markdown single-asterisk emphasis around H. pylori, which the
// reader renderer would otherwise print literally).
const INSERTED={
"en/effects/2":"cdc82a5dbcac0bc934108579aa488ffb6dfeb3ef92f795c3100d952c672f69ca",
"en/effects/3":"c31db30c248b02599d007969085b34a9306728264fcdad64508a3a47697f88fd",
"en/effects/4":"cd5c8a48a9a5d1aa9b5227f1cd5560d664d61d54264aab7bde1b60aaed352a25",
"en/effects/5":"cc49f0bd4c8f05764fa20a2554653054fbfde31a511135ce8f74b5c9348ca251",
"en/standards/5":"37dd8aaa7efcdd5b1ef042975118501dd85e151663bde1f85db1d1e3deb49e15",
"en/standards/6":"979500cacea128ddea6362e636498687762490648e9133fad9bcc61967ec4c3d",
"zh/effects/2":"c5e6ce4177970094a4623e9c8d0ce29b34232f86ef57b71fd2beb77c3c0048cf",
"zh/effects/3":"fa5009364a45cbd90416e67fd2ddff35e75c0e1b6275511963657f075c300ac9",
"zh/effects/4":"36c2ddbbfc45a8f19ff7533cc3d5f319b04c5c977e98db0f694210164f0ad0ab",
"zh/effects/5":"74fec81b8364ec039356b04f2a27cc3d34a4bdf3eb91dce18f0091410dfbee3c",
"zh/standards/5":"453b946446468b69becf745357f9ab63931353b98c57126caf3320886a96c56a",
"zh/standards/6":"91daf15608e2ca96e10fae73199b53fc1ed3de3818baca889e3de0478aa2cc61",
};
const HEADINGS={
en:{effects:'Research material: one name does not establish one specification',standards:'Short-term tolerability: preserve the records, not a safety ranking'},
zh:{effects:'研究材料：同名不等于同一规格',standards:'短期耐受性：保留原始记录，不作安全性排序'},
};

const SOURCES_1_TO_10_SHA='8f1f948c282f947783fb290ca134862d9eefa4d2be560ea76ae2480d1ebd7825';
const NEW_SOURCES=[
{id:11,title:'GutGard in Helicobacter pylori management: randomized placebo-controlled trial (2013)',url:'https://www.ebi.ac.uk/europepmc/webservices/rest/PMC3623263/fullTextXML',accessed:'2026-09-24'},
{id:12,title:'GutGard in gastroesophageal reflux symptoms: phase III randomized placebo-controlled trial (2025)',url:'https://www.ebi.ac.uk/europepmc/webservices/rest/PMC11892464/fullTextXML',accessed:'2026-09-24'},
{id:13,title:'Natural Remedies GutGard USA: current manufacturer page',url:'https://naturalremedieshumanhealth.com/gutgard-usa',accessed:'2026-09-24'},
{id:14,title:'2025 GER trial supplementary Tables 1–13 and Figures 1–2',url:'https://ndownloader.figshare.com/files/51592559',accessed:'2026-09-24'},
];

// SHA-256 of every other productId pack at base ad1be25 (canonical JSON).
const OTHER_PACK_SHA={
"green-tea":"b353c6dae8400a6e793399bb41389933beaab7a002a47a27590bf6aac43707fc",
"centella-asiatica":"52254a16146e3d88c3ca4e07d7679ea2e90b30ac5c74ef3822056b11f16edb3a",
"monk-fruit":"28bbaf11045d7d3b858a8381df790fbfedf7a2f1f863833cba475ff631dfc62e",
"ginseng":"73189762559af0ab3b19bb4c241d57a56190c715e02347ee083d6c5ee20d8286",
"reishi-mushroom":"11336028963b7b02c8babcbe3b6ef423887b0aa08c24cc56465d184dedf22e61",
"ginkgo-biloba":"328b72f35a9d54f460867c117f2a3aaecc7cfcc00232f7ceb947a013a927d88f",
"grape-seed":"f52e2fe9628b02bb9c98db5a298b6a0ba14e0ca0dca194d460f6c11b9094772a",
"stevia":"4af5928694a41ead232ede61984172674a68b9905b2167f99627f297808daab4",
"resveratrol":"899b1ad8877b47151f2451c10cd80ac177acc493be87084ac7f6d90bc76d3e1b",
"goji-berry":"26e2ae064352fc0f3aee9c38732176f4768feb12c4f0ad7dd7a31a019227559e",
};
const SECTION_ORDER=['identity','effects','components','applications','formulations','processes','standards','faq','insights','patents'];

test('licorice effects keeps all four pre-existing blocks byte-identical at their positions (en/zh)',()=>{
 for(const lang of ['en','zh']){
  const blocks=section(lang,'effects').blocks;
  assert.equal(blocks.length,8,`${lang} effects block count`);
  for(const [now,original] of Object.entries(EFFECTS_NEW_TO_ORIGINAL))
   assert.equal(sha(blocks[Number(now)]),PRESERVED[`${lang}/effects/${original}`],`${lang} effects block ${now}`);
 }
});

test('licorice standards keeps the five pre-existing blocks byte-identical, glycyrrhizin/low-potassium risk included (en/zh)',()=>{
 for(const lang of ['en','zh']){
  const blocks=section(lang,'standards').blocks;
  assert.equal(blocks.length,7,`${lang} standards block count`);
  for(const i of STANDARDS_UNCHANGED)
   assert.equal(sha(blocks[i]),PRESERVED[`${lang}/standards/${i}`],`${lang} standards block ${i}`);
  const risk=blocks[2].text;
  if(lang==='en'){
   assert.match(risk,/low potassium/,`${lang} existing low-potassium risk text`);
   assert.match(risk,/glycyrrhizin-related mineralocorticoid/i);
  }else{
   assert.match(risk,/低钾/,`${lang} existing low-potassium risk text`);
   assert.match(risk,/甘草酸相关盐皮质激素/);
  }
 }
});

test('section 1 sits between the 50-person dyspepsia trial and the NCCIH summary in both languages',()=>{
 for(const lang of ['en','zh']){
  const blocks=section(lang,'effects').blocks;
  assert.equal(blocks[1].type,'paragraph');
  assert.match(blocks[1].text,/Nepean/,`${lang} dyspepsia trial block must stay at index 1`);
  assert.equal(blocks[2].type,'heading');
  assert.equal(blocks[2].text,HEADINGS[lang].effects);
  for(const i of [3,4,5]) assert.equal(blocks[i].type,'paragraph',`${lang} inserted paragraph ${i}`);
  if(lang==='en'){
   assert.match(blocks[6].text,/^NCCIH concludes/,`${lang} NCCIH block must follow the insertion`);
   // the opening "discussed above" depends on landing directly after the dyspepsia block
   assert.match(blocks[3].text,/^The dyspepsia paper discussed above/);
  }else{
   assert.match(blocks[6].text,/^NCCIH认为/,`${lang} NCCIH block must follow the insertion`);
   assert.match(blocks[3].text,/^上文消化不良论文/);
  }
 }
});

test('section 2 lands after the existing standards safety group in both languages',()=>{
 for(const lang of ['en','zh']){
  const blocks=section(lang,'standards').blocks;
  assert.equal(blocks[5].type,'heading');
  assert.equal(blocks[5].text,HEADINGS[lang].standards);
  assert.equal(blocks[6].type,'paragraph');
  if(lang==='en'){
   assert.match(blocks[6].text,/Table 4 records abdominal pain in 3\/97/);
   assert.match(blocks[6].text,/hyperkalaemia—high, not low, potassium/);
  }else{
   assert.match(blocks[6].text,/表 4 的腹痛记录却为提取物组 3\/97/);
   assert.match(blocks[6].text,/高钾血症而非低钾/);
  }
  // safety group (glycyrrhizin risk, interactions, NCCIH) precedes the new subheading
  assert.ok(blocks.slice(0,5).every(b=>b.type==='paragraph'));
 }
});

test('inserted blocks match the approved wording exactly (citation remap and italic markup only)',()=>{
 for(const [key,expected] of Object.entries(INSERTED)){
  const [lang,sid,index]=key.split('/');
  assert.equal(sha(section(lang,sid).blocks[Number(index)]),expected,key);
 }
 for(const lang of ['en','zh']){
  for(const i of [2,3,4,5]) assert.doesNotMatch(section(lang,'effects').blocks[i].text,/(?<!\*)\*(?!\*)/,`${lang} stray markdown emphasis`);
  assert.doesNotMatch(section(lang,'standards').blocks[6].text,/(?<!\*)\*(?!\*)/);
 }
});

test('every citation in the inserted text resolves to a licorice pack source entry',()=>{
 const sourceIds=new Set(licorice.sources.map(s=>s.id));
 const inserted=[];
 for(const lang of ['en','zh']){
  inserted.push(...section(lang,'effects').blocks.slice(2,6));
  inserted.push(...section(lang,'standards').blocks.slice(5,7));
 }
 const used=new Set();
 for(const b of inserted) for(const n of refs(b)) used.add(n);
 // insert[1]->pack[4] (PMC3123991), insert[2]->11, insert[3]->12, insert[4]->13, insert[5]->14
 assert.deepEqual([...used].sort((a,b)=>a-b),[4,11,12,13,14]);
 for(const n of used) assert.ok(sourceIds.has(n),`unresolved inserted citation [${n}]`);
 for(const lang of ['en','zh']){
  assert.ok(refs(section(lang,'effects').blocks[3]).includes(4),'insert[1] must be remapped to pack[4]');
  assert.ok(refs(section(lang,'standards').blocks[6]).includes(14),'insert[5] must be remapped to pack[14]');
 }
});

test('sources 1-10 are untouched and the four new sources follow the existing schema',()=>{
 assert.equal(licorice.sources.length,14);
 assert.deepEqual(licorice.sources.slice(0,10).map(s=>s.id),[1,2,3,4,5,6,7,8,9,10]);
 assert.equal(sha(licorice.sources.slice(0,10)),SOURCES_1_TO_10_SHA,'sources 1-10 changed');
 assert.deepEqual(licorice.sources.slice(10),NEW_SOURCES);
 assert.equal(licorice.sources[3].url,'https://www.ebi.ac.uk/europepmc/webservices/rest/PMC3123991/fullTextXML');
 const urls=new Set(licorice.sources.map(s=>s.url));
 assert.equal(urls.size,14,'duplicate source URL');
 for(const s of licorice.sources){
  assert.ok(s.url.startsWith('https://'));
  assert.match(s.accessed,/^\d{4}-\d{2}-\d{2}$/);
  assert.ok(s.title.trim().length>0);
 }
});

test('no other productId pack changed',()=>{
 assert.equal(packs.length,11);
 for(const [id,expected] of Object.entries(OTHER_PACK_SHA)){
  const pack=packs.find(p=>p.productId===id);
  assert.ok(pack,`missing pack ${id}`);
  assert.equal(sha(pack),expected,`${id} pack changed`);
 }
});

test('all licorice citations resolve: pack sources for reviewed sections, legacy registry for the legacy insights section',()=>{
 const deep=JSON.parse(readFileSync('src/data/deep-ingredients.json','utf8'));
 const legacyIds=new Set(deep.find(p=>p.productId==='licorice-root').sources.map(s=>s.id));
 const packIds=new Set(licorice.sources.map(s=>s.id));
 for(const lang of ['en','zh']){
  for(const s of licorice.content[lang]){
   const allowed=s.legacy?legacyIds:packIds;
   for(const b of s.blocks) for(const n of refs(b))
    assert.ok(allowed.has(n),`${lang}/${s.id}: unresolved [${n}]`);
   if(!s.legacy) for(const n of refs(s.blocks)) assert.ok(n<=14,`${lang}/${s.id}: [${n}] beyond source count`);
  }
 }
 // pre-existing legacy pointers [21]/[48] live only in the legacy-flagged insights section
 for(const lang of ['en','zh']){
  const legacyRefs=new Set(refs(section(lang,'insights').blocks));
  for(const n of [21,48]) assert.ok(legacyRefs.has(n));
  assert.ok([...legacyRefs].every(n=>legacyIds.has(n)));
 }
});

test('licorice pack structure stays a ten-section editorial-reviewed article in both languages',()=>{
 assert.equal(licorice.approval,'editorial-reviewed');
 for(const lang of ['en','zh']){
  assert.equal(licorice.content[lang].length,10);
  assert.deepEqual(licorice.content[lang].map(s=>s.id),SECTION_ORDER);
  for(const s of licorice.content[lang]){
   assert.equal(Object.keys(s).filter(k=>!['id','heading','blocks','legacy'].includes(k)).length,0);
   assert.ok(Array.isArray(s.blocks)&&s.blocks.length>0);
   assert.ok(s.heading.trim().length>0);
  }
 }
 assert.deepEqual(licorice.content.en.map(s=>s.id),licorice.content.zh.map(s=>s.id));
 assert.equal(licorice.plans.length,3);
});
