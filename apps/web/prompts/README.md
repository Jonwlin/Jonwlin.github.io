# Brain Dump post-authoring prompts

A two-stage workflow for turning an existing AI chat (ChatGPT, Claude, MetaMate, …)
into a published Brain Dump post.

| Stage | Prompt | Where you run it | Output |
| --- | --- | --- | --- |
| 1 | [`1-conversation-to-brief.md`](./1-conversation-to-brief.md) | The session that holds your original conversation | A structured **brief** (plain Markdown) |
| 2 | [`2-brief-to-post.md`](./2-brief-to-post.md) | A Claude Code session **in this repo** | A new `.mdx` post + an open PR |

## How to use

1. In the chat where you researched something, paste the **Stage 1** prompt as the
   instructions and let it produce a *Brain Dump brief*.
2. Copy that brief. Start a Claude Code session in this repo, paste the **Stage 2**
   prompt, then paste the brief beneath it.
3. Stage 2 writes `apps/brain-dump/content/brain-dump/<slug>.mdx`, builds to verify, and
   opens a PR. Review and merge — CI (`deploy.yml`) publishes it.

## Notes

- These files live outside `content/brain-dump/`, so they are **not** treated as posts
  and do not affect the build.
- The post format is defined by the app: frontmatter in `lib/content.ts`, the five
  categories in `lib/categories.ts`, and the only custom MDX component (`<Aside>`) in
  `components/mdx/index.tsx`. Keep these prompts in sync if that format changes.
