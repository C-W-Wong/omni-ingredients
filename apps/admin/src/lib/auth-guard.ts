import { createClient } from "@omm/supabase/server";
import { createAdminClient } from "./supabase-admin";

export interface AdminUser {
  id: string;
  role: "admin" | "super_admin";
}

/**
 * Verifies that the current user is authenticated and is an admin.
 * Throws an error if not authenticated or not an admin.
 *
 * Use this in server actions for defense in depth.
 */
export async function requireAdmin(): Promise<{
  userId: string;
  email: string;
  adminUser: AdminUser;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const adminSupabase = createAdminClient();
  const { data: adminUser, error } = await adminSupabase
    .from("admin_users")
    .select("id, role")
    .eq("user_id", user.id)
    .single();

  if (error || !adminUser) {
    throw new Error("Not authorized");
  }

  return {
    userId: user.id,
    email: user.email || "",
    adminUser: adminUser as AdminUser,
  };
}
