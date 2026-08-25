/**
 * Sektionsbausteine.
 *
 * Vier Formen statt einer. Welche Form gewählt wird, soll etwas über den
 * Inhalt aussagen: SplitFeature für ein Thema, das Gewicht hat, StepFlow für
 * eine echte Abfolge, StatBand für Belege, SectionHeader als Aufmacher.
 * Die Kachel bleibt erlaubt – aber nur, wo Dinge wirklich gleichrangig
 * nebeneinanderstehen.
 */

export { default as SectionHeader } from "./SectionHeader";
export { default as SplitFeature } from "./SplitFeature";
export { default as StepFlow } from "./StepFlow";
export { default as StatBand } from "./StatBand";
export type { Step } from "./StepFlow";
export type { Stat } from "./StatBand";
