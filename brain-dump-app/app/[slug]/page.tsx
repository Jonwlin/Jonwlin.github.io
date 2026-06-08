import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getAllSlugs, getTopicBySlug } from "@/lib/content";
import { mdxComponents } from "@/components/mdx";

// Pre-render one static page per topic; reject anything not in the set.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const topic = getTopicBySlug(params.slug);
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
  const topic = getTopicBySlug(params.slug);
  if (!topic) notFound();

  return (
    <main className="mx-auto max-w-[640px] px-5 pb-24 pt-12">
      <Link href="/" className="text-[0.7rem] text-faint hover:text-ink">
        ← back
      </Link>

      <header className="mt-8">
        <div className="text-[0.7rem] text-faint">
          {topic.category} · {formatDate(topic.date)}
        </div>

        <h1 className="mt-2 text-[1.3rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
          {topic.title}
        </h1>

        {topic.description ? (
          <p className="mt-2 text-[0.85rem] text-muted">{topic.description}</p>
        ) : null}

        {topic.tags.length > 0 ? (
          <div className="mt-3 text-[0.7rem] text-faint">
            {topic.tags.map((tag) => (
              <span key={tag} className="mr-2">
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      <article className="prose-bd mt-8">
        <MDXRemote source={topic.content} components={mdxComponents} />
      </article>
    </main>
  );
}
