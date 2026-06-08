// Category metadata. No server-only imports here so this file is safe to use
// from both client and server components. Labels are lowercase by design.

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

// Tag colors per category: { background, text }.
export const CATEGORY_COLORS: Record<CategoryKey, { bg: string; text: string }> =
  {
    travel: { bg: "#dbeafe", text: "#1e40af" }, // blue
    reviews: { bg: "#fef3c7", text: "#92400e" }, // amber
    skincare: { bg: "#fce7f3", text: "#9d174d" }, // pink
    tech: { bg: "#d1fae5", text: "#065f46" }, // emerald
    outdoors: { bg: "#ffedd5", text: "#9a3412" }, // orange
  };

// The label is just the lowercase key — no emoji.
export function categoryLabel(key: string): string {
  return key.toLowerCase();
}
