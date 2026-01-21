"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Check, Zap, ArrowRight, X, Lock, Unlock, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  // Special Pro Key jo pay karne ke baad milegi
  const PRO_API_KEY = "AIzaSyCwo23aTs5d8AD_60Q-LP_44LSoiPlPoF8";

  const handleProUpgrade = () => {
    setIsPaid(false);
    setHasCopied(false);
    setShowPayModal(true);
  };

  const unlockAndCopy = () => {
    if (!isPaid) return;

    // Stable Copy Logic
    const textArea = document.createElement("textarea");
    textArea.value = PRO_API_KEY;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setHasCopied(true);
      setTimeout(() => {
        setShowPayModal(false);
      }, 2000);
    } catch (err) {
      alert("Copy failed!");
    }
    document.body.removeChild(textArea);
  };

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for hobbyists and students starting out.",
      features: ["Up to 5 Projects", "Basic Analytics", "Community Support", "1GB Storage"],
      buttonText: "Get Started",
      isPopular: false,
      isPro: false,
      href: "/dash",
    },
    {
      name: "Pro",
      price: isAnnual ? "19" : "29",
      description: "Best for professional developers and freelancers.",
      features: ["Unlimited Projects", "Advanced AI Models", "Priority Support", "20GB Storage", "Custom Domains"],
      buttonText: "Upgrade to Pro",
      isPopular: true,
      isPro: true, // Ispe payment modal khulega
      href: "#",
    },
    {
      name: "Enterprise",
      price: "99",
      description: "Scalable solutions for large teams and companies.",
      features: ["Team Management", "Dedicated Manager", "SSO Security", "Unlimited Storage"],
      buttonText: "Contact Sales",
      isPopular: false,
      isPro: false,
      href: "https://aistudio.google.com/",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 px-4">
      
      {/* --- PAYMENT MODAL (REPEATED LOGIC) --- */}
      <AnimatePresence>
        {showPayModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPayModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
              <div className="text-center">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Upgrade to Pro</span>
                  <X className="cursor-pointer text-slate-500" onClick={() => setShowPayModal(false)} />
                </div>
                
                <div className="bg-white p-3 rounded-2xl mb-6 inline-block shadow-xl">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=9534439956@ybl&pn=JobAI&am=5&cu=INR`} alt="QR Code" className="w-32 h-32" />
                </div>

                <div className="bg-black/40 p-4 rounded-2xl border border-white/5 mb-6 text-left space-y-2">
                  <div className="flex justify-between text-xs"><span className="text-slate-500">UPI ID:</span> <span className="text-indigo-300">9534439956@ybl</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500">Amount:</span> <span className="text-white font-bold">₹5</span></div>
                </div>

                <label className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 mb-6 cursor-pointer text-left">
                  <input type="checkbox" checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)} className="w-5 h-5 accent-emerald-500" />
                  <span className="text-[11px] text-slate-400">Maine payment kar di hai, Pro Key unlock karein.</span>
                </label>

                <button 
                  onClick={unlockAndCopy}
                  disabled={!isPaid}
                  className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${isPaid ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                >
                  {hasCopied ? <><Check size={18} /> Copied!</> : <><Unlock size={18} /> Unlock Pro Key</>}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">Simple <span className="text-indigo-500">Pricing.</span></h1>
          
          <div className="mt-10 flex justify-center items-center gap-4">
            <span className="text-sm font-medium text-gray-500">Monthly</span>
            <button onClick={() => setIsAnnual(!isAnnual)} className="relative w-14 h-8 bg-indigo-600 rounded-full p-1">
              <div className={`bg-white w-6 h-6 rounded-full transition-transform ${isAnnual ? "translate-x-6" : "translate-x-0"}`} />
            </button>
            <span className="text-sm font-medium text-white">Yearly (-20%)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`relative flex flex-col p-8 bg-[#0a0a0a] rounded-[2.5rem] border transition-all hover:border-indigo-500/50 ${plan.isPopular ? "border-indigo-600 ring-1 ring-indigo-600" : "border-white/5"}`}>
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Zap size={12} fill="white" /> Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-black">${plan.price}</span>
                  <span className="ml-1 text-gray-500">/{isAnnual ? "yr" : "mo"}</span>
                </div>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm">
                    <Check className="text-indigo-500 w-4 h-4 mt-0.5" /> {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={plan.isPro ? handleProUpgrade : undefined}
                className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${plan.isPopular ? "bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/20" : "bg-white/5 hover:bg-white/10"}`}
              >
                {plan.isPro ? <><Lock size={18} /> {plan.buttonText}</> : plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;