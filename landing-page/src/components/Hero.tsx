'use client';

import React from 'react';
import { Download, ArrowRight, MapPin, Zap, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
  { value: '500+', label: 'Leads per search' },
  { value: '2 min', label: 'To get 100 leads' },
  { value: 'CSV + XLSX', label: 'Export formats' },
  { value: 'Free', label: 'No credit card' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center justify-center bg-[#020617]" id="hero">
      {/* Background Glows */}
      <div className="absolute top-[-15%] left-[-12%] w-[700px] h-[700px] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_rgba(20,184,166,1)]" />
          Free Chrome Extension. Works in 60 seconds.
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6"
        >
          Get 500 Business Leads<br />
          from Google Maps <span className="text-gradient">in 2 Minutes</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Search anything on Google Maps. Hit Start. Watch names, phones, addresses, 
          websites, and ratings fill up automatically. Export to Excel. Done.
        </motion.p>

        {/* Browser Mockup Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-5xl mx-auto mb-12 relative"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0c1526] border-b border-slate-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 bg-slate-800/50 rounded py-1 px-3 text-[11px] text-slate-500 text-left ml-2">
                google.com/maps/search/restaurants+in+Dubai
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr_290px] h-[350px] md:h-[450px]">
              <div className="relative overflow-hidden bg-slate-900">
                <img 
                  src="/images/dubai_map.png" 
                  alt="Dubai Map" 
                  className="w-full h-full object-cover opacity-80 contrast-110 brightness-90"
                />
                {/* Floating Pins */}
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[35%] left-[25%] text-teal-400 drop-shadow-lg"><MapPin size={28} fill="currentColor" /></motion.div>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} className="absolute top-[52%] left-[52%] text-blue-400 drop-shadow-lg"><MapPin size={28} fill="currentColor" /></motion.div>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} className="absolute top-[30%] left-[70%] text-purple-400 drop-shadow-lg"><MapPin size={28} fill="currentColor" /></motion.div>
              </div>

              <div className="bg-slate-950 border-l border-slate-800 p-4 flex flex-col gap-3 overflow-hidden">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <img src="/images/logo_horizontal.png" alt="SaaSquatch" className="h-4 w-auto" />
                  </div>
                  <span className="bg-teal-500/20 text-teal-400 rounded-full px-2 py-0.5 text-[10px] font-bold">47 leads</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-900 rounded p-2 text-left">
                    <div className="text-[9px] text-slate-500 uppercase">Max Results</div>
                    <div className="text-xs font-bold text-slate-200">100</div>
                  </div>
                  <div className="bg-slate-900 rounded p-2 text-left">
                    <div className="text-[9px] text-slate-500 uppercase">Export As</div>
                    <div className="text-xs font-bold text-slate-200">Excel</div>
                  </div>
                </div>

                <button className="w-full py-2 bg-linear-to-r from-teal-500 to-blue-600 rounded text-[11px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20">
                  <Zap size={12} /> Start Scraping
                </button>

                <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                  <div className="grid grid-cols-[1fr_1fr_40px] px-2 py-1 bg-slate-900/50 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    <span>Name</span><span>Phone</span><span>Rate</span>
                  </div>
                  {[
                    ['Zuma Dubai', '+971 4 425', '4.8'],
                    ['Nobu Dubai', '+971 4 818', '4.7'],
                    ['Nusr-Et',    '+971 4 667', '4.5'],
                    ['COYA Dubai', '+971 4 316', '4.6'],
                  ].map(([name, phone, rate], i) => (
                    <motion.div 
                      key={name}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.2 }}
                      className="grid grid-cols-[1fr_1fr_40px] px-2 py-2 border-b border-slate-800/50 text-[10px] text-slate-300"
                    >
                      <span className="truncate font-medium">{name}</span>
                      <span className="truncate">{phone}</span>
                      <span className="flex items-center gap-1 text-amber-500"><Star size={8} fill="currentColor" /> {rate}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <button className="px-8 py-4 text-lg font-bold text-white bg-linear-to-r from-teal-500 to-blue-600 rounded-full hover:shadow-[0_0_30px_rgba(20,184,166,0.45)] hover:scale-105 transition-all flex items-center gap-2">
            <Download size={20} /> Add to Chrome. It is Free.
          </button>
          <a href="#how-it-works" className="px-8 py-4 text-lg font-bold text-slate-300 border border-slate-700 rounded-full hover:bg-slate-800 transition-all flex items-center gap-2">
            See How It Works <ArrowRight size={20} />
          </a>
        </motion.div>

        {/* Floating Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="inline-flex flex-wrap items-center justify-center gap-0 bg-slate-900/60 border border-slate-800 rounded-2xl p-2 sm:p-4"
        >
          {STATS.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <div className="hidden sm:block w-[1px] h-10 bg-slate-800 mx-6" />}
              <div className="px-6 py-2 flex flex-col items-center min-w-[140px]">
                <span className="text-2xl font-black text-gradient">{s.value}</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mt-1">{s.label}</span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
