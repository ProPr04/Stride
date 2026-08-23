
import React, { useMemo, useState } from "react";
import {
  BadgeCheck,
  ChevronRight,
  Heart,
  MapPin,
  Search,
  Star,
  UserRound,
  X,
} from "lucide-react";

function AthleteCard({ athlete, onViewProfile }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#315038] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#F2FF65]/35 hover:shadow-[0_15px_40px_rgba(0,0,0,0.22)]">
      {/* Subtle decorative glow */}
      <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#F2FF65]/5 blur-3xl transition-all duration-300 group-hover:bg-[#F2FF65]/10" />

      <div className="relative flex items-start justify-between">
        <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-full border border-[#F2FF65]/20 bg-[#2C337F] text-[#F2FF65]">
          {athlete.avatar || athlete.image || athlete.profileImage ? (
            <img
              src={
                athlete.avatar ||
                athlete.image ||
                athlete.profileImage
              }
              alt={athlete.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound size={23} strokeWidth={1.5} />
          )}
        </div>

        {athlete.verified && (
          <div className="flex items-center gap-1 rounded-full border border-[#F2FF65]/20 bg-[#F2FF65]/5 px-2 py-1">
            <BadgeCheck
              size={14}
              className="text-[#F2FF65]"
              strokeWidth={2}
            />
            <span className="font-mono text-[9px] font-bold tracking-[0.08em] text-[#F2FF65]">
              VERIFIED
            </span>
          </div>
        )}
      </div>

      <div className="relative mt-5">
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#F2FF65]/50">
          ATHLETE PROFILE
        </p>

        <h2 className="mt-1 truncate font-['Poppins'] text-lg font-semibold tracking-[-0.035em] text-[#F7F5ED]">
          {athlete.name}
        </h2>

        <p className="mt-1 text-sm text-[#F7F5ED]/60">
          {athlete.sport}{" "}
          {athlete.position || athlete.primarySkill
            ? `• ${athlete.position || athlete.primarySkill}`
            : ""}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <span className="inline-flex min-w-0 items-center gap-1.5 truncate text-xs text-[#F7F5ED]/55">
            <MapPin size={12} className="shrink-0 text-[#F2FF65]" />
            {athlete.location ||
              athlete.city ||
              "Location unavailable"}
          </span>

          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#F2FF65]">
            <Star size={12} fill="currentColor" />
            {athlete.rating ?? "—"}
          </span>
        </div>

        {athlete.level && (
          <div className="mt-4">
            <span className="inline-flex rounded-full border border-[#F2FF65]/20 bg-[#F2FF65]/5 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-[#F2FF65]">
              {athlete.level}
            </span>
          </div>
        )}

        <button
          onClick={() => onViewProfile(athlete)}
          className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#F2FF65] transition-all hover:text-[#F7F5ED]"
        >
          View Profile
          <ChevronRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>
      </div>
    </article>
  );
}

function AthleteProfileModal({ athlete, onClose }) {
  if (!athlete) return null;

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
      value !== undefined && value !== null && value !== ""
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-[#07130D]/80 p-4 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${athlete.name} profile`}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-white/10 bg-gradient-to-br from-[#315038] via-[#223F31] to-[#2A3C2E] shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
        {/* Modal Header */}
        <div className="relative overflow-hidden border-b border-white/10 p-5 sm:p-6">
          <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#F2FF65]/10 blur-3xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-full border border-[#F2FF65]/20 bg-[#2C337F] text-[#F2FF65]">
                {athlete.avatar ||
                athlete.image ||
                athlete.profileImage ? (
                  <img
                    src={
                      athlete.avatar ||
                      athlete.image ||
                      athlete.profileImage
                    }
                    alt={athlete.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={24} strokeWidth={1.5} />
                )}
              </div>

              <div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#F2FF65]/55">
                  ATHLETE PROFILE
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <h2 className="font-['Poppins'] text-xl font-semibold tracking-[-0.04em] text-[#F2FF65]">
                    {athlete.name}
                  </h2>

                  {athlete.verified && (
                    <BadgeCheck
                      size={18}
                      className="text-[#F2FF65]"
                      strokeWidth={2}
                    />
                  )}
                </div>

                <p className="mt-1 text-sm text-[#F7F5ED]/60">
                  {athlete.sport}{" "}
                  {athlete.position || athlete.primarySkill
                    ? `• ${
                        athlete.position || athlete.primarySkill
                      }`
                    : ""}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#F2FF65] transition-all hover:bg-[#F2FF65] hover:text-[#07130D]"
              aria-label="Close athlete profile"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {athlete.bio && (
            <div className="mb-6">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#F2FF65]/55">
                ATHLETE SUMMARY
              </p>

              <p className="mt-2 text-sm leading-6 text-[#F7F5ED]/70">
                {athlete.bio}
              </p>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            {details.map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-white/10 bg-[#2A3C2E] p-4"
              >
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#F2FF65]/55">
                  {label}
                </p>

                <p className="mt-1 text-sm text-[#F7F5ED]">
                  {String(value)}
                </p>
              </div>
            ))}
          </div>

          {athlete.verified && (
            <div className="mt-5 flex items-center gap-3 rounded-lg border border-[#F2FF65]/20 bg-[#F2FF65]/5 p-4">
              <BadgeCheck
                size={20}
                className="shrink-0 text-[#F2FF65]"
              />

              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#F2FF65]">
                  VERIFIED ATHLETE
                </p>
                <p className="mt-1 text-xs text-[#F7F5ED]/55">
                  This athlete has completed the available verification
                  requirements.
                </p>
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#F2FF65] px-5 py-2.5 text-sm font-bold text-[#07130D] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(242,255,101,0.18)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AcademyTalentPoolSection({
  athletes = [],
}) {
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("");
  const [level, setLevel] = useState("");
  const [selectedAthlete, setSelectedAthlete] =
    useState(null);

  const sports = [
    ...new Set(
      athletes.map((athlete) => athlete.sport).filter(Boolean)
    ),
  ];

  const levels = [
    ...new Set(
      athletes
        .map(
          (athlete) =>
            athlete.level || athlete.experienceLevel
        )
        .filter(Boolean)
    ),
  ];

  const filteredAthletes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return athletes.filter((athlete) => {
      const athleteLevel =
        athlete.level || athlete.experienceLevel || "";

      const searchable = [
        athlete.name,
        athlete.sport,
        athlete.position,
        athlete.primarySkill,
        athlete.location,
        athlete.city,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        (!query || searchable.includes(query)) &&
        (!sport || athlete.sport === sport) &&
        (!level || athleteLevel === level)
      );
    });
  }, [athletes, search, sport, level]);

  return (
    <section className="min-h-full w-full bg-[#2A3C2E] font-['Inter'] text-[#F7F5ED]">
      {/* PAGE HEADER — MATCHES VERIFICATION UI */}
      <header className="mb-8 border-b border-white/10 pb-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F2FF65] shadow-[0_0_8px_#F2FF65]" />

          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#F2FF65]">
            06.5 // ACADEMY TALENT DIRECTORY
          </p>
        </div>

        <h1 className="font-['Poppins'] text-2xl font-bold tracking-[-0.05em] text-[#F2FF65] sm:text-3xl">
          Talent Pool
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-[#F7F5ED]/55">
          Athletes your academy has saved for future opportunities.
        </p>
      </header>

      {/* SEARCH / FILTER PANEL */}
      <div className="rounded-xl border border-white/10 bg-[#315038] p-5 shadow-[0_12px_35px_rgba(0,0,0,0.12)] sm:p-6">
        <div className="mb-5">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#F2FF65]/60">
            TALENT SEARCH
          </span>

          <h3 className="mt-1 font-['Poppins'] text-lg font-semibold tracking-[-0.035em] text-[#F7F5ED]">
            Find athletes in your shortlist
          </h3>
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
          <label className="relative">
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#F2FF65]/65"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              type="search"
              placeholder="Search athlete, sport, position..."
              className="w-full rounded-lg border border-white/10 bg-[#2A3C2E] py-3 pl-11 pr-4 text-sm text-[#F7F5ED] outline-none placeholder:text-[#F7F5ED]/35 focus:border-[#F2FF65]/50"
            />
          </label>

          <select
            value={sport}
            onChange={(event) =>
              setSport(event.target.value)
            }
            className="rounded-lg border border-white/10 bg-[#2A3C2E] px-3 py-3 text-sm text-[#F7F5ED] outline-none focus:border-[#F2FF65]/50"
          >
            <option value="">All Sports</option>

            {sports.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={level}
            onChange={(event) =>
              setLevel(event.target.value)
            }
            className="rounded-lg border border-white/10 bg-[#2A3C2E] px-3 py-3 text-sm text-[#F7F5ED] outline-none focus:border-[#F2FF65]/50"
          >
            <option value="">Any Level</option>

            {levels.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#F7F5ED]/40">
            DIRECTORY STATUS
          </span>

          <span className="font-mono text-[10px] font-bold text-[#F2FF65]">
            {filteredAthletes.length} ATHLETE
            {filteredAthletes.length === 1 ? "" : "S"}
          </span>
        </div>
      </div>

      {/* ATHLETE DIRECTORY */}
      <div className="mt-8">
        <div className="mb-5 flex items-end justify-between border-b border-white/10 pb-4">
          <div>
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#F2FF65]/55">
              PROFILE DIRECTORY
            </span>

            <h3 className="mt-1 font-['Poppins'] text-xl font-semibold tracking-[-0.04em] text-[#F7F5ED]">
              Saved Athletes
            </h3>
          </div>

          <span className="font-mono text-[9px] text-[#F7F5ED]/40">
            {filteredAthletes.length} / {athletes.length}
          </span>
        </div>

        {athletes.length === 0 ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-white/10 bg-[#315038] px-6 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-xl border border-[#F2FF65]/20 bg-[#F2FF65]/5">
              <Heart
                size={24}
                className="text-[#F2FF65]"
                strokeWidth={1.5}
              />
            </div>

            <h2 className="mt-5 font-['Poppins'] text-lg font-semibold text-[#F7F5ED]">
              Your talent pool is empty
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#F7F5ED]/50">
              Save athletes from Discover Athletes to build a
              shortlist for upcoming opportunities.
            </p>
          </div>
        ) : filteredAthletes.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredAthletes.map((athlete) => (
              <AthleteCard
                key={athlete.id}
                athlete={athlete}
                onViewProfile={setSelectedAthlete}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-white/10 bg-[#315038] px-6 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#F2FF65]/20 bg-[#F2FF65]/5">
              <Search
                size={22}
                className="text-[#F2FF65]"
                strokeWidth={1.5}
              />
            </div>

            <h2 className="mt-5 font-['Poppins'] text-lg font-semibold text-[#F7F5ED]">
              No athletes found
            </h2>

            <p className="mt-2 text-sm text-[#F7F5ED]/50">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>

      <AthleteProfileModal
        athlete={selectedAthlete}
        onClose={() => setSelectedAthlete(null)}
      />
    </section>
  );
}

