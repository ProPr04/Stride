import React from 'react';
import { Star, MessageCircle, AlertCircle } from 'lucide-react';

export default function AcademyReviewsSection() {
  return (
    <div className="matchpoint-fade-in max-w-4xl mx-auto space-y-6 pb-16 font-['Inter',sans-serif]">
      {/* Title Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-2xl font-black font-['Poppins',sans-serif] tracking-wider text-white uppercase flex items-center gap-2">
            ACADEMY REVIEWS
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#F2FF65]/20 text-[#F2FF65] font-mono font-bold tracking-normal uppercase">
              COMING SOON
            </span>
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Athlete feedback and academy ratings platform
          </p>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="bg-[#141F16] border border-[#2A3C2E] rounded-2xl p-12 text-center text-gray-400 space-y-4 shadow-xl">
        <div className="w-16 h-16 bg-[#17241A] rounded-full border border-[#2A3C2E] flex items-center justify-center mx-auto text-[#F2FF65]">
          <Star size={32} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white font-['Poppins',sans-serif]">Review System in Development</h2>
          <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto leading-relaxed">
            We are building a comprehensive review system that will allow athletes to share their experiences and help academies showcase their reputation.
          </p>
        </div>
        
        <div className="pt-4 flex justify-center gap-4">
          <div className="flex items-center gap-2 bg-[#0B120D] px-4 py-2 rounded-xl border border-[#2A3C2E] text-xs font-semibold text-gray-300">
            <MessageCircle size={14} className="text-[#F2FF65]" />
            <span>Verified Athlete Testimonials</span>
          </div>
          <div className="flex items-center gap-2 bg-[#0B120D] px-4 py-2 rounded-xl border border-[#2A3C2E] text-xs font-semibold text-gray-300">
            <AlertCircle size={14} className="text-sky-400" />
            <span>Coming in V2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}