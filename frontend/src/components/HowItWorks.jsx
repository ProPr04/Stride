import React from "react";

const steps = [
  {
    number: "01",
    title: "EARN",
    description: "Turn your sporting skills into paid work.",
    color: "bg-[#2C337F]",
  },
  {
    number: "02",
    title: "LEARN",
    description: "Gain real experience in sporting environments.",
    color: "bg-[#95402f]",
  },
  {
    number: "03",
    title: "PROVE",
    description: "Build verified experience and reputation.",
    color: "bg-[#95402f]",
  },
  {
    number: "04",
    title: "GROW",
    description: "Unlock better sporting opportunities.",
    color: "bg-[#2C337F]",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-[#17241a] px-6 py-14 sm:px-10 md:py-16 lg:px-16 xl:px-20 font-['Poppins',sans-serif]">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-9 flex items-end justify-between gap-6 sm:mb-11">
          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] text-[#f2ff65]/70">
              THE STRIDE METHOD
            </p>
            <h2 className="text-4xl font-extrabold leading-none tracking-[-0.055em] text-[#f2ff65] sm:text-5xl">
              HOW IT WORKS
            </h2>
          </div>

          <span className="hidden h-px w-24 bg-[#315038] sm:block" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {steps.map((step) => (
            <article
              key={step.number}
              className={`group relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl border border-[#315038] p-7 transition-transform duration-300 ease-out hover:-translate-y-1 sm:min-h-[280px] sm:p-8 ${step.color} font-['Inter',sans-serif] shadow-lg`}
            >
              <div className="pointer-events-none absolute right-5 top-3 text-[7rem] font-extrabold leading-none tracking-[-0.1em] text-[#f2ff65]/[0.07] sm:right-7 sm:text-[8rem]">
                {step.number}
              </div>

              <div className="relative flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.2em] text-[#f2ff65]">
                  {step.number}
                </span>
                <span className="h-2.5 w-2.5 border border-[#f2ff65]/70" />
              </div>

              <div className="relative mt-auto max-w-xs">
                <div className="mb-5 h-px w-10 bg-[#f2ff65]" />
                <h3 className="text-3xl font-extrabold leading-none tracking-[-0.05em] text-[#f2ff65] sm:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-[#f2ff65]/80 sm:text-base">
                  {step.description}
                </p>
              </div>

              <span className="absolute bottom-0 left-0 h-1 w-0 bg-[#f2ff65] transition-all duration-300 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}