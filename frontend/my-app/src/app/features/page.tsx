"use client";
import React from "react";

export default function LandingPage() {
  return (
    <>
      <style jsx>{`
        .page-wrapper {
          font-family: 'Inter', -apple-system, sans-serif;
          background: radial-gradient(circle at top, #0b0b0b, #000);
          color: #ffffff;
          min-height: 100vh;
        }

        /* animated subtle grid background */
        .page-wrapper::before {
          content: "";
          position: fixed;
          inset: 0;
          background-image: linear-gradient(#111 1px, transparent 1px),
            linear-gradient(90deg, #111 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0.15;
          pointer-events: none;
        }

        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 10%;
          position: sticky;
          top: 0;
          background: rgba(5, 5, 5, 0.7);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .hero {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 20px;
          max-width: 900px;
          margin: 0 auto;
        }

        .hero h1 {
          font-size: clamp(2.8rem, 8vw, 5.5rem);
          font-weight: 900;
          letter-spacing: -3px;
          line-height: 1;
          margin-bottom: 24px;
          background: linear-gradient(120deg, #fff, #60a5fa, #a855f7);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 6s linear infinite;
        }

        @keyframes gradientMove {
          to {
            background-position: 200% center;
          }
        }

        .hero p {
          font-size: 1.15rem;
          color: #aaa;
          margin-bottom: 40px;
        }

        .btn-group {
          display: flex;
          gap: 15px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #ffffff, #d1d5db);
          color: #000;
          padding: 14px 30px;
          border-radius: 999px;
          font-weight: 700;
          box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          transition: 0.3s;
        }

        .btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          padding: 14px 30px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: 0.3s;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .grid-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 100px 20px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 240px;
          gap: 20px;
        }

        .card {
          background: linear-gradient(145deg, #050505, #0f0f0f);
          border-radius: 24px;
          padding: 32px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
          transition: 0.3s;
        }

        /* glow effect */
        .card::after {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 24px;
          background: linear-gradient(120deg, transparent, rgba(59, 130, 246, 0.4), transparent);
          opacity: 0;
          transition: 0.4s;
        }

        .card:hover::after {
          opacity: 1;
        }

        .card:hover {
          transform: translateY(-6px);
        }

        .card-icon {
          font-size: 2.2rem;
          margin-bottom: 10px;
        }

        .col-span-2 {
          grid-column: span 2;
        }

        .row-span-2 {
          grid-row: span 2;
        }

        footer {
          text-align: center;
          padding: 40px;
          color: #555;
          font-size: 0.8rem;
        }

        @media (max-width: 850px) {
          .grid-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="page-wrapper">
        <header className="hero">
          <h1>Built for the <br /> modern era.</h1>
          <p>
            Automate customer support, lead generation, and business workflows with the most
            human-like AI engine ever built.
          </p>

          <div className="btn-group">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Book a Demo</button>
          </div>
        </header>

        <section className="grid-container">
          <div className="card col-span-2 row-span-2">
            <span className="card-icon">🚀</span>
            <h3>Advanced Neural Engine</h3>
            <p>
              AI jo context samajhta hai, tone learn karta hai aur real-time me adapt hota hai.
            </p>
          </div>

          <div className="card">
            <span className="card-icon">🌍</span>
            <h3>Global Support</h3>
            <p>50+ languages including Hinglish.</p>
          </div>

          <div className="card">
            <span className="card-icon">⚡</span>
            <h3>Instant Reply</h3>
            <p>Under 0.1 seconds response time.</p>
          </div>

          <div className="card col-span-2">
            <span className="card-icon">📊</span>
            <h3>Deep Analytics</h3>
            <p>Conversation insights and behavior tracking.</p>
          </div>

          <div className="card">
            <span className="card-icon">🔒</span>
            <h3>Secure</h3>
            <p>End-to-end encryption.</p>
          </div>
        </section>

        <footer>© 2026 SmartAI Technologies. All rights reserved.</footer>
      </div>
    </>
  );
}
