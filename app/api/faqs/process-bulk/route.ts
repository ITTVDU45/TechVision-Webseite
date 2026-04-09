import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getOpenAiApiKey, getOpenAiModel } from "@/lib/openai-env";
import {
  faqAiResponseSchema,
  formatTaxonomyForPrompt,
} from "@/lib/cms-faq-taxonomy";

export const runtime = "nodejs";

/** Vercel Serverless: OpenAI structured output kann >30s brauchen (langer Rohtext). */
export const maxDuration = 120;

const MAX_RAW_CHARS = 120_000;
const MODEL_DEFAULT = "gpt-4o-mini";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKey = getOpenAiApiKey();
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Open_ai_key (oder alternativ OPENAI_API_KEY) ist nicht gesetzt. Bitte in .env.local oder Vercel hinterlegen.",
        },
        { status: 503 }
      );
    }

    const openaiProvider = createOpenAI({ apiKey });

    const body = await request.json().catch(() => null);
    const rawText =
      typeof body?.rawText === "string" ? body.rawText.trim() : "";
    if (!rawText) {
      return NextResponse.json(
        { error: "rawText fehlt oder ist leer." },
        { status: 400 }
      );
    }
    if (rawText.length > MAX_RAW_CHARS) {
      return NextResponse.json(
        {
          error: `Text zu lang (max. ${MAX_RAW_CHARS} Zeichen). Bitte kürzen oder in mehrere Durchgänge splitten.`,
        },
        { status: 400 }
      );
    }

    const modelId = getOpenAiModel(MODEL_DEFAULT);

    const taxonomy = formatTaxonomyForPrompt();

    const { object } = await generateObject({
      model: openaiProvider(modelId),
      schema: faqAiResponseSchema,
      system: `Du bist ein Assistent für ein deutsches IT-/KI-Unternehmen (TechVision). 
Der Nutzer liefert Rohtext mit mehreren FAQ-Paaren (Fragen und Antworten in beliebiger Form: nummeriert, mit Frage:/Antwort:-Markern, Fließtext mit Absätzen, etc.).

Deine Aufgaben:
1) Erkenne alle sinnvollen FAQ-Einträge und extrahiere sie.
2) Formuliere jede Frage und Antwort SEO-freundlich: klares, natürliches Deutsch, Frage als konkrete Nutzerfrage formuliert, Antwort strukturiert (kurze Einleitung, ggf. Aufzählungen), keine Keyword-Stuffing-Floskeln, keine übertriebenen Superlative.
3) Ordne jedem Eintrag genau einen page-Slug und optional einen category-Slug zu, passend zum Inhalt.
4) Maximal 50 Einträge. Wenn mehr Inhalt vorliegt, nimm die 50 wichtigsten/inhaltlich klarsten.

${taxonomy}

Antworte ausschließlich als strukturiertes Objekt gemäß Schema. category leerer String "" wenn keine Kategorie passt.
order: fortlaufend 0, 1, 2, … gemäß Reihenfolge im Quelltext.`,
      prompt: rawText,
      maxOutputTokens: 16_000,
    });

    return NextResponse.json({ items: object.items });
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error("[faqs/process-bulk]", err?.message ?? error);
    return NextResponse.json(
      {
        error:
          err?.message?.slice(0, 500) ||
          "KI-Verarbeitung fehlgeschlagen. Bitte Eingabe kürzen oder später erneut versuchen.",
      },
      { status: 500 }
    );
  }
}
