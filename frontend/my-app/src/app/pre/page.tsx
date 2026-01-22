"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, ArrowRight, Video, Search, Train, Code2, 
  MessageSquare, Briefcase, Globe, BarChart3, 
  ShieldCheck, BrainCircuit, Rocket, Lightbulb,
  FileText, Clock, ShoppingCart, UserCheck
} from 'lucide-react';
import Link from 'next/link';

export default function ContentRichSolutions() {
  const sections = [
    {
      category: "Professional Growth",
      icon: <Briefcase className="text-blue-500" />,
      items: [
        {
          prob: "Job Hunting Exhaustion",
          sol: "Our Agentic Node scans 50+ job boards (LinkedIn, Indeed, Glassdoor) and auto-filters roles matching your tech stack and 40LPA+ salary bracket.",
          tool: "Job Scanner Node"
        },
        {
          prob: "Resume-JD Mismatch",
          sol: "AI analyzes the Job Description and suggests real-time tweaks to your resume keywords so you pass the ATS (Applicant Tracking System) every single time.",
          tool: "Resume Optimizer"
        }
      ]
    },
    {
      category: "Learning & Education",
      icon: <Video className="text-red-500" />,
      items: [
        {
          prob: "Video Lecture Overload",
          sol: "Inject any 5-hour long YouTube tutorial. Our Vision AI extracts code snippets, key timestamps, and a 1-page summary so you learn in 5 minutes.",
          tool: "Video Vision AI"
        },
        {
          prob: "Complex Research Papers",
          sol: "Upload 100-page PDFs. The AI summarizes the methodology and findings, allowing you to 'Chat with your Document' to ask specific questions.",
          tool: "Chatbot v2.0"
        }
      ]
    },
    {
      category: "Developer Efficiency",
      icon: <Code2 className="text-emerald-500" />,
      items: [
        {
          prob: "Expensive API Costs",
          sol: "Testing AI features shouldn't cost thousands. Access our API Vault to get Enterprise-grade Gemini/GPT keys for as low as ₹5 per session.",
          tool: "API Vault"
        },
        {
          prob: "Manual Coding Boilerplate",
          sol: "Use the 'Code Node' to generate entire Next.js or Python projects with pre-configured folder structures and authentication in one prompt.",
          tool: "Agentic Workflow"
        }
      ]
    },
    {
      category: "Daily Life Utility",
      icon: <Train className="text-orange-500" />,
      items: [
        {
          prob: "Uncertain Travel Status",
          sol: "Forget checking 10 apps. Our Rail Node gives you live GPS tracking, platform numbers, and 'probability of delay' based on historical data.",
          tool: "Live Rail Node"
        },
        {
          prob: "Email & Communication",
          sol: "Draft professional emails, cold DMs, or cover letters that don't sound like a robot. Our 'Human-Touch' filter makes AI text indistinguishable.",
          tool: "AI Writer"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* --- HERO SECTION --- */}
      <header className="pt-32 pb-20 px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block shadow-xl shadow-blue-200">
                    The Problem Solver's Guide 2026
                </span>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
                    Real Problems. <br/> <span className="text-blue-600 italic">One Workspace.</span>
                </h1>
                <p className="text-xl text-slate-500 font-bold max-w-2xl mx-auto mb-10">
                    Humne 100+ real-world use cases ko categorize kiya hai. Dekhiye JobAI kaise aapki life ke har gante ko optimize karta hai.
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/chatbot" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase shadow-2xl hover:bg-blue-600 transition-all">Start Automating</Link>
                    <Link href="#directory" className="bg-white border-2 border-slate-100 px-10 py-5 rounded-2xl font-black text-sm uppercase hover:bg-slate-50 transition-all">Explore Directory</Link>
                </div>
            </motion.div>
        </div>
      </header>

      {/* --- SOLUTIONS DIRECTORY --- */}
      <main id="directory" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {sections.map((section, idx) => (
                <div key={idx} className="space-y-8">
                    <div className="flex items-center gap-4 pb-4 border-b-2 border-slate-900">
                        <div className="p-3 bg-white rounded-xl shadow-md border border-slate-100">
                            {section.icon}
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter">{section.category}</h2>
                    </div>

                    <div className="space-y-6">
                        {section.items.map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">Case #{idx+1}.{i+1}</span>
                                    <span className="text-[10px] font-black text-slate-400 flex items-center gap-1 uppercase tracking-widest">
                                        <Zap size={12} className="text-yellow-500" /> Powered by {item.tool}
                                    </span>
                                </div>
                                <div className="mb-6">
                                    <p className="text-xs font-black text-red-500 uppercase tracking-widest mb-2">The Problem:</p>
                                    <h3 className="text-xl font-black text-slate-800 leading-tight">"{item.prob}"</h3>
                                </div>
                                <div>
                                    <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-2">The AI Solution:</p>
                                    <p className="text-slate-500 font-bold leading-relaxed">{item.sol}</p>
                                </div>
                                <Link href="/chatbot" className="mt-8 flex items-center gap-2 text-xs font-black text-slate-900 hover:text-blue-600 transition-colors">
                                    TRY THIS SOLUTION <ArrowRight size={14} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </main>

      {/* --- STATS SECTION --- */}
      <section className="bg-slate-900 py-24 px-6 mx-4 rounded-[4rem] mb-24 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div>
                <p className="text-6xl font-black mb-2 text-blue-500">120+</p>
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Automated Nodes</p>
            </div>
            <div>
                <p className="text-6xl font-black mb-2 text-blue-500">50,000</p>
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Hours Saved Monthly</p>
            </div>
            <div>
                <p className="text-6xl font-black mb-2 text-blue-500">0.02s</p>
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Response Latency</p>
            </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <footer className="pb-32 text-center px-6">
        <h3 className="text-4xl font-black mb-8 tracking-tighter">Your life is too short for manual work.</h3>
        <Link href="/chatbot" className="inline-flex items-center gap-4 bg-blue-600 text-white px-12 py-6 rounded-3xl font-black text-lg uppercase shadow-2xl shadow-blue-200 hover:scale-110 transition-all active:scale-95">
            Launch Your Agentic Journey <Rocket size={24} />
        </Link>
      </footer>

    </div>
  );
}