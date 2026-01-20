"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { 
  ssr: false,
  loading: () => <div className="w-full aspect-video bg-zinc-900 animate-pulse rounded-[2rem]" />
});

export default function AIPlayerPage() {
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=DwJA67_zLKU");
  const [inputUrl, setInputUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // ✅ FIX: Auto-play error se bachne ke liye playing ko false rakha hai
  const [playing, setPlaying] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const getAISummary = async () => {
    setLoading(true);
    setSummary("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl }),
      });
      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      setSummary("Error: Connection lost with AI.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-6xl font-black italic tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            VISION <span className="text-red-600">AI</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-black aspect-video shadow-2xl">
              {/* ✅ FIX: Muted true karne se autoplay error nahi aata */}
              <ReactPlayer 
                url={videoUrl} 
                width="100%" 
                height="100%" 
                controls 
                playing={playing}
                muted={true} 
              />
            </div>

            <div className="flex gap-2 p-2 bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-2xl">
              <input 
                className="flex-1 bg-transparent px-4 outline-none text-sm font-medium"
                placeholder="Paste YouTube URL..."
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
              <button 
                onClick={() => { 
                  setVideoUrl(inputUrl); 
                  setPlaying(true); // ✅ User click par play hoga toh error nahi aayega
                  setSummary(""); 
                }}
                className="bg-white text-black font-black px-6 py-3 rounded-xl text-xs uppercase hover:bg-red-600 hover:text-white transition-all"
              >
                Inject & Play
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-zinc-900/30 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-3xl relative">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              AI INSIGHTS
            </h2>

            <button 
              onClick={getAISummary}
              disabled={loading}
              className="w-full py-4 bg-red-600 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-red-500 transition-all disabled:opacity-50 shadow-lg shadow-red-600/20"
            >
              {loading ? "Analyzing..." : "Generate Summary"}
            </button>

            <div className="mt-8">
              {summary ? (
                <div className="animate-in fade-in slide-in-from-top-4 duration-700">
                  <p className="text-zinc-300 text-sm leading-relaxed border-l-2 border-red-600 pl-4 py-1 italic">
                    {summary}
                  </p>
                </div>
              ) : (
                <div className="py-10 text-center opacity-20 italic text-xs tracking-widest uppercase">
                  Ready for scanning
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}