import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const packs = JSON.parse(readFileSync(new URL('../src/data/ingredient-reader-packs.json', import.meta.url), 'utf8'));
const resveratrol = packs.find(p => p.productId === 'resveratrol');
for (const lang of ['en', 'zh']) {
  test(`Resveratrol ${lang}: both control categories have analytical/physical scope`, () => {
    const text = resveratrol.plans.find(p => p.id === 'topical').content[lang][2].text;
    const scope = lang === 'en'
      ? 'Use carrier blanks and unformulated material as analytical and physical controls; do not assume these controls are suitable for application to human skin.'
      : '载体空白与未配制原料用于分析和物性对照，不应默认这些对照适合直接用于人体皮肤。';
    assert.ok(text.includes(scope), 'explicit shared scope covers carrier blanks and unformulated material');
    assert.doesNotMatch(text, /Compare carrier blank and unformulated control|Unformulated controls are analytical|设置载体空白与未配制对照|未配制对照仅用于/);
    for (const retained of lang === 'en'
      ? ['preservative efficacy', 'final-formula skin tolerability', 'packaging', 'trans retention', '[4][7]']
      : ['防腐有效性', '成品皮肤耐受性', '包装', 'trans保持率', '[4][7]']) assert.ok(text.includes(retained), retained);
    assert.doesNotMatch(text, /ingestion|ingestible|口服|摄入/i);
  });
}
const goji = packs.find(p => p.productId === 'goji-berry');
const section = (lang, id) => goji.content[lang].find(s => s.id === id);

for (const lang of ['en', 'zh']) {
  test(`Goji ${lang}: one full ultrasound explanation and distinct apparatus comparison`, () => {
    const methods = section(lang, 'processes').blocks[3].text;
    assert.equal(JSON.stringify(goji.content[lang]).split(methods).length - 1, 1, 'full methods/results paragraph occurs only once');
    for (const value of ['20 g', '600 mL', '60°C', '300 W/L', '38.93%', '33.60%', '26.38%']) assert.ok(methods.includes(value), value);
    assert.match(methods, lang === 'en' ? /5 seconds on\/2 seconds off/ : /开启5秒／关闭2秒/);
    const row = section(lang, 'processes').blocks[4].rows[2];
    assert.equal(row[0], lang === 'en' ? 'Laboratory ultrasound modes; scale-up unit to be selected' : '实验室超声模式；放大设备待选型');
    assert.equal(row[3], lang === 'en'
      ? 'Laboratory comparison: 20/40 kHz counterflow dual, 16/20 kHz opposite-sit dual, and 28 kHz counterflow single; operating conditions described above.[18]'
      : '实验室比较：20/40 kHz逆流双频、16/20 kHz对置双频及28 kHz逆流单频；操作条件见上文。[18]');
    assert.match(row[2], lang === 'en' ? /pulse timing, cooling, field geometry/ : /脉冲时序、冷却、声场/);
    assert.equal(section(lang, 'faq').blocks[3].text, lang === 'en'
      ? 'The 38.93% crude recovery belongs to the 20/40 kHz counterflow dual-frequency mode; the 28 kHz single-frequency mode yielded 26.38%.[18]'
      : '38.93%的粗提回收值对应20/40 kHz逆流双频模式；28 kHz单频模式为26.38%。[18]');
    const insight = section(lang, 'insights').blocks[0].rows[1];
    assert.equal(insight[1], lang === 'en'
      ? '20 g fruit powder/600 mL water; 60°C, 30 minutes, 300 W/L; 5 seconds on/2 seconds off.[18]'
      : '20 g果粉/600 mL水；60°C、30分钟、300 W/L；开启5秒／关闭2秒。[18]');
    assert.match(insight[2], lang === 'en'
      ? /counterflow dual-frequency 38\.93%; opposite-sit dual-frequency 33\.60%; energy-aggregation counterflow single-frequency 26\.38%/
      : /逆流双频38\.93%、对置双频33\.60%、能量聚集逆流单频26\.38%/);
  });
}
