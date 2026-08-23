import React, { useState } from 'react';
import AcademySidebar from '../academics/AcademySidebar';
import AcademyHeader from '../academics/AcademyHeader';
import AcademyOverviewSection from '../academics/AcademyOverviewSection';
import AcademyAthletesSection from '../academics/AcademyAthletesSection';
import AcademyOpportunitiesSection from '../academics/AcademyOpportunitiesSection';
import AcademyApplicationsSection from '../academics/AcademyApplicationsSection';
import AcademyTalentPoolSection from '../academics/AcademyTalentPoolSection';
import AcademyEngagementsSection from '../academics/AcademyEngagementsSection';
import AcademyProfilePage from '../academics/AcademyProfilePage';

export default function AcademyDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const academy = {
    name: 'Stride Sports Academy',
    type: 'Multi-Sport Academy',
    location: 'Mumbai, India',
    verified: true,
    stats: {
      activeOpportunities: 4,
      totalApplications: 28,
      athletesInTalentPool: 64,
      activeEngagements: 7,
    },
  };

  const athletes = [
    {
      id: 1,
      name: 'Arjun Singh',
      sport: 'Football',
      position: 'Midfielder',
      level: 'Professional',
      location: 'Mumbai, India',
      rating: '4.8',
      verified: true,
    },
    {
      id: 2,
      name: 'Riya Sharma',
      sport: 'Athletics',
      position: 'Sprinter',
      level: 'National',
      location: 'Pune, India',
      rating: '4.7',
      verified: true,
    },
    {
      id: 3,
      name: 'Kabir Mehta',
      sport: 'Cricket',
      position: 'All-Rounder',
      level: 'State',
      location: 'Delhi, India',
      rating: '4.6',
      verified: true,
    },
    {
      id: 4,
      name: 'Ananya Patil',
      sport: 'Badminton',
      position: 'Singles',
      level: 'National',
      location: 'Bengaluru, India',
      rating: '4.9',
      verified: true,
    },
  ];

  const opportunities = [
    {
      id: 1,
      title: 'Football Coach',
      sport: 'Football',
      location: 'Mumbai, India',
      status: 'Open',
      applicationCount: 12,
    },
    {
      id: 2,
      title: 'Performance Analyst',
      sport: 'Football',
      location: 'Pune, India',
      status: 'Open',
      applicationCount: 8,
    },
    {
      id: 3,
      title: 'Athletics Trainer',
      sport: 'Athletics',
      location: 'Bengaluru, India',
      status: 'Draft',
      applicationCount: 0,
    },
  ];

  const applications = [
    {
      id: 'APP-104',
      athlete: 'Arjun Singh',
      opportunity: 'Football Coach',
      date: 'Aug 20, 2026',
      status: 'Under Review',
    },
    {
      id: 'APP-098',
      athlete: 'Riya Sharma',
      opportunity: 'Athletics Trainer',
      date: 'Aug 18, 2026',
      status: 'Pending',
    },
    {
      id: 'APP-072',
      athlete: 'Kabir Mehta',
      opportunity: 'Performance Analyst',
      date: 'Aug 15, 2026',
      status: 'Approved',
    },
    {
      id: 'APP-061',
      athlete: 'Ananya Patil',
      opportunity: 'Football Coach',
      date: 'Aug 10, 2026',
      status: 'Declined',
    },
  ];

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
        {/* <AcademyHeader
          academy={academy}
          onProfileClick={() => setActiveTab('profile')}
        /> */}

        {/* PAGE CONTENT */}
        <main className="matchpoint-content-viewport min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          {/* HOME */}
          {activeTab === 'dashboard' && (
            <AcademyOverviewSection
              academy={academy}
              athletes={athletes}
              opportunities={opportunities}
              applications={applications}
              setActiveTab={setActiveTab}
            />
          )}

          {/* OPPORTUNITIES */}
          {activeTab === 'opportunities' && (
            <AcademyOpportunitiesSection
              opportunities={opportunities}
              applications={applications}
              setActiveTab={setActiveTab}
            />
          )}

          {/* APPLICATIONS */}
          {activeTab === 'applications' && (
            <AcademyApplicationsSection
              applications={applications}
              opportunities={opportunities}
              athletes={athletes}
            />
          )}

          {/* ENGAGEMENTS */}
          {activeTab === 'engagements' && (
            <AcademyEngagementsSection
              setActiveTab={setActiveTab}
            />
          )}

          {/* ACADEMY PROFILE */}
          {activeTab === 'profile' && (
            <AcademyProfilePage
              academy={academy}
              onViewOpportunity={() => setActiveTab('opportunities')}
            />
          )}
        </main>
      </div>
    </div>
  );
}