import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { RecipeCategoryKey } from "./recipe-categories";

// Recipes are MDX files under content/recipes/, parsed at build time. The schema
// is richer than Brain Dump topics (structured ingredients/steps/revisions) so it
// has its own loader, but it follows the same content/<collection>/ + gray-matter
// pattern as lib/content.ts.
const RECIPES_DIR = path.join(process.cwd(), "content", "recipes");

export type Ingredient = {
  /** Numeric amount, scaled by the serving adjuster. Omit for "to taste" items. */
  quantity?: number;
  /** Unit string shown as-is (cup, tsp, g, …). */
  unit?: string;
  name: string;
  /** Free-form note, never scaled (e.g. "sifted", "to taste"). */
  note?: string;
  /** Optional section header this ingredient belongs under (e.g. "For the sauce"). */
  group?: string;
};

export type Instruction = {
  text: string;
  /** When > 0, the step renders a countdown timer for this many seconds. */
  durationSeconds?: number;
  /** Optional per-step photo (absolute path under /public, e.g. /recipes/x/step.jpg). */
  image?: string;
};

export type Revision = {
  date: string; // ISO yyyy-mm-dd
  summary: string;
  why?: string;
};

// Common fields shared with the index cards (kept compatible with ContentIndex).
export type RecipeMeta = {
  title: string;
  slug: string;
  category: RecipeCategoryKey;
  description: string;
  tags: string[];
  date: string; // ISO yyyy-mm-dd (created)
  servings: number;
  prepTime?: string;
  cookTime?: string;
  heroImage?: string;
  /** Ingredient names, surfaced so the index search can match on them. */
  ingredientNames: string[];
};

export type Recipe = RecipeMeta & {
  ingredients: Ingredient[];
  instructions: Instruction[];
  revisions: Revision[];
  content: string; // raw MDX body (intro / notes)
};

/* ------------------------- frontmatter coercion ------------------------- */

function asString(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function asNumber(v: unknown): number | undefined {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) {
    return Number(v);
  }
  return undefined;
}

function asStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function parseIngredients(v: unknown): Ingredient[] {
  if (!Array.isArray(v)) return [];
  return v.filter(isRecord).map((raw) => {
    const ing: Ingredient = { name: asString(raw.name) };
    const qty = asNumber(raw.quantity);
    if (qty !== undefined) ing.quantity = qty;
    if (typeof raw.unit === "string") ing.unit = raw.unit;
    if (typeof raw.note === "string") ing.note = raw.note;
    if (typeof raw.group === "string") ing.group = raw.group;
    return ing;
  });
}

function parseInstructions(v: unknown): Instruction[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((raw): Instruction | null => {
      if (typeof raw === "string") return { text: raw };
      if (isRecord(raw)) {
        const step: Instruction = { text: asString(raw.text) };
        const dur = asNumber(raw.durationSeconds);
        if (dur !== undefined) step.durationSeconds = dur;
        if (typeof raw.image === "string") step.image = raw.image;
        return step;
      }
      return null;
    })
    .filter((s): s is Instruction => s !== null && s.text !== "");
}

function parseRevisions(v: unknown): Revision[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter(isRecord)
    .map((raw): Revision => {
      const rev: Revision = {
        date: asString(raw.date),
        summary: asString(raw.summary),
      };
      if (typeof raw.why === "string") rev.why = raw.why;
      return rev;
    })
    .filter((r) => r.date !== "" || r.summary !== "")
    // Newest first.
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/* ------------------------------ loaders -------------------------------- */

function readRecipeFile(fileName: string): Recipe {
  const fullPath = path.join(RECIPES_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const slug = asString(data.slug) || fileName.replace(/\.mdx?$/, "");
  const ingredients = parseIngredients(data.ingredients);

  return {
    title: asString(data.title, slug),
    slug,
    category: (asString(data.category, "mains") as RecipeCategoryKey),
    description: asString(data.description),
    tags: asStringArray(data.tags),
    date: asString(data.date),
    servings: asNumber(data.servings) ?? 1,
    prepTime: typeof data.prepTime === "string" ? data.prepTime : undefined,
    cookTime: typeof data.cookTime === "string" ? data.cookTime : undefined,
    heroImage: typeof data.heroImage === "string" ? data.heroImage : undefined,
    ingredientNames: ingredients.map((i) => i.name).filter(Boolean),
    ingredients,
    instructions: parseInstructions(data.instructions),
    revisions: parseRevisions(data.revisions),
    content,
  };
}

/** All recipes, newest first. */
export function getAllRecipes(): Recipe[] {
  if (!fs.existsSync(RECIPES_DIR)) return [];
  return fs
    .readdirSync(RECIPES_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map(readRecipeFile)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Just the index metadata (no MDX bodies / heavy fields shipped to the client). */
export function getAllRecipeMeta(): RecipeMeta[] {
  return getAllRecipes().map(
    ({ ingredients, instructions, revisions, content, ...meta }) => meta,
  );
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return getAllRecipes().find((r) => r.slug === slug);
}

export function getAllRecipeSlugs(): string[] {
  return getAllRecipes().map((r) => r.slug);
}
