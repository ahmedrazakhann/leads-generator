'use client';

import React from 'react';
import { Search, Play, Download, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    num: '01', icon: <Search size={32} />,
    title: 'Search on Google Maps',
    desc: 'Go to Google Maps. Type what you are looking for and where. For example, plumbers in Chicago.',
  },
  {
    num: '02', icon: <Play size={32} />,
    title: 'Start the Scraper',
    desc: 'Open the extension and click Start. Watch as it finds and saves every business listing for you.',
  },
  {
    num: '03', icon: <Download size={32} />,
    title: 'Download Your File',
    desc: 'When you are done, just click Export. You will get a clean Excel or CSV file with all your new leads.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-950/50" id="how-it-works">
      <div className="container mx-auto px-6 text-center">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            How It Works
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            3 Steps to <span className="text-gradient">Your Next Customer</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-4 max-w-6xl mx-auto">
          {STEPS.map((step, idx) => (
            <React.Fragment key={step.num}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="flex-1 max-w-[340px] glass-card p-10 rounded-[40px] text-center relative group"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl font-black text-slate-800/30 group-hover:text-teal-500/20 transition-colors pointer-events-none">
                  {step.num}
                </div>
                <div className="w-20 h-20 rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 mb-8 mx-auto shadow-xl group-hover:scale-110 group-hover:border-teal-500/50 transition-all duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
              
              {idx < STEPS.length - 1 && (
                <div className="hidden md:block text-slate-700">
                  <ArrowRight size={32} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
