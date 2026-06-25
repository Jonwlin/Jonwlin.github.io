import { CATEGORY_COLORS } from "@/lib/categories";

type ColorMap = Record<string, { bg: string; text: string }>;

// Small colored category pill, shared by the index cards and the detail pages.
// Pure presentational component — safe in both client and server components.
// Pass `colors` to supply a different palette (e.g. recipe categories); defaults
// to the Brain Dump category colors.
export function CategoryTag({
  category,
  colors = CATEGORY_COLORS,
}: {
  category: string;
  colors?: ColorMap;
}) {
  const c = colors[category];
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
