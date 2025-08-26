"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamischer Import der WebHosting-Komponente mit SSR deaktiviert
const WebHosting = dynamic(
  () => import("../../src/components/WebHosting"),
  { ssr: false }
);

export default function WebHostingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WebHosting />
    </Suspense>
  );
}
