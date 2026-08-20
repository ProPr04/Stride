import pool from '../config/db.js';

/**
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
  return rows[0];
};

/**
 * Retrieves agreements for a specific user (either an athlete or an academy).
 */
export const getAgreementsByUser = async (userId, role) => {
  let queryText = '';
  
  if (role === 'athlete') {
    queryText = `
      SELECT a.*, o.title, o.role, o.sport, o.compensation_cash 
      FROM agreements a
      JOIN opportunities o ON a.opportunity_id = o.id
      WHERE a.athlete_id = $1
      ORDER BY a.created_at DESC;
    `;
  } else if (role === 'academy') {
    queryText = `
      SELECT a.*, o.title, o.role, o.sport 
      FROM agreements a
      JOIN opportunities o ON a.opportunity_id = o.id
      WHERE a.academy_id = $1
      ORDER BY a.created_at DESC;
    `;
  }

  const { rows } = await pool.query(queryText, [userId]);
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
  return rows[0];
};

export default {
  createAgreementTable,
  createAgreement,
  getAgreementsByUser,
  updateAgreementStatus,
};
