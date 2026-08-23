import React, { useState } from "react";
import {
  BriefcaseBusiness,
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
  UserRound,
  Users,
  X,
} from "lucide-react";

const navigationItems = [
  { label: "Home", tab: "dashboard", icon: LayoutDashboard },
  { label: "Athletes", tab: "athletes", icon: Users },
  { label: "Opportunities", tab: "opportunities", icon: BriefcaseBusiness },
  { label: "Applications", tab: "applications", icon: ClipboardList },
  { label: "Talent Pool", tab: "talent-pool", icon: Search },
  { label: "Engagements", tab: "engagements", icon: Sparkles },
  { label: "Agreements", tab: "agreements", icon: FileCheck2 },
  { label: "Reviews", tab: "reviews", icon: Star },
  { label: "Academy Profile", tab: "profile", icon: UserRound },
  { label: "Settings", tab: "settings", icon: Settings },
];

export default function AcademySidebar({ activeTab = "dashboard", setActiveTab, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="fixed left-5 top-5 z-50 grid h-10 w-10 place-items-center rounded-md border border-[#F2FF65]/25 bg-[#315038] text-[#F2FF65] lg:hidden" aria-label="Open academy navigation">
        <Menu size={19} />
      </button>

      {isOpen && <button onClick={() => setIsOpen(false)} className="fixed inset-0 z-30 bg-[#07130D]/70 lg:hidden" aria-label="Close academy navigation" />}

      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[252px] flex-col border-r border-[#F2FF65]/15 bg-[#315038] px-4 py-6 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-3">
          <button onClick={() => handleNavigation("dashboard")} className="font-['Poppins'] text-3xl font-bold tracking-[-0.07em] text-[#F2FF65]">
            Stride
          </button>

          <button onClick={() => setIsOpen(false)} className="text-[#F2FF65] lg:hidden" aria-label="Close academy navigation">
            <X size={20} />
          </button>
        </div>

        <button onClick={() => handleNavigation("opportunities")} className="mx-3 mt-8 flex items-center justify-center gap-2 rounded-md bg-[#F2FF65] px-3 py-3 text-sm font-bold text-[#07130D] transition-transform duration-200 hover:-translate-y-0.5">
          <Plus size={17} />
          Add Opportunity
        </button>

        <div className="mx-3 mt-6 h-px bg-[#F2FF65]/20" />

        <nav className="mt-5 flex-1 space-y-1" aria-label="Academy navigation">
          {navigationItems.map(({ label, tab, icon: Icon }) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => handleNavigation(tab)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${isActive ? "bg-[#2A3C2E] font-bold text-[#F2FF65]" : "text-[#F7F5ED]/70 hover:bg-[#2A3C2E] hover:text-[#F2FF65]"}`}
              >
                <Icon size={17} strokeWidth={1.65} />
                {label}
              </button>
            );
          })}
        </nav>

        <button onClick={onLogout} className="mt-5 flex items-center gap-3 border-t border-[#F2FF65]/15 px-3 pt-5 text-sm text-[#F7F5ED]/65 transition-colors hover:text-[#EF4444]">
          <LogOut size={17} strokeWidth={1.65} />
          Logout
        </button>
      </aside>
    </>
  );
}