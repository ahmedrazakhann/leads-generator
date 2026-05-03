'use client';

import React, { useState } from 'react';
import { Mail, ExternalLink, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section className="py-24 bg-[#020617]" id="contact">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16">
          
          <div className="flex flex-col justify-center">
            <div className="inline-block w-fit px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              Contact
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              Get in <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-md">
              Have a question or need help? Send us a message and we will get back to you soon.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-500">
                  <Mail size={20}/>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-100">Email Us</div>
                  <a href="mailto:support@saasquatchleads.com" className="text-slate-400 hover:text-teal-400 transition-colors">
                    support@saasquatchleads.com
                  </a>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500">
                  <ExternalLink size={20}/>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-100">LinkedIn</div>
                  <a href="https://www.linkedin.com/company/saasquatchleads/" className="text-slate-400 hover:text-blue-400 transition-colors">
                    linkedin.com/company/saasquatchleads
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-purple-500">
                  <MapPin size={20}/>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-100">Office</div>
                  <span className="text-slate-400">Glendale, California</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div 
                    key="sent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <CheckCircle2 size={64} className="text-green-500 mb-6" />
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-slate-400">We will get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    exit={{ opacity: 0, scale: 0.9 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">First Name</label>
                        <input type="text" required placeholder="John" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-slate-200 outline-none focus:border-teal-500/50 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Last Name</label>
                        <input type="text" required placeholder="Doe" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-slate-200 outline-none focus:border-teal-500/50 transition-colors" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                      <input type="email" required placeholder="john@company.com" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-slate-200 outline-none focus:border-teal-500/50 transition-colors" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Message</label>
                      <textarea rows={4} required placeholder="How can we help?" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-slate-200 outline-none focus:border-teal-500/50 transition-colors resize-none" />
                    </div>

                    <button 
                      type="submit" 
                      disabled={status === 'sending'}
                      className="w-full py-5 bg-linear-to-r from-teal-500 to-blue-600 rounded-2xl font-black text-white text-lg shadow-xl shadow-teal-500/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                      {status === 'sending' ? 'Sending...' : <><Send size={20}/> Send Message</>}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
