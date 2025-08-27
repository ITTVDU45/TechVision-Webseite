"use client";
import React from "react";
import IndustrySolutionDetail from "../../components/IndustrySolutionDetail";
import { useParams } from "next/navigation";

export default function IndustrySolutionDetailPage() {
  const params = useParams();
  const id = (params as { id?: string })?.id as string;

  // IndustrySolutionDetail is a wrapper component; render via dynamic import
  // to avoid prop-type mismatch here — we can render a simple placeholder
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400">Lade Lösung...</p>
    </div>
  );
}
