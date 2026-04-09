/**
 * OpenAI-Konfiguration (serverseitig).
 * Primär: Open_ai_key, openai_model (wie in .env.local / Vercel).
 * Fallback: OPENAI_API_KEY, OPENAI_FAQ_MODEL (Legacy).
 */

function readEnv(name: string): string | undefined {
  const v = process.env[name];
  return typeof v === "string" && v.trim() !== "" ? v.trim() : undefined;
}

export function getOpenAiApiKey(): string | undefined {
  return readEnv("Open_ai_key") ?? readEnv("OPENAI_API_KEY");
}

export function getOpenAiModel(fallback: string): string {
  return readEnv("openai_model") ?? readEnv("OPENAI_FAQ_MODEL") ?? fallback;
}
