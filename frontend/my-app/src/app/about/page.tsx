"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Zap,
  Sparkles,
  Target,
  Briefcase,
  Bot,
  ShieldCheck,
  Code,
} from "lucide-react";
import Link from "next/link";

/* =========================
   PAGE
========================= */

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#050505] text-slate-300 overflow-x-hidden font-sans"
    >
      {/* ================= HERO ================= */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-50" />

        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 right-[10%] opacity-10 hidden lg:block"
        >
          <Bot size={400} strokeWidth={0.5} className="text-blue-500" />
        </motion.div>

        <div className="relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            className="text-blue-400 font-mono text-[10px] uppercase mb-6 block font-black"
          >
            Intelligence meets Automation
          </motion.span>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl md:text-[10rem] font-black leading-none tracking-tighter text-white"
          >
            JOB <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              ENGINE.
            </span>
          </motion.h1>

          <p className="mt-8 text-slate-500 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Humne sirf ek chatbot nahi banaya. Humne ek career ecosystem banaya
            hai. Jo boring tasks ko khatam karta hai taaki aap sirf growth par
            focus karein.
          </p>
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section className="py-32 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          {[
            {
              title: "The Problem: Endless Loop",
              content:
                "Candidates 20+ ghante sirf apply karne mein waste kar dete hain.",
              icon: <Zap />,
            },
            {
              title: "The Solution: Agentic Search",
              content:
                "JobAI agents search, apply aur updates automatically bhejte hain.",
              icon: <Sparkles />,
            },
            {
              title: "The Trust: Zero Data Storage",
              content:
                "User data store nahi hota. Automation, not exploitation.",
              icon: <ShieldCheck />,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 12 }}
              className="p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-900/50 to-black border border-slate-800/50"
            >
              <div className="text-blue-500 mb-6">{item.icon}</div>
              <h3 className="text-2xl font-black text-white mb-4">
                {item.title}
              </h3>
              <p className="text-slate-500 font-bold">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= COMPARISON ================= */}
      <section className="py-32 bg-blue-600/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-20">
            Manual vs <span className="text-blue-500">JobAI</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ComparisonCard
              title="Manual Apply"
              time="45 Mins/Job"
              effort="High"
              success="Low"
            />
            <ComparisonCard
              title="Agency Search"
              time="Days"
              effort="Medium"
              success="Variable"
              isPrimary
            />
            <ComparisonCard
              title="JobAI Search"
              time="30 Secs"
              effort="Zero"
              success="Maximum"
            />
          </div>
        </div>
      </section>

      {/* ================= TECH ================= */}
      <section className="py-32 relative overflow-hidden">
        <motion.div style={{ y: y2 }} className="absolute -left-20 top-0 opacity-5">
          <Code size={600} />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 relative z-10">
          <TechFeature
            num="01"
            title="Gemini 2.0"
            desc="Fast reasoning with latest models"
          />
          <TechFeature
            num="02"
            title="Multi-Tool Agent"
            desc="Search, email & job apply automation"
          />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-40 text-center">
        <h2 className="text-7xl font-black text-white mb-10">Ready to Scale?</h2>
        <Link href="/dash">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-white text-black font-black rounded-3xl text-xl"
          >
            OPEN YOUR DASHBOARD
          </motion.button>
        </Link>
      </section>
    </div>
  );
};

/* =========================
   COMPONENTS
========================= */

type ComparisonCardProps = {
  title: string;
  time: string;
  effort: string;
  success: string;
  isPrimary?: boolean;
};

function ComparisonCard({
  title,
  time,
  effort,
  success,
  isPrimary = false,
}: ComparisonCardProps) {
  return (
    <div
      className={`p-10 rounded-[2.5rem] border ${
        isPrimary
          ? "bg-blue-600 border-blue-500 text-white"
          : "bg-white/5 border-white/10 text-slate-400"
      }`}
    >
      <h4 className="text-xl font-black mb-6 text-white">{title}</h4>
      <div className="space-y-4 font-bold text-sm">
        <p>Time: {time}</p>
        <p>Effort: {effort}</p>
        <p>Success Rate: {success}</p>
      </div>
    </div>
  );
}

type TechFeatureProps = {
  num: string;
  title: string;
  desc: string;
};

function TechFeature({ num, title, desc }: TechFeatureProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-blue-500 font-black text-sm uppercase tracking-widest">
        {num}. {title}
      </h4>
      <p className="text-slate-500 font-bold">{desc}</p>
    </div>
  );
}

export default AboutPage;
