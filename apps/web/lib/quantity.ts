// Quantity math for the serving-size adjuster. Pure, dependency-free, and safe
// in both server and client components.

/** Scale a base quantity from its base serving count to a target count. */
export function scaleQuantity(
  base: number,
  baseServings: number,
  targetServings: number,
): number {
  if (!Number.isFinite(base) || baseServings <= 0 || targetServings <= 0) {
    return base;
  }
  return (base * targetServings) / baseServings;
}

// Common cooking fractions mapped to their unicode glyphs, by eighths/thirds.
const UNICODE_FRACTIONS: Record<string, string> = {
  "1/8": "⅛",
  "1/4": "¼",
  "1/3": "⅓",
  "3/8": "⅜",
  "1/2": "½",
  "5/8": "⅝",
  "2/3": "⅔",
  "3/4": "¾",
  "7/8": "⅞",
};

// Candidate fractional parts (value → "n/d" key), nearest-snapped during format.
const FRACTION_CANDIDATES: { value: number; key: string }[] = [
  { value: 0, key: "0" },
  { value: 1 / 8, key: "1/8" },
  { value: 1 / 4, key: "1/4" },
  { value: 1 / 3, key: "1/3" },
  { value: 3 / 8, key: "3/8" },
  { value: 1 / 2, key: "1/2" },
  { value: 5 / 8, key: "5/8" },
  { value: 2 / 3, key: "2/3" },
  { value: 3 / 4, key: "3/4" },
  { value: 7 / 8, key: "7/8" },
  { value: 1, key: "1" },
];

/**
 * Format a (possibly scaled) quantity for display. Whole numbers render plainly;
 * fractional values snap to the nearest common cooking fraction and render with
 * a unicode glyph (e.g. 2.25 → "2¼", 0.5 → "½"). Large values (≥ 10) round to a
 * clean decimal instead, since fractions read oddly at scale.
 */
export function formatQuantity(n: number): string {
  if (!Number.isFinite(n)) return "";
  if (n === 0) return "0";

  // At larger magnitudes, decimals are clearer than eighths.
  if (n >= 10) {
    const rounded = Math.round(n * 4) / 4; // nearest quarter
    return Number.isInteger(rounded) ? String(rounded) : String(rounded);
  }

  const whole = Math.floor(n);
  const frac = n - whole;

  // Snap the fractional part to the nearest candidate.
  let best = FRACTION_CANDIDATES[0];
  let bestDist = Math.abs(frac - best.value);
  for (const cand of FRACTION_CANDIDATES) {
    const dist = Math.abs(frac - cand.value);
    if (dist < bestDist) {
      best = cand;
      bestDist = dist;
    }
  }

  // Snapped up to the next whole number.
  if (best.key === "1") {
    return String(whole + 1);
  }
  if (best.key === "0") {
    return whole === 0 ? "0" : String(whole);
  }

  const glyph = UNICODE_FRACTIONS[best.key];
  if (whole === 0) return glyph;
  return `${whole}${glyph}`;
}
