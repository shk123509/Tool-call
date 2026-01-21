"use client";
import React, { useState } from "react";
import { Menu, X, CheckCircle, Zap, Shield, BarChart, Globe, ArrowRight } from "lucide-react";

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
          opacity: 0.2;
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
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          z-index: 100;
        }

        .hero {
          padding: 160px 20px 80px;
          text-align: center;
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
        }

        .hero-badge {
          background: rgba(59, 130, 246, 0.1);
          color: #60a5fa;
          padding: 6px 16px;
          border-radius: 99px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(59, 130, 246, 0.2);
          margin-bottom: 20px;
          display: inline-block;
        }

        .hero h1 {
          font-size: clamp(2.5rem, 10vw, 5.5rem);
          font-weight: 900;
          letter-spacing: -4px;
          line-height: 0.95;
          margin-bottom: 24px;
          background: linear-gradient(to bottom, #fff 40%, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero p {
          font-size: clamp(1rem, 4vw, 1.25rem);
          color: #888;
          max-width: 600px;
          margin: 0 auto 40px;
          line-height: 1.6;
        }

        .btn-group {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: #fff;
          color: #000;
          padding: 16px 36px;
          border-radius: 12px;
          font-weight: 700;
          transition: 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary:hover { transform: scale(1.05); box-shadow: 0 0 30px rgba(255,255,255,0.2); }

        .section-title {
          text-align: center;
          margin-bottom: 60px;
          padding: 0 20px;
        }

        .section-title h2 { font-size: 2.5rem; font-weight: 800; letter-spacing: -1px; }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .feature-card {
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          padding: 40px;
          border-radius: 24px;
          transition: 0.3s;
        }

        .feature-card:hover { border-color: #333; background: #0f0f0f; }

        .icon-box {
          width: 50px; h-height: 50px;
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
          color: #60a5fa;
        }

        .stats-section {
          background: #050505;
          padding: 80px 20px;
          border-top: 1px solid #111;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 40px;
        }

        .stat-item h4 { font-size: 3rem; font-weight: 900; color: #fff; margin:0;}
        .stat-item p { color: #555; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px;}

        .mobile-menu {
          position: fixed; top: 70px; left: 0; width: 100%; height: 100vh;
          background: #000; z-index: 99; padding: 40px;
          display: flex; flex-direction: column; gap: 30px;
          transform: translateX(${isMenuOpen ? '0' : '100%'});
          transition: 0.4s ease-in-out;
        }

        @media (max-width: 768px) {
          .hero { padding-top: 120px; }
          .hero h1 { letter-spacing: -2px; }
          .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="page-wrapper">
        <div className="grid-bg"></div>
        
        <nav>
          <div style={{fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-1px'}}>
            Job<span style={{color:'#3b82f6'}}>AI</span>
          </div>
          
          <div className="hidden md:flex" style={{display: 'flex', gap: '30px', fontSize: '0.9rem', color: '#888'}}>
            <a href="#" style={{color:'#fff'}}>Product</a>
            <a href="#">Solutions</a>
            <a href="#">Pricing</a>
            <a href="#">Company</a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{background:'none', border:'none', color:'#fff'}}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>

          <button className="btn-primary" style={{padding: '10px 20px', fontSize: '0.8rem', display: 'none' }}>
             Sign In
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className="mobile-menu">
          <a href="#" style={{fontSize: '1.5rem', fontWeight: 700}}>Product</a>
          <a href="#" style={{fontSize: '1.5rem', fontWeight: 700}}>Solutions</a>
          <a href="#" style={{fontSize: '1.5rem', fontWeight: 700}}>Pricing</a>
          <button className="btn-primary">Get Started</button>
        </div>

        <header className="hero">
          <div className="hero-badge">v2.0 is now live — Experience the future</div>
          <h1>The AI Assistant <br /> that actually works.</h1>
          <p>
            Duniya ka sabse advanced AI engine jo aapke business workflows ko automate karta hai. 
            Real-time learning aur human-like context ke saath.
          </p>

          <div className="btn-group">
            <button className="btn-primary">
              Start Building <ArrowRight size={18} />
            </button>
            <button className="btn-secondary">View Documentation</button>
          </div>
        </header>

        <section className="stats-section">
          <div className="stat-item">
            <h4>99.9%</h4>
            <p>Uptime Guaranteed</p>
          </div>
          <div className="stat-item">
            <h4>150M+</h4>
            <p>Requests Handled</p>
          </div>
          <div className="stat-item">
            <h4>0.1s</h4>
            <p>Avg. Response Time</p>
          </div>
        </section>

        <section style={{padding: '100px 0'}}>
          <div className="section-title">
            <h2>Everything you need <br /> to scale faster.</h2>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="icon-box"><Zap fill="currentColor" /></div>
              <h3>Ultra Fast Integration</h3>
              <p>Sirf 2 lines ka code aur aapka AI assistant ready hai. No complex setups.</p>
            </div>

            <div className="feature-card">
              <div className="icon-box"><Globe /></div>
              <h3>Multilingual Support</h3>
              <p>Pure Bharat ke liye built. English, Hindi aur Hinglish me seamless baatein.</p>
            </div>

            <div className="feature-card">
              <div className="icon-box"><Shield /></div>
              <h3>Enterprise Security</h3>
              <p>Bank-grade encryption aur data privacy protection har conversation me.</p>
            </div>

            <div className="feature-card">
              <div className="icon-box"><BarChart /></div>
              <h3>Advanced Analytics</h3>
              <p>Understand user behavior with deep data visualization and heatmaps.</p>
            </div>
          </div>
        </section>

        <section style={{padding: '100px 20px', textAlign: 'center', background: 'linear-gradient(to bottom, #000, #050505)'}}>
           <div style={{maxWidth: '800px', margin: '0 auto', border: '1px solid #222', padding: '60px', borderRadius: '40px', background: 'radial-gradient(circle at top right, #111, #000)'}}>
              <h2 style={{fontSize: '2.5rem', marginBottom: '20px'}}>Ready to automate?</h2>
              <p style={{color: '#888', marginBottom: '40px'}}>Join 2,000+ companies already using JobAI to power their support.</p>
              <button className="btn-primary" style={{margin: '0 auto'}}>Get Started Now</button>
           </div>
        </section>

        <footer style={{borderTop: '1px solid #111', padding: '60px 20px', textAlign: 'center'}}>
          <div style={{marginBottom: '20px', fontWeight: 800}}>JobAI</div>
          <div style={{display: 'flex', gap: '20px', justifyContent: 'center', color: '#555', fontSize: '0.9rem', marginBottom: '40px'}}>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">Github</a>
          </div>
          <p style={{color: '#333', fontSize: '0.8rem'}}>© 2026 SmartAI Technologies. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}