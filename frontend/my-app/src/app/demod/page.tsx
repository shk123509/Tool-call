"use client";

import React, { useState, useEffect } from "react";
import { Play, Zap, Link as LinkIcon, MonitorPlay, ShieldAlert, Cpu } from "lucide-react";

export default function AIPlayerPage() {
  // Default Video ID set kar di hai (xtIi3zdsDB0)
  const [videoUrl, setVideoUrl] = useState("xtIi3zdsDB0"); 
  const [inputUrl, setInputUrl] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // YouTube URL se ID nikalne ka robust function
  const extractVideoID = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handlePlayVideo = () => {
    if (inputUrl.trim() !== "") {
      const id = extractVideoID(inputUrl);
      if (id) {
        setVideoUrl(id);
        setInputUrl(""); 
      } else {
        alert("Invalid Link! Please paste a correct YouTube URL.");
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-4 md:p-10 selection:bg-red-600/30">
      
      {/* Dynamic Background Effects */}
      <div className="fixed top-[-15%] left-[-10%] w-[60%] h-[60%] bg-red-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl space-y-10 relative z-10">
        
        {/* Advanced Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
             <Cpu size={14} className="text-red-600" />
             <span className="text-[10px] font-black tracking-[0.6em] text-zinc-500 uppercase">Neural Stream Interface</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter bg-gradient-to-b from-white via-white to-zinc-800 bg-clip-text text-transparent leading-none">
            VISION <span className="text-red-600">AI</span>
          </h1>
        </div>

        {/* --- PREMIUM PLAYER FRAME --- */}
        <div className="relative group max-w-4xl mx-auto w-full">
          {/* Outer Glow Wrapper */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-indigo-600/20 rounded-[2.2rem] md:rounded-[3.2rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-black aspect-video shadow-2xl">
            <iframe
              key={videoUrl}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&rel=0&modestbranding=1&hd=1`}
              title="Vision AI Stream"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          </div>
          
          {/* Scanner UI Elements */}
          <div className="absolute top-6 left-6 flex gap-2">
             <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
             <span className="text-[8px] font-bold uppercase tracking-widest text-white/40">Rec: Live_Stream</span>
          </div>
        </div>

        {/* --- INTERACTIVE INPUT BAR --- */}
        <div className="max-w-3xl mx-auto w-full space-y-6">
          <div className="flex flex-col md:flex-row gap-3 p-2 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[1.8rem] md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:border-red-600/20">
            <div className="flex items-center flex-1 px-6 py-4 md:py-0">
              <LinkIcon size={18} className="text-red-600 mr-4 shrink-0" />
              <input 
                className="w-full bg-transparent outline-none text-sm font-medium placeholder:text-zinc-700 text-white"
                placeholder="Paste new YouTube link to re-program..."
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePlayVideo()}
              />
            </div>
            <button 
              onClick={handlePlayVideo}
              className="w-full md:w-auto bg-white text-black font-black px-10 py-5 md:py-4 rounded-2xl md:rounded-full text-[10px] uppercase hover:bg-red-600 hover:text-white transition-all duration-500 flex items-center justify-center gap-2 active:scale-95 shadow-xl"
            >
              <MonitorPlay size={16} />
              Inject Link
            </button>
          </div>
          
          {/* Minimalist Tech Stats */}
          <div className="flex justify-between items-center px-8 opacity-40">
             <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-1 h-3 bg-red-600/50 rounded-full" />
                  <div className="w-1 h-5 bg-red-600 rounded-full" />
                  <div className="w-1 h-2 bg-red-600/30 rounded-full" />
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest">Signal Locked</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-[8px] font-black uppercase tracking-widest">Encryption: AES-256</span>
                <ShieldAlert size={12} className="text-zinc-400" />
             </div>
          </div>
        </div>

      </div>

      {/* Background HUD Decor */}
      <div className="fixed bottom-10 left-10 hidden md:block opacity-10">
         <p className="text-[10px] font-black tracking-[1em] uppercase vertical-text" style={{ writingMode: 'vertical-rl' }}>
           Vision_Core_Protocol_v4.2
         </p>
      </div>
    </div>
  );
}