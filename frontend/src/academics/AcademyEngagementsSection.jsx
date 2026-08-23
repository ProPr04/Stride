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
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

const mockEngagements = [
  {
    id: "ENG-001",
    athleteName: "Aarav Mehta",
    opportunityName: "Assistant Football Coach",
    sport: "Football",
    location: "Mumbai",
    startDate: "15 Jun 2026",
    endDate: "15 Sep 2026",
    status: "Active",
    details:
      "Supporting youth football training sessions and match-day coaching activities.",
    progress: 68,
    verification: "Verified",
  },
  {
    id: "ENG-002",
    athleteName: "Riya Kapoor",
    opportunityName: "Basketball Skills Mentor",
    sport: "Basketball",
    location: "Delhi",
    startDate: "01 Sep 2026",
    endDate: "30 Nov 2026",
    status: "Upcoming",
    details:
      "Leading skills sessions for academy players during the autumn development programme.",
    progress: 0,
    verification: "Verified",
  },
  {
    id: "ENG-003",
    athleteName: "Kabir Singh",
    opportunityName: "Cricket Academy Assistant",
    sport: "Cricket",
    location: "Bengaluru",
    startDate: "10 Feb 2026",
    endDate: "10 May 2026",
    status: "Completed",
    details:
      "Assisted coaches with fielding drills, match preparation and player support.",
    progress: 100,
    verification: "Verified",
  },
  {
    id: "ENG-004",
    athleteName: "Ananya Rao",
    opportunityName: "Athletics Camp Support",
    sport: "Athletics",
    location: "Pune",
    startDate: "05 Mar 2026",
    endDate: "20 Mar 2026",
    status: "Cancelled",
    details:
      "Seasonal training camp engagement that was cancelled before completion.",
    progress: 0,
    verification: "Not Verified",
  },
];

const statuses = ["All", "Active", "Upcoming", "Completed", "Cancelled"];

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
        "border-[#3B82F6]/50 bg-[#2C337F] text-[#F7F5ED]",
    },
    Completed: {
      icon: Check,
      className:
        "border-[#4ADE80]/30 bg-[#4ADE80]/10 text-[#4ADE80]",
    },
    Cancelled: {
      icon: X,
      className:
        "border-[#95402F] bg-[#95402F]/35 text-[#F7F5ED]",
    },
  };

  const current = config[status] || config.Upcoming;
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] ${current.className}`}
    >
      <Icon size={11} strokeWidth={2.5} />
      {status}
    </span>
  );
}

function SummaryCard({ label, value, icon: Icon, accent = false }) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        accent
          ? "border-[#F2FF65]/35 bg-[#F2FF65]/10"
          : "border-[#F2FF65]/15 bg-[#315038]"
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#F2FF65]/65">
          {label}
        </span>

        <Icon
          size={17}
          className={accent ? "text-[#F2FF65]" : "text-[#F2FF65]/75"}
          strokeWidth={1.5}
        />
      </div>

      <p className="mt-5 font-['Poppins'] text-3xl font-semibold tracking-[-0.05em] text-[#F2FF65]">
        {value}
      </p>
    </div>
  );
}

function EngagementCard({ engagement, onClick }) {
  const isActive = engagement.status === "Active";
  const isCompleted = engagement.status === "Completed";
  const isCancelled = engagement.status === "Cancelled";

  return (
    <button
      onClick={() => onClick(engagement)}
      className={`group relative flex min-h-[300px] flex-col overflow-hidden rounded-xl border p-5 text-left transition-all duration-200 hover:-translate-y-1 ${
        isActive
          ? "border-[#F2FF65]/35 bg-[#315038]"
          : "border-[#F2FF65]/15 bg-[#315038]"
      }`}
    >
      {/* top accent */}
      <div
        className={`absolute left-0 top-0 h-1 w-full ${
          isActive
            ? "bg-[#F2FF65]"
            : isCompleted
            ? "bg-[#4ADE80]"
            : isCancelled
            ? "bg-[#95402F]"
            : "bg-[#3B82F6]"
        }`}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#2C337F] text-[#F2FF65]">
          <UserRound size={21} strokeWidth={1.5} />
        </div>

        <StatusBadge status={engagement.status} />
      </div>

      <div className="mt-5">
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#F2FF65]/50">
          {engagement.id} // ATHLETE ENGAGEMENT
        </p>

        <h2 className="mt-2 truncate font-['Poppins'] text-xl font-semibold tracking-[-0.04em] text-[#F2FF65]">
          {engagement.athleteName}
        </h2>

        <p className="mt-1 truncate text-sm font-medium text-[#F7F5ED]/80">
          {engagement.opportunityName}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-[#F2FF65]/10 bg-[#2A3C2E] p-3">
          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#F2FF65]/50">
            Sport
          </span>
          <p className="mt-1 text-xs text-[#F7F5ED]">{engagement.sport}</p>
        </div>

        <div className="rounded-lg border border-[#F2FF65]/10 bg-[#2A3C2E] p-3">
          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#F2FF65]/50">
            Location
          </span>
          <p className="mt-1 flex items-center gap-1 text-xs text-[#F7F5ED]">
            <MapPin size={11} />
            {engagement.location}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#F2FF65]/50">
            Engagement Progress
          </span>

          <span className="font-mono text-[9px] text-[#F2FF65]">
            {engagement.progress}%
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-[#2A3C2E]">
          <div
            className={`h-full rounded-full transition-all ${
              isCancelled
                ? "bg-[#95402F]"
                : isCompleted
                ? "bg-[#4ADE80]"
                : "bg-[#F2FF65]"
            }`}
            style={{ width: `${engagement.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-[#F2FF65]/12 pt-4">
        <div className="flex items-center gap-2">
          <CalendarDays size={13} className="text-[#F2FF65]" />

          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#F2FF65]/45">
              Duration
            </p>

            <p className="mt-0.5 text-[10px] text-[#F7F5ED]/75">
              {engagement.startDate} — {engagement.endDate}
            </p>
          </div>
        </div>

        <ChevronRight
          size={17}
          className="text-[#F2FF65] transition-transform duration-200 group-hover:translate-x-1"
        />
      </div>
    </button>
  );
}

