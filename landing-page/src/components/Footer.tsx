'use client';

import React from 'react';
import { MapPin, ExternalLink, Mail, Link, Share2 } from 'lucide-react';

const LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'How It Works', href: '#how-it-works' },
  ],
  Resources: [
    { label: 'How to use', href: '#' },
    { label: 'What is new', href: '#' },
    { label: 'API access', href: '#' },
  ],
  Company: [
    { label: 'Main Website', href: 'https://www.saasquatchleads.com/', external: true },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="text-teal-500" size={24} strokeWidth={2.5} />
              <span className="text-2xl font-black">
                Map<span className="text-teal-500">Leads</span> Pro
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-8">
              The easiest way to get business leads from Google Maps. Built for sales teams and small business owners.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white transition-all">
                <Link size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-500 hover:text-white transition-all">
                <Share2 size={18} />
              </a>
              <a href="mailto:support@saasquatchleads.com" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-red-500 hover:text-white transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-bold mb-6">{title}</h4>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item.label}>
                    <a 
                      href={item.href} 
                      target={item.external ? '_blank' : undefined}
                      className="text-slate-500 hover:text-teal-400 transition-colors text-sm flex items-center gap-1"
                    >
                      {item.label}
                      {item.external && <ExternalLink size={12} />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-600 uppercase tracking-widest">
          <div>© 2026 MapLeads Pro. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span>Helping you find more customers.</span>
            <div className="w-1 h-1 rounded-full bg-slate-800" />
            <span className="text-teal-500/50">Built for Growth</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
