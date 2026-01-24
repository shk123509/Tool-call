"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';
import { LayoutDashboard, LogOut, Menu, X, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout'); 
      if (res.ok) {
        logout(); 
        router.push('/sign-in'); 
      }
    } catch (error) { console.error("Logout error", error); }
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] backdrop-blur-md bg-gray-950/80 border-b border-white/5 px-4 md:px-10 py-3 flex items-center justify-between text-white shadow-2xl">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 md:w-9 md:h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-lg group-hover:rotate-12 transition-transform">J</div>
          <span className="text-xl font-black tracking-tighter">Job<span className="text-blue-500">AI</span></span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
          <Link href="/about" className={pathname === '/about' ? 'text-white' : 'hover:text-blue-400 transition'}>About</Link>
          <Link href="/features" className="hover:text-blue-400 transition">Features</Link>
          {/* MAGIC SECTION ADDED BACK */}
          <Link href="/pre" className={`${pathname === '/pre' ? 'text-blue-400' : 'hover:text-blue-400 transition'} flex items-center gap-1`}>
             <Sparkles size={12} /> Magic
          </Link>
          {isLoggedIn && <Link href="/chatbot" className="hover:text-blue-500 transition">Assistant</Link>}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl">
              <NavLink href="/dash" icon={<LayoutDashboard size={14}/>} active={pathname === '/dash'} label="Dash" />
              <NavLink href="/profiles" icon={<User size={14}/>} active={pathname === '/profiles'} label="Profile" />
              <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-500 transition-colors active:scale-90"><LogOut size={18} /></button>
            </div>
          ) : (
            <div className="hidden md:flex gap-4 items-center">
              <Link href="/sign-in" className="text-xs font-black uppercase tracking-widest hover:text-blue-400">Login</Link>
              <Link href="/sign-up" className="bg-blue-600 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">Sign Up</Link>
            </div>
          )}

          {/* MOBILE TOGGLE */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 bg-white/5 rounded-xl border border-white/10 active:scale-90 transition-all">
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeMenu} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110] md:hidden" />
            
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[120] w-[280px] bg-gray-950 border-l border-white/10 p-8 flex flex-col md:hidden"
            >
              <div className="flex justify-between items-center mb-10">
                 <span className="font-black text-xl tracking-tighter">Job<span className="text-blue-500">AI</span></span>
                 <button onClick={closeMenu} className="p-2 bg-white/5 rounded-full"><X size={20}/></button>
              </div>

              <div className="flex flex-col gap-6">
                <Link href="/about" onClick={closeMenu} className="text-sm font-black uppercase tracking-widest text-gray-400">About</Link>
                <Link href="/features" onClick={closeMenu} className="text-sm font-black uppercase tracking-widest text-gray-400">Features</Link>
                {/* MAGIC IN MOBILE MENU */}
                <Link href="/pre" onClick={closeMenu} className="text-sm font-black uppercase tracking-widest text-blue-400 flex items-center gap-2">
                   <Sparkles size={16} /> Magic Section
                </Link>

                <div className="h-px bg-white/5 my-2" />

                {isLoggedIn ? (
                  <>
                    <Link href="/dash" onClick={closeMenu} className="flex items-center gap-3 text-lg font-black text-white italic">
                      <LayoutDashboard size={20} className="text-blue-500"/> DASHBOARD
                    </Link>
                    <Link href="/profiles" onClick={closeMenu} className="flex items-center gap-3 text-lg font-black text-white italic">
                      <User size={20} className="text-blue-500"/> MY PROFILE
                    </Link>
                    <Link href="/chatbot" onClick={closeMenu} className="flex items-center gap-3 text-lg font-black text-white italic">
                      <Bot size={20} className="text-blue-500"/> AI ASSISTANT
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-3 text-lg font-black text-red-500 italic mt-4">
                      <LogOut size={20}/> LOGOUT SESSION
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/sign-in" onClick={closeMenu} className="text-2xl font-black">LOGIN</Link>
                    <Link href="/sign-up" onClick={closeMenu} className="text-2xl font-black text-blue-600">JOIN NOW</Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, icon, active, label }: any) {
  return (
    <Link href={href} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition ${active ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'hover:bg-white/5 text-gray-400'}`}>
      {icon} <span>{label}</span>
    </Link>
  );
}