import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { faqBulkBodySchema } from "@/lib/cms-faq-taxonomy";

function getMongoUri(): string | undefined {
  return process.env.MONGODB_URI?.trim() || process.env.MongoDB_URI?.trim();
}

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!getMongoUri()) {
      return NextResponse.json(
        {
          error:
            "MongoDB ist nicht konfiguriert. Bitte MONGODB_URI in .env.local setzen.",
        },
        { status: 503 }
      );
    }

    const json = await request.json().catch(() => null);
    const parsed = faqBulkBodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Ungültige Daten", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { items } = parsed.data;

    const connectDB = (await import("@/lib/mongodb")).default;
    await connectDB();
    const FAQ = (await import("@/lib/models/FAQ")).default;

    const docs = items.map((item) => ({
      question: item.question,
      answer: item.answer,
      page: item.page,
      order: item.order ?? 0,
      ...(item.category && item.category.length > 0
        ? { category: item.category }
        : {}),
    }));

    const inserted = await FAQ.insertMany(docs, { ordered: false });

    return NextResponse.json(
      { created: inserted.length },
      { status: 201 }
    );
  } catch (error: unknown) {
    const err = error as { message?: string; name?: string };
    console.error("[faqs/bulk]", err?.message ?? error);
    return NextResponse.json(
      { error: err?.message || "Bulk-Speichern fehlgeschlagen." },
      { status: 500 }
    );
  }
}
