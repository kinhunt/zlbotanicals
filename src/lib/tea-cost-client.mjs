import { calculateFields } from './tea-cost-input.mjs';
for (const root of document.querySelectorAll('#tea-cost-calculator')) {
 const zh = root.dataset.lang === 'zh';
 const t = (en, cn) => zh ? cn : en;
 const fields = [...root.querySelectorAll('[data-field]')];
 const status = root.querySelector('[data-status]');
 const results = root.querySelector('[data-results]');
 const correction = root.querySelector('[data-correction]');
 const clearResults = () => { results.replaceChildren(); results.hidden = true; };
 const syncBasis = () => {
  const dry = root.querySelector('#tc-basis').value === 'dry-basis';
  correction.hidden = !dry; correction.disabled = !dry;
 };
 const invalidate = () => {
  clearResults(); syncBasis();
  status.textContent = t('Inputs changed. Previous results cleared; calculate again.', '输入已更改，旧结果已清除；请重新计算。');
 };
 root.querySelector('[data-inputs]').disabled = false;
 root.addEventListener('input', invalidate);
 root.addEventListener('change', invalidate);
 root.querySelector('[data-clear]').addEventListener('click', () => {
  for (const f of fields) { if (f.type === 'checkbox') f.checked = false; else f.value = ''; }
  invalidate(); status.textContent = t('All entries cleared. No calculation.', '已清空全部输入，尚未计算。');
 });
 root.querySelector('[data-calculate]').addEventListener('click', () => {
  clearResults();
  const input = Object.fromEntries(fields.filter(f => !f.disabled).map(f => [f.dataset.field, f.type === 'checkbox' ? f.checked : f.value]));
  try {
   const a = calculateFields(input);
   if (a.numericalSemantics !== 'decimal16-inputs-exact-procurement-v1') throw new Error('Unreviewed semantics');
   const fmt = n => String(Number(n.toPrecision(12)));
   const card = (heading, rows) => {
    const section = document.createElement('section'); section.className = 'result-card';
    const h = document.createElement('h3'); h.textContent = heading; section.append(h);
    const dl = document.createElement('dl');
    for (const [key,label,value] of rows) {
     const dt = document.createElement('dt'); dt.textContent = label;
     const dd = document.createElement('dd'); dd.dataset.value = key; dd.textContent = value;
     dl.append(dt,dd);
    }
    section.append(dl); results.append(section);
   };
   card(t('Theoretical consumption', '理论耗用量'), [
    ['analyte',t('Analyte / report reference', '检测项目／报告依据'),input.analyte + ' / ' + input.assayReference],
    ['report',t('Original assay and basis', '原始报告与基准'),input.assay+' '+input.unit+' / '+(input.basis==='dry-basis'?t('Dry basis','干基'):t('As supplied','原样基准'))],
    ['assaySupplyMgG',t('Supplied-powder assay', '供应粉末含量'),fmt(a.assaySupplyMgG)+' mg/g'],
    ['gramsPerBottle',t('Powder input per bottle', '每瓶粉末投料'),fmt(a.gramsPerBottle)+' g'],
    ['requiredKg',t('Required powder', '所需粉末'),fmt(a.requiredKg)+' kg'],
   ]);
   card(t('Provisional order and leftover', '暂定采购量与剩余'), [
    ['orderKg',t('Order quantity', '采购量'),fmt(a.orderKg)+' kg'],
    ['packCount',t('Pack count', '包装份数'),a.packagingKnown?String(a.packCount):t('Unknown packaging; not pack-rounded','包装未知，未按包装取整')],
    ['moq',t('MOQ status', 'MOQ状态'),a.moqKnown?input.moqKg+' kg':t('Unknown; not a confirmed zero MOQ','未知，不代表已确认MOQ为零')],
    ['leftoverKg',t('Unconsumed stock', '未耗用库存'),fmt(a.leftoverKg)+' kg'],
   ]);
   if(a.cost) card(t('Ingredient-only costs — '+a.cost.currency, '仅原料成本 — '+a.cost.currency), [
    ['consumedTotal',t('Consumed ingredient cost', '耗用原料成本'),fmt(a.cost.consumedTotal)+' '+a.cost.currency],
    ['consumedPerBottle',t('Consumed cost per bottle', '每瓶耗用成本'),fmt(a.cost.consumedPerBottle)+' '+a.cost.currency],
    ['purchaseCash',t('Order cash, including unconsumed stock', '订单现金支出（含未耗用库存）'),fmt(a.cost.purchaseCash)+' '+a.cost.currency],
    ['purchaseCashPerBottle',t('Order cash per planned bottle — not consumption cost', '每计划瓶订单现金支出（非耗用成本）'),fmt(a.cost.purchaseCashPerBottle)+' '+a.cost.currency],
   ]);
   else card(t('Cost', '成本'), [['unknownPrice',t('Quote status','报价状态'),t('Unknown price — awaiting quotation','单价未知，待报价')]]);
   const details=document.createElement('details');
   const summary=document.createElement('summary'); summary.textContent=t('Exact procurement mass audit (kg fractions)', '精确采购质量核对（kg分数）'); details.append(summary);
   for (const [key,label] of [['required',t('Required','所需')],['order',t('Order','采购')]]) {
    const p=document.createElement('p');p.className='exact-mass';p.textContent=label+': '+a.exactMassKg[key].numerator+' / '+a.exactMassKg[key].denominator+' kg';details.append(p);
   }
   results.append(details);results.hidden=false;
   status.textContent=t('Calculated. Display values use up to 12 significant digits; exact fractions govern procurement minimums. Targets are theoretical input, not retained output. Quote terms and suitability still need review.', '已计算。显示最多12位有效数字；采购下限以精确分数为准。目标为理论投入而非保留产出，报价条款及适用性仍须审核。');
  } catch {
   status.textContent=t('No result. Check required analyte/report, explicit unit and basis, positive assay/target and integer bottles. Use supported plain decimals; optional entries must be valid or blank. Dry basis needs all correction evidence and both confirmations; zero price needs confirmation and every price needs currency. Values outside the supported numerical range are rejected.', '无结果。请核对检测项目／报告、明确单位与基准、正数含量／目标及整数瓶数。请用支持的普通小数；选填项须有效或留空。干基须填全校正依据并勾选两项确认；零价须确认，有单价须填币种。超出支持数值范围时拒绝计算。');
  }
 });
}
