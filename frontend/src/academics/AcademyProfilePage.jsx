
import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Award,
  BadgeCheck,
  Building2,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Dumbbell,
  Edit3,
  Image as ImageIcon,
  Lock,
  MapPin,
  Medal,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Star,
  Trash2,
  Trophy,
  Upload,
  UserRound,
  Users,
  X,
} from "lucide-react";
import api from "../services/api";

const fallbackVerification = [];

const fallbackCoaches = [];

const fallbackPrograms = [];

const fallbackOpportunities = [];

function StatusBadge({ children, verified = true }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.08em] ${
        verified
          ? "border-lime/30 bg-lime/10 text-lime"
          : "border-[#F7F5ED]/20 bg-white/5 text-[#F7F5ED]/60"
      }`}
    >
      {verified ? (
        <CheckCircle2 size={12} />
      ) : (
        <Lock size={12} />
      )}
      {children}
    </span>
  );
}

function SectionHeader({ title, eyebrow, icon: Icon }) {
  return (
    <div className="panel-header flex items-center justify-between">
      <div>
        {eyebrow && (
          <p className="mb-1 font-mono text-[9px] font-bold tracking-[0.18em] text-lime/55">
            {eyebrow}
          </p>
        )}

        <h3 className="panel-title-display">{title}</h3>
      </div>

      {Icon && (
        <Icon
          size={19}
          className="text-lime"
          strokeWidth={1.5}
        />
      )}
    </div>
  );
}

function GlassPanel({ children, className = "" }) {
  return (
    <div
      className={`court-panel-container overflow-hidden backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================================================
   HORIZONTAL CAROUSEL
========================================================= */

