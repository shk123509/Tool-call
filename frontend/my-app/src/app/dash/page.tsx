"use client";
import React, { useState, useEffect } from 'react';
import { Copy, Check, Zap, X, Unlock, Lock, Smartphone, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ApiDashboard() {
  const [mounted, setMounted] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [selectedKey, setSelectedKey] = useState({ text: '', index: null as number | null });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);

  const keys = [
    "AIzaSyDJhY18qU9fmciJ0f2favwK9bPPcI6_ECI",
    "AIzaSyBcbcZNDWCL_JzfU19XTd6XUesS0diC8dg",
    "AIzaSyDPDPmg_C14HjzhKeILLmcc9SQExo3spKM",
    "AIzaSyBjj2jFx0hsa105D2nIrASo5-i0Sc81JJA",
    "AIzaSyDgMzLOnYcVFwhPwsfFGMrMkR5dv3rCU68",
    "AIzaSyDECX89lge__uyPYDmGThFnnob2VmZh2HU",
    "AIzaSyDrwGUsCYBiE-3J3rVfNqJxzxc2PlLV6iQ",
    "AIzaSyCqOmwqdswNbAxz9tB8AHrl4003KTRXphY",
    "AIzaSyBaCMWsyvNV-FS98YmLXTzbiMJLKPNg_JQ",
    "AIzaSyAqzowvDI_XzzWrN021Shc8Oi3LVCMCQLo",
    "AIzaSyA0PI78sjFU-We0ryrGAoVB2LNuhxzTiaY"
  ];

  const handleInitialClick = (text: string, index: number) => {
    setSelectedKey({ text, index });
    setIsPaid(false);
    setShowPayModal(true);
    setShowQR(false);
  };

  // --- STABLE COPY LOGIC ---
  const finalCopyToClipboard = () => {
    if (!isPaid) return;

    const textToCopy = selectedKey.text;
    const indexToSet = selectedKey.index;

    // Fallback Manual Copy for Mobile
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopiedIndex(indexToSet);
        setShowPayModal(false); // Modal band hoga tabhi jab copy success ho
        setTimeout(() => setCopiedIndex(null), 3000);
      } else {
        alert("Copy failed, please try again.");
      }
    } catch (err) {
      console.error("Copy error", err);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-200 p-4 md:p-12 pt-24 font-sans">
      
      {/* --- PAYMENT MODAL --- */}
      <AnimatePresence>
        {showPayModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowPayModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
              className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl"
            >
              {!showQR ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500/10 text-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
                    <Lock size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Unlock Premium</h2>
                  <p className="text-slate-400 mb-8 text-sm">Pay <span className="text-yellow-500 font-bold">₹5</span> to access this API Key.</p>
                  <button 
                    onClick={() => setShowQR(true)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20"
                  >
                    Agree & Pay
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Scanner</span>
                    <X className="cursor-pointer text-slate-500 hover:text-white" onClick={() => setShowPayModal(false)} />
                  </div>
                  
                  <div className="bg-white p-3 rounded-2xl mb-6 inline-block shadow-xl">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=9534439956@ybl&pn=JobAI&am=5&cu=INR`} 
                      alt="UPI QR Code" 
                      className="w-36 h-36"
                    />
                  </div>

                  <div className="bg-black/40 p-4 rounded-2xl border border-white/5 mb-6 text-left space-y-2">
                    <div className="flex justify-between text-xs"><span className="text-slate-500">UPI ID:</span> <span className="text-indigo-300 font-mono">9534439956@ybl</span></div>
                    <div className="flex justify-between text-xs"><span className="text-slate-500">Phone:</span> <span className="text-indigo-300 font-mono">+91 9534439956</span></div>
                  </div>

                  <label className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 mb-6 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={isPaid} 
                      onChange={(e) => setIsPaid(e.target.checked)}
                      className="w-5 h-5 accent-emerald-500 cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-400 text-left group-hover:text-slate-200 transition-colors leading-tight">
                      Maine ₹5 pay kar diye hain, ab key unlock karein.
                    </span>
                  </label>

                  <button 
                    onClick={finalCopyToClipboard}
                    className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                      isPaid 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 active:scale-95' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                    }`}
                  >
                    {isPaid ? <Unlock size={18} /> : <Lock size={18} />}
                    Unlock & Copy
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- DASHBOARD GRID --- */}
      <header className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">API <span className="text-indigo-500">Vault</span></h1>
        <p className="text-slate-500 mt-2 font-medium">Unlock enterprise-grade keys for your projects.</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {keys.map((key, index) => (
          <div key={index} className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2.5rem] relative group overflow-hidden">
            <div className="flex justify-between items-center mb-6">
               <div className="p-2.5 bg-indigo-600/10 text-indigo-500 rounded-xl border border-indigo-500/20"><Zap size={20}/></div>
               <span className="text-[10px] text-slate-500 font-black tracking-widest uppercase">Key #{index+1}</span>
            </div>
            
            <div className="relative">
              <div className="w-full bg-black/60 border border-slate-800 rounded-2xl px-4 py-5 font-mono text-xs text-slate-600 blur-[3px] select-none">
                {key.substring(0, 10)}****************
              </div>
              <button 
                onClick={() => handleInitialClick(key, index)}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-3.5 rounded-xl transition-all shadow-2xl ${
                  copiedIndex === index ? 'bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-500 active:scale-90'
                }`}
              >
                {copiedIndex === index ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}