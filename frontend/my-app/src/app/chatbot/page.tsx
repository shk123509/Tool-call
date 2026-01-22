"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, MessageSquare, Plus, Trash2, Menu, Key as KeyIcon, LayoutDashboard, X, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

export default function JobAIDashboard() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userApiKey, setUserApiKey] = useState('');
  const [isKeyValid, setIsKeyValid] = useState(false);
  const scrollRef = useRef(null);

  // --- Reset API Key Function ---
  const handleResetKey = () => {
    localStorage.removeItem('user_gemini_key');
    setIsKeyValid(false);
    setUserApiKey('');
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const createNewChat = () => {
    const newId = Date.now();
    const newChat = { id: newId, title: 'New Conversation', messages: [] };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newId);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const deleteChat = (id, e) => {
    e.stopPropagation();
    const updated = chats.filter(c => c.id !== id);
    setChats(updated);
    if (activeChatId === id && updated.length > 0) {
      setActiveChatId(updated[0].id);
    } else if (updated.length === 0) {
      createNewChat();
    }
  };

  useEffect(() => {
    const savedChats = localStorage.getItem('job_ai_history');
    const savedKey = localStorage.getItem('user_gemini_key');
    
    if (savedKey && savedKey.startsWith('AIza')) {
      setUserApiKey(savedKey);
      setIsKeyValid(true);
    }
    if (savedChats) {
      const parsed = JSON.parse(savedChats);
      if (parsed.length > 0) {
        setChats(parsed);
        setActiveChatId(parsed[0].id);
      } else { createNewChat(); }
    } else { createNewChat(); }

    if (window.innerWidth >= 768) setIsSidebarOpen(true);
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('job_ai_history', JSON.stringify(chats));
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats]);

  const saveKey = () => {
    const cleanKey = userApiKey.trim();
    if (cleanKey.startsWith('AIza')) {
      localStorage.setItem('user_gemini_key', cleanKey);
      setIsKeyValid(true);
    } else { alert("Arey bhai, sahi API key toh daalo!"); }
  };

  // --- Main Message Handler with Error Management ---
  const handleSendMessage = async () => {
    const currentKey = localStorage.getItem('user_gemini_key') || userApiKey;
    if (!input.trim() || isLoading || !currentKey) return;
    
    const currentId = activeChatId;
    const userMsg = { role: 'user', content: input };
    
    setChats(prev => prev.map(chat => {
      if (chat.id === currentId) {
        const newTitle = chat.messages.length === 0 ? input.substring(0, 30) : chat.title;
        return { ...chat, title: newTitle, messages: [...chat.messages, userMsg] };
      }
      return chat;
    }));
    
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, api_key: currentKey.trim() }),
      });

      const data = await response.json();

      // Check if Quota Exhausted (429)
      if (response.status === 429 || (data.reply && data.reply.includes("RESOURCE_EXHAUSTED"))) {
        throw new Error("QUOTA_LIMIT");
      }

      setChats(prev => prev.map(chat => 
        chat.id === currentId ? { ...chat, messages: [...chat.messages, { role: 'bot', content: data.reply }] } : chat
      ));

    } catch (error) {
      let errorMessage = "⚠️ Error: Connection lost with AI.";
      
      if (error.message === "QUOTA_LIMIT") {
        errorMessage = "🛑 **QUOTA EXCEEDED:** This API key has exhausted its daily free limit. Please **Reset API Key** from the sidebar and use a new one or get a billing-enabled key to continue.";
      }

      setChats(prev => prev.map(chat => 
        chat.id === currentId ? { ...chat, messages: [...chat.messages, { role: 'bot', content: errorMessage }] } : chat
      ));
    } finally { 
      setIsLoading(false); 
    }
  };

  const activeChat = chats.find(c => c.id === activeChatId) || { messages: [] };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-200 overflow-hidden font-sans pt-16 relative">
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? (typeof window !== 'undefined' && window.innerWidth < 768 ? '85%' : 280) : (typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : 80),
          x: isSidebarOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? -300 : 0)
        }}
        className="fixed md:relative z-40 h-full bg-[#171717] border-r border-white/5 flex flex-col transition-all duration-300 ease-in-out justify-between p-3"
      >
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden md:flex absolute -right-3 top-6 bg-indigo-600 rounded-full p-1 border border-white/10 z-50">
          {isSidebarOpen ? <ChevronLeft size={14}/> : <ChevronRight size={14}/>}
        </button>

        <div className="flex flex-col flex-1 overflow-hidden">
            <div className={`flex items-center ${isSidebarOpen ? 'justify-between px-3' : 'justify-center'} mb-6 mt-2`}>
               {isSidebarOpen && <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">History</p>}
               {!isSidebarOpen && <MessageSquare size={18} className="text-gray-500"/>}
               {isSidebarOpen && <X size={20} className="md:hidden text-gray-400" onClick={() => setIsSidebarOpen(false)}/>}
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
              {chats.map(chat => (
                <div key={chat.id} onClick={() => { setActiveChatId(chat.id); if(window.innerWidth < 768) setIsSidebarOpen(false); }} className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${activeChatId === chat.id ? 'bg-white/10 text-white shadow-sm' : 'hover:bg-white/5 text-gray-400'}`}>
                  <MessageSquare size={18} className="shrink-0 opacity-50" />
                  {isSidebarOpen && <span className="flex-1 text-sm truncate">{chat.title}</span>}
                  {isSidebarOpen && <Trash2 size={14} className="opacity-0 group-hover:opacity-100 hover:text-red-400" onClick={(e) => deleteChat(chat.id, e)} />}
                </div>
              ))}
            </div>
        </div>

        <div className="mt-auto pt-4 border-t border-white/5 space-y-2 pb-4">
            <button onClick={createNewChat} className={`flex items-center gap-3 w-full p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white shadow-lg active:scale-95 ${!isSidebarOpen && 'justify-center'}`}>
                <Plus size={20} />
                {isSidebarOpen && <span className="text-sm">New Chat</span>}
            </button>

            <Link href="/dash" className={`flex items-center gap-3 w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 ${!isSidebarOpen && 'justify-center'}`}>
                <LayoutDashboard size={20} className="text-indigo-400" />
                {isSidebarOpen && <span className="text-xs font-bold text-white">Dashboard</span>}
            </Link>

            <button onClick={handleResetKey} className={`flex items-center gap-3 w-full p-3 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 transition-all ${!isSidebarOpen && 'justify-center'}`}>
                <KeyIcon size={20} className="text-red-400" />
                {isSidebarOpen && <span className="text-xs font-bold text-red-400">Reset API Key</span>}
            </button>
        </div>
      </motion.aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-[#212121] relative min-w-0">
        
        {!isKeyValid && (
          <div className="absolute inset-0 z-50 bg-[#212121]/95 backdrop-blur-xl flex items-center justify-center p-6 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-sm w-full bg-[#171717] p-8 rounded-[2rem] border border-white/10 shadow-2xl">
              <KeyIcon size={40} className="text-indigo-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-6 text-white">Setup Gemini</h2>
              <input type="password" value={userApiKey} onChange={(e) => setUserApiKey(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 mb-4 outline-none text-center text-indigo-400 font-mono" placeholder="Paste Key Here..." />
              <button onClick={saveKey} className="w-full bg-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">Unlock AI</button>
            </motion.div>
          </div>
        )}

        <header className="h-16 border-b border-white/5 flex items-center px-4 md:px-6 bg-[#171717]/50 justify-between backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg text-indigo-400 border border-white/5">
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
              
              {/* Conditional Styling for Quota Errors */}
              <div className={`max-w-[88%] md:max-w-[85%] p-3 md:p-4 rounded-2xl ${
                msg.role === 'user' 
                ? 'bg-indigo-600/10 border border-indigo-500/20 shadow-sm' 
                : msg.content.includes("QUOTA EXCEEDED") 
                  ? 'bg-red-500/10 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]' 
                  : 'bg-white/5 border border-white/10 shadow-sm'
              }`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-invert prose-xs md:prose-sm max-w-none break-words text-gray-100 font-sans">
                  {msg.content}
                </ReactMarkdown>
                
                {msg.content.includes("QUOTA EXCEEDED") && (
                   <button onClick={handleResetKey} className="mt-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-500 transition-all">
                      <AlertCircle size={12}/> Fix Now
                   </button>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && <div className="flex items-center gap-2 text-indigo-400 text-xs animate-pulse ml-12 font-bold tracking-tighter">Thinking...</div>}
        </div>

        {/* Input Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-8 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent">
          <div className="max-w-4xl mx-auto flex items-end gap-2 bg-[#171717] p-2 rounded-2xl border border-white/10 shadow-2xl focus-within:border-indigo-500/50">
            <textarea 
              rows={1} className="flex-1 bg-transparent p-3 outline-none resize-none text-xs md:text-sm text-white min-h-[44px]"
              value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage} className="bg-indigo-600 p-3 rounded-xl hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-500/20 shrink-0"><Send size={18}/></button>
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