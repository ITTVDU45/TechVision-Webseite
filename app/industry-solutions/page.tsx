import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import IndustrySolutions from "../components/IndustrySolutions";

export const metadata: Metadata = {
  title: "Branchenlösungen",
  description: "Individuelle Software-, KI- und Automatisierungslösungen für Rechtswesen, Handel und Bahndienstleistungen.",
};

export default function IndustrySolutionsPage() {
  return <div className="min-h-screen bg-[color:var(--ink-950)] text-white"><Header /><main><IndustrySolutions /><CTA /></main><Footer /></div>;
}
