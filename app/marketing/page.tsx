"use client";
import { useState } from "react";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import EfficiencySection from "../../app/EfficiencySection";
import Technologies from "../components/Technologies";
import ProcessSection from "./ProcessSection";
import CaseStudies from "../components/CaseStudies";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

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
