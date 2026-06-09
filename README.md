# Jonwlin.github.io

Jonathan W. Lin's personal website — [jonwlin.github.io](https://jonwlin.github.io).

It's two pieces served together by **GitHub Pages**. The repo root is
**source-only** — all source lives under `apps/`, and GitHub Actions assembles
and deploys the published site (no build output is committed):

1. A hand-written static **homepage** (`apps/homepage/`), served at `/`.
2. **🧠 Brain Dump** (`apps/brain-dump/`) — a Next.js app of guides, reviews, and
   write-ups, statically exported and served at `/brain-dump/`.

## Repository map

```
.
├── apps/
│   ├── homepage/             # static homepage SOURCE
│   │   ├── index.html        # the homepage (single page)
│   │   └── assets/
│   │       ├── css/style.css # all homepage styles (one consolidated file)
│   │       ├── bootstrap/    # vendored Bootstrap 5 (CSS + JS)
│   │       ├── fonts/        # Font Awesome webfonts
│   │       ├── img/          # images + favicon
│   │       └── docs/         # downloadable docs (e.g. project papers)
│   │
│   └── brain-dump/           # Next.js SOURCE for Brain Dump
│       ├── app/              # App Router pages, layout, favicon, globals.css
│       ├── components/       # UI + MDX components
│       ├── content/brain-dump/ # one .mdx file per topic  ← write content here
│       └── lib/              # content loading + category metadata
│
├── .github/workflows/
│   ├── ci.yml                # CI: lint + typecheck + build on every PR
│   └── deploy.yml            # assembles + deploys the site to Pages on push
└── AGENTS.md                 # contributor / agent workflow rules
```

The built output (`apps/brain-dump/out/`) and the CI assembly dir (`_site/`) are
git-ignored — never committed.

## Working on the homepage

Plain HTML/CSS — edit `apps/homepage/index.html` and
`apps/homepage/assets/css/style.css` directly. No build step.

## Working on Brain Dump

```bash
cd apps/brain-dump
npm install
npm run dev          # http://localhost:3000/brain-dump
```

**Add a topic:** drop a new `.mdx` file in `apps/brain-dump/content/brain-dump/`
(see `apps/brain-dump/README.md` for the frontmatter + available components).

## Build & deploy

Fully automated. **GitHub Actions** (`.github/workflows/deploy.yml`) builds the
homepage + Brain Dump into one artifact and publishes it on every push to
`master`; Pages **Source** is set to "GitHub Actions". Commit source only.

## Workflow

See [`AGENTS.md`](./AGENTS.md). In short: changes land via PR, CI must pass, and
PRs are merged manually.
