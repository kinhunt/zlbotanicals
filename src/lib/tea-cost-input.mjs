import { calculate } from './tea-cost-kernel.mjs';
// Lexical validation precedes Number conversion. No exponent or locale guessing.
export function parseDecimal(raw, optional = false) {
  if (optional && raw === '') return undefined;
  if (typeof raw !== 'string' || raw.length > 350 || !/^\d+(?:\.\d+)?$/.test(raw)) throw new RangeError('decimal');
  const meaningful = raw.replace('.', '').replace(/^0+/, '').replace(/0+$/, '');
  if (meaningful.length > 16) throw new RangeError('precision');
  const value = Number(raw);
  if (!Number.isFinite(value) || (value === 0 && /[1-9]/.test(raw)) || (value !== 0 && value < 2 ** -1022)) throw new RangeError('range');
  // Check the reviewed kernel's actual decimal normalization, not just digit count.
  const shortest = value.toString();
  const significant = shortest.split('e')[0].replace('.', '').replace(/^[-0]+/, '').length;
  const canonical = significant <= 16 ? shortest : value.toPrecision(16);
  const fraction = text => {
    const [mantissa, exponent = '0'] = text.split('e');
    const places = (mantissa.split('.')[1] || '').length;
    const power = Number(exponent) - places;
    const digits = BigInt(mantissa.replace('.', ''));
    return power >= 0 ? [digits * 10n ** BigInt(power), 1n] : [digits, 10n ** BigInt(-power)];
  };
  const a = fraction(raw), b = fraction(canonical);
  if (a[0] * b[1] !== b[0] * a[1]) throw new RangeError('precision roundtrip');
  return value;
}

export function calculateFields(fields) {
  const input = {};
  for (const key of ['analyte','assayReference','unit','basis','currency']) input[key] = fields[key];
  for (const key of ['assay','targetMg','bottles']) input[key] = parseDecimal(fields[key]);
  for (const key of ['moqKg','packKg','pricePerKg']) input[key] = parseDecimal(fields[key] ?? '', true);
  input.zeroPriceConfirmed = fields.zeroPriceConfirmed === true;
  if (input.basis === 'dry-basis') input.correction = {
    kind: fields.correctionKind, percent: parseDecimal(fields.correctionPercent),
    reference: fields.correctionReference,
    sameLotAndMethod: fields.sameLotAndMethod === true,
    appropriateForAssay: fields.appropriateForAssay === true,
  };
  return calculate(input);
}
