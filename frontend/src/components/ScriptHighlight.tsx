'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Copy, Check, Terminal, ShieldCheck } from 'lucide-react';

export default function ScriptHighlight() {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-[#020617] overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-black uppercase tracking-widest mb-4">
              AI Sales Assistant
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white">
              Your Sales Pitch<br />
              <span className="text-gradient">Ready in Seconds.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              We analyze the business data to find the "hook". Our AI then builds a personalized script that sounds like you've spent hours researching the prospect.
            </p>
            
            <ul className="space-y-4">
              {[
                "Personalized business stats (reviews, rating)",
                "Specific problem identification",
                "Proven psychology-backed hooks",
                "Direct call-to-action"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-300 font-bold">
                  <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-500">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Terminal Window */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-800" />
                  <div className="w-3 h-3 rounded-full bg-slate-800" />
                  <div className="w-3 h-3 rounded-full bg-slate-800" />
                </div>
                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={12} /> generated_script.txt
                </div>
                <button onClick={handleCopy} className="text-slate-500 hover:text-white transition-colors">
                  {copied ? <Check size={16} className="text-teal-500" /> : <Copy size={16} />}
                </button>
              </div>
              
              <div className="p-8 font-mono text-sm leading-relaxed">
                <p className="text-slate-500 mb-4">// Script for London School of Barbering</p>
                <p className="text-slate-300">
                  "Hi, I'm calling from [Your Company]. I came across <span className="text-teal-400 font-bold">London School of Barbering</span> and noticed you have an impressive <span className="text-teal-400 font-bold">2,669 reviews</span> with a <span className="text-teal-400 font-bold">4.8 rating</span> — that's outstanding."
                </p>
                <br />
                <p className="text-slate-300">
                  "With that kind of volume, managing bookings manually is a real challenge. Not having an <span className="text-red-400 font-bold underline decoration-red-500/30">integrated booking system</span> could be costing you up to <span className="text-red-400 font-bold">20% in missed leads</span>."
                </p>
                <br />
                <p className="text-slate-300">
                  "Our software is built specifically for <span className="text-teal-400 font-bold">high-volume barber education</span> businesses like yours. Would you be open to a quick chat?"
                </p>
                
                <div className="mt-10 flex items-center gap-3 p-4 bg-teal-500/5 border border-teal-500/10 rounded-2xl">
                  <ShieldCheck size={20} className="text-teal-500" />
                  <span className="text-[10px] text-teal-400 font-black uppercase tracking-widest">Psychology Checked & Verified</span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 blur-3xl pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
