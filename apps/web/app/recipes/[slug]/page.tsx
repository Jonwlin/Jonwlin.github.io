import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { getAllRecipeSlugs, getRecipeBySlug } from "@/lib/recipes";
import { mdxComponents } from "@/components/mdx";
import RecipeView from "@/components/RecipeView";

// Pre-render one static page per recipe; reject anything not in the set.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllRecipeSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) return { title: "not found — recipes" };
  return {
    title: `${recipe.title} — recipes`,
    description: recipe.description,
  };
}

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) notFound();

  return (
    <main className="mx-auto max-w-[680px] px-8 py-12">
      <Link
        href="/recipes"
        className="text-[0.75rem] font-medium text-secondary hover:text-ink"
      >
        ← back
      </Link>

      <RecipeView recipe={recipe}>
        {recipe.content.trim() ? (
          <article className="prose-bd">
            <MDXRemote
              source={recipe.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </article>
        ) : null}
      </RecipeView>
    </main>
  );
}
