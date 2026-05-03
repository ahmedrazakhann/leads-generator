'use client';

import React from 'react';
import { Zap, LayoutList, FileText, SlidersHorizontal, Lock, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    icon: <Zap size={24} />, 
    title: 'Save Hours of Manual Work',
    desc: 'Our extension automatically scrolls through Google Maps and picks up every lead. You do not have to click anything yourself. Get 100 leads in less than 2 minutes.',
    bullets: ['Automatic scrolling', 'No duplicate leads', 'Pause and start anytime'],
    wide: true,
  },
  {
    icon: <LayoutList size={24} />, 
    title: 'Get All Important Data',
    desc: 'We collect everything you need. Names, categories, addresses, phone numbers, websites, ratings, and even opening hours.',
  },
  {
    icon: <FileText size={24} />, 
    title: 'Export to Excel or CSV',
    desc: 'Download your list with one click. Use it immediately in Excel, Google Sheets, or any other tool you like.',
  },
  {
    icon: <SlidersHorizontal size={24} />, 
    title: 'Pick Only What You Need',
    desc: 'Choose exactly which data you want to save. This keeps your files clean and saves you time.',
  },
  {
    icon: <Lock size={24} />, 
    title: 'Your Data is Private',
    desc: 'Everything stays on your computer. We do not store your leads on any server. No accounts or signups needed.',
  },
  {
    icon: <RefreshCw size={24} />, 
    title: 'Collect More over Time',
    desc: 'Leads stay in your list as you search for different things. Build a massive database in one session.',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-[#020617]" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">
            Features
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Everything You Need to <span className="text-gradient">Build Your List</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Stop wasting time copying data by hand. Our tool does the hard work for you so you can focus on selling.
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
              className={`group glass-card p-8 rounded-3xl flex flex-col ${feature.wide ? 'md:col-span-2 lg:flex-row lg:items-center gap-8' : ''}`}
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              
              <div className="mt-6 lg:mt-0 flex-1">
                <h3 className="text-xl font-bold mb-3 group-hover:text-teal-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {feature.desc}
                </p>
                
                {feature.bullets && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {feature.bullets.map(bullet => (
                      <li key={bullet} className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
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
