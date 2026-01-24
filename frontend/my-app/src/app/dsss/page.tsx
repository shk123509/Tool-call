"use client";
import React, { useState } from "react";
import {
  Zap,
  ArrowRight,
  Clock,
  CheckCircle2,
  Timer,
  Rocket,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ---------------- TYPES ---------------- */
type AudienceKey = "students" | "jobseekers" | "developers";

type AudienceData = {
  title: string;
  problem: string;
  solution: string;
  savedTime: string;
};

/* ---------------- DATA ---------------- */
const audiences: Record<AudienceKey, AudienceData> = {
  students: {
    title: "For Students & Learners",
    problem: "Reading 50-page PDFs or watching 3-hour lectures for one exam topic.",
    solution: "Instant summaries and 'Ask AI' feature to clear doubts in seconds.",
    savedTime: "15+ Hours/Week",
  },
  jobseekers: {
    title: "For Job Seekers",
    problem: "Filling 100+ applications manually and waiting for ghosting.",
    solution: "AI-powered job matching and resume optimization nodes.",
    savedTime: "25+ Hours/Week",
  },
  developers: {
    title: "For Developers",
    problem: "Expensive API costs and complex boilerplate setups.",
    solution: "Pre-configured Vault keys for ₹5 and ready-to-use AI Chat interface.",
    savedTime: "10+ Hours/Week",
  },
};

/* ---------------- COMPONENT ---------------- */
export default function RealWorldSolutions() {
  const [activeTab, setActiveTab] = useState<AudienceKey>("students");

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 pb-20">
      {/* ---------------- AUDIENCE SELECTOR ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">Who are you?</h2>
          <p className="text-slate-500 font-bold">
            Apni category choose karein
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(Object.keys(audiences) as AudienceKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${
                activeTab === key
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-slate-500 hover:bg-white/10"
              }`}
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
            className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-12 grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div>
              <h4 className="text-4xl font-black text-white mb-6">
                {audiences[activeTab].title}
              </h4>

              <div className="space-y-8">
                <div>
                  <p className="text-red-500 text-xs font-black uppercase flex items-center gap-2 mb-2">
                    <AlertTriangle size={14} /> The Pain
                  </p>
                  <p className="text-xl text-slate-400">
                    {audiences[activeTab].problem}
                  </p>
                </div>

                <div>
                  <p className="text-emerald-500 text-xs font-black uppercase flex items-center gap-2 mb-2">
                    <Rocket size={14} /> JobAI Fix
                  </p>
                  <p className="text-xl text-white font-bold">
                    {audiences[activeTab].solution}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-600/10 border border-blue-500/20 p-12 rounded-[2.5rem] text-center">
              <Timer size={48} className="text-blue-500 mx-auto mb-6" />
              <p className="text-slate-400 uppercase tracking-widest text-sm">
                Time Saved
              </p>
              <p className="text-5xl font-black text-white mt-2">
                {audiences[activeTab].savedTime}
              </p>

              <Link
                href="/chatbot"
                className="mt-8 inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-black uppercase hover:bg-blue-700 transition-all"
              >
                Start Saving <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */
function ManualStep({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 text-slate-500">
      <XIcon size={18} className="text-red-600" />
      <span>{text}</span>
    </div>
  );
}

function AIStep({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 text-blue-50 font-bold">
      <CheckCircle2 size={18} className="text-emerald-400" />
      <span>{text}</span>
    </div>
  );
}

function XIcon({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
