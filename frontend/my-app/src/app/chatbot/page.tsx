"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Bot,
  User,
  MessageSquare,
  Plus,
  Trash2,
  Menu,
  Key as KeyIcon,
  LayoutDashboard,
  X,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

/* =======================
   TYPES
======================= */
type Message = {
  role: "user" | "bot";
  content: string;
};

type Chat = {
  id: number;
  title: string;
  messages: Message[];
};

export default function JobAIDashboard() {
  /* =======================
     STATE
  ======================= */
  const [mounted, setMounted] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [userApiKey, setUserApiKey] = useState<string>("");
  const [isKeyValid, setIsKeyValid] = useState<boolean>(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  /* =======================
     HELPERS
  ======================= */
  const handleResetKey = () => {
    localStorage.removeItem("user_gemini_key");
    setIsKeyValid(false);
    setUserApiKey("");
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const createNewChat = () => {
    const newId = Date.now();
    const newChat: Chat = {
      id: newId,
      title: "New Conversation",
      messages: [],
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newId);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const deleteChat = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = chats.filter((c) => c.id !== id);
    setChats(updated);
    if (activeChatId === id && updated.length > 0) {
      setActiveChatId(updated[0].id);
    } else if (updated.length === 0) {
      createNewChat();
    }
  };

  /* =======================
     EFFECTS
  ======================= */
  useEffect(() => {
    setMounted(true);
    const savedChats = localStorage.getItem("job_ai_history");
    const savedKey = localStorage.getItem("user_gemini_key");

    if (savedKey && savedKey.startsWith("AIza")) {
      setUserApiKey(savedKey);
      setIsKeyValid(true);
    }

    if (savedChats) {
      const parsed: Chat[] = JSON.parse(savedChats);
      if (parsed.length > 0) {
        setChats(parsed);
        setActiveChatId(parsed[0].id);
      } else {
        createNewChat();
      }
    } else {
      createNewChat();
    }
    
    if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    if (mounted && chats.length > 0) {
      localStorage.setItem("job_ai_history", JSON.stringify(chats));
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats, mounted]);

  const saveKey = () => {
    const cleanKey = userApiKey.trim();
    if (cleanKey.startsWith("AIza")) {
      localStorage.setItem("user_gemini_key", cleanKey);
      setIsKeyValid(true);
    } else {
      alert("Bhai valid Gemini API key daal 😅");
    }
  };

  const handleSendMessage = async () => {
    const currentKey = localStorage.getItem("user_gemini_key") || userApiKey;
    if (!input.trim() || isLoading || !activeChatId) return;
    if (!currentKey) { setIsKeyValid(false); return; }

    const userMsg: Message = { role: "user", content: input };
    const currentId = activeChatId;

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentId
          ? {
              ...chat,
              title: chat.messages.length === 0 ? input.substring(0, 30) : chat.title,
              messages: [...chat.messages, userMsg],
            }
          : chat
      )
    );

    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          api_key: currentKey.trim(),
        }),
      });

      const data = await response.json();

      if (response.status === 400 || (data.reply && data.reply.includes("400"))) throw new Error("INVALID_API_KEY");
      if (response.status === 429 || (data.reply && data.reply.includes("429"))) throw new Error("QUOTA_LIMIT");

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentId
            ? { ...chat, messages: [...chat.messages, { role: "bot", content: data.reply }] }
            : chat
        )
      );
    } catch (error: any) {
      let errorMessage = "⚠️ Error connecting to AI.";
      if (error.message === "INVALID_API_KEY") {
        errorMessage = "❌ **INVALID API KEY:** Reset and enter a valid key.";
        setTimeout(() => setIsKeyValid(false), 3000);
      } else if (error.message === "QUOTA_LIMIT") {
        errorMessage = "API_QUOTA_EXCEEDED_SIGNAL";
      }

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentId
            ? { ...chat, messages: [...chat.messages, { role: "bot", content: errorMessage }] }
            : chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  const activeChat: Chat = chats.find((c) => c.id === activeChatId) || { id: 0, title: "", messages: [] };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-200 overflow-hidden font-sans pt-16 relative">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? (window.innerWidth < 768 ? '85%' : 280) : (window.innerWidth < 768 ? 0 : 80),
          x: isSidebarOpen ? 0 : (window.innerWidth < 768 ? -300 : 0)
        }}
        className="fixed md:relative z-40 h-full bg-[#171717] border-r border-white/5 flex flex-col transition-all duration-300 ease-in-out p-3"
      >
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden md:flex absolute -right-3 top-6 bg-indigo-600 rounded-full p-1 border border-white/10 z-50">
          {isSidebarOpen ? <ChevronLeft size={14}/> : <ChevronRight size={14}/>}
        </button>

        {/* Sidebar Header & History */}
        <div className="flex flex-col flex-1 overflow-hidden">
            <div className={`flex items-center ${isSidebarOpen ? 'justify-between px-3' : 'justify-center'} mb-6 mt-2`}>
               {isSidebarOpen && <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">History</p>}
               {!isSidebarOpen && <MessageSquare size={18} className="text-gray-500"/>}
               {isSidebarOpen && <X size={20} className="md:hidden text-gray-400" onClick={() => setIsSidebarOpen(false)}/>}
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-1">
              {chats.map(chat => (
                <div key={chat.id} onClick={() => { setActiveChatId(chat.id); if(window.innerWidth < 768) setIsSidebarOpen(false); }} className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${activeChatId === chat.id ? 'bg-white/10 text-white shadow-sm' : 'hover:bg-white/5 text-gray-400'}`}>
                  <MessageSquare size={18} className="shrink-0 opacity-50" />
                  {isSidebarOpen && <span className="flex-1 text-sm truncate">{chat.title}</span>}
                  {isSidebarOpen && <Trash2 size={14} className="opacity-0 group-hover:opacity-100 hover:text-red-400" onClick={(e) => deleteChat(chat.id, e)} />}
                </div>
              ))}
            </div>
        </div>

        {/* Action Buttons - Moved Reset Key Higher */}
        <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
            <button onClick={createNewChat} className={`flex items-center gap-3 w-full p-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white shadow-lg active:scale-95 transition-all ${!isSidebarOpen && 'justify-center'}`}>
                <Plus size={20} />
                {isSidebarOpen && <span className="text-sm">New Chat</span>}
            </button>

            {/* RESET BUTTON MOVED HERE FOR MOBILE VISIBILITY */}
            <button onClick={handleResetKey} className={`flex items-center gap-3 w-full p-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all active:scale-95 ${!isSidebarOpen && 'justify-center'}`}>
                <KeyIcon size={20} className="text-red-400" />
                {isSidebarOpen && <span className="text-xs font-black uppercase tracking-tight text-red-400">Reset API Key</span>}
            </button>

            <Link href="/dash" className={`flex items-center gap-3 w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all ${!isSidebarOpen && 'justify-center'}`}>
                <LayoutDashboard size={20} className="text-indigo-400" />
                {isSidebarOpen && <span className="text-xs font-bold text-white">Dashboard</span>}
            </Link>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col bg-[#212121] relative min-w-0">
        {!isKeyValid && (
          <div className="absolute inset-0 z-50 bg-[#212121]/95 backdrop-blur-xl flex items-center justify-center p-6 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-sm w-full bg-[#171717] p-8 rounded-[2rem] border border-white/10 shadow-2xl">
              <KeyIcon size={40} className="text-indigo-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-white">Setup Gemini</h2>
              <input type="password" value={userApiKey} onChange={(e) => setUserApiKey(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 mb-4 outline-none text-center text-indigo-400 font-mono" placeholder="AIza..." />
              <button onClick={saveKey} className="w-full bg-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg mb-4 active:scale-95 transition-transform">Unlock AI</button>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-[10px] uppercase font-black tracking-widest text-indigo-400 hover:text-white transition-colors">How to get a key?</a>
            </motion.div>
          </div>
        )}

        <header className="h-16 border-b border-white/5 flex items-center px-4 md:px-6 bg-[#171717]/50 justify-between backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg text-indigo-400 border border-white/5 transition-colors">
                <Menu size={20} />
             </button>
             <h2 className="font-bold text-xs md:text-sm truncate max-w-[150px] md:max-w-md">{activeChat.title}</h2>
          </div>
          <div className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md uppercase tracking-widest">Online</div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-8 md:px-20 lg:px-40 xl:px-60 space-y-6 custom-scrollbar pb-32">
          {activeChat.messages.map((msg, i) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-emerald-600'}`}>
                {msg.role === 'user' ? <User size={16}/> : <Bot size={16}/>}
              </div>
              
              <div className={`max-w-[88%] md:max-w-[85%] p-3 md:p-4 rounded-2xl ${
                msg.role === 'user' ? 'bg-indigo-600/10 border border-indigo-500/20' : msg.content === "API_QUOTA_EXCEEDED_SIGNAL" ? 'bg-red-500/10 border border-red-500/30 shadow-lg' : 'bg-white/5 border border-white/10'
              }`}>
                {msg.content === "API_QUOTA_EXCEEDED_SIGNAL" ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-red-400 font-bold uppercase tracking-tighter text-sm">
                      <AlertCircle size={18}/> Quota Exceeded
                    </div>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed">Limit reached. Use vault or create your own key.</p>
                    <div className="flex flex-wrap gap-2">
                      <Link href="/dash" className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md active:scale-95">
                        Vault Keys
                      </Link>
                      <a href="https://aistudio.google.com/welcome" target="_blank" className="flex items-center gap-2 bg-white/10 text-white border border-white/10 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95">
                        Create Key
                      </a>
                    </div>
                  </div>
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-invert prose-xs md:prose-sm max-w-none break-words text-gray-100 font-sans">
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && <div className="flex items-center gap-2 text-indigo-400 text-xs animate-pulse ml-12 font-bold tracking-tighter">Thinking...</div>}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-8 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent">
          <div className="max-w-4xl mx-auto flex items-end gap-2 bg-[#171717] p-2 rounded-2xl border border-white/10 shadow-2xl focus-within:border-indigo-500/50 transition-all">
            <textarea 
              rows={1} className="flex-1 bg-transparent p-3 outline-none resize-none text-xs md:text-sm text-white min-h-[44px]"
              value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage} className="bg-indigo-600 p-3 rounded-xl hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-500/20 shrink-0 transition-all"><Send size={18}/></button>
          </div>
        </div>
      </main>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
      `}</style>
    </div>
  );
}