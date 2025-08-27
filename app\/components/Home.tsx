import { useState } from 'react'
import Header from './Header'
import LoadingScreen from './LoadingScreen'
import HeroSection from './HeroSection'
import Services from './Services'
import ProcessSection from './ProcessSection'
import CaseStudies from './CaseStudies'
import CTA from './CTA'
import Footer from './Footer'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

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
      
      {/* Process Section */}
      <ProcessSection />
      
      
      {/* CTA Section */}
      <CTA />
      
      {/* Footer */}
      <Footer />
    </div>
  )
} 