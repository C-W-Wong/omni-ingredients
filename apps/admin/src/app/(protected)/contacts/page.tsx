import { getContactSubmissions } from "@/actions/contacts";
import { ContactsClient } from "./ContactsClient";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const contacts = await getContactSubmissions();

  return <ContactsClient initialContacts={contacts} />;
}
