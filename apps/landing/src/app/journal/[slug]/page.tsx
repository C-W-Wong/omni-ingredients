import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts } from "@/actions/blog";
import JournalPostClient from "@/components/journal/JournalPostClient";

interface JournalPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function JournalPostPage({ params }: JournalPostPageProps) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    getPostBySlug(slug),
    getRelatedPosts(slug, 3),
  ]);

  if (!post) {
    notFound();
  }

  return <JournalPostClient post={post} relatedPosts={relatedPosts} />;
}
