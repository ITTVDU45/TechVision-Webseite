"use client";
import React from "react";
import IndustrySolutionDetail from "../../components/IndustrySolutionDetail";
import { useParams } from "next/navigation";

export default function IndustrySolutionDetailPage() {
  const params = useParams();
  const id = (params as any)?.id as string;

  return <IndustrySolutionDetail id={id} />;
}
