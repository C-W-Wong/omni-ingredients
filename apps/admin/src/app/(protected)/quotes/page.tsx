import { getQuoteRequests } from "@/actions/quotes";
import { QuotesClient } from "./QuotesClient";

export const dynamic = "force-dynamic";

export default async function QuotesPage() {
  const quotes = await getQuoteRequests();

  return <QuotesClient initialQuotes={quotes} />;
}
