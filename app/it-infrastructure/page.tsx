import type { Metadata } from "next";
import ITInfrastructure from "../components/ITInfrastructure";

export const metadata: Metadata = { title: "IT-Infrastruktur", description: "Planung, Beschaffung, Einrichtung und Betreuung sicherer IT-Infrastrukturen." };
export default function Page() { return <ITInfrastructure />; }
