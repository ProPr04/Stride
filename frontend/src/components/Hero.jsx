import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroImage from '../assets/images/hero-court-basketball.jpg';

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center justify-end overflow-hidden bg-[#17241a] text-[#F7F8FA] font-['Inter',sans-serif]">
      {/* 1. Background Court Asset with Minimal Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={HeroImage}
          alt="Basketball on court sideline"
          className="h-full w-full object-cover object-left md:object-center"
        />
        {/* Soft directional gradient to protect text contrast on the right while keeping the ball clear */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[#17241a] via-[#17241a]/75 to-transparent" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#17241a] pointer-events-none" />
      </div>

      {/* 2. Content Container (Right-Aligned & Minimalist) */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 py-20 flex justify-end">
        <motion.div 
          className="w-full md:max-w-xl lg:max-w-2xl flex flex-col items-start space-y-6 md:space-y-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Poppins',sans-serif] text-white tracking-tight leading-[1.15]">
            Don’t fund the dream. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#F2FF65]">
              Earn your way forward
            </span> through sport.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#E5E7EB] font-normal leading-relaxed max-w-lg">
            Where athletic dedication meets institutional trust. Connecting verified talent with premier academies for structured, legitimate sports careers.
          </p>

          {/* Minimalist CTA Pair */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-[#F2FF65] text-[#0F172A] font-['Poppins',sans-serif] font-bold text-sm sm:text-base hover:bg-[#e2ef4f] transition-colors duration-200 cursor-pointer shadow-md shadow-black/20"
            >
              <span>Explore Opportunities</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-[#0F2F23]/60 border border-white/20 text-[#F7F8FA] font-['Poppins',sans-serif] font-semibold text-sm sm:text-base backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-colors duration-200 cursor-pointer"
            >
              <span>For Academies</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;