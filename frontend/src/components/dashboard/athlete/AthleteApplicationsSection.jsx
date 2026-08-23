import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
  Send,
  Filter,
  ChevronDown,
  Clock,
  RefreshCw,
  AlertCircle,
  FileText,
  Building2
} from 'lucide-react';
import { api } from '../../../services/api';

export default function AthleteApplicationsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

  const statusFilters = ['All', 'Pending', 'Accepted', 'Rejected', 'Completed'];

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.agreements.getMyAgreements();
      const data = res?.data?.agreements || [];
      setApplications(data);
    } catch (err) {
      console.error('Failed to load athlete applications:', err);
      setError('Could not connect to live applications. Please verify backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setVisibleCount(6);
  };

  const handleStatusChange = (st) => {
    setSelectedStatus(st);
    setVisibleCount(6);
  };

  const filteredApplications = applications.filter((app) => {
    const statusLower = (app.status || 'pending').toLowerCase();
    const matchesStatus =
      selectedStatus === 'All' ||
      statusLower === selectedStatus.toLowerCase();

    const title = (app.title || '').toLowerCase();
    const academy = (app.academy_name || '').toLowerCase();
    const location = (app.opportunity_location || app.academy_location || '').toLowerCase();
    const query = searchTerm.toLowerCase();

    const matchesSearch =
      title.includes(query) ||
      academy.includes(query) ||
      location.includes(query);

    return matchesStatus && matchesSearch;
  });

  const displayedApplications = filteredApplications.slice(0, visibleCount);

  const getStatusBadge = (rawStatus) => {
    const status = (rawStatus || 'pending').toLowerCase();
    switch (status) {
      case 'accepted':
        return (
          <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shrink-0">
            <CheckCircle2 size={13} />
            <span>ACCEPTED</span>
          </span>
        );
      case 'rejected':
      case 'declined':
        return (
          <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center gap-1.5 shrink-0">
            <XCircle size={13} />
            <span>DECLINED</span>
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shrink-0">
            <CheckCircle2 size={13} />
            <span>COMPLETED</span>
          </span>
        );
      case 'pending':
      case 'submitted':
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
        <div>
          <h1 className="text-2xl font-black font-['Poppins',sans-serif] tracking-wider text-white uppercase flex items-center gap-2">
            APPLICATIONS
          </h1>
          <p className="text-xs text-gray-400 mt-0.5 font-['Inter',sans-serif]">
            Track the real-time review status of all your submitted academy applications
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-[#F2FF65]/10 text-[#F2FF65] border border-[#F2FF65]/20 px-3 py-1.5 rounded-xl font-bold">
            {filteredApplications.length} APPLIED
          </span>
        </div>
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

        {/* Status Filter Tags */}
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

      {/* Loading Skeleton */}
      {loading && applications.length === 0 ? (
        <div className="bg-[#141F16] border border-[#2A3C2E] rounded-2xl p-12 text-center text-gray-400 space-y-3">
          <RefreshCw size={24} className="animate-spin text-[#F2FF65] mx-auto" />
          <p className="text-sm font-semibold text-white">Loading your submitted applications...</p>
        </div>
      ) : error && applications.length === 0 ? (
        <div className="bg-[#141F16] border border-red-500/30 rounded-2xl p-8 text-center text-red-300 space-y-2">
          <AlertCircle size={24} className="text-red-400 mx-auto" />
          <p className="text-sm font-semibold">{error}</p>
          <button
            onClick={fetchApplications}
            className="mt-2 px-4 py-1.5 bg-red-900/40 hover:bg-red-900/60 border border-red-500/40 rounded-xl text-xs text-white font-semibold cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="bg-[#141F16] border border-[#2A3C2E] rounded-2xl p-10 text-center text-gray-400 space-y-2">
          <FileText size={32} className="text-gray-500 mx-auto" />
          <p className="text-sm font-semibold text-white">No applications match your criteria</p>
          <p className="text-xs text-gray-400">
            Browse the Opportunities feed and click "Apply for Role" to submit your application.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedApplications.map((app, idx) => {
              // Distinct card colors (Red, Blue, Dark Green) matching Saved/Engagements sections
              const cardBgColors = [
                'bg-[#95402f] border-[#b24f3c]/40',
                'bg-[#2C337F] border-[#3a44a6]/40',
                'bg-[#141F16] border-[#2A3C2E]'
              ];
              const cardStyle = cardBgColors[idx % cardBgColors.length];

              const compensationText = app.compensation_cash
                ? `₹${Number(app.compensation_cash).toLocaleString()} / month`
                : 'Competitive Compensation';

              const appliedFormattedDate = app.created_at
                ? new Date(app.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })
                : 'Recently';

              return (
                <article
                  key={app.id || app.agreement_id}
                  className={`${cardStyle} border rounded-2xl p-5 text-[#F7F8FA] font-['Inter',sans-serif] space-y-4 shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between`}
                >
                  {/* Header: Title & Status */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <h3 className="text-base font-bold font-mono tracking-wide text-white uppercase truncate">
                          {app.title || app.role || 'Opportunity'}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center gap-1.5">
                          <Building2 size={13} className="text-[#F2FF65] shrink-0" />
                          <span>{app.academy_name || 'Partner Academy'}</span>
                        </p>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>

                    {/* Location & Sport Tags */}
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 text-[#F2FF65]">
                        <MapPin size={13} />
                        {app.opportunity_location || app.academy_location || 'India'}
                      </span>
                      {app.sport && (
                        <span className="px-2 py-0.5 rounded bg-[#F2FF65]/10 text-[#F2FF65] border border-[#F2FF65]/20 text-[10px] font-mono font-bold uppercase">
                          {app.sport}
                        </span>
                      )}
                    </div>

                    {/* Compensation */}
                    <div className="text-sm sm:text-base font-bold font-mono text-[#F2FF65]">
                      {compensationText}
                    </div>

                    {/* Active Timeline */}
                    {app.opportunity_timeline && (
                      <div className="flex items-center gap-1.5 text-xs text-sky-400 font-mono font-medium">
                        <Clock size={13} />
                        <span>Timeline: {app.opportunity_timeline}</span>
                      </div>
                    )}

                    {/* Role Tag */}
                    <div className="text-xs text-gray-300 font-mono">
                      <span className="text-gray-400">Role: </span>
                      <span className="font-semibold text-white">{app.role || app.title}</span>
                    </div>
                  </div>

                  {/* Footer Applied Date & View Details Button */}
                  <div className="pt-3 border-t border-[#2A3C2E] flex items-center justify-between text-[11px] text-gray-400 font-mono mt-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-gray-500" />
                      <span>Applied on {appliedFormattedDate}</span>
                    </div>

                    <button
                      onClick={() => setSelectedApp(app)}
                      className="text-[#F2FF65] hover:underline cursor-pointer font-bold inline-flex items-center gap-1"
                    >
                      <span>Details →</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Show More Button */}
          {visibleCount < filteredApplications.length && (
            <div className="pt-2 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-6 py-2.5 bg-[#141F16] border border-[#2A3C2E] hover:border-[#F2FF65] text-[#F2FF65] text-xs font-mono font-bold uppercase rounded-lg transition-all cursor-pointer inline-flex items-center gap-2 shadow-lg"
              >
                <span>
                  SHOW MORE APPLICATIONS ({filteredApplications.length - visibleCount} REMAINING)
                </span>
                <ChevronDown size={15} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Application Details Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="w-full max-w-lg bg-[#141F16] border border-[#2A3C2E] rounded-2xl p-6 space-y-4 text-white font-['Inter',sans-serif] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#2A3C2E] pb-3">
              <div>
                <h3 className="text-lg font-bold font-mono text-[#F2FF65] uppercase">
                  {selectedApp.title}
                </h3>
                <p className="text-xs text-gray-300">{selectedApp.academy_name || 'Partner Academy'}</p>
              </div>
              {getStatusBadge(selectedApp.status)}
            </div>

            <div className="space-y-3 text-xs text-gray-200">
              <div className="flex items-center justify-between bg-[#0B120D] p-3 rounded-xl border border-[#2A3C2E]">
                <span className="text-gray-400">Application ID</span>
                <span className="font-mono font-bold">#{selectedApp.id || selectedApp.agreement_id}</span>
              </div>

              <div className="flex items-center justify-between bg-[#0B120D] p-3 rounded-xl border border-[#2A3C2E]">
                <span className="text-gray-400">Offered Compensation</span>
                <span className="font-mono font-bold text-[#F2FF65]">
                  {selectedApp.compensation_cash
                    ? `₹${Number(selectedApp.compensation_cash).toLocaleString()} / month`
                    : 'Competitive'}
                </span>
              </div>

              <div className="flex items-center justify-between bg-[#0B120D] p-3 rounded-xl border border-[#2A3C2E]">
                <span className="text-gray-400">Location</span>
                <span className="font-semibold">{selectedApp.opportunity_location || selectedApp.academy_location || 'India'}</span>
              </div>

              {selectedApp.opportunity_description && (
                <div className="bg-[#0B120D] p-3 rounded-xl border border-[#2A3C2E] space-y-1">
                  <span className="text-gray-400 font-bold uppercase text-[10px]">What You'll Do</span>
                  <p className="text-gray-200 leading-relaxed">{selectedApp.opportunity_description}</p>
                </div>
              )}

              {selectedApp.opportunity_requirements && Array.isArray(selectedApp.opportunity_requirements) && selectedApp.opportunity_requirements.length > 0 && (
                <div className="bg-[#0B120D] p-3 rounded-xl border border-[#2A3C2E] space-y-1">
                  <span className="text-gray-400 font-bold uppercase text-[10px]">Requirements</span>
                  <ul className="space-y-1 pt-1">
                    {selectedApp.opportunity_requirements.map((req, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-1.5 text-gray-300">
                        <span className="text-[#F2FF65]">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2 bg-[#F2FF65] text-[#141F16] font-bold text-xs rounded-xl hover:bg-[#e2ef4f] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
