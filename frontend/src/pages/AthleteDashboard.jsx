import React, { useState } from 'react';
import AthleteSidebar from '../components/dashboard/athlete/AthleteSidebar';
import AthleteHeader from '../components/dashboard/athlete/AthleteHeader';
import AthleteOverviewSection from '../components/dashboard/athlete/AthleteOverviewSection';
import AthleteProfileSection from '../components/dashboard/athlete/AthleteProfileSection';
import AthleteOpportunitiesSection from '../components/dashboard/athlete/AthleteOpportunitiesSection';
import AthleteApplicationsSection from '../components/dashboard/athlete/AthleteApplicationsSection';
import AthleteEngagementsSection from '../components/dashboard/athlete/AthleteEngagementsSection';
import AthleteVerificationSection from '../components/dashboard/athlete/AthleteVerificationSection';
import AthleteReviewsSection from '../components/dashboard/athlete/AthleteReviewsSection';
import AthleteNotificationsSection from '../components/dashboard/athlete/AthleteNotificationsSection';
import AthleteSettingsSection from '../components/dashboard/athlete/AthleteSettingsSection';

export default function AthleteDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notificationsCount, setNotificationsCount] = useState(3);

  // Athlete Profile State & Data
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

  const opportunities = [
    { id: 1, title: 'National Sprint Championship Trials', organization: 'US Athletic Federation', type: 'Trial', location: 'Eugene, OR', deadline: 'In 4 days', grant: '$5,000 Sponsorship' },
    { id: 2, title: 'Speed & Endurance Brand Ambassador', organization: 'Puma Global', type: 'Sponsorship', location: 'Remote / Global', deadline: 'In 1 week', grant: 'Gear + $12,000/yr' },
    { id: 3, title: 'Elite Track Club Invitational', organization: 'Pacific Track Club', type: 'Trial', location: 'San Jose, CA', deadline: 'In 2 weeks', grant: 'Club Membership' },
  ];

  const applications = [
    { id: 'APP-104', title: 'Nike Speed Academy 2026', org: 'Nike Athletic', date: 'Aug 18, 2026', status: 'Under Review' },
    { id: 'APP-098', title: 'West Coast Olympic Prep Grant', org: 'US Olympic Committee', date: 'Aug 10, 2026', status: 'Shortlisted' },
    { id: 'APP-072', title: 'Red Bull High Performance Camp', org: 'Red Bull Sports', date: 'Jul 28, 2026', status: 'Accepted' },
  ];

  return (
    <div className="matchpoint-dashboard-layout">
      {/* Sidebar Navigation */}
      <AthleteSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
        notificationsCount={notificationsCount}
      />

      {/* Main Panel Content */}
      <div className="matchpoint-dashboard-main">
        <AthleteHeader
          athlete={athlete}
          notificationsCount={notificationsCount}
          onNotificationClick={() => setActiveTab('notifications')}
          onProfileClick={() => setActiveTab('profile')}
        />

        <main className="matchpoint-content-viewport">
          {activeTab === 'dashboard' && (
            <AthleteOverviewSection
              athlete={athlete}
              opportunities={opportunities}
              applications={applications}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'profile' && (
            <AthleteProfileSection athlete={athlete} />
          )}

          {activeTab === 'opportunities' && (
            <AthleteOpportunitiesSection opportunities={opportunities} />
          )}

          {activeTab === 'applications' && (
            <AthleteApplicationsSection applications={applications} />
          )}

          {activeTab === 'engagements' && (
            <AthleteEngagementsSection />
          )}

          {activeTab === 'verification' && (
            <AthleteVerificationSection />
          )}

          {activeTab === 'reviews' && (
            <AthleteReviewsSection />
          )}

          {activeTab === 'notifications' && (
            <AthleteNotificationsSection />
          )}

          {activeTab === 'settings' && (
            <AthleteSettingsSection athlete={athlete} />
          )}
        </main>
      </div>
    </div>
  );
}
