import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = ({ onOpenLogin, onOpenSignUp }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Opportunities', href: '#opportunities' },
    { name: 'For Academies', href: '#academies' },
    { name: 'Verification', href: '#verification' },
    { name: 'About', href: '#about' },
  ];

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (onOpenLogin) {
      onOpenLogin();
    } else {
      window.location.href = '/login';
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    if (onOpenSignUp) {
      onOpenSignUp();
    } else {
      window.location.href = '/signup';
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1A1F1E]/80 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <span className="font-['Poppins',sans-serif] font-bold text-xl sm:text-2xl tracking-tight text-white">
            STRIDE<span className="text-[#F2FF65]">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#E5E7EB] hover:text-[#F2FF65] transition-colors duration-200 font-['Inter',sans-serif]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={handleLoginClick}
            className="text-sm font-semibold text-[#F7F8FA] hover:text-white px-3 py-2 transition-colors duration-200 font-['Poppins',sans-serif] cursor-pointer"
          >
            Log In
          </button>
          <button
            type="button"
            onClick={handleSignUpClick}
            className="px-5 py-2.5 rounded-xl bg-[#F2FF65] text-[#0F172A] font-['Poppins',sans-serif] font-bold text-sm hover:bg-[#e2ef4f] transition-all duration-200 shadow-sm shadow-[#F2FF65]/10 cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#F7F8FA] hover:text-[#F2FF65] p-1.5 focus:outline-none transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Glass Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#1A1F1E]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#E5E7EB] hover:text-[#F2FF65] transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                type="button"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleLoginClick(e);
                }}
                className="w-full text-center py-2.5 rounded-xl border border-white/10 text-white font-['Poppins',sans-serif] font-semibold text-sm hover:bg-white/5 transition-colors cursor-pointer"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleSignUpClick(e);
                }}
                className="w-full text-center py-2.5 rounded-xl bg-[#F2FF65] text-[#0F172A] font-['Poppins',sans-serif] font-bold text-sm hover:bg-[#e2ef4f] transition-colors cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;