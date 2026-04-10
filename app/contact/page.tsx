import type { Metadata } from "next";
import Contact from "../components/Contact";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie IT-Techvision in Duisburg — Adresse, E-Mail, Formular und Anfahrt.",
};

export default function ContactPage() {
  return <Contact />;
}
