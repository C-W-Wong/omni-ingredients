import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "info@omniingredients.com";

interface QuoteData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string | null;
  phoneExt: string | null;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return new Response(
      JSON.stringify({ error: "Email service not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const data: QuoteData = await req.json();
    const phoneDisplay = data.phone
      ? `${data.phone}${data.phoneExt ? ` ext. ${data.phoneExt}` : ""}`
      : "Not provided";

    // 1. Send admin notification
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Omni Ingredients <noreply@omniingredients.com>",
        to: [ADMIN_EMAIL],
        subject: `New Quote Request from ${data.fullName} — ${data.companyName}`,
        html: `
          <h2>New Quote Request</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.fullName}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Company</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.companyName}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${phoneDisplay}</td></tr>
          </table>
          <h3 style="margin-top:20px;">Message</h3>
          <p style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap;">${data.message}</p>
          <p style="margin-top:20px;color:#888;font-size:12px;">Reply directly to the customer at <a href="mailto:${data.email}">${data.email}</a></p>
        `,
      }),
    });

    // 2. Send customer confirmation
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Omni Ingredients <noreply@omniingredients.com>",
        to: [data.email],
        subject: "We received your quote request — Omni Ingredients",
        html: `
          <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;">
            <h2 style="color:#2A2118;">Thank you, ${data.fullName}!</h2>
            <p>We've received your quote request and our team is reviewing it. You can expect to hear back from us within <strong>24 hours</strong>.</p>
            <div style="background:#f9f5f2;padding:20px;border-radius:8px;margin:20px 0;">
              <p style="margin:0 0 8px;font-weight:bold;">What happens next?</p>
              <ol style="margin:0;padding-left:20px;">
                <li style="margin-bottom:4px;">Our team reviews your requirements</li>
                <li style="margin-bottom:4px;">We prepare a customized quote</li>
                <li>A specialist will reach out with pricing and details</li>
              </ol>
            </div>
            <p>If you have any urgent questions in the meantime, feel free to reach us at <a href="mailto:info@omniingredients.com" style="color:#df7a4c;">info@omniingredients.com</a>.</p>
            <hr style="border:none;border-top:1px solid #eee;margin:30px 0;" />
            <p style="color:#888;font-size:12px;">Omni Ingredients — Premium B2B Nutraceutical Ingredients<br/>Ontario, CA 91761, USA</p>
          </div>
        `,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send emails" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
