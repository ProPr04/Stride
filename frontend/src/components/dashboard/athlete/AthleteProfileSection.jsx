import React from 'react';
import { MapPin, CheckCircle2, Award, Trophy, Zap, Edit3 } from 'lucide-react';

export default function AthleteProfileSection({ athlete }) {
  return (
    <div className="profile-pane matchpoint-fade-in">
      <div className="court-panel-container matchpoint-profile-hero">
        <div className="matchpoint-profile-banner-bg">
          <span className="banner-court-tag font-mono">ATHLETE PROFILE // MATCH POINT VERIFIED</span>
        </div>

        <div className="matchpoint-profile-header">
          <div className="oval-avatar-frame">
            <img src={athlete.avatar} alt={athlete.name} className="oval-avatar-img" />
          </div>

          <div className="profile-identity">
            <div className="profile-badge-row">
              <span className="matchpoint-badge-lime">PRO ATHLETE</span>
              {athlete.verified && (
                <span className="matchpoint-badge-verified">
                  <CheckCircle2 size={13} /> VERIFIED FEDERATION ATHLETE
                </span>
              )}
            </div>
            <h1 className="profile-hero-name">
              {athlete.name}
            </h1>
            <p className="profile-hero-discipline">{athlete.sport}</p>
            <span className="profile-location-tag"><MapPin size={14} className="text-lime" /> {athlete.location}</span>
          </div>

          <button className="matchpoint-pill-btn primary ms-auto" onClick={() => alert('Editing Sporting Profile...')}>
            <Edit3 size={15} /> EDIT PROFILE
          </button>
        </div>

        <div className="matchpoint-stats-banner">
          <div className="stat-box">
            <span className="stat-box-label font-mono">100M PERSONAL BEST</span>
            <span className="stat-box-val text-lime">10.42 SEC</span>
          </div>
          <div className="stat-box">
            <span className="stat-box-label font-mono">200M PERSONAL BEST</span>
            <span className="stat-box-val text-lime">21.15 SEC</span>
          </div>
          <div className="stat-box">
            <span className="stat-box-label font-mono">PRIMARY CLUB</span>
            <span className="stat-box-val text-white">METRO TRACK CLUB</span>
          </div>
          <div className="stat-box">
            <span className="stat-box-label font-mono">SPONSORSHIP STATUS</span>
            <span className="stat-box-val text-lime font-bold">OPEN FOR BRANDS</span>
          </div>
        </div>
      </div>

      <div className="matchpoint-main-cols mt-24">
        {/* Achievements Section */}
        <div className="court-panel-container">
          <div className="panel-header">
            <h3 className="panel-title-display">KEY ACHIEVEMENTS</h3>
          </div>
          <div className="achievements-list">
            <div className="achievement-item">
              <Trophy size={20} className="text-lime" />
              <div>
                <h4 className="item-title">West Coast Athletics Sprint Champion</h4>
                <p className="item-sub-org">1st Place • 100m Dash (2025)</p>
              </div>
            </div>
            <div className="achievement-item">
              <Award size={20} className="text-lime" />
              <div>
                <h4 className="item-title">US Track Federation Selection</h4>
                <p className="item-sub-org">National Pre-Olympic Trials Qualifier</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Athletics Details */}
        <div className="court-panel-container">
          <div className="panel-header">
            <h3 className="panel-title-display">ATHLETE BIO</h3>
          </div>
          <p className="bio-text">
            Dedicated 100m and 200m track sprinter based in Los Angeles. Currently training for the 2026 National Championship Trials. Seeking brand partnerships, performance grants, and elite club invitations.
          </p>
        </div>
      </div>
    </div>
  );
}
