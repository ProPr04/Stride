
import React, { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  FileText,
  MapPin,
  Plus,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

function StatusBadge({ status }) {
  const value = String(status || "Draft").toLowerCase();

  const styles = {
    open: "border-[#F2FF65]/40 bg-[#F2FF65]/10 text-[#F2FF65]",
    draft: "border-white/15 bg-white/5 text-[#F7F5ED]/70",
    closed: "border-[#FF6B4A]/40 bg-[#FF6B4A]/10 text-[#FF9A7A]",
    pending: "border-[#F2FF65]/40 bg-[#F2FF65]/10 text-[#F2FF65]",
    "under review": "border-[#60A5FA]/40 bg-[#2C337F]/60 text-[#93C5FD]",
    approved: "border-[#F2FF65]/40 bg-[#166534]/50 text-[#F2FF65]",
    declined: "border-[#FF6B4A]/40 bg-[#95402F]/30 text-[#FF9A7A]",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] ${
        styles[value] || styles.draft
      }`}
    >
      {status || "Draft"}
    </span>
  );
}

function OpportunityCard({ opportunity, applicationCount, onClick }) {
  return (
    <button
      onClick={() => onClick(opportunity)}
      className="group relative flex min-h-[245px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#95402F] via-[#7F3529] to-[#4A241F] p-5 text-left shadow-[0_14px_40px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F2FF65]/35 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
    >
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#FF9A7A]/10 blur-3xl transition-all duration-300 group-hover:bg-[#F2FF65]/10" />
      <div className="absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-[#F2FF65]/5 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <StatusBadge status={opportunity.status} />

          <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-black/10">
            <BriefcaseBusiness
              size={16}
              className="text-[#F2FF65]"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <h2 className="mt-6 max-w-[280px] font-['Poppins'] text-lg font-semibold leading-tight tracking-[-0.035em] text-[#F7F5ED]">
          {opportunity.title}
        </h2>

        <div className="mt-2.5 flex flex-wrap gap-2">
          {opportunity.sport && (
            <span className="rounded-full border border-white/10 bg-black/10 px-2 py-0.5 text-[9px] text-[#F7F5ED]/70">
              {opportunity.sport}
            </span>
          )}

          {opportunity.location && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/10 px-2 py-0.5 text-[9px] text-[#F7F5ED]/65">
              <MapPin size={10} />
              {opportunity.location}
            </span>
          )}
        </div>
      </div>

      <div className="relative mt-7 flex items-end justify-between border-t border-white/10 pt-3.5">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#F7F5ED]/40">
            Applications
          </p>

          <div className="mt-1 flex items-center gap-1.5">
            <Users size={13} className="text-[#F2FF65]" />

            <p className="text-xs font-semibold text-[#F7F5ED]">
              {applicationCount} application
              {applicationCount === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <span className="grid h-8 w-8 place-items-center rounded-full border border-[#F2FF65]/35 text-[#F2FF65] transition-all duration-200 group-hover:bg-[#F2FF65] group-hover:text-[#16251B]">
          <ChevronRight size={15} />
        </span>
      </div>
    </button>
  );
}

function OpportunityModal({ opportunity, applications, onClose }) {
  if (!opportunity) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-[#07130D]/80 p-4 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${opportunity.title} details`}
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-gradient-to-br from-[#315038] via-[#223F31] to-[#2A3C2E] shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
        <div className="relative overflow-hidden border-b border-white/10 p-5 sm:p-6">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#F2FF65]/10 blur-3xl" />

          <div className="relative flex items-start justify-between gap-5">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={opportunity.status} />

                <span className="inline-flex items-center gap-1.5 text-[11px] text-[#F7F5ED]/55">
                  <MapPin size={12} />
                  {opportunity.location || "Location unavailable"}
                </span>
              </div>

              <h2 className="mt-3 font-['Poppins'] text-xl font-semibold tracking-[-0.04em] text-[#F2FF65] sm:text-2xl">
                {opportunity.title}
              </h2>

              <p className="mt-1 text-xs text-[#F7F5ED]/60">
                {opportunity.sport || "Sport"}
              </p>
            </div>

            <button
              onClick={onClose}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-[#F2FF65] transition-all hover:bg-[#F2FF65] hover:text-[#16251B]"
              aria-label="Close opportunity details"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-[#2A3C2E]/80 p-3.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#F2FF65]/60">
                Sport
              </p>
              <p className="mt-1 text-xs text-[#F7F5ED]">
                {opportunity.sport || "—"}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#2A3C2E]/80 p-3.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#F2FF65]/60">
                Location
              </p>
              <p className="mt-1 text-xs text-[#F7F5ED]">
                {opportunity.location || "—"}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#2A3C2E]/80 p-3.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#F2FF65]/60">
                Applications
              </p>
              <p className="mt-1 text-xs text-[#F7F5ED]">
                {applications.length}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#F2FF65]/60">
              Opportunity details
            </p>

            <p className="mt-2 text-xs leading-5 text-[#F7F5ED]/70">
              {opportunity.description ||
                opportunity.details ||
                "No additional opportunity details have been added."}
            </p>
          </div>

          <div className="mt-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#F2FF65]/60">
                  Applications
                </p>

                <h3 className="mt-1 font-['Poppins'] text-base font-semibold text-[#F7F5ED]">
                  Candidate activity
                </h3>
              </div>

              <div className="grid h-8 w-8 place-items-center rounded-lg border border-[#F2FF65]/20 bg-[#F2FF65]/5">
                <Users
                  size={15}
                  className="text-[#F2FF65]"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {applications.length ? (
              <div className="mt-3 divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-[#2A3C2E]/80 px-4">
                {applications.map((application) => (
                  <div
                    key={application.id}
                    className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full border border-[#F2FF65]/15 bg-gradient-to-br from-[#2C337F] to-[#315038] text-[#F2FF65]">
                        <UserRound size={15} strokeWidth={1.5} />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-[#F7F5ED]">
                          {application.athleteName ||
                            application.athlete?.name ||
                            "Athlete"}
                        </p>

                        <p className="mt-0.5 inline-flex items-center gap-1 text-[10px] text-[#F7F5ED]/50">
                          <CalendarDays size={11} />
                          {application.applicationDate ||
                            application.createdAt ||
                            "Date unavailable"}
                        </p>
                      </div>
                    </div>

                    <StatusBadge status={application.status || "Pending"} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-3 rounded-xl border border-white/10 bg-[#2A3C2E]/80 p-4 text-xs text-[#F7F5ED]/60">
                No applications have been received for this opportunity yet.
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F2FF65] px-4 py-2 text-xs font-bold text-[#07130D] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(242,255,101,0.2)]"
          >
            <CheckCircle2 size={14} />
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AcademyOpportunitiesSection({
  opportunities = [],
  applications = [],
  setActiveTab,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusFilter, setStatusFilter] = useState("All");

  const selectedOpportunityId = searchParams.get("opportunity");

  const selectedOpportunity =
    opportunities.find(
      (opportunity) =>
        String(opportunity.id) === String(selectedOpportunityId)
    ) || null;

  const visibleOpportunities = useMemo(() => {
    if (statusFilter === "All") return opportunities;

    return opportunities.filter(
      (opportunity) =>
        String(opportunity.status || "Draft").toLowerCase() ===
        statusFilter.toLowerCase()
    );
  }, [opportunities, statusFilter]);

  const getApplications = (opportunity) => {
    if (Array.isArray(opportunity.applications)) {
      return opportunity.applications;
    }

    return applications.filter(
      (application) =>
        String(
          application.opportunityId || application.opportunity?.id
        ) === String(opportunity.id)
    );
  };

  const openOpportunity = (opportunity) => {
    setActiveTab?.("opportunities", opportunity.id);
    setSearchParams({ opportunity: opportunity.id });
  };

  const closeOpportunity = () => {
    setSearchParams({});
  };

  return (
    <section className="min-h-full w-full bg-[#2A3C2E] font-['Inter'] text-[#F7F5ED]">
      {/* SMALL PAGE TITLE */}
      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#F2FF65]/55">
            Academy workspace
          </p>

          <h1 className="mt-1 font-['Poppins'] text-xl font-semibold tracking-[-0.04em] text-[#F2FF65] sm:text-2xl">
            Your Opportunities
          </h1>

          <p className="mt-1 text-xs text-[#F7F5ED]/50">
            Manage your academy opportunities.
          </p>
        </div>
      </header>

      {/* ACTION / FILTER BAR */}
      <div className="mb-7 flex flex-col gap-3 rounded-2xl border border-[#F2FF65]/15 bg-gradient-to-r from-[#315038] via-[#223F31] to-[#2C337F] p-[1px] shadow-[0_12px_35px_rgba(0,0,0,0.15)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2 rounded-[15px] bg-[#315038]/90 p-3 backdrop-blur-md">
          {["All", "Open", "Draft", "Closed"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-xl border px-3.5 py-2 text-[11px] font-bold transition-all duration-200 ${
                statusFilter === status
                  ? "border-[#F2FF65] bg-[#F2FF65] text-[#07130D] shadow-[0_5px_20px_rgba(242,255,101,0.15)]"
                  : "border-white/10 bg-white/5 text-[#F7F5ED]/65 hover:border-[#F2FF65]/30 hover:text-[#F2FF65]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <Link
          to="/academy/opportunities/new"
          onClick={() => setActiveTab?.("opportunities/new")}
          className="mx-3 mb-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2FF65] px-4 py-2.5 text-xs font-bold text-[#07130D] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(242,255,101,0.2)] sm:mx-3 sm:mb-0"
        >
          <Plus size={15} />
          Add Opportunity
        </Link>
      </div>

      {/* COUNT */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#F2FF65]/55">
            Opportunities
          </p>

          <p className="mt-1 text-xs text-[#F7F5ED]/50">
            {visibleOpportunities.length}{" "}
            {visibleOpportunities.length === 1
              ? "opportunity"
              : "opportunities"}{" "}
            shown
          </p>
        </div>
      </div>

      {/* CARDS */}
      {visibleOpportunities.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleOpportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              applicationCount={getApplications(opportunity).length}
              onClick={openOpportunity}
            />
          ))}
        </div>
      ) : (
        <div className="relative flex min-h-[250px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#315038] to-[#166534] px-6 text-center">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#F2FF65]/10 blur-3xl" />

          <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-[#F2FF65]/20 bg-[#F2FF65]/5">
            <FileText
              size={22}
              className="text-[#F2FF65]"
              strokeWidth={1.5}
            />
          </div>

          <h2 className="relative mt-4 font-['Poppins'] text-base font-semibold text-[#F7F5ED]">
            No opportunities found
          </h2>

          <p className="relative mt-2 max-w-sm text-xs text-[#F7F5ED]/55">
            Try another status filter or create a new opportunity for your
            academy.
          </p>
        </div>
      )}

      <OpportunityModal
        opportunity={selectedOpportunity}
        applications={
          selectedOpportunity ? getApplications(selectedOpportunity) : []
        }
        onClose={closeOpportunity}
      />
    </section>
  );
}

