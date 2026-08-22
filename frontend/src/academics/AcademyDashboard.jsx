import React, { createContext, useContext, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileCheck2,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";

const AcademyContext = createContext(null);

/* =========================================================
   STRIDE ACADEMY — UI MOCK DATA
   Backend integration intentionally disabled for now.
   ========================================================= */

const mockProfile = {
  name: "Stride Football Academy",
  location: "Pune, Maharashtra",
  sport: "Football",
  athletes: 128,
  verified: true,
};

const mockOpportunities = [
  {
    id: 1,
    title: "Assistant Football Coach",
    sport: "Football",
    location: "Pune",
    status: "Open",
  },
  {
    id: 2,
    title: "Performance Analyst",
    sport: "Football",
    location: "Mumbai",
    status: "Open",
  },
  {
    id: 3,
    title: "Youth Development Coach",
    sport: "Football",
    location: "Pune",
    status: "Active",
  },
];

const mockAgreements = [
  {
    id: 1,
    title: "Assistant Coach Engagement",
    athlete: "Rahul Sharma",
    status: "Active",
  },
  {
    id: 2,
    title: "Performance Analyst",
    athlete: "Aarav Patil",
    status: "Pending",
  },
];

const navigation = [
  {
    label: "Overview",
    path: "/academy",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Academy Profile",
    path: "/academy/profile",
    icon: Building2,
  },
  {
    label: "Opportunities",
    path: "/academy/opportunities",
    icon: BriefcaseBusiness,
  },
  {
    label: "Post Opportunity",
    path: "/academy/opportunities/new",
    icon: Plus,
  },
  {
    label: "Talent Pool",
    path: "/academy/talent-pool",
    icon: Users,
  },
  {
    label: "Applications / Candidates",
    path: "/academy/applications",
    icon: ClipboardList,
  },
  {
    label: "Engagements",
    path: "/academy/engagements",
    icon: Sparkles,
  },
  {
    label: "Agreements",
    path: "/academy/agreements",
    icon: FileCheck2,
  },
  {
    label: "Reviews",
    path: "/academy/reviews",
    icon: Star,
  },
  {
    label: "Settings",
    path: "/academy/settings",
    icon: Settings,
  },
];

/* =========================================================
   COMMON COMPONENTS
   ========================================================= */

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-[#f2ff65] px-4 py-2.5 text-sm font-bold text-[#07130d] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e7f450] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 border-b border-[#f2ff65]/20 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f2ff65]/60">
            {eyebrow}
          </p>
        )}

        <h1 className="font-['Poppins'] text-3xl font-bold tracking-[-0.05em] text-[#f2ff65] sm:text-4xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#f7f5ed]/60">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}

function StatusBadge({ status }) {
  const normalized = String(status || "").toLowerCase();

  let classes =
    "border-[#3B82F6]/40 bg-[#3B82F6]/10 text-[#93c5fd]";

  if (
    ["active", "accepted", "approved", "open"].includes(normalized)
  ) {
    classes =
      "border-[#22C55E]/40 bg-[#22C55E]/10 text-[#86efac]";
  }

  if (["pending", "awaiting"].includes(normalized)) {
    classes =
      "border-[#F59E0B]/40 bg-[#F59E0B]/10 text-[#fcd34d]";
  }

  if (
    ["rejected", "cancelled", "closed"].includes(normalized)
  ) {
    classes =
      "border-[#EF4444]/40 bg-[#EF4444]/10 text-[#fca5a5]";
  }

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${classes}`}
    >
      {status}
    </span>
  );
}

function EmptyState({
  icon: Icon = ClipboardList,
  title,
  description,
  action,
}) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-[#f2ff65]/15 bg-[#2a3c2e]/50 px-6 py-10 text-center">
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-full border border-[#f2ff65]/20 bg-[#315038] text-[#f2ff65]">
        <Icon size={20} strokeWidth={1.5} />
      </div>

      <h3 className="font-['Poppins'] text-lg font-semibold text-[#f2ff65]">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-[#f7f5ed]/60">
        {description}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/* =========================================================
   METRIC CARD
   ========================================================= */

function MetricCard({
  label,
  value,
  icon: Icon,
  tone = "blue",
}) {
  const tones = {
    blue: "bg-[#2c337f]",
    red: "bg-[#95402f]",
    green: "bg-[#315038]",
  };

  return (
    <div
      className={`min-h-[150px] rounded-xl border border-[#f2ff65]/15 p-5 transition-transform duration-200 hover:-translate-y-1 ${tones[tone]}`}
    >
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#f2ff65]/70">
          {label}
        </p>

        <Icon
          size={19}
          className="text-[#f2ff65]"
          strokeWidth={1.5}
        />
      </div>

      <p className="mt-7 font-['Poppins'] text-3xl font-bold tracking-[-0.05em] text-[#f2ff65]">
        {value}
      </p>

      <p className="mt-1 text-xs text-[#f7f5ed]/50">
        Current total
      </p>
    </div>
  );
}

