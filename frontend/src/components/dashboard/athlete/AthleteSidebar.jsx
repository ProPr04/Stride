import React from 'react';
import {
  Search,
  FileText,
  Handshake,
  User,
  LogOut
} from 'lucide-react';

export default function AthleteSidebar({ activeTab, setActiveTab, onLogout }) {
  const navItems = [
    { id: 'opportunities', label: 'Opportunities', icon: Search },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'engagements', label: 'Engagements', icon: Handshake },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="athlete-sidebar">
      {/* Sidebar Top Brand Header */}
      <div className="sidebar-brand-box">
        <a href="/" className="flex items-center gap-2.5 group">
          <span className="font-['Poppins',sans-serif] font-bold text-xl sm:text-3xl tracking-tight text-white">
            STRIDE<span className="text-[#F2FF65]">.</span>
          </span>
        </a>
        <span className="sidebar-sub-tag">Let's Grab It!
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav-list">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`matchpoint-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={17} className="nav-icon" />
              <span className="nav-btn-text">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Logout Button */}
      <div className="sidebar-footer-box">
        <div className="court-line-divider" />
        <button className="matchpoint-nav-btn logout-btn" onClick={onLogout}>
          <LogOut size={17} className="nav-icon" />
          <span className="nav-btn-text">Logout</span>
        </button>
      </div>
    </aside>
  );
}
