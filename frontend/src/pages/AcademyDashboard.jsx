import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AcademySidebar from '../academics/AcademySidebar';
import AcademyHeader from '../academics/AcademyHeader';
import AcademyOverviewSection from '../academics/AcademyOverviewSection';
import AcademyAthletesSection from '../academics/AcademyAthletesSection';
import AcademyOpportunitiesSection from '../academics/AcademyOpportunitiesSection';
import AcademyApplicationsSection from '../academics/AcademyApplicationsSection';
import AcademyTalentPoolSection from '../academics/AcademyTalentPoolSection';
import AcademyEngagementsSection from '../academics/AcademyEngagementsSection';
import AcademyAgreementsSection from '../academics/AcademyAgreementsSection';
import AcademyReviewsSection from '../academics/AcademyReviewsSection';
import AcademySettingsSection from '../academics/AcademySettingsSection';
import AcademyProfilePage from '../academics/AcademyProfilePage';

export default function AcademyDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [academy, setAcademy] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.profiles.getMyProfile().catch(() => ({ data: { profile: null } })),
      api.opportunities.getMyPosted().catch(() => ({ data: { opportunities: [] } })),
      api.agreements.getMyAgreements().catch(() => ({ data: { agreements: [] } })),
      api.profiles.getAllAthletes().catch(() => ({ data: { athletes: [] } })),
    ]).then(([profileRes, oppsRes, agreementsRes, athletesRes]) => {
      setAcademy(profileRes.data?.profile || null);
      setOpportunities(oppsRes.data?.opportunities || []);
      setAgreements(agreementsRes.data?.agreements || []);
      setAthletes(athletesRes.data?.athletes || []);
    }).finally(() => setLoading(false));
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.agreements.updateStatus(id, 'accepted');
      setAgreements(prev => prev.map(a => a.id === id ? { ...a, status: 'accepted' } : a));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecline = async (id) => {
    try {
      await api.agreements.updateStatus(id, 'rejected');
      setAgreements(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected' } : a));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveProfile = async (data) => {
    try {
      const res = await api.profiles.updateMyProfile(data);
      setAcademy(res.data.profile);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-[#2A3C2E] text-[#F7F5ED]">Loading...</div>;
  }

  return (
    <div className="matchpoint-dashboard-layout min-h-screen">
      {/* SIDEBAR */}
      <AcademySidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />

      {/* MAIN AREA */}
      <div className="matchpoint-dashboard-main min-w-0 lg:ml-[308px]">
        <AcademyHeader
          academy={academy}
          onProfileClick={() => setActiveTab('profile')}
        />

        {/* PAGE CONTENT */}
        <main className="matchpoint-content-viewport min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          {/* HOME */}
          {activeTab === 'dashboard' && (
            <AcademyOverviewSection
              academy={academy}
              opportunities={opportunities}
              agreements={agreements}
              athletes={athletes}
              setActiveTab={setActiveTab}
            />
          )}

          {/* OPPORTUNITIES */}
          {activeTab === 'opportunities' && (
            <AcademyOpportunitiesSection
              opportunities={opportunities}
              agreements={agreements}
              setActiveTab={setActiveTab}
            />
          )}

          {/* ATHLETES SCOUTING & DIRECTORY */}
          {activeTab === 'athletes' && (
            <AcademyAthletesSection
              athletes={athletes}
              setActiveTab={setActiveTab}
            />
          )}

          {/* APPLICATIONS */}
          {activeTab === 'applications' && (
            <AcademyApplicationsSection
              agreements={agreements}
              onApprove={handleApprove}
              onDecline={handleDecline}
            />
          )}

          {/* ENGAGEMENTS */}
          {activeTab === 'engagements' && (
            <AcademyEngagementsSection
              agreements={agreements}
              setActiveTab={setActiveTab}
            />
          )}

          {/* AGREEMENTS */}
          {activeTab === 'agreements' && (
            <AcademyAgreementsSection
              agreements={agreements}
            />
          )}

          {/* REVIEWS */}
          {activeTab === 'reviews' && (
            <AcademyReviewsSection />
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <AcademySettingsSection onLogout={onLogout} />
          )}

          {/* ACADEMY PROFILE */}
          {activeTab === 'profile' && (
            <AcademyProfilePage
              academy={academy}
              onSaveProfile={handleSaveProfile}
              onViewOpportunity={() => setActiveTab('opportunities')}
            />
          )}
        </main>
      </div>
    </div>
  );
}
