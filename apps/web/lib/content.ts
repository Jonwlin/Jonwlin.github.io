import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { CategoryKey } from "./categories";

// Each MDX collection is a folder under content/, e.g. content/brain-dump/.
// Pass the collection name to the helpers below. Adding a second collection
// (a blog, notes, etc.) is just a new folder — no code changes here.
const CONTENT_ROOT = path.join(process.cwd(), "content");

function collectionDir(collection: string): string {
  return path.join(CONTENT_ROOT, collection);
}

export type TopicMeta = {
  title: string;
  slug: string;
  category: CategoryKey;
  description: string;
  tags: string[];
  date: string; // ISO yyyy-mm-dd
};

export type Topic = TopicMeta & {
  content: string; // raw MDX body
};

function readTopicFile(dir: string, fileName: string): Topic {
  const fullPath = path.join(dir, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const slug = (data.slug as string) || fileName.replace(/\.mdx?$/, "");

  return {
    title: data.title ?? slug,
    slug,
    category: (data.category ?? "reviews") as CategoryKey,
    description: data.description ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    date: data.date ?? "",
    content,
  };
}

/** All topics in a collection, newest first. */
export function getAllTopics(collection: string): Topic[] {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => readTopicFile(dir, f))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Just the frontmatter for an index page (no MDX bodies shipped to client). */
export function getAllTopicMeta(collection: string): TopicMeta[] {
  return getAllTopics(collection).map(({ content, ...meta }) => meta);
}

export function getTopicBySlug(
  collection: string,
  slug: string,
): Topic | undefined {
  return getAllTopics(collection).find((t) => t.slug === slug);
}

export function getAllSlugs(collection: string): string[] {
  return getAllTopics(collection).map((t) => t.slug);
}
