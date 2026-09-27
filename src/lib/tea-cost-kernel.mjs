const missing = value => value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
const invalid = field => { throw new RangeError(`Invalid ${field}`); };
const text = value => typeof value === 'string' && value.trim().length > 0;
const MIN_NORMAL = 2 ** -1022;
function number(value, field, min, max = Infinity, exclusiveMin = false) {
  if (typeof value !== 'number' || !Number.isFinite(value) ||
      (exclusiveMin ? value <= min : value < min) || value > max) invalid(field);
  if (value !== 0 && Math.abs(value) < MIN_NORMAL) invalid('numerical input range');
}

// Input arithmetic has explicit decimal-16 semantics, not a pack-relative tolerance.
// BigInt fractions keep procurement comparisons exact after that normalization.
function decimal(value) {
  if (!Number.isFinite(value)) invalid('numerical range');
  const shortest = value.toString();
  const significant = shortest.split('e')[0].replace('.', '').replace(/^[-0]+/, '').length;
  const [mantissa, exponent = '0'] = (significant <= 16 ? shortest : value.toPrecision(16)).split('e');
  const places = (mantissa.split('.')[1] || '').length;
  const power = Number(exponent) - places;
  const digits = BigInt(mantissa.replace('.', ''));
  return power >= 0 ? [digits * 10n ** BigInt(power), 1n] : [digits, 10n ** BigInt(-power)];
}
const multiply = (a, b) => [a[0] * b[0], a[1] * b[1]];
const divide = (a, b) => [a[0] * b[1], a[1] * b[0]];
const greater = (a, b) => a[0] * b[1] > b[0] * a[1];
const fractionRecord = a => ({numerator: String(a[0]), denominator: String(a[1])});
function approximate(a) {
  const scale = 20 + String(a[1]).length - String(a[0]).length;
  const digits = scale >= 0 ? a[0] * 10n ** BigInt(scale) / a[1]
    : a[0] / (a[1] * 10n ** BigInt(-scale));
  return Number(`${digits}e${-scale}`);
}

