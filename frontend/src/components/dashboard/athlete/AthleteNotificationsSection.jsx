import React from 'react';
import { Bell, Award } from 'lucide-react';

export default function AthleteNotificationsSection() {
  return (
    <div className="notifications-pane matchpoint-fade-in">
      <div className="court-panel-container">
        <div className="panel-header">
          <div>
            <span className="panel-tag font-mono">08 // NOTIFICATIONS</span>
            <h2 className="panel-title-display">ACTIVITY NOTIFICATIONS</h2>
          </div>
        </div>

        <div className="notifications-stack">
          <div className="matchpoint-notification-item unread">
            <Bell size={20} className="text-lime flex-shrink-0" />
            <div>
              <p className="notif-message text-white">Your application for <strong>Nike Speed Academy 2026</strong> has moved to <em>Under Review</em>.</p>
              <span className="notif-time font-mono">2 HOURS AGO</span>
            </div>
          </div>

          <div className="matchpoint-notification-item">
            <Award size={20} className="text-lime flex-shrink-0" />
            <div>
              <p className="notif-message text-white">Federation license verified for the 2026 Competitive Season.</p>
              <span className="notif-time font-mono">1 DAY AGO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
