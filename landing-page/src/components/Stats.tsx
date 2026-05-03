'use client';

import React, { useEffect, useState, useRef } from 'react';
import { TrendingUp, Users, Clock, ShieldCheck } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { 
    icon: <TrendingUp size={28}/>, 
    end: 500, suffix: '+', 
    label: 'Leads per search', 
    desc: 'Found in just one search' 
  },
  { 
    icon: <Users size={28}/>, 
    end: 2000, suffix: '+', 
    label: 'Users worldwide', 
    desc: 'Trusted across 40 countries' 
  },
  { 
    icon: <Clock size={28}/>, 
    end: 10, suffix: 'x', 
    label: 'Save time', 
    desc: 'Faster than doing it by hand' 
  },
  { 
    icon: <ShieldCheck size={28}/>, 
    end: 100, suffix: '%', 
    label: 'Private and Safe', 
    desc: 'Your data stays on your PC' 
  },
];

function Counter({ end, duration = 2000, startTrigger = false }: { end: number, duration?: number, startTrigger?: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) return;
    
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startTrigger]);

  return <span>{count}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-24 relative overflow-hidden bg-slate-950 border-y border-slate-900" ref={ref}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            Our Growth
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Trusted by <span className="text-gradient">Businesses Everywhere</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-10 rounded-[40px] text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 mx-auto group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {stat.icon}
              </div>
              <div className="text-5xl font-black text-gradient mb-2">
                <Counter end={stat.end} startTrigger={isInView} />{stat.suffix}
              </div>
              <div className="text-lg font-bold text-slate-100 mb-2">{stat.label}</div>
              <div className="text-sm text-slate-500 leading-relaxed">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
