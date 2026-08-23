import pool from '../config/db.js';

export const createSavedTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS saved_opportunities (
      id SERIAL PRIMARY KEY,
      athlete_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      opportunity_id INTEGER REFERENCES opportunities(id) ON DELETE CASCADE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(athlete_id, opportunity_id)
    );
  `;
  await pool.query(queryText);
};

export const saveOpportunity = async (athleteId, opportunityId) => {
  const queryText = `
    INSERT INTO saved_opportunities (athlete_id, opportunity_id)
    VALUES ($1, $2)
    ON CONFLICT (athlete_id, opportunity_id) DO NOTHING
    RETURNING *;
  `;
  const { rows } = await pool.query(queryText, [athleteId, opportunityId]);
  return rows[0] || null;
};

export const unsaveOpportunity = async (athleteId, opportunityId) => {
  const queryText = `
    DELETE FROM saved_opportunities
    WHERE athlete_id = $1 AND opportunity_id = $2
    RETURNING *;
  `;
  const { rows } = await pool.query(queryText, [athleteId, opportunityId]);
  return rows[0] || null;
};

export const getSavedOpportunities = async (athleteId) => {
  const queryText = `
    SELECT 
      o.*,
      s.created_at AS saved_at,
      COALESCE(ap.academy_name, 'Partner Academy') AS academy_name,
      COALESCE(o.location, ap.location, 'India') AS display_location,
      ap.location AS academy_location,
      ap.facilities AS academy_facilities
    FROM saved_opportunities s
    JOIN opportunities o ON s.opportunity_id = o.id
    LEFT JOIN academy_profiles ap ON o.academy_id = ap.user_id
    WHERE s.athlete_id = $1
    ORDER BY s.created_at DESC;
  `;
  const { rows } = await pool.query(queryText, [athleteId]);
  return rows;
};

export default {
  createSavedTable,
  saveOpportunity,
  unsaveOpportunity,
  getSavedOpportunities,
};
