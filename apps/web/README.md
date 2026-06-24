# web

Jonathan W. Lin's personal website — a single **Next.js (App Router) + Tailwind
+ MDX** app, exported to static HTML and served by GitHub Pages.

It serves two sections from one build:

- **Homepage** at `/` — `app/(site)/` (white / Lora + Cabin "Grayscale" look).
- **Brain Dump** at `/brain-dump/` — `app/brain-dump/` (stone / IBM Plex Mono),
  a searchable, filterable collection of guides, reviews, and write-ups.

```
https://jonwlin.github.io/            # homepage
https://jonwlin.github.io/brain-dump/ # Brain Dump
```

## Project layout

```
apps/web/
├── app/
│   ├── layout.tsx            # root: loads all 3 fonts (CSS vars), neutral <body>
│   ├── globals.css           # @tailwind + .prose-bd (MDX content styles)
│   ├── favicon.ico           # shared site favicon
│   ├── not-found.tsx         # global 404
│   ├── (site)/               # homepage shell (route group — not in the URL)
│   │   ├── layout.tsx        # Navbar + white/serif shell
│   │   └── page.tsx          # the homepage (projects inline)
│   └── brain-dump/           # /brain-dump section
│       ├── layout.tsx        # stone/mono shell + section metadata
│       ├── page.tsx          # /brain-dump index (server -> client grid)
│       └── [slug]/page.tsx   # /brain-dump/<slug> topic detail (MDX)
├── components/
│   ├── Navbar.tsx            # client: homepage nav + mobile hamburger
│   ├── BrainDumpIndex.tsx    # client: search + category filter + card grid
│   ├── CategoryTag.tsx
│   └── mdx/index.tsx         # MDX components (Aside)
├── lib/
│   ├── home.ts               # shared homepage heading className
│   ├── categories.ts         # category metadata (client-safe)
│   └── content.ts            # collection-aware MDX loader (server)
├── public/                   # homepage images + docs (served from /)
└── content/brain-dump/       # one .mdx file per Brain Dump topic
```

The content loader is **collection-aware**: `getAllTopicMeta("brain-dump")`,
`getTopicBySlug("brain-dump", slug)`, etc. read `content/<collection>/`. A
second collection (a blog, notes) is just a new folder under `content/`.

## Add a new Brain Dump topic

Drop a new `.mdx` file in `content/brain-dump/` with frontmatter:

```mdx
---
title: "Best Shower Water Filter"
slug: "best-shower-water-filter"
category: "reviews"          # travel | reviews | skincare | tech | outdoors
description: "One or two sentences shown on the card."
tags: ["home", "water", "comparison"]
date: "2025-02-15"
---

Regular markdown + GFM. Use <Aside>…</Aside> for a "short version" box.
```

## Develop

```bash
npm install
npm run dev          # http://localhost:3000/  (homepage)
                     # http://localhost:3000/brain-dump  (Brain Dump)
```

## Build & deploy to GitHub Pages

Deploys are automated. **GitHub Actions** (`.github/workflows/deploy.yml`)
builds the app and publishes `out/` on every push to `master`; Pages **Source**
is set to "GitHub Actions". You only commit source — the static export is built
by CI and is **not** committed (`out/` is git-ignored).

```bash
npm run build        # produces ./out (git-ignored); the export root IS the site root
```

There is no `basePath` — the export root maps directly to `https://jonwlin.github.io/`.
