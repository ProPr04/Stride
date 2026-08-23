import React from "react";
import { Check, ShieldCheck, Award, Crown, Sparkles } from "lucide-react";

export const LEVEL_CONFIG = {
  1: {
    label: "Level 1 • Registered",
    shortLabel: "L1 Registered",
    athleteDesc: "Profile created and registered on platform",
    academyDesc: "New Academy registration",
    icon: Check,
    badgeClass: "border-slate-500/30 bg-slate-500/10 text-slate-300",
    iconColor: "text-slate-400",
    glowColor: "rgba(148, 163, 184, 0.15)",
  },
  2: {
    label: "Level 2 • Verified Recruit",
    shortLabel: "L2 Verified",
    athleteDesc: "Recruited & approved by a Level 2+ Academy",
    academyDesc: "Active Academy with athlete applications received",
    icon: ShieldCheck,
    badgeClass: "border-emerald-400/40 bg-emerald-500/15 text-emerald-300",
    iconColor: "text-emerald-400",
    glowColor: "rgba(52, 211, 153, 0.2)",
  },
  3: {
    label: "Level 3 • Certified",
    shortLabel: "L3 Certified",
    athleteDesc: "Certified by a Level 3 Reputed Academy",
    academyDesc: "Reputed Academy with 2+ active athlete recruits",
    icon: Award,
    badgeClass: "border-cyan-400/40 bg-cyan-500/15 text-cyan-300",
    iconColor: "text-cyan-400",
    glowColor: "rgba(34, 211, 238, 0.2)",
  },
  4: {
    label: "Level 4 • Elite Pro",
    shortLabel: "L4 Elite",
    athleteDesc: "Elite Athlete endorsed after long-term engagement tenure",
    academyDesc: "Elite Academy with 5+ recruited athletes",
    icon: Crown,
    badgeClass: "border-amber-400/50 bg-amber-500/20 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.25)]",
    iconColor: "text-amber-400",
    glowColor: "rgba(251, 191, 36, 0.3)",
  },
};

export default function VerificationBadge({
  level = 1,
  type = "athlete",
  size = "md",
  showTooltip = false,
  className = "",
}) {
  const numericLevel = Math.max(1, Math.min(4, parseInt(level, 10) || 1));
  const config = LEVEL_CONFIG[numericLevel] || LEVEL_CONFIG[1];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[9px] gap-1",
    md: "px-2.5 py-1 text-[10px] gap-1.5",
    lg: "px-3 py-1.5 text-xs gap-2",
  };

  const iconSizes = {
    sm: 11,
    md: 13,
    lg: 15,
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border font-mono font-bold uppercase tracking-wide transition-all ${config.badgeClass} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      title={type === "athlete" ? config.athleteDesc : config.academyDesc}
    >
      <Icon size={iconSizes[size] || 13} className={config.iconColor} />
      <span>{config.shortLabel}</span>
      {numericLevel === 4 && <Sparkles size={iconSizes[size] || 11} className="text-amber-300 animate-pulse" />}
    </span>
  );
}
