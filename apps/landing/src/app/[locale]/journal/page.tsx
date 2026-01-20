import { getBlogPosts } from "@/actions/blog";
import JournalClient from "@/components/journal/JournalClient";

export default async function JournalPage() {
  const posts = await getBlogPosts();

  return <JournalClient posts={posts} />;
}
