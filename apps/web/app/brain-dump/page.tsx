import ContentIndex from "@/components/ContentIndex";
import { getAllTopicMeta } from "@/lib/content";
import { CATEGORY_ORDER } from "@/lib/categories";

export default function Page() {
  const topics = getAllTopicMeta("brain-dump");
  return (
    <ContentIndex
      items={topics}
      categoryOrder={CATEGORY_ORDER}
      linkBase="/brain-dump"
      title="brain dump"
      titleSuffix="/ notes & rabbit holes"
      subtitle="things i spent too long researching"
      itemNoun="entry"
      itemNounPlural="entries"
    />
  );
}
