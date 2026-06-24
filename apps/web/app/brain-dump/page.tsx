import BrainDumpIndex from "@/components/BrainDumpIndex";
import { getAllTopicMeta } from "@/lib/content";

export default function Page() {
  const topics = getAllTopicMeta("brain-dump");
  return <BrainDumpIndex topics={topics} />;
}
