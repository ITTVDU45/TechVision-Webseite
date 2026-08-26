import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fachbeiträge",
  description: "Fachliche Einordnungen zu KI, Softwareentwicklung, Automatisierung, IT-Betrieb und Sicherheit.",
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
