import React, { useState } from 'react';
import AthleteSidebar from '../components/dashboard/athlete/AthleteSidebar';
import AthleteOpportunitiesSection from '../components/dashboard/athlete/AthleteOpportunitiesSection';
import AthleteSavedSection from '../components/dashboard/athlete/AthleteSavedSection';
import AthleteApplicationsSection from '../components/dashboard/athlete/AthleteApplicationsSection';
import AthleteEngagementsSection from '../components/dashboard/athlete/AthleteEngagementsSection';
import AthleteProfileSection from '../components/dashboard/athlete/AthleteProfileSection';

export default function AthleteDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('opportunities');

  return (
    <div className="matchpoint-dashboard-layout bg-[#17241a] font-['Inter',sans-serif]">
      {/* Sidebar Navigation */}
      <AthleteSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />

      {/* Main Panel Content */}
      <div className="matchpoint-dashboard-main bg-[#17241a]">
        <main className="matchpoint-content-viewport p-6 sm:p-8">
          {activeTab === 'opportunities' && <AthleteOpportunitiesSection />}
          {activeTab === 'saved' && (
            <AthleteSavedSection onNavigateToOpportunities={() => setActiveTab('opportunities')} />
          )}
          {activeTab === 'applications' && <AthleteApplicationsSection />}
          {activeTab === 'engagements' && <AthleteEngagementsSection />}
          {activeTab === 'profile' && <AthleteProfileSection />}
        </main>
      </div>
    </div>
  );
}
