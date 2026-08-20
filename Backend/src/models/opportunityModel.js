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
 */
export const getActiveOpportunities = async (filters = {}) => {
  let queryText = `SELECT * FROM opportunities WHERE status = 'active'`;
  const values = [];
  let queryIndex = 1;

  // Apply faceted filters if provided
  if (filters.sport) {
    queryText += ` AND sport ILIKE $${queryIndex}`;
    values.push(`%${filters.sport}%`);
    queryIndex++;
  }

  if (filters.role) {
    queryText += ` AND role ILIKE $${queryIndex}`;
    values.push(`%${filters.role}%`);
    queryIndex++;
  }

  queryText += ` ORDER BY created_at DESC;`;
  const { rows } = await pool.query(queryText, values);
  return rows;
};

export default {
  createOpportunityTable,
  createOpportunity,
  getActiveOpportunities,
};