import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
for (const lang of ['en','zh']) test(`${lang}: hibiscus research endpoints preserve all descriptive values and limits`,()=>{
 const prefix=lang==='zh'?'zh/':'';
 const path=`dist/${prefix}resources/blog/hibiscus-color-endpoints/index.html`;
 assert.ok(existsSync(path),'hibiscus research article exists');
 const html=readFileSync(path,'utf8');
 assert.equal((html.match(/class="hibiscus-table"/g)||[]).length,1);
 assert.equal((html.match(/scope="row"/g)||[]).length,5);
 for(const value of ['17.9 ± 0.04','18.3 ± 0.53','7.8 ± 0.07','16.4 ± 0.02','17.2 ± 0.06','6.6 ± 0.07','16.5 ± 0.06','17.4 ± 0.04','7.1 ± 0.02','14.7 ± 0.06','15.3 ± 0.07','4.6 ± 0.41','15.1 ± 0.04','15.2 ± 0.05','5.9 ± 0.05']) assert.ok(html.includes(value),value);
 for(const id of [2,3]) {assert.equal((html.match(new RegExp(`id="hibiscus-ref-${id}"`,'g'))||[]).length,1);assert.ok(html.includes(`href="#hibiscus-ref-${id}"`));}
 assert.match(html,lang==='en'?/not relabeled/:/不另行定名/);
 assert.doesNotMatch(html,/Interested in our botanical extracts\?|对我们的植物提取物感兴趣？|\/products\/hibiscus/);
 assert.ok(!existsSync(`dist/${prefix}products/hibiscus/index.html`));
});

for(const prefix of ['', 'zh/']) test(`${prefix||'en'}: hibiscus discovery remains research-only`,()=>{
 const beverage=readFileSync(`dist/${prefix}solutions/beverages/index.html`,'utf8');
 assert.ok(beverage.includes('data-hibiscus-research'),'explicit beverage research link');
 assert.ok(beverage.includes(`href="/${prefix}resources/blog/hibiscus-color-endpoints"`));
 for(const route of ['research','resources/blog','resources/application-guides']) assert.ok(readFileSync(`dist/${prefix}${route}/index.html`,'utf8').includes(`/${prefix}resources/blog/hibiscus-color-endpoints`));
});

for (const lang of ['en','zh']) test(`${lang}: approved article prose is retained except authorized reader cleanup`,async()=>{
 const {createMarkdownProcessor}=await import('@astrojs/markdown-remark');
 const {createHash}=await import('node:crypto');
 const root='docs/evidence/hibiscus-color/approved-revision/';
 const approved=readFileSync(`${root}hibiscus-pigment/hibiscus-color-endpoints.${lang}.md`,'utf8');
 const verdict=JSON.parse(readFileSync(`${root}review-verdict.json`,'utf8'));
 assert.equal(createHash('sha256').update(approved).digest('hex'),verdict.reviewed_files[`hibiscus-pigment/hibiscus-color-endpoints.${lang}.md`]);
 let body=approved.split('\n## Sources\n')[0];
 const changes=JSON.parse(readFileSync('docs/evidence/hibiscus-color/owner-authorized-delta.json','utf8')).changes[lang];
 for(const [a,b] of changes) body=body.replace(a,b);
 const processor=await createMarkdownProcessor({smartypants:false});
 const expected=(await processor.render(body)).code;
 const html=readFileSync(`dist/${lang==='zh'?'zh/':''}resources/blog/hibiscus-color-endpoints/index.html`,'utf8');
 const plain=s=>s.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#(?:38|x26);/g,'&').replace(/\s+/g,' ').trim();
 for(const m of expected.matchAll(/<(h[12]|p|th|td)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g)) assert.ok(plain(html).includes(plain(m[2])),plain(m[2]));
});
