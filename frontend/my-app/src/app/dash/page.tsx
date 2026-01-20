"use client";
import React, { useState, useEffect } from 'react';
import { Copy, Check, Key, ExternalLink, ShieldCheck, Zap, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ApiDashboard() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const keys = [
    "AIzaSyDJhY18qU9fmciJ0f2favwK9bPPcI6_ECI",
    "AIzaSyBcbcZNDWCL_JzfU19XTd6XUesS0diC8dg",
    "AIzaSyDPDPmg_C14HjzhKeILLmcc9SQExo3spKM",
    "AIzaSyBjj2jFx0hsa105D2nIrASo5-i0Sc81JJA",
    "AIzaSyDgMzLOnYcVFwhPwsfFGMrMkR5dv3rCU68",
    "AIzaSyDECX89lge__uyPYDmGThFnnob2VmZh2HU",
    "AIzaSyDrwGUsCYBiE-3J3rVfNqJxzxc2PlLV6iQ",
   " AIzaSyCqOmwqdswNbAxz9tB8AHrl4003KTRXphY",
    "AIzaSyBaCMWsyvNV-FS98YmLXTzbiMJLKPNg_JQ",
    "AIzaSyAqzowvDI_XzzWrN021Shc8Oi3LVCMCQLo",
    "AIzaSyA0PI78sjFU-We0ryrGAoVB2LNuhxzTiaY"
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-200 font-sans p-6 md:p-12">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-10 text-center md:text-left">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4"
        >
          <ShieldCheck size={14} /> Gemini Developer Portal
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          API Key <span className="text-indigo-500">Inventory</span>
        </h1>
        <p className="text-slate-400 mt-3 text-lg">Instant access to high-performance AI models.</p>
      </header>

      {/* Grid */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {keys.map((key, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-slate-900/50 border border-slate-800 p-6 rounded-3xl hover:border-indigo-500/50 hover:bg-slate-900 transition-all duration-300 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
                    <Zap size={20} className="text-white" />
                  </div>
                  <span className="text-[10px] font-black text-slate-500 bg-slate-800 px-2 py-1 rounded-lg uppercase tracking-tighter">
                    Active Token #{index + 1}
                  </span>
                </div>

                <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-widest">
                  Key Hash
                </label>
                
                <div className="relative group/input">
                  <div className="w-full bg-black/40 border border-slate-700 rounded-2xl px-4 py-4 font-mono text-[13px] text-indigo-300 transition-all group-hover/input:border-indigo-500/30">
                    {key.substring(0, 12)}••••••••
                  </div>
                  <button 
                    onClick={() => copyToClipboard(key, index)}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all shadow-xl ${
                      copiedIndex === index 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
                    }`}
                  >
                    {copiedIndex === index ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      {/* Footer Link Section */}
      <footer className="max-w-6xl mx-auto mt-20 text-center">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="inline-block p-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          <div className="bg-[#0b0f1a] rounded-[22px] px-8 py-10 border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-2">Need more API keys?</h3>
            <p className="text-slate-400 mb-6">You can generate your own custom keys directly from the official Google AI Studio.</p>
            
            <a 
              href="https://aistudio.google.com/welcome?utm_source=PMAX&utm_medium=display&utm_campaign=Cloud-SS-DR-AIS-FY26-global-pmax-1713578&utm_content=pmax&gad_source=1&gad_campaignid=23417432327&gbraid=0AAAAACn9t66gzOrqQvHvrsDs1UJHLEy_Y&gclid=CjwKCAiA7LzLBhAgEiwAjMWzCC8SxoWsEgTZ2Fp_9SqaFYX8Ua_hdVQXtQFR1nIJjo5NhhRM_CpYeRoC9KoQAvD_BwE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-2xl"
            >
              Get More Keys <ExternalLink size={18} />
            </a>
          </div>
        </motion.div>
        
        <p className="mt-12 text-slate-600 text-[10px] uppercase font-bold tracking-[0.2em]">
          Gemini Key Management System • 2026
        </p>
      </footer>
    </div>
  );
}