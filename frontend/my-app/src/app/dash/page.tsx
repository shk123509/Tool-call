"use client";
import React, { useState, useEffect } from 'react';
import { Copy, Check, Zap, X, Unlock, Lock, AlertTriangle, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ApiDashboard() {
  const [mounted, setMounted] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedKey, setSelectedKey] = useState({ text: '', index: null as number | null });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);

  const keys = [
      "AIzaSyCJU5bF_wC33FNwW3bNGBgJaVzTWBEsF2Q",

    "AIzaSyDbpUKdgcM2nQbU5cGbYPN9QzbFg6F4yco",

    "AIzaSyDwCn97XhfsAJZ9iyIVj5hee_3xR_b986o",

    "AIzaSyAX8DsK4ybbrPgnJnqdFKxwFVQV1x_LZLc",

    "AIzaSyB9It7xCrJxN3ymU22_bCuU9V76BGW209c",

    "AIzaSyCJK9sgvGfalkJbWPSLsR4HwPv27g9y2sA",

    "AIzaSyDe2u6jCn2Iv5kRnp_B7GOLYoroKwMAV-w",

    "AIzaSyCZ_P0hB2E9pP3cVBYVfAW-6SNPHsiD5Sk",
  ];

  const handleInitialClick = (text: string, index: number) => {
    setSelectedKey({ text, index });
    setIsPaid(false);
    setShowPayModal(true);
    setShowQR(false);
    setShowConfirm(false);
  };

  const finalCopyToClipboard = () => {
    navigator.clipboard.writeText(selectedKey.text);
    setCopiedIndex(selectedKey.index);
    setShowPayModal(false);
    setTimeout(() => setCopiedIndex(null), 3000);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 p-6 md:p-12 pt-32 font-sans selection:bg-indigo-500/30">
      
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* --- MODAL SYSTEM --- */}
      <AnimatePresence>
        {showPayModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowPayModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-[#0f172a] border border-white/10 rounded-[3rem] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {!showQR && !showConfirm && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-indigo-500/10 text-indigo-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-indigo-500/20 shadow-inner">
                    <Lock size={36} />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-2 tracking-tighter">Secure Key</h2>
                  <p className="text-slate-400 mb-8 text-sm font-medium">To maintain our servers, a small fee of <span className="text-indigo-400 font-black italic">₹5</span> is charged per key.</p>
                  <button 
                    onClick={() => setShowQR(true)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/20"
                  >
                    Proceed to Payment <ArrowRight size={18}/>
                  </button>
                </div>
              )}

              {showQR && !showConfirm && (
                <div className="text-center">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Merchant: JobAI Vault</span>
                    <X className="cursor-pointer text-slate-500 hover:text-white" onClick={() => setShowPayModal(false)} />
                  </div>
                  
                  <div className="bg-white p-4 rounded-[2rem] mb-8 inline-block shadow-2xl scale-110">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=9534439956@ybl&pn=JobAI&am=5&cu=INR`} 
                      alt="QR" className="w-32 h-32"
                    />
                  </div>

                  <div className="bg-black/40 p-5 rounded-2xl border border-white/5 mb-8 text-left space-y-3">
                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-tighter">UPI ID: <span className="text-indigo-400">9534439956@ybl</span></div>
                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-tighter">Amount: <span className="text-emerald-400 font-black">₹5.00 INR</span></div>
                  </div>

                  <label className="flex items-center gap-4 bg-indigo-500/5 p-5 rounded-2xl border border-indigo-500/10 mb-8 cursor-pointer group text-left transition-all hover:bg-indigo-500/10">
                    <input 
                      type="checkbox" checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)}
                      className="w-5 h-5 accent-emerald-500 rounded-md"
                    />
                    <span className="text-[11px] font-bold text-slate-400 leading-snug group-hover:text-slate-200">
                      I confirm that I have sent ₹5. Unlocking without payment leads to a ban.
                    </span>
                  </label>

                  <button 
                    onClick={() => isPaid && setShowConfirm(true)}
                    disabled={!isPaid}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
                      isPaid ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Confirm & Unlock
                  </button>
                </div>
              )}

              {showConfirm && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20 animate-pulse">
                    <AlertTriangle size={40} />
                  </div>
                  <h2 className="text-2xl font-black text-white mb-3 uppercase italic tracking-tighter">Final Warning</h2>
                  <p className="text-slate-400 mb-10 text-sm font-medium leading-relaxed">
                    Our system checks UPI transactions every 5 minutes. Fraudulent attempts result in <span className="text-red-500 font-black underline">Permanent Hardware Ban.</span>
                  </p>
                  
                  <div className="space-y-4">
                    <button 
                      onClick={finalCopyToClipboard}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-red-600/30"
                    >
                      I Have Paid, Get Key
                    </button>
                    <button onClick={() => setShowConfirm(false)} className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all">Cancel Request</button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- DASHBOARD UI --- */}
      <header className="max-w-6xl mx-auto mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
          <ShieldCheck size={12}/> Secure API Infrastructure
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
          Vault <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 italic">Access.</span>
        </h1>
        <p className="text-slate-500 mt-6 font-bold text-lg max-w-xl">
          Get Enterprise-grade Gemini 2.0 Flash keys. Stable, fast, and pre-configured for JobAI Nodes.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 pb-20">
        {keys.map((key, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -5 }}
            className="bg-[#0f172a]/60 backdrop-blur-sm border border-white/5 p-8 rounded-[3rem] relative group overflow-hidden transition-all hover:border-indigo-500/50 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.2)]"
          >
            <div className="flex justify-between items-start mb-10">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-600/10 text-indigo-500 rounded-2xl border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Zap size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Key Interface</p>
                    <p className="text-sm font-black text-white italic">Gemini_Node_{index+1}</p>
                  </div>
               </div>
               <div className="flex items-center gap-1.5 text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-tighter">
                  <Activity size={10}/> Active
               </div>
            </div>
            
            <div className="relative pt-4">
              <div className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-6 font-mono text-[10px] text-slate-600 blur-[3px] select-none group-hover:text-slate-500 transition-all">
                {key.substring(0, 12)}••••••••••••••••••••••
              </div>
              <button 
                onClick={() => handleInitialClick(key, index)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-4 rounded-2xl transition-all shadow-xl ${
                  copiedIndex === index ? 'bg-emerald-500 text-white scale-110' : 'bg-indigo-600 text-white hover:bg-white hover:text-black'
                }`}
              >
                {copiedIndex === index ? <Check size={20} strokeWidth={3} /> : <Copy size={20} strokeWidth={3} />}
              </button>
            </div>

            {/* Subtle Progress Bar Decoration */}
            <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 2 }} className="h-full bg-indigo-500/30" />
            </div>
          </motion.div>
        ))}
      </main>
    </div>
  );
}