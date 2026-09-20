function massNumber(value, max) {
  if (value == null || String(value).trim() === '') return null;
  const text = String(value).trim();
  if (!/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(text)) throw new RangeError('Invalid mass value');
  const number = Number(text);
  if (!Number.isFinite(number) || number > max) throw new RangeError('Mass fraction out of range');
  return number;
}

/** Returns theoretical mg/g of final formula; null means unknown, never zero. */
export function contribution(value, unit, addition, basis) {
  if (basis !== 'as-supplied') throw new RangeError('As-supplied basis required');
  if (!['mg/g', '%'].includes(unit)) throw new RangeError('Unsupported unit');
  const concentration = massNumber(value, unit === '%' ? 100 : 1000);
  const rate = massNumber(addition, 100);
  if (concentration === null || rate === null) return null;
  return concentration * (unit === '%' ? 10 : 1) * (rate / 100);
}

/** All entered distinct components share one mass denominator; missing values stay unknown. */
export function markerContributions(rows, addition, basis) {
  const supplied = rows.map(([value, unit]) => contribution(value, unit, '100', basis));
  if (supplied.reduce((sum, value) => sum + (value ?? 0), 0) > 1000 + 1e-9) {
    throw new RangeError('Known component mass exceeds whole supplied material');
  }
  return rows.map(([value, unit]) => contribution(value, unit, addition, basis));
}
