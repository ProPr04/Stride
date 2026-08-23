import React, { useMemo, useState } from "react";
import {
  BadgeCheck,
  ChevronRight,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  Trophy,
  UserRound,
  X,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

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
  const image = athlete.avatar || athlete.image || athlete.profileImage;

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#315038] via-[#223F31] to-[#166534] shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F2FF65]/35 hover:shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
      <div className="relative overflow-hidden border-b border-white/10 p-5">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F2FF65]/10 blur-2xl transition-all duration-300 group-hover:bg-[#F2FF65]/20" />

        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-[68px] w-[68px] shrink-0 place-items-center overflow-hidden rounded-full border-2 border-[#F2FF65]/25 bg-[#2A3C2E] text-[#F2FF65] shadow-lg">
              {image ? (
                <img
                  src={image}
                  alt={athlete.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={30} strokeWidth={1.4} />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="truncate font-['Poppins'] text-base font-semibold tracking-[-0.025em] text-[#F7F5ED]">
                  {athlete.name}
                </h2>

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
                {athlete.sport || "Sport not specified"}
                {athlete.position
                  ? ` · ${athlete.position}`
                  : athlete.primarySkill
                  ? ` · ${athlete.primarySkill}`
                  : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-4 flex flex-wrap gap-2">
          {(athlete.level || athlete.experienceLevel) && (
            <span className="rounded-full border border-[#F2FF65]/25 bg-[#2A3C2E]/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#F2FF65]">
              {athlete.level || athlete.experienceLevel}
            </span>
          )}

          {(athlete.location || athlete.city) && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/10 px-2.5 py-1 text-[10px] text-[#F7F5ED]/60">
              <MapPin size={11} />
              {athlete.location || athlete.city}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between p-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F7F5ED]/40">
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
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#F2FF65]/45 px-3 py-2 text-[11px] font-bold text-[#F2FF65] transition-all duration-200 hover:bg-[#F2FF65] hover:text-[#16251B]"
        >
          View Profile
          <ChevronRight
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </article>
  );
}

function AthleteProfileModal({ athlete, onClose }) {
  if (!athlete) return null;

  const image = athlete.avatar || athlete.image || athlete.profileImage;

  const details = [
    ["Sport", athlete.sport],
    ["Position", athlete.position || athlete.primarySkill],
    ["Level", athlete.level || athlete.experienceLevel],
    ["Location", athlete.location || athlete.city],
    ["Rating", athlete.rating],
    ["Experience", athlete.experience],
    ["Availability", athlete.availability],
  ].filter(
    ([, value]) =>
      value !== undefined &&
      value !== null &&
      value !== ""
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-[#07130D]/80 p-4 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${athlete.name} profile`}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#315038] shadow-[0_25px_80px_rgba(0,0,0,0.45)]">

        <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-[#0F2F23] via-[#166534] to-[#315038] p-5 sm:p-6">
          <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#F2FF65]/10 blur-3xl" />

          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-[#F2FF65]/30 bg-[#2A3C2E] text-[#F2FF65] shadow-lg">
                {image ? (
                  <img
                    src={image}
                    alt={athlete.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={28} strokeWidth={1.4} />
                )}
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-['Poppins'] text-lg font-semibold tracking-[-0.035em] text-[#F7F5ED] sm:text-xl">
                    {athlete.name}
                  </h2>

                  {athlete.verified && (
                    <BadgeCheck
                      size={18}
                      className="text-[#3B82F6]"
                      fill="currentColor"
                      strokeWidth={2.25}
                    />
                  )}
                </div>

                <p className="mt-1 text-xs text-[#F7F5ED]/60">
                  {athlete.sport || "Athlete"}
                  {athlete.position
                    ? ` · ${athlete.position}`
                    : athlete.primarySkill
                    ? ` · ${athlete.primarySkill}`
                    : ""}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#F7F5ED]/70 transition-all hover:border-[#F2FF65]/40 hover:bg-[#F2FF65]/10 hover:text-[#F2FF65]"
              aria-label="Close athlete profile"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {athlete.bio && (
            <div className="mb-6 rounded-xl border border-white/10 bg-[#2A3C2E] p-4">
              <p className="text-sm leading-6 text-[#F7F5ED]/70">
                {athlete.bio}
              </p>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            {details.map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 bg-gradient-to-br from-[#2A3C2E] to-[#315038] px-4 py-3.5"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#F2FF65]/65">
                  {label}
                </p>

                <p className="mt-1.5 text-sm font-medium text-[#F7F5ED]">
                  {String(value)}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="mt-6 rounded-xl bg-[#F2FF65] px-5 py-2.5 text-sm font-bold text-[#16251B] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(242,255,101,0.2)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AcademyAthletesSection({
  athletes = [],
  setActiveTab,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const selectedAthleteId = searchParams.get("athlete");

  const selectedAthlete =
    athletes.find(
      (athlete) =>
        String(athlete.id) === String(selectedAthleteId)
    ) || null;

  const filteredAthletes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return athletes;

    return athletes.filter((athlete) => {
      const location =
        athlete.location || athlete.city || "";

      const level =
        athlete.level ||
        athlete.experienceLevel ||
        "";

      const searchable = [
        athlete.name,
        athlete.sport,
        athlete.position,
        athlete.primarySkill,
        location,
        level,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [athletes, search]);

  const openProfile = (athlete) => {
    setActiveTab?.("athletes", athlete.id);
    setSearchParams({ athlete: athlete.id });
  };

  const closeProfile = () => {
    setSearchParams({});
  };

  return (
    <section className="min-h-full w-full bg-[#2A3C2E] font-['Inter'] text-[#F7F5ED]">

      {/* SEARCH */}
      <div className="mb-8">
        <label className="relative block">
          <Search
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#F2FF65]/70"
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            type="search"
            placeholder="Search athletes by name, sport, skill or location"
            className="w-full rounded-2xl border border-white/10 bg-[#315038]/70 py-3.5 pl-11 pr-11 text-sm text-[#F7F5ED] outline-none placeholder:text-[#F7F5ED]/35 backdrop-blur-sm transition-all focus:border-[#F2FF65]/45 focus:bg-[#315038] focus:ring-2 focus:ring-[#F2FF65]/10"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F7F5ED]/45 transition-colors hover:text-[#F2FF65]"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </label>
      </div>

      {/* RESULTS HEADER */}
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-[#F2FF65]" />

            <h1 className="font-['Poppins'] text-lg font-semibold tracking-[-0.035em] text-[#F7F5ED] sm:text-xl">
              Athlete Profiles
            </h1>
          </div>

          <p className="mt-1.5 pl-3 text-xs text-[#F7F5ED]/50">
            {filteredAthletes.length} athlete
            {filteredAthletes.length === 1 ? "" : "s"} available
          </p>
        </div>
      </div>

      {/* ATHLETE GRID */}
      {filteredAthletes.length ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredAthletes.map((athlete) => (
            <AthleteCard
              key={athlete.id}
              athlete={athlete}
              onViewProfile={openProfile}
            />
          ))}
        </div>
      ) : (
        <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#315038] to-[#166534] px-6 text-center">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#F2FF65]/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-[#F2FF65]/20 bg-[#2A3C2E] text-[#F2FF65]">
              <Trophy size={25} strokeWidth={1.5} />
            </div>

            <h2 className="mt-5 font-['Poppins'] text-lg font-semibold text-[#F7F5ED]">
              No athletes found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#F7F5ED]/55">
              Try another name, sport, skill or location.
            </p>

            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-5 rounded-xl bg-[#F2FF65] px-4 py-2.5 text-xs font-bold text-[#16251B] transition-all hover:-translate-y-0.5"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      )}

      {/* PROFILE MODAL */}
      <AthleteProfileModal
        athlete={selectedAthlete}
        onClose={closeProfile}
      />
    </section>
  );
}