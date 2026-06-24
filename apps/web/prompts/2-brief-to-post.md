# Stage 2 — Brain Dump brief → post + PR

Run this in a Claude Code session **inside this repo**. Paste the prompt below, then
paste your Stage-1 brief beneath the marked line. It writes the `.mdx`, builds to verify,
and opens a PR.

---

You are working in the Jonwlin.github.io repo. Turn the "Brain Dump brief" pasted at the
bottom into a single Brain Dump post and open a PR. Follow the repo's conventions exactly.

FILE
- Create one MDX file at: `apps/brain-dump/content/brain-dump/<slug>.mdx`
- `<slug>` = kebab-case of the Working title; it MUST equal the filename stem.

FRONTMATTER (YAML, in this order, all present):
  title:       the brief's Working title (Title Case, quoted string)
  slug:        the kebab-case slug
  category:    EXACTLY ONE of: travel | reviews | skincare | tech | outdoors
               (use the brief's category; if it's not one of these, map to the closest;
               default to reviews)
  description: the brief's Preview (1–2 sentences) — this is the index-card preview
  tags:        the brief's tags as a YAML array, lowercase and kebab-case
               (e.g. "korean spa" -> "korean-spa")
  date:        the brief's date as yyyy-mm-dd. If the brief says "today", use today's date.

BODY (after the frontmatter and a blank line, in this order):
  1. <Aside>…</Aside> — the brief's TL;DR. LEAD with the bottom line in **bold**. Do NOT
     write "TL;DR" or "The short version" inside it — the component prints that label.
  2. A short first-person intro paragraph from the brief's "Why this came up".
  3. The brief's Key points / Comparison / Caveats as `##` sections with descriptive
     headings. Use GFM Markdown tables for comparisons (mark the winning row with ⭐),
     `>` blockquotes for tips/caveats/pull-quotes, **bold** for the key pick, and
     _italics_ for emphasis or short quotes.
  4. If the brief has a Sources & links section, end with `## Links & resources` — a
     Markdown list of `[name](url) — short description`. Omit entirely if there are none.

HARD RULES:
  - The ONLY custom component available is <Aside>. NEVER use <TLDR>, <Callout>,
    <ProsCons>, <ComparisonTable>, or any other JSX/component. Use plain Markdown/GFM for
    everything else (comparisons = Markdown tables, not a component).
  - Categories are exactly the five listed; never invent one.
  - No H1 in the body — the title renders as the H1. Start body sections at `##`.
  - Keep it MDX-safe: avoid raw `<`, `>`, `{`, `}` in prose (rephrase or escape) — they
    break MDX parsing.
  - Do NOT add facts, numbers, or sources beyond the brief. Match the blog voice: first
    person, casual but dense with substance, evidence-driven, lightly opinionated,
    understated/lowercase tone.

VERIFY before opening the PR:
  - Run `npm run build` in `apps/brain-dump`; it must succeed and generate `/<slug>`.
  - Confirm the post appears on the grid (its description shows as the preview) and the
    <Aside> renders as "The short version:".

PR (per AGENTS.md — never push to master, never merge):
  - Create a feature branch, commit ONLY the new `.mdx` (`out/` is git-ignored), push it,
    and open a PR with `gh`. Stop at PR-open; a human reviews and merges.

Paste the Brain Dump brief below this line:
------------------------------------------------------------
