import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* TL;DR callout                                                       */
/* ------------------------------------------------------------------ */
export function TLDR({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 rounded-xl border border-[#667eea]/40 bg-[#667eea]/10 p-4">
      <div className="mb-1 text-sm font-bold uppercase tracking-wide text-[#a5b4ff]">
        ⚡ TL;DR
      </div>
      <div className="text-[#dcdce4] [&>p]:my-1">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Callout (tip / warning)                                            */
/* ------------------------------------------------------------------ */
export function Callout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="my-6 rounded-r-lg border-l-4 border-[#667eea] bg-[#16161f] px-4 py-3">
      {title ? (
        <div className="mb-1 font-bold text-[#c7d0ff]">{title}</div>
      ) : null}
      <div className="text-[#cfcfd6] [&>p]:my-1">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ComparisonTable                                                    */
/*   <ComparisonTable                                                 */
/*     headers={["Filter", "Chlorine", "Price"]}                      */
/*     rows={[                                                        */
/*       { cells: ["AquaBliss", "Great", "$30"], winner: true },     */
/*       { cells: ["Other", "OK", "$20"] },                          */
/*     ]}                                                             */
/*   />                                                               */
/* ------------------------------------------------------------------ */
type ComparisonRow = { cells: ReactNode[]; winner?: boolean };

export function ComparisonTable({
  headers,
  rows,
}: {
  headers: ReactNode[];
  rows: ComparisonRow[];
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-[#2a2a3a]">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#20202c]">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-bold text-[#e9e9f1]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr
              key={r}
              className={
                row.winner
                  ? "border-t border-[#2a2a3a] bg-[#667eea]/12 transition-colors hover:bg-[#667eea]/20"
                  : "border-t border-[#2a2a3a] transition-colors hover:bg-[#ffffff0a]"
              }
            >
              {row.cells.map((c, i) => (
                <td key={i} className="px-4 py-3 text-[#cfcfd6]">
                  {row.winner && i === 0 ? (
                    <span className="font-semibold text-white">⭐ {c}</span>
                  ) : (
                    c
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ProsCons                                                           */
/* ------------------------------------------------------------------ */
export function ProsCons({
  pros,
  cons,
}: {
  pros: ReactNode[];
  cons: ReactNode[];
}) {
  return (
    <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4">
        <div className="mb-2 font-bold text-green-400">✅ Pros</div>
        <ul className="list-disc space-y-1 pl-5 text-[#cfcfd6]">
          {pros.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
        <div className="mb-2 font-bold text-red-400">❌ Cons</div>
        <ul className="list-disc space-y-1 pl-5 text-[#cfcfd6]">
          {cons.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Component map handed to <MDXRemote />                              */
/* ------------------------------------------------------------------ */
export const mdxComponents = {
  TLDR,
  Callout,
  ComparisonTable,
  ProsCons,
};
