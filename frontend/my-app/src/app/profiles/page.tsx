"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  User, Mail, Shield, Zap, Settings, LogOut, 
  CheckCircle, Loader2, Lock, Edit3, Key, Save,
  Fingerprint, ShieldCheck, Cpu, RefreshCcw, 
  ShieldAlert, Trash2, Activity, Globe, ZapOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // States
  const [updateLoading, setUpdateLoading] = useState(false);
  const [editData, setEditData] = useState({ username: '', email: '' });
  const [passLoading, setPassLoading] = useState(false);
  const [passData, setPassData] = useState({ oldPassword: '', Newpassword: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/me');
      if (response.data?.data) {
        setUser(response.data.data);
        setEditData({ 
          username: response.data.data.username, 
          email: response.data.data.email 
        });
      }
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  // --- API HANDLERS ---
  const handleUpdate = async () => {
    try {
      setUpdateLoading(true);
      const response = await axios.post('/api/updateUser', editData);
      if (response.data.message === "Profiles Updates success") {
        setMessage({ type: 'success', text: 'Profile synced!' });
        fetchUserData();
      }
    } catch (err: any) { setMessage({ type: 'error', text: 'Update failed' }); }
    finally { setUpdateLoading(false); setTimeout(() => setMessage({ type: '', text: '' }), 3000); }
  };

  const handlePasswordChange = async () => {
    try {
      setPassLoading(true);
      const response = await axios.post('/api/change-password', passData);
      if (response.data.message === "Password changes success") {
        setMessage({ type: 'success', text: 'Password rotated!' });
        setPassData({ oldPassword: '', Newpassword: '' });
      }
    } catch (err: any) { setMessage({ type: 'error', text: 'Auth error' }); }
    finally { setPassLoading(false); setTimeout(() => setMessage({ type: '', text: '' }), 3000); }
  };

  const handleLogout = async () => {
    try {
      window.location.href = '/sign-in'; 
    } catch (err) { console.error("Logout failed"); }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
      <Loader2 className="text-blue-600 animate-spin" size={40} />
    </div>
  );

  const sidebarItems = [
    { id: 'overview', label: 'Identity & Stats', icon: <Fingerprint size={18}/> },
    { id: 'edit', label: 'Modifications', icon: <Edit3 size={18}/> },
    { id: 'password', label: 'Encryption', icon: <Lock size={18}/> },
    { id: 'security', label: 'Danger Zone', icon: <ShieldAlert size={18}/> },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 pt-24 md:pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] backdrop-blur-md relative overflow-hidden">
           <AnimatePresence>
            {message.text && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className={`absolute top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest z-50 whitespace-nowrap ${
                  message.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl md:rounded-3xl flex items-center justify-center text-white text-2xl md:text-4xl font-black shadow-2xl">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-black text-white tracking-tighter">@{user?.username}</h1>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-[8px] md:text-[9px] font-black bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded border border-blue-500/20 uppercase tracking-tighter">Pro Member</span>
                <span className="text-[8px] md:text-[9px] font-black bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-tighter italic">Verified Node</span>
              </div>
            </div>
          </div>

          <button onClick={handleLogout} className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl md:rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95">
             <LogOut size={16}/> Logout Session
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          
          {/* SIDEBAR NAVIGATION (Responsive Horizontal Scroll on Mobile) */}
          <div className="lg:col-span-3 h-fit lg:sticky lg:top-32">
            <p className="hidden lg:block text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 ml-4 italic">Core Terminal</p>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
              {sidebarItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => setActiveTab(item.id)}
                  className={`flex-shrink-0 flex items-center gap-3 px-5 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all whitespace-nowrap text-xs md:text-sm ${
                    activeTab === item.id 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-slate-500 hover:bg-white/5 bg-[#0a0a0a] lg:bg-transparent border border-white/5 lg:border-none'
                  }`}
                >
                  {item.icon} <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-9 space-y-6 md:space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6 md:space-y-8">
                   {/* STATS GRID */}
                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                      <StatCard title="Total Uptime" value="99.9%" icon={<Activity size={20} className="text-emerald-500"/>} />
                      <StatCard title="API Requests" value="12,402" icon={<Cpu size={20} className="text-blue-500"/>} />
                      <StatCard title="Global Rank" value="#482" icon={<Globe size={20} className="text-indigo-500"/>} />
                   </div>

                   <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10">
                      <h2 className="text-xl md:text-2xl font-black text-white mb-6 md:mb-8 tracking-tighter underline underline-offset-8 decoration-blue-600">Identity Cache</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                         <DataDisplay label="Full Username" value={user?.username} />
                         <DataDisplay label="System Email" value={user?.email} />
                         <DataDisplay label="Auth Status" value={user?.isVerified ? "Authenticated" : "Unverified"} highlight />
                         <DataDisplay label="Node UID" value={user?._id} />
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'edit' && (
                <motion.div key="edit" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10">
                   <h2 className="text-xl md:text-2xl font-black text-white mb-6 md:mb-8">System Modifications</h2>
                   <div className="space-y-6 max-w-xl">
                      <InputField label="Update Username" value={editData.username} onChange={(v) => setEditData({...editData, username: v})} />
                      <InputField label="Update Email" value={editData.email} onChange={(v) => setEditData({...editData, email: v})} />
                      <button onClick={handleUpdate} disabled={updateLoading} className="w-full bg-blue-600 hover:bg-blue-700 py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50">
                         {updateLoading ? <Loader2 className="animate-spin" size={18}/> : <RefreshCcw size={18}/>} Commit Changes
                      </button>
                   </div>
                </motion.div>
              )}

              {activeTab === 'password' && (
                <motion.div key="password" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10">
                   <h2 className="text-xl md:text-2xl font-black text-red-500 mb-6 md:mb-8 tracking-tighter italic">Rotate Access Keys</h2>
                   <div className="space-y-6 max-w-xl">
                      <InputField label="Old Password" type="password" value={passData.oldPassword} onChange={(v) => setPassData({...passData, oldPassword: v})} />
                      <InputField label="New Password" type="password" value={passData.Newpassword} onChange={(v) => setPassData({...passData, Newpassword: v})} />
                      <button onClick={handlePasswordChange} disabled={passLoading} className="w-full bg-red-600/10 border border-red-500/20 text-red-500 py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase text-xs tracking-[0.1em] md:tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50">
                         {passLoading ? <Loader2 className="animate-spin" size={18}/> : <Key size={18}/>} Re-Encrypt Session
                      </button>
                   </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-red-500/5 border border-red-500/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10">
                   <h2 className="text-xl md:text-2xl font-black text-red-500 mb-4 tracking-tighter italic">Danger Zone</h2>
                   <p className="text-slate-500 text-xs md:text-sm mb-6 md:mb-10 max-w-lg">Deleting your node will permanently remove all synchronized data from the JobAI cloud network. This action is non-reversible.</p>
                   <button className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-red-600 text-white rounded-xl md:rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-900/20 active:scale-95">
                      <Trash2 size={18}/> Terminate Account
                   </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---
function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] flex flex-col gap-4">
      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-[9px] md:text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">{title}</p>
        <p className="text-xl md:text-2xl font-black text-white tracking-tighter italic">{value}</p>
      </div>
    </div>
  );
}

function DataDisplay({ label, value, highlight = false }: any) {
  return (
    <div className="py-3 md:py-4 border-b border-white/5 last:border-0">
      <p className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-xs md:text-sm font-bold break-all ${highlight ? 'text-blue-500' : 'text-slate-300'}`}>{value || 'N/A'}</p>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-2">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} 
        className="w-full bg-black/50 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 px-5 md:px-6 text-xs md:text-sm font-bold text-white focus:border-blue-600 outline-none transition-all placeholder:text-slate-800"
      />
    </div>
  );
}