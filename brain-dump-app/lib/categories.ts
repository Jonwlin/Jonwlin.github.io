// Category metadata. No server-only imports here so this file is safe to use
// from client components (the index filter pills + cards).

export type CategoryKey =
  | "travel"
  | "reviews"
  | "skincare"
  | "tech"
  | "outdoors";

export type CategoryMeta = {
  key: CategoryKey;
  label: string; // includes emoji, e.g. "✈️ Travel"
  emoji: string;
  color: string; // pill / badge accent
};

export const CATEGORIES: Record<CategoryKey, CategoryMeta> = {
  travel: { key: "travel", label: "✈️ Travel", emoji: "✈️", color: "#3b82f6" },
  reviews: { key: "reviews", label: "🏷️ Reviews", emoji: "🏷️", color: "#f59e0b" },
  skincare: { key: "skincare", label: "🧴 Skincare", emoji: "🧴", color: "#ec4899" },
  tech: { key: "tech", label: "💻 Tech", emoji: "💻", color: "#22c55e" },
  outdoors: { key: "outdoors", label: "⛺ Outdoors", emoji: "⛺", color: "#10b981" },
};

// Order used to render the filter pills (with "All" prepended in the UI).
export const CATEGORY_ORDER: CategoryKey[] = [
  "travel",
  "reviews",
  "skincare",
  "tech",
  "outdoors",
];

export function categoryMeta(key: string): CategoryMeta | undefined {
  return CATEGORIES[key as CategoryKey];
}
