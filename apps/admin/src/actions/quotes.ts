"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export interface QuoteRequest {
  id: string;
  full_name: string;
  company_name: string;
  email: string;
  phone: string | null;
  phone_ext: string | null;
  message: string;
  status: string;
  locale: string;
  created_at: string;
}

export async function getQuoteRequests(
  search?: string,
  status?: string
): Promise<QuoteRequest[]> {
  const supabase = createAdminClient();

  let query = supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(
      `full_name.ilike.%${search}%,company_name.ilike.%${search}%,email.ilike.%${search}%`
    );
  }

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching quote requests:", error);
    return [];
  }

  return data || [];
}

export async function getQuoteRequestById(
  id: string
): Promise<QuoteRequest | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("quote_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching quote request:", error);
    return null;
  }

  return data;
}

export async function updateQuoteStatus(
  id: string,
  status: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("quote_requests")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error updating quote status:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/quotes");
  revalidatePath(`/quotes/${id}`);
  return { success: true };
}

export async function deleteQuoteRequest(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("quote_requests")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting quote request:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/quotes");
  return { success: true };
}
