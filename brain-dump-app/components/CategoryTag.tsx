import { CATEGORY_COLORS, type CategoryKey } from "@/lib/categories";

// Small colored category pill, shared by the index cards and the detail page.
// Pure presentational component — safe in both client and server components.
export function CategoryTag({ category }: { category: string }) {
  const c = CATEGORY_COLORS[category as CategoryKey];
  if (!c) return null;
  return (
    <span
      className="inline-block rounded-[2px] px-[0.5rem] py-[0.2rem] text-[0.65rem] font-medium uppercase tracking-[0.04em]"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {category}
    </span>
  );
}
