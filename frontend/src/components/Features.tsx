'use client';

import React from 'react';
import { Target, Search, Lightbulb, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    icon: <Target size={24} />, 
    title: 'Identify High-Value Prospects',
    desc: 'Don\'t just collect data. Automatically filter for businesses that actually need your services based on their current digital footprint.',
    bullets: ['Instant quality score', 'Niche-specific filtering', 'Growth potential analysis'],
    wide: true,
  },
  {
    icon: <Search size={24} />, 
    title: 'Spot Business Gaps',
    desc: 'Instantly find businesses with missing websites, low reviews, or outdated profiles. We find the pain points so you don\'t have to.',
  },
  {
    icon: <Lightbulb size={24} />, 
    title: 'Tailored Service Picks',
    desc: 'Know exactly what to offer. Our AI suggests the most relevant services (SEO, Booking, Ads) for every individual lead.',
  },
  {
    icon: <MessageSquare size={24} />, 
    title: 'Ready-to-Use Scripts',
    desc: 'Stop staring at a blank screen. Get personalized cold call and email scripts that mention specific business details.',
  },
  {
    icon: <ShieldCheck size={24} />, 
    title: 'Privacy-First Logic',
    desc: 'Your prospects stay your prospects. All analysis happens locally on your computer. We never store or see your data.',
  },
  {
    icon: <Zap size={24} />, 
    title: 'Instant Execution',
    desc: 'Go from a Google Maps search to a ready-to-call list in under 60 seconds. No complex setup, no accounts needed.',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-[#020617]" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-black uppercase tracking-widest mb-4">
            Powerful Outcomes
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Engineered to <span className="text-gradient">Close Deals</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Stop wasting time on data entry. Our platform provides the intelligence you need to dominate your local market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`group glass-card p-8 rounded-[32px] flex flex-col ${feature.wide ? 'md:col-span-2 lg:flex-row lg:items-center gap-8' : ''}`}
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 group-hover:scale-110 group-hover:btn-gradient group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              
              <div className="mt-6 lg:mt-0 flex-1">
                <h3 className="text-xl font-black mb-3 group-hover:text-teal-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {feature.desc}
                </p>
                
                {feature.bullets && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {feature.bullets.map(bullet => (
                      <li key={bullet} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-500">
                          <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
