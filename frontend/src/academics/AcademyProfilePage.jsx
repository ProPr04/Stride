import React from "react";
import {
  Award,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Dumbbell,
  Edit3,
  Lock,
  MapPin,
  Medal,
  ShieldCheck,
  Star,
  Trophy,
  Users,
  UserRound,
} from "lucide-react";

const fallbackVerification = [
  { level: "LEVEL 01", title: "ORGANIZATION IDENTITY", status: "VERIFIED" },
  { level: "LEVEL 02", title: "COACHING STAFF", status: "VERIFIED" },
  { level: "LEVEL 03", title: "TRAINING FACILITY", status: "VERIFIED" },
  { level: "LEVEL 04", title: "COMPETITION AFFILIATION", status: "VERIFIED" },
  { level: "LEVEL 05", title: "FEDERATION / OFFICIAL", status: "PENDING" },
];

const fallbackCoaches = [
  {
    name: "Marcus Vance",
    role: "Head Coach",
    experience: "12 yrs",
    verified: true,
  },
  {
    name: "Neha Sharma",
    role: "Sprint Coach",
    experience: "8 yrs",
    verified: true,
  },
  {
    name: "Rahul Shah",
    role: "Strength Coach",
    experience: "10 yrs",
    verified: true,
  },
];

const fallbackPrograms = [
  {
    title: "Elite Sprint Development",
    discipline: "Athletics",
    description:
      "High-performance sprint coaching and technical progression.",
  },
  {
    title: "Youth Development",
    discipline: "Multi-sport",
    description:
      "Foundational training for emerging young athletes.",
  },
  {
    title: "Performance Program",
    discipline: "Strength & Conditioning",
    description:
      "Structured physical preparation for competition.",
  },
  {
    title: "Competition Preparation",
    discipline: "Athletics",
    description:
      "Race strategy, tapering and event-readiness support.",
  },
];

const fallbackOpportunities = [
  {
    id: "OPP-001",
    title: "Assistant Track Coach",
    sport: "Athletics",
    location: "Mumbai, India",
    positions: "2 positions",
    status: "OPEN",
  },
  {
    id: "OPP-002",
    title: "Strength & Conditioning Intern",
    sport: "Performance",
    location: "Mumbai, India",
    positions: "1 position",
    status: "OPEN",
  },
];

function StatusBadge({ children, verified = true }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.08em] ${
        verified
          ? "border-lime/30 bg-lime/10 text-lime"
          : "border-[#F7F5ED]/20 bg-white/5 text-[#F7F5ED]/60"
      }`}
    >
      {verified ? (
        <CheckCircle2 size={12} />
      ) : (
        <Lock size={12} />
      )}
      {children}
    </span>
  );
}

function SectionHeader({ title, eyebrow, icon: Icon }) {
  return (
    <div className="panel-header flex items-center justify-between">
      <div>
        {eyebrow && (
          <p className="mb-1 font-mono text-[9px] font-bold tracking-[0.18em] text-lime/55">
            {eyebrow}
          </p>
        )}

        <h3 className="panel-title-display">{title}</h3>
      </div>

      {Icon && (
        <Icon
          size={19}
          className="text-lime"
          strokeWidth={1.5}
        />
      )}
    </div>
  );
}

function GlassPanel({ children, className = "" }) {
  return (
    <div
      className={`court-panel-container overflow-hidden backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

