"use server";

import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export interface ContactSubmission {
  id: string;
  full_name: string;
  company_name: string;
  email: string;
  phone: string | null;
  inquiry_type: string;
  message: string;
  status: string;
  locale: string;
  created_at: string;
}

export async function getContactSubmissions(
  search?: string,
  status?: string
): Promise<ContactSubmission[]> {
  const supabase = createAdminClient();

  let query = supabase
    .from("contact_submissions")
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
    console.error("Error fetching contact submissions:", error);
    return [];
  }

  return data || [];
}

export async function getContactSubmissionById(
  id: string
): Promise<ContactSubmission | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching contact submission:", error);
    return null;
  }

  return data;
}

export async function updateContactStatus(
  id: string,
  status: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("contact_submissions")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error updating contact status:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/contacts");
  revalidatePath(`/contacts/${id}`);
  return { success: true };
}

export async function deleteContactSubmission(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("contact_submissions")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting contact submission:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/contacts");
  return { success: true };
}
