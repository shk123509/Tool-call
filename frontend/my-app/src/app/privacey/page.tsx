"use client";
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, Globe, ScrollText, ChevronRight, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  const lastUpdated = "January 22, 2026";

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-indigo-500/30">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-black/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-black tracking-tighter text-white">
            Job<span className="text-indigo-500">AI</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition">Back to Home</Link>
        </div>
      </nav>

      <main className="relative max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* Header Section */}
        <header className="mb-16 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <ShieldCheck size={14} /> Compliance & Safety
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Privacy <span className="text-indigo-500">Policy</span>
          </h1>
          <p className="text-slate-500 font-medium">Last updated: {lastUpdated}</p>
        </header>

        {/* Quick Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
            <Lock className="text-indigo-500 mb-4" size={24} />
            <h3 className="text-white font-bold mb-2">Secure Data</h3>
            <p className="text-xs text-slate-400">Bank-grade encryption for all your stored API keys and sessions.</p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
            <Eye className="text-emerald-500 mb-4" size={24} />
            <h3 className="text-white font-bold mb-2">No Tracking</h3>
            <p className="text-xs text-slate-400">We do not sell your personal data or usage habits to third parties.</p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
            <Globe className="text-blue-500 mb-4" size={24} />
            <h3 className="text-white font-bold mb-2">Transparency</h3>
            <p className="text-xs text-slate-400">Full control over your data with easy deletion and export options.</p>
          </div>
        </div>

        {/* Detailed Content */}
        <div className="space-y-12 text-slate-400 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center text-sm font-black">01</span>
              Introduction
            </h2>
            <p className="mb-4">
              Welcome to JobAI. We value your privacy and are committed to protecting your personal data. This Privacy Policy describes how SmartAI Technologies ("we", "us", or "our") collects, uses, and shares information about you when you use our website, dashboard, and API key management services.
            </p>
            <p>
              By accessing or using our services, you agree to the terms of this Privacy Policy and our Terms of Service. If you do not agree with these terms, please do not use JobAI.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center text-sm font-black">02</span>
              Information We Collect
            </h2>
            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <h4 className="text-white font-bold mb-3">Account Information</h4>
                <p className="text-sm">When you register for an account, we collect information such as your name, email address, and profile picture. This is used to personalize your dashboard and communicate important updates.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <h4 className="text-white font-bold mb-3">API & Usage Data</h4>
                <p className="text-sm">We store the API keys you generate or purchase to provide management services. We also log metadata about your API calls (timestamp, success/failure) to provide analytics.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <h4 className="text-white font-bold mb-3">Payment Information</h4>
                <p className="text-sm">We process payments through third-party providers (like UPI/Razorpay). We do not store full credit card numbers or UPI PINs on our servers; only transaction IDs for verification.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center text-sm font-black">03</span>
              How We Use Your Data
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "To provide and maintain our Service",
                "To verify payments and unlock keys",
                "To detect and prevent fraudulent activities",
                "To provide customer support and technical help",
                "To analyze usage patterns to improve UI/UX",
                "To send technical notices and security alerts"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-xl text-sm border border-white/5">
                  <ChevronRight size={14} className="text-indigo-500" /> {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center text-sm font-black">04</span>
              Data Retention & Deletion
            </h2>
            <p className="mb-4">
              We retain your information for as long as your account is active or as needed to provide you with the services. If you wish to delete your account, you can do so from the dashboard settings.
            </p>
            <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-3xl">
              <p className="text-sm text-red-200">
                <strong>Warning:</strong> Deleting your account will permanently remove all your stored API keys, payment history, and saved projects. This action cannot be undone.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center text-sm font-black">05</span>
              Security Measures
            </h2>
            <p>
              We implement industry-standard security measures including AES-256 encryption for data at rest and TLS/SSL for data in transit. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center text-sm font-black">06</span>
              Contact Us
            </h2>
            <p className="mb-6">If you have any questions about this Privacy Policy, please contact our legal team.</p>
            <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl shadow-indigo-600/20">
              <div>
                <h4 className="text-xl font-bold">Have privacy concerns?</h4>
                <p className="text-indigo-100 text-sm">Reach out to us anytime at privacy@jobai.com</p>
              </div>
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition active:scale-95">
                Contact Support
              </button>
            </div>
          </section>

        </div>

        <footer className="mt-24 pt-12 border-t border-white/10 text-center">
          <p className="text-xs text-slate-600 font-bold uppercase tracking-[0.3em]">
            JobAI Compliance © 2026 • Built for the modern era
          </p>
        </footer>
      </main>
    </div>
  );
}