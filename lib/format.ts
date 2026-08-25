/**
 * Anzeigeformate für Inhalte.
 *
 * Datumsangaben liegen im Datensatz als ISO 8601 vor (siehe `lib/types/content`).
 * Erst hier werden sie in deutsche Schreibweise übersetzt – so bleiben Sortierung,
 * Filterung und `<time dateTime>` möglich.
 */

const MONATE = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
] as const;

/**
 * "2024-03-22" → "22. März 2024".
 *
 * Absichtlich ohne `toLocaleDateString`: Server und Browser müssten sonst
 * dieselbe ICU-Datenbasis haben, sonst weicht die Hydration ab.
 * Nicht interpretierbare Werte werden unverändert zurückgegeben, damit ein
 * fehlerhafter Datensatz die Seite nicht leer rendert.
 */
export function formatDate(value: string | undefined | null): string {
  if (!value) return "";
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim());
  if (!match) return value;

  const [, year, month, day] = match;
  const monthName = MONATE[Number(month) - 1];
  if (!monthName) return value;

  return `${day}. ${monthName} ${year}`;
}

/** Wert für das `dateTime`-Attribut von `<time>`; leer, wenn kein ISO-Datum. */
export function isoDate(value: string | undefined | null): string {
  if (!value) return "";
  return /^\d{4}-\d{2}-\d{2}/.test(value.trim()) ? value.trim().slice(0, 10) : "";
}
