import React, { useState } from 'react';
import { Search, MapPin, Calendar, CheckCircle2, XCircle, Send, Filter, ChevronDown, Clock } from 'lucide-react';

export default function AthleteApplicationsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  const applications = [
    {
      id: 'app-1',
      title: 'ASSISTANT CRICKET COACH',
      academy: 'Delhi Sports Academy',
      location: 'Delhi',
      compensation: '₹15,000 / month',
      type: 'Part-time',
      timings: '4 PM – 8 PM',
      appliedDate: 'Aug 20, 2026',
      status: 'Submitted'
    },
    {
      id: 'app-2',
      title: 'JUNIOR TRACK & FIELD SPRINT FELLOWSHIP',
      academy: 'National High Performance Center',
      location: 'Bengaluru, KA',
      compensation: '₹25,000 / month',
      type: 'Full-time',
      timings: 'Morning & Evening Sessions',
      appliedDate: 'Aug 18, 2026',
      status: 'Accepted'
    },
    {
      id: 'app-3',
      title: 'ACADEMY FOOTBALL FORWARD TRAINEE',
      academy: 'Premier Football Development Hub',
      location: 'Mumbai, MH',
      compensation: '₹20,000 / month',
      type: 'Contract',
      timings: 'Weekend Competitive League',
      appliedDate: 'Aug 12, 2026',
      status: 'Declined'
    },
    {
      id: 'app-4',
      title: 'YOUTH TENNIS ASSISTANT TRAINER',
      academy: 'Apex Tennis Foundation',
      location: 'Hyderabad, TS',
      compensation: '₹18,000 / month',
      type: 'Part-time',
      timings: '7 AM – 11 AM',
      appliedDate: 'Jul 28, 2026',
      status: 'Submitted'
    },
    {
      id: 'app-5',
      title: 'SENIOR BADMINTON SPARRING PARTNER',
      academy: 'Prakash Padukone Excellence Academy',
      location: 'Bengaluru, KA',
      compensation: '₹30,000 / month',
      type: 'Full-time',
      timings: '6 AM – 12 PM',
      appliedDate: 'Jul 25, 2026',
      status: 'Accepted'
    },
    {
      id: 'app-6',
      title: 'SWIMMING STRENGTH & CONDITIONING FELLOW',
      academy: 'Aqua Champs Aquatic Center',
      location: 'Chennai, TN',
      compensation: '₹22,000 / month',
      type: 'Contract',
      timings: '3 PM – 7 PM',
      appliedDate: 'Jul 20, 2026',
      status: 'Submitted'
    },
    {
      id: 'app-7',
      title: 'HIGH PERFORMANCE BASKETBALL GUARD',
      academy: 'NBA Academy India',
      location: 'Greater Noida, UP',
      compensation: '₹35,000 / month',
      type: 'Full-time',
      timings: 'Daily Residency Training',
      appliedDate: 'Jul 15, 2026',
      status: 'Accepted'
    },
    {
      id: 'app-8',
      title: 'TABLE TENNIS JUNIOR COACH',
      academy: 'Stag International TT Hub',
      location: 'Kolkata, WB',
      compensation: '₹16,000 / month',
      type: 'Part-time',
      timings: '5 PM – 8 PM',
      appliedDate: 'Jul 10, 2026',
      status: 'Declined'
    },
    {
      id: 'app-9',
      title: 'ARCHERY RECURVE PROSPECT',
      academy: 'Tata Archery Academy',
      location: 'Jamshedpur, JH',
      compensation: '₹28,000 / month',
      type: 'Full-time',
      timings: '6 AM – 4 PM',
      appliedDate: 'Jul 05, 2026',
      status: 'Submitted'
    },
    {
      id: 'app-10',
      title: 'SHOOTING 10M AIR RIFLE SCHOLAR',
      academy: 'Gun For Glory Shooting Academy',
      location: 'Pune, MH',
      compensation: '₹26,000 / month',
      type: 'Contract',
      timings: 'Morning Range Practice',
      appliedDate: 'Jun 28, 2026',
      status: 'Accepted'
    },
    {
      id: 'app-11',
      title: 'FIELD HOCKEY MIDFIELD CANDIDATE',
      academy: 'Odisha Naval Tata Hockey Academy',
      location: 'Bhubaneswar, OD',
      compensation: '₹24,000 / month',
      type: 'Full-time',
      timings: 'Stadium Training Shift',
      appliedDate: 'Jun 20, 2026',
      status: 'Submitted'
    },
    {
      id: 'app-12',
      title: 'VOLLEYBALL BLOCKER TRAINEE',
      academy: 'Calicut Heroes Development Wing',
      location: 'Kozhikode, KL',
      compensation: '₹17,000 / month',
      type: 'Part-time',
      timings: '4 PM – 7 PM',
      appliedDate: 'Jun 15, 2026',
      status: 'Declined'
    },
    {
      id: 'app-13',
      title: 'BOXING AMATEUR FLYWEIGHT PROSPECT',
      academy: 'Bhiwani Boxing Club',
      location: 'Bhiwani, HR',
      compensation: '₹21,000 / month',
      type: 'Full-time',
      timings: '5 AM – 11 AM',
      appliedDate: 'Jun 10, 2026',
      status: 'Submitted'
    },
    {
      id: 'app-14',
      title: 'ATHLETICS HIGH JUMP FELLOW',
      academy: 'Inspire Institute of Sport',
      location: 'Vijayanagar, KA',
      compensation: '₹32,000 / month',
      type: 'Full-time',
      timings: 'Full Day Sports Complex Access',
      appliedDate: 'Jun 02, 2026',
      status: 'Accepted'
    }
  ];

  const statusFilters = ['All', 'Submitted', 'Accepted', 'Declined'];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setVisibleCount(6);
  };

  const handleStatusChange = (st) => {
    setSelectedStatus(st);
    setVisibleCount(6);
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = selectedStatus === 'All' || app.status === selectedStatus;
    const matchesSearch =
      app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.academy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const displayedApplications = filteredApplications.slice(0, visibleCount);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return (
          <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shrink-0">
            <CheckCircle2 size={13} />
            <span>ACCEPTED</span>
          </span>
        );
      case 'Declined':
        return (
          <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center gap-1.5 shrink-0">
            <XCircle size={13} />
            <span>DECLINED</span>
          </span>
        );
      case 'Submitted':
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-sky-500/15 text-sky-400 border border-sky-500/30 flex items-center gap-1.5 shrink-0">
            <Send size={13} />
            <span>SUBMITTED</span>
          </span>
        );
    }
  };

  return (
    <div className="applications-pane matchpoint-fade-in max-w-5xl mx-auto space-y-5 pb-16">
      {/* Title Header */}
      <div className="flex items-center justify-between pt-1">
        <h1 className="text-2xl font-black font-['Poppins',sans-serif] tracking-wider text-white uppercase">
          APPLICATIONS
        </h1>
        <span className="text-xs font-mono bg-[#F2FF65]/10 text-[#F2FF65] border border-[#F2FF65]/20 px-3 py-1 rounded-xl font-bold">
          {filteredApplications.length} APPLIED
        </span>
      </div>

      {/* Search & Status Filter Bar */}
      <div className="bg-[#141F16] border border-[#2A3C2E] rounded-2xl p-4 space-y-3 shadow-lg">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search applied opportunity title, academy, or location..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 bg-[#0B120D] border border-[#2A3C2E] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2FF65] transition-colors font-['Inter',sans-serif]"
          />
        </div>

        {/* 3 Status Filter Tags: All, Submitted, Accepted, Declined */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-1">
          <Filter size={13} className="text-gray-400 shrink-0 mr-1" />
          {statusFilters.map((st) => (
            <button
              key={st}
              onClick={() => handleStatusChange(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-['Poppins',sans-serif] font-bold tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                selectedStatus === st
                  ? 'bg-[#F2FF65] text-[#141F16] shadow-sm'
                  : 'bg-[#0B120D] text-gray-300 hover:text-white border border-[#2A3C2E]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applied Cards 2-Column Grid */}
      {filteredApplications.length === 0 ? (
        <div className="bg-[#141F16] border border-[#2A3C2E] rounded-2xl p-10 text-center text-gray-400">
          <p className="text-sm font-semibold text-white">No applications found</p>
          <p className="text-xs mt-1">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedApplications.map((app, idx) => {
              const cardBgColors = [
                'bg-[#95402f] border-[#b24f3c]/40',
                'bg-[#2C337F] border-[#3a44a6]/40',
                'bg-[#141F16] border-[#2A3C2E]'
              ];
              const cardStyle = cardBgColors[idx % cardBgColors.length];

              return (
                <article
                  key={app.id}
                  className={`${cardStyle} border rounded-2xl p-5 text-[#F7F8FA] font-['Inter',sans-serif] space-y-4 shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                >
                {/* Header: Title & Status */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold font-mono tracking-wide text-white uppercase">
                        {app.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-gray-300">
                        {app.academy}
                      </p>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>

                  {/* Location Tag */}
                  <div className="flex items-center gap-1.5 text-xs text-[#F2FF65]">
                    <MapPin size={14} />
                    <span>{app.location}</span>
                  </div>

                  {/* Compensation */}
                  <div className="text-sm sm:text-base font-bold font-mono text-[#F2FF65]">
                    {app.compensation}
                  </div>

                  {/* Active Timeline */}
                  <div className="flex items-center gap-1.5 text-xs text-sky-400 font-mono font-medium">
                    <Clock size={13} />
                    <span>Active: {app.timeline || 'Aug 15 – Sep 15, 2026'}</span>
                  </div>

                  {/* Schedule & Timings */}
                  <div className="space-y-1 text-xs text-gray-200 font-mono">
                    <p className="font-medium">{app.type}</p>
                    <p className="text-gray-400">{app.timings}</p>
                  </div>
                </div>

                {/* Footer Applied Date */}
                <div className="pt-3 border-t border-[#2A3C2E] flex items-center justify-between text-[11px] text-gray-400 font-mono mt-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-gray-500" />
                    <span>Applied on {app.appliedDate}</span>
                  </div>

                  <button
                    onClick={() => alert(`Viewing details for ${app.title}`)}
                    className="text-[#F2FF65] hover:underline cursor-pointer font-bold"
                  >
                    View Status →
                  </button>
                </div>
              </article>
            );
          })}
        </div>

          {/* Show More Button (Loads 6 more cards each click) */}
          {visibleCount < filteredApplications.length && (
            <div className="pt-2 text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-6 py-2.5 bg-[#141F16] border border-[#2A3C2E] hover:border-[#F2FF65] text-[#F2FF65] text-xs font-mono font-bold uppercase rounded-lg transition-all cursor-pointer inline-flex items-center gap-2 shadow-lg"
              >
                <span>SHOW MORE APPLICATIONS ({filteredApplications.length - visibleCount} REMAINING)</span>
                <ChevronDown size={15} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
