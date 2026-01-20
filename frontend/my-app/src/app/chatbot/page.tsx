"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, MessageSquare, Plus, Trash2, Menu, Key as KeyIcon, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

export default function JobAIDashboard() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userApiKey, setUserApiKey] = useState('');
  const [isKeyValid, setIsKeyValid] = useState(false);
  const scrollRef = useRef(null);

  // 1. Create New Chat
  const createNewChat = () => {
    const newId = Date.now();
    const newChat = { id: newId, title: 'New Conversation', messages: [] };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newId);
  };

  // 2. Delete Chat
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

  // Load Data on Start
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
      } else {
        createNewChat();
      }
    } else {
      createNewChat();
    }
  }, []);

  // Auto-scroll and Sync LocalStorage
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
      setUserApiKey(cleanKey);
      setIsKeyValid(true);
    } else {
      alert("Please enter a valid Gemini API Key (starts with AIza)");
    }
  };

  const handleSendMessage = async () => {
    // FIX: Get latest key from storage to avoid "Missing Key" error
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
    
    const messageContent = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            message: messageContent, 
            api_key: currentKey.trim() 
        }),
      });

      const data = await response.json();
      
      setChats(prev => prev.map(chat => 
        chat.id === currentId ? { ...chat, messages: [...chat.messages, { role: 'bot', content: data.reply }] } : chat
      ));
    } catch (error) {
      setChats(prev => prev.map(chat => 
        chat.id === currentId ? { ...chat, messages: [...chat.messages, { role: 'bot', content: "⚠️ Error: Backend not responding." }] } : chat
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const activeChat = chats.find(c => c.id === activeChatId) || { messages: [] };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-200 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed md:relative md:translate-x-0 z-40 w-72 h-full bg-[#171717] border-r border-white/5 transition-transform duration-300 flex flex-col p-3`}>
        <button onClick={createNewChat} className="flex items-center gap-3 w-full p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all mb-6 font-bold text-sm text-white shadow-lg">
          <Plus size={18} /> New Chat
        </button>

        <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar mb-4">
          <p className="text-[10px] uppercase font-bold text-gray-500 px-3 mb-2 tracking-widest">History</p>
          {chats.map(chat => (
            <div key={chat.id} onClick={() => setActiveChatId(chat.id)} className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${activeChatId === chat.id ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400'}`}>
              <MessageSquare size={16} className="shrink-0 opacity-50" />
              <span className="flex-1 text-sm truncate">{chat.title}</span>
              <Trash2 size={14} className="opacity-0 group-hover:opacity-100 hover:text-red-400" onClick={(e) => deleteChat(chat.id, e)} />
            </div>
          ))}
        </div>

        {/* Sidebar Bottom: Dashboard & Reset Section */}
        <div className="space-y-2 mt-auto">
            {/* Dashboard Link */}
            <Link href="/dash" className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                <div className="bg-indigo-500/20 p-2 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
                    <LayoutDashboard size={18} className="text-indigo-400" />
                </div>
                <div>
                    <p className="text-xs font-bold text-white">Main Dashboard</p>
                    <p className="text-[10px] text-gray-500">View your stats</p>
                </div>
            </Link>

            {/* Reset Key Button */}
            <button 
                onClick={() => { localStorage.removeItem('user_gemini_key'); setIsKeyValid(false); setUserApiKey(''); }}
                className="flex items-center gap-3 w-full p-3 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-all group"
            >
                <div className="bg-red-500/20 p-2 rounded-lg">
                    <KeyIcon size={18} className="text-red-400" />
                </div>
                <div className="text-left">
                    <p className="text-xs font-bold text-red-400">Restart API Key</p>
                    <p className="text-[10px] text-gray-600">Click to reset access</p>
                </div>
            </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-[#212121] relative min-w-0">
        
        {/* Lock Overlay */}
        {!isKeyValid && (
          <div className="absolute inset-0 z-50 bg-[#212121]/95 backdrop-blur-xl flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-sm w-full bg-[#171717] p-8 rounded-[2rem] border border-white/10 shadow-2xl text-center">
              <KeyIcon size={40} className="text-indigo-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Setup Required</h2>
              <p className="text-gray-400 text-sm mb-6">Enter your Gemini API Key to use the Assistant.</p>
              <input 
                type="password" value={userApiKey} onChange={(e) => setUserApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 mb-4 focus:border-indigo-500 outline-none text-indigo-400 font-mono text-center"
              />
              <button onClick={saveKey} className="w-full bg-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-500/20">Unlock Assistant</button>
            </motion.div>
          </div>
        )}

        {/* Chat Header */}
        <header className="h-16 border-b border-white/5 flex items-center px-6 bg-[#171717]/50 justify-between backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 hover:bg-white/5 rounded-lg"><Menu size={20} /></button>
             <h2 className="font-bold text-sm truncate max-w-[200px] md:max-w-md">{activeChat.title}</h2>
          </div>
          <div className="flex items-center gap-2">
             <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md uppercase tracking-widest">Online</span>
          </div>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-8 md:px-20 lg:px-40 xl:px-60 space-y-6 custom-scrollbar">
          {activeChat.messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30 mt-20">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <Bot size={32} />
                </div>
                <p className="text-sm">Hello Ankit! How can I help you with your jobs today?</p>
            </div>
          )}
          {activeChat.messages.map((msg, i) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-emerald-600'}`}>
                {msg.role === 'user' ? <User size={16}/> : <Bot size={16}/>}
              </div>
              <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600/10 border border-indigo-500/20' : 'bg-white/5 border border-white/10'}`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-invert prose-sm max-w-none">
                  {msg.content}
                </ReactMarkdown>
              </div>
            </motion.div>
          ))}
          {isLoading && <div className="flex items-center gap-3 text-indigo-400 text-xs animate-pulse ml-12 font-bold uppercase tracking-tighter"><Loader2 className="animate-spin" size={14}/>Thinking...</div>}
        </div>

        {/* Input */}
        <div className="p-4 md:p-8 bg-gradient-to-t from-[#0a0a0a] to-transparent">
          <div className="max-w-4xl mx-auto flex items-end gap-3 bg-[#171717] p-2 rounded-2xl border border-white/10 shadow-2xl focus-within:border-indigo-500/50 transition-all">
            <textarea 
              rows="1" className="flex-1 bg-transparent p-3 outline-none resize-none text-sm text-white"
              value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}}
              placeholder="Ask me about jobs, trains, or search the web..."
            />
            <button onClick={handleSendMessage} className="bg-indigo-600 p-3 rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-500/20"><Send size={18}/></button>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .prose a { color: #818cf8; text-decoration: underline; }
        .prose strong { color: #fff; }
      `}</style>
    </div>
  );
}