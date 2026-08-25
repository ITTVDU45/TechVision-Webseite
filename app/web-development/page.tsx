import type { Metadata } from "next";
import WebDevelopment from "../components/WebDevelopment";

export const metadata: Metadata = { title: "Webentwicklung", description: "Schnelle, zugängliche und skalierbare Websites und Webanwendungen für Unternehmen." };
export default function Page() { return <WebDevelopment />; }
