import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=p=>readFileSync(`dist/${p}index.html`,'utf8');
test('download center exposes readable, reusable briefs with real editable downloads',()=>{
 for(const lang of ['en','zh']){
 const prefix=lang==='zh'?'zh/':'';const page=html(`${prefix}resources/downloads/`);
 for(const id of ['sourcing-checklist','odm-concept-brief','formula-transfer-checklist']){
 assert.ok(page.includes(`id="${id}"`),`missing readable ${id}`);
 const url=`/downloads/${id}-${lang}.md`;assert.ok(page.includes(`href="${url}"`));
 const text=readFileSync('dist'+url,'utf8');assert.ok(text.includes('[ ]'));assert.ok(text.includes('____'));assert.ok(text.includes(lang==='zh'?'非保密':'nonconfidential'));
 }
 assert.ok(html(`${prefix}products/green-tea/`).includes(`/${prefix}resources/downloads#sourcing-checklist`));
 for(const id of ['odm-concept-brief','formula-transfer-checklist'])assert.ok(html(`${prefix}odm/`).includes(`/${prefix}resources/downloads#${id}`));
 }
 const legacy=readFileSync('dist/downloads/sourcing-checklist.txt','utf8');assert.ok(legacy.includes('____'));assert.ok(legacy.includes('供应商文件审核'));
});

test('research cards render evidence and subset counts from current reviewed records',()=>{
 const records=JSON.parse(readFileSync('src/data/research.json','utf8')).filter(r=>r.status==='reviewed');
 for(const lang of ['en','zh']){
 const prefix=lang==='zh'?'zh/':'';
 for(const scope of ['resources/research/','products/green-tea/']){
 const selected=records.filter(r=>scope.startsWith('resources')||r.products.includes('green-tea'));
 const page=html(prefix+scope);
 assert.ok(page.includes(`data-research-total="${selected.length}"`));
 for(const record of selected){assert.ok(record.evidenceKey);assert.ok(record.readingUses.length);assert.ok(page.includes(`data-evidence="${record.evidenceKey}"`));assert.ok(page.includes(record.evidenceType[lang]));}
 }
 }
});

test('all twelve diagrams have bilingual visible and accessible boundaries in product and catalog contexts',()=>{
 const records=JSON.parse(readFileSync('src/data/research.json','utf8'));
 const slugs=[...new Set(records.flatMap(r=>r.products))];assert.equal(slugs.length,12);
 for(const slug of slugs){
 const svg=readFileSync(`public/images/products/diagrams/${slug}.svg`,'utf8');
 assert.match(svg,/<title[^>]*>[^<]*原料示意图/);assert.match(svg,/<desc[^>]*>[^<]*非批次样品/);assert.ok(svg.includes('身份 → 规格核查'));assert.ok(svg.includes('原料示意图 · 非批次样品'));
 for(const prefix of ['','zh/']){
 const page=html(`${prefix}products/${slug}/`);
 assert.match(page,prefix? /alt="[^"]*原料示意图，非批次样品/ : /alt="[^"]*ingredient diagram, not a batch sample/);
 }
 }
 for(const prefix of ['','zh/'])for(const route of ['', 'products/']){
 const page=html(prefix+route);const images=[...page.matchAll(/<img[^>]+src="\/images\/products\/diagrams\/[^>]+>/g)];assert.ok(images.length>0);
 for(const [img] of images)assert.match(img,prefix?/alt="[^"]*原料示意图，非批次样品/:/alt="[^"]*ingredient diagram, not a batch sample/);
 }
});
