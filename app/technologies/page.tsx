import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import Technologies from "../components/Technologies";

export const metadata: Metadata = { title: "Technologien", description: "Technologien und Plattformen für wartbare, sichere und skalierbare digitale Lösungen." };

export default function TechnologiesPage() {
  return <div className="min-h-screen bg-[color:var(--ink-950)] text-white"><Header /><main className="pt-20"><Technologies asPage /><CTA /></main><Footer /></div>;
}
