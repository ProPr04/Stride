import React, { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  Lock,
  Save,
  Camera,
  CheckCircle2,
  Globe,
  Eye,
  Key,
  Smartphone,
  Check
} from 'lucide-react';

export default function AthleteSettingsSection({ athlete }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [saveToast, setSaveToast] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: athlete.name || 'Alex Morgan',
    sport: athlete.sport || 'Track & Field • 100m / 200m Sprinter',
    location: athlete.location || 'Los Angeles, CA',
    bio: 'Dedicated 100m and 200m track sprinter training for the 2026 National Championship Trials.',
    email: 'alex.morgan@stride.athlete.com',
    phone: '+1 (310) 884-9921',
    club: 'Metro Track Alliance',
    visibility: 'sponsors', // 'public', 'sponsors', 'private'
    showInSearch: true,
    showPersonalBests: true,
    emailAlerts: true,
    smsAlerts: true,
    sponsorDirectMessages: true,
    trialInvites: true,
    twoFactor: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
  ];

  return (
    <div className="settings-pane matchpoint-fade-in">
      {/* Toast Notification */}
      {saveToast && (
        <div className="matchpoint-toast-banner">
          <CheckCircle2 size={18} className="text-lime" />
          <span className="font-heading text-white text-xs">SETTINGS SAVED SUCCESSFULLY // MATCH POINT UPDATED</span>
        </div>
      )}

      {/* Header Panel */}
      <div className="court-panel-container">
        <div className="panel-header flex-between">
          <div>
            <span className="panel-tag font-mono">09 // ACCOUNT & PREFERENCES</span>
            <h2 className="panel-title-display">ATHLETE CONTROL CENTER</h2>
          </div>

          <button className="matchpoint-pill-btn primary" onClick={handleSave}>
            <Save size={15} /> SAVE ALL CHANGES
          </button>
        </div>

        {/* Settings Inner Tabs */}
        <div className="settings-tab-bar">
          <button
            className={`settings-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={15} /> GENERAL PROFILE
          </button>
          <button
            className={`settings-tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            <Eye size={15} /> SCOUTING & PRIVACY
          </button>
          <button
            className={`settings-tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={15} /> NOTIFICATIONS
          </button>
          <button
            className={`settings-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Lock size={15} /> SECURITY & 2FA
          </button>
        </div>
      </div>

      {/* Tab Content Panels */}
      <form onSubmit={handleSave} className="mt-24">
        {/* Tab 1: General Profile */}
        {activeTab === 'profile' && (
          <div className="matchpoint-main-cols">
            {/* Left Column: Avatar & Photo Selection */}
            <div className="court-panel-container">
              <span className="panel-tag font-mono">PROFILE AVATAR</span>
              <h3 className="panel-title-display text-base">CHOOSE PROFILE PHOTO</h3>

              <div className="settings-avatar-preview-box mt-16">
                <div className="oval-avatar-frame settings-avatar">
                  <img src={formData.avatar || sampleAvatars[0]} alt="Selected Avatar" className="oval-avatar-img" />
                </div>
                <div>
                  <h4 className="font-heading text-white">{formData.name}</h4>
                  <p className="text-xs text-lime font-mono">MATCH POINT VERIFIED ATHLETE</p>
                  <button type="button" className="matchpoint-pill-btn secondary action-sm mt-12">
                    <Camera size={13} /> UPLOAD CUSTOM PHOTO
                  </button>
                </div>
              </div>

              <div className="preset-avatars-grid mt-24">
                <span className="text-xs font-mono text-lime display-block mb-8">PRESET SPORTING AVATARS:</span>
                <div className="avatars-row">
                  {sampleAvatars.map((url, i) => (
                    <div
                      key={i}
                      className={`preset-avatar-circle ${formData.avatar === url ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, avatar: url })}
                    >
                      <img src={url} alt={`Preset ${i}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Core Info */}
            <div className="court-panel-container">
              <span className="panel-tag font-mono">PERSONAL DETAILS</span>
              <h3 className="panel-title-display text-base font-heading">SPORTING IDENTITY</h3>

              <div className="settings-form-grid mt-16">
                <div className="form-group-item">
                  <label className="form-label-mono font-mono">FULL ATHLETE NAME</label>
                  <input
                    type="text"
                    className="matchpoint-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group-item">
                  <label className="form-label-mono font-mono">PRIMARY DISCIPLINE / SPORT</label>
                  <input
                    type="text"
                    className="matchpoint-input"
                    value={formData.sport}
                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                  />
                </div>

                <div className="form-group-item">
                  <label className="form-label-mono font-mono">TRAINING LOCATION</label>
                  <input
                    type="text"
                    className="matchpoint-input"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="form-group-item">
                  <label className="form-label-mono font-mono">AFFILIATED CLUB / ACADEMY</label>
                  <input
                    type="text"
                    className="matchpoint-input"
                    value={formData.club}
                    onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                  />
                </div>

                <div className="form-group-item full-width">
                  <label className="form-label-mono font-mono">ATHLETE ATHLETICS BIO</label>
                  <textarea
                    rows={3}
                    className="matchpoint-textarea"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Scouting & Privacy */}
        {activeTab === 'privacy' && (
          <div className="court-panel-container">
            <span className="panel-tag font-mono">SCOUTING ACCESSIBILITY</span>
            <h3 className="panel-title-display">PROFILE VISIBILITY CONTROL</h3>

            <div className="privacy-options-grid mt-24">
              <div
                className={`privacy-card ${formData.visibility === 'public' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, visibility: 'public' })}
              >
                <div className="flex-between">
                  <Globe size={24} className="text-lime" />
                  {formData.visibility === 'public' && <CheckCircle2 size={18} className="text-lime" />}
                </div>
                <h4 className="privacy-card-title">EVERYONE (PUBLIC)</h4>
                <p className="privacy-card-desc">Visible to all users, brand scouts, and public search engines.</p>
              </div>

              <div
                className={`privacy-card ${formData.visibility === 'sponsors' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, visibility: 'sponsors' })}
              >
                <div className="flex-between">
                  <Shield size={24} className="text-lime" />
                  {formData.visibility === 'sponsors' ? <CheckCircle2 size={18} className="text-lime" /> : null}
                </div>
                <h4 className="privacy-card-title">VERIFIED SPONSORS ONLY (RECOMMENDED)</h4>
                <p className="privacy-card-desc">Visible only to verified brands, talent scouts, and federation coaches.</p>
              </div>

              <div
                className={`privacy-card ${formData.visibility === 'private' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, visibility: 'private' })}
              >
                <div className="flex-between">
                  <Lock size={24} className="text-lime" />
                  {formData.visibility === 'private' ? <CheckCircle2 size={18} className="text-lime" /> : null}
                </div>
                <h4 className="privacy-card-title">PRIVATE (HIDDEN)</h4>
                <p className="privacy-card-desc">Hidden from search. You can only apply to opportunities directly.</p>
              </div>
            </div>

            <div className="toggles-list-container mt-24">
              <div className="toggle-row-item">
                <div>
                  <h4 className="toggle-title">Show Profile in Athlete Search Index</h4>
                  <p className="toggle-sub">Allows scouts searching by 100m sprint times to discover your profile.</p>
                </div>
                <label className="matchpoint-switch">
                  <input
                    type="checkbox"
                    checked={formData.showInSearch}
                    onChange={(e) => setFormData({ ...formData, showInSearch: e.target.checked })}
                  />
                  <span className="slider" />
                </label>
              </div>

              <div className="toggle-row-item">
                <div>
                  <h4 className="toggle-title">Publicly Display Verified Personal Bests</h4>
                  <p className="toggle-sub">Shows your FAT-verified 10.42s record on public profile cards.</p>
                </div>
                <label className="matchpoint-switch">
                  <input
                    type="checkbox"
                    checked={formData.showPersonalBests}
                    onChange={(e) => setFormData({ ...formData, showPersonalBests: e.target.checked })}
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Notifications */}
        {activeTab === 'notifications' && (
          <div className="court-panel-container">
            <span className="panel-tag font-mono">ALERT PREFERENCES</span>
            <h3 className="panel-title-display">COMMUNICATION CHANNELS</h3>

            <div className="toggles-list-container mt-24">
              <div className="toggle-row-item">
                <div>
                  <h4 className="toggle-title">Instant Email Alerts for New Brand Sponsorships</h4>
                  <p className="toggle-sub">Receive instant email notifications when new grants or trials matching your sport launch.</p>
                </div>
                <label className="matchpoint-switch">
                  <input
                    type="checkbox"
                    checked={formData.emailAlerts}
                    onChange={(e) => setFormData({ ...formData, emailAlerts: e.target.checked })}
                  />
                  <span className="slider" />
                </label>
              </div>

              <div className="toggle-row-item">
                <div>
                  <h4 className="toggle-title">SMS Notifications for Application Status Changes</h4>
                  <p className="toggle-sub">Get text alerts on +1 (310) 884-9921 when an application is shortlisted or accepted.</p>
                </div>
                <label className="matchpoint-switch">
                  <input
                    type="checkbox"
                    checked={formData.smsAlerts}
                    onChange={(e) => setFormData({ ...formData, smsAlerts: e.target.checked })}
                  />
                  <span className="slider" />
                </label>
              </div>

              <div className="toggle-row-item">
                <div>
                  <h4 className="toggle-title">Direct Messages from Verified Scouts</h4>
                  <p className="toggle-sub">Allow verified brand managers to message you directly on Stride.</p>
                </div>
                <label className="matchpoint-switch">
                  <input
                    type="checkbox"
                    checked={formData.sponsorDirectMessages}
                    onChange={(e) => setFormData({ ...formData, sponsorDirectMessages: e.target.checked })}
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Security & 2FA */}
        {activeTab === 'security' && (
          <div className="matchpoint-main-cols">
            <div className="court-panel-container">
              <span className="panel-tag font-mono">PASSWORD & SECURITY</span>
              <h3 className="panel-title-display text-base">CHANGE PASSWORD</h3>

              <div className="settings-form-grid mt-16">
                <div className="form-group-item full-width">
                  <label className="form-label-mono font-mono">CURRENT PASSWORD</label>
                  <input type="password" className="matchpoint-input" placeholder="••••••••••••" />
                </div>
                <div className="form-group-item full-width">
                  <label className="form-label-mono font-mono">NEW PASSWORD</label>
                  <input type="password" className="matchpoint-input" placeholder="••••••••••••" />
                </div>
                <div className="form-group-item full-width">
                  <label className="form-label-mono font-mono">CONFIRM NEW PASSWORD</label>
                  <input type="password" className="matchpoint-input" placeholder="••••••••••••" />
                </div>
              </div>

              <button type="button" className="matchpoint-pill-btn primary action-sm mt-16" onClick={() => alert('Password Updated!')}>
                <Key size={14} /> UPDATE PASSWORD
              </button>
            </div>

            <div className="court-panel-container">
              <span className="panel-tag font-mono">TWO-FACTOR AUTHENTICATION</span>
              <h3 className="panel-title-display text-base">2FA SECURITY STATUS</h3>

              <div className="two-factor-box mt-16">
                <div className="two-factor-header flex-between">
                  <div className="flex-align-gap">
                    <Smartphone size={24} className="text-lime" />
                    <div>
                      <h4 className="font-heading text-white">AUTHENTICATOR APP (2FA)</h4>
                      <p className="text-xs text-lime font-mono">STATUS: ENABLED & ACTIVE ✅</p>
                    </div>
                  </div>
                  <span className="matchpoint-status-pill accepted">ENABLED</span>
                </div>
                <p className="text-xs text-light mt-12">
                  Your account is protected with Google Authenticator time-based one-time passwords (TOTP).
                </p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
