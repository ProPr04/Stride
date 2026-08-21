import React from "react";

const navigation = [
  "About",
  "How It Works",
  "Athletes",
  "Academies",
  "Opportunities",
  "Login",
  "Register",
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#07130d] px-6 py-12 font-['Plus_Jakarta_Sans'] text-[#f7f5ed] sm:px-10 sm:py-14 lg:px-16 xl:px-20">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="border-y border-[#f2ff65]/70 py-8 sm:py-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <p className="text-5xl font-extrabold leading-none tracking-[-0.08em] text-[#f2ff65] sm:text-6xl md:text-7xl">
                STRIDE
              </p>

              <p className="mt-7 max-w-2xl text-xl font-semibold leading-snug tracking-[-0.035em] text-[#f7f5ed] sm:text-2xl">
                Don&apos;t fund the athlete&apos;s dream. Help the athlete earn
                their way forward through sport.
              </p>

              <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-[#f7f5ed]/65 sm:text-base">
                STRIDE connects emerging athletes with academies through
                sport-specific paid opportunities and verified experience.
              </p>

              <a
                href="#opportunities"
                className="group mt-7 inline-flex items-center gap-3 border-b border-[#f2ff65] pb-1.5 text-sm font-bold tracking-[0.04em] text-[#f2ff65]"
              >
                Find Your Opportunity
                <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            <div className="border-t border-[#f7f5ed]/20 pt-7 lg:col-span-4 lg:col-start-9 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-1">
              <p className="mb-5 text-[11px] font-semibold tracking-[0.22em] text-[#f2ff65]/70">
                EXPLORE STRIDE
              </p>

              <nav aria-label="Footer navigation">
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {navigation.map((item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="group inline-flex items-center gap-1 text-sm text-[#f7f5ed]/80 transition-colors duration-300 hover:text-[#f2ff65]"
                      >
                        <span className="relative">
                          {item}
                          <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#f2ff65] transition-all duration-300 group-hover:w-full" />
                        </span>
                        <span className="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold tracking-[-0.02em] text-[#f2ff65]">
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