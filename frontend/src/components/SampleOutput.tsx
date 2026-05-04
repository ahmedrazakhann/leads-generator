'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Flame, Thermometer, Snowflake, Lightbulb, ShoppingCart, MessageSquare, Star, LayoutGrid, Target } from 'lucide-react';

const SAMPLE_DATA = [
  {
    name: 'London School of Barbering',
    type: 'Cold',
    rating: '4.8',
    reviews: '2,669',
    category: 'Barber shop',
    insight: 'Lacks an integrated online booking system to manage their high volume of customers efficiently.',
    whatToSell: 'Customized Online Booking and Management Software',
    script: "Hi, I'm calling from [Your Company]. I came across London School of Barbering and noticed you have an impressive 2,669 reviews with a 4.8 rating — that's outstanding. With that kind of volume, managing bookings manually is a real challenge. Not having an integrated booking system could be costing you up to 20% in missed leads. Our software is built specifically for high-volume barber education businesses like yours. Would you be open to a quick chat about how we could help streamline your operations?"
  },
  {
    name: 'Guillotine | London Bridge Barbers',
    type: 'Cold',
    rating: '4.9',
    reviews: '1,000',
    category: 'Barber shop',
    insight: 'Losing potential bookings due to an outdated or inefficient appointment scheduling system.',
    whatToSell: 'Modern online booking and management system tailored for barber shops',
    script: "Hi, I'm calling from [Your Company]. I came across Guillotine Barbers near London Bridge — 1,000 reviews and a 4.9 rating is seriously impressive. But I noticed your booking process could be a lot smoother for customers. Without an online booking system, you could be losing around 20% of potential appointments. Our system is designed for busy barber shops exactly like yours — easy to set up, reduces no-shows, and fills gaps in your diary automatically. Would you have 10 minutes this week to see how it works?"
  },
  {
    name: 'The Barber Chop | London Bridge',
    type: 'Cold',
    rating: '5.0',
    reviews: '1,014',
    category: 'Barber shop',
    insight: 'Missing out on efficient booking management and potentially losing customers due to manual scheduling.',
    whatToSell: 'A modern, integrated online booking system tailored for barber shops',
    script: "Hi, I'm calling from [Your Company]. I came across The Barber Chop near London Bridge — a 5.0 rating with over 1,014 reviews is incredibly rare. You're clearly doing something right. But with that many customers, manual scheduling must be a headache. Our booking system automates that completely, reduces no-shows, and sends automated reminders to clients. Would you have 10 minutes this week to see how it works?"
  },
  {
    name: "Ted's Grooming Room",
    type: 'Cold',
    rating: '4.9',
    reviews: '1,428',
    category: 'Barber shop',
    insight: 'Missing out on efficient appointment scheduling, potentially leading to lost bookings and revenue.',
    whatToSell: 'A modern, integrated booking system for barbershops',
    script: "Hi, I'm calling from [Your Company]. I came across Ted's Grooming Room near Liverpool Street — 1,428 reviews with a 4.9 rating is exceptional. You're clearly one of the best in the area. I did notice your online booking experience could be more seamless, which might be costing you bookings during peak periods. Our platform is used by some of London's top grooming rooms — it's sleek, branded, and reduces no-shows with automated reminders. Would you be interested in a quick demo?"
  }
];

const TypeBadge = ({ type }: { type: string }) => {
  const styles = {
    'Hot': 'bg-red-500/10 text-red-500 border-red-500/20',
    'Warm': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'Cold': 'bg-blue-500/10 text-blue-500 border-blue-500/20'
  };
  
  const icons = {
    'Hot': <Flame size={12} />,
    'Warm': <Thermometer size={12} />,
    'Cold': <Snowflake size={12} />
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[type as keyof typeof styles]}`}>
      {icons[type as keyof typeof icons]}
      {type}
    </span>
  );
};

export default function SampleOutput() {
  const featured = SAMPLE_DATA[0];

  return (
    <section className="py-24 bg-[#020617] relative overflow-hidden" id="sample-output">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(123,194,162,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-black uppercase tracking-widest mb-4"
          >
            Dashboard Preview
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            See Your <span className="text-gradient">Sales Pipeline</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            We don't just provide leads. We provide a strategy for every single prospect.
          </motion.p>
        </div>

        {/* Dashboard Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {SAMPLE_DATA.map((row, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 rounded-[32px] border border-slate-800 hover:border-teal-500/30 transition-all group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-slate-900 w-10 h-10 rounded-xl flex items-center justify-center text-teal-500 group-hover:scale-110 transition-transform">
                  <LayoutGrid size={20} />
                </div>
                <TypeBadge type={row.type} />
              </div>

              <h3 className="text-lg font-black text-white mb-1 truncate">{row.name}</h3>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs mb-4">
                <Star size={12} fill="currentColor" /> {row.rating} <span className="text-slate-500 font-medium">({row.reviews})</span>
              </div>

              <div className="space-y-4 flex-1">
                <div className="p-3 bg-red-500/5 rounded-2xl border border-red-500/10">
                  <div className="text-[9px] text-red-400 font-black uppercase tracking-widest mb-1 flex items-center gap-1">
                    <Target size={10} /> The Gap
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-2">{row.insight}</p>
                </div>

                <div className="p-3 bg-teal-500/5 rounded-2xl border border-teal-500/10">
                  <div className="text-[9px] text-teal-400 font-black uppercase tracking-widest mb-1 flex items-center gap-1">
                    <ShoppingCart size={10} /> To Pitch
                  </div>
                  <p className="text-slate-300 text-[11px] font-bold leading-relaxed line-clamp-2">{row.whatToSell}</p>
                </div>
              </div>

              <button className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-white group-hover:text-black transition-all">
                <MessageSquare size={14} /> View Script
              </button>
            </motion.div>
          ))}
        </div>

        {/* Download Button */}
        <div className="flex justify-center">
          <motion.a 
            href="/files/leads_premium_20260505_0150.xlsx"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-black text-sm uppercase tracking-widest overflow-hidden transition-all hover:bg-teal-500 hover:text-white"
          >
            <Download size={18} className="transition-transform group-hover:-translate-y-1" />
            Download Full Pipeline (.xlsx)
          </motion.a>
        </div>
      </div>
    </section>
  );
}
