import type { Metadata } from "next";
import WorkflowAutomation from "../components/WorkflowAutomation";

export const metadata: Metadata = { title: "Workflow-Automatisierung", description: "Robuste Automatisierung für wiederkehrende Prozesse, Systemübergaben und KI-gestützte Arbeitsabläufe." };
export default function Page() { return <WorkflowAutomation />; }
