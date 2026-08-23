import React from "react";
import { Building2, MapPin } from "lucide-react";

export default function AcademyHeader({
  academy = {},
  onProfileClick,
}) {
  const name =
    academy.name ||
    academy.academyName ||
    "Stride Sports Academy";

  const location =
    academy.location ||
    academy.city ||
    "India";

  const avatar =
    academy.avatar ||
    academy.logo ||
    academy.image;

  return (
    <header className="flex items-center justify-end border-b border-[#F2FF65]/20 bg-[#2A3C2E] px-1 pb-4 pt-1">

      <div className="flex items-center gap-2.5">

        {/* =================================================
            CLICKABLE ACADEMY ICON
        ================================================= */}

        <button
          type="button"
          onClick={onProfileClick}
          className="group grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-[#F2FF65]/30 bg-[#315038] text-[#F2FF65] transition-all duration-200 hover:scale-105 hover:border-[#F2FF65]/70 hover:bg-[#2C337F]"
          aria-label="Open academy profile"
        >
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <Building2
              size={17}
              strokeWidth={1.6}
              className="transition-transform duration-200 group-hover:scale-110"
            />
          )}
        </button>

        {/* =================================================
            ACADEMY INFO
            Name hidden on mobile
        ================================================= */}

        <div className="min-w-0">

          {/* H2-style academy name */}
          <h2 className="hidden truncate font-['Poppins'] text-lg font-semibold tracking-[-0.025em] text-[#F7F5ED] sm:block">
            {name}
          </h2>

          {/* Location always visible */}
          <div className="flex items-center gap-1 text-[10px] font-medium text-[#F7F5ED]/50 sm:mt-0.5 sm:text-[11px]">
            <MapPin
              size={11}
              strokeWidth={1.7}
              className="shrink-0 text-[#F2FF65]/70"
            />

            <span className="truncate">
              {location}
            </span>
          </div>

        </div>

      </div>
    </header>
  );
}