import {calculate} from '../src/lib/tea-cost-kernel.mjs';

// Invented arithmetic fixture only; no supplier, price or assay claim.
const input = {
  analyte: 'Synthetic marker', assayReference: 'Synthetic report, no laboratory claim',
  unit: '%w/w', basis: 'as-supplied', assay: 100,
  targetMg: 134, bottles: 1000, moqKg: 5, packKg: 1,
  pricePerKg: 100, currency: 'SYN',
  quoteMetadata: {tradeTerm: 'Synthetic term', location: 'Synthetic location',
    tax: 'Synthetic excluded', validity: 'Synthetic, not a quote'},
};
const result = calculate(input);
console.log(JSON.stringify({
  notice: 'SYNTHETIC arithmetic fixture — not vendor data. Research kernel, not a website tool.',
  input, result,
  display: {requiredKg: result.requiredKg.toFixed(6), consumedCost: result.cost.consumedTotal.toFixed(2),
    purchaseCash: result.cost.purchaseCash.toFixed(2)},
}, null, 2));
