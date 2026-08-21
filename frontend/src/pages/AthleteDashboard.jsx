import { useState } from 'react';
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
  LogOut,
  Trophy,
  TrendingUp,
  Calendar,
  ChevronRight,
  CheckCircle2,
  Clock,
  Filter,
  Activity,
  Award,
  MapPin,
  Mail,
  Check,
  AlertCircle
} from 'lucide-react';

export default function AthleteDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsCount, setNotificationsCount] = useState(3);

  // Mock athlete profile data
  const athlete = {
    name: 'Alex Morgan',
    sport: 'Track & Field • 100m / 200m Sprinter',
    location: 'Los Angeles, CA',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    stats: {
      performanceScore: '94.8',
      activeApplications: 5,
      engagementsCount: 3,
      trustRating: '4.9 / 5.0'
    }
  };

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

  // Mock opportunities list
  const opportunities = [
    { id: 1, title: 'National Sprint Championship Trials', organization: 'US Athletic Federation', type: 'Trial', location: 'Eugene, OR', deadline: 'In 4 days', grant: '$5,000 Sponsorship' },
    { id: 2, title: 'Speed & Endurance Brand Ambassador', organization: 'Puma Global', type: 'Sponsorship', location: 'Remote / Global', deadline: 'In 1 week', grant: 'Gear + $12,000/yr' },
    { id: 3, title: 'Elite Track Club Invitational', organization: 'Pacific Track Club', type: 'Trial', location: 'San Jose, CA', deadline: 'In 2 weeks', grant: 'Club Membership' },
  ];

  // Mock applications list
  const applications = [
    { id: 'APP-104', title: 'Nike Speed Academy 2026', org: 'Nike Athletic', date: 'Aug 18, 2026', status: 'Under Review' },
    { id: 'APP-098', title: 'West Coast Olympic Prep Grant', org: 'US Olympic Committee', date: 'Aug 10, 2026', status: 'Shortlisted' },
    { id: 'APP-072', title: 'Red Bull High Performance Camp', org: 'Red Bull Sports', date: 'Jul 28, 2026', status: 'Accepted' },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="brand-logo">
            <span className="brand-icon">✳</span>
            <span className="brand-name">STRIDE</span>
          </div>
          <span className="brand-tag">ATHLETE PORTAL</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group-title">6.1 ATHLETE NAVIGATION</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={18} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
                {item.badge && item.badge > 0 ? (
                  <span className="nav-badge">{item.badge}</span>
                ) : null}
              </button>
            );
          })}

          <div className="sidebar-divider" />

          <button className="nav-item logout-item" onClick={onLogout}>
            <LogOut size={18} className="nav-icon" />
            <span className="nav-label">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Top Header Bar */}
        <header className="dashboard-header">
          <div className="search-bar-container">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search trials, grants, brands, or events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="dashboard-search-input"
            />
          </div>

          <div className="header-actions">
            <button
              className="icon-action-btn"
              onClick={() => setActiveTab('notifications')}
              title="Notifications"
            >
              <Bell size={18} />
              {notificationsCount > 0 && <span className="notification-dot" />}
            </button>

            <div className="user-profile-pill" onClick={() => setActiveTab('profile')}>
              <img src={athlete.avatar} alt={athlete.name} className="user-avatar" />
              <div className="user-info">
                <span className="user-name">
                  {athlete.name}
                  {athlete.verified && <CheckCircle2 size={14} className="verified-icon" />}
                </span>
                <span className="user-role">Sprinter</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Tab Content */}
        <div className="dashboard-content">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="tab-pane fadeIn">
              <div className="welcome-banner">
                <div>
                  <h1 className="banner-title">Welcome back, {athlete.name}! ⚡</h1>
                  <p className="banner-subtitle">
                    Your sporting profile is <strong className="text-highlight">98% complete</strong>. You have 3 upcoming trials scheduled.
                  </p>
                </div>
                <button className="btn-accent-action" onClick={() => setActiveTab('opportunities')}>
                  Explore Opportunities
                </button>
              </div>

              {/* Metric Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-card-header">
                    <span className="stat-title">Performance Rating</span>
                    <div className="stat-icon-wrapper teal">
                      <TrendingUp size={20} />
                    </div>
                  </div>
                  <div className="stat-value">{athlete.stats.performanceScore}</div>
                  <div className="stat-subtext text-success">
                    <span>▲ +2.4% this month</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-card-header">
                    <span className="stat-title">Active Applications</span>
                    <div className="stat-icon-wrapper yellow">
                      <FileText size={20} />
                    </div>
                  </div>
                  <div className="stat-value">{athlete.stats.activeApplications}</div>
                  <div className="stat-subtext">2 awaiting brand response</div>
                </div>

                <div className="stat-card">
                  <div className="stat-card-header">
                    <span className="stat-title">Active Engagements</span>
                    <div className="stat-icon-wrapper sport">
                      <Handshake size={20} />
                    </div>
                  </div>
                  <div className="stat-value">{athlete.stats.engagementsCount}</div>
                  <div className="stat-subtext">1 contract renewal due</div>
                </div>

                <div className="stat-card">
                  <div className="stat-card-header">
                    <span className="stat-title">Reputation Score</span>
                    <div className="stat-icon-wrapper orange">
                      <Star size={20} />
                    </div>
                  </div>
                  <div className="stat-value">{athlete.stats.trustRating}</div>
                  <div className="stat-subtext text-highlight">Verified Athlete Status</div>
                </div>
              </div>

              {/* Grid Section: Recommended Opportunities & Recent Applications */}
              <div className="content-grid-2col">
                {/* Column 1: Featured Opportunities */}
                <div className="dashboard-section-card">
                  <div className="section-card-header">
                    <h3 className="section-title">Recommended Opportunities</h3>
                    <button className="text-link-btn" onClick={() => setActiveTab('opportunities')}>
                      View all <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="opportunities-list">
                    {opportunities.map((opp) => (
                      <div key={opp.id} className="opportunity-item">
                        <div className="opp-main">
                          <span className="opp-type-badge">{opp.type}</span>
                          <h4 className="opp-title">{opp.title}</h4>
                          <span className="opp-org">{opp.organization} • {opp.location}</span>
                        </div>
                        <div className="opp-action-col">
                          <span className="opp-grant">{opp.grant}</span>
                          <button className="btn-secondary-sm" onClick={() => setActiveTab('applications')}>
                            Apply Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Application Tracker */}
                <div className="dashboard-section-card">
                  <div className="section-card-header">
                    <h3 className="section-title">Application Status</h3>
                    <button className="text-link-btn" onClick={() => setActiveTab('applications')}>
                      View all <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="applications-table">
                    {applications.map((app) => (
                      <div key={app.id} className="application-row">
                        <div className="app-details">
                          <span className="app-id">{app.id}</span>
                          <h4 className="app-name">{app.title}</h4>
                          <span className="app-org">{app.org} • {app.date}</span>
                        </div>
                        <span className={`status-pill ${app.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY SPORTING PROFILE */}
          {activeTab === 'profile' && (
            <div className="tab-pane fadeIn">
              <div className="dashboard-section-card profile-hero-card">
                <div className="profile-banner-bg" />
                <div className="profile-header-content">
                  <img src={athlete.avatar} alt={athlete.name} className="profile-large-avatar" />
                  <div className="profile-titles">
                    <h2 className="profile-name">
                      {athlete.name} <CheckCircle2 size={20} className="verified-icon inline" />
                    </h2>
                    <p className="profile-sub">{athlete.sport}</p>
                    <span className="profile-location"><MapPin size={14} /> {athlete.location}</span>
                  </div>
                  <button className="btn-accent-action" onClick={() => alert('Edit Profile Modal Opened')}>
                    Edit Profile
                  </button>
                </div>

                <div className="profile-details-grid">
                  <div className="profile-info-box">
                    <span className="info-label">Personal Best (100m)</span>
                    <span className="info-value text-yellow">10.42 sec</span>
                  </div>
                  <div className="profile-info-box">
                    <span className="info-label">Personal Best (200m)</span>
                    <span className="info-value text-yellow">21.15 sec</span>
                  </div>
                  <div className="profile-info-box">
                    <span className="info-label">Current Club</span>
                    <span className="info-value">Metro Track Alliance</span>
                  </div>
                  <div className="profile-info-box">
                    <span className="info-label">Sponsorship Status</span>
                    <span className="info-value text-highlight">Open for Brands</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FIND OPPORTUNITIES */}
          {activeTab === 'opportunities' && (
            <div className="tab-pane fadeIn">
              <div className="dashboard-section-card">
                <div className="section-card-header">
                  <h2 className="h3">Find Opportunities & Trials</h2>
                  <div className="filter-pills">
                    <button className="filter-pill active">All</button>
                    <button className="filter-pill">Trials</button>
                    <button className="filter-pill">Sponsorships</button>
                    <button className="filter-pill">Grants</button>
                  </div>
                </div>

                <div className="opportunities-grid-full">
                  {opportunities.map((opp) => (
                    <div key={opp.id} className="opportunity-full-card">
                      <div className="opp-card-badge">{opp.type}</div>
                      <h3 className="h4">{opp.title}</h3>
                      <p className="opp-org-line">{opp.organization}</p>
                      <div className="opp-meta-list">
                        <span><MapPin size={14} /> {opp.location}</span>
                        <span><Clock size={14} /> {opp.deadline}</span>
                      </div>
                      <div className="opp-footer">
                        <span className="opp-grant-tag">{opp.grant}</span>
                        <button className="btn-accent-action-sm" onClick={() => alert(`Applied for ${opp.title}`)}>
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: APPLICATIONS */}
          {activeTab === 'applications' && (
            <div className="tab-pane fadeIn">
              <div className="dashboard-section-card">
                <h2 className="h3 mb-20">My Applications</h2>
                <div className="applications-table-full">
                  <div className="table-header-row">
                    <span>Application ID</span>
                    <span>Opportunity Title</span>
                    <span>Organization</span>
                    <span>Date Submitted</span>
                    <span>Status</span>
                  </div>
                  {applications.map((app) => (
                    <div key={app.id} className="table-data-row">
                      <span className="text-yellow">{app.id}</span>
                      <span className="font-semibold">{app.title}</span>
                      <span>{app.org}</span>
                      <span>{app.date}</span>
                      <span className={`status-pill ${app.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MY ENGAGEMENTS */}
          {activeTab === 'engagements' && (
            <div className="tab-pane fadeIn">
              <div className="dashboard-section-card">
                <h2 className="h3 mb-20">Active Engagements & Contracts</h2>
                <div className="engagements-list">
                  <div className="engagement-card">
                    <div className="eng-icon sport"><Handshake size={24} /></div>
                    <div className="eng-info">
                      <h4 className="h4">Puma Athlete Sponsorship Contract</h4>
                      <p className="text-small">Active • Valid until Dec 31, 2026</p>
                    </div>
                    <span className="status-pill accepted">Active Contract</span>
                  </div>

                  <div className="engagement-card">
                    <div className="eng-icon teal"><Activity size={24} /></div>
                    <div className="eng-info">
                      <h4 className="h4">High Performance Coaching Program</h4>
                      <p className="text-small">Active • Metro Track Alliance</p>
                    </div>
                    <span className="status-pill accepted">Ongoing</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: VERIFICATION */}
          {activeTab === 'verification' && (
            <div className="tab-pane fadeIn">
              <div className="dashboard-section-card">
                <div className="verification-status-banner">
                  <ShieldCheck size={36} className="text-yellow" />
                  <div>
                    <h3 className="h3">Verified Athlete Status: Active ✅</h3>
                    <p className="text-small opacity-80">Your identity and athletic federation credentials have been verified.</p>
                  </div>
                </div>

                <div className="verification-items-list mt-24">
                  <div className="verification-row">
                    <div>
                      <h4 className="font-semibold">National ID & Passport</h4>
                      <p className="text-caption">Verified on Jan 14, 2026</p>
                    </div>
                    <span className="status-pill accepted"><Check size={14} /> Verified</span>
                  </div>
                  <div className="verification-row">
                    <div>
                      <h4 className="font-semibold">Track & Field Federation License</h4>
                      <p className="text-caption">Valid for 2026 Season</p>
                    </div>
                    <span className="status-pill accepted"><Check size={14} /> Verified</span>
                  </div>
                  <div className="verification-row">
                    <div>
                      <h4 className="font-semibold">Anti-Doping Compliance Certificate</h4>
                      <p className="text-caption">Valid until Nov 2026</p>
                    </div>
                    <span className="status-pill accepted"><Check size={14} /> Verified</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: REVIEWS & REPUTATION */}
          {activeTab === 'reviews' && (
            <div className="tab-pane fadeIn">
              <div className="dashboard-section-card">
                <h2 className="h3 mb-20">Reviews & Endorsements</h2>
                <div className="reviews-list">
                  <div className="review-card">
                    <div className="review-header">
                      <span className="reviewer-name">Coach Marcus Vance</span>
                      <span className="review-stars">★★★★★</span>
                    </div>
                    <p className="review-text">"Alex possesses extraordinary work ethic, speed mechanics, and leadership on the track. Highly recommended for top tier brand partnerships."</p>
                    <span className="review-date">Aug 02, 2026</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="tab-pane fadeIn">
              <div className="dashboard-section-card">
                <h2 className="h3 mb-20">Notifications</h2>
                <div className="notifications-list">
                  <div className="notification-item unread">
                    <Bell size={18} className="text-yellow" />
                    <div>
                      <p className="notif-text">Your application for <strong>Nike Speed Academy 2026</strong> has moved to Under Review.</p>
                      <span className="notif-time">2 hours ago</span>
                    </div>
                  </div>
                  <div className="notification-item">
                    <Award size={18} className="text-teal" />
                    <div>
                      <p className="notif-text">Congratulations! Federation license verified for the 2026 season.</p>
                      <span className="notif-time">1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="tab-pane fadeIn">
              <div className="dashboard-section-card">
                <h2 className="h3 mb-20">Athlete Account Settings</h2>
                <div className="settings-form">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" defaultValue={athlete.name} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Primary Sport / Discipline</label>
                    <input type="text" className="form-input" defaultValue={athlete.sport} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input type="text" className="form-input" defaultValue={athlete.location} />
                  </div>
                  <button className="btn-accent-action mt-12" onClick={() => alert('Settings Saved!')}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
