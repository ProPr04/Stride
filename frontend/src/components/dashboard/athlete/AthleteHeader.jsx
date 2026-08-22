import React from 'react';
import { Search, Bell, CheckCircle2 } from 'lucide-react';

export default function AthleteHeader({ athlete, notificationsCount, onNotificationClick, onProfileClick }) {
  return (
    <header className="athlete-header-bar">
      <div className="header-search-box">
        <Search size={16} className="search-icon-lime" />
        <input
          type="text"
          placeholder="SEARCH TRIALS, BRANDS, SPONSORSHIPS..."
          className="header-search-input"
        />
        <span className="search-shortcut-tag"></span>
      </div>

      <div className="header-right-actions">
        <button
          className="matchpoint-icon-btn"
          onClick={onNotificationClick}
          title="Notifications"
        >
          <Bell size={18} />
          {notificationsCount > 0 && <span className="lime-dot-pulse" />}
        </button>

        <div className="matchpoint-user-pill" onClick={onProfileClick}>
          <div className="user-avatar-frame">
            <img src={athlete.avatar} alt={athlete.name} className="avatar-img" />
          </div>
          <div className="user-meta">
            <span className="user-name-title">
              {athlete.name}
              {athlete.verified && <CheckCircle2 size={14} className="verified-lime-icon" />}
            </span>
            <span className="user-discipline-tag">{athlete.sport}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
