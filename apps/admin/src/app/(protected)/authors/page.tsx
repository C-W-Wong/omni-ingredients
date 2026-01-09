import { getAuthors } from "@/actions/authors";
import { AuthorsClient } from "./AuthorsClient";

export const dynamic = "force-dynamic";

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return <AuthorsClient initialAuthors={authors} />;
}
