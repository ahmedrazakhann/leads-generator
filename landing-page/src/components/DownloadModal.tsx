'use client';

import React, { useEffect, useState } from 'react';
import { Download, X, Globe, ShieldCheck, FileSpreadsheet, LayoutGrid, CheckCircle2, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INSTALL_STEPS = [
  { 
    title: 'Access Extensions',
    text: 'Open chrome://extensions/ in your browser', 
    icon: <Globe size={22}/>,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    title: 'Developer Mode',
    text: 'Turn on Developer Mode at the top right', 
    icon: <ShieldCheck size={22}/>,
    color: 'from-purple-500 to-pink-500'
  },
  { 
    title: 'Load Unpacked',
    text: 'Click on "Load unpacked" button', 
    icon: <FileSpreadsheet size={22}/>,
    color: 'from-orange-500 to-amber-500'
  },
  { 
    title: 'Select Folder',
    text: 'Select the extracted extension folder', 
    icon: <LayoutGrid size={22}/>,
    color: 'from-emerald-500 to-teal-500'
  },
];

export default function DownloadModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/saasquatch-pro.zip';
    link.download = 'saasquatch-pro.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      // Auto-trigger download when modal opens from external button
      handleDownload();
    };
    document.getElementById('download-modal')?.addEventListener('open', handleOpen);
    return () => document.getElementById('download-modal')?.removeEventListener('open', handleOpen);
  }, []);

  return (
    <div id="download-modal">
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-slate-900/80 border border-slate-800/50 rounded-[40px] shadow-xl shadow-black/20 overflow-hidden backdrop-blur-2xl"
            >
              {/* Background Glows */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px]" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />

              <div className="relative p-8 md:p-12">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-slate-950/50 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all group"
                >
                  <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>

                <div className="flex flex-col items-center">
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-black uppercase tracking-widest mb-8"
                  >
                    <Lock size={12} />
                    Verified Secure Installation
                  </motion.div>

                  <div className="text-center mb-12">
                    <h3 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                      Install <span className="text-gradient">SaaSquatch</span>
                    </h3>
                    <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
                      Follow these simple steps to power up your lead generation game.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-12">
                    {INSTALL_STEPS.map((step, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.1 }}
                        className="group relative p-6 bg-slate-950/50 border border-slate-800 hover:border-slate-600 rounded-[32px] transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} p-[1px]`}>
                            <div className="w-full h-full rounded-[15px] bg-slate-950 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                              {step.icon}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-bold mb-1">{step.title}</h4>
                            <p className="text-slate-500 text-sm leading-snug group-hover:text-slate-400 transition-colors">{step.text}</p>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 text-slate-800 font-black text-2xl group-hover:text-slate-700 transition-colors">
                          0{idx + 1}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownload}
                    className="w-full py-6 btn-gradient rounded-[24px] font-black text-white text-xl shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3"
                  >
                    <Download size={24} />
                    Download Extension Now
                  </motion.button>
                  
                  <p className="mt-6 text-slate-500 text-sm font-medium">
                    Need help? <a href="#contact" className="text-teal-500 hover:underline">Contact Support</a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
