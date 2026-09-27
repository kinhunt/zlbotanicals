import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
for (const lang of ['en', 'zh']) test(`T05 B3 ${lang}: alkalinity is composition-dependent acid-neutralising capacity`, () => {
  const text = read(lang);
  assert.doesNotMatch(text, /Alkalinity \(temporary hardness\)|碱度（临时硬度）|alkalinity tells you whether|碱度告诉你碳酸氢根/);
  assert.match(text, lang === 'en' ? /bicarbonate-dominated water of known composition and pH/ : /组成和 pH 已知、以碳酸氢根为主的水/);
  assert.match(text, lang === 'en' ? /carbonate, hydroxide and other bases/ : /碳酸根、氢氧根及其他碱/);
  assert.match(text, lang === 'en' ? /alkalinity with its reporting basis/ : /碱度及其报告基准/);
});
for (const lang of ['en', 'zh']) test(`T05 B4 ${lang}: acidification requires assessment, not a necessary adverse tradeoff`, () => {
  const text = read(lang);
  assert.doesNotMatch(text, /at the cost of a shifted catechin|拿儿茶素谱和风味换抑膜/);
  assert.match(text, lang === 'en' ? /measure catechin and flavour changes in the actual acidified formulation/ : /在实际酸化配方中测定儿茶素与风味变化/);
  assert.match(text, lang === 'en' ? /slightly alkaline liquors brown while EGC and EGCG decay/ : /偏碱的茶汤变褐，EGC 与 EGCG 持续衰减/);
});
for (const lang of ['en', 'zh']) test(`T05 ${lang}: no unsupported water-treatment cost ranking`, () => {
  assert.doesNotMatch(read(lang), /cheapest lever|最便宜一档/);
});
const read = lang => readFileSync(`src/content/blog/${lang}/tea-scum-vs-tea-cream.md`, 'utf8');
for (const lang of ['en', 'zh']) test(`T05 B2 ${lang}: ordinary clarification is not all precursor-changing treatment`, () => {
  const text = read(lang);
  assert.doesNotMatch(text, /None — the reaction|Does not touch an interface reaction|the film will not change|leave the surface reaction untouched|对界面反应无效|不触及界面反应|膜不会因此改变|对表面反应没有作用/);
  const lines = text.split('\n').filter(l => lang === 'en' ? /Effect of filtering|\| Filtration \/ centrifugation|5\. Optional grading|4\. \*\*Filtration/.test(l) : /过滤有没有用|\| 过滤／离心|5\. 选做：分级|4\. \*\*过滤/.test(l));
  assert.equal(lines.length, 4);
  for (const line of lines) assert.match(line, lang === 'en' ? /precursors and holding conditions remain unchanged/ : /溶解性前体与保温条件不变/);
  assert.match(text, lang === 'en' ? /treatments that change available calcium, bicarbonate or organic precursors/ : /改变可用钙、碳酸氢根或有机前体的处理/);
});
