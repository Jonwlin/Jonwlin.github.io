"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CATEGORY_ORDER } from "@/lib/categories";
import { CategoryTag } from "@/components/CategoryTag";
import type { TopicMeta } from "@/lib/content";

type Filter = "all" | (typeof CATEGORY_ORDER)[number];
type View = "grid" | "list";

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

function GridIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <rect x="1" y="2" width="14" height="2" rx="1" />
      <rect x="1" y="7" width="14" height="2" rx="1" />
      <rect x="1" y="12" width="14" height="2" rx="1" />
    </svg>
  );
}

export default function BrainDumpIndex({ topics }: { topics: TopicMeta[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("grid");

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
    <main
      className="mx-auto px-6 pb-24 pt-12"
      style={{ width: "60vw", minWidth: "min(700px, 100%)", maxWidth: "100%" }}
    >
      {/* Back to the homepage (served at the site root, "/"). */}
      <a
        href="/"
        className="mb-6 inline-block text-[0.75rem] font-medium text-secondary hover:text-ink"
      >
        ← home
      </a>

      {/* Header — no border/decoration below */}
      <header>
        <h1 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-ink">
          brain dump{" "}
          <span className="font-normal text-muted">/ notes &amp; rabbit holes</span>
        </h1>
        <p className="mt-1 text-[0.8rem] text-secondary">
          things i spent too long researching
        </p>
      </header>

      {/* Toolbar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-y-3">
        {/* Left: search + filters */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search..."
            aria-label="search entries"
            className="w-[220px] max-w-full rounded-[3px] border border-line bg-surface px-2.5 py-1.5 text-[0.75rem] text-ink placeholder:text-muted outline-none focus:border-focus"
          />
          <div className="flex flex-wrap items-center gap-1.5">
            {filters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={
                    "rounded-[3px] border px-2 py-1 text-[0.75rem] font-medium transition-colors " +
                    (active
                      ? "border-ink bg-ink text-[#fafaf9]"
                      : "border-divider bg-surface text-secondary hover:border-ink hover:text-ink")
                  }
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: grid/list toggle */}
        <div className="flex items-center rounded-[2px] bg-line p-0.5">
          {(["grid", "list"] as View[]).map((v) => {
            const active = view === v;
            return (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                aria-pressed={active}
                aria-label={`${v} view`}
                className={
                  "flex h-6 w-7 items-center justify-center rounded-[2px] transition-colors " +
                  (active
                    ? "bg-surface text-ink"
                    : "bg-transparent text-muted hover:text-ink")
                }
              >
                {v === "grid" ? <GridIcon /> : <ListIcon />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Entry count */}
      <p className="mt-6 text-[0.75rem] text-muted">
        {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
      </p>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="py-20 text-center text-[0.8rem] text-muted">nothing here.</p>
      ) : view === "grid" ? (
        <div className="mt-3 grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
          {filtered.map((t) => (
            <Link
              key={t.slug}
              href={`/brain-dump/${t.slug}`}
              className="flex min-h-[140px] flex-col rounded-[4px] border border-line bg-surface px-6 py-5 transition-colors hover:border-edge hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center justify-between">
                <CategoryTag category={t.category} />
                <time className="text-[0.7rem] text-muted" dateTime={t.date}>
                  {formatDate(t.date)}
                </time>
              </div>
              <h2 className="mb-2 mt-3 text-[0.9rem] font-semibold leading-[1.4] text-ink">
                {t.title}
              </h2>
              <p className="line-clamp-3 text-[0.75rem] leading-[1.55] text-secondary">
                {t.description}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-3 border-t border-line">
          {filtered.map((t) => (
            <Link
              key={t.slug}
              href={`/brain-dump/${t.slug}`}
              className="block border-b border-line bg-surface px-4 py-4 transition-colors hover:bg-[#fafaf9]"
            >
              <div className="flex items-center justify-between">
                <CategoryTag category={t.category} />
                <time className="text-[0.7rem] text-muted" dateTime={t.date}>
                  {formatDate(t.date)}
                </time>
              </div>
              <h2 className="mb-1 mt-2 text-[0.9rem] font-semibold leading-[1.4] text-ink">
                {t.title}
              </h2>
              <p className="text-[0.75rem] leading-[1.55] text-secondary">
                {t.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
