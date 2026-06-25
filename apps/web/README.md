# web

Jonathan W. Lin's personal website — a single **Next.js (App Router) + Tailwind
+ MDX** app, exported to static HTML and served by GitHub Pages.

It serves three sections from one build:

- **Homepage** at `/` — `app/(site)/` (white / Lora + Cabin "Grayscale" look).
- **Brain Dump** at `/brain-dump/` — `app/brain-dump/` (stone / IBM Plex Mono),
  a searchable, filterable collection of guides, reviews, and write-ups.
- **Recipes** at `/recipes/` — `app/recipes/` (stone / IBM Plex Mono), recipes
  with search, a serving-size adjuster, ingredient checkboxes, per-step timers
  with an alarm, and a per-recipe revision history.

```
https://jonwlin.github.io/            # homepage
https://jonwlin.github.io/brain-dump/ # Brain Dump
https://jonwlin.github.io/recipes/    # Recipes
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
│   ├── brain-dump/           # /brain-dump section
│   │   ├── layout.tsx        # stone/mono shell + section metadata
│   │   ├── page.tsx          # /brain-dump index (server -> ContentIndex)
│   │   └── [slug]/page.tsx   # /brain-dump/<slug> topic detail (MDX)
│   └── recipes/              # /recipes section
│       ├── layout.tsx        # stone/mono shell + section metadata
│       ├── page.tsx          # /recipes index (server -> ContentIndex)
│       └── [slug]/page.tsx   # /recipes/<slug> detail (RecipeView + MDX notes)
├── components/
│   ├── Navbar.tsx            # client: homepage nav + mobile hamburger
│   ├── ContentIndex.tsx      # client: shared search + filter + card grid
│   ├── RecipeView.tsx        # client: serving adjuster, checkboxes, step timers
│   ├── CategoryTag.tsx       # pill; accepts an optional colors map
│   └── mdx/index.tsx         # MDX components (Aside)
├── lib/
│   ├── home.ts               # shared homepage heading className
│   ├── categories.ts         # Brain Dump category metadata (client-safe)
│   ├── recipe-categories.ts  # Recipe category metadata (client-safe)
│   ├── content.ts            # collection-aware MDX loader (server)
│   ├── recipes.ts            # recipe MDX loader + structured schema (server)
│   ├── quantity.ts           # serving-size scaling + fraction formatting
│   └── alarm.ts              # Web Audio timer alarm (no deps)
├── public/                   # homepage images + docs (served from /)
│   └── recipes/<slug>/       # optional recipe photos (hero + per-step)
├── content/brain-dump/       # one .mdx file per Brain Dump topic
└── content/recipes/          # one .mdx file per recipe
```

The Brain Dump loader is **collection-aware**: `getAllTopicMeta("brain-dump")`,
`getTopicBySlug("brain-dump", slug)`, etc. read `content/<collection>/`. Recipes
use a sibling loader (`lib/recipes.ts`) with a richer structured schema, and both
sections share the same search/filter grid via `components/ContentIndex.tsx`.

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

## Add a new recipe

Drop a new `.mdx` file in `content/recipes/`. Ingredients and steps are
**structured** so the serving adjuster can scale quantities and steps can drive
timers; the MDX body holds the freeform intro/notes.

```mdx
---
title: "Brown Butter Chocolate Chip Cookies"
slug: "brown-butter-chocolate-chip-cookies"
category: "dessert"   # breakfast | mains | sides | dessert | drinks | baking | snacks
description: "One or two sentences shown on the card."
tags: ["cookies", "baking"]
date: "2026-06-24"
servings: 24                      # base count the quantities below are written for
prepTime: "25 min"
cookTime: "11 min"
heroImage: "/recipes/<slug>/hero.jpg"   # optional; lives under public/
ingredients:
  - { quantity: 2.25, unit: "cup", name: "all-purpose flour", group: "Dry" }
  - { name: "flaky sea salt", note: "to finish" }   # quantity optional ("to taste")
instructions:
  - { text: "Brown the butter until nutty; cool.", durationSeconds: 480 }  # timer if > 0
  - { text: "Bake until the edges set.", durationSeconds: 660, image: "/recipes/<slug>/bake.jpg" }
revisions:
  - { date: "2026-06-24", summary: "Initial publish." }
  - { date: "2026-06-30", summary: "Cut sugar to ½ cup.", why: "Too sweet." }
---

Freeform intro / notes (markdown + GFM). <Aside>…</Aside> works here too.
```

Photos are optional — put them under `public/recipes/<slug>/` and reference them
with absolute paths (there is no `basePath`, so `/recipes/<slug>/hero.jpg` resolves
directly).

## Develop

```bash
npm install
npm run dev          # http://localhost:3000/  (homepage)
                     # http://localhost:3000/brain-dump  (Brain Dump)
                     # http://localhost:3000/recipes      (Recipes)
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
