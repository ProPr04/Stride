import React, { useState } from 'react';
import {
  Bookmark,
  Search,
  MapPin,
  Clock,
  CheckCircle2,
  Filter,
  ExternalLink,
  Trash2,
  ArrowRight,
  Briefcase,
  Share2,
  X
} from 'lucide-react';
import { api } from '../../../services/api';

export default function AthleteSavedSection({ savedOpportunities = [], setSavedOpportunities, onNavigateToOpportunities }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  const [appliedIds, setAppliedIds] = useState([]);
  const [activeModalOpp, setActiveModalOpp] = useState(null);

  const sportsFilter = ['All', 'Track & Field', 'Cricket', 'Tennis', 'Football', 'Basketball'];

  const handleRemoveSaved = async (id, e) => {
    e.stopPropagation();
    try {
      await api.saved.unsave(id);
      setSavedOpportunities(prev => prev.filter(item => item.opportunity_id !== id));
    } catch (err) {
      console.error('Failed to unsave', err);
    }
  };

  const handleApplyNow = (id, e) => {
    e.stopPropagation();
    // Implementation should call api.agreements.apply
    if (!appliedIds.includes(id)) {
      setAppliedIds(prev => [...prev, id]);
    }
  };

  const formattedSaved = savedOpportunities.map(item => ({
    id: item.opportunity_id,
    title: item.title || item.role || 'Opportunity',
    academy: item.academy_name || 'Partner Academy',
    location: item.display_location || item.location || item.academy_location || 'India',
    compensation: item.compensation_cash ? `₹${Number(item.compensation_cash).toLocaleString()} / month` : 'Competitive Compensation',
    type: item.type || 'Full-time',
    sport: item.sport || 'General',
    timeline: item.timeline || 'Ongoing',
    savedDate: item.saved_at ? new Date(item.saved_at).toLocaleDateString() : 'Recently',
    mediaImage: item.media_image,
    role: item.role || item.title || 'Athlete',
    whatYouWillDo: item.description || item.what_you_will_do || 'Contribute to academy goals',
    requirements: item.requirements && Array.isArray(item.requirements) ? item.requirements : ['Standard athletic requirements']
  }));

  const filteredSaved = formattedSaved.filter(item => {
    const matchesSport = selectedSport === 'All' || item.sport === selectedSport;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.academy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSport && matchesSearch;
  });

  return (
    <div className="saved-pane matchpoint-fade-in max-w-5xl mx-auto space-y-5 pb-16 font-['Inter',sans-serif]">
      {/* Title Header */}
      <div className="flex items-center justify-between pt-1">
        <h1 className="text-2xl font-black font-['Poppins',sans-serif] tracking-wider text-white uppercase flex items-center gap-2">
          <span>SAVED OPPORTUNITIES</span>
        </h1>
        <span className="text-xs font-mono bg-[#F2FF65]/10 text-[#F2FF65] border border-[#F2FF65]/20 px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-sm">
          <Bookmark size={14} className="fill-[#F2FF65]" />
          <span>{savedOpportunities.length} SAVED</span>
        </span>
      </div>

      {/* Search Bar & Filters */}
      <div className="bg-[#141F16] border border-[#2A3C2E] rounded-2xl p-4 space-y-3 shadow-lg">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search saved opportunity title, academy, or location..."
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

      {/* Cards 2-Column Grid */}
      {filteredSaved.length === 0 ? (
        <div className="bg-[#141F16] border border-[#2A3C2E] rounded-2xl p-12 text-center text-gray-400 space-y-4 shadow-xl">
          <div className="w-14 h-14 bg-[#17241A] rounded-full border border-[#2A3C2E] flex items-center justify-center mx-auto text-[#F2FF65]">
            <Bookmark size={26} />
          </div>
          <div>
            <p className="text-base font-bold text-white font-['Poppins',sans-serif]">No Saved Opportunities Found</p>
            <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
              {savedOpportunities.length === 0
                ? "You haven't bookmarked any opportunities yet. Browse active postings to save your favorites."
                : "No saved postings match your current search query."}
            </p>
          </div>

          {onNavigateToOpportunities && (
            <button
              onClick={onNavigateToOpportunities}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F2FF65] text-[#141F16] font-['Poppins',sans-serif] font-bold text-xs uppercase hover:bg-[#e2ef4f] transition-all cursor-pointer shadow-md"
            >
              <span>Explore Opportunities</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSaved.map((item, idx) => {
            const isApplied = appliedIds.includes(item.id);

            // Cycle Red (#95402f), Blue (#2C337F), and Dark Green (#141F16)
            const cardBgColors = [
              'bg-[#95402f] border-[#b24f3c]/40',
              'bg-[#2C337F] border-[#3a44a6]/40',
              'bg-[#141F16] border-[#2A3C2E]'
            ];
            const cardStyle = cardBgColors[idx % cardBgColors.length];

            return (
              <article
                key={item.id}
                onClick={() => setActiveModalOpp(item)}
                className={`${cardStyle} border rounded-2xl p-5 text-[#F7F8FA] font-['Inter',sans-serif] space-y-4 shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group`}
              >
                {/* Top Info */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold font-['Poppins',sans-serif] tracking-wide text-white uppercase group-hover:text-[#F2FF65] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-gray-200">
                        {item.academy}
                      </p>
                    </div>

                    <button
                      onClick={(e) => handleRemoveSaved(item.id, e)}
                      title="Remove from saved"
                      className="p-1.5 bg-black/20 hover:bg-rose-500/20 text-gray-300 hover:text-rose-400 border border-white/10 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  {/* Location & Sport Tag */}
                  <div className="flex items-center gap-3 text-xs text-[#F2FF65]">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{item.location}</span>
                    </div>
                    <span className="text-white/40">•</span>
                    <span className="font-mono text-white/90">{item.sport}</span>
                  </div>

                  {/* Timeline & Compensation */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs text-gray-300 font-mono flex items-center gap-1.5">
                      <Clock size={13} className="text-[#F2FF65]" />
                      <span>{item.timeline}</span>
                    </div>
                    <div className="text-sm sm:text-base font-bold font-mono text-white">
                      {item.compensation}
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-3 border-t border-white/10 flex items-center gap-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalOpp(item);
                    }}
                    className="flex-1 py-2 bg-black/20 hover:bg-black/40 border border-white/10 text-white rounded-xl text-xs font-mono font-bold uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Hub</span>
                    <ExternalLink size={13} />
                  </button>

                  <button
                    onClick={(e) => handleApplyNow(item.id, e)}
                    disabled={isApplied}
                    className={`flex-1 py-2 rounded-xl text-xs font-['Poppins',sans-serif] font-bold uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isApplied
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : 'bg-[#F2FF65] hover:bg-[#e2ef4f] text-[#141F16] shadow-md'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 size={14} />
                        <span>Applied</span>
                      </>
                    ) : (
                      <>
                        <span>Apply Now</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* FULL DETAIL MODAL */}
      {activeModalOpp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md matchpoint-fade-in"
          onClick={() => setActiveModalOpp(null)}
        >
          <div
            className="bg-[#141F16] border border-[#2A3C2E] w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-y-auto shadow-2xl text-[#F7F8FA] font-['Inter',sans-serif] p-6 space-y-5 relative scrollbar-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#2A3C2E] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#F2FF65] uppercase">
                  {activeModalOpp.sport} • SAVED OPPORTUNITY
                </span>
                <h2 className="text-xl font-bold font-['Poppins',sans-serif] text-white mt-1">
                  {activeModalOpp.title}
                </h2>
                <p className="text-sm font-semibold text-gray-300 mt-0.5">
                  {activeModalOpp.academy} — <span className="text-[#F2FF65]">{activeModalOpp.location}</span>
                </p>
              </div>

              <button
                onClick={() => setActiveModalOpp(null)}
                className="p-1.5 rounded-lg bg-[#0B120D] text-gray-400 hover:text-white border border-[#2A3C2E] cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Media Image */}
            {activeModalOpp.mediaImage && (
              <div className="rounded-xl overflow-hidden h-48 w-full border border-[#2A3C2E]">
                <img src={activeModalOpp.mediaImage} alt={activeModalOpp.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Opportunity Details */}
            <div className="space-y-4">
              <div className="bg-[#0B120D] p-4 rounded-xl border border-[#2A3C2E] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-gray-300">
                  <span>Compensation:</span>
                  <span className="text-[#F2FF65] font-bold text-sm">{activeModalOpp.compensation}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-gray-300">
                  <span>Timeline:</span>
                  <span>{activeModalOpp.timeline}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#F2FF65] uppercase tracking-wider mb-1 font-['Poppins',sans-serif]">
                  What You Will Do
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">{activeModalOpp.whatYouWillDo}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#F2FF65] uppercase tracking-wider mb-1 font-['Poppins',sans-serif]">
                  Requirements
                </h4>
                <ul className="space-y-1">
                  {activeModalOpp.requirements.map((req, idx) => (
                    <li key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[#F2FF65] shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-[#2A3C2E] flex items-center justify-between gap-3">
              <button
                onClick={(e) => handleRemoveSaved(activeModalOpp.id, e)}
                className="px-4 py-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold font-['Poppins',sans-serif] uppercase hover:bg-rose-500/20 transition-all cursor-pointer"
              >
                Unsave
              </button>

              <button
                onClick={(e) => {
                  handleApplyNow(activeModalOpp.id, e);
                  setActiveModalOpp(null);
                }}
                disabled={appliedIds.includes(activeModalOpp.id)}
                className={`px-6 py-2.5 rounded-xl text-xs font-['Poppins',sans-serif] font-bold uppercase transition-all cursor-pointer ${
                  appliedIds.includes(activeModalOpp.id)
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                    : 'bg-[#F2FF65] hover:bg-[#e2ef4f] text-[#141F16] shadow-md'
                }`}
              >
                {appliedIds.includes(activeModalOpp.id) ? 'Applied' : 'Apply Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
