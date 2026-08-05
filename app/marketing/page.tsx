import Header from "../components/Header";
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
  return (
    <div className="min-h-screen w-full bg-[#050a12] text-white">
      <Header />
      <main>
        <HeroSection />
        <Services />
        <AIStrategySection />
        <IndustrySolutionsSection />
        <ProcessSection />
        <CaseStudies apiPage="home" />
        <Technologies />
        <TopThemes />
        <FAQSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
