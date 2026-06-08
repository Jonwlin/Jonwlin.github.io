// Category metadata. No server-only imports here so this file is safe to use
// from client components (the index filter row). Labels are lowercase by design.

export type CategoryKey =
  | "travel"
  | "reviews"
  | "skincare"
  | "tech"
  | "outdoors";

// Order used to render the inline filters (with "all" prepended in the UI).
export const CATEGORY_ORDER: CategoryKey[] = [
  "travel",
  "reviews",
  "skincare",
  "tech",
  "outdoors",
];

// The label is just the lowercase key — no emoji, no color, no styling.
export function categoryLabel(key: string): string {
  return key.toLowerCase();
}
