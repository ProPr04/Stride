import React, { useState } from 'react';
import AthleteSidebar from '../components/dashboard/athlete/AthleteSidebar';
import AthleteOpportunitiesSection from '../components/dashboard/athlete/AthleteOpportunitiesSection';
import AthleteApplicationsSection from '../components/dashboard/athlete/AthleteApplicationsSection';
import AthleteEngagementsSection from '../components/dashboard/athlete/AthleteEngagementsSection';
import AthleteProfileSection from '../components/dashboard/athlete/AthleteProfileSection';
import { api } from '../services/api';

export default function AthleteDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('opportunities');

  const handleLogout = () => {
    api.auth.logout();
    if (onLogout) {
      onLogout();
      return;
    }
    window.location.assign("/login");
  };

  return (
    <div className="matchpoint-dashboard-layout">
      {/* Sidebar Navigation */}
      <AthleteSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />


      {/* Main Panel Content */}
      <div className="matchpoint-dashboard-main">
        <main className="matchpoint-content-viewport">
          {activeTab === 'opportunities' && <AthleteOpportunitiesSection />}
          {activeTab === 'applications' && <AthleteApplicationsSection />}
          {activeTab === 'engagements' && <AthleteEngagementsSection />}
          {activeTab === 'profile' && <AthleteProfileSection />}
        </main>
      </div>
    </div>
  );
}
