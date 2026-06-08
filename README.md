# Jonwlin.github.io

Jonathan W. Lin's personal website — [jonwlin.github.io](https://jonwlin.github.io).

It's two pieces served together by **GitHub Pages**:

1. A hand-written static **homepage** (`index.html` + `assets/`).
2. **🧠 Brain Dump** (`/brain-dump/`) — a Next.js app of guides, reviews, and
   write-ups, statically exported.

## Repository map

```
.
├── index.html              # the homepage (single page)
├── assets/                 # homepage assets
│   ├── css/style.css       # all homepage styles (one consolidated file)
│   ├── bootstrap/          # vendored Bootstrap 5 (CSS + JS)
│   ├── fonts/              # Font Awesome webfonts
│   ├── img/                # images + favicon
│   └── docs/               # downloadable docs (e.g. project papers)
│
├── brain-dump-app/         # Next.js SOURCE for Brain Dump  (NOT served)
│   ├── app/                # App Router pages, layout, favicon, globals.css
│   ├── components/         # UI + MDX components
│   ├── content/brain-dump/ # one .mdx file per topic  ← write content here
│   └── lib/                # content loading + category metadata
│
├── brain-dump/             # GENERATED static export of brain-dump-app
│   └── …                   # served at /brain-dump/  — do not edit by hand
│
├── .github/workflows/ci.yml  # CI: lint + typecheck + build on every PR
└── AGENTS.md               # contributor / agent workflow rules
```

## Working on the homepage

Plain HTML/CSS — edit `index.html` and `assets/css/style.css` directly. No build
step.

## Working on Brain Dump

```bash
cd brain-dump-app
npm install
npm run dev          # http://localhost:3000/brain-dump
```

**Add a topic:** drop a new `.mdx` file in `brain-dump-app/content/brain-dump/`
(see `brain-dump-app/README.md` for the frontmatter + available components).

## Build & deploy

> **Note:** today the site is published by committing the Brain Dump static
> export (`brain-dump/`) to the repo, which GitHub Pages serves from the branch.
> Migrating to a CI-built deploy (no committed output) is tracked in
> [issue #8](https://github.com/Jonwlin/Jonwlin.github.io/issues/8).

For now, after changing Brain Dump source, regenerate the committed export:

```bash
cd brain-dump-app
npm run deploy       # builds and refreshes ../brain-dump/
```

Then commit both the source and the regenerated `brain-dump/` output.

## Workflow

See [`AGENTS.md`](./AGENTS.md). In short: changes land via PR, CI must pass, and
PRs are merged manually.
