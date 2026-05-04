'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, AlertCircle, Clock, MessageSquare, TrendingUp } from 'lucide-react';

const PAIN_POINTS = [
  { icon: <Clock className="text-red-400" />, text: "Wasting hours collecting data manually" },
  { icon: <AlertCircle className="text-red-400" />, text: "Not knowing which leads to prioritize" },
  { icon: <MessageSquare className="text-red-400" />, text: "Struggling to find the right thing to say" },
];

const SOLUTIONS = [
  { icon: <CheckCircle2 className="text-teal-400" />, text: "Identify high-value leads in seconds" },
  { icon: <TrendingUp className="text-teal-400" />, text: "See exactly what each business is missing" },
  { icon: <MessageSquare className="text-teal-400" />, text: "Get personalized, ready-to-use call scripts" },
];

export default function ProblemSolution() {
  return (
    <section className="py-24 bg-[#020617] border-y border-slate-900/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Problem Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="inline-block px-4 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-widest mb-4">
                The Struggle
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                Most Salespeople Waste <span className="text-red-500">80% of Their Time</span> on the Wrong Leads
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Collecting names and numbers is easy. Knowing who is actually ready to buy—and why—is the hard part.
              </p>
            </div>

            <div className="space-y-4">
              {PAIN_POINTS.map((point, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50">
                  <div className="flex-shrink-0">{point.icon}</div>
                  <span className="text-slate-300 font-bold">{point.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Solution Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-teal-500/5 blur-[100px] pointer-events-none" />
            <div className="relative glass-card p-8 md:p-12 rounded-[40px] border-teal-500/20">
              <div className="inline-block px-4 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-black uppercase tracking-widest mb-6">
                The Solution
              </div>
              <h3 className="text-3xl font-black mb-8 leading-tight">
                Stop Scraping. <br />
                <span className="text-gradient">Start Executing.</span>
              </h3>
              
              <div className="space-y-6">
                {SOLUTIONS.map((solution, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1">{solution.icon}</div>
                    <p className="text-slate-200 font-bold text-lg">{solution.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-3xl bg-teal-500/5 border border-teal-500/10 italic text-slate-400 text-sm">
                "Our tool doesn’t just give you leads—it tells you what’s wrong with the business, what service to offer, and exactly what to say."
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
