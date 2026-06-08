"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CATEGORY_ORDER, CATEGORIES, categoryMeta } from "@/lib/categories";
import type { TopicMeta } from "@/lib/content";

type Filter = "all" | (typeof CATEGORY_ORDER)[number];

function CategoryBadge({ category }: { category: string }) {
  const meta = categoryMeta(category);
  if (!meta) return null;
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ backgroundColor: `${meta.color}22`, color: meta.color }}
    >
      {meta.label}
    </span>
  );
}

function formatDate(iso: string): string {
  if (!iso) return "";
  // Parse as UTC to avoid timezone drift in static output.
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BrainDumpIndex({ topics }: { topics: TopicMeta[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return topics.filter((t) => {
      if (filter !== "all" && t.category !== filter) return false;
      if (!q) return true;
      const haystack = [
        t.title,
        t.description,
        ...t.tags,
        categoryMeta(t.category)?.label ?? t.category,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [topics, query, filter]);

  const pills: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    ...CATEGORY_ORDER.map((k) => ({ key: k, label: CATEGORIES[k].label })),
  ];

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="gradient-text text-4xl font-extrabold sm:text-5xl">
          🧠 Brain Dump
        </h1>
        <p className="mt-3 text-lg text-[#9a9aa5]">
          Guides, reviews, and rabbit holes.
        </p>
      </header>

      {/* Search */}
      <div className="mx-auto mb-5 max-w-2xl">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search titles, descriptions, tags…"
          aria-label="Search topics"
          className="w-full rounded-xl border border-[#2a2a3a] bg-[#141420] px-4 py-3 text-[#e7e7ea] placeholder-[#6b6b78] outline-none transition focus:border-[#667eea] focus:ring-2 focus:ring-[#667eea]/40"
        />
      </div>

      {/* Filter pills */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {pills.map((p) => {
          const active = filter === p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setFilter(p.key)}
              aria-pressed={active}
              className={
                active
                  ? "rounded-full bg-[#667eea] px-4 py-1.5 text-sm font-semibold text-white transition"
                  : "rounded-full border border-[#2f2f40] bg-[#16161f] px-4 py-1.5 text-sm font-medium text-[#b6b6c2] transition hover:border-[#667eea]/60 hover:text-white"
              }
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <p className="mb-4 text-center text-sm text-[#7c7c88]">
        {filtered.length} {filtered.length === 1 ? "topic" : "topics"}
      </p>

      {/* Grid / empty state */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#2a2a3a] py-16 text-center text-[#8a8a96]">
          <div className="mb-2 text-3xl">🔍</div>
          No matches found.
        </div>
      ) : (
        <div
          className="grid gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {filtered.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className="group block rounded-2xl border border-[#262633] bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#667eea] hover:shadow-glow"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <CategoryBadge category={t.category} />
                <time className="text-xs text-[#6f6f7b]" dateTime={t.date}>
                  {formatDate(t.date)}
                </time>
              </div>
              <h2 className="mb-1.5 text-[1.1rem] font-bold leading-snug text-[#f3f3f6]">
                <span className="mr-1">{t.emoji}</span>
                {t.title}
              </h2>
              <p className="line-clamp-3 text-sm text-[#9a9aa5]">
                {t.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
