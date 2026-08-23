import pool from '../config/db.js';

/**
 * Initializes the verification_logs table and ensures verification_level exists on academy_profiles.
 */
export const createVerificationTable = async () => {
  const queryText = `
    -- 1. Ensure verification_level exists on academy_profiles
    ALTER TABLE academy_profiles 
    ADD COLUMN IF NOT EXISTS verification_level INTEGER DEFAULT 1 CHECK (verification_level BETWEEN 1 AND 4);

    -- 2. Ensure verification_level exists on athlete_profiles
    ALTER TABLE athlete_profiles 
    ADD COLUMN IF NOT EXISTS verification_level INTEGER DEFAULT 1 CHECK (verification_level BETWEEN 1 AND 4);

    -- 3. Create the verification audit & history log table
    CREATE TABLE IF NOT EXISTS verification_logs (
      id SERIAL PRIMARY KEY,
      target_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      target_type VARCHAR(50) NOT NULL CHECK (target_type IN ('athlete', 'academy')),
      verified_by_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      old_level INTEGER NOT NULL CHECK (old_level BETWEEN 1 AND 4),
      new_level INTEGER NOT NULL CHECK (new_level BETWEEN 1 AND 4),
      reason TEXT NOT NULL,
      metadata JSONB DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_verification_logs_target ON verification_logs(target_user_id, target_type);
  `;
  await pool.query(queryText);
};

/**
 * Logs a verification level change in verification_logs.
 */
