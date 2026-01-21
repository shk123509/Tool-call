"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  Menu, X, CheckCircle, Zap, Shield, 
  BarChart, Globe, ArrowRight, Twitter, 
  Linkedin, Github, Terminal 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <style jsx>{`
        .page-wrapper {
          font-family: 'Inter', -apple-system, sans-serif;
          background: #000;
          color: #ffffff;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .grid-bg {
          position: fixed;
          inset: 0;
          background-image: linear-gradient(#111 1px, transparent 1px),
            linear-gradient(90deg, #111 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.25;
          pointer-events: none;
          z-index: 0;
        }

        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 5%;
          position: fixed;
          top: 0; width: 100%;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 100;
        }

        .hero {
          padding: 180px 20px 100px;
          text-align: center;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
        }

        .hero h1 {
          font-size: clamp(2.8rem, 9vw, 6rem);
          font-weight: 900;
          letter-spacing: -4px;
          line-height: 0.9;
          margin-bottom: 30px;
          background: linear-gradient(to bottom, #ffffff 50%, #555);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero p {
          font-size: clamp(1rem, 4vw, 1.3rem);
          color: #999;
          max-width: 650px;
          margin: 0 auto 48px;
          line-height: 1.5;
        }

        .btn-primary {
          background: #fff;
          color: #000;
          padding: 16px 40px;
          border-radius: 14px;
          font-weight: 800;
          transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-primary:hover { 
          transform: translateY(-4px); 
          box-shadow: 0 15px 30px rgba(255,255,255,0.15); 
        }

        .features-section {
          padding: 100px 5%;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          max-width: 1300px;
          margin: 0 auto;
        }

        .feature-card {
          background: linear-gradient(145deg, #0a0a0a, #111);
          border: 1px solid #1a1a1a;
          padding: 48px;
          border-radius: 32px;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.1);
        }

        .footer-link {
          color: #666;
          transition: 0.3s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .footer-link:hover { color: #fff; }

        @media (max-width: 768px) {
          .hero { padding-top: 140px; }
          .btn-group { flex-direction: column; width: 100%; }
          .btn-primary { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="page-wrapper">
        <div className="grid-bg"></div>
        
        {/* <nav>
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">J</div>
              <span className="text-xl font-black tracking-tighter">Job<span className="text-blue-500">AI</span></span>
            </Link>
          </div>
          
          <div className="hidden md:flex gap-10 items-center text-sm font-semibold text-gray-400">
            <Link href="/chatbot" className="hover:text-white transition">Product</Link>
            <Link href="/features" className="hover:text-white transition">Features</Link>
            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="/sign-in" className="bg-white/5 border border-white/10 px-5 py-2 rounded-xl text-white hover:bg-white/10 transition">Login</Link>
          </div>

          <button className="md:hidden p-2 bg-white/5 rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav> */}

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              className="fixed inset-0 bg-black z-[110] flex flex-col p-10 md:hidden"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="text-2xl font-bold">Menu</span>
                <X onClick={() => setIsMenuOpen(false)} />
              </div>
              <div className="flex flex-col gap-8 text-2xl font-bold">
                <Link href="/chatbot" onClick={() => setIsMenuOpen(false)}>Assistant</Link>
                <Link href="/features" onClick={() => setIsMenuOpen(false)}>Features</Link>
                <Link href="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
                <Link href="/sign-up" className="text-blue-500" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <header className="hero">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-400 text-xs font-bold mb-8">
              <Terminal size={14} /> NEW: API v3.0 IS OUT
            </div>
            <h1>Automate with <br /> Human Precision.</h1>
            <p>
              JobAI adapts to your voice, learns your business, and handles customer support 
              better than a human. No scripts, just pure intelligence.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/sign-up" className="btn-primary">
                Get Started Free <ArrowRight size={20} />
              </Link>
              <Link href="/chatbot" className="px-8 py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition flex items-center gap-2">
                Try Demo
              </Link>
            </div>
          </motion.div>
        </header>

        {/* Bento Grid Features */}
        <section className="features-section">
          <div className="feature-card">
            <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
              <Zap fill="currentColor" />
            </div>
            <h3 className="text-xl font-bold mb-4">Instant Deployment</h3>
            <p className="text-gray-500 leading-relaxed">Connect your data sources and go live in less than 5 minutes. No coding required.</p>
          </div>

          <div className="feature-card">
            <div className="w-12 h-12 bg-emerald-600/20 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
              <Globe />
            </div>
            <h3 className="text-xl font-bold mb-4">Native Hinglish</h3>
            <p className="text-gray-500 leading-relaxed">Perfectly understands the Indian context. Switches between Hindi and English naturally.</p>
          </div>

          <div className="feature-card">
            <div className="w-12 h-12 bg-purple-600/20 rounded-2xl flex items-center justify-center text-purple-500 mb-6">
              <BarChart />
            </div>
            <h3 className="text-xl font-bold mb-4">Real-time Insights</h3>
            <p className="text-gray-500 leading-relaxed">Track every interaction and sentiment with our advanced analytics dashboard.</p>
          </div>
        </section>

        {/* Footer with proper Link components */}
        <footer className="mt-20 border-t border-white/5 py-12 px-5 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-bold text-[10px]">J</div>
              <span className="font-bold">JobAI</span>
            </div>

            <div className="flex gap-8">
              <Link href="https://twitter.com/jobai" className="footer-link">
                <Twitter size={18} /> <span>Twitter</span>
              </Link>
              <Link href="https://github.com/jobai" className="footer-link">
                <Github size={18} /> <span>Github</span>
              </Link>
              <Link href="https://linkedin.com/company/jobai" className="footer-link">
                <Linkedin size={18} /> <span>LinkedIn</span>
              </Link>
            </div>

            <div className="text-gray-600 text-sm">
              © 2026 SmartAI Technologies Inc.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}