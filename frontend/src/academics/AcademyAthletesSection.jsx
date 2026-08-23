
import React, { useEffect, useState } from "react";
import {
  BadgeCheck,
  ChevronRight,
  MapPin,
  Search,
  Star,
  Trophy,
  UserRound,
  X,
  Zap,
  RefreshCw,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { api } from "../services/api";

function AthleteCard({ athlete, onViewProfile }) {
  const image =
    athlete.avatar ||
    athlete.avatar_url ||
    athlete.image ||
    athlete.profileImage;

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-[#1F3828] via-[#1C3325] to-[#193024] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F2FF65]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)]">

      {/* CARD HEADER */}
      <div className="relative overflow-hidden border-b border-white/8 p-4 sm:p-5">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F2FF65]/7 blur-2xl transition-all duration-300 group-hover:bg-[#F2FF65]/12" />

        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-3.5">

            {/* PLAYER IMAGE */}
            <div className="grid h-[60px] w-[60px] shrink-0 place-items-center overflow-hidden rounded-full border-2 border-[#F2FF65]/20 bg-[#0B120D] text-[#F2FF65] shadow-lg">
              {image ? (
                <img
                  src={image}
                  alt={athlete.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={27} strokeWidth={1.4} />
              )}
            </div>

            {/* PLAYER NAME */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate font-['Poppins'] text-[5px] font-semibold tracking-[-0.02em] text-[#F7F5ED]">
                  {athlete.name}
                </h3>

                {(athlete.verified ?? true) && (
                  <BadgeCheck
                    size={14}
                    className="shrink-0 text-[#3B82F6]"
                    fill="currentColor"
                    strokeWidth={2.2}
                  />
                )}
              </div>

              <p className="mt-1 text-[11px] text-[#F7F5ED]/55">
                {athlete.sport || "Athlete"}
                {athlete.level ? ` · ${athlete.level}` : ""}
              </p>
            </div>
          </div>
        </div>

        {/* TAGS */}
        <div className="relative mt-3.5 flex flex-wrap gap-1.5">
          {athlete.level && (
            <span className="rounded-full border border-[#F2FF65]/20 bg-[#0B120D]/50 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#F2FF65]">
              {athlete.level}
            </span>
          )}

          {athlete.location && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-[#0B120D]/30 px-2.5 py-1 text-[9px] text-[#F7F5ED]/55">
              <MapPin size={10} />
              {athlete.location}
            </span>
          )}

          {athlete.age && (
            <span className="rounded-full border border-white/8 bg-[#0B120D]/30 px-2.5 py-1 text-[9px] font-mono text-emerald-400">
              Age: {athlete.age}
            </span>
          )}
        </div>
      </div>

      {/* CARD FOOTER */}
      <div className="flex items-center justify-between p-4 sm:p-5">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#F7F5ED]/35">
            Performance
          </p>

          <div className="mt-1 flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 text-[#F2FF65]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={11}
                  fill="currentColor"
                  strokeWidth={1}
                />
              ))}
            </div>

            <span className="text-[11px] font-semibold text-[#F7F5ED]">
              {athlete.rating ?? "4.8"}
            </span>
          </div>
        </div>

        <button
          onClick={() => onViewProfile(athlete)}
          className="inline-flex items-center gap-1 rounded-lg border border-[#F2FF65]/40 px-2.5 py-1.5 text-[10px] font-bold text-[#F2FF65] transition-all duration-200 hover:bg-[#F2FF65] hover:text-[#16251B] cursor-pointer"
        >
          View Profile
          <ChevronRight size={12} />
        </button>
      </div>
    </article>
  );
}

function AthleteProfileModal({ athlete, onClose }) {
  if (!athlete) return null;

  const image = athlete.avatar || athlete.avatar_url || athlete.image;

  const details = [
    ["Sport Discipline", athlete.sport],
    ["Competitive Level", athlete.level || athlete.playing_level],
    ["Location", athlete.location],
    ["Age / Category", athlete.age],
    ["Scouting Rating", athlete.rating || "4.8 / 5.0"],
    [
      "Verification Status",
      (athlete.verification_level || 1) >= 2
        ? "Federation Verified"
        : "Registered Athlete",
    ],
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
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#1F3828] shadow-[0_25px_80px_rgba(0,0,0,0.45)] text-[#F7F5ED]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-[#0F2F23] via-[#1C4A30] to-[#1F3828] p-5 sm:p-6">
          <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#F2FF65]/10 blur-3xl" />

          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-[#F2FF65]/30 bg-[#0B120D] text-[#F2FF65] shadow-lg">
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
                  <h2 className="font-['Poppins'] text-base font-semibold tracking-[-0.03em] text-[#F7F5ED] sm:text-lg">
                    {athlete.name}
                  </h2>

                  {(athlete.verified ?? true) && (
                    <BadgeCheck
                      size={17}
                      className="text-[#3B82F6]"
                      fill="currentColor"
                      strokeWidth={2.25}
                    />
                  )}
                </div>

                <p className="mt-1 text-[11px] text-[#F7F5ED]/55">
                  {athlete.sport || "Athlete"} •{" "}
                  {athlete.level ||
                    athlete.playing_level ||
                    "Active"}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#F7F5ED]/70 transition-all hover:border-[#F2FF65]/40 hover:bg-[#F2FF65]/10 hover:text-[#F2FF65] cursor-pointer"
              aria-label="Close athlete profile"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-4 p-5 sm:p-6">

          {/* BIO */}
          {athlete.bio && (
            <div className="space-y-1 rounded-xl border border-white/10 bg-[#14241A] p-4">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#F2FF65]">
                ATHLETE DOSSIER & BIO
              </span>

              <p className="text-xs leading-6 text-[#F7F5ED]/75">
                {athlete.bio}
              </p>
            </div>
          )}

          {/* PERFORMANCE METRICS */}
          {athlete.performance_metrics && (
            <div className="space-y-1 rounded-xl border border-white/10 bg-[#0B120D] p-4">
              <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase text-[#F2FF65]">
                <Zap size={12} />
                <span>KEY PERFORMANCE METRICS & BENCHMARKS</span>
              </div>

              <p className="font-mono text-xs text-[#F2FF65]">
                {athlete.performance_metrics}
              </p>
            </div>
          )}

          {/* DETAILS */}
          <div className="grid gap-3 sm:grid-cols-2">
            {details.map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-white/8 bg-gradient-to-br from-[#1C3325] to-[#1F3828] px-4 py-3.5"
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#F2FF65]/60">
                  {label}
                </p>

                <p className="mt-1.5 text-xs font-medium text-[#F7F5ED]">
                  {String(value)}
                </p>
              </div>
            ))}
          </div>

          {/* ACCOMPLISHMENTS */}
          {Array.isArray(athlete.achievements) &&
            athlete.achievements.length > 0 && (
              <div className="space-y-2 rounded-xl border border-white/10 bg-[#14241A] p-4">
                <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase text-[#F2FF65]">
                  <Trophy size={12} />
                  <span>MEDALS & TOURNAMENTS</span>
                </div>

                <div className="space-y-1.5">
                  {athlete.achievements.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border border-white/5 bg-[#0B120D] p-2.5 text-xs"
                    >
                      <span className="text-gray-200">
                        {item.title}
                      </span>

                      <span className="font-mono text-[9px] text-gray-400">
                        {item.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="rounded-xl bg-[#F2FF65] px-5 py-2.5 text-[10px] font-bold text-[#16251B] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(242,255,101,0.2)] cursor-pointer"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AcademyAthletesSection({
  athletes: propAthletes = [],
  setActiveTab,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [athletes, setAthletes] = useState(propAthletes);
  const [loading, setLoading] = useState(true);

  const fetchAthletes = async () => {
    setLoading(true);

    try {
      const res = await api.profiles.getAllAthletes({ search });

      if (res?.data?.athletes) {
        setAthletes(res.data.athletes);
      }
    } catch (err) {
      console.warn(
        "Could not fetch athletes from DB:",
        err.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAthletes();
  }, [search]);

  const selectedAthleteId = searchParams.get("athlete");

  const selectedAthlete =
    athletes.find(
      (athlete) =>
        String(athlete.id || athlete.user_id) ===
        String(selectedAthleteId)
    ) || null;

  const openProfile = (athlete) => {
    setActiveTab?.(
      "athletes",
      athlete.id || athlete.user_id
    );

    setSearchParams({
      athlete: athlete.id || athlete.user_id,
    });
  };

  const closeProfile = () => {
    setSearchParams({});
  };

  return (
    <section className="min-h-full w-full bg-[#14241A] font-['Inter'] text-[#F7F5ED]">

      {/* SEARCH BAR */}
      <div className="mb-7 flex items-center gap-3">
        <label className="relative block flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#F2FF65]/65"
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            type="search"
            placeholder="Search athletes by name, sport, level, or location..."
            className="w-full rounded-xl border border-white/8 bg-[#0B120D] py-3 pl-10 pr-11 text-xs text-[#F7F5ED] outline-none placeholder:text-[#F7F5ED]/30 transition-all focus:border-[#F2FF65]/40 focus:ring-2 focus:ring-[#F2FF65]/10"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F7F5ED]/40 transition-colors hover:text-[#F2FF65] cursor-pointer"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </label>

        {/* REFRESH */}
        <button
          onClick={fetchAthletes}
          className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl border border-white/8 bg-[#0B120D] text-[#F2FF65] transition-all hover:border-[#F2FF65]/40 hover:bg-[#101A12] cursor-pointer"
          title="Refresh Athlete Database"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
        </button>
      </div>

      {/* RESULTS HEADER */}
      <div className="mb-14 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
      
            <h1 className="flex items-center gap-2 font-['Poppins'] text-base font-semibold tracking-[-0.03em] text-[#ffffff] sm:text-lg">
              Athlete Discovery & Scouting
            </h1>
          </div>

          <p className="mt-1 pl-3 text-[10px] text-[#F7F5ED]/45">
            {athletes.length} athlete
            {athletes.length === 1 ? "" : "s"} registered in system
          </p>
        </div>
      </div>

      {/* ATHLETE GRID */}
      {loading && athletes.length === 0 ? (
        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-white/8 bg-[#1C3325]/70 p-8 text-center">
          <RefreshCw
            size={22}
            className="mx-auto mb-3 animate-spin text-[#F2FF65]"
          />

          <p className="text-xs font-semibold text-white">
            Loading verified athletes from database...
          </p>
        </div>
      ) : athletes.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {athletes.map((athlete) => (
            <AthleteCard
              key={athlete.id || athlete.user_id}
              athlete={athlete}
              onViewProfile={openProfile}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-white/8 bg-gradient-to-br from-[#1C3325] to-[#193024] px-6 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#F2FF65]/20 bg-[#F2FF65]/5">
            <UserRound
              size={26}
              className="text-[#F2FF65]"
            />
          </div>

          <h2 className="mt-5 font-['Poppins'] text-base font-semibold text-white">
            No athletes found
          </h2>

          <p className="mt-2 max-w-sm text-xs text-white/45">
            {search
              ? "No athlete records match your search criteria."
              : "No athletes registered in database yet."}
          </p>

          {search && (
            <button
              onClick={() => setSearch("")}
              className="mt-4 rounded-xl bg-[#F2FF65] px-4 py-2 text-[10px] font-bold text-[#16251B] transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              Clear Search
            </button>
          )}
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

