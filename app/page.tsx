import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { StatsBand } from "@/components/landing/StatsBand";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Integrations } from "@/components/landing/Integrations";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { SecurityStrip } from "@/components/landing/SecurityStrip";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-brand-dark min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <DashboardPreview />
        <StatsBand />
        <Features />
        <HowItWorks />
        <Integrations />
        <Testimonials />
        <Pricing />
        <FAQ />
        <SecurityStrip />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
