import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import CaseStudies from "../components/CaseStudies";

export const metadata: Metadata = { title: "Referenzen & Case Studies", description: "Ausgewählte Software-, KI-, Web- und IT-Projekte von IT-Techvision." };

export default function CaseStudiesPage() {
  return <div className="min-h-screen bg-[#050912] text-white"><Header /><main className="pt-20"><CaseStudies /><CTA /></main><Footer /></div>;
}
