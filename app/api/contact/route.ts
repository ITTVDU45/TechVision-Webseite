import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SITE_CONTACT } from "@/lib/site-contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const contactBodySchema = z.object({
  name: z.string().trim().min(1, "Name ist erforderlich").max(120),
  email: z.string().trim().email("Ungültige E-Mail").max(200),
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10, "Nachricht mindestens 10 Zeichen").max(10000),
  privacyAccepted: z
    .boolean()
    .refine((v) => v === true, { message: "Datenschutz muss akzeptiert werden" }),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = contactBodySchema.safeParse(json);
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const msg =
        Object.values(first).flat()[0] ||
        "Bitte prüfen Sie Ihre Eingaben.";
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { privacyAccepted: _p, ...fields } = parsed.data;
    const payload = {
      ...fields,
      toEmail: SITE_CONTACT.email,
      submittedAt: new Date().toISOString(),
      source: "contact-form",
    };

    const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();
    if (webhook) {
      const whRes = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(12_000),
      });
      if (!whRes.ok) {
        console.error("[contact] webhook failed:", whRes.status, await whRes.text().catch(() => ""));
        return NextResponse.json(
          { error: "Nachricht konnte nicht übermittelt werden. Bitte später erneut oder per E-Mail." },
          { status: 502 }
        );
      }
    } else {
      console.info("[contact] no CONTACT_WEBHOOK_URL — payload (dev log):", {
        name: payload.name,
        email: payload.email,
        subject: payload.subject,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] POST error:", e);
    return NextResponse.json(
      { error: "Unerwarteter Fehler. Bitte versuchen Sie es erneut oder schreiben Sie uns per E-Mail." },
      { status: 500 }
    );
  }
}
