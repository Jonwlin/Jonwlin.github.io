# AGENTS.md

Guidance for AI agents (and humans) working in this repository.

## Repository

Personal website for Jonathan W. Lin, served via **GitHub Pages** at
`https://jonwlin.github.io/`.

- **Homepage:** static `index.html` (Bootstrap "Grayscale" theme) + `assets/`.
- **Brain Dump:** a Next.js 14 (App Router) + Tailwind + MDX app in
  `brain-dump-app/`, **statically exported** into `brain-dump/`, which GitHub
  Pages serves at `/brain-dump/`. See `brain-dump-app/README.md` for details.

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

After editing `brain-dump-app/` source or `content/brain-dump/*.mdx`:

```bash
cd brain-dump-app
npm install      # first time only
npm run deploy   # rebuilds and refreshes ../brain-dump/ (the served output)
```

Then commit both the source changes and the regenerated `brain-dump/` output.
The `.nojekyll` file at the repo root must stay — it lets GitHub Pages serve
the `_next/` asset folder.
