"use client";
import React from 'react';
import Link from 'next/link';
import { Cookie, Info, ShieldCheck, Settings, Database, MousePointer2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CookiesPolicy() {
  const lastUpdated = "January 22, 2026";

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-indigo-500/30">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-indigo-600/5 blur-[100px] rounded-full" />
      </div>

      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-black/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-black tracking-tighter text-white">
            Job<span className="text-indigo-500">AI</span>
          </Link>
          <Link href="/terms" className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-[0.2em] transition">Terms</Link>
        </div>
      </nav>

      <main className="relative max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* Header Section */}
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Cookie size={14} /> Cookie Transparency
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Cookie <span className="text-indigo-500">Policy</span>
          </h1>
          <p className="text-slate-500 font-medium italic">How we use digital identifiers to improve your experience. Last updated: {lastUpdated}</p>
        </header>

        {/* Content Section */}
        <div className="space-y-12">
          
          <section className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Info size={80} className="text-indigo-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">What are Cookies?</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site. At JobAI, we use them to ensure your dashboard stays logged in and your API selections are remembered.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
               <Settings className="text-indigo-500" size={20} /> Types of Cookies We Use
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
                <div className="w-10 h-10 bg-indigo-600/20 text-indigo-400 rounded-xl flex items-center justify-center mb-4">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="text-white font-bold mb-2 text-sm uppercase">Essential Cookies</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  These are necessary for the website to function. They handle authentication, security, and payment processing (like your ₹5 unlock status).
                </p>
              </div>

              <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
                <div className="w-10 h-10 bg-emerald-600/20 text-emerald-400 rounded-xl flex items-center justify-center mb-4">
                  <Database size={20} />
                </div>
                <h4 className="text-white font-bold mb-2 text-sm uppercase">Preference Cookies</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  These allow our platform to remember choices you make, such as your preferred theme (Dark/Light) or language settings.
                </p>
              </div>

              <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
                <div className="w-10 h-10 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center mb-4">
                  <MousePointer2 size={20} />
                </div>
                <h4 className="text-white font-bold mb-2 text-sm uppercase">Analytics Cookies</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We use these to understand how visitors interact with our dashboard, helping us fix bugs and improve the UI performance.
                </p>
              </div>

              <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
                <div className="w-10 h-10 bg-red-600/20 text-red-400 rounded-xl flex items-center justify-center mb-4">
                  <XCircle size={20} />
                </div>
                <h4 className="text-white font-bold mb-2 text-sm uppercase">Advertising Cookies</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  JobAI does <strong>not</strong> use third-party advertising cookies to track your behavior across other websites for marketing purposes.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-6">Controlling Your Cookies</h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Most web browsers allow some control of most cookies through the browser settings. You can set your browser to block all cookies or to indicate when a cookie is being set. However, please note that if you disable cookies, some parts of the JobAI dashboard (like API key management and payments) may not function correctly.
            </p>
            <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-3xl">
               <p className="text-xs text-indigo-300 font-medium">
                Tip: You can usually find these settings in the 'Options' or 'Preferences' menu of your browser (Chrome, Safari, Firefox, or Edge).
               </p>
            </div>
          </section>

          <section className="pt-10">
            <div className="bg-gradient-to-r from-slate-900 to-black border border-white/5 p-10 rounded-[3rem] text-center">
               <h3 className="text-2xl font-bold text-white mb-4">Questions about Cookies?</h3>
               <p className="text-slate-500 text-sm mb-8">If you're unsure about how we use your data, our support team is ready to help.</p>
               <Link href="mailto:hello@jobai.com" className="bg-white text-black px-10 py-4 rounded-2xl font-black text-sm hover:bg-indigo-50 transition shadow-xl shadow-white/5">
                 Email Support
               </Link>
            </div>
          </section>

        </div>

        <footer className="mt-20 pt-10 border-t border-white/5 text-center">
          <p className="text-[9px] text-slate-700 font-black uppercase tracking-[0.5em]">
            JobAI Cookie Framework • Global Compliance • 2026
          </p>
        </footer>
      </main>
    </div>
  );
}