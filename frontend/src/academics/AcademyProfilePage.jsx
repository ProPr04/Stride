
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
import VerificationBadge from "../components/common/VerificationBadge";
import VerificationRoadCard from "../components/common/VerificationRoadCard";



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

    primarySports:
      Array.isArray(academy.primary_sports) && academy.primary_sports.length
        ? academy.primary_sports.join(", ")
        : Array.isArray(academy.sports_offered) && academy.sports_offered.length
        ? academy.sports_offered.join(", ")
        : academy.primary_sports ||
          academy.primarySports ||
          academy.sports_offered ||
          "Cricket, Football, Tennis",

    image:
      academy.logo_url ||
      academy.logo ||
      academy.avatar ||
      academy.image ||
      "",

    programs:
      Array.isArray(academy.programs) && academy.programs.length
        ? academy.programs
        : fallbackPrograms,

    achievements:
      Array.isArray(academy.recentAchievements) && academy.recentAchievements.length
        ? academy.recentAchievements
        : Array.isArray(academy.achievements) && academy.achievements.length
        ? academy.achievements
        : [
            {
              title: "Four athletes reached national qualifying standards",
              date: "THIS SEASON",
            },
            {
              title: "Sprint squad achieved seven verified personal bests",
              date: "LAST 30 DAYS",
            },
            {
              title: "Academy athletes secured three competition medals",
              date: "RECENT EVENT",
            },
          ],
  });

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await api.upload.image(file);
      if (res.data?.url) {
        if (form.image && form.image.includes('/uploads/')) {
          api.upload.deleteImage(form.image);
        }
        updateField("image", res.data.url);
      }
    } catch (err) {
      alert("Failed to upload logo: " + err.message);
    }
  };

  const handleRemoveImage = () => {
    if (form.image && form.image.includes('/uploads/')) {
      api.upload.deleteImage(form.image);
    }
    updateField("image", "");
  };

  const updateProgram = (index, field, value) => {
    setForm((previous) => {
      const programs = [...previous.programs];

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
      programs: previous.programs.filter(
        (_, itemIndex) => itemIndex !== index
      ),
    }));
  };

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

  const addAchievement = () => {
    setForm((previous) => ({
      ...previous,
      achievements: [
        ...previous.achievements,
        {
          title: "New Academy Achievement",
          date: "RECENT",
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

  const handleSave = () => {
    const sportsList = form.primarySports
      ? form.primarySports.split(',').map((s) => s.trim()).filter(Boolean)
      : ['General Sports'];

    onSave?.({
      ...academy,
      academy_name: form.name.trim(),
      name: form.name.trim(),
      academyName: form.name.trim(),
      tagline: form.tagline.trim(),
      description: form.tagline.trim(),
      location: form.location.trim(),
      city: form.location.trim(),
      primary_sports: sportsList,
      sports_offered: sportsList,
      primarySports: form.primarySports,
      logo_url: form.image,
      logo: form.image,
      image: form.image,
      programs: form.programs,
      recentAchievements: form.achievements,
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#07130D]/85 p-4 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Edit academy profile"
    >
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-lime/20 bg-[#315038] shadow-2xl">
        {/* Header */}

        <div className="flex shrink-0 items-start justify-between border-b border-lime/15 p-5 sm:p-6">
          <div>
            <p className="font-mono text-[9px] font-bold tracking-[0.18em] text-lime/55">
              ACADEMY PROFILE // EDIT MODE
            </p>

            <h2 className="mt-2 font-['Poppins'] text-2xl font-semibold tracking-[-0.045em] text-lime">
              EDIT ACADEMY PROFILE
            </h2>

            <p className="mt-1 text-sm text-[#F7F5ED]/50">
              Update the information displayed on your
              public academy profile.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-lime/20 text-lime hover:bg-white/5"
            aria-label="Close edit profile"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}

        <div className="overflow-y-auto p-5 sm:p-6">
          {/* BASIC INFORMATION */}

          <div>
            <p className="font-mono text-[9px] font-bold tracking-[0.16em] text-lime/55">
              BASIC INFORMATION
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <EditField
                label="Academy Name"
                value={form.name}
                onChange={(value) =>
                  updateField("name", value)
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
                value={form.primarySports}
                onChange={(value) =>
                  updateField(
                    "primarySports",
                    value
                  )
                }
              />

              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-1.5 font-mono text-[8px] font-bold tracking-[0.12em] text-lime/55">
                  <ImageIcon size={11} />
                  ACADEMY LOGO / IMAGE
                </span>
                <div className="flex items-center gap-3 rounded-md border border-lime/15 bg-[#2A3C2E] p-2.5">
                  <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg border border-lime/20 bg-[#16251B]">
                    {form.image ? (
                      <img src={form.image} alt="Logo Preview" className="h-full w-full object-cover" />
                    ) : (
                      <Building2 size={20} className="text-lime/60" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <input
                      type="text"
                      placeholder="Paste Image URL or Upload File"
                      value={form.image}
                      onChange={(e) => updateField("image", e.target.value)}
                      className="w-full rounded border border-lime/15 bg-[#1F2E24] px-2.5 py-1.5 text-xs text-[#F7F5ED] outline-none focus:border-lime/50"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1 rounded bg-lime/15 px-2.5 py-1 font-mono text-[9px] font-bold text-lime hover:bg-lime/25"
                      >
                        <Camera size={11} />
                        Upload File
                      </button>
                      {form.image && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="inline-flex items-center gap-1 rounded bg-red-500/15 px-2.5 py-1 font-mono text-[9px] font-bold text-red-400 hover:bg-red-500/25"
                        >
                          <Trash2 size={11} />
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
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

          {/* TRAINING PROGRAMS */}

          <div className="mt-8 border-t border-lime/10 pt-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] font-bold tracking-[0.16em] text-lime/55">
                  DEVELOPMENT PATHWAYS
                </p>

                <h3 className="mt-1 font-['Poppins'] text-lg font-semibold text-lime">
                  TRAINING PROGRAMS
                </h3>
              </div>

              <button
                type="button"
                onClick={addProgram}
                className="inline-flex items-center gap-1.5 rounded-md border border-lime/25 bg-lime/10 px-3 py-2 font-mono text-[9px] font-bold tracking-[0.08em] text-lime hover:bg-lime/15"
              >
                <Plus size={13} />
                ADD PROGRAM
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {form.programs.map(
                (program, index) => (
                  <div
                    key={`${program.title}-${index}`}
                    className="rounded-lg border border-lime/10 bg-white/5 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-mono text-[8px] font-bold tracking-[0.12em] text-lime/45">
                        PROGRAM {String(index + 1).padStart(2, "0")}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          removeProgram(index)
                        }
                        className="text-[#F7F5ED]/40 hover:text-red-300"
                        aria-label="Remove program"
                      >
                        <X size={15} />
                      </button>
                    </div>

                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <EditField
                        label="Program Title"
                        value={
                          program.title
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

                      <div className="md:col-span-2">
                        <EditField
                          label="Description"
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
          </div>

          {/* ACHIEVEMENTS */}

          <div className="mt-8 border-t border-lime/10 pt-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] font-bold tracking-[0.16em] text-lime/55">
                  LATEST PERFORMANCE
                </p>

                <h3 className="mt-1 font-['Poppins'] text-lg font-semibold text-lime">
                  RECENT ACHIEVEMENTS
                </h3>
              </div>

              <button
                type="button"
                onClick={addAchievement}
                className="inline-flex items-center gap-1.5 rounded-md border border-lime/25 bg-lime/10 px-3 py-2 font-mono text-[9px] font-bold tracking-[0.08em] text-lime hover:bg-lime/15"
              >
                <Plus size={13} />
                ADD ACHIEVEMENT
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {form.achievements.map(
                (
                  achievement,
                  index
                ) => (
                  <div
                    key={`${achievement.title}-${index}`}
                    className="rounded-lg border border-lime/10 bg-white/5 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-mono text-[8px] font-bold tracking-[0.12em] text-lime/45">
                        ACHIEVEMENT{" "}
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          removeAchievement(
                            index
                          )
                        }
                        className="text-[#F7F5ED]/40 hover:text-red-300"
                        aria-label="Remove achievement"
                      >
                        <X size={15} />
                      </button>
                    </div>

                    <div className="mt-3 grid gap-3 md:grid-cols-[1fr_180px]">
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
          </div>
        </div>

        {/* Footer */}

        <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-lime/15 bg-[#2A3C2E] p-4 sm:flex-row sm:justify-end sm:p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-lime/20 px-5 py-3 font-mono text-[10px] font-bold tracking-[0.08em] text-[#F7F5ED]/65 transition-colors hover:bg-white/5 hover:text-[#F7F5ED]"
          >
            CANCEL
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-lime px-5 py-3 font-mono text-[10px] font-bold tracking-[0.08em] text-[#07130D] transition-transform hover:-translate-y-0.5"
          >
            <Save size={14} />
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
}

function EditField({
  label,
  value,
  onChange,
  textarea = false,
  icon: Icon,
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 font-mono text-[8px] font-bold tracking-[0.12em] text-lime/55">
        {Icon && <Icon size={11} />}
        {label.toUpperCase()}
      </span>

      {textarea ? (
        <textarea
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          rows={3}
          className="w-full resize-none rounded-md border border-lime/15 bg-[#2A3C2E] px-3 py-2.5 text-sm text-[#F7F5ED] outline-none transition-colors placeholder:text-[#F7F5ED]/25 focus:border-lime/50"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="w-full rounded-md border border-lime/15 bg-[#2A3C2E] px-3 py-2.5 text-sm text-[#F7F5ED] outline-none transition-colors placeholder:text-[#F7F5ED]/25 focus:border-lime/50"
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
  const [verificationData, setVerificationData] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [collectionModal, setCollectionModal] = useState(null);

  const loadProfile = async () => {
    try {
      setLoadingProfile(true);
      const [res, verifRes] = await Promise.allSettled([
        api.profiles.getMyProfile(),
        api.verifications.getMyStatus()
      ]);

      if (res.status === 'fulfilled' && res.value?.data?.profile) {
        setLocalAcademy(res.value.data.profile);
      }
      if (verifRes.status === 'fulfilled' && verifRes.value?.data?.verification) {
        setVerificationData(verifRes.value.data.verification);
      }
    } catch (err) {
      console.warn('Could not fetch academy profile/verification:', err.message);
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
    }
    loadProfile();
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

  const coaches =
    Array.isArray(localAcademy.coaches) && localAcademy.coaches.length
      ? localAcademy.coaches
      : fallbackCoaches;

  const programs =
    Array.isArray(localAcademy.programs) && localAcademy.programs.length
      ? localAcademy.programs
      : fallbackPrograms;

  const opportunities =
    Array.isArray(localAcademy.opportunities) && localAcademy.opportunities.length
      ? localAcademy.opportunities
      : fallbackOpportunities;

  const stats = [
    {
      label: "ACTIVE ATHLETES",
      value:
        localAcademy.activeAthletes ?? (localAcademy.stats?.active_athletes ?? 48),
      icon: Users,
    },
    {
      label: "VERIFIED COACHES",
      value:
        localAcademy.verifiedCoaches ??
        coaches.filter((coach) => coach.verified).length,
      icon: ShieldCheck,
    },
    {
      label: "NATIONAL QUALIFIERS",
      value:
        localAcademy.nationalQualifiers ?? (localAcademy.stats?.national_qualifiers ?? 11),
      icon: Trophy,
    },
    {
      label: "ATHLETE PERSONAL BESTS",
      value:
        localAcademy.personalBests ?? (localAcademy.stats?.personal_bests ?? 27),
      icon: Star,
    },
  ];

  const overview = [
    [
      "Founded",
      localAcademy.founded || "2018",
    ],
    ["Location", location],
    [
      "Primary Sports",
      primarySports,
    ],
    [
      "Active Athletes",
      localAcademy.activeAthletes ?? (localAcademy.stats?.active_athletes ?? 48),
    ],
    [
      "Training Programs",
      programs.length,
    ],
    [
      "Competitive Level",
      localAcademy.competitiveLevel || "National / State",
    ],
  ];

  const outcomes = [
    {
      label: "PERSONAL BESTS",
      value:
        localAcademy.personalBests ?? 27,
      icon: Star,
    },
    {
      label: "COMPETITION MEDALS",
      value:
        localAcademy.competitionMedals ?? 14,
      icon: Medal,
    },
    {
      label: "NATIONAL QUALIFIERS",
      value:
        localAcademy.nationalQualifiers ?? 11,
      icon: Trophy,
    },
    {
      label: "SCHOLARSHIPS / PLACEMENTS",
      value:
        localAcademy.scholarships ?? 6,
      icon: Award,
    },
  ];

  const recentAchievements =
    localAcademy.recentAchievements?.length
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

  /*
   * Save profile changes.
   * Parent receives the updated academy through
   * onSaveProfile if provided.
   */
  const handleSaveProfile = (updatedAcademy) => {
    setLocalAcademy(updatedAcademy);
    onSaveProfile?.(updatedAcademy);
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
                ACADEMY PROFILE
              </span>

              <VerificationBadge
                level={verificationData?.currentLevel || localAcademy.verification_level || 1}
                type="academy"
                size="md"
              />
            </div>

            <h1 className="profile-hero-name">
              {name}
            </h1>

            <p className="profile-hero-discipline">
              {localAcademy.primarySports ||
                localAcademy.sports?.join(
                  " · "
                ) ||
                "Athletics · Performance"}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <span className="profile-location-tag">
                <MapPin
                  size={14}
                  className="text-lime"
                />
                {location}
              </span>

              <span className="profile-location-tag">
                <Building2
                  size={14}
                  className="text-lime"
                />
                ID: {academyId}
              </span>
            </div>
          </div>

          <button
            className="matchpoint-pill-btn primary ms-auto"
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
                  size={16}
                  className="mb-2 text-lime"
                  strokeWidth={1.5}
                />

                <span className="stat-box-label font-mono">
                  {label}
                </span>

                <span className="stat-box-val text-lime">
                  {value}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* =====================================================
          TAGLINE / BIO & VERIFICATION ROAD
      ====================================================== */}

      <div className="matchpoint-main-cols mt-24">
        <GlassPanel>
          <SectionHeader
            eyebrow="ACADEMY OVERVIEW"
            title="ABOUT THE ACADEMY"
            icon={Building2}
          />

          <p className="bio-text">
            {tagline}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {overview.map(
              ([label, value]) => (
                <div
                  key={label}
                  className="border-t border-lime/15 pt-3"
                >
                  <p className="font-mono text-[9px] font-bold tracking-[0.12em] text-lime/55">
                    {label.toUpperCase()}
                  </p>

                  <p className="mt-1 text-sm text-[#F7F5ED]/80">
                    {value}
                  </p>
                </div>
              )
            )}
          </div>
        </GlassPanel>

        {/* =====================================================
            VERIFICATION ROADWAY CARD
        ====================================================== */}

        <div>
          <VerificationRoadCard
            level={verificationData?.currentLevel || localAcademy.verification_level || 1}
            type="academy"
            metrics={verificationData?.metrics || {}}
            logs={verificationData?.logs || []}
          />
        </div>
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

        <div className="grid grid-cols-2 gap-px bg-lime/15 sm:grid-cols-4">
          {outcomes.map(
            ({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="bg-[#2C337F]/60 p-5"
              >
                <Icon
                  size={19}
                  className="text-lime"
                  strokeWidth={1.5}
                />

                <p className="mt-7 font-mono text-3xl font-bold tracking-[-0.06em] text-lime">
                  {value}
                </p>

                <p className="mt-2 font-mono text-[9px] font-bold leading-4 tracking-[0.1em] text-[#F7F5ED]/55">
                  {label}
                </p>
              </div>
            )
          )}
        </div>
      </GlassPanel>

      {/* =====================================================
    COACHING STAFF
====================================================== */}

<GlassPanel className="mt-5">
  <SectionHeader
    eyebrow="PEOPLE BEHIND PERFORMANCE"
    title="VERIFIED COACHING STAFF"
    icon={Users}
  />

  <div
    className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory"
    style={{ scrollbarWidth: "thin" }}
  >
    {coaches.map((coach) => (
      <article
        key={coach.id || coach.name}
        className="w-[280px] shrink-0 snap-start border border-lime/15 bg-[#315038]/50 p-5 transition-transform duration-200 hover:-translate-y-1"
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

  {/* Swipe hint */}
  {coaches.length > 3 && (
    <div className="mt-3 flex items-center justify-end gap-1 font-mono text-[8px] font-bold tracking-[0.12em] text-lime/40">
      SWIPE TO EXPLORE
      <ChevronRight size={12} />
    </div>
  )}
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
        className="w-[280px] shrink-0 snap-start border border-lime/15 bg-[#315038]/50 p-5 transition-transform duration-200 hover:-translate-y-1"
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

  {/* Swipe hint */}
  {programs.length > 3 && (
    <div className="mt-3 flex items-center justify-end gap-1 font-mono text-[8px] font-bold tracking-[0.12em] text-lime/40">
      SWIPE TO EXPLORE
      <ChevronRight size={12} />
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

          <div className="achievements-list">
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
                    className="achievement-item"
                  >
                    <Icon
                      size={20}
                      className="text-lime"
                      strokeWidth={1.5}
                    />

                    <div>
                      <h4 className="item-title">
                        {
                          achievement.title
                        }
                      </h4>

                      <p className="item-sub-org">
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
                  className="border border-lime/10 bg-white/5 p-4"
                >
                  <Icon
                    size={17}
                    className="text-lime"
                    strokeWidth={1.5}
                  />

                  <p className="mt-5 font-mono text-2xl font-bold text-lime">
                    {value}
                  </p>

                  <p className="mt-1 font-mono text-[8px] font-bold leading-4 tracking-[0.08em] text-[#F7F5ED]/50">
                    {label}
                  </p>
                </div>
              )
            )}
          </div>
        </GlassPanel>
      </div>

      {/* =====================================================
          OPEN OPPORTUNITIES
      ====================================================== */}

      <GlassPanel className="mt-5">
        <SectionHeader
          eyebrow="CURRENTLY RECRUITING"
          title="OPEN ACADEMY OPPORTUNITIES"
          icon={ClipboardCheck}
        />

        <div className="grid gap-4 md:grid-cols-2">
          {opportunities.map(
            (opportunity) => (
              <article
                key={
                  opportunity.id ||
                  opportunity.title
                }
                className="border border-lime/15 bg-[#315038]/50 p-5 transition-transform duration-200 hover:-translate-y-1"
              >
                <StatusBadge>
                  {opportunity.status ||
                    "OPEN"}
                </StatusBadge>

                <h3 className="mt-4 font-mono text-sm font-bold tracking-[0.05em] text-lime">
                  {opportunity.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#F7F5ED]/60">
                  <span>
                    {opportunity.sport ||
                      "Sport"}
                  </span>

                  <span className="inline-flex items-center gap-1">
                    <MapPin
                      size={13}
                      className="text-lime"
                    />
                    {opportunity.location ||
                      location}
                  </span>

                  <span>
                    {opportunity.positions ||
                      "Positions available"}
                  </span>
                </div>

                <button
                  onClick={() =>
                    handleViewOpportunity(
                      opportunity
                    )
                  }
                  className="mt-5 inline-flex items-center gap-1 border-b border-lime pb-1 font-mono text-[10px] font-bold tracking-[0.08em] text-lime"
                >
                  VIEW OPPORTUNITY
                  <ChevronRight size={14} />
                </button>
              </article>
            )
          )}
        </div>
      </GlassPanel>

      {/* =====================================================
          STRIDE CREDENTIAL
      ====================================================== */}

      <div className="court-panel-container mt-5 overflow-hidden border-lime/25 bg-[#2C337F]">
        <div className="p-5 sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={19}
                  className="text-lime"
                />

                <p className="font-mono text-[9px] font-bold tracking-[0.18em] text-lime/60">
                  STRIDE VERIFIED RECORD
                </p>
              </div>

              <h2 className="mt-3 font-mono text-xl font-bold tracking-[-0.04em] text-lime sm:text-2xl">
                {name.toUpperCase()}{" "}
                CREDENTIAL
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[9px] font-bold tracking-[0.1em] text-lime/55">
                    ACADEMY ID
                  </p>

                  <p className="mt-1 text-sm text-[#F7F5ED]/75">
                    {academyId}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[9px] font-bold tracking-[0.1em] text-lime/55">
                    VERIFICATION LEVEL
                  </p>

                  <p className="mt-1 text-sm text-[#F7F5ED]/75">
                    {verificationLevel}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[9px] font-bold tracking-[0.1em] text-lime/55">
                    LAST AUDIT
                  </p>

                  <p className="mt-1 text-sm text-[#F7F5ED]/75">
                    {localAcademy.lastAuditDate ||
                      "14 AUG 2026"}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[9px] font-bold tracking-[0.1em] text-lime/55">
                    STATUS
                  </p>

                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-lime">
                    <CheckCircle2 size={14} />
                    VERIFIED ORGANIZATION
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {[
                  "VERIFIED ORGANIZATION",
                  "VERIFIED COACHES",
                  "VERIFIED FACILITY",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-[0.08em] text-lime"
                  >
                    <CheckCircle2 size={12} />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* VIEW VERIFICATION RECORD REMOVED FOR MVP */}
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

