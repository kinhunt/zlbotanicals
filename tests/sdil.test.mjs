import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
for(const lang of ['en','zh']) test(`${lang} SDIL approved article renders current and proposed scope with two accessible tables`,()=>{
 const path=`dist/${lang==='zh'?'zh/':''}resources/blog/uk-sdil-milk-tea-2028/index.html`;
 assert.ok(existsSync(path),'SDIL article exists');
 const html=readFileSync(path,'utf8');
 assert.equal((html.match(/<table[ >]/g)||[]).length,2);
 assert.equal((html.match(/class="sdil-table"/g)||[]).length,2);
 for(const id of ['sdil-current','sdil-lactose','sdil-plant','sdil-download','sdil-ref-1','sdil-ref-2','sdil-ref-4','sdil-ref-5','sdil-ref-6','sdil-ref-7','sdil-ref-8']){
  assert.equal((html.match(new RegExp(`id="${id}"`,'g'))||[]).length,1,id);
  assert.ok(html.includes(`href="#${id}"`),id);
 }
 assert.ok(!html.includes('**'));
 assert.ok(!/<(?:input|form)[ >]/.test(html));
});

for(const lang of ['en','zh']) test(`${lang} SDIL download is byte-identical and discoverable in directory and procurement`,()=>{
 const prefix=lang==='zh'?'zh/':'';const route=prefix+'resources/blog/uk-sdil-milk-tea-2028';
 const html=readFileSync(`dist/${route}/index.html`,'utf8');
 const file=`sdil-worksheet-${lang}.txt`;
 assert.ok(existsSync(`dist/downloads/${file}`),'blank worksheet exists');
 assert.deepEqual(readFileSync(`dist/downloads/${file}`),readFileSync(`docs/evidence/sdil/research/revision/worksheet-${lang}.txt`));
 assert.ok(html.includes(`href="/downloads/${file}" download`));
 for(const hub of ['resources','resources/application-guides','resources/blog','products/stevia','products/green-tea','solutions/beverages']) assert.ok(readFileSync(`dist/${prefix}${hub}/index.html`,'utf8').includes(`/${route}`),hub);
 for(const target of ['products/tea-extracts','products/stevia','request-quote?']) assert.ok(html.includes(`href="/${prefix}${target}`),target);
 assert.ok(readFileSync('dist/sitemap-0.xml','utf8').includes(`<loc>https://zlbotanicals.com/${route}</loc>`));
});

for(const lang of ['en','zh']) test(`${lang} every approved SDIL prose paragraph and table cell survives markup integration`,async()=>{
 const {parse}=await import('parse5');
 const text=n=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join(' ');
 const norm=s=>s.replace(/<[^>]+>/g,'').replace(/\*+/g,'').replace(/\[\d+\]/g,'').replace(/\s+/g,'');
 const actual=norm(text(parse(readFileSync(`dist/${lang==='zh'?'zh/':''}resources/blog/uk-sdil-milk-tea-2028/index.html`,'utf8'))));
 const approved=readFileSync(`docs/evidence/sdil/research/revision/${lang}.md`,'utf8').split(lang==='en'?'\n## Sources':'\n## 参考来源')[0];
 for(const line of approved.split('\n').filter(l=>l.trim()&&!l.startsWith('#')&&!l.startsWith('|---')&&!l.includes('](worksheet-'))){
  for(const part of line.startsWith('|')?line.split('|').filter(Boolean):[line]) assert.ok(actual.includes(norm(part)),part);
 }
});
test('all 212 pre-SDIL sitemap entries remain unchanged',()=>{
 const baseline=JSON.parse(readFileSync('tests/fixtures/sdil-baseline-sitemap.json','utf8'));
 const entries=readFileSync('dist/sitemap-0.xml','utf8').match(/<url>.*?<\/url>/g);
 assert.equal(baseline.length,212);assert.ok(entries.length>=214);
 for(const entry of baseline)assert.ok(entries.includes(entry),entry);
});
