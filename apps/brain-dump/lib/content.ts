import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { CategoryKey } from "./categories";

const CONTENT_DIR = path.join(process.cwd(), "content", "brain-dump");

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

function readTopicFile(fileName: string): Topic {
  const fullPath = path.join(CONTENT_DIR, fileName);
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

/** All topics, newest first. */
export function getAllTopics(): Topic[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map(readTopicFile)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Just the frontmatter for the index page (no MDX bodies shipped to client). */
export function getAllTopicMeta(): TopicMeta[] {
  return getAllTopics().map(({ content, ...meta }) => meta);
}

export function getTopicBySlug(slug: string): Topic | undefined {
  return getAllTopics().find((t) => t.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllTopics().map((t) => t.slug);
}
