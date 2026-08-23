import React, { useState } from 'react';
import AthleteSidebar from '../components/dashboard/athlete/AthleteSidebar';
import AthleteOpportunitiesSection from '../components/dashboard/athlete/AthleteOpportunitiesSection';
import AthleteApplicationsSection from '../components/dashboard/athlete/AthleteApplicationsSection';
import AthleteEngagementsSection from '../components/dashboard/athlete/AthleteEngagementsSection';
import AthleteProfileSection from '../components/dashboard/athlete/AthleteProfileSection';
import AthleteSavedSection from '../components/dashboard/athlete/AthleteSavedSection';
import { api } from '../services/api';

export default function AthleteDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('opportunities');

  const [profile, setProfile] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    Promise.all([
      api.profiles.getMyProfile().catch(() => ({ data: { profile: null } })),
      api.opportunities.getAll().catch(() => ({ data: { opportunities: [] } })),
      api.agreements.getMyAgreements().catch(() => ({ data: { agreements: [] } })),
      api.saved.getMySaved().catch(() => ({ data: { saved: [] } })),
    ]).then(([profileRes, oppsRes, agreementsRes, savedRes]) => {
      setProfile(profileRes.data?.profile || null);
      setOpportunities(oppsRes.data?.opportunities || []);
      setAgreements(agreementsRes.data?.agreements || []);
      setSaved(savedRes.data?.saved || []);
    }).finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    api.auth.logout();
    if (onLogout) {
      onLogout();
      return;
    }
    window.location.assign("/login");
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-[#17241a] text-white">Loading...</div>;
  }

  return (
    <div className="matchpoint-dashboard-layout bg-[#17241a] font-['Inter',sans-serif]">
      {/* Sidebar Navigation */}
      <AthleteSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main Panel Content */}
      <div className="matchpoint-dashboard-main bg-[#17241a]">
        <main className="matchpoint-content-viewport p-6 sm:p-8">
          {activeTab === 'opportunities' && (
            <AthleteOpportunitiesSection 
              opportunities={opportunities} 
              saved={saved}
              setSaved={setSaved}
              agreements={agreements}
              setAgreements={setAgreements}
            />
          )}
          {activeTab === 'saved' && (
            <AthleteSavedSection 
              savedOpportunities={saved}
              setSavedOpportunities={setSaved}
              onNavigateToOpportunities={() => setActiveTab('opportunities')}
            />
          )}
          {activeTab === 'applications' && (
            <AthleteApplicationsSection 
              agreements={agreements}
              opportunities={opportunities}
            />
          )}
          {activeTab === 'engagements' && (
            <AthleteEngagementsSection 
              agreements={agreements}
            />
          )}
          {activeTab === 'profile' && (
            <AthleteProfileSection 
              profile={profile}
              setProfile={setProfile}
            />
          )}
        </main>
      </div>
    </div>
  );
}

