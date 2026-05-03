'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  { initials: 'AK', name: 'Ahmad Khalil',   role: 'Sales Manager', quote: 'I found 400 restaurant leads in Dubai in just 5 minutes. This tool is amazing for my business.' },
  { initials: 'SR', name: 'Sarah Reynolds', role: 'Agency Owner',  quote: 'We used to pay $300 a month for this data. Now we get it for free. The phone numbers are very accurate.' },
  { initials: 'MR', name: 'Marco Ricci',    role: 'SEO Expert',    quote: 'The Excel file is perfect. I just paste it into our system. It saves our team so much time every week.' },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Trusted by <span className="text-amber-500">People Like You</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-900 border border-slate-800 p-10 rounded-[32px] flex flex-col group"
            >
              <div className="flex gap-1 mb-6 text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-slate-300 text-lg leading-relaxed mb-10 flex-1 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 font-black text-sm group-hover:bg-teal-500 group-hover:text-white transition-all">
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-white text-base">{t.name}</div>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
