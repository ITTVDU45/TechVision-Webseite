"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamischer Import der WebHosting-Komponente mit SSR deaktiviert
const WebHosting = dynamic(
  () => import("../../src/components/WebHosting"),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Lade Webhosting-Seite...</p>
        </div>
      </div>
    )
  }
);

export default function WebHostingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Lade Webhosting-Seite...</p>
        </div>
      </div>
    }>
      <WebHosting />
    </Suspense>
  );
}
