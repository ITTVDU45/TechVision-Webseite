import type { Metadata } from "next";
import Tools from "../components/Tools";

export const metadata: Metadata = { title: "Tools & KI-Agenten", description: "Open-Source-Werkzeuge und individuelle KI-Agenten sicher in bestehende Abläufe integrieren." };
export default function Page() { return <Tools />; }
