import React, { useState } from 'react';
import {
  User,
  MapPin,
  Trophy,
  Activity,
  Award,
  Video,
  FileText,
  Share2,
  Edit3,
  CheckCircle2,
  Star,
  Zap,
  Calendar,
  X,
  Save,
  Plus,
  Trash2
} from 'lucide-react';

export default function AthleteProfileSection() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [athleteData, setAthleteData] = useState({
    name: 'Alex Morgan',
    role: 'Track & Field Athlete (100m / 200m)',
    location: 'Bengaluru, KA',
    verified: true,
    age: '21 Yrs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    cover: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80',
    bio: 'Dedicated U-23 national level sprinter specialized in 100m and 200m events. Currently training under National High Performance Center Bengaluru with a focus on biomechanical speed development and championship qualifications.',
    performanceMetrics: '100m Personal Best: 10.42s | 200m Personal Best: 21.15s | State Ranking: #3 Overall | National Trials: 18 Events Completed',
    achievements: [
      { title: 'Gold Medalist - Karnataka State Senior Athletics Championship 2025', date: 'Dec 2025' },
      { title: 'Finalist - Khelo India University Games 100m Sprint', date: 'Oct 2025' },
      { title: 'Bronze Medalist - South Zone Athletics Championship 200m', date: 'Aug 2025' }
    ],
    videos: [
      { id: 1, title: '100m Final Sprint - 10.42s Record Run', duration: '0:45', thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop&q=80' },
      { id: 2, title: 'Block Starts & Acceleration Mechanics', duration: '2:15', thumbnail: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=500&auto=format&fit=crop&q=80' }
    ],
    certifications: [
      { name: 'Sports Authority of India (SAI) Verified Athlete ID: SAI-2025-9921', status: 'Verified' },
      { name: 'NADA Anti-Doping Clearance Certificate 2026', status: 'Cleared' },
      { name: 'Karnataka State Athletics Association Federation License', status: 'Active' }
    ]
  });

  const [editForm, setEditForm] = useState({ ...athleteData });

  const handleOpenEditModal = () => {
    setEditForm({
      ...athleteData,
      achievements: JSON.parse(JSON.stringify(athleteData.achievements))
    });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setAthleteData({ ...editForm });
    setIsEditModalOpen(false);
  };

  const handleAddAchievement = () => {
    setEditForm(prev => ({
      ...prev,
      achievements: [...prev.achievements, { title: '', date: '' }]
    }));
  };

  const handleRemoveAchievement = (index) => {
    setEditForm(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateAchievement = (index, field, value) => {
    setEditForm(prev => {
      const updated = [...prev.achievements];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, achievements: updated };
    });
  };

  return (
    <div className="profile-pane matchpoint-fade-in max-w-5xl mx-auto space-y-6 pb-16 font-['Inter',sans-serif]">
      {/* Title Header */}
      <div className="flex items-center justify-between pt-1">
        <h1 className="text-2xl font-black font-mono tracking-widest text-white uppercase">
          MY SPORTING PROFILE
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Profile link copied to clipboard!');
            }}
            className="px-3 py-1.5 bg-[#141F16] border border-[#2A3C2E] text-gray-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Share2 size={14} />
            <span>Share</span>
          </button>
          <button
            onClick={handleOpenEditModal}
            className="px-3.5 py-1.5 bg-[#F2FF65] text-[#141F16] font-mono font-bold rounded-lg text-xs uppercase flex items-center gap-1.5 hover:bg-[#e2ef4f] cursor-pointer transition-all shadow-md"
          >
            <Edit3 size={14} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Main Profile Header Banner Card */}
      <div className="bg-[#141F16] border border-[#2A3C2E] rounded-xl overflow-hidden shadow-lg">
        {/* Cover Photo */}
        <div className="h-44 sm:h-52 w-full relative bg-[#0B120D]">
          <img src={athleteData.cover} alt="Cover" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141F16] via-transparent to-transparent" />
        </div>

        {/* Profile Info Bar */}
        <div className="px-6 pb-6 relative -mt-16 sm:-mt-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            {/* Avatar Frame */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#141F16] overflow-hidden bg-[#0B120D] shadow-xl shrink-0">
              <img src={athleteData.avatar} alt={athleteData.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-wide text-white">
                  {athleteData.name}
                </h2>
                {athleteData.verified && (
                  <CheckCircle2 size={18} className="text-[#F2FF65]" />
                )}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-300">{athleteData.role}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400 pt-0.5">
                <span className="flex items-center gap-1 text-[#F2FF65]">
                  <MapPin size={13} />
                  <span>{athleteData.location}</span>
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-mono font-bold">Age: {athleteData.age}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Performance Stats & Metrics Banner Strip */}
        <div className="p-4 border-t border-[#2A3C2E] bg-[#0B120D] space-y-1">
          <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-mono font-bold tracking-wider uppercase">
            <Zap size={12} className="text-[#F2FF65]" />
            <span>KEY PERFORMANCE STATS & METRICS</span>
          </div>
          <p className="text-xs sm:text-sm font-mono font-semibold text-[#F2FF65] leading-relaxed">
            {athleteData.performanceMetrics}
          </p>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex border-b border-[#2A3C2E] gap-6 text-xs font-mono font-bold uppercase">
        {['overview', 'achievements', 'videos', 'certifications'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === tab
                ? 'text-[#F2FF65] border-b-2 border-[#F2FF65]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-[#141F16] border border-[#2A3C2E] rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#F2FF65] uppercase">
                ATHLETE BIO
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                {athleteData.bio}
              </p>
            </div>

            <div className="bg-[#141F16] border border-[#2A3C2E] rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#F2FF65] uppercase">
                RECENT ACCOMPLISHMENTS
              </h3>
              <div className="space-y-2">
                {athleteData.achievements.length === 0 ? (
                  <p className="text-xs text-gray-400">No accomplishments added yet.</p>
                ) : (
                  athleteData.achievements.map((item, idx) => (
                    <div key={idx} className="p-3 bg-[#0B120D] border border-[#2A3C2E] rounded-lg flex items-center justify-between text-xs">
                      <span className="font-medium text-gray-200">{item.title}</span>
                      <span className="text-[10px] font-mono text-gray-400 shrink-0 ml-3">{item.date}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === 'achievements' && (
          <div className="bg-[#141F16] border border-[#2A3C2E] rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-mono font-bold tracking-widest text-[#F2FF65] uppercase">
              MEDALS & AWARDS HISTORY
            </h3>
            <div className="space-y-3">
              {athleteData.achievements.length === 0 ? (
                <p className="text-xs text-gray-400">No accomplishments added yet.</p>
              ) : (
                athleteData.achievements.map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#0B120D] border border-[#2A3C2E] rounded-lg flex items-center gap-3">
                    <Trophy size={18} className="text-[#F2FF65] shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-[10px] font-mono text-gray-400">{item.date}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* VIDEOS TAB */}
        {activeTab === 'videos' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#F2FF65] uppercase">
                HIGHLIGHT REEL & TRIAL VIDEOS
              </h3>
              <button
                onClick={() => alert('Upload video feature...')}
                className="text-xs font-mono text-[#F2FF65] hover:underline cursor-pointer"
              >
                + Upload New Video
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {athleteData.videos.map((video) => (
                <div key={video.id} className="bg-[#141F16] border border-[#2A3C2E] rounded-xl overflow-hidden space-y-2 p-3">
                  <div className="relative h-36 bg-[#0B120D] rounded-lg overflow-hidden group cursor-pointer">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#F2FF65] text-[#141F16] flex items-center justify-center font-bold pl-0.5 shadow-lg">
                        ▶
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white truncate">{video.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS TAB */}
        {activeTab === 'certifications' && (
          <div className="bg-[#141F16] border border-[#2A3C2E] rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-mono font-bold tracking-widest text-[#F2FF65] uppercase">
              VERIFIED FEDERATION CREDENTIALS
            </h3>
            <div className="space-y-3">
              {athleteData.certifications.map((cert, idx) => (
                <div key={idx} className="p-4 bg-[#0B120D] border border-[#2A3C2E] rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-[#F2FF65] shrink-0" />
                    <span className="text-xs font-mono font-semibold text-gray-200">{cert.name}</span>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-mono font-bold rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {cert.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* LINKEDIN-STYLE EDIT PROFILE MODAL WITH BACKGROUND BLUR */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md matchpoint-fade-in">
          <div
            className="bg-[#141F16] border border-[#2A3C2E] w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-y-auto shadow-2xl text-[#F7F8FA] font-['Inter',sans-serif] space-y-5 p-6 relative scrollbar-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#2A3C2E] pb-4">
              <div>
                <h2 className="text-lg font-bold font-mono tracking-wide text-white uppercase">
                  EDIT SPORTING INTRO & PROFILE
                </h2>
                <p className="text-xs text-gray-400">
                  Update your public athletic profile, accomplishments, and metrics.
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#0B120D] border border-[#2A3C2E] text-gray-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Editable Form */}
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-[#0B120D] border border-[#2A3C2E] rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2FF65] transition-colors"
                />
              </div>

              {/* Headline / Sporting Role */}
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                  HEADLINE / SPORTING DISCIPLINE *
                </label>
                <input
                  type="text"
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-[#0B120D] border border-[#2A3C2E] rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2FF65] transition-colors"
                />
              </div>

              {/* Location & Age (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    LOCATION *
                  </label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-[#0B120D] border border-[#2A3C2E] rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2FF65] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    AGE *
                  </label>
                  <input
                    type="text"
                    value={editForm.age}
                    onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                    required
                    placeholder="e.g. 21 Yrs"
                    className="w-full px-3 py-2 bg-[#0B120D] border border-[#2A3C2E] rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2FF65] transition-colors"
                  />
                </div>
              </div>

              {/* Key Performance Stats & Metrics TEXTAREA */}
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                  KEY PERFORMANCE STATS & METRICS
                </label>
                <textarea
                  rows={3}
                  value={editForm.performanceMetrics}
                  onChange={(e) => setEditForm({ ...editForm, performanceMetrics: e.target.value })}
                  placeholder="Enter personal bests, tournament records, state rankings, physical stats..."
                  className="w-full px-3 py-2 bg-[#0B120D] border border-[#2A3C2E] rounded-lg text-xs text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#F2FF65] transition-colors leading-relaxed"
                />
              </div>

              {/* Bio Summary */}
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                  ATHLETE BIO & OVERVIEW
                </label>
                <textarea
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0B120D] border border-[#2A3C2E] rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2FF65] transition-colors leading-relaxed"
                />
              </div>

              {/* EDITABLE ACCOMPLISHMENTS & MEDALS SECTION */}
              <div className="p-4 bg-[#0B120D] border border-[#2A3C2E] rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold text-[#F2FF65] uppercase flex items-center gap-1.5">
                    <Trophy size={14} />
                    <span>EDIT ACCOMPLISHMENTS & MEDALS</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAddAchievement}
                    className="px-2.5 py-1 bg-[#141F16] border border-[#2A3C2E] hover:border-[#F2FF65] text-[#F2FF65] rounded text-[11px] font-mono font-bold uppercase flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <Plus size={13} />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {editForm.achievements.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-[#141F16] p-2.5 rounded-lg border border-[#2A3C2E]">
                      <input
                        type="text"
                        placeholder="Accomplishment Title (e.g. Gold Medalist - State Championship)"
                        value={item.title}
                        onChange={(e) => handleUpdateAchievement(idx, 'title', e.target.value)}
                        required
                        className="flex-1 px-2.5 py-1.5 bg-[#0B120D] border border-[#2A3C2E] rounded text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2FF65]"
                      />
                      <input
                        type="text"
                        placeholder="Date (Dec 2025)"
                        value={item.date}
                        onChange={(e) => handleUpdateAchievement(idx, 'date', e.target.value)}
                        required
                        className="w-28 px-2.5 py-1.5 bg-[#0B120D] border border-[#2A3C2E] rounded text-xs text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#F2FF65]"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveAchievement(idx)}
                        className="p-1.5 text-gray-400 hover:text-rose-400 rounded cursor-pointer transition-colors"
                        title="Remove Accomplishment"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-3 border-t border-[#2A3C2E] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-[#0B120D] hover:bg-[#1C2A1E] text-gray-300 rounded-lg text-xs font-mono font-bold uppercase transition-colors cursor-pointer border border-[#2A3C2E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#F2FF65] hover:bg-[#e2ef4f] text-[#141F16] rounded-lg text-xs font-mono font-bold uppercase flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  <Save size={14} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
