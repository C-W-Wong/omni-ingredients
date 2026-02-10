import { notFound } from "next/navigation";
import { getContactSubmissionById } from "@/actions/contacts";
import { ContactDetailClient } from "./ContactDetailClient";

export const dynamic = "force-dynamic";

interface ContactDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ContactDetailPage({ params }: ContactDetailPageProps) {
  const { id } = await params;
  const contact = await getContactSubmissionById(id);

  if (!contact) {
    notFound();
  }

  return <ContactDetailClient contact={contact} />;
}
