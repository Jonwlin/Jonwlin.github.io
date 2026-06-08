"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CATEGORY_ORDER, categoryLabel } from "@/lib/categories";
import type { TopicMeta } from "@/lib/content";

type Filter = "all" | (typeof CATEGORY_ORDER)[number];

function formatDate(iso: string): string {
  if (!iso) return "";
  // Parse as UTC to avoid timezone drift in static output.
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    })
    .toLowerCase();
}

export default function BrainDumpIndex({ topics }: { topics: TopicMeta[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return topics.filter((t) => {
      if (filter !== "all" && t.category !== filter) return false;
      if (!q) return true;
      const haystack = [t.title, t.description, ...t.tags, t.category]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [topics, query, filter]);

  const filters: Filter[] = ["all", ...CATEGORY_ORDER];

  return (
    <main className="mx-auto max-w-[860px] px-5 pb-24 pt-12">
      {/* Header */}
      <header className="border-b border-line pb-5">
        <h1 className="text-[1.1rem] font-medium tracking-[-0.01em] text-ink">
          brain dump <span className="text-muted">/ notes &amp; rabbit holes</span>
        </h1>
        <p className="mt-1 text-[0.7rem] text-muted">
          things i spent too long researching
        </p>
      </header>

      {/* Search + inline filters */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search..."
          aria-label="search entries"
          className="w-full max-w-[220px] rounded-[3px] border border-line bg-bg px-2.5 py-1.5 text-[0.8rem] text-ink placeholder:text-faint outline-none focus:border-focus"
        />

        <div className="flex flex-wrap items-center gap-2 text-[0.7rem]">
          {filters.map((f, i) => {
            const active = filter === f;
            return (
              <span key={f} className="flex items-center gap-2">
                {i > 0 ? <span className="text-line">|</span> : null}
                <button
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={
                    active
                      ? "rounded-[3px] bg-ink px-1.5 py-0.5 text-bg"
                      : "px-1.5 py-0.5 text-muted hover:text-ink"
                  }
                >
                  {f === "all" ? "all" : categoryLabel(f)}
                </button>
              </span>
            );
          })}
        </div>
      </div>

      {/* Entry count */}
      <p className="mt-5 text-[0.65rem] text-faint">
        {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
      </p>

      {/* List (not a grid) */}
      {filtered.length === 0 ? (
        <p className="py-20 text-center text-[0.8rem] text-muted">nothing here.</p>
      ) : (
        <ul className="mt-1 border-t border-line-soft">
          {filtered.map((t) => (
            <li key={t.slug} className="border-b border-line-soft">
              <Link href={`/${t.slug}`} className="block px-2 py-4 hover:bg-line-soft">
                <div className="flex items-center justify-between text-[0.65rem] text-faint">
                  <span>{t.category}</span>
                  <time dateTime={t.date}>{formatDate(t.date)}</time>
                </div>
                <h2 className="mt-1.5 text-[0.9rem] font-medium text-ink">
                  {t.title}
                </h2>
                <p className="mt-1 text-[0.8rem] text-muted">{t.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
