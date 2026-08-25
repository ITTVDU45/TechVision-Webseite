import type { Metadata } from "next";
import CyberSecurity from "../components/CyberSecurity";

export const metadata: Metadata = { title: "Cybersecurity", description: "Risikoanalyse, wirksame Schutzmaßnahmen und kontinuierliche Absicherung für Unternehmen." };
export default function Page() { return <CyberSecurity />; }
