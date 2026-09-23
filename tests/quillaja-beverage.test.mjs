import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {createMarkdownProcessor} from '@astrojs/markdown-remark';
const base='8c1995038de0601928d233606a322e30efb396b6';
const hashes={en:'0abcdc0c77228ef0219c8e41618c89b3456c04c606d37f964f23bd0ae4bf1050',zh:'8bd01ccdd48baa34a3c51a02e279f1759deca95b7a289453c49579982ff2abfa'};
const plain=s=>s.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&#(?:38|x26);/g,'&').replace(/\s+/g,' ').trim();
for(const lang of ['en','zh']) test(`${lang}: approved quillaja selection is additive within existing beverage route`,async()=>{
 const prefix=lang==='zh'?'zh/':'';
 const html=readFileSync(`dist/${prefix}solutions/beverages/index.html`,'utf8');
 assert.ok(html.includes('id="quillaja-grade-selection"'),'missing approved quillaja module');
 const draft=readFileSync(`docs/evidence/quillaja/quillaja-selection.${lang}.md`,'utf8');
 assert.equal(createHash('sha256').update(draft).digest('hex'),hashes[lang]);
 const processor=await createMarkdownProcessor({smartypants:false});
 const body=draft.split('\n## Sources\n')[0];
 const expected=(await processor.render(body)).code;
 // Every approved heading, paragraph and table-cell remains present verbatim.
 for(const match of expected.matchAll(/<(h[12]|p|th|td)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g)) assert.ok(plain(html).includes(plain(match[2])),plain(match[2]));
 for(const id of [1,2]){
  assert.equal((html.match(new RegExp(`id="quillaja-ref-${id}"`,'g'))||[]).length,1);
  assert.ok(html.includes(`href="#quillaja-ref-${id}"`));
 }
 assert.ok(html.includes('https://www.fao.org/fileadmin/templates/agns/pdf/jecfa/cta/65/quillaia.pdf'));
 assert.ok(html.includes('https://ingredion.com/na/en-us/ingredients/ingredient-product-families/q-naturale-high-efficiency-emulsifier'));
 assert.ok(html.includes(`/${prefix}request-quote?request=application`));
 assert.equal(existsSync(`dist/${prefix}products/quillaja/index.html`),false);
 const file=`src/pages/${prefix}solutions/beverages.astro`;
 const old=execFileSync('git',['show',`${base}:${file}`],{encoding:'utf8'});
 const current=readFileSync(file,'utf8').replace(/^<section data-botanical-comparison[^\n]*\n/gm,'').replace(/^import QuillajaSelection[^\n]*\n/m,'').replace(/^<QuillajaSelection[^\n]*\n/m,'').replace(/^<section data-(?:beetroot|cocoa|ginger)-discovery[^\n]*\n/gm,'').replace(/^<section data-pomegranate-discovery[^\n]*\n/m,'').replace(/^<section data-citrus-research[^\n]*\n/m,'').replace(/^<section data-hibiscus-research[^\n]*\n/m,'').replace(/^<section data-citrus-bitterness-research[^\n]*\n/m,'').replace(/^<section data-astaxanthin-research[^\n]*\n/m,'');
 assert.equal(current,old,'existing page source retained byte-for-byte except additive import/module');
});
