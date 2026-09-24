import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const slug='water-soluble-green-tea-powder-or-liquid';
const read=(lang)=>readFileSync(`dist/${lang==='zh'?'zh/':''}resources/blog/${slug}/index.html`,'utf8');
const text=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const ids=['green-tea','centella-asiatica','monk-fruit','ginseng','reishi-mushroom','ginkgo-biloba','grape-seed','goji-berry','licorice-root','stevia','resveratrol'];

test('both language articles render with the reviewed title and structure',()=>{
  const expected={
    en:{title:'Water-soluble green tea extract: beverage powder and topical liquid are not interchangeable',
        h2:['Six points to compare before the price','Why the two do not substitute','What to request before you ask for a price','Sources']},
    zh:{title:'同名的水溶性绿茶提取物：饮料粉末与外用液体不能直接替换',
        h2:['比价格之前先看六项','为什么两者不能直接替换','询价前先确认这几项','来源']},
  };
  for(const lang of ['en','zh']){
    const html=read(lang);
    assert.ok(html.includes('class="article')||html.includes('<article'),`${lang} article element`);
    assert.ok(html.includes('water-soluble-reader'),`${lang} reader class for the table styles`);
    assert.ok(html.includes(expected[lang].title),`${lang} title`);
    for(const h of expected[lang].h2) assert.ok(text(html).includes(h),`${lang} h2 ${h}`);
    assert.ok(!html.includes('FOR REVIEW ONLY')&&!html.includes('<!-- DRAFT'),`${lang} no draft comment`);
    const other=lang==='en'?expected.zh:expected.en;
    assert.ok(!text(html).includes(other.h2[0]),`${lang} does not leak the other language heading`);
  }
});

test('the comparison table is a scrollable region with six reviewed rows',()=>{
  const rows={
    en:['What arrives','Carrier','How the number is given','Intended use and rule path','Finished products','What to request'],
    zh:['到货形态','载体','数值怎么给','用途与规则路径','目标成品','询价要索取'],
  };
  for(const lang of ['en','zh']){
    const html=read(lang);
    assert.ok(html.includes('class="gt-form-table" role="region" tabindex="0"'),`${lang} focusable region`);
    assert.ok(html.includes('class="gt-form-hint"'),`${lang} scroll hint`);
    const hintStart=html.indexOf('class="gt-form-hint"');
    const start=html.indexOf('class="gt-form-table"');
    assert.ok(hintStart>-1&&start>-1,`${lang} hint and table markup present`);
    assert.ok(hintStart<start,`${lang} hint precedes the table`);
    const table=html.slice(start,html.indexOf('</div>',start));
    assert.equal(table.match(/<th(?=[\s>])[^>]*>/g).length,3,`${lang} three column headers`);
    assert.equal(table.match(/<tbody>/g).length,1,`${lang} one body`);
    assert.equal(table.match(/<tr>/g).length,7,`${lang} header row plus six comparison rows`);
    for(const label of rows[lang]) assert.ok(text(table).includes(label),`${lang} row ${label}`);
    assert.ok(text(table).includes(lang==='zh'?'绿茶':'Green Tea Extract'),`${lang} material named in the table`);
  }
});

test('citations are complete, dated and article-local',()=>{
  for(const lang of ['en','zh']){
    const html=read(lang);
    const body=html.slice(html.indexOf('<article'));
    const hrefs=[...body.matchAll(/href="#water-soluble-green-tea-ref-(\d+)"/g)].map(m=>+m[1]);
    const refIds=[...body.matchAll(/id="water-soluble-green-tea-ref-(\d+)"/g)].map(m=>+m[1]);
    assert.deepEqual([...new Set(hrefs)].sort((a,b)=>a-b),[1,2,3,4,5,6,7,8],`${lang} cited refs`);
    assert.deepEqual([...new Set(refIds)].sort((a,b)=>a-b),[1,2,3,4,5,6,7,8],`${lang} source entries`);
    for(const n of refIds){
      const entry=body.split(`id="water-soluble-green-tea-ref-${n}"`)[1].split('</p>')[0];
      assert.match(entry,/href="https:\/\/[^"]+"/,`${lang} ref ${n} url`);
      assert.ok(/accessed 2026-09-24|2026-09-24 访问/.test(entry),`${lang} ref ${n} access date`);
    }
    assert.ok(!body.includes('[S1]')&&!body.includes('S10')&&!body.includes('ref-S6'),`${lang} no research-pack ids leaked into the page`);
    assert.ok(!text(body).includes('**'),`${lang} no stray markdown`);
  }
});

test('the article links into the encyclopedia and the procurement page, and back',()=>{
  for(const lang of ['en','zh']){
    const prefix=lang==='zh'?'/zh':'';
    const html=read(lang);
    assert.ok(html.includes(`href="${prefix}/plant-extracts/ingredients/green-tea#components"`),`${lang} science anchor`);
    assert.ok(html.includes(`href="${prefix}/plant-extracts/ingredients/green-tea"`),`${lang} encyclopedia`);
    assert.ok(html.includes(`href="${prefix}/products/green-tea"`),`${lang} procurement page`);
    assert.ok(html.includes(`href="${prefix}/products/green-tea#material-selection"`),`${lang} material-selection anchor`);
  }
});

test('the procurement page links to the article without carrying its comparison table',()=>{
  for(const lang of ['en','zh']){
    const prefix=lang==='zh'?'zh/':'';
    for(const id of ids){
      const page=readFileSync(`dist/${prefix}products/${id}/index.html`,'utf8');
      if(id==='green-tea'){
        assert.ok(page.includes(`/resources/blog/${slug}`)||page.includes(`/${prefix}resources/blog/${slug}`),`${lang}/green-tea links to the article`);
        assert.ok(!page.includes('gt-form-table'),`${lang}/green-tea keeps the supplier page free of the comparison table`);
      } else {
        assert.ok(!page.includes(slug),`${lang}/${id} must not link the green-tea article`);
      }
    }
  }
});
