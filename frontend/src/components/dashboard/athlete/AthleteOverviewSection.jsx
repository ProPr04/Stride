import React from 'react';
import { TrendingUp, FileText, Handshake, Star, ChevronRight, Zap } from 'lucide-react';

export default function AthleteOverviewSection({ athlete, opportunities, applications, setActiveTab }) {
  return (
    <div className="overview-pane matchpoint-fade-in">
      {/* Hero Welcome Banner */}
      <div className="matchpoint-hero-banner">
        <div className="hero-banner-content">
          <div className="hero-top-tag font-mono">WELCOME BACK // ATHLETE PORTAL</div>
          <h1 className="hero-heading-display">
            SERVE YOUR <span className="text-lime">BEST GAME</span>
          </h1>
          <p className="hero-subtext">
            Your sporting profile is <strong className="text-lime">98% verified</strong>. You have 3 recommended sponsorship trials closing this week.
          </p>
          <div className="hero-cta-group">
            <button className="matchpoint-pill-btn primary" onClick={() => setActiveTab('opportunities')}>
              EXPLORE TRIALS <Zap size={15} />
            </button>
            <button className="matchpoint-pill-btn secondary" onClick={() => setActiveTab('profile')}>
              VIEW SPORTING PROFILE
            </button>
          </div>
        </div>

        {/* Decorative Court Ball Trajectory Arc */}
        <div className="trajectory-svg-container">
          <svg viewBox="0 0 200 120" className="trajectory-arc">
            <path d="M 10 100 Q 80 10 150 90 T 190 40" fill="none" stroke="#F2FF65" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="150" cy="90" r="5" fill="#F2FF65" />
            <circle cx="10" cy="100" r="4" fill="#F2FF65" />
          </svg>
        </div>
      </div>

      {/* Match Point 4-Card Court Grid */}
      <div className="matchpoint-court-grid">
        {/* Card 1: Performance Rating (Green Court) */}
        <div className="court-card green-court">
          <div className="court-card-top">
            <span className="court-index font-mono">1/4</span>
            <span className="court-card-label">PERFORMANCE RATING</span>
            <TrendingUp size={20} className="text-lime ms-auto" />
          </div>
          <div className="court-card-body">
            <div className="court-big-value text-lime">{athlete.stats.performanceScore}</div>
            <div className="court-sub-line text-emerald font-mono">▲ +2.4% MONTHLY PROGRESS</div>
          </div>
          <div className="court-bottom-bar" />
        </div>

        {/* Card 2: Active Applications (Blue Court) */}
        <div className="court-card blue-court">
          <div className="court-card-top">
            <span className="court-index font-mono">2/4</span>
            <span className="court-card-label">ACTIVE APPLICATIONS</span>
            <FileText size={20} className="text-lime ms-auto" />
          </div>
          <div className="court-card-body">
            <div className="court-big-value text-white">{athlete.stats.activeApplications}</div>
            <div className="court-sub-line text-lime font-mono">2 AWAITING BRAND REVIEW</div>
          </div>
          <div className="court-bottom-bar" />
        </div>

        {/* Card 3: Active Engagements (Clay Orange Court) */}
        <div className="court-card clay-court">
          <div className="court-card-top">
            <span className="court-index font-mono">3/4</span>
            <span className="court-card-label">ACTIVE ENGAGEMENTS</span>
            <Handshake size={20} className="text-lime ms-auto" />
          </div>
          <div className="court-card-body">
            <div className="court-big-value text-lime">{athlete.stats.engagementsCount}</div>
            <div className="court-sub-line text-white font-mono">1 CONTRACT RENEWAL DUE</div>
          </div>
          <div className="court-bottom-bar" />
        </div>

        {/* Card 4: Reputation Rating (Dark Green Court) */}
        <div className="court-card dark-court">
          <div className="court-card-top">
            <span className="court-index font-mono">4/4</span>
            <span className="court-card-label">TRUST REPUTATION</span>
            <Star size={20} className="text-lime ms-auto" />
          </div>
          <div className="court-card-body">
            <div className="court-big-value text-lime">{athlete.stats.trustRating}</div>
            <div className="court-sub-line text-white font-mono">VERIFIED ATHLETE STATUS</div>
          </div>
          <div className="court-bottom-bar" />
        </div>
      </div>

      {/* 2-Column Main Section: Recommended Opportunities & Application Tracker */}
      <div className="matchpoint-main-cols">
        {/* Column 1: Featured Trials & Grants */}
        <div className="court-panel-container">
          <div className="panel-header">
            <div>
              <span className="panel-tag font-mono">01 // RECOMMENDED</span>
              <h3 className="panel-title-display">FEATURED OPPORTUNITIES</h3>
            </div>
            <button className="panel-link-btn" onClick={() => setActiveTab('opportunities')}>
              VIEW ALL <ChevronRight size={15} />
            </button>
          </div>

          <div className="opportunities-stack">
            {opportunities.map((opp, idx) => (
              <div key={opp.id} className="matchpoint-list-item">
                <div className="item-step-badge font-mono">0{idx + 1}</div>
                <div className="item-main-info">
                  <span className="item-category-tag">{opp.type}</span>
                  <h4 className="item-title">{opp.title}</h4>
                  <span className="item-sub-org">{opp.organization} • {opp.location}</span>
                </div>
                <div className="item-right-action">
                  <span className="item-grant-val">{opp.grant}</span>
                  <button className="matchpoint-pill-btn action-sm" onClick={() => setActiveTab('applications')}>
                    APPLY NOW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Application Tracker */}
        <div className="court-panel-container">
          <div className="panel-header">
            <div>
              <span className="panel-tag font-mono">02 // TRACKER</span>
              <h3 className="panel-title-display">APPLICATION STATUS</h3>
            </div>
            <button className="panel-link-btn" onClick={() => setActiveTab('applications')}>
              VIEW ALL <ChevronRight size={15} />
            </button>
          </div>

          <div className="applications-stack">
            {applications.map((app) => (
              <div key={app.id} className="matchpoint-list-item">
                <div className="item-main-info">
                  <span className="item-app-id font-mono">{app.id}</span>
                  <h4 className="item-title">{app.title}</h4>
                  <span className="item-sub-org">{app.org} • {app.date}</span>
                </div>
                <span className={`matchpoint-status-pill ${app.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
