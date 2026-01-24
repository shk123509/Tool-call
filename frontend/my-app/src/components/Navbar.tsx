"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';
import { LayoutDashboard, LogOut, Menu, X, Bot, User } from 'lucide-react';
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

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] backdrop-blur-md bg-gray-950/80 border-b border-white/5 px-4 md:px-10 py-3 flex items-center justify-between text-white shadow-2xl">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-9 md:h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-lg">J</div>
          <span className="text-xl font-black tracking-tighter">Job<span className="text-blue-500">AI</span></span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
          <Link href="/about" className={pathname === '/about' ? 'text-white' : 'hover:text-blue-400 transition'}>About</Link>
          <Link href="/features" className="hover:text-blue-400 transition">Features</Link>
          {isLoggedIn && <Link href="/chatbot" className="hover:text-blue-500 transition">Assistant</Link>}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl">
              <NavLink href="/dash" icon={<LayoutDashboard size={14}/>} active={pathname === '/dash'} label="Dash" />
              <NavLink href="/profiles" icon={<User size={14}/>} active={pathname === '/profiles'} label="Profile" />
              <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-500 transition-colors"><LogOut size={18} /></button>
            </div>
          ) : (
            <div className="hidden md:flex gap-4 items-center">
              <Link href="/sign-in" className="text-xs font-black uppercase tracking-widest hover:text-blue-400">Login</Link>
              <Link href="/sign-up" className="bg-blue-600 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition">Sign Up</Link>
            </div>
          )}

          {/* MOBILE TOGGLE */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 bg-white/5 rounded-xl border border-white/10">
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-[120] bg-gray-950 p-8 flex flex-col md:hidden">
            <div className="flex justify-between mb-12">
               <span className="font-black text-xl">JobAI</span>
               <button onClick={() => setIsMobileMenuOpen(false)}><X size={28}/></button>
            </div>
            <div className="flex flex-col gap-6">
              {isLoggedIn ? (
                <>
                  <Link href="/dash" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black">DASHBOARD</Link>
                  <Link href="/profiles" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-blue-500">MY PROFILE</Link>
                  <Link href="/chatbot" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black">AI CHAT</Link>
                  <button onClick={handleLogout} className="text-left text-2xl font-black text-red-500">LOGOUT</button>
                </>
              ) : (
                <>
                  <Link href="/sign-in" className="text-4xl font-black">LOGIN</Link>
                  <Link href="/sign-up" className="text-4xl font-black text-blue-600">JOIN NOW</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, icon, active, label }: any) {
  return (
    <Link href={href} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition ${active ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-gray-400'}`}>
      {icon} <span>{label}</span>
    </Link>
  );
}