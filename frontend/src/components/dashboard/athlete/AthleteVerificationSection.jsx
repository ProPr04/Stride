import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  Lock,
  ChevronRight,
  Award,
  FileCheck,
  Building2,
  Trophy,
  UploadCloud,
  AlertCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export default function AthleteVerificationSection() {
  const [selectedTier, setSelectedTier] = useState(3); // Level 3: Competition Verified (Earned)
  const [showUploadModal, setShowUploadModal] = useState(false);

  // 4-Step Hierarchy Tiers
  const tiers = [
    {
      level: 1,
      name: 'SELF-VERIFIED',
      status: 'earned',
      badgeText: 'LEVEL 01',
      description: 'Basic contact information and personal identity confirmed by athlete.',
      unlockedPerks: ['Public Athlete Profile', 'Browse Open Trials & Grants', 'Basic Opportunity Alerts']
    },
    {
      level: 2,
      name: 'ACADEMY VERIFIED',
      status: 'earned',
      badgeText: 'LEVEL 02',
      description: 'Training academy or head coach endorsement & training attendance logs confirmed.',
      unlockedPerks: ['Academy Endorsement Badge', 'Verified Training Logs', 'Priority Trial Eligibility']
    },
    {
      level: 3,
      name: 'COMPETITION VERIFIED',
      status: 'current',
      badgeText: 'CURRENT LEVEL (EARNED)',
      description: 'Official electronic timing, competition results, and tournament medals verified.',
      unlockedPerks: ['Gold Competition Badge', 'Direct Sponsorship Applications', 'Top 10% Scout Search Ranking', 'Verified Personal Bests (10.42s)']
    },
    {
      level: 4,
      name: 'OFFICIAL VERIFIED',
      status: 'locked',
      badgeText: 'LOCKED // ACTION REQUIRED',
      description: 'National Governing Body license and WADA Anti-Doping compliance clearance.',
      unlockedPerks: ['Platinum Federation Badge', 'Official Grant Funding Direct Payouts', 'International Scout Direct Line', 'Verified Elite Athlete Status']
    }
  ];

  // Detailed breakdown of profile items verified per category
  const verifiedProfileItems = [
    {
      category: 'PERSONAL IDENTITY',
      tierLevel: 1,
      tierName: 'Self-Verified',
      status: 'verified',
      items: [
        { label: 'Full Legal Name', value: 'Alex Morgan', verifiedDate: 'Jan 10, 2026' },
        { label: 'Government Passport ID', value: 'US-PASS-****8912', verifiedDate: 'Jan 12, 2026' },
        { label: 'Contact Phone & Email', value: '+1 (310) ***-9921', verifiedDate: 'Jan 10, 2026' }
      ]
    },
    {
      category: 'ACADEMY & COACHING',
      tierLevel: 2,
      tierName: 'Academy Verified',
      status: 'verified',
      items: [
        { label: 'Affiliated Sports Club', value: 'Metro Track Alliance', verifiedDate: 'Feb 01, 2026' },
        { label: 'Head Coach Endorsement', value: 'Coach Marcus Vance (Lic #8821)', verifiedDate: 'Feb 03, 2026' },
        { label: 'Training Attendance Log', value: '96% Verified Attendance', verifiedDate: 'Feb 15, 2026' }
      ]
    },
    {
      category: 'COMPETITION & TIMING RECORDS',
      tierLevel: 3,
      tierName: 'Competition Verified',
      status: 'verified',
      items: [
        { label: '100m Sprint Record', value: '10.42s (FAT Electronic Timing)', verifiedDate: 'Jul 20, 2026' },
        { label: 'Tournament Medal Record', value: 'Gold Medalist - West Coast Trials', verifiedDate: 'Jul 22, 2026' },
        { label: 'Official Race Result Sheet', value: 'PDF Upload Verified by Stride Official', verifiedDate: 'Jul 25, 2026' }
      ]
    },
    {
      category: 'OFFICIAL FEDERATION & ANTI-DOPING',
      tierLevel: 4,
      tierName: 'Official Verified',
      status: 'unearned',
      items: [
        { label: 'National Athletics License', value: 'Pending License Upload', verifiedDate: 'NOT EARNED' },
        { label: 'WADA Anti-Doping Passport', value: 'Pending Document Verification', verifiedDate: 'NOT EARNED' },
        { label: 'International Olympic Qualifier', value: 'Requires Official Level 4', verifiedDate: 'NOT EARNED' }
      ]
    }
  ];

  return (
    <div className="verification-pane matchpoint-fade-in">
      {/* Top Banner with High Quality Unsplash Athlete Visual */}
      <div className="court-panel-container verification-hero-panel">
        <div className="verification-hero-grid">
          <div className="verification-hero-text">
            <div className="panel-tag font-mono">06.4 // PROFILE VERIFICATION MATRIX</div>
            <h1 className="verification-hero-title">
              STRIDE <span className="text-lime">VERIFICATION HIERARCHY</span>
            </h1>
            <p className="hero-subtext">
              Higher verification levels significantly increase trust from brand sponsors, elite scouts, and official trial committees. Unearned levels remain locked until verified.
            </p>

            <div className="current-badge-pill-container">
              <span className="current-level-pill">
                <ShieldCheck size={16} /> CURRENT STATUS: LEVEL 3 — COMPETITION VERIFIED
              </span>
              <span className="trust-boost-tag font-mono">+85% TRUST SCORE</span>
            </div>
          </div>

          <div className="verification-hero-image-box">
            <img
              src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80"
              alt="Athlete Competition Track"
              className="hero-unsplash-img"
            />
            <div className="image-overlay-card">
              <div className="overlay-badge">EARNED BADGE</div>
              <span className="overlay-title font-mono">GOLD COMPETITION TIER</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Level Interactive Stepper Flow */}
      <div className="court-panel-container mt-24">
        <div className="panel-header flex-between">
          <div>
            <span className="panel-tag font-mono">VERIFICATION PROGRESSION</span>
            <h3 className="panel-title-display">4-STAGE TRUST HIERARCHY</h3>
          </div>
          <span className="font-mono text-lime text-xs">CLICK ANY TIER TO EXPLORE</span>
        </div>

        <div className="verification-stepper-grid">
          {tiers.map((tier) => {
            const isEarned = tier.status === 'earned';
            const isCurrent = tier.status === 'current';
            const isLocked = tier.status === 'locked';

            return (
              <div
                key={tier.level}
                className={`stepper-card ${isCurrent ? 'current-step' : ''} ${isEarned ? 'earned-step' : ''} ${isLocked ? 'locked-step' : ''} ${selectedTier === tier.level ? 'active-selection' : ''}`}
                onClick={() => setSelectedTier(tier.level)}
              >
                <div className="stepper-top">
                  <span className="stepper-level-num font-mono">0{tier.level}</span>
                  {isEarned && <span className="stepper-icon-badge earned"><Check size={14} /></span>}
                  {isCurrent && <span className="stepper-icon-badge current"><ShieldCheck size={14} /></span>}
                  {isLocked && <span className="stepper-icon-badge locked"><Lock size={14} /></span>}
                </div>

                <h4 className="stepper-tier-name">{tier.name}</h4>
                <span className="stepper-badge-text font-mono">{tier.badgeText}</span>

                <div className="stepper-progress-bar">
                  <div
                    className="stepper-progress-fill"
                    style={{
                      width: isEarned || isCurrent ? '100%' : '0%',
                      backgroundColor: isCurrent ? 'var(--accent-yellow)' : isEarned ? '#4ade80' : 'rgba(255,255,255,0.1)'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Tier Detail View */}
        {tiers.find(t => t.level === selectedTier) && (
          <div className="selected-tier-detail-box mt-24">
            {(() => {
              const currentT = tiers.find(t => t.level === selectedTier);
              return (
                <div className="tier-detail-flex">
                  <div className="tier-detail-info">
                    <div className="flex-align-gap">
                      <h3 className="text-lime font-heading text-xl">{currentT.name}</h3>
                      {currentT.status === 'locked' ? (
                        <span className="unearned-tag font-mono"><Lock size={12} /> UNEARNED / LOCKED</span>
                      ) : (
                        <span className="earned-tag font-mono"><Check size={12} /> EARNED & VERIFIED</span>
                      )}
                    </div>
                    <p className="tier-detail-desc">{currentT.description}</p>

                    <div className="perks-list-container">
                      <span className="perks-header font-mono">UNLOCKED TRUST PERKS:</span>
                      <div className="perks-chips">
                        {currentT.unlockedPerks.map((perk, i) => (
                          <span key={i} className={`perk-chip ${currentT.status === 'locked' ? 'locked' : ''}`}>
                            {currentT.status === 'locked' ? <Lock size={12} /> : <Check size={12} className="text-lime" />} {perk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {currentT.status === 'locked' && (
                    <div className="tier-unlock-action-box">
                      <div className="lock-icon-wrapper">
                        <Lock size={28} className="text-amber" />
                      </div>
                      <h4 className="font-heading text-white">UNLOCK LEVEL 04</h4>
                      <p className="text-xs text-light">Upload official federation license to earn Platinum Verified status.</p>
                      <button className="matchpoint-pill-btn primary full-w mt-12" onClick={() => setShowUploadModal(true)}>
                        <UploadCloud size={16} /> SUBMIT DOCUMENTS
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Verified Profile Information Breakdown */}
      <div className="court-panel-container mt-24">
        <div className="panel-header flex-between">
          <div>
            <span className="panel-tag font-mono">PROFILE AUDIT</span>
            <h3 className="panel-title-display">VERIFIED PROFILE INFORMATION BREAKDOWN</h3>
          </div>
          <span className="font-mono text-lime text-xs">AUDITED BY STRIDE COMPLIANCE</span>
        </div>

        <div className="verified-categories-grid">
          {verifiedProfileItems.map((cat, idx) => {
            const isCategoryVerified = cat.status === 'verified';

            return (
              <div key={idx} className={`profile-cat-card ${isCategoryVerified ? 'cat-verified' : 'cat-unearned'}`}>
                <div className="cat-card-header">
                  <div>
                    <span className="cat-tier-label font-mono">LEVEL 0{cat.tierLevel} // {cat.tierName}</span>
                    <h4 className="cat-title">{cat.category}</h4>
                  </div>
                  {isCategoryVerified ? (
                    <span className="cat-status-pill verified"><Check size={13} /> VERIFIED</span>
                  ) : (
                    <span className="cat-status-pill unearned"><Lock size={13} /> UNEARNED</span>
                  )}
                </div>

                <div className="cat-items-list">
                  {cat.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="profile-audit-item">
                      <div className="audit-label-group">
                        <span className="audit-item-name">{item.label}</span>
                        <span className="audit-item-val font-mono">{item.value}</span>
                      </div>
                      <span className={`audit-date font-mono ${item.verifiedDate === 'NOT EARNED' ? 'text-orange' : 'text-lime'}`}>
                        {item.verifiedDate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How Verification Improves Trust Explanation Card */}
      <div className="matchpoint-main-cols mt-24">
        <div className="court-panel-container">
          <div className="panel-header">
            <span className="panel-tag font-mono">WHY VERIFY?</span>
            <h3 className="panel-title-display">HOW STRIDE VERIFICATION BOOSTS TRUST</h3>
          </div>

          <div className="trust-explanation-list">
            <div className="trust-expl-item">
              <div className="expl-icon-box yellow">
                <Trophy size={20} />
              </div>
              <div>
                <h4 className="expl-title">9.4x Higher Response Rate</h4>
                <p className="expl-text">Brand sponsors prioritize Competition & Official Verified profiles over self-declared statistics.</p>
              </div>
            </div>

            <div className="trust-expl-item">
              <div className="expl-icon-box blue">
                <Building2 size={20} />
              </div>
              <div>
                <h4 className="expl-title">Direct Grant Eligibility</h4>
                <p className="expl-text">Official funding grants require Federation & Anti-Doping verification before payouts are released.</p>
              </div>
            </div>

            <div className="trust-expl-item">
              <div className="expl-icon-box green">
                <FileCheck size={20} />
              </div>
              <div>
                <h4 className="expl-title">Tamper-Proof Race Certificates</h4>
                <p className="expl-text">Personal best times are cross-referenced with FAT electronic timing systems to eliminate fake claims.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Athlete Credentials & Certificate Card */}
        <div className="court-panel-container flex-col-between">
          <div>
            <div className="panel-header">
              <span className="panel-tag font-mono">OFFICIAL CERTIFICATE</span>
              <h3 className="panel-title-display">DIGITAL PASSPORT CREDENTIAL</h3>
            </div>

            <div className="digital-passport-card">
              <div className="passport-header font-mono">
                <span>STRIDE ATHLETE ID: #STR-88492</span>
                <span className="text-lime">VERIFIED TIER 3</span>
              </div>

              <div className="passport-body">
                <img
                  src="https://images.unsplash.com/photo-1517649763962-0c6232661a0b?w=300&auto=format&fit=crop&q=80"
                  alt="Track Competition Athlete"
                  className="passport-photo"
                />
                <div className="passport-details">
                  <h4 className="font-heading text-white text-lg">Alex Morgan</h4>
                  <p className="text-xs text-lime font-mono">TRACK & FIELD • 100M/200M</p>
                  <p className="text-xs text-light mt-4">Verified by West Coast Athletics Association & Metro Track Alliance.</p>
                </div>
              </div>

              <div className="passport-footer font-mono text-xs">
                <span>ISSUED: JAN 2026</span>
                <span>STATUS: ACTIVE & VALID</span>
              </div>
            </div>
          </div>

          <button className="matchpoint-pill-btn secondary full-w mt-16" onClick={() => alert('Downloading Verified Athlete Certificate PDF...')}>
            DOWNLOAD OFFICIAL CERTIFICATE PDF <ExternalLink size={14} />
          </button>
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="matchpoint-modal-backdrop" onClick={() => setShowUploadModal(false)}>
          <div className="matchpoint-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header flex-between">
              <div>
                <span className="panel-tag font-mono">UPGRADE TO LEVEL 04</span>
                <h3 className="modal-title font-heading text-white">SUBMIT FEDERATION DOCUMENTS</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setShowUploadModal(false)}>✕</button>
            </div>

            <div className="modal-body mt-16">
              <p className="text-sm text-light">
                To earn <strong>OFFICIAL VERIFIED (LEVEL 4)</strong>, please upload your official National Athletics Federation license or WADA Anti-Doping compliance certificate.
              </p>

              <div className="upload-dropzone mt-16">
                <UploadCloud size={36} className="text-lime" />
                <span className="font-heading text-white text-sm">DRAG & DROP OFFICIAL PDF / IMAGE HERE</span>
                <span className="text-xs text-light font-mono">Supports PDF, PNG, JPG (Max 10MB)</span>
                <button className="matchpoint-pill-btn primary action-sm mt-12">BROWSE FILES</button>
              </div>
            </div>

            <div className="modal-footer mt-24 flex-between">
              <button className="matchpoint-pill-btn secondary action-sm" onClick={() => setShowUploadModal(false)}>CANCEL</button>
              <button className="matchpoint-pill-btn primary action-sm" onClick={() => { alert('Document submitted for official audit!'); setShowUploadModal(false); }}>SUBMIT FOR VERIFICATION</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
