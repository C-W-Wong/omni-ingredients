import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, companyName, email, phone, phoneExt, message } = body;

    // Server-side validation
    const errors: string[] = [];
    if (!fullName?.trim()) errors.push("Full name is required");
    if (!companyName?.trim()) errors.push("Company name is required");
    if (!email?.trim()) errors.push("Email is required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.push("Invalid email format");
    if (!message?.trim()) errors.push("Message is required");

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, error: errors.join(", ") },
        { status: 400 }
      );
    }

    // Use service role to bypass RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Insert into quote_requests table
    const { error: insertError } = await supabase
      .from("quote_requests")
      .insert({
        full_name: fullName.trim(),
        company_name: companyName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        phone_ext: phoneExt?.trim() || null,
        message: message.trim(),
        locale: "en",
      });

    if (insertError) {
      console.error("Error inserting quote request:", insertError);
      return NextResponse.json(
        { success: false, error: "Failed to save quote request" },
        { status: 500 }
      );
    }

    // Call Edge Function to send emails (fire-and-forget)
    try {
      await supabase.functions.invoke("send-quote-email", {
        body: {
          fullName: fullName.trim(),
          companyName: companyName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone?.trim() || null,
          phoneExt: phoneExt?.trim() || null,
          message: message.trim(),
        },
      });
    } catch (emailError) {
      // Don't fail the request if email sending fails
      console.error("Error sending quote emails:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
