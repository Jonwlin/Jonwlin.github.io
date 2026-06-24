# Jonwlin.github.io

Jonathan W. Lin's personal website — [jonwlin.github.io](https://jonwlin.github.io).

A single **Next.js (App Router) + Tailwind + MDX** app (`apps/web/`), statically
exported and served by **GitHub Pages**. The repo root is **source-only** —
GitHub Actions builds and deploys the published site (no build output is
committed). One build serves two sections:

1. The **homepage** at `/` — `app/(site)/` (white / Lora + Cabin look).
2. **🧠 Brain Dump** at `/brain-dump/` — `app/brain-dump/` (stone / monospace),
   a collection of guides, reviews, and write-ups.

## Repository map

```
.
├── apps/web/                 # the whole site (Next.js SOURCE)
│   ├── app/
│   │   ├── layout.tsx        # root layout: fonts (CSS vars), neutral <body>
│   │   ├── globals.css       # @tailwind + .prose-bd (MDX content styles)
│   │   ├── (site)/           # homepage shell (route group — not in the URL)
│   │   │   ├── layout.tsx     # Navbar + white/serif shell
│   │   │   └── page.tsx       # the homepage (projects inline)
│   │   └── brain-dump/       # /brain-dump section (stone/mono shell)
│   │       ├── layout.tsx
│   │       ├── page.tsx       # index (search + filter grid)
│   │       └── [slug]/page.tsx # topic detail (MDX)
│   ├── components/           # Navbar, BrainDumpIndex, CategoryTag, mdx/
│   ├── lib/                  # content loader (collection-aware) + metadata
│   ├── public/               # homepage images + docs (served from /)
│   └── content/brain-dump/   # one .mdx file per topic  ← write content here
│
├── .github/workflows/
│   ├── ci.yml                # CI: lint + typecheck + build on every PR
│   └── deploy.yml            # builds + deploys the site to Pages on push
└── AGENTS.md                 # contributor / agent workflow rules
```

The built output (`apps/web/out/`) and the CI assembly dir (`_site/`) are
git-ignored — never committed.

## Working on the site

```bash
cd apps/web
npm install
npm run dev          # http://localhost:3000/           (homepage)
                     # http://localhost:3000/brain-dump  (Brain Dump)
```

- **Homepage:** edit `app/(site)/page.tsx` (project cards are an inline array)
  and `components/Navbar.tsx`. Styling is Tailwind; assets live in `public/`.
- **Add a Brain Dump topic:** drop a new `.mdx` file in
  `apps/web/content/brain-dump/` (see `apps/web/README.md` for frontmatter).

## Build & deploy

Fully automated. **GitHub Actions** (`.github/workflows/deploy.yml`) builds the
app and publishes `apps/web/out/` (the export root *is* the site root — no
`basePath`) on every push to `master`; Pages **Source** is set to "GitHub
Actions". Commit source only.

## Workflow

See [`AGENTS.md`](./AGENTS.md). In short: changes land via PR, CI must pass, and
PRs are merged manually.
