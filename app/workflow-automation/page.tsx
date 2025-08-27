"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamischer Import der WorkflowAutomation-Komponente mit SSR deaktiviert
const WorkflowAutomation = dynamic(
  () => import("../components/WorkflowAutomation"),
  { ssr: false }
);

export default function WorkflowAutomationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WorkflowAutomation />
    </Suspense>
  );
}
