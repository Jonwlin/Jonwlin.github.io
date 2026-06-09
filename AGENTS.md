# AGENTS.md

Guidance for AI agents (and humans) working in this repository.

## Repository

Personal website for Jonathan W. Lin, served via **GitHub Pages** at
`https://jonwlin.github.io/`.

The repo root is **source-only**; the published site is assembled and deployed
by GitHub Actions. All source lives under `apps/`:

- **Homepage:** static `apps/homepage/index.html` (Bootstrap "Grayscale" theme)
  + `apps/homepage/assets/`. Served at `/`.
- **Brain Dump:** a Next.js 14 (App Router) + Tailwind + MDX app in
  `apps/brain-dump/`, **statically exported** (basePath `/brain-dump`) and served
  at `/brain-dump/`. See `apps/brain-dump/README.md` for details.

## Git & PR workflow — REQUIRED

These rules are mandatory. Do not bypass them.

1. **Never push without committing first.** All work must be captured in
   commits before any `git push`.
2. **Never push directly to the default branch.** Always push a feature branch
   and open a Pull Request.
3. **All changes land via Pull Request.** No direct commits-to-main pushes.
4. **PRs are merged manually by a human on GitHub.** Agents must **not**
   auto-merge, squash-merge, or otherwise accept a PR. Stop after the PR is
   open and hand off to Jonathan for review and merge.
5. **Ask before pushing.** Pushing is outward-facing — confirm with the user
   before running `git push`, even when changes are already committed.

### What an agent may do without asking
- Create/edit files, run builds and tests locally.
- Stage and commit changes (when the user asks to commit).

### What an agent must get explicit approval for
- `git push` (and only to a feature branch, never the default branch).
- Opening a PR.

### What an agent must never do
- Push to the default branch.
- Merge / accept / close a PR.
- Force-push to shared branches.

## Brain Dump: build & deploy

The site is **built and deployed by GitHub Actions** on every push to `master`
(`.github/workflows/deploy.yml`). You no longer build or commit the static
output — just edit source and merge.

After editing `apps/brain-dump/` source or `apps/brain-dump/content/brain-dump/*.mdx`:

```bash
cd apps/brain-dump
npm install          # first time only
npm run dev          # http://localhost:3000/brain-dump (local preview)
npm run build        # optional: verify the static export builds (-> out/)
```

Commit **only** the source changes. Build output (`apps/brain-dump/out/`) and the
CI assembly dir (`_site/`) are git-ignored and produced by CI — never commit
them. Pages **Source** is set to "GitHub Actions" (not "Deploy from a branch").
