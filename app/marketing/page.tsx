"use client";
import { useState } from "react";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import AIStrategySection from "../components/AIStrategySection";
import IndustrySolutionsSection from "../components/IndustrySolutionsSection";
import Technologies from "../components/Technologies";
import ProcessSection from "./ProcessSection";
import CaseStudies from "../components/CaseStudies";
import TopThemes from "../components/TopThemes";
import FAQSection from "../components/FAQSection";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function HomePage() {
  const [isLoading] = useState(false);

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
      {/* AI Strategy Section */}
      <AIStrategySection />
      {/* Industry Solutions Section */}
      <IndustrySolutionsSection />
      {/* Process Section */}
      <ProcessSection />
      {/* Case Studies Section */}
      <CaseStudies />
      {/* Technologies Section */}
      <Technologies />
      {/* Top Themes Section */}
      <TopThemes />
      {/* FAQ Section */}
      <FAQSection />
      {/* CTA Section */}
      <CTA />
      {/* Footer */}
      <Footer />
    </div>
  );
}
