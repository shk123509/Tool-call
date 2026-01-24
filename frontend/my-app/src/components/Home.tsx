"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Zap, Shield, ArrowRight, Star, Play, MessageSquare, 
  Search, FileText, Train, Video, Mail, Globe, Cpu, Users,
  Check, Instagram, Github, Twitter, Linkedin, Sparkles, Laptop,
  Lightbulb, CheckCircle2
} from 'lucide-react';

/* --- TYPES --- */
interface SolutionCardProps {
  title: string;
  prob: string;
  sol: string;
  icon: React.ReactNode;
}

interface StepProps {
  num: string;
  title: string;
  desc: string;
}

interface SocialIconProps {
  icon: React.ReactNode;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 font-sans">
      
      {/* --- Infinite Logo Slider --- */}
      <div className="w-full bg-slate-900 py-6 overflow-hidden flex items-center border-b border-white/5 mt-[72px] relative z-20">
        <div className="flex whitespace-nowrap animate-scroll gap-20 items-center opacity-80">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 text-white font-black text-sm uppercase tracking-[0.2em]">
              <Cpu size={18} className="text-blue-500" /> <span>Neural Engine v2.0</span>
              <Globe size={18} className="text-indigo-500" /> <span>Real-time Search</span>
              <Sparkles size={18} className="text-purple-500" /> <span>Agentic Workflow</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- Hero Section --- */}
      <header className="relative pt-20 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/50 px-5 py-2 text-[10px] font-black text-blue-700 mb-8 uppercase tracking-[0.15em] shadow-sm">
               New Update: Gemini 2.0 Flash Integration
            </div>
            <h1 className="text-7xl md:text-[90px] font-black mb-8 tracking-[-0.06em] leading-[0.9] text-slate-900">
              Work <span className="italic font-serif text-blue-600">Smarter</span>,<br /> Not Harder.
            </h1>
            <p className="text-xl text-slate-500 max-w-lg mb-12 leading-relaxed font-medium">
              JobAI is your unified workspace for automation. From job hunting to travel alerts, experience the power of <span className="text-slate-900 font-bold underline decoration-blue-500 underline-offset-4">Agentic AI.</span>
            </p>
            <div className="flex flex-wrap gap-5">
              <Link href="/chatbot" className="group px-10 py-5 bg-blue-600 text-white rounded-2xl font-black hover:bg-slate-900 transition-all flex items-center gap-3 shadow-2xl shadow-blue-200">
                Get Started <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/demod" className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black hover:bg-slate-50 transition-all flex items-center gap-3">
                Watch Demo <Play size={18} fill="currentColor"/>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image/Mockup */}
          <div className="relative">
             <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-[3rem] blur-3xl opacity-50"></div>
             <div className="relative bg-slate-900 rounded-[3rem] p-2 shadow-2xl border border-white/10">
                <div className="bg-[#1a1a1a] rounded-[2.5rem] p-8 overflow-hidden">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="space-y-6">
                        <div className="h-4 w-1/2 bg-white/5 rounded-full animate-pulse"></div>
                        <div className="h-4 w-3/4 bg-white/5 rounded-full animate-pulse delay-75"></div>
                        <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
                            <p className="text-blue-400 font-mono text-sm">Target: Frontend Developer Jobs</p>
                            <p className="text-white font-mono text-xs mt-2 opacity-80">Scanning: Google, LinkedIn, Glassdoor...</p>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* --- Stats Section --- */}
      <section className="bg-slate-50 py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
                { label: "Active Users", val: "50K+" },
                { label: "Jobs Applied", val: "1.2M" },
                { label: "Summaries", val: "800K" },
                { label: "Uptime", val: "99.9%" }
            ].map((s, i) => (
                <div key={i} className="text-center">
                    <p className="text-4xl font-black text-slate-900 mb-2">{s.val}</p>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                </div>
            ))}
        </div>
      </section>

      {/* --- How it Works --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-blue-600 font-black uppercase text-sm tracking-widest mb-4">The Process</h2>
                <h3 className="text-5xl font-black">How JobAI Works.</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <Step num="01" title="Connect API" desc="Apni Gemini API key enter karein. Hum aapka data store nahi karte." />
                <Step num="02" title="Ask Anything" desc="Job dhoondhein, train status puchein ya video summarize karein." />
                <Step num="03" title="Get Results" desc="AI instantly action leta hai aur tools ke zariye results deta hai." />
            </div>
        </div>
      </section>

      {/* --- REAL WORLD SOLUTIONS SECTION --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-2 text-blue-600 mb-4">
                        <Lightbulb size={20} className="fill-current"/>
                        <span className="text-sm font-black uppercase tracking-widest">Use Cases</span>
                    </div>
                    <h3 className="text-5xl font-black tracking-tighter">Solving Real World Problems <br/> with Agentic Intelligence.</h3>
                </div>
                <Link href="/dsss" className="text-sm font-black text-blue-600 flex items-center gap-2 group">
                    EXPLORE ALL SOLUTIONS <ArrowRight size={16} className="group-hover:translate-x-2 transition-all"/>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SolutionCard 
                    title="Content Overload" 
                    prob="Hours spent watching long videos for just 1 minute of info." 
                    sol="Summarize 2-hour long YouTube videos into 10 key bullet points instantly."
                    icon={<Video className="text-red-500" />}
                />
                <SolutionCard 
                    title="The Job Hunt" 
                    prob="Applying to 50+ jobs manually every day is exhausting." 
                    sol="Our Agent scans LinkedIn & Google to find the perfect matches for your resume."
                    icon={<Search className="text-blue-500" />}
                />
                <SolutionCard 
                    title="Travel Anxiety" 
                    prob="Constantly checking train status and platform numbers." 
                    sol="Get real-time railway updates directly through the AI node interface."
                    icon={<Train className="text-indigo-500" />}
                />
            </div>
        </div>
      </section>

      {/* --- Features Grid (Bento) --- */}
      <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden rounded-[4rem] mx-4 mb-24 shadow-3xl">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white/5 border border-white/10 p-12 rounded-[3rem] hover:bg-white/10 transition-all">
                    <Zap size={48} className="text-blue-500 mb-8" />
                    <h3 className="text-4xl font-black mb-6">Automation Nodes.</h3>
                    <p className="text-xl text-slate-400 font-medium">Aapka AI Assistant sirf baatein nahi karta, yeh tools chalata hai. WhatsApp alerts se lekar email automation tak, sab kuch control karein.</p>
                </div>
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-blue-600 p-10 rounded-[3rem] h-1/2 flex flex-col justify-end group">
                        <Train size={40} className="mb-4 group-hover:translate-x-4 transition-transform"/>
                        <h4 className="text-2xl font-black">Live Rail Node</h4>
                    </div>
                    <div className="bg-indigo-600 p-10 rounded-[3rem] h-1/2 flex flex-col justify-end group">
                        <Video size={40} className="mb-4 group-hover:scale-125 transition-transform"/>
                        <h4 className="text-2xl font-black">Tube Summarizer</h4>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- Pricing Section --- */}
      <section className="py-32 px-6 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto text-center mb-20">
            <h3 className="text-4xl font-black mb-6">Always Free. Just Use Your Key.</h3>
            <p className="text-slate-500 font-bold text-lg">Hum aapse koi subscription nahi lete. Aapka model, aapka control.</p>
        </div>
        <div className="max-w-xl mx-auto bg-white border-2 border-blue-600 p-12 rounded-[3rem] shadow-2xl relative">
            <div className="absolute -top-5 right-10 bg-blue-600 text-white text-xs font-black px-4 py-2 rounded-full">POPULAR</div>
            <h4 className="text-xl font-black mb-2">Community Edition</h4>
            <div className="text-5xl font-black mb-8">$0 <span className="text-lg text-slate-400 font-bold">/ forever</span></div>
            <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 font-bold text-slate-600"><Check size={20} className="text-blue-600"/> All Agentic Tools</li>
                <li className="flex items-center gap-3 font-bold text-slate-600"><Check size={20} className="text-blue-600"/> Unlimited Chat History</li>
                <li className="flex items-center gap-3 font-bold text-slate-600"><Check size={20} className="text-blue-600"/> Real-time Search Nodes</li>
            </ul>
            <Link href="/chatbot" className="block text-center bg-slate-900 text-white py-5 rounded-2xl font-black hover:bg-blue-600 transition-all">Start For Free</Link>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-slate-100 pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">J</div>
                    <span className="text-2xl font-black tracking-tighter">JobAI</span>
                </div>
                <p className="text-slate-500 font-medium mb-8">
                    Making intelligence accessible and automation effortless for everyone.
                </p>
                <div className="flex gap-4">
                    <SocialIcon icon={<Twitter size={20}/>} />
                    <SocialIcon icon={<Github size={20}/>} />
                    <SocialIcon icon={<Instagram size={20}/>} />
                </div>
            </div>
            <div>
                <h5 className="font-black text-sm uppercase tracking-widest mb-8">Product</h5>
                <ul className="space-y-4 font-bold text-slate-400 text-sm">
                    <li><Link href="/chatbot" className="hover:text-blue-600 transition-colors">AI Assistant</Link></li>
                    <li><Link href="/dash" className="hover:text-blue-600 transition-colors">API Dashboard</Link></li>
                    <li><Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
                </ul>
            </div>
            <div>
                <h5 className="font-black text-sm uppercase tracking-widest mb-8">Resources</h5>
                <ul className="space-y-4 font-bold text-slate-400 text-sm">
                    <li><Link href="/about" className="hover:text-blue-600 transition-colors">Documentation</Link></li>
                    <li><Link href="/privacey" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                    <li><Link href="/ser" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                </ul>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h5 className="font-black text-sm mb-4">Stay Smart.</h5>
                <p className="text-xs text-slate-500 font-bold mb-4 italic">Subscribe to our agentic newsletter.</p>
                <div className="flex flex-col gap-2">
                    <input type="email" placeholder="email@example.com" className="bg-white border border-slate-200 px-4 py-3 rounded-xl text-xs outline-none focus:border-blue-600" />
                    <button className="bg-blue-600 text-white py-3 rounded-xl text-xs font-black">Subscribe</button>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-bold text-slate-400">© 2026 JOB-AI ENGINE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8 text-xs font-black text-slate-400">
                <Link href="/privacey" className="hover:text-blue-600">PRIVACY</Link>
                <Link href="/c" className="hover:text-blue-600">COOKIES</Link>
                <Link href="/ser" className="hover:text-blue-600">SECURITY</Link>
            </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 35s linear infinite; }
      `}</style>
    </div>
  );
}

// --- Helper Components with Fixed Types ---

function SolutionCard({ title, prob, sol, icon }: SolutionCardProps) {
    return (
        <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 border border-slate-100 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h4 className="text-2xl font-black mb-4">{title}</h4>
            <div className="space-y-4">
                <div>
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-1">Problem</span>
                    <p className="text-sm font-bold text-slate-500 leading-relaxed">{prob}</p>
                </div>
                <div className="pt-4 border-t border-slate-200/50">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block mb-1">AI Solution</span>
                    <p className="text-sm font-bold text-slate-900 leading-relaxed flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> {sol}
                    </p>
                </div>
            </div>
        </div>
    )
}

function Step({num, title, desc}: StepProps) {
    return (
        <div className="group">
            <div className="text-6xl font-black text-slate-100 group-hover:text-blue-100 transition-colors mb-6">{num}</div>
            <h4 className="text-2xl font-black mb-4">{title}</h4>
            <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
        </div>
    )
}

function SocialIcon({icon}: SocialIconProps) {
    return (
        <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
            {icon}
        </div>
    )
}