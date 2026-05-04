'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Flame, Thermometer, Snowflake, Lightbulb, ShoppingCart, MessageSquare, Star, MapPin, Globe } from 'lucide-react';

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
  },
  {
    name: 'Huckle the Barber - Holborn',
    type: 'Cold',
    rating: '5.0',
    reviews: '457',
    category: 'Barber shop',
    insight: 'Lacks an integrated online booking system to manage high demand, potentially frustrating customers.',
    whatToSell: 'Customizable booking and appointment management software',
    script: "Hi, I'm calling from [Your Company]. I came across Huckle the Barber in Holborn — 457 reviews and a perfect 5.0 rating. You've built something really special. With that level of demand, scheduling must get hectic. Our appointment management software handles bookings 24/7, integrates with your existing tools, and reduces no-shows by up to 40%. Would you be open to seeing how it could work for Huckle?"
  },
  {
    name: 'The Groomsmith | London Bridge',
    type: 'Cold',
    rating: '4.9',
    reviews: '698',
    category: 'Barber shop',
    insight: 'Website may not be optimized for converting visitors into booked appointments.',
    whatToSell: 'A modern, integrated online booking and customer management system',
    script: "Hi, I'm calling from [Your Company]. I came across The Groomsmith in London Bridge — 698 reviews and a 4.9 rating is fantastic. With that kind of reputation, I'd imagine you're turning away customers because your booking process isn't as smooth as it could be. Our integrated system turns website visitors into confirmed bookings automatically. We've helped similar shops increase direct bookings by up to 30%. Would you be open to a quick demo?"
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
            className="inline-block px-4 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            Real Extraction Data
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            Sample <span className="text-gradient">Output</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Here’s exactly what our AI generates. We don't just find businesses; we find opportunities.
          </motion.p>
        </div>

        {/* Featured Example */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="glass-card rounded-[32px] p-8 md:p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Snowflake size={120} className="text-blue-500" />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <TypeBadge type={featured.type} />
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star size={14} fill="currentColor" /> {featured.rating} ({featured.reviews} reviews)
                </div>
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Featured Insight</span>
              </div>
              
              <h3 className="text-3xl font-black mb-8 text-white">{featured.name}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-teal-500 font-bold text-xs uppercase tracking-widest">
                    <Lightbulb size={14} /> The Gap
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{featured.insight}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-teal-500 font-bold text-xs uppercase tracking-widest">
                    <ShoppingCart size={14} /> Solution to Pitch
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{featured.whatToSell}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-teal-500 font-bold text-xs uppercase tracking-widest">
                    <MessageSquare size={14} /> AI Outreach Script
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed italic border-l-2 border-slate-700 pl-4 py-1">"{featured.script.substring(0, 150)}..."</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Table Preview */}
        <div className="bg-slate-950 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800">
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Business Name</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Rating</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Lead Insight</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">What to Sell</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Outreach Preview</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {SAMPLE_DATA.map((row, idx) => (
                  <motion.tr 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="group hover:bg-slate-900 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-200 block truncate max-w-[180px]" title={row.name}>
                          {row.name}
                        </span>
                        <span className="text-[10px] text-slate-500">{row.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <Star size={10} fill="currentColor" /> {row.rating}
                      </div>
                      <div className="text-[10px] text-slate-500">({row.reviews})</div>
                    </td>
                    <td className="px-6 py-5">
                      <TypeBadge type={row.type} />
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-slate-400 text-xs leading-relaxed truncate max-w-[200px]" title={row.insight}>
                        {row.insight}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-slate-400 text-xs leading-relaxed truncate max-w-[150px]" title={row.whatToSell}>
                        {row.whatToSell}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-slate-500 text-[10px] leading-relaxed italic truncate max-w-[200px]" title={row.script}>
                        "{row.script}"
                      </p>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
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
            Download Full Excel Report (.xlsx)
          </motion.a>
        </div>
      </div>
    </section>
  );
}
