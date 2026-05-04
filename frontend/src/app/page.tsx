'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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

const INTEGRATIONS = ['Microsoft Excel', 'Google Sheets', 'HubSpot', 'Mailchimp', 'Salesforce', 'Zapier', 'Airtable'];

function Integrations() {
  return (
    <div className="py-12 bg-[#020617] border-y border-slate-900/50 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">
          Sync your closed deals with your favorite tools
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-40 grayscale">
          {INTEGRATIONS.map(item => (
            <span key={item} className="text-sm md:text-lg font-bold text-slate-400 cursor-default">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

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
