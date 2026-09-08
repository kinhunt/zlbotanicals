import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=p=>readFileSync(`dist/${p}index.html`,'utf8');
test('home hero gives ingredient buyers and brand developers direct localized paths',()=>{
 for(const prefix of ['','zh/']){
 const hero=html(prefix).match(/<section class="relative bg-primary[\s\S]*?<\/section>/)[0];
 assert.ok(hero.includes(`href="/${prefix}odm"`));
 assert.ok(hero.includes(`href="/${prefix}products"`));
 assert.ok(hero.includes(prefix?'品牌产品开发':'Brand product development'));
 }
});

test('all product pages put procurement confirmation and actions before technical reading',()=>{
 for(const prefix of ['','zh/']) for(const slug of ['green-tea','turmeric','ginseng','reishi-mushroom','monk-fruit','stevia','grape-seed','ginkgo-biloba','licorice-root','resveratrol','goji-berry','centella-asiatica']){
 const page=html(`${prefix}products/${slug}/`);
 assert.ok(page.includes('id="procurement-summary"'),slug);
 assert.ok(page.indexOf('id="procurement-summary"')<page.indexOf('id="processing-dossier"'));
 const panel=page.split('id="procurement-summary"')[1].split('</section>')[0];
 for(const request of ['TDS','sample','quote'])assert.ok(panel.includes(`request=${request}`));
 assert.ok(panel.includes(prefix?'待书面确认':'Requires written confirmation'));
 }
});

test('product artwork is an explicitly labeled original diagram, not grade-bearing sample photography',()=>{
 for(const prefix of ['','zh/']) for(const slug of ['ginseng','reishi-mushroom','turmeric']){
 const page=html(`${prefix}products/${slug}/`);
 assert.ok(page.includes(`/images/products/diagrams/${slug}.svg`));
 assert.ok(page.includes(prefix?'原料示意图，非批次样品':'Ingredient diagram, not a batch sample'));
 }
});

test('ODM starts with two buyer intents before concept imagery and offers editable transfer context',()=>{
 for(const prefix of ['','zh/']){
 const page=html(`${prefix}odm/`);
 assert.ok(page.includes('data-odm-intent="transfer"'));
 assert.ok(page.includes('data-odm-intent="idea"'));
 assert.ok(page.indexOf('id="odm-start"')<page.indexOf('/images/odm/'));
 assert.ok(page.includes(prefix?'拟定阶段交付物':'Proposed stage deliverables'));
 const form=html(`${prefix}request-quote/`);
 assert.ok(form.includes('value="odm-transfer"'));
 assert.ok(form.includes(prefix?'产品或项目方向':'Product or project direction'));
 }
});

test('research library progressively enhances compact cards with genuine facets and shared caveats',()=>{
 for(const prefix of ['','zh/']){
 const page=html(`${prefix}resources/research/`);
 for(const filter of ['ingredient','application','evidence'])assert.ok(page.includes(`data-research-filter="${filter}"`));
 assert.equal((page.match(/<article data-research-card/g)||[]).length,12);
 assert.equal((page.match(/data-evidence-details/g)||[]).length,12);
 assert.ok(page.includes('data-research-reset'));
 assert.ok(page.includes('data-research-empty'));
 assert.ok(page.includes('value="review"'));
 assert.ok(!page.includes('value="human-trial"'));
 assert.equal((page.match(/id="research-caveats"/g)||[]).length,1);
 }
});

test('news archive title identifies historical records, not a latest-news feed',()=>{
 for(const prefix of ['','zh/']) assert.ok(html(`${prefix}resources/news/`).includes(prefix?'历史事件档案':'Historical event archive'));
});

test('quote privacy distinguishes submission from receipt without stale activation assertions',()=>{
 for(const prefix of ['','zh/']){
 const page=html(`${prefix}request-quote/`);
 assert.ok(!page.includes(prefix?'邮件投递及服务激活状态尚未核实':'Email delivery and service activation have not been verified'));
 assert.ok(page.includes(prefix?'提交不代表已送达':'Submission does not confirm receipt'));
 }
});

test('catalog cards contain neutral diagrams without cropping their disclaimers',()=>{
 for(const file of ['src/components/products/ProductCard.astro','src/components/home/ProductCategories.astro']){
 const source=readFileSync(file,'utf8');assert.ok(source.includes('object-contain'));assert.ok(!source.includes('object-cover'));
 }
});
