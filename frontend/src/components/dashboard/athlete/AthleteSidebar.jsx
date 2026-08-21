import React from 'react';
import {
  LayoutDashboard,
  User,
  Search,
  FileText,
  Handshake,
  ShieldCheck,
  Star,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';

export default function AthleteSidebar({ activeTab, setActiveTab, onLogout, notificationsCount }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'My Sporting Profile', icon: User },
    { id: 'opportunities', label: 'Find Opportunities', icon: Search },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'engagements', label: 'My Engagements', icon: Handshake },
    { id: 'verification', label: 'Verification', icon: ShieldCheck },
    { id: 'reviews', label: 'Reviews & Reputation', icon: Star },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notificationsCount },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="athlete-sidebar">
      {/* Sidebar Top Brand Header */}
      <div className="sidebar-brand-box">
        <div className="brand-badge-pill">6.1 ATHLETE</div>
        <div className="sidebar-brand-title">
          <span className="brand-symbol">✳</span> STRIDE
        </div>
        <span className="sidebar-sub-tag">PERFORMANCE HUB</span>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav-list">
        <div className="nav-group-header">NAVIGATION</div>
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`matchpoint-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-step-index">0{idx + 1}</span>
              <Icon size={17} className="nav-icon" />
              <span className="nav-btn-text">{item.label}</span>
              {item.badge && item.badge > 0 ? (
                <span className="matchpoint-badge">{item.badge}</span>
              ) : null}
            </button>
          );
        })}
      </nav>

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
