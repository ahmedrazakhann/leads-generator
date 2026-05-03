'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#hero" className="flex items-center group">
          <img src="/images/logo_horizontal.png" alt="SaaSquatch Pro" className="h-12 w-auto" />
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.label}>
              <a 
                href={link.href} 
                className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => document.getElementById('download-modal')?.dispatchEvent(new CustomEvent('open'))}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-linear-to-r from-teal-500 to-blue-600 rounded-full hover:shadow-lg hover:shadow-teal-500/20 transition-all"
          >
            Get Extension Free
          </button>

          <button 
            className="md:hidden text-slate-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-x-0 top-[72px] bg-slate-950 border-b border-slate-800 md:hidden transition-all duration-300 overflow-hidden",
        menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <ul className="flex flex-col p-6 gap-4">
          {links.map((link) => (
            <li key={link.label}>
              <a 
                href={link.href} 
                className="text-lg font-medium text-slate-300"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-4 border-t border-slate-800">
            <button 
              onClick={() => {
                setMenuOpen(false);
                document.getElementById('download-modal')?.dispatchEvent(new CustomEvent('open'));
              }}
              className="w-full py-4 text-center font-bold bg-teal-600 rounded-xl"
            >
              Get Extension Free
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
