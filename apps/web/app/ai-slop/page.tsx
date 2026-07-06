import ContentIndex from "@/components/ContentIndex";
import { getAllTopicMeta } from "@/lib/content";
import { CATEGORY_ORDER } from "@/lib/categories";

export default function Page() {
  const topics = getAllTopicMeta("ai-slop");
  return (
    <ContentIndex
      items={topics}
      categoryOrder={CATEGORY_ORDER}
      linkBase="/ai-slop"
      title="ai slop"
      titleSuffix="/ notes & rabbit holes"
      subtitle="things i spent too long researching"
      disclaimer="these articles are based on research i actually did, but they're generated completely by AI — mostly for my own reference. read at your own risk."
      itemNoun="entry"
      itemNounPlural="entries"
    />
  );
}
