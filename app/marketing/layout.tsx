import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI, Software und sichere IT-Lösungen",
  description: "IT-Techvision entwickelt individuelle Software, KI-Lösungen und sichere IT-Infrastrukturen für mittelständische Unternehmen.",
  alternates: { canonical: "/marketing" },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
