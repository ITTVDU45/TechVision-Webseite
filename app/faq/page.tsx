import type { Metadata } from "next";
import FAQ from "../components/FAQ";

export const metadata: Metadata = { title: "FAQ", description: "Antworten zu KI, Softwareentwicklung, Automatisierung, Cybersecurity, Infrastruktur und Hosting." };
export default function FAQPage() { return <FAQ />; }
