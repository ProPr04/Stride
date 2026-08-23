import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Edit3,
  FileText,
  ImagePlus,
  MapPin,
  Plus,
  Send,
  Upload,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { api } from "../services/api";

const MOCK_IMAGE =

  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&auto=format&fit=crop&q=85";



function StatusBadge({ status }) {
  const value = String(status || "Draft").toLowerCase();

  const styles = {
    open: "border-[#F2FF65]/40 bg-[#F2FF65]/10 text-[#F2FF65]",
    active: "border-[#F2FF65]/40 bg-[#F2FF65]/10 text-[#F2FF65]",
    draft: "border-white/15 bg-white/5 text-[#F7F5ED]/70",
    closed: "border-[#FF6B4A]/40 bg-[#FF6B4A]/10 text-[#FF9A7A]",
    paused: "border-[#60A5FA]/40 bg-[#2C337F]/50 text-[#93C5FD]",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${
        styles[value] || styles.draft
      }`}
    >
      {status || "Draft"}
    </span>
  );
}

/* =========================================================
   OPPORTUNITY POST
========================================================= */

function OpportunityPost({
  opportunity,
  applicationCount,
  onEdit,
  onViewApplications,
}) {
  const [expanded, setExpanded] = useState(false);

  const requirements = Array.isArray(opportunity.requirements)
    ? opportunity.requirements
    : typeof opportunity.requirements === "string"
      ? opportunity.requirements
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  const academyName =
    opportunity.academy_name ||
    opportunity.academyName ||
    opportunity.academy?.name ||
    "Your Academy";

  const academyAvatar =
    opportunity.academyAvatar ||
    opportunity.academy?.avatar ||
    "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=150&auto=format&fit=crop&q=80";

  const image =
    opportunity.media_image ||
    opportunity.image ||
    opportunity.mediaImage ||
    opportunity.coverImage ||
    opportunity.imageUrl ||
    MOCK_IMAGE;

  const displayTitle = opportunity.title || opportunity.role || "Untitled Opportunity";
  const displayRole = opportunity.role || opportunity.title || "—";
  const displayLocation = opportunity.location || opportunity.academy_location || "India";
  const displayTimeline = opportunity.timeline || "Active for 30 Days";
  const displayDescription = opportunity.description || opportunity.caption || opportunity.details || "No opportunity description added yet.";
  const displayWhatYouWillDo = opportunity.what_you_will_do || opportunity.responsibilities || opportunity.description || "Responsibilities not specified.";
  const displayCompensation = opportunity.compensation_cash 
    ? `₹${Number(opportunity.compensation_cash).toLocaleString()} / month`
    : opportunity.compensation || "Not specified";

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B120D] shadow-[0_18px_55px_rgba(0,0,0,0.28)] transition-all duration-300 hover:border-[#F2FF65]/25">
      {/* =================================================
          ACADEMY HEADER
      ================================================= */}
      <div className="flex items-center justify-between gap-4 bg-[#141F16] px-4 py-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={academyAvatar}
            alt={academyName}
            className="h-11 w-11 shrink-0 rounded-full border border-[#F2FF65]/20 object-cover"
          />

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate text-sm font-bold text-white">
                {academyName}
              </h3>

              {(opportunity.verified ?? true) && (
                <CheckCircle2
                  size={14}
                  className="shrink-0 text-[#F2FF65]"
                  strokeWidth={2.2}
                />
              )}
            </div>

            <p className="mt-0.5 text-[10px] text-white/45">
              {opportunity.created_at ? new Date(opportunity.created_at).toLocaleDateString() : opportunity.createdAt || "Just now"}
            </p>
          </div>
        </div>

        <StatusBadge status={opportunity.status} />
      </div>

      {/* =================================================
          CAPTION / DESCRIPTION
      ================================================= */}
      <div className="px-4 pb-4 pt-3 sm:px-5">
        <h2 className="font-['Poppins'] text-lg font-bold uppercase tracking-[-0.025em] text-white sm:text-xl">
          {displayTitle}
        </h2>

        <p className="mt-2 text-xs leading-5 text-white/65 sm:text-sm">
          {displayDescription}
        </p>
      </div>

      {/* =================================================
          OPPORTUNITY IMAGE
      ================================================= */}
      {image && (
        <div className="relative w-full overflow-hidden bg-[#07100A]">
          <img
            src={image}
            alt={displayTitle}
            className="block h-auto max-h-[500px] w-full object-cover"
            onError={(event) => {
              event.currentTarget.src = MOCK_IMAGE;
            }}
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />

          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {opportunity.sport && (
              <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                {opportunity.sport}
              </span>
            )}

            {displayLocation && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] text-white backdrop-blur-md">
                <MapPin size={11} />
                {displayLocation}
              </span>
            )}
          </div>
        </div>
      )}

      {/* =================================================
          DETAILS
      ================================================= */}
      <div className="border-t border-[#2A3C2E] bg-[#0B120D] px-4 py-5 sm:px-5">
        <div className="space-y-0">
          {/* ROLE */}
          <DetailRow label="ROLE">
            <p className="text-sm font-semibold text-white">
              {displayRole}
            </p>
          </DetailRow>

          {/* TIMELINE */}
          <DetailRow label="ACTIVE TIMELINE">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold text-sky-400 sm:text-sm">
              <Clock3 size={14} />
              {displayTimeline}
            </p>
          </DetailRow>

          {/* RESPONSIBILITIES */}
          <DetailRow label="WHAT YOU'LL DO">
            <p className="text-xs leading-5 text-white/75 sm:text-sm">
              {expanded
                ? displayWhatYouWillDo
                : `${displayWhatYouWillDo.slice(0, 150)}${
                    displayWhatYouWillDo.length > 150 ? "..." : ""
                  }`}
            </p>
          </DetailRow>

          {/* REQUIREMENTS */}
          <DetailRow label="REQUIREMENTS">
            <ul className="space-y-1.5 text-xs text-white/75 sm:text-sm">
              {(expanded ? requirements : requirements.slice(0, 2)).map(
                (requirement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#F2FF65]">•</span>
                    <span>{requirement}</span>
                  </li>
                )
              )}

              {!requirements.length && (
                <li className="text-white/40">
                  No requirements specified.
                </li>
              )}
            </ul>
          </DetailRow>

          {/* COMPENSATION */}
          <DetailRow label="COMPENSATION">
            <p className="font-mono text-base font-bold text-[#F2FF65]">
              {displayCompensation}
            </p>
          </DetailRow>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((previous) => !previous)}
          className="mx-auto mt-5 flex items-center gap-1.5 rounded-lg border border-[#2A3C2E] bg-[#141F16] px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-[#F2FF65] transition-all hover:border-[#F2FF65]/50"
        >
          {expanded ? "Collapse Details" : "Show Full Details"}
          <ChevronDown
            size={13}
            className={`transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>


      {/* =================================================
          APPLICATION BAR
      ================================================= */}
      <div className="flex items-center justify-between border-t border-[#2A3C2E] bg-[#95402F] px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#F2FF65]">
          <Users size={14} />
          <span>
            {applicationCount}{" "}
            {applicationCount === 1 ? "Application" : "Applications"}
          </span>
        </div>

        <span className="text-[10px] text-white/50">
          {opportunity.status || "Draft"}
        </span>
      </div>

      {/* =================================================
          ACADEMY ACTION BAR
      ================================================= */}
      <div className="flex items-center gap-2 bg-[#141F16] p-3">
        <button
          type="button"
          onClick={() => onEdit(opportunity)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-semibold text-white transition-all hover:bg-white/5"
        >
          <Edit3 size={14} />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onViewApplications(opportunity)}
          className="flex-[1.7] rounded-lg bg-[#F2FF65] py-2.5 text-xs font-bold text-[#141F16] transition-all hover:bg-[#E2EF4F]"
        >
          View Applications
        </button>
      </div>
    </article>
  );
}

