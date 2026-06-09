# Brain Dump

A searchable, filterable collection of guides, reviews, and project write-ups.
Built with **Next.js (App Router) + Tailwind + MDX** and exported to static HTML.

It is served from the parent GitHub Pages site at:

```
https://jonwlin.github.io/brain-dump/
```

## Project layout

```
apps/brain-dump/
├── app/
│   ├── layout.tsx          # root layout + dark theme
│   ├── page.tsx            # /brain-dump index (server -> client grid)
│   ├── [slug]/page.tsx     # /brain-dump/<slug> topic detail (MDX)
│   └── not-found.tsx
├── components/
│   ├── BrainDumpIndex.tsx  # client: search + category filter + card grid
│   └── mdx/index.tsx       # TLDR, Callout, ComparisonTable, ProsCons
├── lib/
│   ├── categories.ts       # category metadata (client-safe)
│   └── content.ts          # reads /content/brain-dump/*.mdx (server)
└── content/brain-dump/     # one .mdx file per topic
```

## Add a new topic

Drop a new `.mdx` file in `content/brain-dump/` with frontmatter:

```mdx
---
title: "Best Shower Water Filter"
slug: "best-shower-water-filter"
emoji: "🚿"
category: "reviews"          # travel | reviews | skincare | tech | outdoors
description: "One or two sentences shown on the card."
tags: ["home", "water", "comparison"]
date: "2025-02-15"
---

<TLDR>Short summary.</TLDR>

## A heading

Regular markdown, plus these components:

<Callout title="Tip">A left-border accent box.</Callout>

<ProsCons pros={["Cheap", "Easy"]} cons={["Loud"]} />

<ComparisonTable
  headers={["Option", "Price"]}
  rows={[
    { cells: ["Winner", "$30"], winner: true },
    { cells: ["Other", "$20"] },
  ]}
/>
```

## Develop

```bash
npm install
npm run dev          # http://localhost:3000/brain-dump
```

## Build & deploy to GitHub Pages

Deploys are automated. **GitHub Actions** (`.github/workflows/deploy.yml`)
builds the whole site and publishes it on every push to `master`; Pages
**Source** is set to "GitHub Actions". You only commit source — the static
export is built by CI and is **not** committed (`out/` is git-ignored).

To verify the static export builds locally:

```bash
npm run build        # produces ./out (git-ignored)
```

GitHub Pages serves the result at `/brain-dump/` (the app sets
`basePath: /brain-dump`).

> Want to host the detail pages on Vercel instead? This is a standard Next.js
> app — remove `output: 'export'` / `basePath` from `next.config.mjs`, point
> Vercel at this folder, and update the homepage nav link. No code changes.
