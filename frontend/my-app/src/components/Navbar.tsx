"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';
import { LayoutDashboard, LogOut, Menu, X, Bot } from 'lucide-react';
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
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  // Mobile menu links close karne ke liye helper
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] backdrop-blur-md bg-gray-900/90 border-b border-white/5 px-4 md:px-10 py-4 flex items-center justify-between text-white shadow-xl">
        
        {/* --- Left Side: Logo --- */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-lg">
            J
          </div>
          <Link href="/" className="text-xl font-black tracking-tighter hover:text-blue-400 transition">
            Job<span className="text-blue-500">AI</span>
          </Link>
        </div>

        {/* --- Center: Desktop Navigation --- */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/about" className={`${pathname === '/about' ? 'text-white' : 'hover:text-white transition'}`}>About</Link>
          <Link href="/features" className="hover:text-white transition">Features</Link>
          <Link href="/pre" className="hover:text-white transition">Magic</Link>
          {isLoggedIn && (
             <Link href="/chatbot" className={`${pathname === '/chatbot' ? 'text-blue-400 font-bold' : 'hover:text-white transition'}`}>
               Assistant
             </Link>
          )}
        </div>

        {/* --- Right Side: Desktop Actions & Mobile Toggle --- */}
        <div className="flex items-center gap-3">
          {/* Desktop Only Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link href="/sign-in" className="text-sm font-semibold hover:text-blue-400 transition">Login</Link>
                <Link href="/sign-up" className="bg-blue-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-lg">Sign Up</Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/dash" className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/10 transition">
                  <LayoutDashboard size={16} className="text-blue-400" />
                  <span>Dashboard</span>
                </Link>
                <button onClick={handleLogout} className="p-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><LogOut size={18} /></button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button (Always visible on small screens) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white bg-white/5 rounded-lg border border-white/10"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* --- Mobile Sidebar Overlay (Drawer) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] md:hidden"
            />
            
            {/* Drawer Content */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[280px] bg-gray-950 border-l border-white/10 z-[120] p-6 md:hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-lg font-bold text-blue-500">Navigation</span>
                <button onClick={closeMenu} className="p-2 bg-white/5 rounded-full"><X size={20}/></button>
              </div>

              <div className="flex flex-col gap-6">
                <Link href="/about" onClick={closeMenu} className="text-lg font-medium text-gray-300 hover:text-white">About</Link>
                <Link href="/features" onClick={closeMenu} className="text-lg font-medium text-gray-300 hover:text-white">Features</Link>
                {isLoggedIn && (
                  <Link href="/chatbot" onClick={closeMenu} className="text-lg font-medium text-blue-400 flex items-center gap-2">
                    <Bot size={20} /> AI Assistant
                  </Link>
                )}
              </div>

              <div className="mt-auto flex flex-col gap-4 border-t border-white/10 pt-6">
                {!isLoggedIn ? (
                  <>
                    <Link href="/sign-in" onClick={closeMenu} className="w-full text-center py-3 font-semibold text-gray-300 border border-white/10 rounded-xl">Login</Link>
                    <Link href="/sign-up" onClick={closeMenu} className="w-full text-center py-3 font-bold bg-blue-600 rounded-xl">Sign Up</Link>
                  </>
                ) : (
                  <>
                    <Link href="/dash" onClick={closeMenu} className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 border border-white/10 rounded-xl font-bold">
                      <LayoutDashboard size={18} className="text-blue-400" /> Dashboard
                    </Link>
                    <button onClick={() => { handleLogout(); closeMenu(); }} className="flex items-center justify-center gap-2 w-full py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-bold">
                      <LogOut size={18} /> Logout
                    </button>
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