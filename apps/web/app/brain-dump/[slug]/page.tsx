import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { getAllSlugs, getTopicBySlug } from "@/lib/content";
import { CategoryTag } from "@/components/CategoryTag";
import { mdxComponents } from "@/components/mdx";

// Pre-render one static page per topic; reject anything not in the set.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs("brain-dump").map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const topic = getTopicBySlug("brain-dump", params.slug);
  if (!topic) return { title: "not found — brain dump" };
  return {
    title: `${topic.title} — brain dump`,
    description: topic.description,
  };
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    })
    .toLowerCase();
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = getTopicBySlug("brain-dump", params.slug);
  if (!topic) notFound();

  return (
    <main className="mx-auto max-w-[640px] px-8 py-12">
      <Link
        href="/brain-dump"
        className="text-[0.75rem] font-medium text-secondary hover:text-ink"
      >
        ← back
      </Link>

      <header className="mt-8">
        <div className="flex items-center gap-3">
          <CategoryTag category={topic.category} />
          <time className="text-[0.7rem] text-muted" dateTime={topic.date}>
            {formatDate(topic.date)}
          </time>
        </div>

        <h1 className="mt-3 text-[1.4rem] font-semibold leading-[1.3] tracking-[-0.02em] text-ink">
          {topic.title}
        </h1>

        {topic.description ? (
          <p className="mt-2 text-[0.85rem] leading-[1.5] text-secondary">
            {topic.description}
          </p>
        ) : null}

        {topic.tags.length > 0 ? (
          <div className="mt-3 text-[0.7rem] font-medium text-muted">
            {topic.tags.map((tag) => (
              <span key={tag} className="mr-3">
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      {/* Spacer before content */}
      <article className="prose-bd mt-10">
        <MDXRemote
          source={topic.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>
    </main>
  );
}
