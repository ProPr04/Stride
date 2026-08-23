import React, { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BadgeCheck,
  Calendar,
  ChevronRight,
  MapPin,
  Search,
  Star,
  Trophy,
  UserRound,
  X,
  Zap,
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


/* =========================================================
   ATHLETE CARD
========================================================= */

function AthleteCard({ athlete, onViewProfile }) {
  const image =
    athlete.avatar_url ||
    athlete.avatar ||
    athlete.image ||
    athlete.profileImage ||
    null;

  return (
    <article className="group min-w-[285px] snap-start overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#315038] via-[#223F31] to-[#166534] shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F2FF65]/35 hover:shadow-[0_18px_45px_rgba(0,0,0,0.28)] sm:min-w-[320px]">
      {/* PROFILE IMAGE */}
      <div className="relative h-[250px] overflow-hidden bg-[#1B2B20]">
        {image ? (
          <>
            <img
              src={image}
              alt={athlete.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#16251B] via-transparent to-transparent" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#315038] to-[#166534]">
            <div className="grid h-28 w-28 place-items-center rounded-full border-2 border-[#F2FF65]/25 bg-[#2A3C2E]">
              <UserRound
                size={52}
                strokeWidth={1.2}
                className="text-[#F2FF65]"
              />
            </div>
          </div>
        )}

        {/* VERIFIED BADGE */}
        {athlete.verified && (
          <div className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-[#141F16]/80 backdrop-blur-md">
            <BadgeCheck
              size={18}
              className="text-[#F2FF65]"
              fill="currentColor"
              strokeWidth={2}
            />
          </div>
        )}

        {/* SPORT */}
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full border border-[#F2FF65]/30 bg-[#141F16]/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F2FF65] backdrop-blur-md">
            {athlete.sport || "Athlete"}
          </span>
        </div>
      </div>

      {/* INFORMATION */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate font-['Poppins'] text-base font-semibold tracking-[-0.03em] text-[#F7F5ED]">
                {athlete.name}
              </h3>

              {athlete.verified && (
                <BadgeCheck
                  size={15}
                  className="shrink-0 text-[#3B82F6]"
                  fill="currentColor"
                  strokeWidth={2.2}
                />
              )}
            </div>

            <p className="mt-1 text-xs text-[#F7F5ED]/60">
              {athlete.position || athlete.role || athlete.sport}
            </p>
          </div>

          {athlete.rating && (
            <div className="flex shrink-0 items-center gap-1 text-[#F2FF65]">
              <Star size={12} fill="currentColor" />
              <span className="text-xs font-semibold">
                {athlete.rating}
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {athlete.level && (
            <span className="rounded-full border border-[#F2FF65]/20 bg-[#2A3C2E]/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#F2FF65]">
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

        <button
          onClick={() => onViewProfile(athlete)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#F2FF65]/35 bg-[#F2FF65]/5 px-4 py-2.5 text-[11px] font-bold text-[#F2FF65] transition-all duration-200 hover:bg-[#F2FF65] hover:text-[#16251B]"
        >
          View Athlete Profile
          <ChevronRight size={14} />
        </button>
      </div>
    </article>
  );
}

/* =========================================================
   ATHLETE PROFILE MODAL
========================================================= */

function AthleteProfileModal({ athlete, onClose }) {
  if (!athlete) return null;

  const image =
    athlete.avatar_url ||
    athlete.avatar ||
    athlete.image ||
    athlete.profileImage ||
    null;

  const age = athlete.age || "21 Yrs";

  const bio = athlete.bio || "Athlete profile information will appear here.";

  const performanceMetrics = athlete.performance_metrics || athlete.performanceMetrics || "Performance information will be updated by the athlete.";

  let achievements = [];
  try {
    achievements = typeof athlete.achievements === 'string' ? JSON.parse(athlete.achievements) : athlete.achievements || [];
  } catch (e) {
    achievements = [];
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-[#141F16] shadow-[0_30px_100px_rgba(0,0,0,0.55)] scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[#0B120D]/80 text-gray-300 backdrop-blur-md transition hover:border-[#F2FF65]/40 hover:text-[#F2FF65]"
        >
          <X size={17} />
        </button>

        {/* COVER / IMAGE */}
        <div className="relative h-[260px] overflow-hidden bg-gradient-to-br from-[#315038] to-[#166534]">
          {image ? (
            <img
              src={image}
              alt={athlete.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="grid h-32 w-32 place-items-center rounded-full border-2 border-[#F2FF65]/30 bg-[#2A3C2E]">
                <UserRound
                  size={58}
                  className="text-[#F2FF65]"
                  strokeWidth={1.2}
                />
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#141F16] via-[#141F16]/10 to-transparent" />

          <div className="absolute bottom-5 left-6 right-6">
            <div className="flex items-end gap-4">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-[#141F16] bg-[#0B120D] shadow-xl">
                {image ? (
                  <img
                    src={image}
                    alt={athlete.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center">
                    <UserRound
                      size={38}
                      className="text-[#F2FF65]"
                    />
                  </div>
                )}
              </div>

              <div className="min-w-0 pb-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-['Poppins'] text-xl font-bold tracking-[-0.03em] text-white sm:text-2xl">
                    {athlete.name}
                  </h2>

                  {athlete.verified && (
                    <BadgeCheck
                      size={19}
                      className="text-[#F2FF65]"
                      fill="currentColor"
                    />
                  )}
                </div>

                <p className="mt-1 text-xs font-medium text-gray-300">
                  {athlete.position ||
                    athlete.role ||
                    athlete.sport ||
                    "Athlete"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BASIC INFORMATION */}
        <div className="grid grid-cols-1 gap-3 border-b border-[#2A3C2E] bg-[#0B120D] p-5 sm:grid-cols-3">
          <div className="rounded-xl border border-[#2A3C2E] bg-[#141F16] p-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
              <Calendar size={13} className="text-[#F2FF65]" />
              Age
            </div>

            <p className="mt-2 text-sm font-semibold text-white">
              {age}
            </p>
          </div>

          <div className="rounded-xl border border-[#2A3C2E] bg-[#141F16] p-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
              <MapPin size={13} className="text-[#F2FF65]" />
              Location
            </div>

            <p className="mt-2 text-sm font-semibold text-white">
              {athlete.location || "Location not available"}
            </p>
          </div>

          <div className="rounded-xl border border-[#2A3C2E] bg-[#141F16] p-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
              <Award size={13} className="text-[#F2FF65]" />
              Sport
            </div>

            <p className="mt-2 text-sm font-semibold text-white">
              {athlete.sport || "Sport not available"}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-5 p-5 sm:p-6">
          {/* PERFORMANCE */}
          <section className="rounded-2xl border border-[#F2FF65]/15 bg-gradient-to-br from-[#315038] to-[#223F31] p-5">
            <div className="mb-3 flex items-center gap-2">
              <Zap size={16} className="text-[#F2FF65]" />

              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#F2FF65]">
                Key Performance Stats
              </h3>
            </div>

            <p className="text-sm font-semibold leading-6 text-white">
              {performanceMetrics}
            </p>
          </section>

          {/* BIO */}
          <section className="rounded-2xl border border-[#2A3C2E] bg-[#0B120D] p-5">
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#F2FF65]">
              Athlete Bio
            </h3>

            <p className="text-sm leading-6 text-gray-300">
              {bio}
            </p>
          </section>

          {/* ACCOMPLISHMENTS */}
          <section className="rounded-2xl border border-[#2A3C2E] bg-[#0B120D] p-5">
            <div className="mb-4 flex items-center gap-2">
              <Trophy size={16} className="text-[#F2FF65]" />

              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#F2FF65]">
                Athlete Accomplishments
              </h3>
            </div>

            {achievements.length > 0 ? (
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-[#2A3C2E] bg-[#141F16] p-4"
                  >
                    <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#F2FF65]/10">
                      <Trophy
                        size={15}
                        className="text-[#F2FF65]"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold leading-5 text-white">
                        {achievement.title}
                      </p>

                      {achievement.date && (
                        <p className="mt-1 text-[10px] font-medium text-gray-500">
                          {achievement.date}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">
                No accomplishments added yet.
              </p>
            )}
          </section>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t border-[#2A3C2E] bg-[#0B120D] px-5 py-4">
          <div className="text-[10px] uppercase tracking-wider text-gray-500">
            Athlete Profile
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-[#F2FF65]/30 px-4 py-2 text-[11px] font-bold text-[#F2FF65] transition hover:bg-[#F2FF65] hover:text-[#16251B]"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CAROUSEL ARROW
========================================================= */

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

/* =========================================================
   MAIN ACADEMY OVERVIEW
========================================================= */

export default function AcademyOverviewSection({
  academy,
  athletes = [],
}) {
  const athleteCarouselRef = useRef(null);

  const [selectedAthlete, setSelectedAthlete] = useState(null);

  /* NEW: SEARCH STATE */
  const [searchQuery, setSearchQuery] = useState("");

  const scrollCarousel = (ref, direction) => {
    ref.current?.scrollBy({
      left: direction * 340,
      behavior: "smooth",
    });
  };

  /* =====================================================
     ATHLETE PROFILE MODAL
  ===================================================== */

  const handleAthleteProfile = (athlete) => {
    setSelectedAthlete(athlete);
  };

  /*
   * Temporary visual images.
   * Backend images automatically take priority.
   */
  const visualAthletes = athletes.map((athlete, index) => {
    const mockImages = [
      "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&auto=format&fit=crop&q=80",
    ];

    return {
      ...athlete,
      image:
        athlete.image ||
        athlete.avatar ||
        athlete.profileImage ||
        mockImages[index % mockImages.length],
    };
  });

  /* =====================================================
     WORKING ATHLETE SEARCH
     
     Searches through:
     - Athlete name
     - Sport
     - Position
     - Role
     - Level
     - Location
     ===================================================== */

  const filteredAthletes = visualAthletes.filter((athlete) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return true;

    const searchableText = [
      athlete.name,
      athlete.sport,
      athlete.position,
      athlete.role,
      athlete.level,
      athlete.location,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query);
  });

  return (
    <section className="min-h-full w-full bg-[#2A3C2E] font-['Inter'] text-[#F7F5ED]">
      {/* =====================================================
          HERO
      ===================================================== */}

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
            Find emerging sporting talent and build your academy's
            next generation of athletes.
          </p>
        </div>
      </header>

      {/* =====================================================
          WORKING SEARCH
      ===================================================== */}

      <div className="mx-auto max-w-3xl">
        <label className="relative block">
          <Search
            size={18}
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#F2FF65]/70"
          />

          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search athletes, sports or skills..."
            className="w-full rounded-full border border-white/10 bg-[#315038]/80 py-4 pl-12 pr-12 text-sm text-[#F7F5ED] shadow-[0_10px_30px_rgba(0,0,0,0.15)] outline-none placeholder:text-[#F7F5ED]/35 transition-all focus:border-[#F2FF65]/50 focus:ring-2 focus:ring-[#F2FF65]/10"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F7F5ED]/40 transition hover:text-[#F2FF65]"
              aria-label="Clear search"
            >
              <X size={17} />
            </button>
          )}
        </label>
      </div>

      {/* =====================================================
          ATHLETES
      ===================================================== */}

      <section className="mt-10">
        {/* VIEW ALL REMOVED */}

        <div className="mb-5">
          <div className="flex items-center gap-2">
            <span className="h-4 w-1 rounded-full bg-[#F2FF65]" />

            <h2 className="font-['Poppins'] text-lg font-semibold tracking-[-0.04em] text-[#F7F5ED] sm:text-xl">
              Discover Athletes
            </h2>
          </div>

          <p className="mt-1.5 pl-3 text-xs text-[#F7F5ED]/50">
            Explore athletes and discover sporting talent.
          </p>
        </div>

        {filteredAthletes.length ? (
          <div className="relative px-1 sm:px-2">
            <CarouselArrow
              direction="left"
              label="Previous athletes"
              onClick={() =>
                scrollCarousel(athleteCarouselRef, -1)
              }
            />

            <div
              ref={athleteCarouselRef}
              className="flex snap-x gap-5 overflow-x-auto px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {filteredAthletes.map((athlete) => (
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
              onClick={() =>
                scrollCarousel(athleteCarouselRef, 1)
              }
            />
          </div>
        ) : (
          <div className="flex min-h-[220px] items-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#315038] to-[#166534] px-6">
            <div>
              <Search
                size={24}
                className="mb-4 text-[#F2FF65]"
              />

              <h3 className="font-['Poppins'] text-base font-semibold text-[#F7F5ED]">
                No athletes found
              </h3>

              <p className="mt-2 text-xs text-[#F7F5ED]/55">
                Try searching for a different athlete, sport or skill.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================
          ATHLETE PROFILE MODAL
      ===================================================== */}

      {selectedAthlete && (
        <AthleteProfileModal
          athlete={selectedAthlete}
          onClose={() => setSelectedAthlete(null)}
        />
      )}
    </section>
  );
}