/* =========================================================
   OVERVIEW
   ========================================================= */

function Overview() {
  const { opportunities, agreements } =
    useContext(AcademyContext);

  const activeOpportunities = opportunities.filter((item) =>
    ["open", "active"].includes(
      String(item.status).toLowerCase()
    )
  ).length;

  const activeEngagements = agreements.filter(
    (item) => item.status === "Active"
  ).length;

  const pendingDecisions = agreements.filter(
    (item) => item.status === "Pending"
  ).length;

  return (
    <>
      <SectionHeading
        eyebrow="Academy workspace"
        title="Overview"
        description="A clear view of your academy's opportunities, candidates and engagements."
        action={
          <Link to="/academy/opportunities/new">
            <PrimaryButton>
              <Plus size={16} />
              Post Opportunity
            </PrimaryButton>
          </Link>
        }
      />

      {/* METRICS */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Active Opportunities"
          value={activeOpportunities}
          icon={BriefcaseBusiness}
          tone="red"
        />

        <MetricCard
          label="Applications Received"
          value="24"
          icon={ClipboardList}
          tone="blue"
        />

        <MetricCard
          label="Talent Pool Athletes"
          value="128"
          icon={Users}
          tone="red"
        />

        <MetricCard
          label="Active Engagements"
          value={activeEngagements}
          icon={Sparkles}
          tone="blue"
        />

        <MetricCard
          label="Pending Decisions"
          value={pendingDecisions}
          icon={FileCheck2}
          tone="red"
        />
      </div>

      {/* MAIN DASHBOARD */}

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">

        {/* ACTIVE OPPORTUNITIES */}

        <section className="rounded-xl border border-[#f2ff65]/15 bg-[#315038] p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f2ff65]/55">
                Current roles
              </p>

              <h2 className="mt-1 font-['Poppins'] text-lg font-semibold text-[#f2ff65]">
                Active Opportunities
              </h2>
            </div>

            <Link
              to="/academy/opportunities"
              className="text-xs font-semibold text-[#f2ff65] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-[#f2ff65]/10">
            {opportunities.map((opportunity) => (
              <Link
                key={opportunity.id}
                to="/academy/opportunities"
                className="flex items-center justify-between gap-4 py-4 transition-colors hover:bg-[#2a3c2e]/40"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#f7f5ed]">
                    {opportunity.title}
                  </p>

                  <p className="mt-1 text-xs text-[#f7f5ed]/50">
                    {opportunity.sport} · {opportunity.location}
                  </p>
                </div>

                <StatusBadge status={opportunity.status} />
              </Link>
            ))}
          </div>
        </section>

        {/* QUICK ACTIONS */}

        <section className="rounded-xl border border-[#f2ff65]/15 bg-[#2c337f] p-5 sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f2ff65]/60">
            Quick actions
          </p>

          <h2 className="mt-1 font-['Poppins'] text-lg font-semibold text-[#f2ff65]">
            Move your academy forward
          </h2>

          <div className="mt-5 space-y-3">

            <Link
              to="/academy/opportunities/new"
              className="group flex items-center justify-between rounded-lg border border-[#f2ff65]/20 bg-[#07130d]/20 p-4 transition-all hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-3 text-sm font-semibold text-[#f7f5ed]">
                <Plus
                  size={17}
                  className="text-[#f2ff65]"
                />
                Post Opportunity
              </span>

              <ChevronRight
                size={17}
                className="text-[#f2ff65] transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/academy/talent-pool"
              className="group flex items-center justify-between rounded-lg border border-[#f2ff65]/20 bg-[#07130d]/20 p-4 transition-all hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-3 text-sm font-semibold text-[#f7f5ed]">
                <Search
                  size={17}
                  className="text-[#f2ff65]"
                />
                Browse Talent Pool
              </span>

              <ChevronRight
                size={17}
                className="text-[#f2ff65] transition-transform group-hover:translate-x-1"
              />
            </Link>

          </div>
        </section>
      </div>

      {/* RECENT ACTIVITY */}

      <section className="mt-5 rounded-xl border border-[#f2ff65]/15 bg-[#315038] p-5 sm:p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f2ff65]/55">
          Athlete activity
        </p>

        <h2 className="mt-1 font-['Poppins'] text-lg font-semibold text-[#f2ff65]">
          Recent Athlete Activity
        </h2>

        <div className="mt-5">
          <div className="space-y-3">

            {[
              {
                text: "New application received",
                detail: "Assistant Football Coach",
                time: "2 hours ago",
              },
              {
                text: "Athlete added to talent pool",
                detail: "Rahul Sharma",
                time: "5 hours ago",
              },
              {
                text: "Engagement accepted",
                detail: "Youth Development Coach",
                time: "Yesterday",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 rounded-lg border border-[#f2ff65]/10 bg-[#2a3c2e]/50 p-4"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#f2ff65]"
                    strokeWidth={1.5}
                  />

                  <div>
                    <p className="text-sm font-semibold text-[#f7f5ed]">
                      {activity.text}
                    </p>

                    <p className="mt-1 text-xs text-[#f7f5ed]/50">
                      {activity.detail}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 text-[10px] text-[#f7f5ed]/40">
                  {activity.time}
                </span>
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   OPPORTUNITIES
   ========================================================= */

function Opportunities() {
  const { opportunities } = useContext(AcademyContext);

  return (
    <>
      <SectionHeading
        eyebrow="Roles"
        title="Opportunities"
        description="Manage the opportunities your academy has posted."
        action={
          <Link to="/academy/opportunities/new">
            <PrimaryButton>
              <Plus size={16} />
              Post Opportunity
            </PrimaryButton>
          </Link>
        }
      />

      <div className="space-y-3">
        {opportunities.map((opportunity) => (
          <article
            key={opportunity.id}
            className="rounded-xl border border-[#f2ff65]/15 bg-[#315038] p-5 transition-transform hover:-translate-y-0.5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-['Poppins'] text-lg font-semibold text-[#f2ff65]">
                  {opportunity.title}
                </h2>

                <p className="mt-1 text-sm text-[#f7f5ed]/55">
                  {opportunity.sport} · {opportunity.location}
                </p>
              </div>

              <StatusBadge status={opportunity.status} />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   POST OPPORTUNITY
   ========================================================= */

function PostOpportunity() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    sport: "",
    location: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      navigate("/academy/opportunities");
    }, 700);
  };

  return (
    <>
      <SectionHeading
        eyebrow="New role"
        title="Post Opportunity"
        description="Create a sport-specific opportunity for athletes."
      />

      <form
        onSubmit={submit}
        className="max-w-3xl rounded-xl border border-[#f2ff65]/15 bg-[#315038] p-5 sm:p-7"
      >
        <div className="grid gap-5 sm:grid-cols-2">

          <label className="sm:col-span-2">
            <span className="mb-2 block text-xs font-semibold text-[#f2ff65]">
              Role title
            </span>

            <input
              required
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="w-full rounded-md border border-[#f2ff65]/20 bg-[#07130d]/40 px-3 py-3 text-sm text-[#f7f5ed] outline-none placeholder:text-[#f7f5ed]/30 focus:border-[#f2ff65]"
              placeholder="e.g. Assistant Football Coach"
            />
          </label>

          <label>
            <span className="mb-2 block text-xs font-semibold text-[#f2ff65]">
              Sport
            </span>

            <input
              value={form.sport}
              onChange={(e) =>
                setForm({
                  ...form,
                  sport: e.target.value,
                })
              }
              className="w-full rounded-md border border-[#f2ff65]/20 bg-[#07130d]/40 px-3 py-3 text-sm text-[#f7f5ed] outline-none placeholder:text-[#f7f5ed]/30 focus:border-[#f2ff65]"
              placeholder="Football"
            />
          </label>

          <label>
            <span className="mb-2 block text-xs font-semibold text-[#f2ff65]">
              Location
            </span>

            <input
              value={form.location}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value,
                })
              }
              className="w-full rounded-md border border-[#f2ff65]/20 bg-[#07130d]/40 px-3 py-3 text-sm text-[#f7f5ed] outline-none placeholder:text-[#f7f5ed]/30 focus:border-[#f2ff65]"
              placeholder="Pune"
            />
          </label>

          <label className="sm:col-span-2">
            <span className="mb-2 block text-xs font-semibold text-[#f2ff65]">
              Description
            </span>

            <textarea
              required
              rows={6}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="w-full resize-y rounded-md border border-[#f2ff65]/20 bg-[#07130d]/40 px-3 py-3 text-sm text-[#f7f5ed] outline-none placeholder:text-[#f7f5ed]/30 focus:border-[#f2ff65]"
              placeholder="Describe the opportunity, responsibilities and requirements."
            />
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <PrimaryButton type="submit">
            {submitted ? "Posted ✓" : "Post Opportunity"}
          </PrimaryButton>

          <button
            type="button"
            onClick={() =>
              navigate("/academy/opportunities")
            }
            className="px-3 text-sm font-semibold text-[#f7f5ed]/60 hover:text-[#f2ff65]"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

/* =========================================================
   PROFILE
   ========================================================= */

function Profile() {
  const { profile } = useContext(AcademyContext);

  return (
    <>
      <SectionHeading
        eyebrow="Your academy"
        title="Academy Profile"
        description="Manage how your academy appears on Stride."
      />

      <div className="max-w-3xl rounded-xl border border-[#f2ff65]/15 bg-[#315038] p-6">
        <div className="mb-7 flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-[#2c337f] text-[#f2ff65]">
            <Building2 size={24} />
          </div>

          <div>
            <h2 className="font-['Poppins'] text-xl font-bold text-[#f2ff65]">
              {profile.name}
            </h2>

            <p className="text-sm text-[#f7f5ed]/55">
              {profile.sport} · {profile.location}
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {[
            ["Academy", profile.name],
            ["Sport", profile.sport],
            ["Location", profile.location],
            ["Athletes", profile.athletes],
          ].map(([label, value]) => (
            <div
              key={label}
              className="border-b border-[#f2ff65]/10 pb-4"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#f2ff65]/50">
                {label}
              </p>

              <p className="mt-2 text-sm text-[#f7f5ed]">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* =========================================================
   AGREEMENTS
   ========================================================= */

function Agreements() {
  const { agreements } = useContext(AcademyContext);

  return (
    <>
      <SectionHeading
        eyebrow="Partnership records"
        title="Agreements"
        description="Review your current athlete agreements."
      />

      <div className="space-y-3">
        {agreements.map((agreement) => (
          <article
            key={agreement.id}
            className="rounded-xl border border-[#f2ff65]/15 bg-[#315038] p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-['Poppins'] font-semibold text-[#f2ff65]">
                  {agreement.title}
                </p>

                <p className="mt-1 text-sm text-[#f7f5ed]/55">
                  {agreement.athlete}
                </p>
              </div>

              <StatusBadge status={agreement.status} />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   PLACEHOLDER PAGES
   ========================================================= */

function PlaceholderPage({
  eyebrow,
  title,
  description,
  icon,
}) {
  return (
    <>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <EmptyState
        icon={icon}
        title="Coming next"
        description="This section is intentionally UI-only for now. Backend integration will be added after the dashboard design is approved."
      />
    </>
  );
}

/* =========================================================
   SIDEBAR
   ========================================================= */

function Sidebar({
  open,
  setOpen,
  onLogout,
}) {
  return (
    <>
      {/* Mobile hamburger */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed left-5 top-5 z-50 grid h-10 w-10 place-items-center rounded-md border border-[#f2ff65]/20 bg-[#315038] text-[#f2ff65] lg:hidden"
        aria-label="Toggle academy navigation"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}

      {open && (
        <button
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-[#07130d]/70 lg:hidden"
          aria-label="Close navigation"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col border-r border-[#f2ff65]/15 bg-[#315038] px-5 py-7 transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Stride wordmark */}

        <Link
          to="/academy"
          onClick={() => setOpen(false)}
          className="font-['Poppins'] text-3xl font-bold tracking-[-0.07em] text-[#f2ff65]"
        >
          Stride
        </Link>

        <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f7f5ed]/40">
          Academy
        </p>

        <div className="mt-7 h-px bg-[#f2ff65]/15" />

        {/* Navigation */}

        <nav className="mt-6 flex-1 space-y-1 overflow-y-auto">
          {navigation.map(
            ({
              label,
              path,
              icon: Icon,
              end,
            }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all ${
                    isActive
                      ? "bg-[#f2ff65] font-bold text-[#07130d]"
                      : "text-[#f7f5ed]/70 hover:bg-[#2a3c2e] hover:text-[#f2ff65]"
                  }`
                }
              >
                <Icon
                  size={18}
                  strokeWidth={1.6}
                />

                {label}
              </NavLink>
            )
          )}
        </nav>

        {/* Logout */}

        <button
          onClick={onLogout}
          className="mt-6 flex items-center gap-3 border-t border-[#f2ff65]/15 px-3 pt-5 text-sm text-[#f7f5ed]/65 transition-colors hover:text-[#EF4444]"
        >
          <LogOut
            size={18}
            strokeWidth={1.6}
          />

          Logout
        </button>
      </aside>
    </>
  );
}

/* =========================================================
   ACADEMY DASHBOARD
   ========================================================= */

export default function AcademyDashboard({
  onLogout,
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const contextValue = useMemo(
    () => ({
      profile: mockProfile,
      opportunities: mockOpportunities,
      agreements: mockAgreements,
    }),
    []
  );

  const logout = () => {
    if (onLogout) {
      onLogout();
      return;
    }

    window.location.assign("/login");
  };

  return (
    <AcademyContext.Provider value={contextValue}>
      <div className="min-h-screen overflow-x-hidden bg-[#2a3c2e] font-['Inter'] text-[#f7f5ed]">

        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          onLogout={logout}
        />

        <main className="min-h-screen px-5 pb-10 pt-20 sm:px-8 lg:ml-[280px] lg:px-10 lg:pt-10 xl:px-14">
          <div className="mx-auto w-full max-w-[1400px]">

            <Routes>

              <Route
                index
                element={<Overview />}
              />

              <Route
                path="profile"
                element={<Profile />}
              />

              <Route
                path="opportunities"
                element={<Opportunities />}
              />

              <Route
                path="opportunities/new"
                element={<PostOpportunity />}
              />

              <Route
                path="talent-pool"
                element={
                  <PlaceholderPage
                    eyebrow="Athlete discovery"
                    title="Talent Pool"
                    description="Discover and manage athletes your academy may want to engage."
                    icon={Users}
                  />
                }
              />

              <Route
                path="applications"
                element={
                  <PlaceholderPage
                    eyebrow="Candidate management"
                    title="Applications / Candidates"
                    description="Review athletes who have applied to your academy opportunities."
                    icon={ClipboardList}
                  />
                }
              />

              <Route
                path="engagements"
                element={
                  <PlaceholderPage
                    eyebrow="Active work"
                    title="Engagements"
                    description="Track your academy's active athlete engagements."
                    icon={Sparkles}
                  />
                }
              />

              <Route
                path="agreements"
                element={<Agreements />}
              />

              <Route
                path="reviews"
                element={
                  <PlaceholderPage
                    eyebrow="Reputation"
                    title="Reviews"
                    description="Manage reviews and reputation generated through your academy engagements."
                    icon={Star}
                  />
                }
              />

              <Route
                path="settings"
                element={
                  <PlaceholderPage
                    eyebrow="Academy preferences"
                    title="Settings"
                    description="Configure academy preferences and account settings."
                    icon={Settings}
                  />
                }
              />

              <Route
                path="*"
                element={<Overview />}
              />

            </Routes>

          </div>
        </main>
      </div>
    </AcademyContext.Provider>
  );
}