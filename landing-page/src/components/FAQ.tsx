'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const FAQS = [
  { q: 'Is MapLeads Pro really free?', a: 'Yes. You can use the core tool for free forever. You can scrape up to 100 leads at a time and export them to a CSV file without paying anything.' },
  { q: 'Does it work in every country?', a: 'Yes. It works on any Google Maps search anywhere in the world. Just search for what you need and start the tool.' },
  { q: 'Do I need to make an account?', a: 'No. You just install the extension and start using it. We do not ask for your email or any other personal info.' },
  { q: 'How fast is it?', a: 'It is very fast. It can find basic info like names and ratings in seconds. If you need phone numbers and websites, it takes a little longer because it has to look at each listing carefully.' },
  { q: 'Is my data safe?', a: 'Yes. All the data you find stays on your own computer. We never see your leads and we do not save them on our servers.' },
  { q: 'Can I use the data in Excel?', a: 'Yes. You can export everything to a CSV file which opens perfectly in Excel, Google Sheets, or any CRM tool.' },
  { q: 'What happens if Google Maps changes?', a: 'We keep a close eye on Google Maps. If they change how their website works, we update our tool quickly so it keeps working for you.' },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string, a: string, isOpen: boolean, onToggle: () => void }) {
  return (
    <div className={cn(
      "border-b border-slate-800 transition-all duration-300",
      isOpen ? "bg-slate-900/30" : "hover:bg-slate-900/20"
    )}>
      <button 
        className="w-full py-6 px-4 md:px-8 flex items-center justify-between text-left"
        onClick={onToggle}
      >
        <span className="text-lg font-bold text-slate-200">{q}</span>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center border border-slate-700 transition-transform duration-300",
          isOpen ? "rotate-180 bg-teal-500 border-teal-500 text-white" : "text-slate-500"
        )}>
          <ChevronDown size={18} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-8 pb-8 text-slate-400 leading-relaxed text-base">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-950/30" id="faq">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
            FAQ
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Common <span className="text-gradient">Questions</span>
          </h2>
        </div>

        <div className="border-t border-slate-800 rounded-[32px] overflow-hidden bg-slate-950 border-x border-b">
          {FAQS.map((faq, idx) => (
            <FAQItem 
              key={idx} 
              {...faq} 
              isOpen={openIdx === idx} 
              onToggle={() => setOpenIdx(openIdx === idx ? null : idx)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
