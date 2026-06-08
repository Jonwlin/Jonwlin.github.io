import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Aside — the "short version" box. Just a quiet gray box, no label.   */
/* Used instead of a TL;DR callout.                                    */
/* ------------------------------------------------------------------ */
export function Aside({ children }: { children: ReactNode }) {
  return (
    <div className="my-5 rounded-[3px] bg-surface p-4 text-[0.8rem] text-body [&>p]:my-1 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
      {children}
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
/* Renders as a plain, full-width notes table. Winner row gets a ⭐    */
/* in its first cell.                                                 */
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
    <div className="my-5 overflow-x-auto">
      <table className="w-full border-collapse text-[0.75rem]">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="border-b border-[#d6d3d1] px-2 py-1.5 text-left font-medium text-muted"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="hover:bg-line-soft">
              {row.cells.map((c, i) => (
                <td
                  key={i}
                  className="border-b border-line-soft px-2 py-1.5 text-body"
                >
                  {row.winner && i === 0 ? <>⭐ {c}</> : c}
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
/* Component map handed to <MDXRemote />                              */
/* ------------------------------------------------------------------ */
export const mdxComponents = {
  Aside,
  ComparisonTable,
};
