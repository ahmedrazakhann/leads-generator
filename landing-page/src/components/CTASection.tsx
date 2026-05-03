'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTASection() {
  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('download-modal')?.dispatchEvent(new CustomEvent('open'));
  };

  return (
    <section className="py-24 bg-[#020617] relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-teal-500/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto glass-card rounded-[60px] p-12 md:p-20 text-center relative overflow-hidden border-teal-500/20"
        >
          {/* Animated Background Pulse */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />

          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Ready to Grow <br /><span className="text-gradient">Your Business?</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Join over 2,000 people who use MapLeads Pro to find new customers every day. No credit card required.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button 
              onClick={openModal}
              className="px-10 py-5 text-xl font-black text-white bg-linear-to-r from-teal-500 to-blue-600 rounded-full hover:shadow-xl hover:shadow-teal-500/20 hover:scale-105 transition-all flex items-center gap-3 shadow-lg"
            >
              <Download size={24} /> Add to Chrome for Free
            </button>
            <a href="#contact" className="px-10 py-5 text-xl font-black text-slate-300 border border-slate-700 rounded-full hover:bg-slate-800 transition-all">
              Contact Us
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>No Signup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span>Start in 60s</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
