import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Aside — the summary box at the top of a write-up.                   */
/* Renders a bold "The short version:" label followed by the takeaway. */
/* The only custom MDX component; everything else is plain markdown.   */
/* ------------------------------------------------------------------ */
export function Aside({ children }: { children: ReactNode }) {
  return (
    <aside className="mb-10 rounded-[4px] border border-line bg-surface px-6 py-5 text-[0.8rem] leading-[1.6] text-body">
      <p className="mb-1 font-semibold text-ink">The short version:</p>
      <div className="[&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&>p]:my-2">
        {children}
      </div>
    </aside>
  );
}

/* Component map handed to <MDXRemote />. */
export const mdxComponents = {
  Aside,
};
