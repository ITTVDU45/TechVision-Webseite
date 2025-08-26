"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamischer Import der KITransformation-Komponente mit SSR deaktiviert
const KITransformation = dynamic(
  () => import("../components/KITransformation"),
  { ssr: false }
);

export default function KITransformationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KITransformation />
    </Suspense>
  );
}
