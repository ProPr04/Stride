import React from "react";
import { CheckCircle2, Circle, Clock, ShieldCheck, Award, Crown, ArrowRight } from "lucide-react";
import { LEVEL_CONFIG } from "./VerificationBadge";

export default function VerificationRoadCard({
  level = 1,
  type = "athlete",
  metrics = {},
  logs = [],
  className = "",
}) {
  const currentLevel = Math.max(1, Math.min(4, parseInt(level, 10) || 1));

  const athleteRoad = [
    {
      level: 1,
      title: "Level 1: Registered",
      req: "Create your athlete profile and verify basic information.",
      achieved: currentLevel >= 1,
    },
    {
      level: 2,
      title: "Level 2: Recruited Athlete",
      req: "Get recruited / accepted into an opportunity by a verified Level 2+ Academy.",
      achieved: currentLevel >= 2,
    },
    {
      level: 3,
      title: "Level 3: Certified Athlete",
      req: "Get recruited and endorsed by a Level 3 Reputed Academy.",
      achieved: currentLevel >= 3,
    },
    {
      level: 4,
      title: "Level 4: Elite Pro",
      req: "Complete contract tenure & get endorsed by a Level 4 Elite Academy.",
      achieved: currentLevel >= 4,
    },
  ];

  const academyRoad = [
    {
      level: 1,
      title: "Level 1: New Academy",
      req: "Register academy profile and list initial sports and facilities.",
      achieved: currentLevel >= 1,
    },
    {
      level: 2,
      title: "Level 2: Active Academy",
      req: "Receive at least 1 athlete application for opportunities. Unlocks Level 2 athlete promotions.",
      achieved: currentLevel >= 2,
      progress: `${metrics.totalApplications || 0} / 1 applied`,
    },
    {
      level: 3,
      title: "Level 3: Reputed Academy",
      req: "Recruit at least 2 verified athletes into agreements. Unlocks Level 3 athlete promotions.",
      achieved: currentLevel >= 3,
      progress: `${metrics.recruitedCount || 0} / 2 recruited`,
    },
    {
      level: 4,
      title: "Level 4: Elite Academy",
      req: "Recruit at least 5 verified athletes. Unlocks Level 4 tenure endorsements.",
      achieved: currentLevel >= 4,
      progress: `${metrics.recruitedCount || 0} / 5 recruited`,
    },
  ];

  const steps = type === "athlete" ? athleteRoad : academyRoad;

  return (
    <div className={`rounded-2xl border border-white/10 bg-[#16251B] p-5 shadow-xl text-[#F7F5ED] ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#F2FF65]">
            TRUST & VERIFICATION ROAD
          </span>
          <h3 className="font-['Poppins'] text-lg font-bold text-white">
            {type === "athlete" ? "Athlete Verification Pathway" : "Academy Reputation Pathway"}
          </h3>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono font-semibold text-emerald-400">
            Current Tier: Level {currentLevel} of 4
          </span>
        </div>
      </div>

      {/* STEP PROGRESSION */}
      <div className="mt-5 space-y-4">
        {steps.map((step) => {
          const isCurrent = step.level === currentLevel;
          const isDone = step.achieved;

          return (
            <div
              key={step.level}
              className={`relative flex items-start gap-3.5 rounded-xl border p-3.5 transition-all ${
                isDone
                  ? "border-emerald-500/30 bg-emerald-950/20"
                  : isCurrent
                  ? "border-[#F2FF65]/40 bg-[#2A3C2E]/60 shadow-[0_0_15px_rgba(242,255,101,0.08)]"
                  : "border-white/5 bg-[#141F16]/50 opacity-60"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 size={18} className="text-emerald-400" />
                ) : (
                  <Circle size={18} className="text-gray-500" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-xs font-bold font-['Poppins'] ${isDone ? "text-emerald-300" : isCurrent ? "text-[#F2FF65]" : "text-gray-300"}`}>
                    {step.title}
                  </h4>

                  {step.progress && (
                    <span className="font-mono text-[10px] bg-black/30 px-2 py-0.5 rounded text-gray-300 border border-white/5">
                      {step.progress}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-[11px] text-gray-400 leading-relaxed">
                  {step.req}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* VERIFICATION HISTORY LOGS (IF ANY) */}
      {logs && logs.length > 0 && (
        <div className="mt-5 border-t border-white/10 pt-4">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">
            AUDIT HISTORY & ENDORSEMENTS ({logs.length})
          </span>
          <div className="mt-2.5 space-y-2">
            {logs.slice(0, 3).map((log, idx) => (
              <div key={idx} className="flex items-center justify-between bg-[#141F16] p-2.5 rounded-lg border border-white/5 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-emerald-400">
                    L{log.old_level} → L{log.new_level}
                  </span>
                  <span className="text-gray-300 truncate max-w-[280px]">
                    {log.reason}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-gray-500 shrink-0">
                  {new Date(log.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
