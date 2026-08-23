import React from "react";

const athleteFeatures = [
  {
    number: "01",
    title: "EARN",
    description: "Get paid for sport-specific work that fits around your training.",
  },
  {
    number: "02",
    title: "LEARN",
    description: "Gain practical experience from coaches, academics and real sporting environments.",
  },
  {
    number: "03",
    title: "PROVE",
    description: "Build a verified record of your experience, skills, and achievements.",
  },
  {
    number: "04",
    title: "GROW",
    description: "Use your experience to unlock better opportunities as your career develops.",
  },
];

const academyFeatures = [
  {
    number: "01",
    title: "DISCOVER",
    description: "Find athletes through structured sporting profiles, skills, and experience.",
  },
  {
    number: "02",
    title: "ENGAGE",
    description: "Post flexible opportunities and connect with athletes who fit your needs.",
  },
  {
    number: "03",
    title: "DEVELOP",
    description: "Create meaningful sporting experiences that help athletes grow.",
  },
  {
    number: "04",
    title: "BUILD YOUR POOL",
    description: "Stay connected with promising athletes for future opportunities.",
  },
];

function TrustPanel({ audience, colorClass, features }) {
  return (
    <article
      className={`group relative flex min-h-[390px] flex-col overflow-hidden rounded-2xl border border-[#f2ff65]/20 shadow-xl p-7 sm:p-9 md:min-h-[410px] ${colorClass} font-['Poppins',sans-serif]`}
    >
      {/* Audience */}
      <div className="mb-8 border-b border-[#f2ff65]/70 pb-6">
        <p className="text-[11px] font-semibold tracking-[0.24em] text-[#f2ff65]/80">
          FOR
        </p>

        <h3 className="mt-2 text-4xl font-extrabold leading-none tracking-[-0.055em] text-[#f2ff65] sm:text-5xl">
          {audience}
        </h3>
      </div>

      {/* Features */}
      <div className="space-y-6">
        {features.map((feature) => (
          <div
            key={feature.number}
            className="group/feature flex gap-4 transition-transform duration-300 hover:translate-x-1 font-['Inter',sans-serif]"
          >
            <span className="w-11 shrink-0 text-3xl font-extrabold leading-none tracking-[-0.08em] text-[#f2ff65]/25">
              {feature.number}
            </span>

            <div className="pt-0.5">
              <h4 className="text-base font-bold tracking-[-0.02em] text-[#f2ff65] sm:text-lg">
                {feature.title}
              </h4>

              <p className="mt-1 max-w-sm text-sm font-light leading-relaxed text-[#f5f0e7]/80">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Hover accent */}
      <span className="absolute bottom-0 left-0 h-1 w-0 bg-[#f2ff65] transition-all duration-300 group-hover:w-full" />
    </article>
  );
}

export default function Trust() {
  return (
    <section id="about" className="w-full bg-[#17241a] px-6 py-16 sm:px-10 md:py-20 lg:px-16 xl:px-20 scroll-mt-20">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Header */}
        <header className="mb-10 sm:mb-12">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] text-[#f2ff65]/70">
            HOW IT WORKS
          </p>

          <h2 className="text-4xl font-extrabold leading-none tracking-[-0.055em] text-[#f2ff65] sm:text-5xl">
            Built for athletes and academies
          </h2>

          <div className="mt-7 h-px w-full bg-[#f2ff65]/80" />
        </header>

        {/* Two-sided panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Athlete */}
          <div id="athletes" className="scroll-mt-20">
            <TrustPanel
              audience="ATHLETES"
              colorClass="bg-[#95402f]"
              features={athleteFeatures}
            />
          </div>

          {/* Academy */}
          <TrustPanel
            audience="ACADEMIES"
            colorClass="bg-[#2c337f]"
            features={academyFeatures}
          />
        </div>
      </div>
    </section>
  );
}