'use client';

import React from 'react';
import { Check, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const PLANS = [
  {
    name: 'Free', price: '$0', period: '/forever',
    desc: 'Great for small projects and trying out the tool.',
    features: ['Up to 100 leads per session','Export to CSV','All basic data fields','No signup needed','Unlimited searches'],
    cta: 'Download Free', primary: false, href: '#download',
  },
  {
    name: 'Pro', price: '$19', period: '/month', popular: true,
    desc: 'For teams who need a lot of leads every day.',
    features: ['Unlimited leads per session','CSV and Excel export','All 10 data fields','Save your progress','Priority support','Fast bulk search'],
    cta: 'Get Pro Now', primary: true, href: '#contact',
  },
  {
    name: 'Enterprise', price: 'Custom', period: '',
    desc: 'For big agencies with special needs.',
    features: ['Everything in Pro','API access','Connect to your CRM','Personal manager','Custom data mapping'],
    cta: 'Contact Us', primary: false, href: '#contact',
  },
];

export default function Pricing() {
  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('download-modal')?.dispatchEvent(new CustomEvent('open'));
  };

  return (
    <section className="py-24 bg-[#020617]" id="pricing">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">
            Pricing
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Fair and <span className="text-gradient">Simple Pricing</span>
          </h2>
          <p className="text-slate-400 text-lg">Start for free. Upgrade only when you need more power.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-end">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={cn(
                "relative p-8 md:p-10 rounded-[40px] border flex flex-col transition-all duration-500",
                plan.popular 
                  ? "bg-slate-900 border-teal-500/50 shadow-2xl shadow-teal-500/10 scale-105 z-10 py-12" 
                  : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-teal-500 to-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="text-xl font-bold text-slate-400 mb-2">{plan.name}</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-black text-white">{plan.price}</span>
                <span className="text-slate-500 font-bold">{plan.period}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">{plan.desc}</p>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map(feature => (
                  <div key={feature} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                      plan.popular ? "bg-teal-500/20 text-teal-400" : "bg-slate-800 text-slate-500"
                    )}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <a
                href={plan.href}
                onClick={plan.href === '#download' ? openModal : undefined}
                className={cn(
                  "w-full py-4 rounded-2xl font-bold text-center transition-all flex items-center justify-center gap-2",
                  plan.primary 
                    ? "bg-white text-slate-950 hover:bg-teal-500 hover:text-white" 
                    : "bg-slate-900 text-white border border-slate-800 hover:border-teal-500"
                )}
              >
                {plan.name === 'Free' && <Download size={18} />}
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