export const logVerificationEvent = async ({
  targetUserId,
  targetType,
  verifiedByUserId = null,
  oldLevel,
  newLevel,
  reason,
  metadata = {}
}) => {
  const queryText = `
    INSERT INTO verification_logs (
      target_user_id, target_type, verified_by_user_id, old_level, new_level, reason, metadata
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [
    targetUserId,
    targetType,
    verifiedByUserId,
    oldLevel,
    newLevel,
    reason,
    JSON.stringify(metadata)
  ];
  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

/**
 * Evaluates and auto-promotes an Academy's verification level:
 * - Level 1: Default on signup (0 applications / 0 recruits)
 * - Level 2: >= 1 athlete applications received / active community engagement
 * - Level 3: >= 2 recruited/verified athletes (status: 'accepted' or 'completed')
 * - Level 4: >= 5 recruited/verified athletes
 */
export const evaluateAcademyVerificationLevel = async (academyUserId) => {
  const numericId = parseInt(academyUserId, 10);
  if (!numericId || isNaN(numericId)) return null;

  // 1. Get current academy profile level
  const profileRes = await pool.query(
    'SELECT user_id, academy_name, COALESCE(verification_level, 1) AS current_level FROM academy_profiles WHERE user_id = $1;',
    [numericId]
  );
  if (profileRes.rows.length === 0) return null;
  const currentLevel = parseInt(profileRes.rows[0].current_level, 10) || 1;
  const academyName = profileRes.rows[0].academy_name;

  // 2. Count total applications received and total recruited athletes
  const statsRes = await pool.query(
    `SELECT 
       COUNT(*) AS total_applications,
       COUNT(*) FILTER (WHERE status IN ('accepted', 'completed')) AS recruited_count
     FROM agreements
     WHERE academy_id = $1;`,
    [numericId]
  );
  const totalApps = parseInt(statsRes.rows[0].total_applications, 10) || 0;
  const recruitedCount = parseInt(statsRes.rows[0].recruited_count, 10) || 0;

  // 3. Determine qualified level
  let qualifiedLevel = 1;
  let promoReason = '';

  if (recruitedCount >= 5) {
    qualifiedLevel = 4;
    promoReason = `Achieved Elite Academy status with ${recruitedCount} recruited athletes milestone.`;
  } else if (recruitedCount >= 2) {
    qualifiedLevel = 3;
    promoReason = `Promoted to Reputed Academy with ${recruitedCount} verified athlete recruits.`;
  } else if (totalApps >= 1) {
    qualifiedLevel = 2;
    promoReason = `Promoted to Active Academy with community applicant activity (${totalApps} applications received).`;
  }

  // 4. Update if level increases
  if (qualifiedLevel > currentLevel) {
    await pool.query(
      'UPDATE academy_profiles SET verification_level = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2;',
      [qualifiedLevel, numericId]
    );

    await logVerificationEvent({
      targetUserId: numericId,
      targetType: 'academy',
      verifiedByUserId: null,
      oldLevel: currentLevel,
      newLevel: qualifiedLevel,
      reason: promoReason,
      metadata: { totalApplications: totalApps, recruitedCount }
    });

    console.log(`🏛️ Academy [${academyName}] promoted: Level ${currentLevel} -> Level ${qualifiedLevel}`);
  }

  return {
    academyId: numericId,
    currentLevel: Math.max(currentLevel, qualifiedLevel),
    totalApplications: totalApps,
    recruitedCount,
    nextLevelTarget: qualifiedLevel === 1 ? 1 : qualifiedLevel === 2 ? 2 : qualifiedLevel === 3 ? 5 : null
  };
};

/**
 * Evaluates and auto-promotes an Athlete's verification level when recruited into an agreement:
 * - Level 1: Default on registration
 * - Level 2: Recruited (status: 'accepted' or 'completed') by a Level 2+ Academy
 * - Level 3: Recruited and approved by a Level 3+ Academy
 * - Level 4: Achieved when endorsed by a Level 4 Academy upon tenure/milestone completion
 */
export const evaluateAthleteVerificationLevel = async (athleteUserId, academyUserId, agreementId = null) => {
  const numericAthId = parseInt(athleteUserId, 10);
  const numericAcadId = parseInt(academyUserId, 10);
  if (!numericAthId || isNaN(numericAthId)) return null;

  // 1. Get athlete's current level
  const athRes = await pool.query(
    'SELECT user_id, full_name, COALESCE(verification_level, 1) AS current_level FROM athlete_profiles WHERE user_id = $1;',
    [numericAthId]
  );
  if (athRes.rows.length === 0) return null;
  const currentLevel = parseInt(athRes.rows[0].current_level, 10) || 1;
  const athleteName = athRes.rows[0].full_name;

  // 2. Get academy's current level
  const acadRes = await pool.query(
    'SELECT user_id, academy_name, COALESCE(verification_level, 1) AS academy_level FROM academy_profiles WHERE user_id = $1;',
    [numericAcadId]
  );
  const academyLevel = acadRes.rows.length > 0 ? (parseInt(acadRes.rows[0].academy_level, 10) || 1) : 1;
  const academyName = acadRes.rows.length > 0 ? acadRes.rows[0].academy_name : 'Partner Academy';

  // 3. Determine potential promo based on academy authority
  let qualifiedLevel = currentLevel;
  let promoReason = '';

  if (academyLevel >= 3 && currentLevel < 3) {
    qualifiedLevel = 3;
    promoReason = `Recruited & certified by Level 3 Reputed Academy (${academyName}).`;
  } else if (academyLevel >= 2 && currentLevel < 2) {
    qualifiedLevel = 2;
    promoReason = `Recruited by Level 2 Verified Academy (${academyName}).`;
  }

  // 4. Update if level increases
  if (qualifiedLevel > currentLevel) {
    await pool.query(
      'UPDATE athlete_profiles SET verification_level = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2;',
      [qualifiedLevel, numericAthId]
    );

    await logVerificationEvent({
      targetUserId: numericAthId,
      targetType: 'athlete',
      verifiedByUserId: numericAcadId,
      oldLevel: currentLevel,
      newLevel: qualifiedLevel,
      reason: promoReason,
      metadata: { agreementId, academyLevel, academyName }
    });

    console.log(`🏃 Athlete [${athleteName}] promoted: Level ${currentLevel} -> Level ${qualifiedLevel} by ${academyName}`);
  }

  return {
    athleteId: numericAthId,
    currentLevel: Math.max(currentLevel, qualifiedLevel),
    verifiedByAcademy: academyName
  };
};

/**
 * Endorsement to Level 4 (Elite Athlete) by a Level 4 Academy after verified tenure/milestones.
 */
export const promoteAthleteToLevel4WithTenure = async (athleteUserId, academyUserId, tenureReason) => {
  const numericAthId = parseInt(athleteUserId, 10);
  const numericAcadId = parseInt(academyUserId, 10);

  // 1. Verify Academy is Level 4
  const acadRes = await pool.query(
    'SELECT user_id, academy_name, COALESCE(verification_level, 1) AS level FROM academy_profiles WHERE user_id = $1;',
    [numericAcadId]
  );
  if (acadRes.rows.length === 0 || parseInt(acadRes.rows[0].level, 10) < 4) {
    throw new Error('Only Level 4 (Elite) Academies have the authority to endorse athletes to Level 4.');
  }
  const academyName = acadRes.rows[0].academy_name;

  // 2. Verify Athlete has completed / active agreements with this academy
  const agrRes = await pool.query(
    `SELECT id, status, created_at FROM agreements 
     WHERE athlete_id = $1 AND academy_id = $2 AND status IN ('accepted', 'completed');`,
    [numericAthId, numericAcadId]
  );
  if (agrRes.rows.length === 0) {
    throw new Error('Athlete must have an active or completed engagement with your academy to be endorsed for Level 4.');
  }

  // 3. Promote athlete to Level 4
  const athRes = await pool.query(
    'SELECT user_id, full_name, COALESCE(verification_level, 1) AS current_level FROM athlete_profiles WHERE user_id = $1;',
    [numericAthId]
  );
  if (athRes.rows.length === 0) throw new Error('Athlete profile not found.');
  const oldLevel = parseInt(athRes.rows[0].current_level, 10) || 1;

  await pool.query(
    'UPDATE athlete_profiles SET verification_level = 4, updated_at = CURRENT_TIMESTAMP WHERE user_id = $1;',
    [numericAthId]
  );

  const log = await logVerificationEvent({
    targetUserId: numericAthId,
    targetType: 'athlete',
    verifiedByUserId: numericAcadId,
    oldLevel,
    newLevel: 4,
    reason: tenureReason || `Endorsed to Level 4 (Elite Pro) after demonstrated tenure with ${academyName}.`,
    metadata: { academyName, agreementsCount: agrRes.rows.length }
  });

  return {
    success: true,
    athleteId: numericAthId,
    newLevel: 4,
    log
  };
};

/**
 * Retrieves full verification profile status, roadmap, and history logs for a user.
 */
export const getUserVerificationStatus = async (userId, role) => {
  const numericId = parseInt(userId, 10);
  if (!numericId || isNaN(numericId)) return null;

  let currentLevel = 1;
  let profileName = '';
  let metrics = {};

  if (role === 'athlete') {
    // 1. Auto-evaluate athlete level based on existing accepted agreements
    try {
      const topAcadRes = await pool.query(
        `SELECT a.id AS agreement_id, a.academy_id, COALESCE(ap.verification_level, 1) AS academy_level, ap.academy_name
         FROM agreements a
         JOIN academy_profiles ap ON a.academy_id = ap.user_id
         WHERE a.athlete_id = $1 AND a.status IN ('accepted', 'completed')
         ORDER BY COALESCE(ap.verification_level, 1) DESC, a.created_at DESC
         LIMIT 1;`,
        [numericId]
      );

      if (topAcadRes.rows.length > 0) {
        const topAgreement = topAcadRes.rows[0];
        await evaluateAthleteVerificationLevel(
          numericId,
          topAgreement.academy_id,
          topAgreement.agreement_id
        );
      }
    } catch (err) {
      console.warn('Real-time athlete level evaluation notice:', err.message);
    }

    const athRes = await pool.query(
      `SELECT ap.user_id, ap.full_name, COALESCE(ap.verification_level, 1) AS level,
              COUNT(a.id) FILTER (WHERE a.status IN ('accepted', 'completed')) AS accepted_agreements,
              COUNT(a.id) AS total_applications
       FROM athlete_profiles ap
       LEFT JOIN agreements a ON ap.user_id = a.athlete_id
       WHERE ap.user_id = $1
       GROUP BY ap.user_id, ap.full_name, ap.verification_level;`,
      [numericId]
    );

    if (athRes.rows.length > 0) {
      currentLevel = parseInt(athRes.rows[0].level, 10) || 1;
      profileName = athRes.rows[0].full_name;
      metrics = {
        acceptedAgreements: parseInt(athRes.rows[0].accepted_agreements, 10) || 0,
        totalApplications: parseInt(athRes.rows[0].total_applications, 10) || 0
      };
    }
  } else if (role === 'academy') {
    // 1. Auto-evaluate academy level based on existing applications and recruits
    try {
      const evalResult = await evaluateAcademyVerificationLevel(numericId);
      if (evalResult) {
        currentLevel = evalResult.currentLevel;
      }
    } catch (err) {
      console.warn('Real-time academy level evaluation notice:', err.message);
    }

    const acadRes = await pool.query(
      `SELECT ap.user_id, ap.academy_name, COALESCE(ap.verification_level, 1) AS level,
              COUNT(a.id) FILTER (WHERE a.status IN ('accepted', 'completed')) AS recruited_count,
              COUNT(a.id) AS total_applications
       FROM academy_profiles ap
       LEFT JOIN agreements a ON ap.user_id = a.academy_id
       WHERE ap.user_id = $1
       GROUP BY ap.user_id, ap.academy_name, ap.verification_level;`,
      [numericId]
    );

    if (acadRes.rows.length > 0) {
      currentLevel = parseInt(acadRes.rows[0].level, 10) || currentLevel;
      profileName = acadRes.rows[0].academy_name;
      metrics = {
        recruitedCount: parseInt(acadRes.rows[0].recruited_count, 10) || 0,
        totalApplications: parseInt(acadRes.rows[0].total_applications, 10) || 0
      };
    }
  }

  // Get verification history logs
  const logsRes = await pool.query(
    `SELECT vl.*, u.email AS verifier_email,
            COALESCE(ap.academy_name, ath.full_name, u.email) AS verifier_name
     FROM verification_logs vl
     LEFT JOIN users u ON vl.verified_by_user_id = u.id
     LEFT JOIN academy_profiles ap ON vl.verified_by_user_id = ap.user_id
     LEFT JOIN athlete_profiles ath ON vl.verified_by_user_id = ath.user_id
     WHERE vl.target_user_id = $1
     ORDER BY vl.created_at DESC;`,
    [numericId]
  );

  return {
    userId: numericId,
    role,
    profileName,
    currentLevel,
    metrics,
    logs: logsRes.rows
  };
};


export default {
  createVerificationTable,
  logVerificationEvent,
  evaluateAcademyVerificationLevel,
  evaluateAthleteVerificationLevel,
  promoteAthleteToLevel4WithTenure,
  getUserVerificationStatus
};
