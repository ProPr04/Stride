
import React, { useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  Sparkles,
  UserRound,
  Users,
  X,
} from "lucide-react";

const navigationItems = [
  {
    number: "01",
    label: "Home",
    tab: "dashboard",
    icon: Home,
  },
  {
    number: "02",
    label: "Opportunities",
    tab: "opportunities",
    icon: BriefcaseBusiness,
  },
  {
    number: "03",
    label: "Applications",
    tab: "applications",
    icon: ClipboardList,
  },
  {
    number: "04",
    label: "Engagements",
    tab: "engagements",
    icon: Sparkles,
  },
  {
    number: "05",
    label: "Academy Profile",
    tab: "profile",
    icon: Building2,
  },
];


export default function AcademySidebar({
  activeTab = "dashboard",
  setActiveTab,
  onLogout,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <>
      {/* =====================================================
          MOBILE MENU BUTTON
      ====================================================== */}

      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-5 top-5 z-50 grid h-10 w-10 place-items-center rounded-md border border-[#F2FF65]/25 bg-[#315038] text-[#F2FF65] lg:hidden"
        aria-label="Open academy navigation"
      >
        <Menu size={19} />
      </button>

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-[#07130D]/70 lg:hidden"
          aria-label="Close academy navigation"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          flex w-[308px] flex-col
          border-r border-[#F2FF65]/15
          bg-[#14241A]
          px-[17px] py-7
          transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* =====================================================
            BRAND
        ====================================================== */}

        <div className="px-3">
          <div className="flex items-start justify-between">
            <button
              onClick={() => handleNavigation("dashboard")}
              className="text-left"
            >
              <div className="font-['Poppins'] text-[28px] font-extrabold leading-none tracking-[-0.07em] text-[#F7F5ED]">
                STRIDE<span className="text-[#F2FF65]">.</span>
              </div>

              <p className="mt-2 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#F2FF65]">
                Academy
              </p>
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-1 text-[#F2FF65] lg:hidden"
              aria-label="Close academy navigation"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* =====================================================
            BRAND DIVIDER
        ====================================================== */}

        <div className="mx-0 mt-7 h-px bg-[#F2FF65]/15" />

        {/* =====================================================
            NAVIGATION
        ====================================================== */}

        <nav
          className="mt-7 flex-1 space-y-2"
          aria-label="Academy navigation"
        >
          {navigationItems.map(
            ({ number, label, tab, icon: Icon }) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => handleNavigation(tab)}
                  className={`
                    group
                    flex w-full items-center
                    gap-4
                    rounded-xl
                    border
                    px-3 py-3.5
                    text-left
                    transition-all duration-200
                    ${
                      isActive
                        ? "border-[#F2FF65]/70 bg-[#14241A] text-[#F2FF65]"
                        : "border-transparent text-[#F7F5ED]/75 hover:border-[#F2FF65]/25 hover:bg-[#1C3022] hover:text-[#F2FF65]"
                    }
                  `}
                >
              

                  {/* Icon */}

                  <Icon
                    size={18}
                    strokeWidth={1.7}
                    className={`
                      shrink-0
                      ${
                        isActive
                          ? "text-[#F2FF65]"
                          : "text-[#F7F5ED]/60 group-hover:text-[#F2FF65]"
                      }
                    `}
                  />

                  {/* Label */}

                  <span
                    className={`
                      font-['Poppins']
                      text-[13px]
                      font-bold
                      uppercase
                      tracking-[0.02em]
                      ${
                        isActive
                          ? "text-[#F2FF65]"
                          : "text-[#F7F5ED]/80"
                      }
                    `}
                  >
                    {label}
                  </span>
                </button>
              );
            }
          )}
        </nav>

        {/* =====================================================
            LOGOUT
        ====================================================== */}

        <div className="mt-auto border-t border-[#F2FF65]/15 pt-5">
          <button
            onClick={onLogout}
            className="
              group
              flex w-full
              items-center
              gap-4
              px-3 py-3
              text-left
              text-[#F7F5ED]/65
              transition-colors
              hover:text-[#EF4444]
            "
          >
            <span className="w-[20px]" />

            <LogOut
              size={17}
              strokeWidth={1.65}
              className="transition-colors group-hover:text-[#EF4444]"
            />

            <span className="font-['Poppins'] text-[13px] font-bold uppercase tracking-[0.02em]">
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

