import React from "react";

const trustFeatures = [
  {
    number: "01",
    title: "Verified Profile",
    description:
      "Show the experience, skills and details that make you credible.",
  },
  {
    number: "02",
    title: "Two-Sided Reviews",
    description:
      "Build trust through clear, honest feedback after every role.",
  },
  {
    number: "03",
    title: "Reputation History",
    description:
      "Keep a visible record of the work and relationships you earn.",
  },
];

function TrustPanel({ audience, colorClass }) {
  return (
    <article
      className={`group relative flex min-h-[390px] flex-col overflow-hidden p-7 sm:p-9 md:min-h-[410px] ${colorClass}`}
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
      <div className="space-y-7">
        {trustFeatures.map((feature) => (
          <div
            key={feature.number}
            className="group/feature flex gap-4 transition-transform duration-300 hover:translate-x-1"
          >
            <span className="w-11 shrink-0 text-3xl font-extrabold leading-none tracking-[-0.08em] text-[#f2ff65]/25">
              {feature.number}
            </span>

            <div className="pt-0.5">
              <h4 className="text-base font-bold tracking-[-0.02em] text-[#f2ff65] sm:text-lg">
                {feature.title}
              </h4>

              <p className="mt-1.5 max-w-sm text-sm font-light leading-relaxed text-[#f5f0e7]/80">
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
    <section className="w-full bg-[#2a3c2e] px-6 py-16 sm:px-10 md:py-20 lg:px-16 xl:px-20">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Header */}
        <header className="mb-10 sm:mb-12">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] text-[#f2ff65]/70">
            TRUST, BUILT IN
          </p>

          <h2 className="text-4xl font-extrabold leading-none tracking-[-0.055em] text-[#f2ff65] sm:text-5xl">
            Every interaction builds a reputation
          </h2>

          <div className="mt-7 h-px w-full bg-[#f2ff65]/80" />
        </header>

        {/* Two-sided panels */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Athlete */}
          <TrustPanel
            audience="ATHLETE"
            colorClass="bg-[#95402f]"
          />

          {/* Academy */}
          <TrustPanel
            audience="ACADEMY"
            colorClass="bg-[#2c337f] md:border-l md:border-[#f2ff65]"
          />
        </div>
      </div>
    </section>
  );
}