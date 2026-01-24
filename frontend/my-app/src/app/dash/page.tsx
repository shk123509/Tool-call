"use client";

import React, { useState, useEffect } from "react";
import {
  Copy,
  Check,
  Zap,
  X,
  Lock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SelectedKey = {
  text: string;
  index: number | null;
};

export default function ApiDashboard() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [showPayModal, setShowPayModal] = useState<boolean>(false);
  const [showQR, setShowQR] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<SelectedKey>({
    text: "",
    index: null,
  });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const keys: string[] = [
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
    if (!selectedKey.text) return;
    navigator.clipboard.writeText(selectedKey.text);
    setCopiedIndex(selectedKey.index);
    setShowPayModal(false);
    setTimeout(() => setCopiedIndex(null), 3000);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 p-6 md:p-12 pt-32 font-sans selection:bg-indigo-500/30">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showPayModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPayModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-[#0f172a] border border-white/10 rounded-[3rem] p-8 shadow-2xl"
            >
              {!showQR && !showConfirm && (
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                    <Lock size={36} />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-2">
                    Secure Key
                  </h2>
                  <p className="text-slate-400 mb-8 text-sm font-medium">
                    ₹5 one-time fee to maintain servers.
                  </p>
                  <button
                    onClick={() => setShowQR(true)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 py-5 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-3"
                  >
                    Proceed to Payment <ArrowRight size={18} />
                  </button>
                </div>
              )}

              {showQR && !showConfirm && (
                <div className="text-center">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black uppercase text-indigo-400">
                      JobAI Vault
                    </span>
                    <X
                      className="cursor-pointer text-slate-500 hover:text-white"
                      onClick={() => setShowPayModal(false)}
                    />
                  </div>

                  <div className="bg-white p-4 rounded-2xl mb-6 inline-block">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=9534439956@ybl&pn=JobAI&am=5&cu=INR"
                      alt="QR"
                      className="w-32 h-32"
                    />
                  </div>

                  <label className="flex items-center gap-3 mb-6 text-left text-xs text-slate-400">
                    <input
                      type="checkbox"
                      checked={isPaid}
                      onChange={(e) => setIsPaid(e.target.checked)}
                      className="accent-emerald-500"
                    />
                    I confirm payment of ₹5
                  </label>

                  <button
                    onClick={() => isPaid && setShowConfirm(true)}
                    disabled={!isPaid}
                    className={`w-full py-5 rounded-2xl font-black uppercase text-xs ${
                      isPaid
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    Confirm & Unlock
                  </button>
                </div>
              )}

              {showConfirm && (
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <AlertTriangle size={40} />
                  </div>
                  <h2 className="text-xl font-black text-white mb-6">
                    Final Warning
                  </h2>
                  <button
                    onClick={finalCopyToClipboard}
                    className="w-full bg-red-600 hover:bg-red-700 py-5 rounded-2xl font-black uppercase text-xs text-white"
                  >
                    I Have Paid, Get Key
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="max-w-6xl mx-auto mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase mb-6">
          <ShieldCheck size={12} /> Secure API Infrastructure
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter">
          Vault{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 italic">
            Access
          </span>
        </h1>
      </header>

      {/* KEYS */}
      <main className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {keys.map((key, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-[#0f172a]/60 border border-white/5 p-8 rounded-[3rem]"
          >
            <div className="flex justify-between mb-8">
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-indigo-600/10 text-indigo-500 rounded-2xl flex items-center justify-center">
                  <Zap size={22} />
                </div>
                <div>
                  <p className="text-xs font-black text-white">
                    Gemini_Node_{index + 1}
                  </p>
                </div>
              </div>
              <div className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                <Activity size={12} /> Active
              </div>
            </div>

            <div className="relative">
              <div className="bg-black/40 rounded-2xl px-5 py-6 font-mono text-xs text-slate-500 blur-[3px]">
                {key.slice(0, 12)}••••••••••••••
              </div>
              <button
                onClick={() => handleInitialClick(key, index)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-4 rounded-xl bg-indigo-600 text-white"
              >
                {copiedIndex === index ? (
                  <Check size={20} />
                ) : (
                  <Copy size={20} />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </main>
    </div>
  );
}
