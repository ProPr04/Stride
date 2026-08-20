import pool from '../config/db.js';

/**
 * Initializes the profile tables in PostgreSQL.
 * Links to the existing 'users' table via foreign keys.
 */
export const createProfileTables = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS athlete_profiles (
      id SERIAL PRIMARY KEY,
      user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      sport VARCHAR(100) NOT NULL,
      playing_level VARCHAR(50),
      verification_level INTEGER DEFAULT 1 CHECK (verification_level BETWEEN 1 AND 4),
      skills TEXT[],
      availability JSONB,
      bio TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS academy_profiles (
      id SERIAL PRIMARY KEY,
      user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      academy_name VARCHAR(255) NOT NULL,
      location VARCHAR(255),
      sports_offered TEXT[],
      facilities TEXT,
      compensation_structure JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(queryText);
};

/**
 * Retrieves an athlete's profile by their user ID.
 * @param {number} userId - The ID from the users table.
 */
export const getAthleteProfileByUserId = async (userId) => {
  const queryText = `
    SELECT * FROM athlete_profiles WHERE user_id = $1;
  `;
  const { rows } = await pool.query(queryText, [userId]);
  return rows[0] || null;
};

/**
 * Retrieves an academy's profile by their user ID.
 * @param {number} userId - The ID from the users table.
 */
export const getAcademyProfileByUserId = async (userId) => {
  const queryText = `
    SELECT * FROM academy_profiles WHERE user_id = $1;
  `;
  const { rows } = await pool.query(queryText, [userId]);
  return rows[0] || null;
};

/**
 * Creates or updates an athlete profile.
 */
export const upsertAthleteProfile = async (userId, profileData) => {
  const { sport, playing_level, skills, availability, bio } = profileData;
  const queryText = `
    INSERT INTO athlete_profiles (user_id, sport, playing_level, skills, availability, bio)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (user_id) DO UPDATE SET
      sport = EXCLUDED.sport,
      playing_level = EXCLUDED.playing_level,
      skills = EXCLUDED.skills,
      availability = EXCLUDED.availability,
      bio = EXCLUDED.bio,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *;
  `;
  const values = [userId, sport, playing_level, skills, availability, bio];
  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

/**
 * Creates or updates an academy profile.
 */
export const upsertAcademyProfile = async (userId, profileData) => {
  const { academy_name, location, sports_offered, facilities, compensation_structure } = profileData;
  const queryText = `
    INSERT INTO academy_profiles (user_id, academy_name, location, sports_offered, facilities, compensation_structure)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (user_id) DO UPDATE SET
      academy_name = EXCLUDED.academy_name,
      location = EXCLUDED.location,
      sports_offered = EXCLUDED.sports_offered,
      facilities = EXCLUDED.facilities,
      compensation_structure = EXCLUDED.compensation_structure,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *;
  `;
  const values = [userId, academy_name, location, sports_offered, facilities, compensation_structure];
  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

export default {
  createProfileTables,
  getAthleteProfileByUserId,
  getAcademyProfileByUserId,
  upsertAthleteProfile,
  upsertAcademyProfile,
};