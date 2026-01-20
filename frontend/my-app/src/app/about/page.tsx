"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Zap, Ghost, Fingerprint, Globe, Sparkles,
  Cpu, Database, Target, CheckCircle2, 
  Search, Briefcase, Bot, ShieldCheck, Code,
  Rocket, Languages, Shield
} from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-slate-300 selection:bg-blue-500/30 overflow-x-hidden font-sans">
      
      {/* --- SECTION 1: THE ATMOSPHERIC HERO --- */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Neon Glow Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-50" />
        
        <motion.div style={{ y: y1 }} className="absolute top-20 right-[10%] opacity-10 hidden lg:block">
          <Bot size={400} strokeWidth={0.5} className="text-blue-500" />
        </motion.div>

        <div className="relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, tracking: "0.2em" }}
            animate={{ opacity: 1, tracking: "0.5em" }}
            className="text-blue-400 font-mono text-[10px] uppercase mb-6 block font-black"
          >
            Intelligence meets Automation
          </motion.span>
          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl md:text-[10rem] font-black leading-none tracking-tighter text-white"
          >
            JOB <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">ENGINE.</span>
          </motion.h1>
          <p className="mt-8 text-slate-500 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Humne sirf ek chatbot nahi banaya. Humne ek career ecosystem banaya hai. 
            Jo boring tasks ko khatam karta hai taaki aap sirf growth par focus karein.
          </p>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-blue-500 to-transparent" />
        </motion.div>
      </section>

      {/* --- SECTION 2: THE WHY (JobAI Philosophy) --- */}
      <section className="py-32 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
        <div className="sticky top-32">
          <h2 className="text-5xl font-black text-white mb-8 tracking-tighter">The War Against <br /> <span className="text-blue-500">Unemployment.</span></h2>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed font-medium">
            Modern job search toot chuka hai. Thousands of applications, no replies, aur wahi purana manual kaam. 
            <strong> JobAI</strong> is the reset button. Hum technology ko use karte hain automation ke liye, manipulation ke liye nahi.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <div className="p-3 bg-blue-500/20 rounded-xl"><Target className="text-blue-400" /></div>
              <div><h4 className="font-black text-white uppercase text-xs tracking-widest">Accuracy First</h4><p className="text-sm text-slate-500 font-bold">Hamara AI sirf relevant jobs hi dhoondhta hai.</p></div>
            </div>
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <div className="p-3 bg-indigo-500/20 rounded-xl"><Briefcase className="text-indigo-400" /></div>
              <div><h4 className="font-black text-white uppercase text-xs tracking-widest">Career First</h4><p className="text-sm text-slate-500 font-bold">Auto-Apply se lekar Resume generation tak, sab ek jagah.</p></div>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {[
            { title: "The Problem: The Endless Loop", content: "Ek average candidate hafte mein 20 ghante sirf job apply karne mein bitata hai. Yeh time learning mein hona chahiye, tasking mein nahi.", icon: <Zap /> },
            { title: "The Solution: Agentic Search", content: "Humne tools aur LLMs ko combine kiya hai. Hamara agent internet scan karta hai, emails likhta hai, aur WhatsApp par update bhejta hai.", icon: <Sparkles /> },
            { title: "The Trust: Zero Data Storage", content: "Aapki Gemini API key aapke device mein secure rehti hai. Hum aapka personal data bechte nahi, hum use automate karte hain.", icon: <ShieldCheck /> }
          ].map((card, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 15 }}
              className="p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-900/50 to-black border border-slate-800/50 backdrop-blur-md"
            >
              <div className="text-blue-500 mb-6">{card.icon}</div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{card.title}</h3>
              <p className="text-slate-500 leading-relaxed font-bold">{card.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SECTION 3: COMPARISON (Smarter Stats) --- */}
      <section className="py-32 bg-blue-600/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-20 tracking-tight">Manual vs <span className="text-blue-500">JobAI</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ComparisonCard title="Manual Apply" time="45 Mins/Job" effort="High" success="Low" />
            <ComparisonCard title="Agency Search" time="Days" effort="Medium" success="Variable" isPrimary />
            <ComparisonCard title="JobAI Search" time="30 Secs" effort="Zero" success="Maximum" />
          </div>
        </div>
      </section>

      {/* --- SECTION 4: TECHNICAL STACK --- */}
      <section className="py-32 relative overflow-hidden">
        <motion.div style={{ y: y2 }} className="absolute -left-20 top-0 opacity-5">
          <Code size={600} />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 relative z-10">
          <div className="md:col-span-2">
            <h2 className="text-6xl font-black text-white mb-8 tracking-tighter uppercase">The Core <br /> Protocol.</h2>
            <div className="grid sm:grid-cols-2 gap-10">
              <TechFeature num="01" title="Gemini 2.0 Integration" desc="Latest flash models ka use fast reasoning aur response ke liye." />
              <TechFeature num="02" title="Multi-Tool Node" desc="Google Search, IRCTC, JSearch, aur Email nodes ek sath kaam karte hain." />
              <TechFeature num="03" title="Client-Side Encryption" desc="API keys browser mein AES encrypted format mein store hoti hain." />
              <TechFeature num="04" title="Serverless Architecture" desc="FastAPI backend jo scale karta hai bina kisi lag ke." />
            </div>
          </div>
          <div className="bg-blue-600 p-10 rounded-[3rem] shadow-2xl shadow-blue-500/20 flex flex-col justify-between text-white">
            <div className="text-7xl font-black">2.0</div>
            <div className="text-blue-100 uppercase tracking-widest text-xs font-bold">Next-Gen Agent Version</div>
            <div className="mt-10">
              <p className="text-sm font-bold opacity-80 italic">"Automation is not just about doing things fast; it's about doing the right things at the right time."</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: FINAL CTA --- */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="relative z-10 px-6">
          <h2 className="text-7xl font-black text-white mb-10 tracking-tighter uppercase">Ready to <br /> Scale?</h2>
          <Link href="/dash">
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-white text-black font-black rounded-3xl shadow-2xl hover:bg-blue-600 hover:text-white transition-all text-xl"
            >
                OPEN YOUR DASHBOARD
            </motion.button>
          </Link>
          <p className="mt-8 text-slate-500 uppercase text-[10px] tracking-[0.3em] font-black">Built for the next generation of professionals.</p>
        </div>
      </section>

    </div>
  );
};

// Sub-components for cleaner code
function ComparisonCard({ title, time, effort, success, isPrimary }) {
  return (
    <div className={`p-10 rounded-[2.5rem] border ${isPrimary ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}>
        <h4 className={`text-xl font-black mb-6 ${isPrimary ? 'text-white' : 'text-white'}`}>{title}</h4>
        <div className="space-y-4 font-bold text-sm">
            <p>Time: {time}</p>
            <p>Effort: {effort}</p>
            <p>Success Rate: {success}</p>
        </div>
    </div>
  )
}

function TechFeature({ num, title, desc }) {
  return (
    <div className="space-y-3">
        <h4 className="text-blue-500 font-black text-sm uppercase tracking-widest">{num}. {title}</h4>
        <p className="text-slate-500 font-bold leading-relaxed">{desc}</p>
    </div>
  )
}

export default AboutPage;