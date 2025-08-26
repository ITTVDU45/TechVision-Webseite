"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamischer Import der CyberSecurity-Komponente mit SSR deaktiviert
const CyberSecurity = dynamic(
  () => import("../../src/components/CyberSecurity"),
  { ssr: false }
);

export default function CyberSecurityPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CyberSecurity />
    </Suspense>
  );
}