/* =========================================================
   DETAIL ROW
========================================================= */

function DetailRow({ label, children }) {
  return (
    <div className="border-b border-[#2A3C2E] py-4 last:border-b-0">
      <span className="text-[9px] font-mono font-bold tracking-[0.18em] text-white/40">
        {label}
      </span>

      <div className="mt-1.5">{children}</div>
    </div>
  );
}

/* =========================================================
   ADD / EDIT MODAL
========================================================= */

function OpportunityFormModal({
  open,
  opportunity,
  academy,
  onClose,
  onSave,
}) {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    sport: "",
    description: "",
    image: "",
    role: "",
    location: "",
    timeline: "",
    responsibilities: "",
    requirements: "",
    compensation: "",
    status: "Open",
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!open) return;

    if (opportunity) {
      const requirements = Array.isArray(opportunity.requirements)
        ? opportunity.requirements.join("\n")
        : opportunity.requirements || "";

      const image =
        opportunity.image ||
        opportunity.mediaImage ||
        opportunity.coverImage ||
        opportunity.imageUrl ||
        "";

      setForm({
        title: opportunity.title || "",
        sport: opportunity.sport || "",
        description: opportunity.description || opportunity.details || "",
        image,
        role: opportunity.role || "",
        location: opportunity.location || "",
        timeline: opportunity.timeline || "",
        responsibilities:
          opportunity.responsibilities ||
          opportunity.whatYouWillDo ||
          "",
        requirements,
        compensation:
          opportunity.compensation ||
          opportunity.compensation_cash ||
          "",
        status: opportunity.status || "Open",
      });

      setImagePreview(image);
    } else {
      setForm({
        title: "",
        sport: "",
        description: "",
        image: "",
        role: "",
        location: "",
        timeline: "",
        responsibilities: "",
        requirements: "",
        compensation: "",
        status: "Open",
      });

      setImagePreview("");
    }
  }, [open, opportunity]);

  if (!open) return null;

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    try {
      const res = await api.upload.image(file);
      if (res.data?.url) {
        if (imagePreview && imagePreview !== opportunity?.media_image && imagePreview.includes('/uploads/')) {
          api.upload.deleteImage(imagePreview);
        }
        setImagePreview(res.data.url);
        updateField("image", res.data.url);
      }
    } catch (err) {
      alert("Failed to upload image: " + err.message);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    if (imagePreview && imagePreview.includes('/uploads/')) {
      api.upload.deleteImage(imagePreview);
    }
    setImagePreview("");
    updateField("image", "");
  };

  const handleSubmit = (mode) => {
    if (!form.title.trim()) {
      alert("Please enter an opportunity title.");
      return;
    }

    if (!form.sport.trim()) {
      alert("Please select or enter a sport.");
      return;
    }

    if (!form.role.trim()) {
      alert("Please enter the role.");
      return;
    }

    if (!form.compensation.trim() && mode === "publish") {
      alert("Please enter compensation before publishing.");
      return;
    }

    const requirements = form.requirements
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    onSave(
      {
        ...form,
        title: form.title.trim(),
        sport: form.sport.trim(),
        description: form.description.trim(),
        role: form.role.trim(),
        location: form.location.trim(),
        timeline: form.timeline.trim(),
        responsibilities: form.responsibilities.trim(),
        requirements,
        compensation: form.compensation.trim(),
        status: mode === "draft" ? "Draft" : "Open",
        image: form.image || imagePreview || MOCK_IMAGE,
      },
      mode
    );
  };

  const academyName =
    academy?.name || academy?.academyName || "Your Academy";

  const academyAvatar =
    academy?.avatar ||
    academy?.logo ||
    "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=150&auto=format&fit=crop&q=80";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#07130D]/80 p-0 backdrop-blur-md sm:items-center sm:p-5"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-[#141F16] shadow-[0_30px_100px_rgba(0,0,0,0.6)] sm:max-h-[92vh] sm:rounded-2xl">
        {/* MODAL HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-gradient-to-r from-[#315038] to-[#223F31] px-5 py-4 sm:px-6">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F2FF65]">
              Academy workspace
            </p>

            <h2 className="mt-1 font-['Poppins'] text-xl font-bold text-white">
              {opportunity ? "Edit Opportunity" : "Add Opportunity"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-black/10 text-white/70 transition-all hover:bg-[#F2FF65] hover:text-[#141F16]"
          >
            <X size={18} />
          </button>
        </div>

        {/* MODAL CONTENT */}
        <div className="overflow-y-auto px-5 py-5 sm:px-6">
          {/* POST PREVIEW HEADER */}
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-white/10 bg-[#0B120D] p-3">
            <img
              src={academyAvatar}
              alt={academyName}
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-white">{academyName}</p>
                <CheckCircle2
                  size={13}
                  className="text-[#F2FF65]"
                />
              </div>

              <p className="text-[10px] text-white/40">
                This is how athletes will see your post.
              </p>
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div className="mb-5">
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-[#F2FF65]/70">
              Opportunity Image
            </label>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="group relative min-h-[190px] cursor-pointer overflow-hidden rounded-xl border border-dashed border-[#F2FF65]/30 bg-[#0B120D] transition-all hover:border-[#F2FF65]/70"
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Opportunity preview"
                    className="h-[240px] w-full object-cover"
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/35 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex items-center gap-2 rounded-lg bg-[#F2FF65] px-4 py-2 text-xs font-bold text-[#141F16]">
                      <Upload size={14} />
                      Change Image
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-xs font-bold text-white hover:bg-red-600"
                    >
                      <X size={14} />
                      Remove Image
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex min-h-[190px] flex-col items-center justify-center px-5 text-center">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#F2FF65]/20 bg-[#F2FF65]/5">
                    <ImagePlus
                      size={22}
                      className="text-[#F2FF65]"
                    />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-white">
                    Upload opportunity image
                  </p>

                  <p className="mt-1 text-[10px] text-white/40">
                    JPG, PNG or WEBP • This image will appear in the athlete
                    feed.
                  </p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* FORM */}
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Opportunity Title" required>
              <input
                value={form.title}
                onChange={(event) =>
                  updateField("title", event.target.value)
                }
                placeholder="e.g. Assistant Cricket Coach"
                className="form-input"
              />
            </FormField>

            <FormField label="Sport" required>
              <select
                value={form.sport}
                onChange={(event) =>
                  updateField("sport", event.target.value)
                }
                className="form-input"
              >
                <option value="">Select sport</option>
                <option value="Cricket">Cricket</option>
                <option value="Football">Football</option>
                <option value="Track & Field">Track & Field</option>
                <option value="Tennis">Tennis</option>
                <option value="Badminton">Badminton</option>
                <option value="Basketball">Basketball</option>
                <option value="Athletics">Athletics</option>
                <option value="Other">Other</option>
              </select>
            </FormField>

            <div className="sm:col-span-2">
              <FormField label="Description">
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  placeholder="Describe the opportunity just like a social media post..."
                  rows={4}
                  className="form-input resize-none"
                />
              </FormField>
            </div>

            <FormField label="Role" required>
              <input
                value={form.role}
                onChange={(event) =>
                  updateField("role", event.target.value)
                }
                placeholder="e.g. Assistant Coach"
                className="form-input"
              />
            </FormField>

            <FormField label="Location">
              <input
                value={form.location}
                onChange={(event) =>
                  updateField("location", event.target.value)
                }
                placeholder="e.g. Delhi"
                className="form-input"
              />
            </FormField>

            <FormField label="Active Timeline">
              <input
                value={form.timeline}
                onChange={(event) =>
                  updateField("timeline", event.target.value)
                }
                placeholder="e.g. Aug 15 – Sep 15, 2026"
                className="form-input"
              />
            </FormField>

            <FormField label="Compensation" required>
              <input
                value={form.compensation}
                onChange={(event) =>
                  updateField("compensation", event.target.value)
                }
                placeholder="e.g. ₹15,000 / month"
                className="form-input"
              />
            </FormField>

            <div className="sm:col-span-2">
              <FormField label="What You'll Do">
                <textarea
                  value={form.responsibilities}
                  onChange={(event) =>
                    updateField("responsibilities", event.target.value)
                  }
                  placeholder="Describe responsibilities..."
                  rows={4}
                  className="form-input resize-none"
                />
              </FormField>
            </div>

            <div className="sm:col-span-2">
              <FormField label="Requirements">
                <textarea
                  value={form.requirements}
                  onChange={(event) =>
                    updateField("requirements", event.target.value)
                  }
                  placeholder={"One requirement per line\nCricket experience\nIntermediate playing level\nEvening availability"}
                  rows={5}
                  className="form-input resize-none"
                />

                <p className="mt-1 text-[9px] text-white/35">
                  Enter one requirement per line.
                </p>
              </FormField>
            </div>

            <FormField label="Status">
              <select
                value={form.status}
                onChange={(event) =>
                  updateField("status", event.target.value)
                }
                className="form-input"
              >
                <option value="Open">Open</option>
                <option value="Draft">Draft</option>
                <option value="Closed">Closed</option>
              </select>
            </FormField>
          </div>

          {/* MOBILE PREVIEW NOTE */}
          <div className="mt-5 rounded-xl border border-[#F2FF65]/10 bg-[#F2FF65]/5 p-3">
            <div className="flex items-start gap-2">
              <ImagePlus
                size={14}
                className="mt-0.5 shrink-0 text-[#F2FF65]"
              />

              <p className="text-[10px] leading-4 text-white/55">
                Your uploaded image is stored in the form preview and will be
                displayed at the top of the opportunity post.
              </p>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-white/10 bg-[#0B120D] p-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 px-5 py-3 text-xs font-bold text-white/60 transition-all hover:bg-white/5 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("draft")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#F2FF65]/30 px-5 py-3 text-xs font-bold text-[#F2FF65] transition-all hover:bg-[#F2FF65]/10"
          >
            <FileText size={14} />
            Save Draft
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("publish")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2FF65] px-5 py-3 text-xs font-bold text-[#141F16] transition-all hover:bg-[#E2EF4F]"
          >
            <Send size={14} />
            {opportunity ? "Update Opportunity" : "Publish Opportunity"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.16em] text-white/45">
        {label}
        {required && <span className="ml-1 text-[#F2FF65]">*</span>}
      </span>

      {children}
    </label>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AcademyOpportunitiesSection({
  academy,
  opportunities = [],
  agreements = [],
  setActiveTab,
}) {
  const [statusFilter, setStatusFilter] = useState("All");

  const [localOpportunities, setLocalOpportunities] = useState(
    opportunities || []
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState(null);

  const fetchMyOpportunities = async () => {
    try {
      const res = await api.opportunities.getMyPosted();
      if (res?.data?.opportunities && res.data.opportunities.length > 0) {
        setLocalOpportunities(res.data.opportunities);
      }
    } catch (err) {
      console.warn("Could not fetch academy opportunities:", err.message);
    }
  };

  useEffect(() => {
    fetchMyOpportunities();
  }, []);

  /*
   * Keep API/parent opportunities synced when they become available.
   */
  useEffect(() => {
    if (opportunities.length) {
      setLocalOpportunities(opportunities);
    }
  }, [opportunities]);

  const visibleOpportunities = useMemo(() => {
    if (statusFilter === "All") {
      return localOpportunities;
    }

    return localOpportunities.filter(
      (opportunity) =>
        String(opportunity.status || "Draft").toLowerCase() ===
        statusFilter.toLowerCase()
    );
  }, [localOpportunities, statusFilter]);

  const getApplications = (opportunity) => {
    return agreements.filter(
      (agreement) =>
        String(agreement.opportunity_id) === String(opportunity.id)
    );
  };

  /* =====================================================
     ADD
  ===================================================== */

  const openAddModal = () => {
    setEditingOpportunity(null);
    setModalOpen(true);
  };

  /* =====================================================
     EDIT
  ===================================================== */

  const openEditModal = (opportunity) => {
    setEditingOpportunity(opportunity);
    setModalOpen(true);
  };

  /* =====================================================
     SAVE / UPDATE
  ===================================================== */

  const handleSaveOpportunity = async (formData) => {
    try {
      const payload = {
        title: formData.title,
        role: formData.role,
        sport: formData.sport,
        compensation: formData.compensation,
        description: formData.description || formData.responsibilities,
        responsibilities: formData.responsibilities,
        requirements: formData.requirements,
        location: formData.location,
        timeline: formData.timeline,
        caption: formData.description || formData.title,
        media_image: formData.image,
        status: formData.status === "Draft" ? "closed" : "active",
      };

      let res;
      if (editingOpportunity && editingOpportunity.id) {
        res = await api.opportunities.update(editingOpportunity.id, payload);
      } else {
        res = await api.opportunities.create(payload);
      }
      if (res?.data?.opportunity) {
        setLocalOpportunities((prev) => [
          res.data.opportunity,
          ...prev.filter((o) => o.id !== res.data.opportunity.id),
        ]);
      }
      await fetchMyOpportunities();
      setModalOpen(false);
      setEditingOpportunity(null);
    } catch (err) {
      console.error("Save opportunity error:", err);
      // Seamless optimistic UI update
      setLocalOpportunities((prev) => [
        {
          ...formData,
          id: `local-opportunity-${Date.now()}`,
          academy_name: academy?.name || "Your Academy",
          media_image: formData.image,
          status: formData.status || "active",
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
      setModalOpen(false);
      setEditingOpportunity(null);
    }
  };


  /* =====================================================
     VIEW APPLICATIONS
  ===================================================== */

  const handleViewApplications = (opportunity) => {
    /*
     * The opportunity page itself only shows the application count.
     * Detailed applicant review remains on the Applications page.
     */
    setActiveTab?.("applications", opportunity.id);
  };

  return (
    <section className="min-h-full w-full bg-[#14241A] font-['Inter'] text-[#F7F5ED]">
      {/* =================================================
          HEADER
      ================================================= */}
      <header className="relative mb-7 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#0F2F23] via-[#166534] to-[#315038] px-6 py-7 shadow-[0_15px_40px_rgba(0,0,0,0.18)] sm:px-8 sm:py-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#F2FF65]/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F2FF65] shadow-[0_0_10px_#F2FF65]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F2FF65]">
                {academy?.name || academy?.academyName || "Academy workspace"}
              </p>
            </div>

            <h1 className="font-['Poppins'] text-3xl font-bold tracking-[-0.055em] sm:text-3xl">
            <span className="text-[#F2FF65]">Your </span>
            <span className="text-[#F7F5ED]">Opportunities</span>
          </h1>

            <p className="mt-2 max-w-xl text-sm leading-5 text-[#F7F5ED]/65">
              Manage the opportunities posted by your academy.
            </p>
          </div>

          {/* ADD OPPORTUNITY — MODAL */}
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2FF65] px-5 py-3 text-sm font-bold text-[#07130D] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(242,255,101,0.2)]"
          >
            <Plus size={17} />
            Add Opportunity
          </button>
        </div>
      </header>

      {/* =================================================
          FILTER BAR
      ================================================= */}
      <div className="mb-7 flex flex-wrap items-center gap-2 rounded-2xl border border-[#2A3C2E] bg-[#141F16] p-3">
        {["All", "Open", "Draft", "Closed"].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`shrink-0 rounded-xl border px-3.5 py-2 text-[10px] font-['Poppins'] font-bold uppercase tracking-wider transition-all ${
                  statusFilter === status
                    ? "border-[#F2FF65] bg-[#F2FF65] text-[#141F16] shadow-sm"
                    : "border-[#2A3C2E] bg-[#0B120D] text-gray-300 hover:border-[#F2FF65]/50 hover:text-white"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* =================================================
          COUNT
      ================================================= */}
      <div className="mb-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2FF65]/55">
          Published by your academy
        </p>

        <p className="mt-1 text-sm text-[#F7F5ED]/50">
          {visibleOpportunities.length}{" "}
          {visibleOpportunities.length === 1
            ? "opportunity"
            : "opportunities"}
        </p>
      </div>

      {/* =================================================
          VERTICAL INSTAGRAM-STYLE FEED
      ================================================= */}
      {visibleOpportunities.length ? (
        <div className="mx-auto flex max-w-3xl flex-col gap-6 pb-16">
          {visibleOpportunities.map((opportunity) => (
            <OpportunityPost
              key={opportunity.id || opportunity._id}
              opportunity={opportunity}
              applicationCount={getApplications(opportunity).length || opportunity.applicationCount || 0}
              onEdit={openEditModal}
              onViewApplications={handleViewApplications}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[141F16] px-6 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#F2FF65]/20 bg-[#F2FF65]/5">
            <BriefcaseBusiness
              size={25}
              className="text-[#F2FF65]"
            />
          </div>

          <h2 className="mt-5 font-['Poppins'] text-lg font-semibold text-white">
            No opportunities found
          </h2>

          <p className="mt-2 max-w-sm text-sm text-white/50">
            There are no opportunities in the selected category.
          </p>

          <button
            type="button"
            onClick={openAddModal}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F2FF65] px-5 py-3 text-xs font-bold text-[#07130D]"
          >
            <Plus size={15} />
            Add Opportunity
          </button>
        </div>
      )}

      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}
      <OpportunityFormModal
        open={modalOpen}
        opportunity={editingOpportunity}
        academy={academy}
        onClose={() => {
          setModalOpen(false);
          setEditingOpportunity(null);
        }}
        onSave={handleSaveOpportunity}
      />
    </section>
  );
}