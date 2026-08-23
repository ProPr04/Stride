import React from "react";
import { Link } from "react-router-dom"; // Make sure to import Link

const navigation = [
  { name: "About", path: "/#about" },
  { name: "How It Works", path: "/#how-it-works" },
  { name: "Athletes", path: "/#athletes" },
  { name: "Academies", path: "/login?role=academy" },
  { name: "Opportunities", path: "/login?role=athlete" },
  { name: "Login", path: "/login?role=athlete" },
  { name: "Register", path: "/signup" },
];

export default function Footer({ onOpenOpportunities, onOpenAcademies }) {
  return (
    <footer className="w-full bg-[#07130d] px-6 py-12 font-['Poppins',sans-serif] text-[#f7f5ed] sm:px-10 sm:py-14 lg:px-16 xl:px-20">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="border-y border-[#f2ff65]/70 py-8 sm:py-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <a href="/" className="flex items-center gap-2.5 group">
                <span className="font-['Poppins',sans-serif] font-bold text-xl sm:text-6xl tracking-tight text-white">
                   STRIDE<span className="text-[#F2FF65]">.</span>
                </span>
            </a>

              <p className="mt-7 max-w-2xl text-xl font-semibold leading-snug tracking-[-0.035em] text-[#f7f5ed] sm:text-2xl">
                Don&apos;t fund the athlete&apos;s dream. Help the athlete earn
                their way forward through sport.
              </p>

              <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-[#f7f5ed]/65 sm:text-base font-['Inter',sans-serif]">
                STRIDE connects emerging athletes with academies through
                sport-specific paid opportunities and verified experience.
              </p>

              <Link
                to="/login?role=athlete"
                onClick={(e) => {
                  if (onOpenOpportunities) {
                    e.preventDefault();
                    onOpenOpportunities();
                  }
                }}
                className="group mt-7 inline-flex items-center gap-3 border-b border-[#f2ff65] pb-1.5 text-sm font-bold tracking-[0.04em] text-[#f2ff65] font-['Inter',sans-serif]"
              >
                Find Your Opportunity
                <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            <div className="border-t border-[#f7f5ed]/20 pt-7 lg:col-span-4 lg:col-start-9 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-1">
              <p className="mb-5 text-[11px] font-semibold tracking-[0.22em] text-[#f2ff65]/70">
                EXPLORE STRIDE
              </p>

              <nav aria-label="Footer navigation">
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        onClick={(e) => {
                          if (item.name === 'About') {
                            e.preventDefault();
                            const element = document.getElementById('about');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            } else {
                              window.location.href = '/#about';
                            }
                          } else if (item.name === 'How It Works') {
                            e.preventDefault();
                            const element = document.getElementById('how-it-works');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            } else {
                              window.location.href = '/#how-it-works';
                            }
                          } else if (item.name === 'Athletes') {
                            e.preventDefault();
                            const element = document.getElementById('athletes');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            } else {
                              window.location.href = '/#athletes';
                            }
                          } else if (item.name === 'Academies') {
                            if (onOpenAcademies) {
                              e.preventDefault();
                              onOpenAcademies();
                            }
                          } else if (item.name === 'Opportunities' || item.name === 'Login') {
                            if (onOpenOpportunities) {
                              e.preventDefault();
                              onOpenOpportunities();
                            }
                          }
                        }}
                        className="group inline-flex items-center gap-1 text-sm text-[#f7f5ed]/80 transition-colors duration-300 hover:text-[#f2ff65]"
                      >
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#f2ff65] transition-all duration-300 group-hover:w-full" />
                        </span>
                        <span className="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold tracking-[-0.02em] text-[#f2ff65] font-['Inter',sans-serif]">
            Earn. Learn. Prove. Grow.
          </p>

          <div className="flex items-center gap-3 text-[11px] font-light tracking-[0.08em] text-[#f7f5ed]/50">
            <span className="h-2 w-2 bg-[#95402f]" />
            <span className="h-2 w-2 bg-[#2c337f]" />
            <span>© {new Date().getFullYear()} STRIDE. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}