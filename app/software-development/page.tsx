"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamischer Import der SoftwareDevelopment-Komponente mit SSR deaktiviert
const SoftwareDevelopment = dynamic(
  () => import("../../src/components/SoftwareDevelopment"),
  { ssr: false }
);

export default function SoftwareDevelopmentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SoftwareDevelopment />
    </Suspense>
  );
}
