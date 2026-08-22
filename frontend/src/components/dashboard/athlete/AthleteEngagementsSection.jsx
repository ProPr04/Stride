import React from 'react';
import { Handshake, Activity } from 'lucide-react';

export default function AthleteEngagementsSection() {
  return (
    <div className="engagements-pane matchpoint-fade-in">
      <div className="court-panel-container">
        <div className="panel-header">
          <div>
            <span className="panel-tag font-mono">05 // ENGAGEMENTS</span>
            <h2 className="panel-title-display">MY ACTIVE ENGAGEMENTS</h2>
          </div>
        </div>

        <div className="matchpoint-cards-list">
          <div className="court-engagement-card blue-court">
            <div className="eng-icon-box">
              <Handshake size={24} className="text-lime" />
            </div>
            <div className="eng-details">
              <span className="court-index font-mono">CONTRACT 01</span>
              <h3 className="eng-title">Puma Athlete Global Sponsorship</h3>
              <p className="eng-sub">Active Brand Collaboration • Valid until Dec 31, 2026</p>
            </div>
            <span className="matchpoint-status-pill accepted ms-auto">ACTIVE CONTRACT</span>
          </div>

          <div className="court-engagement-card green-court">
            <div className="eng-icon-box">
              <Activity size={24} className="text-lime" />
            </div>
            <div className="eng-details">
              <span className="court-index font-mono">PROGRAM 02</span>
              <h3 className="eng-title">Elite High-Performance Sprint Coaching</h3>
              <p className="eng-sub">Active Coaching Program • Metro Track Alliance</p>
            </div>
            <span className="matchpoint-status-pill accepted ms-auto">ONGOING</span>
          </div>
        </div>
      </div>
    </div>
  );
}
