'use client';

import React from 'react';
import { Download, ArrowRight, MapPin, Zap, Star, Search, ShieldCheck, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
  { value: '500+', label: 'Prospects per search' },
  { value: 'Seconds', label: 'To identify gaps' },
  { value: 'AI-Powered', label: 'Pitch generation' },
  { value: 'Free', label: 'Get started now' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-20 pb-10 overflow-hidden flex items-center justify-center bg-[#020617]" id="hero">
      {/* Background Glows */}
      <div className="absolute top-[-15%] left-[-12%] w-[700px] h-[700px] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-sm shadow-teal-500/50" />
          More than a scraper. This is your sales engine.
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-4"
        >
          Find Leads. Know What to Sell.<br />
          <span className="text-gradient">Close Faster.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Automatically analyze local businesses, uncover their critical gaps, 
          and generate personalized cold outreach scripts in seconds.
        </motion.p>

        {/* Sales Workflow Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-8 relative"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between px-4 py-3 bg-[#0c1526] border-b border-slate-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 bg-slate-800/50 rounded py-1 px-3 text-[10px] text-slate-400 text-center max-w-md mx-auto flex items-center justify-center gap-2">
                <Search size={10} /> analyzing_prospects_dubai.exe
              </div>
              <div className="w-12" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] h-[300px] md:h-[380px]">
              <div className="relative overflow-hidden bg-slate-950 p-6 flex flex-col justify-center items-center">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(123,194,162,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(123,194,162,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                
                <div className="relative grid grid-cols-2 gap-4 w-full max-w-md">
                  {[
                    { label: 'Website Status', status: 'Missing', color: 'text-red-400' },
                    { label: 'Review Velocity', status: 'Low', color: 'text-amber-400' },
                    { label: 'Maps Ranking', status: 'Page 4', color: 'text-red-400' },
                    { label: 'Booking System', status: 'Manual', color: 'text-blue-400' },
                  ].map((item, i) => (
                    <motion.div 
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl backdrop-blur-sm"
                    >
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">{item.label}</div>
                      <div className={`text-xs font-black ${item.color}`}>{item.status}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="mt-8 px-6 py-3 bg-teal-500/10 border border-teal-500/30 rounded-2xl flex items-center gap-3"
                >
                  <Target className="text-teal-400" size={20} />
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Opportunity Found</div>
                    <div className="text-xs font-bold text-white">Pitch: Online Booking Migration</div>
                  </div>
                </motion.div>
              </div>

              <div className="bg-slate-900 border-l border-slate-800 p-4 flex flex-col gap-3 overflow-hidden">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest">
                    <div className="w-4 h-4 bg-teal-500 rounded flex items-center justify-center text-[8px]"><Zap size={8} fill="white" /></div>
                    Sales Engine
                  </div>
                  <span className="bg-teal-500/20 text-teal-400 rounded-full px-2 py-0.5 text-[8px] font-black">ACTIVE</span>
                </div>

                <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Generated Pitch</div>
                  <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-[10px] text-slate-400 leading-relaxed italic relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ShieldCheck size={12} className="text-teal-500" />
                    </div>
                    "Hi, I noticed [Business] has 500+ reviews but still takes bookings manually. Our system..."
                    <div className="mt-2 flex gap-1">
                      <div className="h-1 w-8 bg-teal-500/30 rounded" />
                      <div className="h-1 w-12 bg-teal-500/30 rounded" />
                    </div>
                  </div>

                  <div className="mt-auto space-y-2">
                    <div className="flex justify-between items-center text-[10px] px-1">
                      <span className="text-slate-500">Lead Strength</span>
                      <span className="text-red-400 font-black">HOT</span>
                    </div>
                    <button className="w-full py-2 btn-gradient rounded-lg text-[10px] font-black text-white flex items-center justify-center gap-2 uppercase tracking-widest">
                      <Target size={12} /> Close Deal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <button 
            onClick={() => document.getElementById('download-modal')?.dispatchEvent(new CustomEvent('open'))}
            className="px-8 py-4 text-base font-black text-white btn-gradient rounded-full hover:shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2 uppercase tracking-widest"
          >
            Get Started. It's Free.
          </button>
          <a href="#sample-output" className="px-8 py-4 text-base font-black text-slate-300 border border-slate-700 rounded-full hover:bg-slate-800 transition-all flex items-center gap-2 group uppercase tracking-widest">
            See Sample Output <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Floating Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="inline-flex flex-wrap items-center justify-center gap-0 bg-slate-900/40 border border-slate-800 rounded-2xl p-1"
        >
          {STATS.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <div className="hidden sm:block w-[1px] h-8 bg-slate-800 mx-4" />}
              <div className="px-5 py-2 flex flex-col items-center min-w-[120px]">
                <span className="text-xl font-black text-gradient">{s.value}</span>
                <span className="text-[9px] uppercase tracking-widest font-black text-slate-500 mt-1">{s.label}</span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
