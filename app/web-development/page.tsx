"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamischer Import der WebDevelopment-Komponente mit SSR deaktiviert
const WebDevelopment = dynamic(
  () => import("../../src/components/WebDevelopment"),
  { ssr: false }
);

export default function WebDevelopmentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WebDevelopment />
    </Suspense>
  );
}
