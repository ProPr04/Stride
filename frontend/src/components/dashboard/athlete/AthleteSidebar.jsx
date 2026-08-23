import React from 'react';
import {
  Search,
  Bookmark,
  FileText,
  Handshake,
  User,
  LogOut
} from 'lucide-react';

export default function AthleteSidebar({ activeTab, setActiveTab, onLogout }) {
  const navItems = [
    { id: 'opportunities', label: 'Opportunities', icon: Search },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'engagements', label: 'Engagements', icon: Handshake },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="athlete-sidebar bg-[#17241a] border-r border-[#2A3C2E]">
      {/* Sidebar Top Brand Header */}
      <div className="sidebar-brand-box pb-5 mb-6 border-b border-[#2A3C2E]">
        <a href="/" className="flex items-center gap-2.5 group">
          <span className="font-['Poppins',sans-serif] font-bold text-2xl tracking-tight text-white">
            STRIDE<span className="text-[#F2FF65]">.</span>
          </span>
        </a>
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#F2FF65]/70 uppercase mt-1 block">
          ATHLETE PERFORMANCE HUB
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav-list space-y-1.5 flex-1">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-['Poppins',sans-serif] font-bold tracking-wide uppercase transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#141F16] text-[#F2FF65] border border-[#F2FF65]/60 shadow-lg shadow-black/20'
                  : 'text-gray-300 hover:text-white hover:bg-[#141F16]/50 border border-transparent'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-[#F2FF65]' : 'text-gray-400'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Logout Button */}
      <div className="pt-4 border-t border-[#2A3C2E]">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-['Poppins',sans-serif] font-bold tracking-wide uppercase text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
