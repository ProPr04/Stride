import React, { useState } from 'react';
import {
  Search,
  MapPin,
  MessageSquare,
  Send,
  Bookmark,
  Share2,
  Check,
  CheckCircle2,
  Filter,
  ChevronDown,
  Clock
} from 'lucide-react';

export default function AthleteOpportunitiesSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  const [appliedIds, setAppliedIds] = useState([]);
  const [savedIds, setSavedIds] = useState(['post-2']);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [commentsMap, setCommentsMap] = useState({
    'post-1': [
      { id: 1, author: 'Rahul Sharma', time: '1h ago', text: 'Sent my video portfolio! Interested in the evening shift.' },
      { id: 2, author: 'Delhi Sports Academy', time: '45m ago', text: 'Thanks Rahul! Our selection committee will review your profile.' }
    ],
    'post-2': [
      { id: 1, author: 'Priya Verma', time: '3h ago', text: 'Is U-21 track participation eligible for this grant?' }
    ]
  });
  const [newCommentText, setNewCommentText] = useState('');

  const posts = [
    {
      id: 'post-1',
      academyName: 'Delhi Sports Academy',
      academyAvatar: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=150&auto=format&fit=crop&q=80',
      verified: true,
      postedTime: '2h ago',
      caption: 'We are expanding our coaching department at Delhi Sports Academy. Looking for a passionate Assistant Cricket Coach to guide our squad for the state championship with evening availability and tournament travel support.',
      mediaImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&auto=format&fit=crop&q=80',
      sport: 'Cricket',
      savedCount: 142,
      opportunityDetails: {
        title: 'ASSISTANT CRICKET COACH',
        academy: 'Delhi Sports Academy',
        location: 'Delhi',
        status: 'Active Opportunity',
        timeline: 'Aug 15 – Sep 15, 2026 (Active for 30 Days)',
        role: 'Assistant Cricket Coach',
        whatYouWillDo: 'Support academy training sessions and assist senior coaches during trial matches, tactical video breakdowns, and player fitness tracking.',
        requirements: [
          'Cricket playing experience',
          'Intermediate playing level',
          'Evening availability'
        ],
        compensation: '₹15,000 / month'
      }
    },
    {
      id: 'post-2',
      academyName: 'National High Performance Center',
      academyAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      verified: true,
      postedTime: '5h ago',
      caption: 'Applications are OPEN for the 2026 Sprint Fellowship! Full gear allowance, biomechanical analysis, high performance track testing, and monthly stipends for top sprinters in Bengaluru.',
      mediaImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1000&auto=format&fit=crop&q=80',
      sport: 'Track & Field',
      savedCount: 89,
      opportunityDetails: {
        title: 'JUNIOR TRACK & FIELD SPRINT FELLOWSHIP',
        academy: 'National High Performance Center',
        location: 'Bengaluru, KA',
        status: 'Active Opportunity',
        timeline: 'Aug 10 – Sep 10, 2026 (Active for 30 Days)',
        role: 'Track Athlete (100m / 200m)',
        whatYouWillDo: 'Complete daily sprint drills, bi-weekly time trials, and represent the academy in national meets.',
        requirements: [
          'Under-23 age category',
          'State or National level participation history',
          'Full-time training commitment'
        ],
        compensation: '₹25,000 / month'
      }
    },
    {
      id: 'post-3',
      academyName: 'Premier Football Development Hub',
      academyAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: true,
      postedTime: '1d ago',
      caption: 'Premier Football Hub in Mumbai is scouting forward players for the upcoming regional championship. Match film highlights, professional strength conditioning, and ISL scout visibility included.',
      mediaImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1000&auto=format&fit=crop&q=80',
      sport: 'Football',
      savedCount: 215,
      opportunityDetails: {
        title: 'ACADEMY FOOTBALL FORWARD TRAINEE',
        academy: 'Premier Football Development Hub',
        location: 'Mumbai, MH',
        status: 'Active Opportunity',
        timeline: 'Aug 01 – Aug 31, 2026 (Active for 30 Days)',
        role: 'Forward / Striker',
        whatYouWillDo: 'Participate in league fixtures, tactical team breakdowns, and conditioning sessions.',
        requirements: [
          'Competitive club background',
          'High physical endurance',
          'Weekend match availability'
        ],
        compensation: '₹20,000 / month'
      }
    },
    {
      id: 'post-4',
      academyName: 'Apex Tennis Foundation',
      academyAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      verified: true,
      postedTime: '2d ago',
      caption: 'Join Apex Tennis Foundation in Hyderabad as an Assistant Trainer. Ideal for competitive players seeking coaching credentials, clay court access, and direct mentorship.',
      mediaImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1000&auto=format&fit=crop&q=80',
      sport: 'Tennis',
      savedCount: 67,
      opportunityDetails: {
        title: 'YOUTH TENNIS ASSISTANT TRAINER',
        academy: 'Apex Tennis Foundation',
        location: 'Hyderabad, TS',
        status: 'Active Opportunity',
        timeline: 'Jul 25 – Aug 25, 2026 (Active for 30 Days)',
        role: 'Tennis Assistant Trainer',
        whatYouWillDo: 'Conduct junior academy warm-ups, feed balls during drill sets, and log player performance.',
        requirements: [
          'Competitive junior tennis background',
          'Good communication skills',
          'Weekend morning availability'
        ],
        compensation: '₹18,000 / month'
      }
    }
  ];

  const sportsFilter = ['All', 'Cricket', 'Track & Field', 'Football', 'Tennis'];

  const filteredPosts = posts.filter(post => {
    const matchesSport = selectedSport === 'All' || post.sport === selectedSport;
    const matchesSearch =
      post.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.academyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.opportunityDetails.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.opportunityDetails.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSport && matchesSearch;
  });

  const toggleApply = (id) => {
    if (appliedIds.includes(id)) {
      setAppliedIds(appliedIds.filter(item => item !== id));
    } else {
      setAppliedIds([...appliedIds, id]);
    }
  };

  const toggleSave = (id) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter(item => item !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  const toggleExpand = (postId) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = (postId) => {
    if (!newCommentText.trim()) return;
    const newComment = {
      id: Date.now(),
      author: 'Alex Morgan',
      time: 'Just now',
      text: newCommentText.trim()
    };
    setCommentsMap(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));
    setNewCommentText('');
  };

  return (
    <div className="opportunities-pane matchpoint-fade-in max-w-2xl mx-auto space-y-5 pb-16">
      {/* Opportunities Section Title Header */}
      <div className="flex items-center justify-between pt-1">
        <h1 className="text-2xl font-black font-mono tracking-widest text-white uppercase">
          OPPORTUNITIES
        </h1>
      </div>

      {/* Sleek Search & Category Bar */}
      <div className="bg-[#141F16] border border-[#2A3C2E] rounded-xl p-4 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search opportunity title, academy, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#0B120D] border border-[#2A3C2E] rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2FF65] transition-colors font-['Inter',sans-serif]"
          />
        </div>

        {/* Sport Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-1">
          <Filter size={13} className="text-gray-400 shrink-0 mr-1" />
          {sportsFilter.map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                selectedSport === sport
                  ? 'bg-[#F2FF65] text-[#141F16]'
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
        {filteredPosts.length === 0 ? (
          <div className="bg-[#141F16] border border-[#2A3C2E] rounded-xl p-10 text-center text-gray-400">
            <p className="text-sm font-semibold text-white">No opportunities found</p>
            <p className="text-xs mt-1">Try adjusting your filters.</p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const opp = post.opportunityDetails;
            const isApplied = appliedIds.includes(post.id);
            const isSaved = savedIds.includes(post.id);
            const isExpanded = !!expandedPosts[post.id];
            const postComments = commentsMap[post.id] || [];
            const displaySavedCount = isSaved ? post.savedCount + 1 : post.savedCount;

            const isCaptionLong = post.caption.length > 100;

            return (
              <article
                key={post.id}
                className="bg-[#141F16] border border-[#2A3C2E] rounded-xl overflow-hidden text-[#F7F8FA] font-['Inter',sans-serif] shadow-lg"
              >
                {/* 1. Academy Header */}
                <div className="p-4 sm:p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.academyAvatar}
                      alt={post.academyName}
                      className="w-10 h-10 rounded-full object-cover border border-[#2A3C2E]"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-white">
                          {post.academyName}
                        </h3>
                        {post.verified && (
                          <CheckCircle2 size={14} className="text-[#F2FF65]" />
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400">{post.postedTime}</p>
                    </div>
                  </div>
                </div>

                {/* 2. Caption Text (with Show More / Show Less) */}
                <div className="px-4 sm:px-5 pb-3">
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    {isExpanded || !isCaptionLong
                      ? post.caption
                      : `${post.caption.slice(0, 100)}... `}
                    {isCaptionLong && (
                      <button
                        onClick={() => toggleExpand(post.id)}
                        className="text-[#F2FF65] font-semibold text-xs hover:underline cursor-pointer ml-1 inline-flex items-center gap-0.5"
                      >
                        <span>{isExpanded ? 'Show Less' : 'see more'}</span>
                        <ChevronDown size={13} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </p>
                </div>

                {/* 3. Media Image */}
                {post.mediaImage && (
                  <div className="w-full max-h-[340px] overflow-hidden bg-[#0B120D]">
                    <img
                      src={post.mediaImage}
                      alt="Academy posting"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* 4. Structured Opportunity Details */}
                <div className="p-4 sm:p-5 bg-[#0B120D] border-t border-b border-[#2A3C2E] space-y-4">
                  {/* Opportunity Title & Status */}
                  <div className="space-y-1">
                    <h4 className="text-base font-bold font-mono tracking-wide text-white uppercase">
                      {opp.title}
                    </h4>
                    <p className="text-xs font-semibold text-gray-300">{opp.academy}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-300 pt-1">
                      <span className="flex items-center gap-1 text-[#F2FF65]">
                        📍 {opp.location}
                      </span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {opp.status}
                      </span>
                    </div>
                  </div>

                  <hr className="border-t border-[#2A3C2E]" />

                  {/* ACTIVE TIMELINE */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                      ACTIVE TIMELINE
                    </span>
                    <p className="text-xs sm:text-sm text-sky-400 font-mono font-semibold flex items-center gap-1.5">
                      <Clock size={14} />
                      <span>{opp.timeline}</span>
                    </p>
                  </div>

                  <hr className="border-t border-[#2A3C2E]" />

                  {/* ROLE */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                      ROLE
                    </span>
                    <p className="text-xs sm:text-sm text-gray-100 font-medium">{opp.role}</p>
                  </div>

                  <hr className="border-t border-[#2A3C2E]" />

                  {/* WHAT YOU'LL DO */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                      WHAT YOU'LL DO
                    </span>
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                      {isExpanded || opp.whatYouWillDo.length <= 80
                        ? opp.whatYouWillDo
                        : `${opp.whatYouWillDo.slice(0, 80)}...`}
                    </p>
                  </div>

                  <hr className="border-t border-[#2A3C2E]" />

                  {/* REQUIREMENTS */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                      REQUIREMENTS
                    </span>
                    <ul className="space-y-1 text-xs sm:text-sm text-gray-200">
                      {(isExpanded ? opp.requirements : opp.requirements.slice(0, 2)).map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-white font-bold">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <hr className="border-t border-[#2A3C2E]" />

                  {/* COMPENSATION */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                      COMPENSATION
                    </span>
                    <p className="text-sm sm:text-base font-bold font-mono text-[#F2FF65]">
                      {opp.compensation}
                    </p>
                  </div>

                  {/* Show More / Show Less Details Toggle Button */}
                  <div className="pt-1 text-center">
                    <button
                      onClick={() => toggleExpand(post.id)}
                      className="px-3 py-1 bg-[#141F16] border border-[#2A3C2E] hover:border-[#F2FF65] text-[#F2FF65] text-[11px] font-mono font-bold uppercase rounded-md transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>{isExpanded ? 'Collapse Details' : 'Show Full Details'}</span>
                      <ChevronDown size={13} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* 5. Stats Bar */}
                <div className="px-4 py-2 flex items-center justify-between text-[11px] text-gray-400 border-b border-[#2A3C2E]">
                  <div className="flex items-center gap-1.5 text-[#F2FF65]">
                    <Bookmark size={13} className="fill-[#F2FF65]" />
                    <span>{displaySavedCount} Athletes Saved</span>
                  </div>

                  <button
                    onClick={() => setActiveCommentPost(activeCommentPost === post.id ? null : post.id)}
                    className="hover:underline cursor-pointer"
                  >
                    {postComments.length} comments
                  </button>
                </div>

                {/* 6. Action Footer */}
                <div className="p-2 sm:p-3 flex items-center justify-around gap-1 bg-[#141F16]">
                  <button
                    onClick={() => toggleSave(post.id)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isSaved ? 'text-[#F2FF65] bg-[#F2FF65]/10 font-bold' : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <Bookmark size={15} className={isSaved ? 'fill-[#F2FF65]' : ''} />
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    onClick={() => setActiveCommentPost(activeCommentPost === post.id ? null : post.id)}
                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:bg-white/5 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageSquare size={15} />
                    <span>Comment</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Post link copied to clipboard!');
                    }}
                    className="flex-1 py-1.5 rounded-lg text-[#F7F8FA] hover:bg-white/5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Share2 size={15} />
                    <span>Share</span>
                  </button>

                  <button
                    onClick={() => toggleApply(post.id)}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-bold uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isApplied
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#F2FF65] text-[#141F16] hover:bg-[#e2ef4f]'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check size={14} />
                        <span>Applied</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Apply</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 7. Comments Drawer */}
                {activeCommentPost === post.id && (
                  <div className="p-4 bg-[#0B120D] border-t border-[#2A3C2E] space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddComment(post.id);
                        }}
                        className="flex-1 px-3 py-1.5 bg-[#141F16] border border-[#2A3C2E] rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2FF65]"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="px-3.5 py-1.5 bg-[#F2FF65] text-[#141F16] rounded-lg text-xs font-bold hover:bg-[#e2ef4f] cursor-pointer"
                      >
                        Post
                      </button>
                    </div>

                    <div className="space-y-2 pt-1">
                      {postComments.map((comment) => (
                        <div key={comment.id} className="p-2.5 bg-[#141F16] rounded-lg border border-[#2A3C2E] text-xs space-y-1">
                          <div className="flex items-center justify-between text-gray-400">
                            <span className="font-semibold text-white">{comment.author}</span>
                            <span className="text-[10px]">{comment.time}</span>
                          </div>
                          <p className="text-gray-200">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
