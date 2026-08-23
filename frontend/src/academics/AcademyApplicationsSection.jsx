
import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Filter,
  MapPin,
  Search,
  Send,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

/* =========================================================
   STATUS CONFIG
========================================================= */

const statuses = [
  "All",
  "Pending",
  "Under Review",
  "Approved",
  "Declined",
];

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const value = String(status || "Pending").toLowerCase();

  if (value === "approved") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-emerald-300">
        <CheckCircle2 size={13} />
        APPROVED
      </span>
    );
  }

  if (value === "declined") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-rose-400/30 bg-rose-400/10 px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-rose-300">
        <XCircle size={13} />
        DECLINED
      </span>
    );
  }

  if (value === "under review") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-sky-400/30 bg-sky-400/10 px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-sky-300">
        <Clock3 size={13} />
        UNDER REVIEW
      </span>
    );
  }

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-sky-400/30 bg-sky-400/10 px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-sky-300">
      <Send size={13} />
      PENDING
    </span>
  );
}

/* =========================================================
   APPLICATION CARD
   Same visual language as athlete applications page
========================================================= */

function ApplicationCard({
  application,
  athlete,
  opportunity,
  onClick,
}) {
  /*
    Alternating card colors exactly like the athlete page:
    burnt orange → blue → dark green
  */

  const cardColors = [
    "bg-[#95402F] border-[#B24F3C]/40",
    "bg-[#2C337F] border-[#3A44A6]/40",
    "bg-[#141F16] border-[#2A3C2E]",
  ];

  const colorIndex =
    Number(application.cardIndex || 0) % cardColors.length;

  const cardStyle = cardColors[colorIndex];

  const title =
    application.opportunityName ||
    opportunity?.title ||
    "SPORTS OPPORTUNITY";

  const athleteName =
    application.athleteName ||
    athlete?.name ||
    "Athlete";

  const location =
    opportunity?.location ||
    application.location ||
    "Location unavailable";

  const compensation =
    opportunity?.compensation ||
    application.compensation ||
    application.salary ||
    "Compensation not specified";

  const activePeriod =
    opportunity?.timeline ||
    application.timeline ||
    "Aug 15 – Sep 15, 2026";

  const type =
    opportunity?.type ||
    application.type ||
    "Full-time";

  const timings =
    opportunity?.timings ||
    application.timings ||
    "Schedule unavailable";

  const appliedDate =
    application.applicationDate ||
    application.createdAt ||
    "Date unavailable";

  return (
    <article
      onClick={() => onClick(application)}
      className={`${cardStyle} group relative cursor-pointer rounded-2xl border p-5 text-[#F7F8FA] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
    >
      {/* ===============================================
          CARD HEADER
      =============================================== */}

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-['Poppins'] text-xl font-extrabold uppercase leading-tight tracking-wide text-white">
              {title}
            </h3>

            <p className="mt-1.5 text-sm font-semibold text-gray-200">
              {athleteName}
            </p>

            <p className="mt-0.5 text-xs font-medium text-gray-300/80">
              Applicant
            </p>
          </div>

          <StatusBadge status={application.status} />
        </div>

        {/* =============================================
            LOCATION
        ============================================= */}

        <div className="flex items-center gap-1.5 text-xs text-[#F2FF65]">
          <MapPin size={14} />
          <span>{location}</span>
        </div>

        {/* =============================================
            COMPENSATION
        ============================================= */}

        <div className="font-mono text-base font-bold text-[#F2FF65]">
          {compensation}
        </div>

        {/* =============================================
            ACTIVE TIMELINE
        ============================================= */}

        <div className="flex items-center gap-1.5 font-mono text-xs font-medium text-sky-400">
          <Clock3 size={13} />
          <span>Active: {activePeriod}</span>
        </div>

        {/* =============================================
            TYPE + TIMINGS
        ============================================= */}

        <div className="space-y-1 font-mono text-xs text-gray-200">
          <p className="font-medium">{type}</p>
          <p className="text-gray-400">{timings}</p>
        </div>
      </div>

      {/* ===============================================
          FOOTER
      =============================================== */}

      <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-3">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-300/70">
          <CalendarDays size={13} />
          <span>Applied on {appliedDate}</span>
        </div>

        <span className="font-mono text-[11px] font-bold text-[#F2FF65] transition-all group-hover:translate-x-1">
          VIEW APPLICATION →
        </span>
      </div>
    </article>
  );
}

/* =========================================================
   APPLICATION MODAL
   Social-media / profile-request style
========================================================= */

function ApplicationModal({
  application,
  athlete,
  opportunity,
  onClose,
  onApprove,
  onDecline,
}) {
  if (!application) return null;

  const isProcessed = ["Approved", "Declined"].includes(
    application.status
  );

  const athleteName =
    application.athleteName ||
    athlete?.name ||
    "Athlete";

  const sport =
    athlete?.sport ||
    application.sport ||
    opportunity?.sport ||
    "Athlete";

  /*
    Supports common profile-image field names.
    If your athlete object has one of these, it will automatically show.
  */
  const profileImage =
    athlete?.profilePicture ||
    athlete?.profileImage ||
    athlete?.avatar ||
    athlete?.image ||
    application.profilePicture ||
    application.profileImage ||
    application.avatar ||
    application.image ||
    null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#07130D]/80 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#315038] to-[#141F16] shadow-[0_25px_80px_rgba(0,0,0,0.55)]">

        {/* =================================================
            CLOSE BUTTON
        ================================================= */}

        <div className="flex justify-end px-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-[#F7F5ED]/70 transition-all hover:border-[#F2FF65]/40 hover:bg-[#F2FF65]/10 hover:text-[#F2FF65]"
            aria-label="Close"
          >
            <X size={17} />
          </button>
        </div>

        {/* =================================================
            PROFILE
        ================================================= */}

        <div className="flex flex-col items-center px-6 pb-6 pt-2">

          {/* PROFILE PICTURE */}

          <div className="relative">
            <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-[#F2FF65]/60 bg-[#2C337F] shadow-[0_0_0_5px_rgba(242,255,101,0.06)]">

              {profileImage ? (
                <img
                  src={profileImage}
                  alt={athleteName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full w-full place-items-center text-[#F2FF65]">
                  <UserRound size={36} strokeWidth={1.5} />
                </div>
              )}

            </div>
          </div>

          {/* NAME */}

          <h2 className="mt-4 text-center font-['Poppins'] text-xl font-bold tracking-tight text-[#F7F5ED]">
            {athleteName}
          </h2>

          {/* SPORT */}

          <p className="mt-1 text-sm font-medium text-[#F2FF65]">
            {sport}
          </p>

          {/* STATUS */}

          <div className="mt-4">
            <StatusBadge status={application.status} />
          </div>

          {/* =================================================
              DECISION BUTTONS
              ONLY FOR PENDING / UNDER REVIEW
          ================================================= */}

          {!isProcessed && (
            <div className="mt-7 grid w-full grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() => onDecline(application)}
                className="flex items-center justify-center gap-2 rounded-xl border border-rose-400/30 bg-[#95402F]/30 px-4 py-3 text-xs font-bold uppercase tracking-wider text-rose-300 transition-all hover:border-rose-400/60 hover:bg-[#95402F]/50 hover:-translate-y-0.5"
              >
                <XCircle size={15} />
                DECLINE
              </button>

              <button
                type="button"
                onClick={() => onApprove(application)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#F2FF65] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#07130D] transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <CheckCircle2 size={15} />
                APPROVE
              </button>

            </div>
          )}

          {/* =================================================
              CLOSE
          ================================================= */}

          <button
            type="button"
            onClick={onClose}
            className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#F7F5ED]/65 transition-all hover:border-[#F2FF65]/30 hover:bg-[#F2FF65]/10 hover:text-[#F2FF65] ${
              !isProcessed ? "mt-3" : "mt-7"
            }`}
          >
            CLOSE
          </button>

        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AcademyApplicationsSection({
  applications = [],
  opportunities = [],
  athletes = [],

  /*
    Connect this to your existing athlete-profile navigation.

    Example:
    onViewAthlete={(athlete) =>
      navigate(`/academy/athletes/${athlete.id}`)
    }
  */
  onViewAthlete,

  /*
    Connect these to your backend/database actions.
  */
  onApprove,
  onDecline,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [opportunityFilter, setOpportunityFilter] =
    useState("All");

  const [selectedApplication, setSelectedApplication] =
    useState(null);

  /* =======================================================
     DATA HELPERS
  ======================================================= */

  const getOpportunity = (application) => {
    const id =
      application.opportunityId ||
      application.opportunity?.id;

    return opportunities.find(
      (opportunity) =>
        String(opportunity.id) === String(id)
    );
  };

  const getAthlete = (application) => {
    const id =
      application.athleteId ||
      application.athlete?.id;

    return athletes.find(
      (athlete) =>
        String(athlete.id) === String(id)
    );
  };

  /* =======================================================
     FILTERING
  ======================================================= */

  const filteredApplications = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return applications.filter((application) => {
      const opportunity =
        getOpportunity(application);

      const athlete =
        getAthlete(application);

      const status =
        application.status || "Pending";

      const opportunityId =
        application.opportunityId ||
        application.opportunity?.id;

      const searchableText = [
        application.athleteName,
        athlete?.name,
        application.opportunityName,
        opportunity?.title,
        opportunity?.sport,
        opportunity?.location,
        application.location,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query ||
        searchableText.includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        status === statusFilter;

      const matchesOpportunity =
        opportunityFilter === "All" ||
        String(opportunityId) ===
          String(opportunityFilter);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesOpportunity
      );
    });
  }, [
    applications,
    opportunities,
    athletes,
    searchTerm,
    statusFilter,
    opportunityFilter,
  ]);

  /* =======================================================
     NEEDS ATTENTION
  ======================================================= */

  const needsAttention =
    filteredApplications.filter((application) =>
      ["Pending", "Under Review"].includes(
        application.status || "Pending"
      )
    );

  /* =======================================================
     PROCESSED
  ======================================================= */

  const processedApplications =
    filteredApplications.filter((application) =>
      ["Approved", "Declined"].includes(
        application.status
      )
    );

  /* =======================================================
     DECISION HANDLERS
  ======================================================= */

  const handleApprove = (application) => {
    if (onApprove) {
      onApprove(application);
    }

    setSelectedApplication(null);
  };

  const handleDecline = (application) => {
    if (onDecline) {
      onDecline(application);
    }

    setSelectedApplication(null);
  };

  return (
    <section className="applications-pane matchpoint-fade-in mx-auto min-h-full w-full max-w-6xl space-y-6 pb-16 font-['Inter'] text-[#F7F5ED]">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <header className="flex items-center justify-between pt-1">
        <div>
          <p className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#F2FF65]/60">
            Candidate Management
          </p>

          <h1 className="font-['Poppins'] text-3xl font-black uppercase tracking-wider text-white">
            APPLICATIONS
          </h1>
        </div>

        <span className="rounded-xl border border-[#F2FF65]/20 bg-[#F2FF65]/10 px-3 py-1.5 font-mono text-xs font-bold text-[#F2FF65]">
          {filteredApplications.length} APPLIED
        </span>
      </header>

      {/* =================================================
          SEARCH + FILTER BAR
          Filters are compact / right aligned
      ================================================= */}

      <div className="rounded-2xl border border-[#2A3C2E] bg-[#141F16] p-4 shadow-lg">

        {/* SEARCH */}

        <div className="relative">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            size={17}
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search applicant, opportunity, academy, or location..."
            className="w-full rounded-xl border border-[#2A3C2E] bg-[#0B120D] py-3 pl-11 pr-4 text-xs text-white placeholder-gray-500 outline-none transition-colors focus:border-[#F2FF65]"
          />
        </div>

        {/* FILTERS — RIGHT SIDE */}

        <div className="mt-3 flex flex-wrap items-center justify-end gap-2">

          <div className="flex items-center gap-1.5 text-gray-500">
            <Filter size={14} />
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider">
              Filter
            </span>
          </div>

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="cursor-pointer rounded-xl border border-[#2A3C2E] bg-[#0B120D] px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-300 outline-none transition-all hover:border-[#F2FF65]/40 focus:border-[#F2FF65]"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === "All"
                  ? "ALL STATUS"
                  : status}
              </option>
            ))}
          </select>

          {/* OPPORTUNITY */}

          <select
            value={opportunityFilter}
            onChange={(event) =>
              setOpportunityFilter(event.target.value)
            }
            className="max-w-[220px] cursor-pointer rounded-xl border border-[#2A3C2E] bg-[#0B120D] px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-300 outline-none transition-all hover:border-[#F2FF65]/40 focus:border-[#F2FF65]"
          >
            <option value="All">
              ALL OPPORTUNITIES
            </option>

            {opportunities.map((opportunity) => (
              <option
                key={opportunity.id}
                value={opportunity.id}
              >
                {opportunity.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* =================================================
          NEEDS ATTENTION
      ================================================= */}

      <section>
        <div className="mb-4 flex items-center gap-2">
          <Clock3
            size={16}
            className="text-[#F2FF65]"
          />

          <h2 className="font-['Poppins'] text-xl font-bold tracking-tight text-white">
            Needs Attention
          </h2>

          <span className="font-mono text-xs text-gray-500">
            ({needsAttention.length})
          </span>
        </div>

        {needsAttention.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {needsAttention.map(
              (application, index) => (
                <ApplicationCard
                  key={
                    application.id ||
                    application.applicationId ||
                    index
                  }
                  application={{
                    ...application,
                    cardIndex: index,
                  }}
                  athlete={getAthlete(application)}
                  opportunity={getOpportunity(
                    application
                  )}
                  onClick={
                    setSelectedApplication
                  }
                />
              )
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#2A3C2E] bg-[#141F16] p-8 text-center">
            <CheckCircle2
              className="mx-auto mb-2 text-emerald-400"
              size={24}
            />

            <p className="text-sm font-semibold text-white">
              All caught up
            </p>

            <p className="mt-1 text-xs text-gray-500">
              There are no applications waiting for your decision.
            </p>
          </div>
        )}
      </section>

      {/* =================================================
          PROCESSED APPLICATIONS
      ================================================= */}

      <section>
        <div className="mb-4 flex items-center gap-2">
          <CheckCircle2
            size={16}
            className="text-[#F2FF65]"
          />

          <h2 className="font-['Poppins'] text-xl font-bold tracking-tight text-white">
            Processed Applications
          </h2>

          <span className="font-mono text-xs text-gray-500">
            ({processedApplications.length})
          </span>
        </div>

        {processedApplications.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {processedApplications.map(
              (application, index) => (
                <ApplicationCard
                  key={
                    application.id ||
                    application.applicationId ||
                    index
                  }
                  application={{
                    ...application,
                    cardIndex:
                      needsAttention.length +
                      index,
                  }}
                  athlete={getAthlete(application)}
                  opportunity={getOpportunity(
                    application
                  )}
                  onClick={
                    setSelectedApplication
                  }
                />
              )
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#2A3C2E] bg-[#141F16] p-8 text-center">
            <p className="text-sm font-semibold text-white">
              No processed applications
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Approved and declined applications will appear here.
            </p>
          </div>
        )}
      </section>

      {/* =================================================
          MODAL
      ================================================= */}

      <ApplicationModal
        application={selectedApplication}
        athlete={
          selectedApplication
            ? getAthlete(selectedApplication)
            : null
        }
        opportunity={
          selectedApplication
            ? getOpportunity(selectedApplication)
            : null
        }
        onClose={() =>
          setSelectedApplication(null)
        }
        onApprove={handleApprove}
        onDecline={handleDecline}
        onViewAthlete={onViewAthlete}
      />
    </section>
  );
}

