import pool from '../config/db.js';

/**
 * Initializes the opportunities table in PostgreSQL.
 * Links to the academy (user_id) posting the role.
 */
export const createOpportunityTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS opportunities (
      id SERIAL PRIMARY KEY,
      academy_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      role VARCHAR(100) NOT NULL,
      sport VARCHAR(100) NOT NULL,
      compensation_cash DECIMAL NOT NULL CHECK (compensation_cash > 0),
      perks TEXT[] NOT NULL,
      status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'closed')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(queryText);
};

/**
 * Creates a new active opportunity posted by an academy.
 */
export const createOpportunity = async (academyId, opportunityData) => {
  const { title, role, sport, compensation_cash, perks } = opportunityData;
  const queryText = `
    INSERT INTO opportunities (academy_id, title, role, sport, compensation_cash, perks)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [academyId, title, role, sport, compensation_cash, perks];
  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

/**
 * Retrieves a list of active opportunities, with optional filtering for the athlete discovery feed.
 * Joins academy profile details so athletes can see the academy's name and location.
 */
export const getActiveOpportunities = async (filters = {}) => {
  let queryText = `
    SELECT 
      o.*,
      COALESCE(ap.academy_name, 'Partner Academy') AS academy_name,
      ap.location AS academy_location,
      ap.facilities AS academy_facilities
    FROM opportunities o
    LEFT JOIN academy_profiles ap ON o.academy_id = ap.user_id
    WHERE o.status = 'active'
  `;
  const values = [];
  let queryIndex = 1;

  // Apply faceted filters if provided
  if (filters.sport) {
    queryText += ` AND o.sport ILIKE $${queryIndex}`;
    values.push(`%${filters.sport}%`);
    queryIndex++;
  }

  if (filters.role) {
    queryText += ` AND o.role ILIKE $${queryIndex}`;
    values.push(`%${filters.role}%`);
    queryIndex++;
  }

  queryText += ` ORDER BY o.created_at DESC;`;
  const { rows } = await pool.query(queryText, values);
  return rows;
};

/**
 * Retrieves all opportunities posted by a specific academy, along with the count of received applications.
 */
export const getOpportunitiesByAcademy = async (academyId) => {
  const queryText = `
    SELECT 
      o.*,
      COUNT(a.id)::INTEGER AS applications_count
    FROM opportunities o
    LEFT JOIN agreements a ON o.id = a.opportunity_id
    WHERE o.academy_id = $1
    GROUP BY o.id
    ORDER BY o.created_at DESC;
  `;
  const { rows } = await pool.query(queryText, [academyId]);
  return rows;
};

/**
 * Updates the status of an opportunity (e.g., active -> closed).
 */
export const updateOpportunityStatus = async (opportunityId, academyId, status) => {
  const queryText = `
    UPDATE opportunities
    SET status = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2 AND academy_id = $3
    RETURNING *;
  `;
  const { rows } = await pool.query(queryText, [status, opportunityId, academyId]);
  return rows[0] || null;
};

export default {
  createOpportunityTable,
  createOpportunity,
  getActiveOpportunities,
  getOpportunitiesByAcademy,
  updateOpportunityStatus,
};