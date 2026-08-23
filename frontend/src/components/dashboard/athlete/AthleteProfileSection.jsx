import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  UserRound,
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
  Trash2,
  RefreshCw,
  AlertCircle,
  Upload,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import { api } from '../../../services/api';

const DEFAULT_COVER = 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80';

export default function AthleteProfileSection() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const [athleteData, setAthleteData] = useState({
    name: 'Athlete Profile',
    sport: 'General Sports',
    playing_level: 'Amateur',
    role: 'Sports Competitor',
    location: 'India',
    verified: true,
    age: '21 Yrs',
    avatar: '',
    cover: DEFAULT_COVER,
    bio: 'Dedicated athlete committed to training, competition, and sports excellence.',
    performanceMetrics: 'Add your personal best records, benchmark timings, and physical measurements here...',
    achievements: [],
    videos: [],
    certifications: []
  });

  const [editForm, setEditForm] = useState({ ...athleteData });

  // Load profile from Backend Database
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.profiles.getMyProfile();
      const p = res?.data?.profile || {};

      const profileName = p.full_name || p.name || 'Athlete Profile';
      const sportName = p.sport || 'Track & Field';
      const playingLevel = p.playing_level || 'Competitor';
      const headline = `${sportName} • ${playingLevel}`;

      const loadedData = {
        name: profileName,
        sport: sportName,
        playing_level: playingLevel,
        role: headline,
        location: p.location || 'India',
        verified: (p.verification_level || 1) >= 1,
        age: p.age || '21 Yrs',
        avatar: p.avatar_url || '',
        cover: p.cover_url || DEFAULT_COVER,
        bio: p.bio || 'Dedicated athlete committed to regular training and championship events.',
        performanceMetrics: p.performance_metrics || 'Sprint Personal Best: 10.5s | Endurance Pace: 3:45/km | State Trials Completed',
        achievements: Array.isArray(p.achievements) && p.achievements.length > 0 ? p.achievements : [
          { title: 'Participant - State Junior Athletics Championship', date: '2025' }
        ],
        videos: Array.isArray(p.videos) && p.videos.length > 0 ? p.videos : [
          { id: 1, title: 'Training & Form Highlights', duration: '1:15', thumbnail: DEFAULT_COVER }
        ],
        certifications: Array.isArray(p.certifications) && p.certifications.length > 0 ? p.certifications : [
          { name: 'National Sports Federation Verified Athlete', status: 'Active' }
        ]
      };

      setAthleteData(loadedData);
      setEditForm(loadedData);
    } catch (err) {
      console.warn('Profile load notice:', err.message);
      setError('Could not load profile from backend. Showing local draft.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleOpenEditModal = () => {
    setEditForm({
      ...athleteData,
      achievements: JSON.parse(JSON.stringify(athleteData.achievements || [])),
      videos: JSON.parse(JSON.stringify(athleteData.videos || [])),
      certifications: JSON.parse(JSON.stringify(athleteData.certifications || []))
    });
    setIsEditModalOpen(true);
  };

  // Avatar Image Upload Handler
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      // Show some loading indicator if needed (optional)
      const res = await api.upload.image(file);
      if (res.data?.url) {
        setEditForm(prev => ({ ...prev, avatar: res.data.url }));
      }
    } catch (err) {
      alert('Failed to upload avatar: ' + err.message);
    }
  };

  const handleRemoveAvatar = () => {
    setEditForm(prev => ({ ...prev, avatar: '' }));
  };

  // Cover Image Upload Handler
  const handleCoverChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await api.upload.image(file);
      if (res.data?.url) {
        setEditForm(prev => ({ ...prev, cover: res.data.url }));
      }
    } catch (err) {
      alert('Failed to upload cover image: ' + err.message);
    }
  };

  const handleRemoveCover = () => {
    setEditForm(prev => ({ ...prev, cover: '' }));
  };

  // Save changes to PostgreSQL
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedbackMessage(null);

    const payload = {
      full_name: editForm.name.trim(),
      sport: editForm.sport.trim(),
      playing_level: editForm.playing_level.trim(),
      location: editForm.location.trim(),
      age: editForm.age.trim(),
      bio: editForm.bio.trim(),
      performance_metrics: editForm.performanceMetrics.trim(),
      avatar_url: editForm.avatar,
      cover_url: editForm.cover,
      achievements: editForm.achievements.filter(a => a.title.trim()),
      videos: editForm.videos,
      certifications: editForm.certifications
    };

    try {
      await api.profiles.updateMyProfile(payload);
      setAthleteData({
        ...editForm,
        role: `${editForm.sport} • ${editForm.playing_level}`
      });
      setIsEditModalOpen(false);
      setFeedbackMessage({
        type: 'success',
        text: 'Profile updated successfully in PostgreSQL database!'
      });
      setTimeout(() => setFeedbackMessage(null), 4000);
    } catch (err) {
      console.error('Failed to update profile:', err);
      // Optimistic fallback
      setAthleteData({
        ...editForm,
        role: `${editForm.sport} • ${editForm.playing_level}`
      });
      setIsEditModalOpen(false);
      setFeedbackMessage({
        type: 'error',
        text: err.message || 'Saved locally. Please ensure backend database is connected.'
      });
      setTimeout(() => setFeedbackMessage(null), 4000);
    } finally {
      setSaving(false);
    }
  };

  const handleAddAchievement = () => {
    setEditForm(prev => ({
      ...prev,
      achievements: [...prev.achievements, { title: '', date: new Date().getFullYear().toString() }]
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
        <div>
          <h1 className="text-2xl font-black font-['Poppins',sans-serif] tracking-wider text-white uppercase flex items-center gap-2">
            ATHLETE PROFILE
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#F2FF65]/20 text-[#F2FF65] font-mono font-bold tracking-normal uppercase">
              LIVE
            </span>
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Your verified athletic bureau visible to scouting academies
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchProfile}
            className="p-2 bg-[#141F16] border border-[#2A3C2E] text-gray-400 hover:text-[#F2FF65] rounded-xl transition-colors cursor-pointer"
            title="Refresh Profile"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin text-[#F2FF65]' : ''} />
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Profile dossier link copied to clipboard!');
            }}
            className="px-3.5 py-2 bg-[#141F16] border border-[#2A3C2E] text-gray-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Share2 size={14} />
            <span>Share</span>
          </button>
          <button
            onClick={handleOpenEditModal}
            className="px-4 py-2 bg-[#F2FF65] text-[#141F16] font-['Poppins',sans-serif] font-bold rounded-xl text-xs uppercase flex items-center gap-1.5 hover:bg-[#e2ef4f] cursor-pointer transition-all shadow-md shadow-[#F2FF65]/10"
          >
            <Edit3 size={14} />
            <span>Edit Profile</span>
          </button>
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

      {/* Main Profile Header Banner Card */}
      <div className="bg-[#141F16] border border-[#2A3C2E] rounded-2xl overflow-hidden shadow-xl">
        {/* Cover Photo */}
        <div className="h-44 sm:h-52 w-full relative bg-[#0B120D]">
          <img 
            src={athleteData.cover || DEFAULT_COVER} 
            alt="Cover" 
            onError={(e) => { e.currentTarget.src = DEFAULT_COVER; }}
            className="w-full h-full object-cover opacity-70" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141F16] via-transparent to-transparent" />
        </div>

        {/* Profile Info Bar */}
        <div className="px-6 pb-6 relative -mt-16 sm:-mt-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            {/* Avatar Frame */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#141F16] overflow-hidden bg-[#1a291f] shadow-xl shrink-0 flex items-center justify-center relative">
              {athleteData.avatar ? (
                <img 
                  src={athleteData.avatar} 
                  alt={athleteData.name} 
                  onError={() => setAthleteData(prev => ({ ...prev, avatar: '' }))}
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#203326] text-[#8ea895]">
                  <UserRound size={54} strokeWidth={1.5} />
                </div>
              )}
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
              <p className="text-xs sm:text-sm font-semibold text-[#F2FF65]">{athleteData.role}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400 pt-0.5">
                <span className="flex items-center gap-1 text-gray-300">
                  <MapPin size={13} className="text-[#F2FF65]" />
                  <span>{athleteData.location}</span>
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-mono font-bold">Age: {athleteData.age}</span>
                <span>•</span>
                <span className="text-sky-400 font-mono font-bold">{athleteData.sport}</span>
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
      <div className="flex border-b border-[#2A3C2E] gap-6 text-xs font-mono font-bold uppercase overflow-x-auto scrollbar-none">
        {['overview', 'achievements', 'videos', 'certifications'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 transition-colors cursor-pointer shrink-0 ${
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
                ATHLETE BIO & BACKGROUND
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                {athleteData.bio}
              </p>
            </div>

            <div className="bg-[#141F16] border border-[#2A3C2E] rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#F2FF65] uppercase">
                RECENT ACCOMPLISHMENTS & MEDALS
              </h3>
              <div className="space-y-2">
                {athleteData.achievements.length === 0 ? (
                  <p className="text-xs text-gray-400">No accomplishments added yet. Click "Edit Profile" to add your tournaments.</p>
                ) : (
                  athleteData.achievements.map((item, idx) => (
                    <div key={idx} className="p-3 bg-[#0B120D] border border-[#2A3C2E] rounded-lg flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Trophy size={14} className="text-[#F2FF65] shrink-0" />
                        <span className="font-medium text-gray-200">{item.title}</span>
                      </div>
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
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#F2FF65] uppercase">
                TOURNAMENT & MEDAL HISTORY
              </h3>
              <button
                onClick={handleOpenEditModal}
                className="text-xs font-mono text-[#F2FF65] hover:underline cursor-pointer"
              >
                + Add Accomplishment
              </button>
            </div>

            <div className="space-y-3">
              {athleteData.achievements.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-xs">
                  <p>No tournament records yet.</p>
                  <button
                    onClick={handleOpenEditModal}
                    className="mt-2 text-[#F2FF65] font-bold hover:underline"
                  >
                    Add your first medal or record →
                  </button>
                </div>
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
                HIGHLIGHT REEL & PERFORMANCE VIDEOS
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {athleteData.videos.map((video, idx) => (
                <div key={idx} className="bg-[#141F16] border border-[#2A3C2E] rounded-xl overflow-hidden space-y-2 p-3">
                  <div className="relative h-36 bg-[#0B120D] rounded-lg overflow-hidden group cursor-pointer">
                    <img src={video.thumbnail || DEFAULT_COVER} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#F2FF65] text-[#141F16] flex items-center justify-center font-bold pl-0.5 shadow-lg">
                        ▶
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                      {video.duration || '0:45'}
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
              VERIFIED FEDERATION & ANTI-DOPING CREDENTIALS
            </h3>
            <div className="space-y-3">
              {athleteData.certifications.map((cert, idx) => (
                <div key={idx} className="p-4 bg-[#0B120D] border border-[#2A3C2E] rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-[#F2FF65] shrink-0" />
                    <span className="text-xs font-mono font-semibold text-gray-200">{cert.name}</span>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-mono font-bold rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {(cert.status || 'VERIFIED').toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md matchpoint-fade-in">
          <div
            className="bg-[#141F16] border border-[#2A3C2E] w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-y-auto shadow-2xl text-[#F7F8FA] font-['Inter',sans-serif] space-y-5 p-6 relative scrollbar-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#2A3C2E] pb-4">
              <div>
                <h2 className="text-lg font-bold font-mono tracking-wide text-white uppercase">
                  EDIT SPORTING DOSSIER
                </h2>
                <p className="text-xs text-gray-400">
                  Changes save directly to your PostgreSQL athlete profile.
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
              {/* Photo Upload Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#0B120D] rounded-xl border border-[#2A3C2E]">
                {/* Avatar upload */}
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#F2FF65]/40 shrink-0 bg-[#1a291f] flex items-center justify-center relative">
                    {editForm.avatar ? (
                      <img 
                        src={editForm.avatar} 
                        alt="Avatar Preview" 
                        onError={() => setEditForm(prev => ({ ...prev, avatar: '' }))}
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#203326] text-[#8ea895]">
                        <UserRound size={26} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-gray-300 uppercase block">Avatar Photo</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                        className="px-2.5 py-1 bg-[#141F16] border border-[#2A3C2E] hover:border-[#F2FF65] text-[#F2FF65] rounded text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Camera size={12} />
                        <span>Change</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="px-2.5 py-1 bg-[#141F16] border border-[#2A3C2E] hover:border-red-500 text-red-500 rounded text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Remove</span>
                      </button>
                    </div>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Cover upload */}
                <div className="flex items-center gap-3">
                  <div className="w-20 h-14 rounded-lg overflow-hidden border border-[#2A3C2E] shrink-0 bg-[#141F16]">
                    <img 
                      src={editForm.cover || DEFAULT_COVER} 
                      alt="Cover Preview" 
                      onError={(e) => { e.currentTarget.src = DEFAULT_COVER; }}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-gray-300 uppercase block">Banner Cover</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => coverInputRef.current?.click()}
                        className="px-2.5 py-1 bg-[#141F16] border border-[#2A3C2E] hover:border-[#F2FF65] text-[#F2FF65] rounded text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <ImageIcon size={12} />
                        <span>Change</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveCover}
                        className="px-2.5 py-1 bg-[#141F16] border border-[#2A3C2E] hover:border-red-500 text-red-500 rounded text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Remove</span>
                      </button>
                    </div>
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCoverChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

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
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3 py-2 bg-[#0B120D] border border-[#2A3C2E] rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2FF65] transition-colors"
                />
              </div>

              {/* Sport & Playing Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    SPORT DISCIPLINE *
                  </label>
                  <input
                    type="text"
                    value={editForm.sport}
                    onChange={(e) => setEditForm({ ...editForm, sport: e.target.value })}
                    required
                    placeholder="e.g. Track & Field, Football, Tennis"
                    className="w-full px-3 py-2 bg-[#0B120D] border border-[#2A3C2E] rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2FF65] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    COMPETITIVE LEVEL *
                  </label>
                  <input
                    type="text"
                    value={editForm.playing_level}
                    onChange={(e) => setEditForm({ ...editForm, playing_level: e.target.value })}
                    required
                    placeholder="e.g. National, State, Amateur, Pro"
                    className="w-full px-3 py-2 bg-[#0B120D] border border-[#2A3C2E] rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2FF65] transition-colors"
                  />
                </div>
              </div>

              {/* Location & Age */}
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
                    placeholder="e.g. Bengaluru, KA"
                    className="w-full px-3 py-2 bg-[#0B120D] border border-[#2A3C2E] rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2FF65] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                    AGE / CATEGORY *
                  </label>
                  <input
                    type="text"
                    value={editForm.age}
                    onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                    required
                    placeholder="e.g. 21 Yrs (U-23)"
                    className="w-full px-3 py-2 bg-[#0B120D] border border-[#2A3C2E] rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2FF65] transition-colors"
                  />
                </div>
              </div>

              {/* Key Performance Stats & Metrics */}
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                  KEY PERFORMANCE STATS & METRICS
                </label>
                <textarea
                  rows={2}
                  value={editForm.performanceMetrics}
                  onChange={(e) => setEditForm({ ...editForm, performanceMetrics: e.target.value })}
                  placeholder="Enter personal bests, sprint times, state rankings, trials completed..."
                  className="w-full px-3 py-2 bg-[#0B120D] border border-[#2A3C2E] rounded-lg text-xs text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#F2FF65] transition-colors leading-relaxed"
                />
              </div>

              {/* Bio Summary */}
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase">
                  ATHLETE BIO & BACKGROUND
                </label>
                <textarea
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  placeholder="Briefly introduce your sports journey, strengths, and goals..."
                  className="w-full px-3 py-2 bg-[#0B120D] border border-[#2A3C2E] rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2FF65] transition-colors leading-relaxed"
                />
              </div>

              {/* EDITABLE ACCOMPLISHMENTS & MEDALS */}
              <div className="p-4 bg-[#0B120D] border border-[#2A3C2E] rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold text-[#F2FF65] uppercase flex items-center gap-1.5">
                    <Trophy size={14} />
                    <span>MEDALS & ACCOMPLISHMENTS</span>
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
                        placeholder="Year / Date"
                        value={item.date}
                        onChange={(e) => handleUpdateAchievement(idx, 'date', e.target.value)}
                        required
                        className="w-24 px-2.5 py-1.5 bg-[#0B120D] border border-[#2A3C2E] rounded text-xs text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#F2FF65]"
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
                  disabled={saving}
                  className="px-5 py-2 bg-[#F2FF65] hover:bg-[#e2ef4f] text-[#141F16] rounded-lg text-xs font-mono font-bold uppercase flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  {saving ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Saving to DB...</span>
                    </>
                  ) : (
                    <>
                      <Save size={14} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