export function calculate(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) invalid('input');
  const fields = ['analyte', 'assayReference', 'unit', 'basis', 'assay', 'targetMg', 'bottles',
    'correction', 'carrierPercent', 'moqKg', 'packKg', 'pricePerKg', 'currency', 'zeroPriceConfirmed', 'quoteMetadata'];
  for (const field of Object.keys(input)) if (!fields.includes(field)) invalid(`unsupported field ${field}`);
  if (!missing(input.carrierPercent)) number(input.carrierPercent, 'carrierPercent', 0, 100);
  if (input.quoteMetadata != null) {
    if (typeof input.quoteMetadata !== 'object' || Array.isArray(input.quoteMetadata)) invalid('quoteMetadata');
    for (const [key, value] of Object.entries(input.quoteMetadata))
      if (!['tradeTerm', 'location', 'tax', 'validity'].includes(key) || (!missing(value) && typeof value !== 'string')) invalid('quoteMetadata');
  }
  for (const field of ['analyte', 'assayReference']) if (!text(input[field])) invalid(field);
  if (!['%w/w', 'mg/g'].includes(input.unit)) invalid('unit');
  if (!['as-supplied', 'dry-basis'].includes(input.basis)) invalid('basis');
  number(input.assay, 'assay', 0, input.unit === '%w/w' ? 100 : 1000, true);
  number(input.targetMg, 'targetMg', 0, Infinity, true);
  if (!Number.isSafeInteger(input.bottles) || input.bottles <= 0) invalid('bottles');
  if (input.basis === 'dry-basis') {
    const c = input.correction;
    if (!c || !['LOD', 'KF'].includes(c.kind) || !text(c.reference) ||
        c.sameLotAndMethod !== true || c.appropriateForAssay !== true) invalid('correction evidence');
    number(c.percent, 'correction percent', 0);
    if (c.percent >= 100) invalid('correction percent');
  }
  const assayReportMgG = input.unit === '%w/w' ? input.assay * 10 : input.assay;
  const assaySupplyMgG = assayReportMgG * (input.basis === 'dry-basis' ? 1 - input.correction.percent / 100 : 1);
  const gramsPerBottle = input.targetMg / assaySupplyMgG;
  const reportExact = multiply(decimal(input.assay), [input.unit === '%w/w' ? 10n : 1n, 1n]);
  const correctionExact = input.basis === 'dry-basis' ? decimal(input.correction.percent) : [0n, 1n];
  const supplyExact = multiply(reportExact, [100n * correctionExact[1] - correctionExact[0], 100n * correctionExact[1]]);
  const requiredExact = divide(multiply(decimal(input.targetMg), [BigInt(input.bottles), 1000n]), supplyExact);
  // Preserve fail-closed intermediate-overflow behavior from the original kernel.
  if (!Number.isFinite(gramsPerBottle * input.bottles)) invalid('numerical range');
  const requiredKg = approximate(requiredExact);
  const moqKnown = !missing(input.moqKg);
  const packagingKnown = !missing(input.packKg);
  if (moqKnown) number(input.moqKg, 'moqKg', 0);
  if (packagingKnown) number(input.packKg, 'packKg', 0, Infinity, true);
  const moqExact = moqKnown ? decimal(input.moqKg) : [0n, 1n];
  const minimumExact = greater(requiredExact, moqExact) ? requiredExact : moqExact;
  const packExact = packagingKnown ? decimal(input.packKg) : null;
  const ratio = packagingKnown ? divide(minimumExact, packExact) : null;
  const packCount = packagingKnown ? Number((ratio[0] + ratio[1] - 1n) / ratio[1]) : null;
  if (packagingKnown && (!Number.isSafeInteger(packCount) || packCount <= 0)) invalid('numerical pack count');
  const orderExact = packagingKnown ? multiply(packExact, [BigInt(packCount), 1n]) : minimumExact;
  const orderKg = packagingKnown ? packCount * input.packKg : approximate(minimumExact);
  if (orderKg < requiredKg) invalid('numerical mass balance');
  if (!missing(input.pricePerKg)) {
    number(input.pricePerKg, 'pricePerKg', 0);
    if (!text(input.currency)) invalid('currency');
    if (input.pricePerKg === 0 && input.zeroPriceConfirmed !== true) invalid('zeroPriceConfirmed');
  }
  const cost = missing(input.pricePerKg) ? null : {
    currency: input.currency,
    consumedTotal: requiredKg * input.pricePerKg,
    purchaseCash: orderKg * input.pricePerKg,
    consumedPerBottle: requiredKg * input.pricePerKg / input.bottles,
    purchaseCashPerBottle: orderKg * input.pricePerKg / input.bottles,
  };
  for (const value of [assaySupplyMgG, gramsPerBottle, requiredKg, orderKg])
    if (!Number.isFinite(value) || value < MIN_NORMAL) invalid('numerical range');
  if (packagingKnown && (!Number.isSafeInteger(packCount) || packCount <= 0)) invalid('numerical pack count');
  if (cost) for (const key of ['consumedTotal', 'purchaseCash', 'consumedPerBottle', 'purchaseCashPerBottle'])
    if (!Number.isFinite(cost[key]) || (input.pricePerKg > 0 && cost[key] < MIN_NORMAL)) invalid('numerical cost');
  const quoteFields = ['tradeTerm', 'location', 'tax', 'validity'];
  const quoteMetadata = Object.fromEntries(quoteFields.map(field => [field, input.quoteMetadata?.[field] ?? null]));
  const evidence = { analyte: input.analyte, assayReference: input.assayReference,
    reportUnit: input.unit, basis: input.basis,
    correction: input.basis === 'dry-basis' ? {...input.correction} : null, quoteMetadata };
  const quoteMetadataComplete = quoteFields.every(field => text(quoteMetadata[field]));
  return { evidence, quoteMetadataComplete, accountingBasis: 'theoretical-input-per-bottle', assayReportMgG, cost, assaySupplyMgG, gramsPerBottle, requiredKg, orderKg, packCount,
    numericalSemantics: 'decimal16-inputs-exact-procurement-v1',
    exactMassKg: {required: fractionRecord(requiredExact), moq: fractionRecord(moqExact), order: fractionRecord(orderExact)},
    leftoverKg: orderKg - requiredKg, moqKnown, packagingKnown,
    orderQuantityStatus: packagingKnown ? 'pack-rounded' : 'unrounded-packaging-unknown' };

}
