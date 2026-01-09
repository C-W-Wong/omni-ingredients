import { notFound } from "next/navigation";
import { getAuthorById } from "@/actions/authors";
import { AuthorForm } from "./AuthorForm";

export const dynamic = "force-dynamic";

interface EditAuthorPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAuthorPage({ params }: EditAuthorPageProps) {
  const { id } = await params;
  const author = await getAuthorById(id);

  if (!author) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Edit Author</h2>
      <AuthorForm author={author} />
    </div>
  );
}
