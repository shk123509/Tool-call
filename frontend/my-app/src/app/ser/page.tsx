"use client";
import React from 'react';
import Link from 'next/link';
import { Scale, AlertCircle, FileText, Ban, CreditCard, RefreshCw, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  const lastUpdated = "January 22, 2026";

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans">
      {/* Dark Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-black/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-black tracking-tighter text-white">
            Job<span className="text-indigo-500">AI</span>
          </Link>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest">Privacy</Link>
            <Link href="/" className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Home</Link>
          </div>
        </div>
      </nav>

      <main className="relative max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* Header Section */}
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Scale size={14} /> Legal Agreement
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
            Terms of <span className="text-indigo-500">Service</span>
          </h1>
          <p className="text-slate-500">Please read these terms carefully before using JobAI. <br/>Updated on {lastUpdated}</p>
        </header>

        {/* Warning Box */}
        <div className="mb-16 p-6 bg-amber-500/5 border border-amber-500/20 rounded-3xl flex gap-4 items-start">
          <AlertCircle className="text-amber-500 shrink-0 mt-1" size={20} />
          <p className="text-sm text-amber-200/80 leading-relaxed">
            By accessing JobAI, you confirm that you are at least 18 years old and agree to be bound by these Terms. If you are using our services on behalf of a company, you represent that you have the authority to bind that entity.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          
          <section>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <FileText className="text-indigo-500" size={20} /> 1. Use of Services
            </h2>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>JobAI provides a platform to manage, generate, and purchase access to AI API keys. You are granted a non-exclusive, non-transferable right to use the services strictly in accordance with these terms.</p>
              <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <CreditCard className="text-emerald-500" size={20} /> 2. Payments and Refunds
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
              <div>
                <h4 className="text-white font-bold mb-2">Micro-Transactions (₹5 Unlock)</h4>
                <p className="text-sm">Payments made to unlock individual API keys are processed via UPI or third-party gateways. These are one-time fees for immediate access.</p>
              </div>
              <div className="pt-4 border-t border-white/5">
                <h4 className="text-red-400 font-bold mb-2 uppercase text-xs tracking-widest">No-Refund Policy</h4>
                <p className="text-sm text-slate-400 italic">Due to the digital nature of API keys and immediate delivery, all payments are final. Refunds will not be issued once a key has been unlocked or copied.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Ban className="text-red-500" size={20} /> 3. Prohibited Conduct
            </h2>
            <p className="mb-6 text-sm">Users are strictly prohibited from:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Reverse engineering the JobAI platform",
                "Using API keys for illegal activities",
                "Sharing 'Pro' keys on public forums",
                "Spamming our API infrastructure",
                "Automated scraping of our dashboard",
                "Misleading others about payment status"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-red-500/5 px-4 py-3 rounded-xl border border-red-500/10 text-xs text-red-200/70">
                   <CheckCircle2 size={12} className="text-red-500" /> {item}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <RefreshCw className="text-blue-500" size={20} /> 4. Service Availability & Modifications
            </h2>
            <p className="text-sm leading-relaxed">
              We strive for 99.9% uptime, but we do not guarantee that the service will be uninterrupted. We reserve the right to modify, suspend, or discontinue any part of the service (including API keys) at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Scale className="text-slate-400" size={20} /> 5. Limitation of Liability
            </h2>
            <p className="text-sm leading-relaxed p-6 bg-slate-900/50 rounded-2xl border border-slate-800 italic">
              "To the maximum extent permitted by law, JobAI shall not be liable for any indirect, incidental, or consequential damages resulting from your use or inability to use the service, even if we have been advised of the possibility of such damages."
            </p>
          </section>

          <section className="pt-10">
            <div className="p-8 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] text-center shadow-2xl shadow-indigo-500/20">
              <h3 className="text-2xl font-black text-white mb-4">Questions about these terms?</h3>
              <p className="text-indigo-100 mb-8 text-sm">Our legal team is here to help you understand your rights.</p>
              <Link href="mailto:legal@jobai.com" className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-2xl font-bold hover:bg-slate-100 transition active:scale-95">
                Contact Legal Dept
              </Link>
            </div>
          </section>

        </div>

        <footer className="mt-20 pt-10 border-t border-white/5 text-center">
          <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.4em]">
            JobAI Governance • Secure Infrastructure • 2026
          </p>
        </footer>
      </main>
    </div>
  );
}