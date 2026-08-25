import type { Metadata } from "next";
import WebHosting from "../components/WebHosting";

export const metadata: Metadata = { title: "Hosting & Betrieb", description: "Sicheres Hosting, Monitoring, Updates und persönlicher technischer Support." };
export default function Page() { return <WebHosting />; }
