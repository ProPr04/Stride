import React from "react";
import { BadgeCheck, Building2, MapPin, UserRound } from "lucide-react";

export default function AcademyHeader({ academy = {}, onProfileClick }) {
  const name = academy.name || academy.academyName || "Stride Academy";
  const type = academy.type || academy.academyType || "Sports Academy";
  const location = academy.location || academy.city || "India";
  const avatar = academy.avatar || academy.logo || academy.image;

  return (
    <header className="flex flex-col gap-4 border-b border-[#F2FF65]/20 bg-[#2A3C2E] pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#F2FF65]/25 bg-[#315038] text-[#F2FF65]">
          <Building2 size={20} strokeWidth={1.5} />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="truncate font-['Poppins'] text-base font-semibold tracking-[-0.03em] text-[#F2FF65] sm:text-lg">
              {name}
            </h1>

            {academy.verified && (
              <BadgeCheck
                size={16}
                className="shrink-0 text-[#3B82F6]"
                fill="currentColor"
                strokeWidth={2.25}
              />
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#F7F5ED]/65">
            <span>{type}</span>

            <span className="hidden h-1 w-1 rounded-full bg-[#F2FF65]/55 sm:block" />

            <span className="inline-flex items-center gap-1">
              <MapPin size={13} />
              {location}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onProfileClick}
        className="group flex w-fit items-center gap-3 rounded-xl border border-[#F2FF65]/25 bg-[#315038] px-3 py-2.5 text-left shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F2FF65]/60 hover:bg-[#2C337F] hover:shadow-[0_8px_22px_rgba(0,0,0,0.2)]"
        aria-label="Open academy profile"
      >
        <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-[#F2FF65]/30 bg-[#2C337F] text-[#F2FF65] transition-transform duration-200 group-hover:scale-105">
          {avatar ? (
            <img src={avatar} alt={name} className="h-full w-full object-cover" />
          ) : (
            <UserRound size={18} strokeWidth={1.5} />
          )}
        </div>

        <div className="hidden sm:block">
          <p className="max-w-[140px] truncate text-xs font-semibold text-[#F7F5ED]">
            {name}
          </p>
          <p className="mt-0.5 text-[10px] font-medium text-[#F2FF65]">
            Academy Profile
          </p>
        </div>

        <span className="hidden text-[#F2FF65]/60 transition-transform duration-200 group-hover:translate-x-0.5 sm:block">
          →
        </span>
      </button>
    </header>
  );
}