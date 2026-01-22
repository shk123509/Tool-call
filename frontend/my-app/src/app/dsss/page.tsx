"use client";
import React, { useState } from 'react';
import { 
  Zap, ArrowRight, Clock, ShieldCheck, Target, 
  Cpu, MousePointer2, Sparkles, CheckCircle2, 
  ChevronRight, Timer, Rocket, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function RealWorldSolutions() {
  const [activeTab, setActiveTab] = useState('students');

  const audiences = {
    students: {
      title: "For Students & Learners",
      problem: "Reading 50-page PDFs or watching 3-hour lectures for one exam topic.",
      solution: "Instant summaries and 'Ask AI' feature to clear doubts in seconds.",
      savedTime: "15+ Hours/Week"
    },
    jobseekers: {
      title: "For Job Seekers",
      problem: "Filling 100+ applications manually and waiting for ghosting.",
      solution: "AI-powered job matching and resume optimization nodes.",
      savedTime: "25+ Hours/Week"
    },
    developers: {
      title: "For Developers",
      problem: "Expensive API costs and complex boilerplate setups.",
      solution: "Pre-configured Vault keys for ₹5 and ready-to-use AI Chat interface.",
      savedTime: "10+ Hours/Week"
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans pb-20 selection:bg-blue-500/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full opacity-50" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 inline-block">
              Problem Solvers v2.0
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.85]">
              Real Problems. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 italic">
                AI Solutions.
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
              Duniya ki complex problems ka simple automation. Hum sirf chat nahi karte, hum kaam finish karte hain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- INTERACTIVE COMPARISON SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Manual Side */}
          <div className="lg:col-span-5 bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-500">
              <Clock size={120} />
            </div>
            <h3 className="text-2xl font-black text-white mb-8">The Slow Way</h3>
            <div className="space-y-6">
              <ManualStep text="Copy pasting job details manually." />
              <ManualStep text="Watching full videos for 1 note." />
              <ManualStep text="Manual API configuration (Hours)." />
              <ManualStep text="Writing emails from scratch." />
            </div>
            <div className="mt-12 pt-8 border-t border-white/5">
              <p className="text-red-500 font-black text-3xl">4-5 Hours</p>
              <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mt-1 text-red-500/50">Wasted Daily</p>
            </div>
          </div>

          {/* Center: VS Circle */}
          <div className="hidden lg:flex lg:col-span-2 items-center justify-center relative">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-black italic shadow-[0_0_30px_rgba(37,99,235,0.5)] z-20">VS</div>
            <div className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
          </div>

          {/* Right: JobAI Side */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-500">
              <Zap size={120} />
            </div>
            <h3 className="text-2xl font-black mb-8">The JobAI Way</h3>
            <div className="space-y-6">
              <AIStep text="One-click Job Scanning Nodes." />
              <AIStep text="Neural YouTube Summarization." />
              <AIStep text="Pre-built API Vault Access." />
              <AIStep text="Agentic Email Automation." />
            </div>
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-emerald-400 font-black text-3xl">2 Minutes</p>
              <p className="text-blue-200 text-xs uppercase font-bold tracking-widest mt-1">Total Effort</p>
            </div>
          </div>

        </div>
      </section>

      {/* --- AUDIENCE SELECTOR --- */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">Who are you?</h2>
          <p className="text-slate-500 font-bold">Apni category choose karein aur dekhein JobAI kaise help karta hai.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(audiences).map((key) => (
            <button 
              key={key} 
              onClick={() => setActiveTab(key)}
              className={`px-8 py-4 rounded-2xl font-black text-sm transition-all uppercase tracking-widest ${activeTab === key ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
            >
              {key}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h4 className="text-4xl font-black text-white mb-6 tracking-tighter">{audiences[activeTab].title}</h4>
              <div className="space-y-8">
                <div>
                   <p className="text-red-500 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                     <AlertTriangle size={14}/> The Pain
                   </p>
                   <p className="text-xl text-slate-400 font-medium leading-relaxed">{audiences[activeTab].problem}</p>
                </div>
                <div>
                   <p className="text-emerald-500 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                     <Rocket size={14}/> JobAI Fix
                   </p>
                   <p className="text-xl text-white font-bold leading-relaxed">{audiences[activeTab].solution}</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-600/10 border border-blue-500/20 p-12 rounded-[2.5rem] text-center">
               <Timer size={48} className="text-blue-500 mx-auto mb-6" />
               <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Time Saved with AI</p>
               <p className="text-5xl font-black text-white mt-2">{audiences[activeTab].savedTime}</p>
               <Link href="/chatbot" className="mt-8 inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all">
                  Start Saving <ArrowRight size={18}/>
               </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* --- CTA FOOTER --- */}
      <section className="max-w-4xl mx-auto px-6 text-center">
         <div className="p-1 border border-white/5 bg-white/5 rounded-[3rem]">
            <div className="bg-[#0a0a0a] rounded-[2.8rem] p-12 md:p-20">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                Ready to stop wasting your <span className="text-blue-600">potential?</span>
              </h2>
              <Link href="/solutions" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-all">
    Solutions <span className="ml-1 text-[8px] bg-blue-600 text-white px-1 rounded-sm">NEW</span>
  </Link>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/dash" className="px-10 py-5 bg-white text-black rounded-2xl font-black text-sm uppercase hover:bg-blue-50 transition-all active:scale-95 shadow-xl">Get API Keys</Link>
                <Link href="/chatbot" className="px-10 py-5 bg-transparent border border-white/10 text-white rounded-2xl font-black text-sm uppercase hover:bg-white/5 transition-all active:scale-95">Open Chatbot</Link>
              </div>
            </div>
         </div>
      </section>

    </div>
  );
}

// --- Helper Components ---
function ManualStep({ text }) {
  return (
    <div className="flex items-center gap-4 text-slate-500 font-medium">
      <XIcon size={18} className="text-red-900 shrink-0" />
      <span>{text}</span>
    </div>
  );
}

function AIStep({ text }) {
  return (
    <div className="flex items-center gap-4 text-blue-50 font-bold">
      <CheckCircle2 size={18} className="text-emerald-400 shrink-0 shadow-lg" />
      <span>{text}</span>
    </div>
  );
}

function XIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}