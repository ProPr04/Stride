
import React, { useMemo, useState } from "react";
import {
  Activity,
  Award,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

const statuses = [
  "All",
  "Active",
  "Upcoming",
  "Completed",
  "Cancelled",
];

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const config = {
    Active: {
      icon: Activity,
      className:
        "border-[#F2FF65]/40 bg-[#F2FF65]/10 text-[#F2FF65]",
    },

    Upcoming: {
      icon: Clock3,
      className:
        "border-[#3B82F6]/50 bg-[#2C337F]/60 text-[#93C5FD]",
    },

    Completed: {
      icon: Check,
      className:
        "border-[#4ADE80]/30 bg-[#4ADE80]/10 text-[#4ADE80]",
    },

    Cancelled: {
      icon: X,
      className:
        "border-[#FF6B4A]/35 bg-[#95402F]/25 text-[#FF9A7A]",
    },
  };

  const current = config[status] || config.Upcoming;
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-[0.08em] ${current.className}`}
    >
      <Icon size={11} strokeWidth={2.5} />
      {status}
    </span>
  );
}

/* =========================================================
   ENGAGEMENT CARD
   Same visual language as Athlete Applications
========================================================= */

function EngagementCard({ engagement, onClick, index }) {
  const cardBackgrounds = [
    "bg-[#95402f] border-[#b24f3c]/40",
    "bg-[#2C337F] border-[#3a44a6]/40",
    "bg-[#315038] border-[#2A3C2E]",
  ];

  const cardStyle =
    cardBackgrounds[index % cardBackgrounds.length];

  return (
    <button
      onClick={() => onClick(engagement)}
      className={`group flex min-h-[300px] w-full flex-col rounded-2xl border p-5 text-left text-[#F7F8FA] font-['Inter',sans-serif] shadow-xl transition-all duration-300 hover:-translate-y-1 ${cardStyle}`}
    >
      {/* HEADER */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#F2FF65]/55">
              {engagement.id} // ENGAGEMENT
            </p>

            <h3 className="font-['Poppins'] text-lg font-bold tracking-wide text-white uppercase">
              {engagement.athleteName}
            </h3>

            <p className="mt-1 text-xs font-semibold text-gray-300">
              {engagement.opportunityName}
            </p>
          </div>

          <StatusBadge status={engagement.status} />
        </div>

        {/* LOCATION */}
        <div className="flex items-center gap-1.5 text-xs text-[#F2FF65]">
          <MapPin size={14} />
          <span>{engagement.location}</span>
        </div>

        {/* SPORT */}
        <div className="font-mono text-sm font-bold text-[#F2FF65]">
          {engagement.sport}
        </div>

        {/* DURATION */}
        <div className="flex items-center gap-1.5 text-xs text-sky-400 font-mono font-medium">
          <Clock3 size={13} />
          <span>
            {engagement.startDate} – {engagement.endDate}
          </span>
        </div>

        {/* PROGRESS */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-gray-300">
              Engagement Progress
            </span>

            <span className="font-mono text-[10px] font-bold text-[#F2FF65]">
              {engagement.progress}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-black/20">
            <div
              className={`h-full rounded-full transition-all ${
                engagement.status === "Completed"
                  ? "bg-[#4ADE80]"
                  : engagement.status === "Cancelled"
                  ? "bg-[#FF6B4A]"
                  : "bg-[#F2FF65]"
              }`}
              style={{
                width: `${engagement.progress}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-auto flex items-center justify-between border-t border-white/15 pt-4">
        <div className="flex items-center gap-1.5 text-[11px] text-gray-300 font-mono">
          <CalendarDays
            size={13}
            className="text-gray-400"
          />

          <span>
            {engagement.startDate} — {engagement.endDate}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[#F2FF65] font-bold text-[11px]">
          <span>VIEW</span>

          <ChevronRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </div>
      </div>
    </button>
  );
}

/* =========================================================
   MODAL
   Kept essentially the same as your original modal
========================================================= */

function EngagementModal({ engagement, onClose }) {
  if (!engagement) return null;

  const isCompleted =
    engagement.status === "Completed";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-[#07130D]/80 p-4 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${engagement.athleteName} engagement`}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#F2FF65]/25 bg-[#315038] shadow-2xl">

        {/* HEADER */}

        <div className="relative overflow-hidden border-b border-[#F2FF65]/15 p-5 sm:p-6">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#F2FF65]/5 blur-3xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#F2FF65]/55">
                ENGAGEMENT RECORD // {engagement.id}
              </p>

              <div className="mt-3">
                <StatusBadge
                  status={engagement.status}
                />
              </div>

              <h2 className="mt-4 font-['Poppins'] text-2xl font-semibold tracking-[-0.045em] text-[#F2FF65]">
                {engagement.opportunityName}
              </h2>

              <p className="mt-1 flex items-center gap-2 text-sm text-[#F7F5ED]/65">
                <UserRound size={14} />
                {engagement.athleteName}
              </p>
            </div>

            <button
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[#F2FF65]/20 text-[#F2FF65] transition-colors hover:bg-[#2A3C2E]"
              aria-label="Close engagement details"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6">

          {/* VERIFICATION */}

          <div className="flex items-center justify-between rounded-lg border border-[#4ADE80]/20 bg-[#4ADE80]/5 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#4ADE80]/10">
                <ShieldCheck
                  size={18}
                  className="text-[#4ADE80]"
                  strokeWidth={1.7}
                />
              </div>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#4ADE80]">
                  Engagement Verification
                </p>

                <p className="mt-1 text-xs text-[#F7F5ED]/65">
                  {engagement.verification}
                </p>
              </div>
            </div>

            <Check
              size={18}
              className="text-[#4ADE80]"
            />
          </div>

          {/* DETAILS */}

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <DetailBox
              label="Athlete"
              value={engagement.athleteName}
              icon={UserRound}
            />

            <DetailBox
              label="Sport"
              value={engagement.sport}
              icon={Award}
            />

            <DetailBox
              label="Location"
              value={engagement.location}
              icon={MapPin}
            />

            <DetailBox
              label="Start Date"
              value={engagement.startDate}
              icon={CalendarDays}
            />

            <DetailBox
              label="End Date"
              value={engagement.endDate}
              icon={CalendarDays}
            />

            <DetailBox
              label="Current Status"
              value={engagement.status}
              icon={Activity}
            />
          </div>

          {/* PROGRESS */}

          <div className="mt-5 rounded-lg border border-[#F2FF65]/12 bg-[#2A3C2E] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#F2FF65]/55">
                  Engagement Progress
                </p>

                <p className="mt-1 text-sm text-[#F7F5ED]">
                  {engagement.progress}% complete
                </p>
              </div>

              <span className="font-mono text-lg text-[#F2FF65]">
                {engagement.progress}%
              </span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#315038]">
              <div
                className={`h-full rounded-full ${
                  isCompleted
                    ? "bg-[#4ADE80]"
                    : "bg-[#F2FF65]"
                }`}
                style={{
                  width: `${engagement.progress}%`,
                }}
              />
            </div>
          </div>

          {/* DESCRIPTION */}

          <div className="mt-5 rounded-lg border border-[#F2FF65]/12 bg-[#2A3C2E] p-5">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#F2FF65]/55">
              Engagement Brief
            </p>

            <p className="mt-2 text-sm leading-6 text-[#F7F5ED]/75">
              {engagement.details}
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-7 w-full rounded-md bg-[#F2FF65] px-4 py-3 text-sm font-bold text-[#07130D] transition-transform hover:-translate-y-0.5"
          >
            CLOSE RECORD
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DETAIL BOX
========================================================= */

function DetailBox({ label, value, icon: Icon }) {
  return (
    <div className="rounded-lg border border-[#F2FF65]/12 bg-[#2A3C2E] p-4">
      <div className="flex items-center gap-2">
        <Icon
          size={13}
          className="text-[#F2FF65]"
          strokeWidth={1.5}
        />

        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.13em] text-[#F2FF65]/55">
          {label}
        </p>
      </div>

      <p className="mt-2 text-sm text-[#F7F5ED]">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AcademyEngagementsSection({ agreements = [], setActiveTab }) {
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedEngagement, setSelectedEngagement] =
    useState(null);

  /* MAP REAL DATA */
  const realEngagements = useMemo(() => {
    return agreements
      .filter((a) => ["accepted", "completed", "rejected"].includes(a.status))
      .map((a) => ({
        id: `ENG-${a.id}`,
        athleteName: a.athlete_name || a.athlete_email || "Athlete",
        opportunityName: a.opportunity_title || "Opportunity",
        sport: a.opportunity_sport || a.athlete_sport || "-",
        location: a.opportunity_location || "Remote",
        startDate: new Date(a.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        endDate: a.opportunity_timeline || "-",
        status:
          a.status === "accepted"
            ? "Active"
            : a.status === "completed"
            ? "Completed"
            : "Cancelled",
        details: a.opportunity_description || "No description provided.",
        progress:
          a.status === "completed"
            ? 100
            : a.status === "accepted"
            ? 50
            : 0,
        verification: "Verified",
      }));
  }, [agreements]);

  /* SEARCH + STATUS FILTER */

  const visibleEngagements = useMemo(() => {
    const search = searchTerm
      .trim()
      .toLowerCase();

    return realEngagements.filter((engagement) => {
      const matchesStatus =
        statusFilter === "All" ||
        engagement.status === statusFilter;

      const matchesSearch =
        !search ||
        engagement.athleteName
          .toLowerCase()
          .includes(search) ||
        engagement.opportunityName
          .toLowerCase()
          .includes(search) ||
        engagement.sport
          .toLowerCase()
          .includes(search) ||
        engagement.location
          .toLowerCase()
          .includes(search);

      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, searchTerm]);

  return (
    <section className="min-h-full w-full bg-[#2A3C2E] font-['Inter'] text-[#F7F5ED]">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="mb-7 flex items-end justify-between border-b border-white/10 pb-5">
        <div>
          <p className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#F2FF65]/60">
            Academy Management
          </p>

          <h1 className="font-['Poppins'] text-2xl font-semibold tracking-[-0.045em] text-[#F7F5ED]">
            Engagements
          </h1>

          <p className="mt-1.5 text-xs text-[#F7F5ED]/50">
            Track active, upcoming and completed athlete engagements.
          </p>
        </div>

        <span className="hidden rounded-xl border border-[#F2FF65]/20 bg-[#F2FF65]/10 px-3 py-1 font-mono text-xs font-bold text-[#F2FF65] sm:block">
          {visibleEngagements.length} RECORDS
        </span>
      </header>

      {/* =====================================================
          SEARCH + FILTER BAR
          Search left / filters right
      ===================================================== */}

      <div className="rounded-2xl border border-[#2A3C2E] bg-[#141F16] p-4 shadow-lg">

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

          {/* SEARCH */}

          <div className="relative min-w-0 flex-1">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />

            <input
              type="text"
              placeholder="Search athlete, opportunity, sport, or location..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              className="w-full rounded-xl border border-[#2A3C2E] bg-[#0B120D] py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 outline-none transition-colors focus:border-[#F2FF65] font-['Inter',sans-serif]"
            />
          </div>

          {/* FILTERS — SHIFTED TO RIGHT */}

          <div className="flex shrink-0 items-center gap-2 overflow-x-auto scrollbar-none">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() =>
                  setStatusFilter(status)
                }
                className={`shrink-0 rounded-xl border px-3.5 py-2 text-[10px] font-['Poppins'] font-bold uppercase tracking-wider transition-all ${
                  statusFilter === status
                    ? "border-[#F2FF65] bg-[#F2FF65] text-[#141F16] shadow-sm"
                    : "border-[#2A3C2E] bg-[#0B120D] text-gray-300 hover:border-[#F2FF65]/50 hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="mt-7 mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-['Poppins'] text-lg font-semibold tracking-[-0.035em] text-[#F7F5ED]">
            Athlete Engagements
          </h2>

          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#F7F5ED]/40">
            {visibleEngagements.length} matching records
          </p>
        </div>
      </div>

      {/* =====================================================
          CARDS
      ===================================================== */}

      {visibleEngagements.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {visibleEngagements.map(
            (engagement, index) => (
              <EngagementCard
                key={engagement.id}
                engagement={engagement}
                index={index}
                onClick={setSelectedEngagement}
              />
            )
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#2A3C2E] bg-[#141F16] p-10 text-center">
          <Search
            size={28}
            className="mx-auto mb-4 text-[#F2FF65]"
            strokeWidth={1.5}
          />

          <p className="text-sm font-semibold text-white">
            No engagements found
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Try adjusting your search or status filter.
          </p>
        </div>
      )}

      {/* =====================================================
          MODAL
      ===================================================== */}

      <EngagementModal
        engagement={selectedEngagement}
        onClose={() =>
          setSelectedEngagement(null)
        }
      />
    </section>
  );
}

