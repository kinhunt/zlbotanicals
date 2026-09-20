import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
for (const lang of ['en', 'zh']) test(`${lang}: accounting is discoverable, empty and usable without JS`, () => {
  const html = readFileSync(`dist/${lang === 'zh' ? 'zh/' : ''}plant-extracts/ingredients/centella-asiatica/index.html`, 'utf8');
  assert.match(html, /href="#centella-accounting"/);
  assert.match(html, /id="centella-accounting"/);
  assert.match(html, /data-centella-calculator/);
  assert.match(html, /<noscript>/);
  assert.match(html, /C × A ÷ 100/);
  assert.match(html, /1% w\/w = 10 mg\/g/);
  assert.match(html, new RegExp(`/downloads/centella-accounting-${lang}.txt`));
  const txt = readFileSync(`dist/downloads/centella-accounting-${lang}.txt`, 'utf8');
  for (const marker of ['Asiaticoside','Madecassoside','Asiatic acid','Madecassic acid']) assert.ok(txt.includes(marker));
  assert.match(txt, /C × A ÷ 100/);
  if (lang === 'en') {
    assert.match(txt, /Convert % w\/w to mg\/g before using C.*multiply by 10/);
    assert.match(txt, /not per g of its dry extract/);
    assert.match(txt, /as-supplied ingredient addition rates/);
    assert.match(txt, /Calculation method: mass-fraction arithmetic\./);
    assert.match(html, /water, solvent and carrier are included in the denominator/);
    assert.match(html, /Compare powders and liquid ingredients/);
    assert.match(html, /contains 20 mg\/g of a component/);
    assert.match(html, /First convert it to as-supplied content using traceable data/);
    assert.match(html, /As-supplied content by mass/);
    assert.match(html, /As-supplied content unit/);
  } else {
    assert.match(txt, /干基含量不能直接乘供应态原料的加入比例/);
    assert.match(txt, /计算方法：质量分数换算。/);
    assert.match(html, /水、溶剂和载体均计入分母/);
    assert.match(html, /某组分的供应态含量为 20 mg\/g/);
    assert.match(html, /先换算为供应态含量/);
    assert.match(html, /供应态含量单位/);
  }
  assert.doesNotMatch(txt, /fictional assay|虚构检测/);
  assert.ok(!html.match(/data-concentration[^>]*value="[0-9]/));
});