function HorizontalCarousel({
  children,
  itemCount,
  title,
  onViewMore,
}) {
  const [scrollContainer, setScrollContainer] =
    useState(null);

  const scroll = (direction) => {
    if (!scrollContainer) return;

    scrollContainer.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="grid h-8 w-8 place-items-center rounded-full border border-lime/20 bg-white/5 text-lime transition-colors hover:border-lime/50 hover:bg-lime/10"
            aria-label={`Previous ${title}`}
          >
            <ChevronLeft size={15} />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="grid h-8 w-8 place-items-center rounded-full border border-lime/20 bg-white/5 text-lime transition-colors hover:border-lime/50 hover:bg-lime/10"
            aria-label={`Next ${title}`}
          >
            <ChevronRight size={15} />
          </button>
        </div>

        {itemCount > 3 && onViewMore && (
          <button
            type="button"
            onClick={onViewMore}
            className="inline-flex items-center gap-1 border-b border-lime pb-1 font-mono text-[10px] font-bold tracking-[0.08em] text-lime transition-opacity hover:opacity-75"
          >
            VIEW MORE
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      <div
        ref={setScrollContainer}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   VIEW MORE MODAL
========================================================= */

function CollectionModal({
  title,
  eyebrow,
  items,
  type,
  onClose,
}) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#07130D]/80 p-4 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-xl border border-lime/20 bg-[#315038] shadow-2xl">
        <div className="flex items-start justify-between border-b border-lime/15 p-5 sm:p-6">
          <div>
            <p className="font-mono text-[9px] font-bold tracking-[0.18em] text-lime/55">
              {eyebrow}
            </p>

            <h2 className="mt-2 font-['Poppins'] text-2xl font-semibold tracking-[-0.04em] text-lime">
              {title}
            </h2>

            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#F7F5ED]/40">
              {items.length} RECORDS
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-lime/20 text-lime transition-colors hover:bg-white/5"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[72vh] overflow-y-auto p-5 sm:p-6">
          {type === "programs" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((program) => (
                <article
                  key={program.id || program.title}
                  className="border border-lime/15 bg-[#315038]/60 p-5"
                >
                  <Dumbbell
                    size={20}
                    className="text-lime"
                    strokeWidth={1.5}
                  />

                  <p className="mt-6 font-mono text-[9px] font-bold tracking-[0.13em] text-lime/55">
                    {program.discipline ||
                      program.sport ||
                      "PROGRAM"}
                  </p>

                  <h3 className="mt-2 font-mono text-sm font-bold leading-5 tracking-[0.04em] text-lime">
                    {program.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#F7F5ED]/65">
                    {program.description}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((coach) => (
                <article
                  key={coach.id || coach.name}
                  className="border border-lime/15 bg-[#315038]/60 p-5"
                >
                  <div className="flex items-start justify-between">
                    <div className="grid h-14 w-14 place-items-center overflow-hidden bg-[#2C337F] text-lime">
                      {coach.avatar || coach.image ? (
                        <img
                          src={coach.avatar || coach.image}
                          alt={coach.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserRound
                          size={23}
                          strokeWidth={1.5}
                        />
                      )}
                    </div>

                    {coach.verified && (
                      <BadgeCheck
                        size={20}
                        className="text-[#3B82F6]"
                        fill="currentColor"
                        strokeWidth={2.2}
                      />
                    )}
                  </div>

                  <h3 className="mt-5 font-mono text-sm font-bold tracking-[0.05em] text-lime">
                    {coach.name}
                  </h3>

                  <p className="mt-1 text-sm text-[#F7F5ED]/70">
                    {coach.role}
                  </p>

                  <div className="mt-4 border-t border-lime/15 pt-3">
                    <p className="font-mono text-[9px] font-bold tracking-[0.1em] text-[#F7F5ED]/50">
                      {coach.experience ||
                        coach.experienceYears ||
                        "—"}{" "}
                      EXPERIENCE
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   EDIT PROFILE MODAL
========================================================= */

function EditProfileModal({
  academy = {},
  onClose,
  onSave,
}) {
  const fileInputRef = useRef(null);
  const achievementRefs = useRef({});
  const previousAchievementCount = useRef(0);

  const [form, setForm] = useState({
    name:
      academy.academy_name ||
      academy.academyName ||
      academy.name ||
      "Partner Sports Academy",

    tagline:
      academy.tagline ||
      academy.description ||
      "",

    location:
      academy.location ||
      academy.city ||
      "Pune, Maharashtra",

    founded:
      academy.founded ||
      "2018",

    competitiveLevel:
      academy.competitive_level ||
      academy.competitiveLevel ||
      "National / State",

    primarySports:
      Array.isArray(academy.primary_sports) &&
      academy.primary_sports.length
        ? academy.primary_sports.join(", ")
        : Array.isArray(academy.sports_offered) &&
          academy.sports_offered.length
        ? academy.sports_offered.join(", ")
        : academy.primary_sports ||
          academy.primarySports ||
          academy.sports_offered ||
          "Cricket, Football, Tennis",

    activeAthletes:
      academy.stats?.active_athletes ?? (academy.activeAthletes ?? 48),

    personalBests:
      academy.stats?.personal_bests ?? (academy.personalBests ?? 27),

    competitionMedals:
      academy.stats?.competition_medals ?? (academy.competitionMedals ?? 14),

    nationalQualifiers:
      academy.stats?.national_qualifiers ?? (academy.nationalQualifiers ?? 11),

    scholarships:
      academy.stats?.scholarships ?? (academy.scholarships ?? 6),

    image:
      academy.logo_url ||
      academy.logo ||
      academy.avatar ||
      academy.image ||
      "",

    programs:
      Array.isArray(academy.programs) &&
      academy.programs.length
        ? academy.programs
        : fallbackPrograms,

    achievements:
      Array.isArray(academy.recent_achievements) &&
      academy.recent_achievements.length
        ? academy.recent_achievements.map((achievement, index) => ({
            id:
              achievement.id ||
              `achievement-existing-${index}`,
            title: achievement.title || "",
            date: achievement.date || "",
          }))
        : Array.isArray(academy.recentAchievements) &&
          academy.recentAchievements.length
        ? academy.recentAchievements.map((achievement, index) => ({
            id:
              achievement.id ||
              `achievement-existing-${index}`,
            title: achievement.title || "",
            date: achievement.date || "",
          }))
        : Array.isArray(academy.achievements) &&
          academy.achievements.length
        ? academy.achievements.map((achievement, index) => ({
            id:
              achievement.id ||
              `achievement-existing-${index}`,
            title: achievement.title || "",
            date: achievement.date || "",
          }))
        : [
            {
              id: "achievement-1",
              title:
                "Four athletes reached national qualifying standards",
              date: "THIS SEASON",
            },
            {
              id: "achievement-2",
              title:
                "Sprint squad achieved seven verified personal bests",
              date: "LAST 30 DAYS",
            },
            {
              id: "achievement-3",
              title:
                "Academy athletes secured three competition medals",
              date: "RECENT EVENT",
            },
          ],
  });

  /*
  ============================================================
  FIELD UPDATE
  ============================================================
  */

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /*
  ============================================================
  IMAGE UPLOAD
  ============================================================
  */

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const response = await api.upload.image(file);

      if (response.data?.url) {
        if (
          form.image &&
          form.image.includes("/uploads/")
        ) {
          api.upload.deleteImage(form.image);
        }

        updateField("image", response.data.url);
      }
    } catch (error) {
      alert(
        "Failed to upload logo: " +
          error.message
      );
    }
  };

  const handleRemoveImage = () => {
    if (
      form.image &&
      form.image.includes("/uploads/")
    ) {
      api.upload.deleteImage(form.image);
    }

    updateField("image", "");
  };

  /*
  ============================================================
  PROGRAMS
  ============================================================
  */

  const updateProgram = (
    index,
    field,
    value
  ) => {
    setForm((previous) => {
      const programs = [
        ...previous.programs,
      ];

      programs[index] = {
        ...programs[index],
        [field]: value,
      };

      return {
        ...previous,
        programs,
      };
    });
  };

  const addProgram = () => {
    setForm((previous) => ({
      ...previous,

      programs: [
        ...previous.programs,

        {
          id: `program-${Date.now()}`,
          title: "New Training Program",
          discipline: "PROGRAM",
          description:
            "Add a description for this training program.",
        },
      ],
    }));
  };

  const removeProgram = (index) => {
    setForm((previous) => ({
      ...previous,

      programs:
        previous.programs.filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),
    }));
  };

  /*
  ============================================================
  ACHIEVEMENTS
  ============================================================
  */

  const updateAchievement = (
    index,
    field,
    value
  ) => {
    setForm((previous) => {
      const achievements = [
        ...previous.achievements,
      ];

      achievements[index] = {
        ...achievements[index],
        [field]: value,
      };

      return {
        ...previous,
        achievements,
      };
    });
  };

  /*
  ------------------------------------------------------------
  ADD ACHIEVEMENT
  ------------------------------------------------------------
  */

  const addAchievement = () => {
    setForm((previous) => ({
      ...previous,

      achievements: [
        ...previous.achievements,

        {
          id: `achievement-${Date.now()}`,
          title: "",
          date: "",
        },
      ],
    }));
  };

  const removeAchievement = (index) => {
    setForm((previous) => ({
      ...previous,

      achievements:
        previous.achievements.filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),
    }));
  };

  /*
  ============================================================
  AUTO-SCROLL TO NEW ACHIEVEMENT
  ============================================================
  */

  useEffect(() => {
    const currentCount =
      form.achievements.length;

    const previousCount =
      previousAchievementCount.current;

    if (currentCount > previousCount) {
      const newestAchievement =
        form.achievements[
          form.achievements.length - 1
        ];

      if (newestAchievement?.id) {
        requestAnimationFrame(() => {
          const element =
            achievementRefs.current[
              newestAchievement.id
            ];

          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });

            const input =
              element.querySelector(
                "input"
              );

            if (input) {
              setTimeout(() => {
                input.focus();
              }, 350);
            }
          }
        });
      }
    }

    previousAchievementCount.current =
      currentCount;
  }, [form.achievements.length]);

  /*
  ============================================================
  SAVE
  ============================================================
  */

  const handleSave = () => {
    const sportsList = form.primarySports
      ? form.primarySports
          .split(",")
          .map((sport) => sport.trim())
          .filter(Boolean)
      : ["General Sports"];

    const activeAthletesNum = parseInt(form.activeAthletes, 10) || 0;
    const personalBestsNum = parseInt(form.personalBests, 10) || 0;
    const competitionMedalsNum = parseInt(form.competitionMedals, 10) || 0;
    const nationalQualifiersNum = parseInt(form.nationalQualifiers, 10) || 0;
    const scholarshipsNum = parseInt(form.scholarships, 10) || 0;

    onSave?.({
      ...academy,

      academy_name: form.name.trim(),
      name: form.name.trim(),
      academyName: form.name.trim(),

      tagline: form.tagline.trim(),
      description: form.tagline.trim(),

      location: form.location.trim(),
      city: form.location.trim(),

      founded: String(form.founded).trim(),
      competitive_level: String(form.competitiveLevel).trim(),
      competitiveLevel: String(form.competitiveLevel).trim(),

      primary_sports: sportsList,
      sports_offered: sportsList,
      primarySports: form.primarySports,

      logo_url: form.image,
      logo: form.image,
      image: form.image,

      stats: {
        ...(academy.stats || {}),
        active_athletes: activeAthletesNum,
        personal_bests: personalBestsNum,
        competition_medals: competitionMedalsNum,
        national_qualifiers: nationalQualifiersNum,
        scholarships: scholarshipsNum,
      },

      activeAthletes: activeAthletesNum,
      personalBests: personalBestsNum,
      competitionMedals: competitionMedalsNum,
      nationalQualifiers: nationalQualifiersNum,
      scholarships: scholarshipsNum,

      programs: form.programs,

      recent_achievements: form.achievements,
      recentAchievements: form.achievements,
    });

    onClose();
  };

  /*
  ============================================================
  UI
  ============================================================
  */

  return (
    <div
      className="
        fixed inset-0 z-[80]
        flex items-center justify-center
        bg-[#030704]/90
        p-3
        backdrop-blur-xl
        sm:p-6
      "
      role="dialog"
      aria-modal="true"
      aria-label="Edit academy profile"
    >

      {/* =====================================================
          MODAL
      ====================================================== */}

      <div
        className="
          flex
          max-h-[94vh]
          w-full
          max-w-5xl
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-[#F2FF65]/10
          bg-[#090F0B]
          shadow-[0_30px_100px_rgba(0,0,0,0.75)]
        "
      >

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div
          className="
            shrink-0
            border-b
            border-white/[0.06]
            bg-[#0D1710]
            px-5
            py-5
            sm:px-7
            sm:py-6
          "
        >
          <div className="flex items-start justify-between gap-5">

            <div>

              <div className="flex items-center gap-2">

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#F2FF65]
                    shadow-[0_0_10px_rgba(242,255,101,0.5)]
                  "
                />

                <p
                  className="
                    font-mono
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#F2FF65]
                  "
                >
                  Academy Identity
                </p>

              </div>

              <h2
                className="
                  mt-2
                  font-['Poppins']
                  text-2xl
                  font-black
                  uppercase
                  tracking-wider
                  text-white
                  sm:text-3xl
                "
              >
                Edit your academy
                <span className="text-[#F2FF65]">
                  {" "}profile
                </span>
              </h2>

              <p
                className="
                  mt-1.5
                  max-w-xl
                  text-xs
                  leading-relaxed
                  text-white/70
                "
              >
                Keep your academy presence
                accurate, credible and ready
                for athletes discovering
                opportunities on Stride.
              </p>

            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                grid
                h-9
                w-9
                shrink-0
                place-items-center
                rounded-lg
                border
                border-white/[0.08]
                bg-white/[0.025]
                text-[#F7F5ED]/50
                transition-all
                hover:border-[#F2FF65]/30
                hover:bg-[#F2FF65]/5
                hover:text-[#F2FF65]
              "
              aria-label="Close edit profile"
            >
              <X size={17} />
            </button>

          </div>
        </div>

        {/* ===================================================
            SCROLLABLE BODY
        ==================================================== */}

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            bg-[#090F0B]
            px-5
            py-6
            sm:px-7
            sm:py-7

            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-white/10
            hover:[&::-webkit-scrollbar-thumb]:bg-white/15
          "
        >

          {/* =================================================
              01 / IDENTITY
          ================================================== */}

          <section>

            <SectionHeading
              eyebrow="01 / IDENTITY"
              title="Academy presence"
              description="The information athletes see first."
            />

            <div
              className="
                mt-5
                grid
                gap-5
                lg:grid-cols-[minmax(0,1fr)_280px]
              "
            >

              {/* BASIC INFORMATION */}

              <div
                className="
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-[#0D1710]
                  p-5
                "
              >

                <div className="grid gap-4 sm:grid-cols-2">

                  <EditField
                    label="Academy Name"
                    value={form.name}
                    onChange={(value) =>
                      updateField(
                        "name",
                        value
                      )
                    }
                  />

                  <EditField
                    label="Location"
                    value={form.location}
                    onChange={(value) =>
                      updateField(
                        "location",
                        value
                      )
                    }
                  />

                  <EditField
                    label="Primary Sports"
                    value={
                      form.primarySports
                    }
                    onChange={(value) =>
                      updateField(
                        "primarySports",
                        value
                      )
                    }
                  />

                  <EditField
                    label="Founded Year"
                    value={form.founded}
                    onChange={(value) =>
                      updateField(
                        "founded",
                        value
                      )
                    }
                  />

                  <div className="sm:col-span-2">

                    <EditField
                      label="Competitive Level"
                      value={form.competitiveLevel}
                      onChange={(value) =>
                        updateField(
                          "competitiveLevel",
                          value
                        )
                      }
                    />

                  </div>

                  <div className="sm:col-span-2">

                    <EditField
                      label="About the Academy"
                      value={form.tagline}
                      onChange={(value) =>
                        updateField(
                          "tagline",
                          value
                        )
                      }
                      textarea
                    />

                  </div>

                </div>

              </div>

              {/* LOGO */}

              <div
                className="
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-[#0D1710]
                  p-5
                "
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p
                      className="
                        font-mono
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-[#F2FF65]/55
                      "
                    >
                      Brand Asset
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        font-medium
                        text-[#F7F5ED]/75
                      "
                    >
                      Academy logo
                    </p>

                  </div>

                  <ImageIcon
                    size={15}
                    className="text-[#F2FF65]/50"
                  />

                </div>

                <div
                  className="
                    mt-5
                    flex
                    flex-col
                    items-center
                  "
                >

                  <div
                    className="
                      grid
                      h-24
                      w-24
                      place-items-center
                      overflow-hidden
                      rounded-2xl
                      border
                      border-[#F2FF65]/15
                      bg-[#080E0A]
                      shadow-inner
                    "
                  >

                    {form.image ? (
                      <img
                        src={form.image}
                        alt="Academy logo preview"
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />
                    ) : (
                      <Building2
                        size={30}
                        strokeWidth={1.4}
                        className="text-[#F2FF65]/45"
                      />
                    )}

                  </div>

                  <p
                    className="
                      mt-3
                      text-center
                      text-[10px]
                      leading-4
                      text-[#F7F5ED]/35
                    "
                  >
                    Use a clear logo or academy
                    <br />
                    identity image.
                  </p>

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-lg
                        border
                        border-[#F2FF65]/15
                        bg-[#F2FF65]/5
                        px-3
                        py-2
                        font-mono
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.08em]
                        text-[#F2FF65]
                        transition-all
                        hover:border-[#F2FF65]/30
                        hover:bg-[#F2FF65]/10
                      "
                    >
                      <Camera size={11} />
                      Upload
                    </button>

                    {form.image && (
                      <button
                        type="button"
                        onClick={
                          handleRemoveImage
                        }
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-lg
                          border
                          border-red-500/10
                          bg-red-500/5
                          px-3
                          py-2
                          font-mono
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.08em]
                          text-red-400
                          transition-all
                          hover:bg-red-500/10
                        "
                      >
                        <Trash2 size={11} />
                        Remove
                      </button>
                    )}

                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={
                      handleImageUpload
                    }
                    className="hidden"
                  />

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              02 / ACADEMY IMPACT
          ================================================== */}

          <section
            className="
              mt-10
              border-t
              border-white/[0.06]
              pt-8
            "
          >

            <SectionHeading
              eyebrow="02 / ACADEMY IMPACT"
              title="Impact & Active Metrics"
              description="Update your academy's numbers displayed across Stride."
            />

            <div
              className="
                mt-5
                rounded-xl
                border
                border-white/[0.06]
                bg-[#0D1710]
                p-5
              "
            >

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <EditField
                  label="Active Athletes"
                  value={form.activeAthletes}
                  onChange={(value) =>
                    updateField(
                      "activeAthletes",
                      value
                    )
                  }
                />

                <EditField
                  label="Personal Bests"
                  value={form.personalBests}
                  onChange={(value) =>
                    updateField(
                      "personalBests",
                      value
                    )
                  }
                />

                <EditField
                  label="Competition Medals"
                  value={form.competitionMedals}
                  onChange={(value) =>
                    updateField(
                      "competitionMedals",
                      value
                    )
                  }
                />

                <EditField
                  label="National Qualifiers"
                  value={form.nationalQualifiers}
                  onChange={(value) =>
                    updateField(
                      "nationalQualifiers",
                      value
                    )
                  }
                />

                <EditField
                  label="Scholarships / Placements"
                  value={form.scholarships}
                  onChange={(value) =>
                    updateField(
                      "scholarships",
                      value
                    )
                  }
                />

              </div>

            </div>

          </section>

          {/* =================================================
              03 / PROGRAMS
          ================================================== */}

          <section
            className="
              mt-10
              border-t
              border-white/[0.06]
              pt-8
            "
          >

            <div
              className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >

              <SectionHeading
                eyebrow="03 / DEVELOPMENT"
                title="Training programs"
                description="Define the pathways athletes can pursue."
              />

              <button
                type="button"
                onClick={addProgram}
                className="
                  inline-flex
                  w-fit
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-[#F2FF65]/15
                  bg-[#F2FF65]/5
                  px-3
                  py-2
                  font-mono
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-[#F2FF65]
                  transition-all
                  hover:border-[#F2FF65]/30
                  hover:bg-[#F2FF65]/10
                "
              >
                <Plus size={12} />
                Add program
              </button>

            </div>

            <div className="mt-5 grid gap-3">

              {Array.isArray(form.programs) &&
                form.programs.map(
                  (program, index) => (
                    <div
                      key={
                        program.id ||
                        `${program.title}-${index}`
                      }
                      className="
                        group
                        rounded-xl
                        border
                        border-white/[0.06]
                        bg-[#0D1710]
                        p-4
                        transition-colors
                        hover:border-[#F2FF65]/10
                        sm:p-5
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-2.5
                          "
                        >

                          <span
                            className="
                              grid
                              h-7
                              w-7
                              place-items-center
                              rounded-md
                              bg-[#080E0A]
                              font-mono
                              text-[8px]
                              font-bold
                              text-[#F2FF65]/60
                            "
                          >
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </span>

                          <p
                            className="
                              font-mono
                              text-[8px]
                              font-bold
                              uppercase
                              tracking-[0.12em]
                              text-[#F7F5ED]/35
                            "
                          >
                            Training pathway
                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeProgram(
                              index
                            )
                          }
                          className="
                            text-[#F7F5ED]/25
                            transition-colors
                            hover:text-red-400
                          "
                          aria-label="Remove program"
                        >
                          <X size={15} />
                        </button>

                      </div>

                      <div
                        className="
                          mt-4
                          grid
                          gap-4
                          sm:grid-cols-2
                        "
                      >

                        <EditField
                          label="Program Title"
                          value={
                            program.title ||
                            ""
                          }
                          onChange={(value) =>
                            updateProgram(
                              index,
                              "title",
                              value
                            )
                          }
                        />

                        <EditField
                          label="Discipline"
                          value={
                            program.discipline ||
                            ""
                          }
                          onChange={(value) =>
                            updateProgram(
                              index,
                              "discipline",
                              value
                            )
                          }
                        />

                        <div className="sm:col-span-2">

                          <EditField
                            label="Program Description"
                            value={
                              program.description ||
                              ""
                            }
                            onChange={(value) =>
                              updateProgram(
                                index,
                                "description",
                                value
                              )
                            }
                            textarea
                          />

                        </div>

                      </div>

                    </div>
                  )
                )}

            </div>

          </section>

          {/* =================================================
              03 / ACHIEVEMENTS
          ================================================== */}

          <section
            className="
              mt-10
              border-t
              border-white/[0.06]
              pt-8
            "
          >

            <div
              className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >

              <SectionHeading
                eyebrow="04 / PROOF OF PERFORMANCE"
                title="Recent achievements"
                description="Show athletes what your academy is accomplishing."
              />

              <button
                type="button"
                onClick={addAchievement}
                className="
                  inline-flex
                  w-fit
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-[#F2FF65]/20
                  bg-[#F2FF65]/5
                  px-3
                  py-2
                  font-mono
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-[#F2FF65]
                  transition-all
                  hover:border-[#F2FF65]/40
                  hover:bg-[#F2FF65]/10
                  hover:shadow-[0_0_20px_rgba(242,255,101,0.05)]
                  active:scale-[0.98]
                "
              >
                <Plus size={12} />
                Add achievement
              </button>

            </div>

            {/* ACHIEVEMENT LIST */}

            <div className="mt-5 grid gap-3">

              {Array.isArray(form.achievements) &&
                form.achievements.map(
                  (
                    achievement,
                    index
                  ) => (
                    <div
                      key={
                        achievement.id ||
                        `achievement-${index}`
                      }
                      ref={(element) => {
                        if (
                          achievement.id
                        ) {
                          achievementRefs.current[
                            achievement.id
                          ] = element;
                        }
                      }}
                      className="
                        group
                        rounded-xl
                        border
                        border-white/[0.06]
                        bg-[#0D1710]
                        p-4
                        transition-all
                        duration-300
                        hover:border-[#F2FF65]/10
                        sm:p-5
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-2.5
                          "
                        >

                          <span
                            className="
                              grid
                              h-7
                              w-7
                              place-items-center
                              rounded-md
                              bg-[#080E0A]
                              font-mono
                              text-[8px]
                              font-bold
                              text-[#F2FF65]/60
                            "
                          >
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </span>

                          <div>

                            <p
                              className="
                                font-mono
                                text-[8px]
                                font-bold
                                uppercase
                                tracking-[0.12em]
                                text-[#F7F5ED]/35
                              "
                            >
                              Achievement
                            </p>

                            {achievement.title ===
                              "" && (
                              <p
                                className="
                                  mt-0.5
                                  text-[9px]
                                  text-[#F2FF65]/40
                                "
                              >
                                New achievement
                              </p>
                            )}

                          </div>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeAchievement(
                              index
                            )
                          }
                          className="
                            rounded-md
                            p-1
                            text-[#F7F5ED]/25
                            transition-all
                            hover:bg-red-500/5
                            hover:text-red-400
                          "
                          aria-label="Remove achievement"
                        >
                          <X size={15} />
                        </button>

                      </div>

                      <div
                        className="
                          mt-4
                          grid
                          gap-4
                          sm:grid-cols-[minmax(0,1fr)_180px]
                        "
                      >

                        <EditField
                          label="Achievement"
                          value={
                            achievement.title ||
                            ""
                          }
                          onChange={(value) =>
                            updateAchievement(
                              index,
                              "title",
                              value
                            )
                          }
                        />

                        <EditField
                          label="Date / Period"
                          value={
                            achievement.date ||
                            ""
                          }
                          onChange={(value) =>
                            updateAchievement(
                              index,
                              "date",
                              value
                            )
                          }
                        />

                      </div>

                    </div>
                  )
                )}

            </div>

            {/* EMPTY STATE */}

            {(!Array.isArray(
              form.achievements
            ) ||
              form.achievements.length ===
                0) && (
              <div
                className="
                  mt-5
                  rounded-xl
                  border
                  border-dashed
                  border-white/[0.08]
                  bg-[#0B130D]
                  px-6
                  py-10
                  text-center
                "
              >

                <div
                  className="
                    mx-auto
                    grid
                    h-10
                    w-10
                    place-items-center
                    rounded-lg
                    bg-[#F2FF65]/5
                    text-[#F2FF65]/50
                  "
                >
                  <Plus size={17} />
                </div>

                <p
                  className="
                    mt-3
                    text-[11px]
                    font-medium
                    text-[#F7F5ED]/55
                  "
                >
                  No achievements added yet
                </p>

                <p
                  className="
                    mt-1
                    text-[9px]
                    text-[#F7F5ED]/25
                  "
                >
                  Add your academy's latest
                  performance milestones.
                </p>

              </div>
            )}

          </section>

        </div>

        {/* ===================================================
            FOOTER
        ==================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            gap-3
            border-t
            border-white/[0.06]
            bg-[#0D1710]
            px-5
            py-4
            sm:px-7
          "
        >

          <p
            className="
              hidden
              text-xs
              font-medium
              text-white/60
              sm:block
            "
          >
            Changes will appear on your
            public academy profile.
          </p>

          <div
            className="
              flex
              w-full
              gap-3
              sm:w-auto
            "
          >

            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                rounded-xl
                border
                border-white/15
                px-5
                py-2.5
                font-mono
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-white/80
                transition-all
                hover:border-white/30
                hover:bg-white/10
                hover:text-white
                sm:flex-none
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="
                inline-flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#F2FF65]
                px-6
                py-2.5
                font-mono
                text-xs
                font-extrabold
                uppercase
                tracking-wider
                text-[#07130D]
                transition-all
                hover:-translate-y-0.5
                hover:shadow-[0_8px_25px_rgba(242,255,101,0.2)]
                sm:flex-none
              "
            >
              <Save size={14} />
              Save changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   SECTION HEADING
============================================================ */

function SectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <div>

      <p
        className="
          font-mono
          text-xs
          font-bold
          uppercase
          tracking-[0.18em]
          text-[#F2FF65]
        "
      >
        {eyebrow}
      </p>

      <h3
        className="
          mt-1
          font-['Poppins']
          text-xl
          font-extrabold
          uppercase
          tracking-wide
          text-white
        "
      >
        {title}
      </h3>

      {description && (
        <p
          className="
            mt-1
            text-xs
            leading-relaxed
            text-white/75
          "
        >
          {description}
        </p>
      )}

    </div>
  );
}


/* ============================================================
   EDIT FIELD
============================================================ */

function EditField({
  label,
  value,
  onChange,
  textarea = false,
  icon: Icon,
}) {
  return (
    <label className="block">

      <span
        className="
          mb-2
          flex
          items-center
          gap-1.5
          font-mono
          text-xs
          font-bold
          uppercase
          tracking-wider
          text-[#F2FF65]
        "
      >

        {Icon && (
          <Icon size={12} />
        )}

        {label}

      </span>

      {textarea ? (
        <textarea
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          rows={3}
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-white/15
            bg-[#17231A]
            px-3.5
            py-2.5
            text-sm
            font-medium
            text-white
            outline-none
            transition-all
            placeholder:text-white/30
            focus:border-[#F2FF65]
            focus:bg-[#19271C]
            focus:ring-1
            focus:ring-[#F2FF65]/20
          "
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className="
            w-full
            rounded-xl
            border
            border-white/15
            bg-[#17231A]
            px-3.5
            py-2.5
            text-sm
            font-medium
            text-white
            outline-none
            transition-all
            placeholder:text-white/30
            focus:border-[#F2FF65]
            focus:bg-[#19271C]
            focus:ring-1
            focus:ring-[#F2FF65]/20
          "
        />
      )}

    </label>
  );
}
/* =========================================================
   MAIN PROFILE PAGE
========================================================= */

export default function AcademyProfilePage({
  academy = {},
  onEdit,
  onViewOpportunity,
  onSaveProfile,
}) {
  const [localAcademy, setLocalAcademy] = useState(academy || {});
  const [loadingProfile, setLoadingProfile] = useState(!academy || Object.keys(academy).length === 0);

  const [showEditModal, setShowEditModal] = useState(false);
  const [collectionModal, setCollectionModal] = useState(null);

  const loadProfile = async () => {
    try {
      setLoadingProfile(true);
      const res = await api.profiles.getMyProfile();
      if (res?.data?.profile) {
        setLocalAcademy(res.data.profile);
      }
    } catch (err) {
      console.warn('Could not fetch academy profile:', err.message);
    } finally {
      setLoadingProfile(false);
    }
  };

  /*
   * Keep local state synchronized when a parent provides academy data or on mount
   */
  useEffect(() => {
    if (academy && Object.keys(academy).length > 0 && (academy.academy_name || academy.name)) {
      setLocalAcademy(academy);
    } else {
      loadProfile();
    }
  }, [academy]);

  const name =
    localAcademy.academy_name ||
    localAcademy.academyName ||
    localAcademy.name ||
    "Partner Sports Academy";

  const tagline =
    localAcademy.tagline ||
    localAcademy.description ||
    "Dedicated sports academy providing elite athletic training, coaching, and championship development programs.";

  const location =
    localAcademy.location ||
    localAcademy.city ||
    "Pune, Maharashtra";

  const founded =
    localAcademy.founded || "2018";

  const competitiveLevel =
    localAcademy.competitive_level ||
    localAcademy.competitiveLevel ||
    "National / State";

  const academyId =
    localAcademy.id ? `STR-ACD-${String(localAcademy.id).padStart(5, '0')}` : "STR-ACD-00001";

  const avatar =
    localAcademy.logo_url ||
    localAcademy.logo ||
    localAcademy.avatar ||
    localAcademy.image;

  const primarySports =
    Array.isArray(localAcademy.primary_sports) && localAcademy.primary_sports.length
      ? localAcademy.primary_sports.join(", ")
      : Array.isArray(localAcademy.sports_offered) && localAcademy.sports_offered.length
      ? localAcademy.sports_offered.join(", ")
      : localAcademy.primary_sports ||
        localAcademy.primarySports ||
        localAcademy.sports_offered ||
        "Football, Cricket, Athletics";

  const verificationLevel =
    localAcademy.verificationLevel ||
    "LEVEL 04";

  const verification =
    localAcademy.verificationMatrix ||
    localAcademy.verification ||
    fallbackVerification;

  const programs =
    Array.isArray(localAcademy.programs) && localAcademy.programs.length
      ? localAcademy.programs
      : fallbackPrograms;

  const activeAthletes =
    localAcademy.stats?.active_athletes ?? (localAcademy.activeAthletes ?? 48);

  const personalBests =
    localAcademy.stats?.personal_bests ?? (localAcademy.personalBests ?? 27);

  const competitionMedals =
    localAcademy.stats?.competition_medals ?? (localAcademy.competitionMedals ?? 14);

  const nationalQualifiers =
    localAcademy.stats?.national_qualifiers ?? (localAcademy.nationalQualifiers ?? 11);

  const scholarships =
    localAcademy.stats?.scholarships ?? (localAcademy.scholarships ?? 6);

  const stats = [
    {
      label: "ACTIVE ATHLETES",
      value: activeAthletes,
      icon: Users,
    },
    {
      label: "NATIONAL QUALIFIERS",
      value: nationalQualifiers,
      icon: Trophy,
    },
    {
      label: "ATHLETE PERSONAL BESTS",
      value: personalBests,
      icon: Star,
    },
    {
      label: "COMPETITION MEDALS",
      value: competitionMedals,
      icon: Medal,
    },
  ];

  const overview = [
    [
      "Founded",
      founded,
    ],
    ["Location", location],
    [
      "Primary Sports",
      primarySports,
    ],
    [
      "Active Athletes",
      activeAthletes,
    ],
    [
      "Training Programs",
      programs.length,
    ],
    [
      "Competitive Level",
      competitiveLevel,
    ],
  ];

  const outcomes = [
    {
      label: "PERSONAL BESTS",
      value: personalBests,
      icon: Star,
    },
    {
      label: "COMPETITION MEDALS",
      value: competitionMedals,
      icon: Medal,
    },
    {
      label: "NATIONAL QUALIFIERS",
      value: nationalQualifiers,
      icon: Trophy,
    },
    {
      label: "SCHOLARSHIPS / PLACEMENTS",
      value: scholarships,
      icon: Award,
    },
  ];

  const recentAchievements =
    Array.isArray(localAcademy.recent_achievements) && localAcademy.recent_achievements.length
      ? localAcademy.recent_achievements
      : Array.isArray(localAcademy.recentAchievements) && localAcademy.recentAchievements.length
      ? localAcademy.recentAchievements
      : [
          {
            title:
              "Four athletes reached national qualifying standards",
            date: "THIS SEASON",
            icon: Trophy,
          },
          {
            title:
              "Sprint squad achieved seven verified personal bests",
            date: "LAST 30 DAYS",
            icon: Award,
          },
          {
            title:
              "Academy athletes secured three competition medals",
            date: "RECENT EVENT",
            icon: Medal,
          },
        ];

  const handleSaveProfile = async (updatedAcademy) => {
    setLocalAcademy(updatedAcademy);
    try {
      const res = await api.profiles.updateMyProfile(updatedAcademy);
      if (res?.data?.profile) {
        setLocalAcademy(res.data.profile);
        onSaveProfile?.(res.data.profile);
      } else {
        onSaveProfile?.(updatedAcademy);
      }
    } catch (err) {
      console.error('Failed to save profile to backend:', err);
      onSaveProfile?.(updatedAcademy);
    }
  };

  /*
   * Opportunity navigation.
   * Parent callback is preferred. If unavailable,
   * fallback to the opportunities route.
   */
  const handleViewOpportunity = (
    opportunity
  ) => {
    if (onViewOpportunity) {
      onViewOpportunity(opportunity);
      return;
    }

    window.location.href = "/opportunities";
  };

  return (
    <div className="profile-pane matchpoint-fade-in">
      {/* =====================================================
          ACADEMY HERO
      ====================================================== */}

      <div className="court-panel-container matchpoint-profile-hero overflow-hidden">
        {/* Banner */}

        <div className="matchpoint-profile-banner-bg">
          <span className="banner-court-tag font-mono">
            ACADEMY PROFILE // STRIDE VERIFIED
          </span>
        </div>

        {/* Profile Header */}

        <div className="matchpoint-profile-header">
          <div className="oval-avatar-frame">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="oval-avatar-img"
              />
            ) : (
              <div className="grid h-full w-full place-items-center bg-[#2C337F] text-lime">
                <Building2
                  size={42}
                  strokeWidth={1.25}
                />
              </div>
            )}
          </div>

          <div className="profile-identity">
            <div className="profile-badge-row">
              <span className="matchpoint-badge-lime">
                VERIFIED ACADEMY
              </span>

              <span className="matchpoint-badge-verified">
                <CheckCircle2 size={13} />
                {verificationLevel}
              </span>
            </div>

            <h1 className="font-['Poppins'] text-2xl font-black uppercase tracking-wider text-white sm:text-3xl lg:text-4xl">
              {name}
            </h1>

            <p className="mt-1 text-base font-semibold text-white/90">
              {localAcademy.primarySports ||
                localAcademy.sports?.join(
                  " · "
                ) ||
                "Athletics · Performance"}
            </p>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90">
                <MapPin
                  size={15}
                  className="text-[#F2FF65]"
                />
                {location}
              </span>

              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90">
                <Building2
                  size={15}
                  className="text-[#F2FF65]"
                />
                ID: {academyId}
              </span>
            </div>
          </div>

          <button
            className="matchpoint-pill-btn primary ms-auto font-mono text-xs font-bold tracking-wider"
            onClick={() => {
              onEdit?.(localAcademy);
              setShowEditModal(true);
            }}
          >
            <Edit3 size={15} />
            EDIT PROFILE
          </button>
        </div>

        {/* Stats */}

        <div className="matchpoint-stats-banner">
          {stats.map(
            ({ label, value, icon: Icon }) => (
              <div
                className="stat-box"
                key={label}
              >
                <Icon
                  size={18}
                  className="mb-2 text-[#F2FF65]"
                  strokeWidth={1.5}
                />

                <span className="stat-box-label font-mono text-xs font-bold uppercase tracking-wider text-white/80">
                  {label}
                </span>

                <span className="stat-box-val font-mono text-2xl font-black text-[#F2FF65]">
                  {value}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* =====================================================
          TAGLINE / BIO
      ====================================================== */}

      <div className="matchpoint-main-cols mt-24">
        <GlassPanel>
          <SectionHeader
            eyebrow="ACADEMY OVERVIEW"
            title="ABOUT THE ACADEMY"
            icon={Building2}
          />

          <p className="bio-text text-base font-medium leading-relaxed text-white/90">
            {tagline}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {overview.map(
              ([label, value]) => (
                <div
                  key={label}
                  className="border-t border-white/15 pt-3"
                >
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#F2FF65]">
                    {label.toUpperCase()}
                  </p>

                  <p className="mt-1 text-base font-semibold text-white">
                    {value}
                  </p>
                </div>
              )
            )}
          </div>
        </GlassPanel>

        {/* =====================================================
            VERIFICATION
        ====================================================== */}

        <GlassPanel>
          <SectionHeader
            eyebrow="TRUST FRAMEWORK"
            title="VERIFICATION STATUS"
            icon={ShieldCheck}
          />

          <div className="space-y-3">
            {verification.map(
              (item, index) => {
                const verified =
                  String(
                    item.status || ""
                  ).toUpperCase() ===
                  "VERIFIED";

                return (
                  <div
                    key={`${item.level}-${item.title}`}
                    className={`flex items-center justify-between gap-3 border-b border-white/10 pb-3 ${
                      !verified
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center border border-[#F2FF65]/30 bg-white/5 font-mono text-xs font-bold text-[#F2FF65]">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <div>
                        <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#F2FF65]">
                          {item.level}
                        </p>

                        <p className="mt-0.5 text-sm font-bold text-white">
                          {item.title}
                        </p>
                      </div>
                    </div>

                    <StatusBadge
                      verified={verified}
                    >
                      {item.status ||
                        "PENDING"}
                    </StatusBadge>
                  </div>
                );
              }
            )}
          </div>
        </GlassPanel>
      </div>

      {/* =====================================================
          ACADEMY IMPACT
      ====================================================== */}

      <GlassPanel className="mt-5">
        <SectionHeader
          eyebrow="VERIFIED PERFORMANCE"
          title="ACADEMY IMPACT"
          icon={Trophy}
        />

        <div className="grid grid-cols-2 gap-px bg-white/15 sm:grid-cols-4">
          {outcomes.map(
            ({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="bg-[#2C337F]/60 p-5"
              >
                <Icon
                  size={20}
                  className="text-[#F2FF65]"
                  strokeWidth={1.5}
                />

                <p className="mt-5 font-mono text-3xl font-black tracking-tight text-[#F2FF65]">
                  {value}
                </p>

                <p className="mt-2 font-mono text-xs font-bold uppercase leading-snug tracking-wider text-white/90">
                  {label}
                </p>
              </div>
            )
          )}
        </div>
      </GlassPanel>




{/* =====================================================
    TRAINING PROGRAMS
====================================================== */}

<GlassPanel className="mt-5">
  <SectionHeader
    eyebrow="DEVELOPMENT PATHWAYS"
    title="TRAINING PROGRAMS"
    icon={Dumbbell}
  />

  <div
    className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory"
    style={{ scrollbarWidth: "thin" }}
  >
    {programs.map((program) => (
      <article
        key={program.id || program.title}
        className="w-[280px] shrink-0 snap-start border border-white/15 bg-[#315038]/50 p-5 transition-transform duration-200 hover:-translate-y-1"
      >
        <Dumbbell
          size={20}
          className="text-[#F2FF65]"
          strokeWidth={1.5}
        />

        <p className="mt-5 font-mono text-xs font-bold uppercase tracking-wider text-[#F2FF65]">
          {program.discipline ||
            program.sport ||
            "PROGRAM"}
        </p>

        <h3 className="mt-2 font-['Poppins'] text-base font-extrabold uppercase tracking-wide text-white">
          {program.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-white/80">
          {program.description}
        </p>
      </article>
    ))}
  </div>

  {/* Swipe hint */}
  {programs.length > 3 && (
    <div className="mt-3 flex items-center justify-end gap-1 font-mono text-xs font-bold tracking-wider text-[#F2FF65]/60">
      SWIPE TO EXPLORE
      <ChevronRight size={14} />
    </div>
  )}
</GlassPanel>

      {/* =====================================================
          ACHIEVEMENTS + OUTCOMES
      ====================================================== */}

      <div className="matchpoint-main-cols mt-5">
        <GlassPanel>
          <SectionHeader
            eyebrow="LATEST PERFORMANCE"
            title="RECENT ACHIEVEMENTS"
            icon={Trophy}
          />

          <div className="achievements-list space-y-4">
            {recentAchievements.map(
              (
                achievement,
                index
              ) => {
                const Icon =
                  achievement.icon ||
                  (index % 2
                    ? Award
                    : Trophy);

                return (
                  <div
                    key={
                      achievement.id ||
                      achievement.title
                    }
                    className="flex items-start gap-3 border-b border-white/10 pb-3"
                  >
                    <Icon
                      size={22}
                      className="mt-0.5 shrink-0 text-[#F2FF65]"
                      strokeWidth={1.5}
                    />

                    <div>
                      <h4 className="text-base font-bold text-white leading-snug">
                        {
                          achievement.title
                        }
                      </h4>

                      <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#F2FF65]">
                        {
                          achievement.date
                        }
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </GlassPanel>

        <GlassPanel>
          <SectionHeader
            eyebrow="ATHLETE DEVELOPMENT"
            title="KEY OUTCOMES"
            icon={Award}
          />

          <div className="grid grid-cols-2 gap-3">
            {outcomes.map(
              ({
                label,
                value,
                icon: Icon,
              }) => (
                <div
                  key={label}
                  className="border border-white/10 bg-white/5 p-4"
                >
                  <Icon
                    size={18}
                    className="text-[#F2FF65]"
                    strokeWidth={1.5}
                  />

                  <p className="mt-4 font-mono text-3xl font-black text-[#F2FF65]">
                    {value}
                  </p>

                  <p className="mt-1.5 font-mono text-xs font-bold uppercase leading-snug tracking-wider text-white/90">
                    {label}
                  </p>
                </div>
              )
            )}
          </div>
        </GlassPanel>
      </div>

      {/* =====================================================
          STRIDE CREDENTIAL
      ====================================================== */}

      <div className="court-panel-container mt-5 overflow-hidden border-white/20 bg-[#2C337F]">
        <div className="p-5 sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={20}
                  className="text-[#F2FF65]"
                />

                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#F2FF65]">
                  STRIDE VERIFIED RECORD
                </p>
              </div>

              <h2 className="mt-3 font-['Poppins'] text-2xl font-black uppercase tracking-wider text-white sm:text-3xl">
                {name.toUpperCase()}{" "}
                CREDENTIAL
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#F2FF65]">
                    ACADEMY ID
                  </p>

                  <p className="mt-1 text-base font-semibold text-white">
                    {academyId}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#F2FF65]">
                    VERIFICATION LEVEL
                  </p>

                  <p className="mt-1 text-base font-semibold text-white">
                    {verificationLevel}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#F2FF65]">
                    LAST AUDIT
                  </p>

                  <p className="mt-1 text-base font-semibold text-white">
                    {localAcademy.lastAuditDate ||
                      "14 AUG 2026"}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#F2FF65]">
                    STATUS
                  </p>

                  <p className="mt-1 inline-flex items-center gap-1.5 text-base font-bold text-[#F2FF65]">
                    <CheckCircle2 size={16} />
                    VERIFIED ORGANIZATION
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {[
                  "VERIFIED ORGANIZATION",
                  "VERIFIED FACILITY",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#F2FF65]"
                  >
                    <CheckCircle2 size={14} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          EDIT PROFILE MODAL
      ====================================================== */}

      {showEditModal && (
        <EditProfileModal
          academy={localAcademy}
          onClose={() =>
            setShowEditModal(false)
          }
          onSave={handleSaveProfile}
        />
      )}

      {/* =====================================================
          VIEW MORE MODAL
      ====================================================== */}

      {collectionModal && (
        <CollectionModal
          title={collectionModal.title}
          eyebrow={collectionModal.eyebrow}
          items={collectionModal.items}
          type={collectionModal.type}
          onClose={() =>
            setCollectionModal(null)
          }
        />
      )}
    </div>
  );
}

