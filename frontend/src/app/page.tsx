import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Integrations from "@/components/Integrations";
import ProblemSolution from "@/components/ProblemSolution";
import DemoSection from "@/components/DemoSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import SampleOutput from "@/components/SampleOutput";
import ScriptHighlight from "@/components/ScriptHighlight";
import Pricing from "@/components/Pricing";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DownloadModal from "@/components/DownloadModal";

export const metadata: Metadata = {
  title: 'SaaSquatch Intelligence | AI-Powered Google Maps Lead Generation',
  description: 'The ultimate sales intelligence platform. Extract business leads from Google Maps, identify growth gaps, and generate personalized AI outreach scripts instantly.',
  keywords: ['lead generation', 'google maps scraper', 'sales intelligence', 'AI sales scripts', 'B2B leads'],
  openGraph: {
    title: 'SaaSquatch Intelligence | AI-Powered Lead Gen',
    description: 'Transform Google Maps data into actionable sales strategies with AI-driven insights.',
    images: ['/images/hero_bg_map.png'],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-teal-500/30">
      <Navbar />
      <Hero />
      <Integrations />
      <ProblemSolution />
      <DemoSection />
      <Features />
      <HowItWorks />
      <SampleOutput />
      <ScriptHighlight />
      <Pricing />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Contact />
      <Footer />
      
      <DownloadModal />
    </main>
  );
}
