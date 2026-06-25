// Recipe category metadata. No server-only imports here so this file is safe to
// use from both client and server components. Labels are lowercase by design.
// Mirrors lib/categories.ts (Brain Dump) but with a food-oriented palette so the
// shared CategoryTag / ContentIndex can render recipe pills with their own colors.

export type RecipeCategoryKey =
  | "breakfast"
  | "mains"
  | "sides"
  | "dessert"
  | "drinks"
  | "baking"
  | "snacks";

// Order used to render the inline filters (with "all" prepended in the UI).
export const RECIPE_CATEGORY_ORDER: RecipeCategoryKey[] = [
  "breakfast",
  "mains",
  "sides",
  "dessert",
  "drinks",
  "baking",
  "snacks",
];

// Tag colors per category: { background, text }. Same shape as CATEGORY_COLORS.
export const RECIPE_CATEGORY_COLORS: Record<
  RecipeCategoryKey,
  { bg: string; text: string }
> = {
  breakfast: { bg: "#fef3c7", text: "#92400e" }, // amber
  mains: { bg: "#fee2e2", text: "#991b1b" }, // red
  sides: { bg: "#d1fae5", text: "#065f46" }, // emerald
  dessert: { bg: "#fce7f3", text: "#9d174d" }, // pink
  drinks: { bg: "#dbeafe", text: "#1e40af" }, // blue
  baking: { bg: "#ffedd5", text: "#9a3412" }, // orange
  snacks: { bg: "#ede9fe", text: "#5b21b6" }, // violet
};

// The label is just the lowercase key — no emoji.
export function recipeCategoryLabel(key: string): string {
  return key.toLowerCase();
}
