"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';
import { LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // Current page check karne ke liye

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

  return (
    <nav className="fixed top-0 w-full z-[100] backdrop-blur-md bg-gray-900/90 border-b border-white/5 px-6 md:px-10 py-4 flex items-center justify-between text-white shadow-xl">
      
      {/* --- Left Side: Logo --- */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-lg">
          J
        </div>
        <Link href="/" className="text-xl font-black tracking-tighter hover:text-blue-400 transition">
          Job<span className="text-blue-500">AI</span>
        </Link>
      </div>

      {/* --- Center: Navigation (Desktop Only) --- */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
        <Link href="/about" className={`${pathname === '/' ? 'text-white' : 'hover:text-white transition'}`}>About</Link>
        <Link href="/features" className="hover:text-white transition">Features</Link>
        {isLoggedIn && (
           <Link href="/chatbot" className={`${pathname === '/chatbot' ? 'text-blue-400 font-bold' : 'hover:text-white transition'}`}>
             Assistant
           </Link>
        )}
      </div>

      {/* --- Right Side: Actions --- */}
      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <Link href="/sign-in" className="text-sm font-semibold hover:text-blue-400 transition">
              Login
            </Link>
            <Link href="/sign-up" className="bg-blue-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              Sign Up
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            {/* Dashboard Button */}
            <Link 
              href="/dash" 
              className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/10 transition"
            >
              <LayoutDashboard size={16} className="text-blue-400" />
              <span>Dashboard</span>
            </Link>

            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="p-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all group"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}