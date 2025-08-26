"use client";
import React from "react";
import IndustrySolutionDetail from "../../../src/components/IndustrySolutionDetail.tsx";
import { useParams } from "next/navigation";

export default function IndustrySolutionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  return <IndustrySolutionDetail id={id} />;
}
