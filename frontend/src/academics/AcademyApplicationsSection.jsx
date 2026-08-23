
import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  Search,
  UserRound,
  X,
} from "lucide-react";

const statuses = ["Pending", "Under Review", "Approved", "Declined"];

function StatusBadge({ status }) {
  const value = String(status || "Pending").toLowerCase();

  const styles = {
    pending:
      "border-[#F2FF65]/35 bg-[#F2FF65]/10 text-[#F2FF65]",
    "under review":
      "border-[#3B82F6]/40 bg-[#2C337F]/50 text-[#93C5FD]",
    approved:
      "border-[#4ADE80]/30 bg-[#166534]/40 text-[#86EFAC]",
    declined:
      "border-[#FF6B4A]/35 bg-[#95402F]/25 text-[#FF9A7A]",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] ${
        styles[value] || styles.pending
      }`}
    >
      {status || "Pending"}
    </span>
  );
}

function SummaryCard({ label, count, status }) {
  const icons = {
    Pending: Clock3,
    "Under Review": Search,
    Approved: CheckCircle2,
    Declined: X,
  };

  const Icon = icons[status];

  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#315038] to-[#223F31] p-4">
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#F2FF65]/60">
          {label}
        </p>

        <Icon
          size={16}
          className="text-[#F2FF65]"
          strokeWidth={1.5}
        />
      </div>

      <p className="mt-4 font-['Poppins'] text-2xl font-semibold tracking-[-0.04em] text-[#F2FF65]">
        {count}
      </p>
    </div>
  );
}

function ApplicationCard({
  application,
  athlete,
  opportunity,
  onClick,
}) {
  return (
    <button
      onClick={() => onClick(application)}
      className="group flex w-full flex-col gap-4 rounded-xl border border-white/10 bg-gradient-to-br from-[#315038] via-[#2A4635] to-[#223F31] p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F2FF65]/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)] sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#F2FF65]/15 bg-[#2C337F]/70 text-[#F2FF65]">
          <UserRound size={17} strokeWidth={1.5} />
        </div>

        <div className="min-w-0">
          <p className="truncate font-['Poppins'] text-sm font-semibold text-[#F7F5ED]">
            {application.athleteName ||
              athlete?.name ||
              "Athlete"}
          </p>

          <p className="mt-0.5 truncate text-xs text-[#F7F5ED]/55">
            {application.opportunityName ||
              opportunity?.title ||
              "Opportunity"}
          </p>

          <p className="mt-1 font-mono text-[9px] text-[#F7F5ED]/35">
            ID: {application.id ||
              application.applicationId ||
              "—"}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <span className="inline-flex items-center gap-1.5 text-[10px] text-[#F7F5ED]/50">
          <CalendarDays size={12} />
          {application.applicationDate ||
            application.createdAt ||
            "Date unavailable"}
        </span>

        <StatusBadge status={application.status} />

        <ChevronRight
          size={16}
          className="text-[#F2FF65] transition-transform duration-200 group-hover:translate-x-1"
        />
      </div>
    </button>
  );
}

function ApplicationModal({
  application,
  athlete,
  opportunity,
  onClose,
}) {
  if (!application) return null;

  const details = [
    [
      "Application ID",
      application.id || application.applicationId,
    ],
    [
      "Applied on",
      application.applicationDate ||
        application.createdAt,
    ],
    [
      "Sport",
      opportunity?.sport || application.sport,
    ],
    [
      "Location",
      opportunity?.location ||
        application.location,
    ],
    [
      "Experience",
      application.experience ||
        athlete?.experience,
    ],
    [
      "Message",
      application.message ||
        application.coverLetter ||
        application.details,
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
      aria-label="Application details"
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-gradient-to-br from-[#315038] via-[#223F31] to-[#2A3C2E] shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full border border-[#F2FF65]/15 bg-[#2C337F] text-[#F2FF65]">
              <UserRound size={18} strokeWidth={1.5} />
            </div>

            <div>
              <h2 className="font-['Poppins'] text-lg font-semibold tracking-[-0.04em] text-[#F7F5ED]">
                {application.athleteName ||
                  athlete?.name ||
                  "Athlete"}
              </h2>

              <p className="mt-0.5 text-xs text-[#F7F5ED]/55">
                {application.opportunityName ||
                  opportunity?.title ||
                  "Opportunity"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#F2FF65] transition-all hover:border-[#F2FF65]/35 hover:bg-[#F2FF65]/10"
            aria-label="Close application details"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={application.status} />

            <span className="inline-flex items-center gap-1.5 text-[10px] text-[#F7F5ED]/50">
              <CalendarDays size={12} />

              {application.applicationDate ||
                application.createdAt ||
                "Date unavailable"}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {details.map(([label, value]) => (
              <div
                key={label}
                className={`rounded-xl border border-white/10 bg-[#2A3C2E] p-3.5 ${
                  label === "Message"
                    ? "sm:col-span-2"
                    : ""
                }`}
              >
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#F2FF65]/60">
                  {label}
                </p>

                <p className="mt-1.5 text-xs leading-5 text-[#F7F5ED]/80">
                  {String(value)}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="mt-6 rounded-lg bg-[#F2FF65] px-4 py-2 text-xs font-bold text-[#07130D] transition-all hover:-translate-y-0.5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AcademyApplicationsSection({
  applications = [],
  opportunities = [],
  athletes = [],
}) {
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [opportunityFilter, setOpportunityFilter] =
    useState("All");

  const [selectedApplication, setSelectedApplication] =
    useState(null);

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

  const countByStatus = (status) =>
    applications.filter(
      (application) =>
        String(
          application.status || "Pending"
        ).toLowerCase() ===
        status.toLowerCase()
    ).length;

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const opportunityId =
        application.opportunityId ||
        application.opportunity?.id;

      const applicationStatus =
        application.status || "Pending";

      return (
        (statusFilter === "All" ||
          applicationStatus === statusFilter) &&
        (opportunityFilter === "All" ||
          String(opportunityId) ===
            String(opportunityFilter))
      );
    });
  }, [
    applications,
    statusFilter,
    opportunityFilter,
  ]);

  const unreviewedApplications =
    filteredApplications.filter((application) =>
      ["Pending", "Under Review"].includes(
        application.status || "Pending"
      )
    );

  const processedApplications =
    filteredApplications.filter((application) =>
      ["Approved", "Declined"].includes(
        application.status
      )
    );

  return (
    <section className="min-h-full w-full bg-[#2A3C2E] font-['Inter'] text-[#F7F5ED]">

      {/* PAGE TITLE */}
      <header className="mb-7 border-b border-white/10 pb-5">
        <p className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#F2FF65]/60">
          Candidate Management
        </p>

        <h1 className="font-['Poppins'] text-2xl font-semibold tracking-[-0.045em] text-[#F7F5ED]">
          Applications
        </h1>

        <p className="mt-1.5 text-xs text-[#F7F5ED]/50">
          Review applications across your academy opportunities.
        </p>
      </header>

      {/* SUMMARY */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Pending"
          status="Pending"
          count={countByStatus("Pending")}
        />

        <SummaryCard
          label="Under Review"
          status="Under Review"
          count={countByStatus("Under Review")}
        />

        <SummaryCard
          label="Approved"
          status="Approved"
          count={countByStatus("Approved")}
        />

        <SummaryCard
          label="Declined"
          status="Declined"
          count={countByStatus("Declined")}
        />
      </div>

      {/* FILTERS */}
      <div className="mt-6 flex flex-col gap-3 rounded-xl border border-white/10 bg-[#315038] p-3 sm:flex-row sm:items-center">
        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          className="rounded-lg border border-white/10 bg-[#2A3C2E] px-3 py-2.5 text-xs text-[#F7F5ED] outline-none transition-all focus:border-[#F2FF65]/50"
        >
          <option value="All">All Statuses</option>

          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={opportunityFilter}
          onChange={(event) =>
            setOpportunityFilter(event.target.value)
          }
          className="rounded-lg border border-white/10 bg-[#2A3C2E] px-3 py-2.5 text-xs text-[#F7F5ED] outline-none transition-all focus:border-[#F2FF65]/50"
        >
          <option value="All">
            All Opportunities
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

        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#F7F5ED]/40 sm:ml-auto">
          {filteredApplications.length}{" "}
          {filteredApplications.length === 1
            ? "Application"
            : "Applications"}{" "}
          Shown
        </span>
      </div>

      {/* APPLICATION SECTIONS */}
      <div className="mt-8 space-y-8">

        {/* NEEDS ATTENTION */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Clock3
              size={15}
              className="text-[#F2FF65]"
              strokeWidth={1.5}
            />

            <h2 className="font-['Poppins'] text-lg font-semibold tracking-[-0.035em] text-[#F7F5ED]">
              Needs Attention
            </h2>

            <span className="font-mono text-[10px] text-[#F7F5ED]/40">
              ({unreviewedApplications.length})
            </span>
          </div>

          {unreviewedApplications.length ? (
            <div className="space-y-2.5">
              {unreviewedApplications.map(
                (application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
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
            <div className="rounded-xl border border-white/10 bg-[#315038] p-4 text-xs text-[#F7F5ED]/50">
              No pending or under-review applications.
            </div>
          )}
        </section>

        {/* PROCESSED */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <ClipboardList
              size={15}
              className="text-[#F2FF65]"
              strokeWidth={1.5}
            />

            <h2 className="font-['Poppins'] text-lg font-semibold tracking-[-0.035em] text-[#F7F5ED]">
              Processed Applications
            </h2>

            <span className="font-mono text-[10px] text-[#F7F5ED]/40">
              ({processedApplications.length})
            </span>
          </div>

          {processedApplications.length ? (
            <div className="space-y-2.5">
              {processedApplications.map(
                (application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
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
            <div className="rounded-xl border border-white/10 bg-[#315038] p-4 text-xs text-[#F7F5ED]/50">
              No processed applications yet.
            </div>
          )}
        </section>
      </div>

      {/* MODAL */}
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
      />
    </section>
  );
}

