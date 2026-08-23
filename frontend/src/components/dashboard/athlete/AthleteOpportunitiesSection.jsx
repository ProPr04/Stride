import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Send,
  Share2,
  Check,
  CheckCircle2,
  Filter,
  ChevronDown,
  Clock,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Bookmark
} from 'lucide-react';
import { api } from '../../../services/api';

export default function AthleteOpportunitiesSection({ saved = [], setSaved = () => {} }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  const [opportunities, setOpportunities] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState(null);
  const [error, setError] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const sportsFilter = ['All', 'Cricket', 'Track & Field', 'Football', 'Tennis', 'Basketball', 'Badminton'];

  // Fetch opportunities from Backend API
  const fetchOpportunities = async () => {
    setLoading(true);
    setError(null);
    try {
      const filters = {};
      if (selectedSport !== 'All') filters.sport = selectedSport;
      if (searchTerm.trim()) filters.search = searchTerm.trim();

      const res = await api.opportunities.getAll(filters);
      const data = res?.data?.opportunities || [];
      setOpportunities(data);
    } catch (err) {
      console.error('Failed to load opportunities:', err);
      setError('Could not connect to live opportunities. Please verify backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Athlete's submitted applications to track 'Applied' state
  const fetchMyAgreements = async () => {
    try {
      const res = await api.agreements.getMyAgreements();
      const agreements = res?.data?.agreements || [];
      const appliedOpportunityIds = agreements.map((agr) => agr.opportunity_id);
      setAppliedIds(appliedOpportunityIds);
    } catch (err) {
      // Non-blocking in dev mode
      console.warn('Agreements fetch notice:', err.message);
    }
  };

  // Initial load and filter change trigger
  useEffect(() => {
    fetchOpportunities();
    fetchMyAgreements();
  }, [selectedSport]);

  // Debounced search trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOpportunities();
    }, 350);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Apply for an opportunity
  const handleApply = async (opportunity) => {
    if (appliedIds.includes(opportunity.id)) return;

    setApplyingId(opportunity.id);
    setFeedbackMessage(null);

    try {
      await api.agreements.apply(opportunity.id, opportunity.academy_id);
      setAppliedIds((prev) => [...prev, opportunity.id]);
      setFeedbackMessage({
        type: 'success',
        text: `Successfully applied to "${opportunity.title}"! Academy has received your application.`
      });
      setTimeout(() => setFeedbackMessage(null), 5000);
    } catch (err) {
      const errorMsg = err.message || 'Failed to submit application. Please try again.';
      setFeedbackMessage({
        type: 'error',
        text: errorMsg.includes('already applied')
          ? 'You have already applied for this opportunity.'
          : errorMsg
      });
      setTimeout(() => setFeedbackMessage(null), 5000);
    } finally {
      setApplyingId(null);
    }
  };

  const handleSaveToggle = async (opp) => {
    const isSaved = saved.some((s) => s.opportunity_id === opp.id);
    try {
      if (isSaved) {
        await api.saved.unsave(opp.id);
        setSaved((prev) => prev.filter((s) => s.opportunity_id !== opp.id));
      } else {
        await api.saved.save(opp.id);
        // Optimistically add to saved
        setSaved((prev) => [...prev, { opportunity_id: opp.id, ...opp }]);
      }
    } catch (err) {
      setFeedbackMessage({ type: 'error', text: 'Failed to update saved status.' });
      setTimeout(() => setFeedbackMessage(null), 3000);
    }
  };

  const toggleExpand = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Format posted date
  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="opportunities-pane matchpoint-fade-in max-w-2xl mx-auto space-y-5 pb-16">
      {/* Opportunities Section Title Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-2xl font-black font-['Poppins',sans-serif] tracking-wider text-white uppercase flex items-center gap-2">
            OPPORTUNITIES
          </h1>
          <p className="text-xs text-gray-400 mt-0.5 font-['Inter',sans-serif]">
            Verified academy listings with direct application submissions
          </p>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {feedbackMessage && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
              : 'bg-red-950/80 border-red-500/50 text-red-300'
          }`}
        >
          {feedbackMessage.type === 'success' ? (
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle size={16} className="text-red-400 shrink-0" />
          )}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Sleek Search & Category Bar */}
      <div className="bg-[#141F16] border border-[#2A3C2E] rounded-2xl p-4 space-y-3 shadow-lg">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search opportunity title, role, academy, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#0B120D] border border-[#2A3C2E] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2FF65] transition-colors font-['Inter',sans-serif]"
          />
        </div>

        {/* Sport Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-1">
          <Filter size={13} className="text-gray-400 shrink-0 mr-1" />
          {sportsFilter.map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-['Poppins',sans-serif] font-bold tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                selectedSport === sport
                  ? 'bg-[#F2FF65] text-[#141F16] shadow-sm'
                  : 'bg-[#0B120D] text-gray-300 hover:text-white border border-[#2A3C2E]'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Stream */}
      <div className="space-y-6">
        {loading && opportunities.length === 0 ? (
          <div className="bg-[#141F16] border border-[#2A3C2E] rounded-2xl p-12 text-center text-gray-400 space-y-3">
            <RefreshCw size={24} className="animate-spin text-[#F2FF65] mx-auto" />
            <p className="text-sm font-semibold text-white">Loading live opportunities from backend...</p>
          </div>
        ) : error && opportunities.length === 0 ? (
          <div className="bg-[#141F16] border border-red-500/30 rounded-2xl p-8 text-center text-red-300 space-y-2">
            <AlertCircle size={24} className="text-red-400 mx-auto" />
            <p className="text-sm font-semibold">{error}</p>
            <button
              onClick={fetchOpportunities}
              className="mt-2 px-4 py-1.5 bg-red-900/40 hover:bg-red-900/60 border border-red-500/40 rounded-xl text-xs text-white font-semibold cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : opportunities.length === 0 ? (
          <div className="bg-[#141F16] border border-[#2A3C2E] rounded-2xl p-10 text-center text-gray-400">
            <p className="text-sm font-semibold text-white">No active opportunities found</p>
            <p className="text-xs mt-1">Try adjusting your sport category filter or search terms.</p>
          </div>
        ) : (
          opportunities.map((opp, idx) => {
            const isApplied = appliedIds.includes(opp.id);
            const isExpanded = !!expandedPosts[opp.id];
            const isApplying = applyingId === opp.id;
            const captionText = opp.caption || opp.description || `Active opportunity for ${opp.role} in ${opp.sport}. Verified academy placement.`;
            const isCaptionLong = captionText.length > 110;
            const compensationFormatted = opp.compensation_cash
              ? `₹${Number(opp.compensation_cash).toLocaleString()} / month`
              : 'Competitive Compensation';

            // Distinct card background themes (cycling through rich, vibrant dark colors)
            const cardThemes = [
              {
                outer: 'bg-[#95402f] border-[#b24f3c]/40',
                inner: 'bg-black/25 border-t border-b border-white/10',
                footer: 'bg-black/30',
                tag: 'bg-white/15 text-white border border-white/20',
              },
              {
                outer: 'bg-[#2C337F] border-[#3a44a6]/40',
                inner: 'bg-black/25 border-t border-b border-white/10',
                footer: 'bg-black/30',
                tag: 'bg-white/15 text-white border border-white/20',
              },
              {
                outer: 'bg-[#315038] border-[#446d4c]/50',
                inner: 'bg-black/25 border-t border-b border-white/10',
                footer: 'bg-black/30',
                tag: 'bg-[#F2FF65]/15 text-[#F2FF65] border border-[#F2FF65]/20',
              },
              {
                outer: 'bg-[#2D1F3F] border-[#483363]/50',
                inner: 'bg-black/25 border-t border-b border-white/10',
                footer: 'bg-black/30',
                tag: 'bg-purple-300/15 text-purple-200 border border-purple-300/20',
              },
              {
                outer: 'bg-[#1E3A40] border-[#2D565E]/50',
                inner: 'bg-black/25 border-t border-b border-white/10',
                footer: 'bg-black/30',
                tag: 'bg-teal-300/15 text-teal-200 border border-teal-300/20',
              },
            ];
            const theme = cardThemes[idx % cardThemes.length];

            return (
              <article
                key={opp.id}
                className={`${theme.outer} border rounded-2xl overflow-hidden text-[#F7F8FA] font-['Inter',sans-serif] shadow-xl hover:-translate-y-0.5 transition-all duration-300`}
              >
                {/* 1. Academy Header */}
                <div className="p-4 sm:p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black/30 border border-white/15 flex items-center justify-center font-bold text-sm text-[#F2FF65]">
                      {opp.academy_name ? opp.academy_name.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-white">
                          {opp.academy_name || 'Partner Academy'}
                        </h3>
                        <CheckCircle2 size={14} className="text-[#F2FF65]" />
                      </div>
                      <p className="text-[11px] text-gray-300">{formatTimeAgo(opp.created_at)}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-lg ${theme.tag} text-[10px] font-mono font-bold uppercase`}>
                    {opp.sport}
                  </span>
                </div>

                {/* 2. Caption Text */}
                <div className="px-4 sm:px-5 pb-3">
                  <p className="text-xs sm:text-sm text-gray-100 leading-relaxed">
                    {isExpanded || !isCaptionLong
                      ? captionText
                      : `${captionText.slice(0, 110)}... `}
                    {isCaptionLong && (
                      <button
                        onClick={() => toggleExpand(opp.id)}
                        className="text-[#F2FF65] font-semibold text-xs hover:underline cursor-pointer ml-1 inline-flex items-center gap-0.5"
                      >
                        <span>{isExpanded ? 'Show Less' : 'see more'}</span>
                        <ChevronDown size={13} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </p>
                </div>

                {/* 3. Media Image (if available) */}
                {opp.media_image && (
                  <div className="w-full max-h-[320px] overflow-hidden bg-black/40">
                    <img
                      src={opp.media_image}
                      alt={opp.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* 4. Structured Opportunity Details */}
                <div className={`p-4 sm:p-5 ${theme.inner} space-y-4`}>
                  {/* Opportunity Title & Status */}
                  <div className="space-y-1">
                    <h4 className="text-base font-bold font-mono tracking-wide text-white uppercase">
                      {opp.title}
                    </h4>
                    <p className="text-xs font-semibold text-gray-200">{opp.academy_name || 'Partner Academy'}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-200 pt-1">
                      <span className="flex items-center gap-1 text-[#F2FF65]">
                        <MapPin size={13} />
                        {opp.display_location || opp.location || opp.academy_location || 'India'}
                      </span>
                      <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {opp.status === 'active' ? 'Active Opportunity' : opp.status}
                      </span>
                    </div>
                  </div>

                  <hr className="border-t border-white/10" />

                  {/* ACTIVE TIMELINE */}
                  {opp.timeline && (
                    <>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-gray-300 uppercase">
                          ACTIVE TIMELINE
                        </span>
                        <p className="text-xs sm:text-sm text-sky-300 font-mono font-semibold flex items-center gap-1.5">
                          <Clock size={14} />
                          <span>{opp.timeline}</span>
                        </p>
                      </div>
                      <hr className="border-t border-white/10" />
                    </>
                  )}

                  {/* ROLE */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-gray-300 uppercase">
                      ROLE
                    </span>
                    <p className="text-xs sm:text-sm text-gray-100 font-medium">{opp.role}</p>
                  </div>

                  <hr className="border-t border-white/10" />

                  {/* WHAT YOU'LL DO / DESCRIPTION */}
                  {(opp.description || opp.what_you_will_do) && (
                    <>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-gray-300 uppercase">
                          WHAT YOU'LL DO
                        </span>
                        <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                          {isExpanded || (opp.description || opp.what_you_will_do).length <= 90
                            ? (opp.description || opp.what_you_will_do)
                            : `${(opp.description || opp.what_you_will_do).slice(0, 90)}...`}
                        </p>
                      </div>
                      <hr className="border-t border-white/10" />
                    </>
                  )}

                  {/* REQUIREMENTS */}
                  {opp.requirements && Array.isArray(opp.requirements) && opp.requirements.length > 0 && (
                    <>
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-gray-300 uppercase">
                          REQUIREMENTS
                        </span>
                        <ul className="space-y-1 text-xs sm:text-sm text-gray-200">
                          {(isExpanded ? opp.requirements : opp.requirements.slice(0, 2)).map((req, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2">
                              <span className="text-[#F2FF65] font-bold">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <hr className="border-t border-white/10" />
                    </>
                  )}

                  {/* PERKS (if available) */}
                  {opp.perks && Array.isArray(opp.perks) && opp.perks.length > 0 && (
                    <>
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-gray-300 uppercase">
                          DEVELOPMENTAL PERKS
                        </span>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {opp.perks.map((perk, pIdx) => (
                            <span
                              key={pIdx}
                              className="px-2 py-0.5 bg-black/30 border border-white/10 rounded-md text-[11px] text-gray-200"
                            >
                              ✨ {perk}
                            </span>
                          ))}
                        </div>
                      </div>
                      <hr className="border-t border-white/10" />
                    </>
                  )}

                  {/* COMPENSATION */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                      COMPENSATION
                    </span>
                    <p className="text-sm sm:text-base font-bold font-mono text-[#F2FF65]">
                      {compensationFormatted}
                    </p>
                  </div>

                  {/* Show More / Show Less Details Toggle Button */}
                  <div className="pt-1 text-center">
                    <button
                      onClick={() => toggleExpand(opp.id)}
                      className="px-3 py-1 bg-black/30 border border-white/15 hover:border-[#F2FF65] text-[#F2FF65] text-[11px] font-mono font-bold uppercase rounded-md transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>{isExpanded ? 'Collapse Details' : 'Show Full Details'}</span>
                      <ChevronDown size={13} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* 5. Streamlined Action Footer */}
                <div className={`p-3 flex items-center justify-between gap-3 ${theme.footer}`}>
                  {/* Share button */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setCopiedId(opp.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      copiedId === opp.id
                        ? 'text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 shadow-sm'
                        : 'text-gray-200 hover:text-white hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    {copiedId === opp.id ? (
                      <>
                        <Check size={15} className="text-emerald-400 shrink-0 animate-bounce" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 size={15} />
                        <span className="hidden sm:inline">Share</span>
                      </>
                    )}
                  </button>

                  {/* Save Button */}
                  <button
                    onClick={() => handleSaveToggle(opp)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      saved.some((s) => s.opportunity_id === opp.id)
                        ? 'text-[#F2FF65] bg-[#F2FF65]/15 border border-[#F2FF65]/30'
                        : 'text-gray-200 hover:text-white hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <Bookmark size={15} className={saved.some((s) => s.opportunity_id === opp.id) ? "fill-[#F2FF65]" : ""} />
                    <span className="hidden sm:inline">Save</span>
                  </button>

                  {/* Apply Action Button */}
                  <button
                    onClick={() => handleApply(opp)}
                    disabled={isApplied || isApplying}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isApplied
                        ? 'bg-emerald-600/90 text-white cursor-default shadow-sm'
                        : isApplying
                        ? 'bg-[#F2FF65]/70 text-[#141F16] cursor-wait'
                        : 'bg-[#F2FF65] text-[#141F16] hover:bg-[#e2ef4f] shadow-md shadow-[#F2FF65]/10'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check size={15} />
                        <span>Applied</span>
                      </>
                    ) : isApplying ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Apply for Role</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
