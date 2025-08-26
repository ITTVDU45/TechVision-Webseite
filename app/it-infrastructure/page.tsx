"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamischer Import der ITInfrastructure-Komponente mit SSR deaktiviert
const ITInfrastructure = dynamic(
  () => import("../../src/components/ITInfrastructure"),
  { ssr: false }
);

export default function ITInfrastructurePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ITInfrastructure />
    </Suspense>
  );
}