function EngagementModal({ engagement, onClose }) {
  if (!engagement) return null;

  const isActive = engagement.status === "Active";
  const isCompleted = engagement.status === "Completed";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-[#07130D]/80 p-4 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${engagement.athleteName} engagement`}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#F2FF65]/25 bg-[#315038] shadow-2xl">
        {/* Header */}
        <div className="relative overflow-hidden border-b border-[#F2FF65]/15 p-5 sm:p-6">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#F2FF65]/5 blur-3xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#F2FF65]/55">
                ENGAGEMENT RECORD // {engagement.id}
              </p>

              <div className="mt-3">
                <StatusBadge status={engagement.status} />
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
          {/* Verification strip */}
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

            <Check size={18} className="text-[#4ADE80]" />
          </div>

          {/* Details */}
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

          {/* Progress */}
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
                  isCompleted ? "bg-[#4ADE80]" : "bg-[#F2FF65]"
                }`}
                style={{ width: `${engagement.progress}%` }}
              />
            </div>
          </div>

          {/* Description */}
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

function DetailBox({ label, value, icon: Icon }) {
  return (
    <div className="rounded-lg border border-[#F2FF65]/12 bg-[#2A3C2E] p-4">
      <div className="flex items-center gap-2">
        <Icon size={13} className="text-[#F2FF65]" strokeWidth={1.5} />

        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.13em] text-[#F2FF65]/55">
          {label}
        </p>
      </div>

      <p className="mt-2 text-sm text-[#F7F5ED]">{value}</p>
    </div>
  );
}

export default function AcademyEngagementsSection() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedEngagement, setSelectedEngagement] = useState(null);

  const visibleEngagements = useMemo(() => {
    if (statusFilter === "All") return mockEngagements;

    return mockEngagements.filter(
      (engagement) => engagement.status === statusFilter
    );
  }, [statusFilter]);

  const activeCount = mockEngagements.filter(
    (item) => item.status === "Active"
  ).length;

  const upcomingCount = mockEngagements.filter(
    (item) => item.status === "Upcoming"
  ).length;

  const completedCount = mockEngagements.filter(
    (item) => item.status === "Completed"
  ).length;

  const verifiedCount = mockEngagements.filter(
    (item) => item.verification === "Verified"
  ).length;

  return (
    <section className="verification-pane w-full bg-[#2A3C2E] font-['Inter'] text-[#F7F5ED]">

      {/* HERO */}
      <div className="rounded-xl border border-[#F2FF65]/20 bg-[#315038] p-6 sm:p-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_280px]">

          <div>
            <p className="font-mono text-[9px] font-bold tracking-[0.18em] text-[#F2FF65]/60">
              06.5 // ACADEMY ENGAGEMENT MATRIX
            </p>

            <h1 className="mt-3 font-['Poppins'] text-3xl font-bold tracking-[-0.055em] text-[#F7F5ED] sm:text-4xl">
              ATHLETE{" "}
              <span className="text-[#F2FF65]">
                ENGAGEMENTS
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#F7F5ED]/65">
              Track active placements, upcoming collaborations, completed
              engagements and the current relationship status of your academy
              athletes.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F2FF65]/35 bg-[#F2FF65]/10 px-3 py-2 font-mono text-[9px] font-bold text-[#F2FF65]">
                <BriefcaseBusiness size={13} />
                {activeCount} ACTIVE ENGAGEMENT
              </span>

              <span className="font-mono text-[9px] text-[#F7F5ED]/50">
                {verifiedCount}/{mockEngagements.length} VERIFIED RECORDS
              </span>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative overflow-hidden rounded-lg border border-[#F2FF65]/15 bg-[#2A3C2E]">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#F2FF65]/55">
                    Engagement Status
                  </span>

                  <Activity
                    size={15}
                    className="text-[#F2FF65]"
                    strokeWidth={1.5}
                  />
                </div>

                <div className="mt-6 flex items-end gap-2">
                  <span className="font-['Poppins'] text-4xl font-semibold text-[#F2FF65]">
                    {activeCount}
                  </span>

                  <span className="mb-1 font-mono text-[9px] text-[#F7F5ED]/50">
                    CURRENT
                  </span>
                </div>

                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#315038]">
                  <div
                    className="h-full rounded-full bg-[#F2FF65]"
                    style={{
                      width: `${(activeCount / mockEngagements.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Active"
          value={activeCount}
          icon={Activity}
          accent
        />

        <SummaryCard
          label="Upcoming"
          value={upcomingCount}
          icon={Clock3}
        />

        <SummaryCard
          label="Completed"
          value={completedCount}
          icon={Check}
        />

        <SummaryCard
          label="Verified Records"
          value={verifiedCount}
          icon={ShieldCheck}
        />
      </div>

      {/* FILTER */}
      <div className="mt-8 rounded-xl border border-[#F2FF65]/15 bg-[#315038] p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#F2FF65]/60">
            Engagement Filter
          </span>

          <span className="font-mono text-[9px] text-[#F7F5ED]/45">
            {visibleEngagements.length} RECORDS
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.08em] transition-all ${
                statusFilter === status
                  ? "border-[#F2FF65] bg-[#F2FF65] text-[#07130D]"
                  : "border-[#F2FF65]/20 bg-[#2A3C2E] text-[#F7F5ED]/60 hover:border-[#F2FF65]/50 hover:text-[#F2FF65]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION HEADER */}
      <div className="mb-5 mt-10 flex items-end justify-between border-b border-[#F2FF65]/15 pb-4">
        <div>
          <p className="font-mono text-[9px] font-bold tracking-[0.16em] text-[#F2FF65]/55">
            ENGAGEMENT RECORDS
          </p>

          <h2 className="mt-1 font-['Poppins'] text-2xl font-semibold tracking-[-0.04em] text-[#F2FF65]">
            Academy Work
          </h2>
        </div>

        <span className="hidden font-mono text-[9px] text-[#F7F5ED]/40 sm:block">
          CLICK RECORD TO INSPECT
        </span>
      </div>

      {/* CARDS */}
      {visibleEngagements.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleEngagements.map((engagement) => (
            <EngagementCard
              key={engagement.id}
              engagement={engagement}
              onClick={setSelectedEngagement}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-[#F2FF65]/15 bg-[#315038] px-6 text-center">
          <BriefcaseBusiness
            size={28}
            className="mb-4 text-[#F2FF65]"
            strokeWidth={1.5}
          />

          <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#F2FF65]/55">
            No Matching Records
          </p>

          <h2 className="mt-2 font-['Poppins'] text-lg font-semibold text-[#F2FF65]">
            No engagements found
          </h2>

          <p className="mt-2 text-sm text-[#F7F5ED]/55">
            There are no engagements matching this status.
          </p>
        </div>
      )}

      {/* MODAL */}
      <EngagementModal
        engagement={selectedEngagement}
        onClose={() => setSelectedEngagement(null)}
      />
    </section>
  );
}