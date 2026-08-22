import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Zap,
  X,
  UserCheck,
  Award,
  BookOpen
} from 'lucide-react';

export default function AthleteEngagementsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeModalEngagement, setActiveModalEngagement] = useState(null);

  const activeEngagements = [
    {
      id: 'eng-1',
      title: 'ASSISTANT CRICKET COACH',
      academy: 'Delhi Sports Academy',
      academyAvatar: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=150&auto=format&fit=crop&q=80',
      location: 'Delhi',
      compensation: '₹15,000 / month',
      type: 'Part-time',
      timings: '4 PM – 8 PM',
      timeline: 'Aug 15 – Sep 15, 2026',
      daysLeft: '24 Days Remaining',
      status: 'Active Now',
      nextSession: 'Tomorrow, 4:00 PM (Field Practice)',
      role: 'Assistant Cricket Coach',
      whatYouWillDo: 'Support academy training sessions and assist senior coaches during trial matches, tactical video breakdowns, and player fitness tracking.',
      requirements: [
        'Cricket playing experience at state/district level',
        'Intermediate or advanced playing credential',
        'Evening availability & tournament travel readiness'
      ],
      coordinator: 'Coach Rajesh Kumar (Head Director)'
    },
    {
      id: 'eng-2',
      title: 'JUNIOR TRACK & FIELD SPRINT FELLOWSHIP',
      academy: 'National High Performance Center',
      academyAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      location: 'Bengaluru, KA',
      compensation: '₹25,000 / month',
      type: 'Full-time',
      timings: 'Morning & Evening Sessions',
      timeline: 'Aug 10 – Sep 10, 2026',
      daysLeft: '19 Days Remaining',
      status: 'Active Now',
      nextSession: 'Today, 5:30 PM (Biomechanical Assessment)',
      role: 'Track Athlete (100m / 200m)',
      whatYouWillDo: 'Complete daily sprint drills, bi-weekly time trials, and represent the academy in national track meets.',
      requirements: [
        'Under-23 age category eligibility',
        'State or National level participation history',
        'Full-time high-intensity training commitment'
      ],
      coordinator: 'Dr. Anita Roy (High Performance Lead)'
    },
    {
      id: 'eng-3',
      title: 'SENIOR BADMINTON SPARRING PARTNER',
      academy: 'Prakash Padukone Excellence Academy',
      academyAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      location: 'Bengaluru, KA',
      compensation: '₹30,000 / month',
      type: 'Full-time',
      timings: '6 AM – 12 PM',
      timeline: 'Jul 25 – Aug 25, 2026',
      daysLeft: '3 Days Remaining',
      status: 'Active Now',
      nextSession: 'Tomorrow, 6:00 AM (Court 3 Match Play)',
      role: 'Badminton Sparring Athlete',
      whatYouWillDo: 'Spar with elite national players during morning court blocks and assist in tactical drill simulations.',
      requirements: [
        'National ranking within top 100',
        'Morning shift punctuality',
        'High physical conditioning'
      ],
      coordinator: 'U. Vimal Kumar (Senior Advisor)'
    },
    {
      id: 'eng-4',
      title: 'HIGH PERFORMANCE BASKETBALL GUARD',
      academy: 'NBA Academy India',
      academyAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      location: 'Greater Noida, UP',
      compensation: '₹35,000 / month',
      type: 'Full-time',
      timings: 'Daily Residency Training',
      timeline: 'Jul 15 – Oct 15, 2026',
      daysLeft: '54 Days Remaining',
      status: 'Active Now',
      nextSession: 'Friday, 10:00 AM (Tactical Video Review)',
      role: 'Point Guard / Shooting Guard',
      whatYouWillDo: 'Participate in international scouting combines, daily ball-handling routines, and league exhibition matches.',
      requirements: [
        'Height minimum 6ft 1in',
        'National U-18 tournament experience',
        'Full residency agreement'
      ],
      coordinator: 'Coach Scott Fleming (Technical Lead)'
    },
    {
      id: 'eng-5',
      title: 'SHOOTING 10M AIR RIFLE SCHOLAR',
      academy: 'Gun For Glory Shooting Academy',
      location: 'Pune, MH',
      compensation: '₹26,000 / month',
      type: 'Contract',
      timings: 'Morning Range Practice',
      timeline: 'Jun 28 – Sep 28, 2026',
      daysLeft: '37 Days Remaining',
      status: 'Active Now',
      nextSession: 'Saturday, 8:00 AM (Precision Trial)',
      role: '10m Air Rifle Shooter',
      whatYouWillDo: 'Log daily 60-shot series scores, participate in mental focus training, and compete in zonal trials.',
      requirements: [
        'National Rifle Association card holder',
        'Minimum average score 620+',
        'Personal air rifle equipment'
      ],
      coordinator: 'Gagan Narang (Academy Founder)'
    },
    {
      id: 'eng-6',
      title: 'ATHLETICS HIGH JUMP FELLOW',
      academy: 'Inspire Institute of Sport',
      location: 'Vijayanagar, KA',
      compensation: '₹32,000 / month',
      type: 'Full-time',
      timings: 'Full Day Sports Complex Access',
      timeline: 'Jun 02 – Dec 02, 2026',
      daysLeft: '102 Days Remaining',
      status: 'Active Now',
      nextSession: 'Today, 4:00 PM (Plyometric Conditioning)',
      role: 'High Jump Specialist',
      whatYouWillDo: 'Train under international jumps coaches with full sports science support, recovery pools, and nutrition tracking.',
      requirements: [
        'Personal best clearance 2.05m+',
        'Full year residency readiness',
        'Medical clearance'
      ],
      coordinator: 'Coach Antony Yaich (Head of Jumps)'
    }
  ];

  const filteredEngagements = activeEngagements.filter(eng => {
    return (
      eng.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eng.academy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eng.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const displayedEngagements = filteredEngagements.slice(0, visibleCount);

  return (
    <div className="engagements-pane matchpoint-fade-in max-w-5xl mx-auto space-y-5 pb-16">
      {/* Title Header */}
      <div className="flex items-center justify-between pt-1">
        <h1 className="text-2xl font-black font-['Poppins',sans-serif] tracking-wider text-white uppercase">
          ENGAGEMENTS
        </h1>
        <span className="text-xs font-mono bg-[#F2FF65]/10 text-[#F2FF65] border border-[#F2FF65]/20 px-3 py-1 rounded-xl font-bold flex items-center gap-1.5">
          <Zap size={13} className="fill-[#F2FF65]" />
          <span>{filteredEngagements.length} ACTIVE OPPORTUNITIES</span>
        </span>
      </div>

      {/* Search Bar */}
      <div className="bg-[#141F16] border border-[#2A3C2E] rounded-2xl p-4 shadow-lg">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search active opportunity title, academy, or location..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisibleCount(6);
            }}
            className="w-full pl-10 pr-4 py-2 bg-[#0B120D] border border-[#2A3C2E] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2FF65] transition-colors font-['Inter',sans-serif]"
          />
        </div>
      </div>

      {/* Active Engagements 2-Column Cards Grid */}
      {filteredEngagements.length === 0 ? (
        <div className="bg-[#141F16] border border-[#2A3C2E] rounded-2xl p-10 text-center text-gray-400">
          <p className="text-sm font-semibold text-white">No active engagements found</p>
          <p className="text-xs mt-1">Try searching or applying to new opportunities.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedEngagements.map((eng, idx) => {
              const cardBgColors = [
                'bg-[#95402f] border-[#b24f3c]/40',
                'bg-[#2C337F] border-[#3a44a6]/40',
                'bg-[#141F16] border-[#2A3C2E]'
              ];
              const cardStyle = cardBgColors[idx % cardBgColors.length];

              return (
                <article
                  key={eng.id}
                  className={`${cardStyle} border rounded-2xl p-5 text-[#F7F8FA] font-['Inter',sans-serif] space-y-4 shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                >
                  {/* Header: Title & Active Status */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <h3 className="text-base font-bold font-mono tracking-wide text-white uppercase">
                          {eng.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-gray-300">
                          {eng.academy}
                        </p>
                      </div>

                      <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-black/20 text-white/80 border border-white/10 flex items-center gap-1.5 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{eng.status.toUpperCase()}</span>
                      </span>
                    </div>

                    {/* Location Tag */}
                    <div className="flex items-center gap-1.5 text-xs text-[#F2FF65]">
                      <MapPin size={14} />
                      <span>{eng.location}</span>
                    </div>

                    {/* Days Remaining & Active Badge */}
                    <div className="flex items-center justify-between text-xs text-gray-300 font-mono pt-1">
                      <span className="text-gray-400">Time Remaining:</span>
                      <p className="text-[#F2FF65] font-bold">
                        ⏳ {eng.daysLeft}
                      </p>
                    </div>

                    {/* Compensation */}
                    <div className="text-sm sm:text-base font-bold font-mono text-white">
                      {eng.compensation}
                    </div>

                    {/* Schedule & Timings */}
                    <div className="space-y-1 text-xs text-gray-200 font-mono">
                      <p className="font-medium">{eng.type}</p>
                      <p className="text-gray-400">{eng.timings}</p>
                    </div>

                    {/* Next Session Note */}
                    <div className="text-xs bg-black/20 p-2 rounded border border-white/10 text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="shrink-0 text-emerald-400" />
                      <span className="truncate">Next: {eng.nextSession}</span>
                    </div>
                  </div>

                  {/* Footer Action: ONLY View Hub button (Message button removed) */}
                  <div className="pt-3 border-t border-white/10 mt-2">
                    <button
                      onClick={() => setActiveModalEngagement(eng)}
                      className="w-full py-2 bg-[#F2FF65] hover:bg-[#e2ef4f] text-[#141F16] rounded-lg text-xs font-mono font-bold uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                    >
                      <span>VIEW HUB</span>
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Show More Button */}
          {visibleCount < filteredEngagements.length && (
            <div className="pt-2 text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-6 py-2.5 bg-[#141F16] border border-[#2A3C2E] hover:border-[#F2FF65] text-[#F2FF65] text-xs font-mono font-bold uppercase rounded-lg transition-all cursor-pointer inline-flex items-center gap-2 shadow-lg"
              >
                <span>SHOW MORE ENGAGEMENTS ({filteredEngagements.length - visibleCount} REMAINING)</span>
                <ChevronDown size={15} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* COMPLETE ENGAGEMENT DETAIL MODAL WITH BACKGROUND BLUR */}
      {activeModalEngagement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md matchpoint-fade-in">
          <div
            className="bg-[#141F16] border border-[#2A3C2E] w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-y-auto shadow-2xl text-[#F7F8FA] font-['Inter',sans-serif] space-y-5 p-6 relative scrollbar-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalEngagement(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#0B120D] border border-[#2A3C2E] text-gray-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 pr-10">
              <img
                src={activeModalEngagement.academyAvatar}
                alt={activeModalEngagement.academy}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#2A3C2E]"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    ACTIVE ENGAGEMENT
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-mono tracking-wide text-white uppercase">
                  {activeModalEngagement.title}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-gray-300">
                  {activeModalEngagement.academy}
                </p>
              </div>
            </div>

            <hr className="border-t border-[#2A3C2E]" />

            {/* Key Quick Parameters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#0B120D] p-4 rounded-xl border border-[#2A3C2E] text-xs font-mono">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase">LOCATION</span>
                <p className="text-white font-semibold flex items-center gap-1">
                  <MapPin size={13} className="text-[#F2FF65]" />
                  <span>{activeModalEngagement.location}</span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase">COMPENSATION</span>
                <p className="text-[#F2FF65] font-bold">
                  {activeModalEngagement.compensation}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase">SCHEDULE</span>
                <p className="text-gray-200 font-semibold">{activeModalEngagement.type}</p>
              </div>
            </div>

            {/* Active Timeline & Duration */}
            <div className="p-4 bg-[#17241A] rounded-xl border border-[#2A3C2E] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>Active Timeline: {activeModalEngagement.timeline}</span>
                </span>
                <span className="text-[#F2FF65] text-[11px]">
                  ⏳ {activeModalEngagement.daysLeft}
                </span>
              </div>
              <p className="text-xs text-gray-300">
                Next Upcoming Session: <span className="text-white font-semibold">{activeModalEngagement.nextSession}</span>
              </p>
            </div>

            {/* Role & Responsibilities */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#F2FF65] uppercase flex items-center gap-1.5">
                <BookOpen size={14} />
                <span>WHAT YOU WILL DO</span>
              </h4>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed bg-[#0B120D] p-4 rounded-xl border border-[#2A3C2E]">
                {activeModalEngagement.whatYouWillDo}
              </p>
            </div>

            {/* Requirements & Criteria */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#F2FF65] uppercase flex items-center gap-1.5">
                <Award size={14} />
                <span>ENGAGEMENT REQUIREMENTS</span>
              </h4>
              <ul className="space-y-2 text-xs text-gray-200 bg-[#0B120D] p-4 rounded-xl border border-[#2A3C2E]">
                {activeModalEngagement.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#F2FF65] font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Academy Coordinator */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase flex items-center gap-1.5">
                <UserCheck size={14} />
                <span>ACADEMY COORDINATOR</span>
              </h4>
              <div className="p-3 bg-[#0B120D] rounded-xl border border-[#2A3C2E] text-xs font-mono text-gray-300">
                {activeModalEngagement.coordinator}
              </div>
            </div>

            {/* Close Button Footer */}
            <div className="pt-2">
              <button
                onClick={() => setActiveModalEngagement(null)}
                className="w-full py-2.5 bg-[#0B120D] hover:bg-[#1C2A1E] text-white border border-[#2A3C2E] rounded-xl text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
              >
                CLOSE DETAIL HUB
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
