"use client";
import React, { useState, useEffect } from 'react';
import { Copy, Check, Zap, X, Unlock, Lock, AlertTriangle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ApiDashboard() {
  const [mounted, setMounted] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // Naya confirmation state
  const [selectedKey, setSelectedKey] = useState({ text: '', index: null as number | null });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);

  const keys = [
    "AIzaSyD1CxzeGBG7UATbZxKEfpgZdDbO3P_e2rk",
    "AIzaSyBFrBEokEjT7Wx_npl78qq3SUywzM3cYf8",
    "AIzaSyADWXPpLY9uYDfZZK6VEC4jwytzGiuxXW4",
    "AIzaSyD3er1K4VN8UR_0jGif5YNxIlBaz3ChyCk",
    "AIzaSyDx0JPov-rD2COIdZ5FHkwUzc8_oJ0Faho",
    "AIzaSyBY_imDZ4pIAkoeWOarxjUoex07jGFHfgU",
    "AIzaSyCWoyPVzcuc9ffxxuEs0LkJPE7VJv9Boe8",
    "AIzaSyBw_vFuJk8snFw0HzsYI0WFQw1KOKY0Fhw",
    "AIzaSyCdWzYdUZV3SX_E8TqfJxRgKU18fuc4D6c",
    "AIzaSyA_f-sqji1SEop7CdKAsT41A7y2ZQ8-pNM",
    "AIzaSyBQd69ndv1EsPSv1Ex-wyCf122yOEj0L2o",
    "AIzaSyA8BmICmM5vq6PTiuzKp1wW9-U5vBIf6kU",
    "AIzaSyD3_vLWrsk9pv0-kDF9H4AjED8C-CZQx6A",
    "AIzaSyDgy11klXUf9KOg7uhP9p5j1tTeEOMedHQ",
    "AIzaSyDgy11klXUf9KOg7uhP9p5j1tTeEOMedHQ",
    "AIzaSyB6PqgYMComHqFsULyZSm7c-EmxtomwTNw",
    "AIzaSyDE0lEOyM3Psk1qX9qndyMvs482CTK5o9o",
    "AIzaSyDv_HQMcN-2uBzaFdnQkhZgqYvCp8A8e2o",
  ];

  const handleInitialClick = (text: string, index: number) => {
    setSelectedKey({ text, index });
    setIsPaid(false);
    setShowPayModal(true);
    setShowQR(false);
    setShowConfirm(false);
  };

  const finalCopyToClipboard = () => {
    const textToCopy = selectedKey.text;
    const indexToSet = selectedKey.index;

    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopiedIndex(indexToSet);
        setShowPayModal(false);
        setTimeout(() => setCopiedIndex(null), 3000);
      }
    } catch (err) {
      alert("Copy failed.");
    } finally {
      document.body.removeChild(textArea);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-200 p-4 md:p-12 pt-24 font-sans">
      
      {/* --- MODAL SYSTEM --- */}
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
              className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
            >
              {/* 1. INITIAL VIEW */}
              {!showQR && !showConfirm && (
                <div className="text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/20">
                    <Lock size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Unlock Key</h2>
                  <p className="text-slate-400 mb-8 text-sm">One-time payment of <span className="text-indigo-400 font-bold">₹5</span> is required.</p>
                  <button 
                    onClick={() => setShowQR(true)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    Continue to Pay <ArrowRight size={18}/>
                  </button>
                </div>
              )}

              {/* 2. QR SCANNER VIEW */}
              {showQR && !showConfirm && (
                <div className="text-center animate-in slide-in-from-right duration-300">
                  <div className="flex justify-between items-center mb-6 text-xs font-black uppercase tracking-widest text-indigo-400">
                    <span>Payment Gateway</span>
                    <X className="cursor-pointer text-slate-500" onClick={() => setShowPayModal(false)} />
                  </div>
                  
                  <div className="bg-white p-3 rounded-2xl mb-6 inline-block shadow-xl">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=9534439956@ybl&pn=JobAI&am=5&cu=INR`} 
                      alt="QR" className="w-36 h-36"
                    />
                  </div>

                  <div className="bg-black/40 p-4 rounded-2xl border border-white/5 mb-6 text-left space-y-2 text-[11px]">
                    <div className="flex justify-between text-slate-500">UPI ID: <span className="text-indigo-300">9534439956@ybl</span></div>
                    <div className="flex justify-between text-slate-500">Amount: <span className="text-white font-bold">₹5.00</span></div>
                  </div>

                  <label className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 mb-6 cursor-pointer group text-left">
                    <input 
                      type="checkbox" checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)}
                      className="w-5 h-5 accent-emerald-500 shrink-0"
                    />
                    <span className="text-[11px] text-slate-400 leading-tight group-hover:text-slate-200">
                      I have successfully paid ₹5 using the QR code above.
                    </span>
                  </label>

                  <button 
                    onClick={() => isPaid && setShowConfirm(true)}
                    disabled={!isPaid}
                    className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                      isPaid ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Unlock & Copy
                  </button>
                </div>
              )}

              {/* 3. DANGER / FINAL CONFIRMATION VIEW */}
              {showConfirm && (
                <div className="text-center animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                    <AlertTriangle size={32} />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2 tracking-tight">Are you sure?</h2>
                  <p className="text-slate-400 mb-8 text-sm leading-relaxed px-2">
                    Accessing the key without payment is a violation of our terms. If the payment is not found, your account may be <span className="text-red-500 font-bold">permanently banned.</span>
                  </p>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={finalCopyToClipboard}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                    >
                      Yes, I have paid. Unlock Now
                    </button>
                    <button 
                      onClick={() => setShowConfirm(false)}
                      className="w-full bg-transparent text-slate-500 py-3 text-xs font-bold hover:text-white transition-colors"
                    >
                      Wait, let me check again
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- DASHBOARD UI --- */}
      <header className="max-w-6xl mx-auto mb-12">
        <h1 className="text-5xl font-black text-white tracking-tighter">API <span className="text-indigo-500">Vault</span></h1>
        <p className="text-slate-500 mt-2 font-medium">Enterprise keys for high-performance apps.</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {keys.map((key, index) => (
          <div key={index} className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2.5rem] relative group">
            <div className="flex justify-between items-center mb-6">
               <div className="p-2.5 bg-indigo-600/10 text-indigo-500 rounded-xl border border-indigo-500/20"><Zap size={20}/></div>
               <span className="text-[10px] text-slate-500 font-black tracking-widest uppercase">Key #{index+1}</span>
            </div>
            
            <div className="relative">
              <div className="w-full bg-black/60 border border-slate-800 rounded-2xl px-4 py-5 font-mono text-xs text-slate-600 blur-[2px] select-none">
                {key.substring(0, 10)}****************
              </div>
              <button 
                onClick={() => handleInitialClick(key, index)}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-3.5 rounded-xl transition-all ${
                  copiedIndex === index ? 'bg-emerald-500 text-white' : 'bg-indigo-600 hover:bg-indigo-500'
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