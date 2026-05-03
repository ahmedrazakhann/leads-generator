'use client';

import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Zap, FileDown, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const LEADS = [
  { name: 'Zuma Dubai',        phone: '+971 4 425 5660', rating: '4.8', category: 'Japanese Restaurant' },
  { name: 'Nobu Dubai',        phone: '+971 4 818 1111', rating: '4.7', category: 'Fine Dining' },
  { name: 'Nusr-Et Steakhouse',phone: '+971 4 667 5880', rating: '4.5', category: 'Steakhouse' },
  { name: 'Nammos Dubai',      phone: '+971 4 376 7476', rating: '4.6', category: 'Mediterranean' },
  { name: 'La Petite Maison',  phone: '+971 4 439 0505', rating: '4.7', category: 'French Restaurant' },
  { name: 'Ossiano',           phone: '+971 4 426 2626', rating: '4.9', category: 'Seafood' },
];

const PINS = [
  { x: '22%', y: '38%', color: '#7BC2A2' },
  { x: '45%', y: '55%', color: '#3F8670' },
  { x: '62%', y: '28%', color: '#7BC2A2' },
  { x: '35%', y: '68%', color: '#4a9d7e' },
  { x: '72%', y: '48%', color: '#7BC2A2' },
  { x: '55%', y: '72%', color: '#3F8670' },
];

export default function DemoSection() {
  const [visibleRows, setVisibleRows] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const startDemo = () => {
    setVisibleRows(0);
    setProgress(0);
    setScanning(true);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleRows(count);
      setProgress(Math.round((count / LEADS.length) * 100));
      if (count >= LEADS.length) {
        clearInterval(interval);
        setScanning(false);
      }
    }, 1000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) startDemo(); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-[#020617]" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
            See it in Action
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Scraping <span className="text-gradient">Made Simple</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Watch how it automatically finds data while you sit back and relax.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start max-w-7xl mx-auto">
          {/* Map Side */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-lg shadow-black/20 relative group">
            <div className="flex items-center justify-between p-4 bg-[#0f1e36] border-b border-slate-800">
              <div className="flex items-center gap-3 bg-slate-950/50 border border-slate-800 rounded-lg px-3 py-2 flex-1 max-w-md text-xs text-slate-500">
                <MapPin size={14} className="text-teal-500" />
                <span>dentists in London, UK</span>
              </div>
              <div className="flex gap-2 ml-4">
                <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800" />
                <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800" />
              </div>
            </div>
            
            <div className="relative h-[400px] md:h-[500px]">
              <img 
                src="/images/london_map.png" 
                alt="London Map" 
                className="w-full h-full object-cover opacity-70 contrast-125 grayscale-[20%]"
              />
              
              {/* Animated pins */}
              <AnimatePresence>
                {PINS.slice(0, visibleRows).map((pin, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute -translate-x-1/2 -translate-y-full cursor-pointer z-20"
                    style={{ left: pin.x, top: pin.y, color: pin.color }}
                  >
                    <div className="relative">
                      <MapPin size={32} fill="currentColor" className="drop-shadow-md" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[10px] font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {LEADS[i]?.name}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Scan line */}
              {scanning && (
                <motion.div 
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] btn-gradient shadow-sm shadow-primary/30 z-10"
                />
              )}
            </div>
          </div>

          {/* Extension Side */}
          <div className="lg:sticky lg:top-24 bg-slate-950 rounded-3xl border border-slate-800 p-6 flex flex-col gap-6 shadow-lg shadow-black/20">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <MapPin size={18} className="text-teal-500" />
                <span>Map<span className="text-teal-500">Leads</span> Pro</span>
              </div>
              <div className="bg-teal-500/10 text-teal-400 rounded-full px-3 py-1 text-[11px] font-bold">
                {visibleRows} / {LEADS.length}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full btn-gradient"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-bold text-teal-500 min-w-[35px] text-right">{progress}%</span>
            </div>

            <div className={cn(
              "flex items-center gap-2 text-xs font-medium transition-colors",
              scanning ? "text-slate-400" : "text-green-500"
            )}>
              <span className={cn(
                "w-2 h-2 rounded-full",
                scanning ? "bg-teal-500 animate-pulse" : "bg-green-500"
              )} />
              {scanning ? `Searching... ${visibleRows} found` : `Finished! ${visibleRows} leads saved`}
            </div>

            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/30 flex-1">
              <div className="grid grid-cols-[1fr_50px_80px] px-3 py-2 bg-slate-800/50 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                <span>Business</span><span>Rate</span><span>Phone</span>
              </div>
              <div className="max-h-[250px] overflow-hidden">
                {LEADS.slice(0, visibleRows).map((lead, i) => (
                  <motion.div 
                    key={lead.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-[1fr_50px_80px] px-3 py-2.5 border-b border-slate-800/50 text-[11px] items-center"
                  >
                    <span className="truncate font-semibold text-slate-200">{lead.name}</span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star size={10} fill="currentColor" /> {lead.rating}
                    </span>
                    <span className="text-slate-500 truncate text-[10px]">{lead.phone.split(' ')[0]}...</span>
                  </motion.div>
                ))}
                
                {visibleRows < LEADS.length && (
                  <div className="p-3 space-y-2">
                    <div className="h-3 w-3/4 bg-slate-800/50 rounded-full animate-pulse" />
                    <div className="h-2 w-1/2 bg-slate-800/30 rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {!scanning && visibleRows > 0 && (
              <div className="flex gap-2">
                <button 
                  onClick={startDemo}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 transition-colors text-xs font-bold text-slate-300 flex items-center justify-center gap-2"
                >
                  <Zap size={14} /> Try Again
                </button>
                <button className="flex-1 py-3 px-4 rounded-xl btn-gradient hover:shadow-md hover:shadow-primary/10 transition-all text-xs font-bold text-white flex items-center justify-center gap-2">
                  <FileDown size={14} /> Export CSV
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
