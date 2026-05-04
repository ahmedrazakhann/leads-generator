'use client';

import React from 'react';
import { Target, Search, MessageSquare, ArrowRight, Zap, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    num: '01', icon: <Search size={32} />,
    title: 'Identify Prospects',
    desc: 'Search any niche on Google Maps. We find the businesses and instantly pull their profile data.',
  },
  {
    num: '02', icon: <Zap size={32} />,
    title: 'Analyze Business Gaps',
    desc: 'Our AI scans every prospect to find missing websites, low ratings, and lack of digital tools.',
  },
  {
    num: '03', icon: <Trophy size={32} />,
    title: 'Execute & Close',
    desc: 'Get a ready-made pitch for their specific gaps. Call them, sound like an expert, and close the deal.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-950/50 relative overflow-hidden" id="how-it-works">
      {/* Connector Line (Desktop) */}
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-slate-800 hidden md:block" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-black uppercase tracking-widest mb-4">
            The Workflow
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            From Search to <span className="text-gradient">Sold</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-center gap-10 md:gap-8 max-w-6xl mx-auto">
          {STEPS.map((step, idx) => (
            <React.Fragment key={step.num}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="flex-1 w-full glass-card p-10 rounded-[40px] text-center relative group"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-7xl font-black text-slate-800/20 group-hover:text-teal-500/10 transition-colors pointer-events-none italic">
                  {step.num}
                </div>
                <div className="w-24 h-24 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-500 mb-8 mx-auto shadow-2xl group-hover:scale-110 group-hover:border-teal-500/50 transition-all duration-500">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                
                {/* Mobile Arrow */}
                {idx < STEPS.length - 1 && (
                  <div className="md:hidden mt-8 flex justify-center text-slate-800">
                    <ArrowRight size={24} className="rotate-90" />
                  </div>
                )}
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
