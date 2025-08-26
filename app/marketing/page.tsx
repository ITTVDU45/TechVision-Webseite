"use client";
import { useState } from "react";
import Header from "../../src/components/Header";
import LoadingScreen from "../../src/components/LoadingScreen";
import HeroSection from "../../src/components/HeroSection";
import Services from "../../src/components/Services";
import EfficiencySection from "../../app/EfficiencySection";
import Technologies from "../../src/components/Technologies";
import ProcessSection from "./ProcessSection";
import CaseStudies from "../../src/components/CaseStudies";
import Testimonials from "../../src/components/Testimonials";
import CTA from "../../src/components/CTA";
import Footer from "../../src/components/Footer";

export default function HomePage() {
  const [isLoading] = useState(true);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <HeroSection isLoading={isLoading} />
      {/* Services Section */}
      <Services />
      {/* Efficiency Section */}
      <EfficiencySection />
      {/* Case Studies Section (moved) */}
      <CaseStudies />
      {/* Technologies Section */}
      <Technologies />
      {/* Process Section */}
      <ProcessSection />
      {/* Testimonials Section */}
      <Testimonials />
      {/* CTA Section */}
      <CTA />
      {/* Footer */}
      <Footer />
    </div>
  );
}