export default function AcademyProfilePage({
  academy = {},
  onEdit,
  onViewOpportunity,
  onViewVerificationRecord,
}) {
  const name =
    academy.name ||
    academy.academyName ||
    "Metro Track Academy";

  const tagline =
    academy.tagline ||
    academy.description ||
    "Building confident athletes through verified coaching, disciplined training and competition-ready performance.";

  const location =
    academy.location ||
    academy.city ||
    "Mumbai, India";

  const academyId =
    academy.academyId ||
    academy.id ||
    "STR-ACD-00842";

  const avatar =
    academy.logo ||
    academy.avatar ||
    academy.image;

  const verificationLevel =
    academy.verificationLevel || "LEVEL 04";

  const verification =
    academy.verificationMatrix ||
    academy.verification ||
    fallbackVerification;

  const coaches =
    academy.coaches?.length
      ? academy.coaches
      : fallbackCoaches;

  const programs =
    academy.programs?.length
      ? academy.programs
      : fallbackPrograms;

  const opportunities =
    academy.opportunities?.length
      ? academy.opportunities
      : fallbackOpportunities;

  const stats = [
    {
      label: "ACTIVE ATHLETES",
      value: academy.activeAthletes ?? 84,
      icon: Users,
    },
    {
      label: "VERIFIED COACHES",
      value:
        academy.verifiedCoaches ??
        coaches.filter((coach) => coach.verified).length,
      icon: ShieldCheck,
    },
    {
      label: "NATIONAL QUALIFIERS",
      value: academy.nationalQualifiers ?? 11,
      icon: Trophy,
    },
    {
      label: "ATHLETE PERSONAL BESTS",
      value: academy.personalBests ?? 27,
      icon: Star,
    },
  ];

  const overview = [
    ["Founded", academy.founded || "2012"],
    ["Location", location],
    [
      "Primary Sports",
      academy.primarySports ||
        academy.sports?.join(", ") ||
        "Athletics, Performance",
    ],
    ["Active Athletes", academy.activeAthletes ?? 84],
    ["Training Programs", academy.trainingPrograms ?? programs.length],
    [
      "Competitive Level",
      academy.competitiveLevel || "National",
    ],
  ];

  const outcomes = [
    {
      label: "PERSONAL BESTS",
      value: academy.personalBests ?? 27,
      icon: Star,
    },
    {
      label: "COMPETITION MEDALS",
      value: academy.competitionMedals ?? 14,
      icon: Medal,
    },
    {
      label: "NATIONAL QUALIFIERS",
      value: academy.nationalQualifiers ?? 11,
      icon: Trophy,
    },
    {
      label: "SCHOLARSHIPS / PLACEMENTS",
      value: academy.scholarships ?? 6,
      icon: Award,
    },
  ];

  const recentAchievements =
    academy.recentAchievements?.length
      ? academy.recentAchievements
      : [
          {
            title:
              "Four athletes reached national qualifying standards",
            date: "THIS SEASON",
            icon: Trophy,
          },
          {
            title:
              "Sprint squad achieved seven verified personal bests",
            date: "LAST 30 DAYS",
            icon: Award,
          },
          {
            title:
              "Academy athletes secured three competition medals",
            date: "RECENT EVENT",
            icon: Medal,
          },
        ];

  return (
    <div className="profile-pane matchpoint-fade-in">
      {/* =====================================================
          ACADEMY HERO
      ====================================================== */}

      <div className="court-panel-container matchpoint-profile-hero overflow-hidden">
        {/* Banner */}

        <div className="matchpoint-profile-banner-bg">
          <span className="banner-court-tag font-mono">
            ACADEMY PROFILE // STRIDE VERIFIED
          </span>
        </div>

        {/* Profile Header */}

        <div className="matchpoint-profile-header">
          <div className="oval-avatar-frame">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="oval-avatar-img"
              />
            ) : (
              <div className="grid h-full w-full place-items-center bg-[#2C337F] text-lime">
                <Building2
                  size={42}
                  strokeWidth={1.25}
                />
              </div>
            )}
          </div>

          <div className="profile-identity">
            <div className="profile-badge-row">
              <span className="matchpoint-badge-lime">
                VERIFIED ACADEMY
              </span>

              <span className="matchpoint-badge-verified">
                <CheckCircle2 size={13} />
                {verificationLevel}
              </span>
            </div>

            <h1 className="profile-hero-name">
              {name}
            </h1>

            <p className="profile-hero-discipline">
              {academy.primarySports ||
                academy.sports?.join(" · ") ||
                "Athletics · Performance"}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <span className="profile-location-tag">
                <MapPin
                  size={14}
                  className="text-lime"
                />
                {location}
              </span>

              <span className="profile-location-tag">
                <Building2
                  size={14}
                  className="text-lime"
                />
                ID: {academyId}
              </span>
            </div>
          </div>

          <button
            className="matchpoint-pill-btn primary ms-auto"
            onClick={() => onEdit?.(academy)}
          >
            <Edit3 size={15} />
            EDIT PROFILE
          </button>
        </div>

        {/* Stats */}

        <div className="matchpoint-stats-banner">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              className="stat-box"
              key={label}
            >
              <Icon
                size={16}
                className="mb-2 text-lime"
                strokeWidth={1.5}
              />

              <span className="stat-box-label font-mono">
                {label}
              </span>

              <span className="stat-box-val text-lime">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          TAGLINE / BIO
      ====================================================== */}

      <div className="matchpoint-main-cols mt-24">
        <GlassPanel>
          <SectionHeader
            eyebrow="ACADEMY OVERVIEW"
            title="ABOUT THE ACADEMY"
            icon={Building2}
          />

          <p className="bio-text">
            {tagline}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {overview.map(([label, value]) => (
              <div
                key={label}
                className="border-t border-lime/15 pt-3"
              >
                <p className="font-mono text-[9px] font-bold tracking-[0.12em] text-lime/55">
                  {label.toUpperCase()}
                </p>

                <p className="mt-1 text-sm text-[#F7F5ED]/80">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Verification */}

        <GlassPanel>
          <SectionHeader
            eyebrow="TRUST FRAMEWORK"
            title="VERIFICATION STATUS"
            icon={ShieldCheck}
          />

          <div className="space-y-3">
            {verification.map((item, index) => {
              const verified =
                String(item.status || "")
                  .toUpperCase() === "VERIFIED";

              return (
                <div
                  key={`${item.level}-${item.title}`}
                  className={`flex items-center justify-between gap-3 border-b border-lime/10 pb-3 ${
                    !verified ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center border border-lime/20 bg-white/5 font-mono text-[9px] font-bold text-lime">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <p className="font-mono text-[9px] font-bold tracking-[0.1em] text-lime/55">
                        {item.level}
                      </p>

                      <p className="mt-1 text-xs font-semibold text-[#F7F5ED]">
                        {item.title}
                      </p>
                    </div>
                  </div>

                  <StatusBadge verified={verified}>
                    {item.status || "PENDING"}
                  </StatusBadge>
                </div>
              );
            })}
          </div>

          <button
            onClick={() =>
              onViewVerificationRecord?.(academy)
            }
            className="mt-5 inline-flex items-center gap-1 border-b border-lime pb-1 font-mono text-[10px] font-bold tracking-[0.08em] text-lime"
          >
            VIEW FULL RECORD
            <ChevronRight size={14} />
          </button>
        </GlassPanel>
      </div>

      {/* =====================================================
          ACADEMY IMPACT
      ====================================================== */}

      <GlassPanel className="mt-5">
        <SectionHeader
          eyebrow="VERIFIED PERFORMANCE"
          title="ACADEMY IMPACT"
          icon={Trophy}
        />

        <div className="grid grid-cols-2 gap-px bg-lime/15 sm:grid-cols-4">
          {outcomes.map(
            ({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="bg-[#2C337F]/60 p-5"
              >
                <Icon
                  size={19}
                  className="text-lime"
                  strokeWidth={1.5}
                />

                <p className="mt-7 font-mono text-3xl font-bold tracking-[-0.06em] text-lime">
                  {value}
                </p>

                <p className="mt-2 font-mono text-[9px] font-bold leading-4 tracking-[0.1em] text-[#F7F5ED]/55">
                  {label}
                </p>
              </div>
            )
          )}
        </div>
      </GlassPanel>

      {/* =====================================================
          COACHING STAFF
      ====================================================== */}

      <GlassPanel className="mt-5">
        <SectionHeader
          eyebrow="PEOPLE BEHIND PERFORMANCE"
          title="VERIFIED COACHING STAFF"
          icon={Users}
        />

        <div className="grid gap-4 md:grid-cols-3">
          {coaches.map((coach) => (
            <article
              key={coach.id || coach.name}
              className="border border-lime/15 bg-[#315038]/50 p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-14 w-14 place-items-center overflow-hidden bg-[#2C337F] text-lime">
                  {coach.avatar || coach.image ? (
                    <img
                      src={coach.avatar || coach.image}
                      alt={coach.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound
                      size={23}
                      strokeWidth={1.5}
                    />
                  )}
                </div>

                {coach.verified && (
                  <BadgeCheck
                    size={20}
                    className="text-[#3B82F6]"
                    fill="currentColor"
                    strokeWidth={2.2}
                  />
                )}
              </div>

              <h3 className="mt-5 font-mono text-sm font-bold tracking-[0.05em] text-lime">
                {coach.name}
              </h3>

              <p className="mt-1 text-sm text-[#F7F5ED]/70">
                {coach.role}
              </p>

              <div className="mt-4 border-t border-lime/15 pt-3">
                <p className="font-mono text-[9px] font-bold tracking-[0.1em] text-[#F7F5ED]/50">
                  {coach.experience ||
                    coach.experienceYears ||
                    "—"}{" "}
                  EXPERIENCE
                </p>
              </div>
            </article>
          ))}
        </div>
      </GlassPanel>

      {/* =====================================================
          TRAINING PROGRAMS
      ====================================================== */}

      <GlassPanel className="mt-5">
        <SectionHeader
          eyebrow="DEVELOPMENT PATHWAYS"
          title="TRAINING PROGRAMS"
          icon={Dumbbell}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {programs.map((program) => (
            <article
              key={program.id || program.title}
              className="border border-lime/15 bg-[#315038]/50 p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <Dumbbell
                size={20}
                className="text-lime"
                strokeWidth={1.5}
              />

              <p className="mt-6 font-mono text-[9px] font-bold tracking-[0.13em] text-lime/55">
                {program.discipline ||
                  program.sport ||
                  "PROGRAM"}
              </p>

              <h3 className="mt-2 font-mono text-sm font-bold leading-5 tracking-[0.04em] text-lime">
                {program.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#F7F5ED]/65">
                {program.description}
              </p>
            </article>
          ))}
        </div>
      </GlassPanel>

      {/* =====================================================
          ACHIEVEMENTS + OUTCOMES
      ====================================================== */}

      <div className="matchpoint-main-cols mt-5">
        <GlassPanel>
          <SectionHeader
            eyebrow="LATEST PERFORMANCE"
            title="RECENT ACHIEVEMENTS"
            icon={Trophy}
          />

          <div className="achievements-list">
            {recentAchievements.map(
              (achievement, index) => {
                const Icon =
                  achievement.icon ||
                  (index % 2 ? Award : Trophy);

                return (
                  <div
                    key={
                      achievement.id ||
                      achievement.title
                    }
                    className="achievement-item"
                  >
                    <Icon
                      size={20}
                      className="text-lime"
                      strokeWidth={1.5}
                    />

                    <div>
                      <h4 className="item-title">
                        {achievement.title}
                      </h4>

                      <p className="item-sub-org">
                        {achievement.date}
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </GlassPanel>

        <GlassPanel>
          <SectionHeader
            eyebrow="ATHLETE DEVELOPMENT"
            title="KEY OUTCOMES"
            icon={Award}
          />

          <div className="grid grid-cols-2 gap-3">
            {outcomes.map(
              ({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="border border-lime/10 bg-white/5 p-4"
                >
                  <Icon
                    size={17}
                    className="text-lime"
                    strokeWidth={1.5}
                  />

                  <p className="mt-5 font-mono text-2xl font-bold text-lime">
                    {value}
                  </p>

                  <p className="mt-1 font-mono text-[8px] font-bold leading-4 tracking-[0.08em] text-[#F7F5ED]/50">
                    {label}
                  </p>
                </div>
              )
            )}
          </div>
        </GlassPanel>
      </div>

      {/* =====================================================
          OPEN OPPORTUNITIES
      ====================================================== */}

      <GlassPanel className="mt-5">
        <SectionHeader
          eyebrow="CURRENTLY RECRUITING"
          title="OPEN ACADEMY OPPORTUNITIES"
          icon={ClipboardCheck}
        />

        <div className="grid gap-4 md:grid-cols-2">
          {opportunities.map((opportunity) => (
            <article
              key={
                opportunity.id ||
                opportunity.title
              }
              className="border border-lime/15 bg-[#315038]/50 p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <StatusBadge>
                {opportunity.status || "OPEN"}
              </StatusBadge>

              <h3 className="mt-4 font-mono text-sm font-bold tracking-[0.05em] text-lime">
                {opportunity.title}
              </h3>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#F7F5ED]/60">
                <span>
                  {opportunity.sport || "Sport"}
                </span>

                <span className="inline-flex items-center gap-1">
                  <MapPin
                    size={13}
                    className="text-lime"
                  />
                  {opportunity.location ||
                    location}
                </span>

                <span>
                  {opportunity.positions ||
                    "Positions available"}
                </span>
              </div>

              <button
                onClick={() =>
                  onViewOpportunity?.(opportunity)
                }
                className="mt-5 inline-flex items-center gap-1 border-b border-lime pb-1 font-mono text-[10px] font-bold tracking-[0.08em] text-lime"
              >
                VIEW OPPORTUNITY
                <ChevronRight size={14} />
              </button>
            </article>
          ))}
        </div>
      </GlassPanel>

      {/* =====================================================
          STRIDE CREDENTIAL
      ====================================================== */}

      <div className="court-panel-container mt-5 overflow-hidden border-lime/25 bg-[#2C337F]">
        <div className="p-5 sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={19}
                  className="text-lime"
                />

                <p className="font-mono text-[9px] font-bold tracking-[0.18em] text-lime/60">
                  STRIDE VERIFIED RECORD
                </p>
              </div>

              <h2 className="mt-3 font-mono text-xl font-bold tracking-[-0.04em] text-lime sm:text-2xl">
                {name.toUpperCase()} CREDENTIAL
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[9px] font-bold tracking-[0.1em] text-lime/55">
                    ACADEMY ID
                  </p>

                  <p className="mt-1 text-sm text-[#F7F5ED]/75">
                    {academyId}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[9px] font-bold tracking-[0.1em] text-lime/55">
                    VERIFICATION LEVEL
                  </p>

                  <p className="mt-1 text-sm text-[#F7F5ED]/75">
                    {verificationLevel}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[9px] font-bold tracking-[0.1em] text-lime/55">
                    LAST AUDIT
                  </p>

                  <p className="mt-1 text-sm text-[#F7F5ED]/75">
                    {academy.lastAuditDate ||
                      "14 AUG 2026"}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[9px] font-bold tracking-[0.1em] text-lime/55">
                    STATUS
                  </p>

                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-lime">
                    <CheckCircle2 size={14} />
                    VERIFIED ORGANIZATION
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {[
                  "VERIFIED ORGANIZATION",
                  "VERIFIED COACHES",
                  "VERIFIED FACILITY",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-[0.08em] text-lime"
                  >
                    <CheckCircle2 size={12} />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() =>
                onViewVerificationRecord?.(academy)
              }
              className="matchpoint-pill-btn"
            >
              VIEW VERIFICATION RECORD
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}