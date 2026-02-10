import { notFound } from "next/navigation";
import { getQuoteRequestById } from "@/actions/quotes";
import { QuoteDetailClient } from "./QuoteDetailClient";

export const dynamic = "force-dynamic";

interface QuoteDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function QuoteDetailPage({ params }: QuoteDetailPageProps) {
  const { id } = await params;
  const quote = await getQuoteRequestById(id);

  if (!quote) {
    notFound();
  }

  return <QuoteDetailClient quote={quote} />;
}
