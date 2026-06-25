import ContentIndex, { type ContentIndexItem } from "@/components/ContentIndex";
import { getAllRecipeMeta } from "@/lib/recipes";
import {
  RECIPE_CATEGORY_ORDER,
  RECIPE_CATEGORY_COLORS,
} from "@/lib/recipe-categories";

export default function Page() {
  const recipes = getAllRecipeMeta();
  // Map recipe metadata onto the generic index item shape; surface ingredient
  // names as extra search keywords.
  const items: ContentIndexItem[] = recipes.map((r) => ({
    title: r.title,
    slug: r.slug,
    category: r.category,
    description: r.description,
    tags: r.tags,
    date: r.date,
    keywords: r.ingredientNames,
  }));

  return (
    <ContentIndex
      items={items}
      categoryOrder={RECIPE_CATEGORY_ORDER}
      categoryColors={RECIPE_CATEGORY_COLORS}
      linkBase="/recipes"
      title="recipes"
      titleSuffix="/ things i actually cook"
      subtitle="search, scale servings, and run a timer for each step"
      itemNoun="recipe"
      itemNounPlural="recipes"
    />
  );
}
