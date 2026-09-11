import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=lang=>readFileSync(`dist${lang==='zh'?'/zh':''}/plant-extracts/ingredients/turmeric/index.html`,'utf8');
test('turmeric exposes a branching process figure and compact forms table',()=>{
 for(const lang of ['en','zh']) {
 const html=read(lang);
 assert.ok(html.includes('data-process-branches'),'branch diagram missing');
 assert.ok(html.includes('class="forms-table"'),'forms table missing');
 }
});
test('turmeric has descriptive and consistent social head metadata',()=>{
 for(const lang of ['en','zh']) {
 const head=read(lang).split('</head>')[0];
 assert.ok(head.includes('property="og:image"'),'social image missing');
 for(const key of ['og:title','og:description','og:url','og:type','og:image','og:image:width','og:image:height','og:image:alt']) assert.equal(head.split(`property="${key}"`).length-1,1,key);
 assert.ok(head.includes('content="summary_large_image"'));
 assert.ok(head.includes(lang==='en'?'Turmeric extract: forms, processing and quality':'姜黄提取物：形态、工艺与质量'));
 assert.equal(head.split('rel="canonical"').length-1,1);
 }
});
test('turmeric teaches functions without defensive boilerplate',()=>{
 for(const lang of ['en','zh']) {
 const html=read(lang);
 assert.doesNotMatch(html,/下表介绍可选工艺单元，不描述企业已安装的设施|具体用途是否允许仍需按目标市场核查|not a description of installed facilities|permission for a particular use depends on the destination market|not supplier-tested specifications/);
 assert.match(html,lang==='zh'?/叠氮化钠/:/sodium azide/);
 }
});
