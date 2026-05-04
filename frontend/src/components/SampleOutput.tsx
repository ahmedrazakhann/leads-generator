'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Flame, Thermometer, Snowflake, Lightbulb, ShoppingCart, MessageSquare, ExternalLink } from 'lucide-react';

const SAMPLE_DATA = [
  {
    name: 'Zuma Dubai',
    type: 'Hot',
    insight: 'Rapidly expanding high-end restaurant with multiple new locations and high traffic.',
    whatToSell: 'Integrated Supply Chain & Inventory Management',
    script: 'I noticed your new DIFC location is trending. Our system handles 500+ orders/hour with 0% downtime...'
  },
  {
    name: 'PetroGas Solutions',
    type: 'Warm',
    insight: 'Established energy firm looking to modernize their field reporting and data collection.',
    whatToSell: 'Mobile-First Field Service Management App',
    script: 'Saw your recent contract in the North Sea. Our app helps field engineers report data 40% faster...'
  },
  {
    name: 'Innova Health',
    type: 'Hot',
    insight: 'New health clinic with high patient volume but experiencing scheduling bottlenecks.',
    whatToSell: 'AI-Powered Patient Scheduling & Reminders',
    script: 'Patients are mentioning wait times in reviews. Our AI scheduler reduces front-desk load by 30%...'
  },
  {
    name: 'Green Horizon Landscaping',
    type: 'Cold',
    insight: 'Local business with seasonal demand; currently lacks a dominant local search presence.',
    whatToSell: 'SEO & Google Maps Visibility Package',
    script: 'Your business is on page 3 for "landscaping". We can push you to the top 3 in 30 days...'
  },
  {
    name: 'Blue Sky Logistics',
    type: 'Warm',
    insight: 'Logistics company scaling their fleet by 20% this quarter; fuel costs are rising.',
    whatToSell: 'Fleet Telematics & AI Routing Engine',
    script: 'Saw you\'re adding 50 new trucks. Our routing engine can save you 12% on fuel costs starting today...'
  },
  {
    name: 'Artisan Bakery Co.',
    type: 'Cold',
    insight: 'Small bakery with high social engagement but manual, error-prone sales process.',
    whatToSell: 'Shopify E-commerce & Delivery Automation',
    script: 'Your Instagram fans want to order online. We can set up your store and automate delivery...'
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
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(123,194,162,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            Proof of Concept
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
            Here’s what the system generates — not just raw data, but ready-to-use sales insights tailored for your pitch.
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
              <Flame size={120} className="text-red-500" />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <TypeBadge type={featured.type} />
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Featured Example</span>
              </div>
              
              <h3 className="text-3xl font-black mb-8 text-white">{featured.name}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-teal-500 font-bold text-xs uppercase tracking-widest">
                    <Lightbulb size={14} /> Lead Insight
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{featured.insight}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-teal-500 font-bold text-xs uppercase tracking-widest">
                    <ShoppingCart size={14} /> What to Sell
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{featured.whatToSell}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-teal-500 font-bold text-xs uppercase tracking-widest">
                    <MessageSquare size={14} /> Call Script
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed italic">"{featured.script}"</p>
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
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Type</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Lead Insight</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">What to Sell</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Call Script</th>
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
                      <span className="font-bold text-slate-200 block truncate max-w-[150px]" title={row.name}>
                        {row.name}
                      </span>
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
                      <p className="text-slate-500 text-xs leading-relaxed italic truncate max-w-[250px]" title={row.script}>
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
