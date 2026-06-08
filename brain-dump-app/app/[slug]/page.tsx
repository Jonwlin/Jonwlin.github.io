import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getAllSlugs, getTopicBySlug } from "@/lib/content";
import { categoryMeta } from "@/lib/categories";
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
  if (!topic) return { title: "Not found — Brain Dump" };
  return {
    title: `${topic.emoji} ${topic.title} — Brain Dump`,
    description: topic.description,
  };
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = getTopicBySlug(params.slug);
  if (!topic) notFound();

  const cat = categoryMeta(topic.category);

  return (
    <main className="mx-auto max-w-[750px] px-5 py-10">
      <Link
        href="/"
        className="inline-block text-sm text-[#9aa6ff] transition hover:text-white"
      >
        ← Back to Brain Dump
      </Link>

      <header className="mt-6">
        <div className="text-5xl leading-none">{topic.emoji}</div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {cat ? (
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={{ backgroundColor: `${cat.color}22`, color: cat.color }}
            >
              {cat.label}
            </span>
          ) : null}
          <time className="text-sm text-[#7c7c88]" dateTime={topic.date}>
            {formatDate(topic.date)}
          </time>
        </div>

        <h1 className="mt-3 text-[2rem] font-extrabold leading-tight text-[#f5f5f7]">
          {topic.title}
        </h1>

        {topic.description ? (
          <p className="mt-2 text-[#9a9aa5]">{topic.description}</p>
        ) : null}

        {topic.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {topic.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#2f2f40] bg-[#16161f] px-2.5 py-0.5 text-xs text-[#9b9bab]"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      <hr className="my-7 border-[#26263300] border-t border-[#262633]" />

      <article className="prose-bd">
        <MDXRemote source={topic.content} components={mdxComponents} />
      </article>
    </main>
  );
}
