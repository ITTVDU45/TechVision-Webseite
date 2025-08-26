"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamischer Import der Tools-Komponente mit SSR deaktiviert
const Tools = dynamic(
  () => import("../../src/components/Tools"),
  { ssr: false }
);

export default function ToolsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Tools />
    </Suspense>
  );
}
