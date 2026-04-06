"use client";
import React from "react";
import CaseStudies from "../components/CaseStudies";
import Header from "../components/Header";

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 md:pt-28">
        <CaseStudies />
      </main>
    </div>
  );
}
