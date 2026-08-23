
import React, { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ChevronRight,
  Filter,
  MapPin,
  Search,
  Star,
  UserRound,
} from "lucide-react";

const COLORS = {
  bg: "#2A3C2E",
  green: "#315038",
  deepGreen: "#166534",
  navy: "#0F172A",
  blue: "#2C337F",
  lime: "#F2FF65",
  text: "#F7F5ED",
};

function AthleteCard({ athlete, onViewProfile }) {
  return (
    <article className="group min-w-[285px] snap-start overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#315038] via-[#223F31] to-[#166534] shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F2FF65]/35 hover:shadow-[0_18px_45px_rgba(0,0,0,0.28)] sm:min-w-[320px]">
      <div className="relative overflow-hidden border-b border-white/10 p-5">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F2FF65]/10 blur-2xl transition-all duration-300 group-hover:bg-[#F2FF65]/20" />

        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-full border-2 border-[#F2FF65]/25 bg-[#2A3C2E] shadow-lg">
              <UserRound
                size={30}
                strokeWidth={1.4}
                className="text-[#F2FF65]"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate font-['Poppins'] text-base font-semibold tracking-[-0.03em] text-[#F7F5ED]">
                  {athlete.name}
                </h3>

                {athlete.verified && (
                  <BadgeCheck
                    size={16}
                    className="shrink-0 text-[#3B82F6]"
                    fill="currentColor"
                    strokeWidth={2.2}
                  />
                )}
              </div>

              <p className="mt-1 text-xs text-[#F7F5ED]/65">
                {athlete.sport}
                {athlete.position ? ` · ${athlete.position}` : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-4 flex flex-wrap gap-2">
          {athlete.level && (
            <span className="rounded-full border border-[#F2FF65]/25 bg-[#2A3C2E]/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#F2FF65]">
              {athlete.level}
            </span>
          )}

          {athlete.location && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/10 px-2.5 py-1 text-[10px] text-[#F7F5ED]/60">
              <MapPin size={11} />
              {athlete.location}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between p-5">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#F7F5ED]/40">
            Performance
          </p>

          <div className="mt-1 flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-[#F2FF65]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={12}
                  fill="currentColor"
                  strokeWidth={1}
                />
              ))}
            </div>

            <span className="text-xs font-semibold text-[#F7F5ED]">
              {athlete.rating ?? "—"}
            </span>
          </div>
        </div>

        <button
          onClick={() => onViewProfile(athlete)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#F2FF65]/45 px-3.5 py-2 text-[11px] font-bold text-[#F2FF65] transition-all duration-200 hover:bg-[#F2FF65] hover:text-[#16251B]"
        >
          View Profile
          <ChevronRight
            size={13}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </article>
  );
}

function OpportunityCard({ opportunity, applicationCount, onClick }) {
  return (
    <button
      onClick={() => onClick(opportunity)}
      className="group relative flex min-w-[300px] snap-start flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0F172A] via-[#172554] to-[#2C337F] p-5 text-left shadow-[0_12px_35px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F2FF65]/35 hover:shadow-[0_18px_45px_rgba(0,0,0,0.3)] sm:min-w-[335px]"
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#3B82F6]/15 blur-3xl transition-all duration-300 group-hover:bg-[#3B82F6]/25" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full border border-[#F2FF65]/30 bg-[#F2FF65]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#F2FF65]">
            {opportunity.status || "Draft"}
          </span>

          <div className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5">
            <BriefcaseBusiness
              size={16}
              className="text-[#F2FF65]"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <h3 className="mt-7 max-w-[270px] font-['Poppins'] text-lg font-semibold leading-tight tracking-[-0.035em] text-[#F7F5ED]">
          {opportunity.title}
        </h3>

        <p className="mt-2 text-xs text-[#F7F5ED]/60">
          {[opportunity.sport, opportunity.location]
            .filter(Boolean)
            .join(" · ") || "Opportunity details available"}
        </p>
      </div>

      <div className="relative mt-8 flex items-center justify-between border-t border-white/10 pt-4">
        <div>
          <p className="text-[9px] uppercase tracking-wider text-[#F7F5ED]/40">
            Applications
          </p>

          <p className="mt-0.5 text-xs font-semibold text-[#F7F5ED]">
            {applicationCount === null
              ? "Unavailable"
              : `${applicationCount} application${
                  applicationCount === 1 ? "" : "s"
                }`}
          </p>
        </div>

        <span className="grid h-9 w-9 place-items-center rounded-full border border-[#F2FF65]/30 text-[#F2FF65] transition-all duration-200 group-hover:bg-[#F2FF65] group-hover:text-[#16251B]">
          <ChevronRight size={16} />
        </span>
      </div>
    </button>
  );
}

function SectionHeader({ title, description, onViewAll }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 rounded-full bg-[#F2FF65]" />

          <h2 className="font-['Poppins'] text-lg font-semibold tracking-[-0.04em] text-[#F7F5ED] sm:text-xl">
            {title}
          </h2>
        </div>

        <p className="mt-1.5 pl-3 text-xs text-[#F7F5ED]/50">
          {description}
        </p>
      </div>

      <button
        onClick={onViewAll}
        className="group inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold text-[#F2FF65] transition-colors hover:bg-[#F2FF65]/10"
      >
        View all
        <ChevronRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </button>
    </div>
  );
}

function CarouselArrow({ direction, onClick, label }) {
  const isLeft = direction === "left";

  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`absolute ${
        isLeft
          ? "left-0 -translate-x-1/2"
          : "right-0 translate-x-1/2"
      } top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#F2FF65]/30 bg-[#315038]/95 text-[#F2FF65] shadow-[0_8px_25px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-[#F2FF65]/60 hover:bg-[#F2FF65] hover:text-[#16251B]`}
    >
      {isLeft ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
    </button>
  );
}

export default function AcademyOverviewSection({
  academy,
  athletes = [],
  opportunities = [],
  applications = [],
  setActiveTab,
}) {
  const athleteCarouselRef = useRef(null);
  const opportunityCarouselRef = useRef(null);

  const scrollCarousel = (ref, direction) => {
    ref.current?.scrollBy({
      left: direction * 340,
      behavior: "smooth",
    });
  };

  const handleAthleteProfile = (athlete) => {
    setActiveTab?.("athletes", athlete.id);
  };

  const handleOpportunityClick = (opportunity) => {
    setActiveTab?.("opportunities", opportunity.id);
  };

  const getApplicationCount = (opportunity) => {
    if (typeof opportunity.applicationCount === "number") {
      return opportunity.applicationCount;
    }

    if (typeof opportunity.applicationsCount === "number") {
      return opportunity.applicationsCount;
    }

    if (Array.isArray(opportunity.applications)) {
      return opportunity.applications.length;
    }

    if (Array.isArray(applications)) {
      const matching = applications.filter(
        (application) =>
          String(
            application.opportunityId || application.opportunity?.id
          ) === String(opportunity.id)
      );

      return matching.length || null;
    }

    return null;
  };

  return (
    <section className="min-h-full w-full bg-[#2A3C2E] font-['Inter'] text-[#F7F5ED]">
      {/* HERO HEADER */}
      <header className="relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#2C337F] via-[#172554] to-[#0F172A] px-6 py-6 shadow-[0_15px_40px_rgba(0,0,0,0.18)] sm:px-8 sm:py-7">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#3B82F6]/15 blur-3xl" />
        <div className="absolute bottom-[-100px] left-[35%] h-48 w-48 rounded-full bg-[#2C337F]/30 blur-3xl" />

        <div className="relative">
          <div className="mb-2.5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F2FF65] shadow-[0_0_10px_#F2FF65]" />

            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#F2FF65]">
              {academy?.name || "Academy workspace"}
            </p>
          </div>

          <h1 className="font-['Poppins'] text-2xl font-bold tracking-[-0.055em] text-[#F2FF65] sm:text-3xl">
            Discover Athletes
          </h1>

          <p className="mt-1.5 max-w-xl text-xs leading-5 text-[#F7F5ED]/65">
            Find emerging sporting talent and build your academy's next
            generation of athletes.
          </p>
        </div>
      </header>

      {/* SEARCH */}
      <div className="relative overflow-hidden rounded-2xl border border-[#F2FF65]/15 bg-gradient-to-r from-[#315038] via-[#223F31] to-[#2C337F] p-[1px] shadow-[0_12px_35px_rgba(0,0,0,0.15)]">
        <div className="rounded-[15px] bg-[#315038]/90 p-4 backdrop-blur-md sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row">
            <label className="relative block flex-1">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#F2FF65]/75"
              />

              <input
                type="search"
                placeholder="Search athletes by name, sport, skill or location"
                className="w-full rounded-xl border border-white/10 bg-[#2A3C2E]/80 py-3 pl-11 pr-4 text-xs text-[#F7F5ED] outline-none placeholder:text-[#F7F5ED]/35 transition-all focus:border-[#F2FF65]/60 focus:ring-2 focus:ring-[#F2FF65]/10"
              />
            </label>

            <div className="grid grid-cols-2 gap-3 sm:flex">
              <select className="rounded-xl border border-white/10 bg-[#2A3C2E]/80 px-3 py-3 text-xs text-[#F7F5ED] outline-none focus:border-[#F2FF65]/60">
                <option value="">All Sports</option>
                <option value="football">Football</option>
                <option value="cricket">Cricket</option>
                <option value="athletics">Athletics</option>
                <option value="badminton">Badminton</option>
              </select>

              <select className="rounded-xl border border-white/10 bg-[#2A3C2E]/80 px-3 py-3 text-xs text-[#F7F5ED] outline-none focus:border-[#F2FF65]/60">
                <option value="">Any Level</option>
                <option value="national">National</option>
                <option value="state">State</option>
                <option value="professional">Professional</option>
              </select>

              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#F2FF65]/35 bg-[#F2FF65] px-4 py-3 text-xs font-bold text-[#16251B] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(242,255,101,0.2)]">
                <Filter size={15} />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ATHLETES */}
      <section className="mt-10">
        <SectionHeader
          title="Discover Athletes"
          description="Athletes matched to your academy."
          onViewAll={() => setActiveTab?.("athletes")}
        />

        {athletes.length ? (
          <div className="relative px-1 sm:px-2">
            <CarouselArrow
              direction="left"
              label="Previous athletes"
              onClick={() => scrollCarousel(athleteCarouselRef, -1)}
            />

            <div
              ref={athleteCarouselRef}
              className="flex snap-x gap-5 overflow-x-auto px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {athletes.map((athlete) => (
                <AthleteCard
                  key={athlete.id}
                  athlete={athlete}
                  onViewProfile={handleAthleteProfile}
                />
              ))}
            </div>

            <CarouselArrow
              direction="right"
              label="Next athletes"
              onClick={() => scrollCarousel(athleteCarouselRef, 1)}
            />
          </div>
        ) : (
          <div className="flex min-h-[220px] items-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#315038] to-[#166534] px-6">
            <div>
              <UserRound
                size={24}
                className="mb-4 text-[#F2FF65]"
              />

              <h3 className="font-['Poppins'] text-base font-semibold text-[#F7F5ED]">
                No athletes to show yet
              </h3>

              <p className="mt-2 text-xs text-[#F7F5ED]/55">
                Athlete profiles will appear here when available.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* OPPORTUNITIES */}
      <section className="mt-12">
        <SectionHeader
          title="Your Opportunities"
          description="Manage your live and draft academy opportunities."
          onViewAll={() => setActiveTab?.("opportunities")}
        />

        {opportunities.length ? (
          <div className="relative px-1 sm:px-2">
            <CarouselArrow
              direction="left"
              label="Previous opportunities"
              onClick={() =>
                scrollCarousel(opportunityCarouselRef, -1)
              }
            />

            <div
              ref={opportunityCarouselRef}
              className="flex snap-x gap-5 overflow-x-auto px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {opportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  applicationCount={getApplicationCount(opportunity)}
                  onClick={handleOpportunityClick}
                />
              ))}
            </div>

            <CarouselArrow
              direction="right"
              label="Next opportunities"
              onClick={() =>
                scrollCarousel(opportunityCarouselRef, 1)
              }
            />
          </div>
        ) : (
          <div className="flex min-h-[190px] flex-col justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#2C337F] px-6">
            <BriefcaseBusiness
              size={24}
              className="mb-4 text-[#F2FF65]"
            />

            <h3 className="font-['Poppins'] text-base font-semibold text-[#F7F5ED]">
              No opportunities yet
            </h3>

            <p className="mt-2 text-xs text-[#F7F5ED]/55">
              Your academy opportunities will appear here.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}

