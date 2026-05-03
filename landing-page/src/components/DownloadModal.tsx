'use client';

import React, { useEffect, useState } from 'react';
import { Download, X, Globe, ShieldCheck, FileSpreadsheet, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INSTALL_STEPS = [
  { text: 'Open chrome://extensions/ in your browser', icon: <Globe size={20}/> },
  { text: 'Turn on Developer Mode at the top right', icon: <ShieldCheck size={20}/> },
  { text: 'Click on Load unpacked', icon: <FileSpreadsheet size={20}/> },
  { text: 'Select the extension folder', icon: <LayoutGrid size={20}/> },
];

export default function DownloadModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    document.getElementById('download-modal')?.addEventListener('open', handleOpen);
    return () => document.getElementById('download-modal')?.removeEventListener('open', handleOpen);
  }, []);

  return (
    <div id="download-modal">
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-3xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 mb-8">
                  <Download size={40} />
                </div>
                
                <h3 className="text-3xl font-black mb-4">Install MapLeads Pro</h3>
                <p className="text-slate-400 mb-10 leading-relaxed">
                  Follow these 4 quick steps to start using the extension.
                </p>

                <div className="w-full space-y-4 mb-10">
                  {INSTALL_STEPS.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-slate-950 border border-slate-800 rounded-2xl text-left group hover:border-teal-500/30 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-all">
                        {step.icon}
                      </div>
                      <span className="text-sm font-bold text-slate-300">{step.text}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-5 bg-linear-to-r from-teal-500 to-blue-600 rounded-2xl font-black text-white text-lg shadow-xl shadow-teal-500/20"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
