import pool from '../config/db.js';
import {
  evaluateAcademyVerificationLevel,
  evaluateAthleteVerificationLevel
} from './verificationModel.js';

/*
 * Initializes the agreements table in PostgreSQL.
 * Links opportunities, athletes, and academies together.
 */
export const createAgreementTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS agreements (
      id SERIAL PRIMARY KEY,
      opportunity_id INTEGER REFERENCES opportunities(id) ON DELETE CASCADE,
      athlete_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      academy_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(opportunity_id, athlete_id) -- Prevents an athlete from applying to the same opportunity twice
    );
  `;
  await pool.query(queryText);
};

/**
 * Creates a new agreement (e.g., an athlete applying for an opportunity).
 */
export const createAgreement = async (opportunityId, athleteId, academyId) => {
  const queryText = `
    INSERT INTO agreements (opportunity_id, athlete_id, academy_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [opportunityId, athleteId, academyId];
  const { rows } = await pool.query(queryText, values);
  const newAgreement = rows[0];

  // Auto-evaluate Academy verification level on receiving an application (promotes to L2 on >= 1 application)
  if (academyId) {
    try {
      await evaluateAcademyVerificationLevel(academyId);
    } catch (err) {
      console.warn('Could not evaluate academy level on application:', err.message);
    }
  }

  return newAgreement;
};


/**
 * Retrieves agreements for a specific user (either an athlete or an academy).
 */
export const getAgreementsByUser = async (userId, role) => {
  const numericUserId = parseInt(userId, 10);
  if (!numericUserId || isNaN(numericUserId)) {
    return [];
  }

  let queryText = '';
  
  if (role === 'athlete') {
    queryText = `
      SELECT 
        a.id AS id,
        a.id AS agreement_id,
        a.opportunity_id,
        a.athlete_id,
        a.academy_id,
        a.status,
        a.created_at,
        a.updated_at,
        o.title,
        o.role,
        o.sport,
        o.compensation_cash,
        o.location AS opportunity_location,
        o.timeline AS opportunity_timeline,
        o.description AS opportunity_description,
        o.requirements AS opportunity_requirements,
        o.perks AS opportunity_perks,
        o.media_image AS opportunity_media_image,
        COALESCE(ap.academy_name, 'Partner Academy') AS academy_name,
        COALESCE(o.location, ap.location, 'India') AS academy_location
      FROM agreements a
      JOIN opportunities o ON a.opportunity_id = o.id
      LEFT JOIN academy_profiles ap ON a.academy_id = ap.user_id
      WHERE a.athlete_id = $1
      ORDER BY a.created_at DESC;
    `;
  } else if (role === 'academy') {
    queryText = `
      SELECT 
        a.id AS id,
        a.id AS agreement_id,
        a.opportunity_id,
        a.athlete_id,
        a.academy_id,
        a.status,
        a.created_at,
        a.updated_at,
        o.title AS opportunity_title,
        o.role AS opportunity_role,
        o.sport AS opportunity_sport,
        o.compensation_cash AS opportunity_compensation,
        o.location AS opportunity_location,
        o.timeline AS opportunity_timeline,
        u.email AS athlete_email,
        COALESCE(ath.full_name, split_part(u.email, '@', 1)) AS athlete_name,
        ath.avatar_url AS athlete_avatar,
        ath.location AS athlete_location,
        ath.playing_level AS athlete_level,
        COALESCE(ath.sport, o.sport) AS athlete_sport,
        ath.playing_level AS athlete_playing_level,
        ath.skills AS athlete_skills,
        ath.bio AS athlete_bio,
        ath.verification_level AS athlete_verification_level
      FROM agreements a
      JOIN opportunities o ON a.opportunity_id = o.id
      JOIN users u ON a.athlete_id = u.id
      LEFT JOIN athlete_profiles ath ON a.athlete_id = ath.user_id
      WHERE a.academy_id = $1
      ORDER BY a.created_at DESC;
    `;
  } else {
    return [];
  }

  const { rows } = await pool.query(queryText, [numericUserId]);
  return rows;
};


/**
 * Updates the status of an agreement (e.g., academy accepts/rejects, or marks completed).
 */
export const updateAgreementStatus = async (agreementId, academyId, newStatus) => {
  const queryText = `
    UPDATE agreements 
    SET status = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2 AND academy_id = $3
    RETURNING *;
  `;
  const values = [newStatus, agreementId, academyId];
  const { rows } = await pool.query(queryText, values);
  const updatedAgreement = rows[0];

  // If status is 'accepted' or 'completed', trigger verification evaluation for both parties
  if (updatedAgreement && ['accepted', 'completed'].includes(newStatus.toLowerCase())) {
    try {
      // 1. Evaluate Academy (counts total recruited players -> L3 on >=2, L4 on >=5)
      await evaluateAcademyVerificationLevel(academyId);

      // 2. Evaluate Athlete (promotes to L2 or L3 based on Academy's level)
      if (updatedAgreement.athlete_id) {
        await evaluateAthleteVerificationLevel(
          updatedAgreement.athlete_id,
          academyId,
          updatedAgreement.id
        );
      }
    } catch (err) {
      console.warn('Verification evaluation error during status update:', err.message);
    }
  }

  return updatedAgreement;
};

export default {
  createAgreementTable,
  createAgreement,
  getAgreementsByUser,
  updateAgreementStatus,
};

