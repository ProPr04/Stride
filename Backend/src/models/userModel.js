import pool from '../config/db.js';

/**
 * Initializes the users table in PostgreSQL if it does not already exist.
 */
export const createUsersTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL CHECK (role IN ('athlete', 'academy')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(queryText);
};

/**
 * Finds a user by their email address.
 * @param {string} email - The email to search for.
 * @returns {Promise<Object|null>} The user record or null if not found.
 */
export const findUserByEmail = async (email) => {
  const queryText = 'SELECT * FROM users WHERE email = $1;';
  const { rows } = await pool.query(queryText, [email.toLowerCase().trim()]);
  return rows[0] || null;
};

/**
 * Finds a user by their primary key ID.
 * @param {number|string} id - The user ID.
 * @returns {Promise<Object|null>} The user record without password hash.
 */
export const findUserById = async (id) => {
  const queryText = `
    SELECT id, email, role, created_at, updated_at 
    FROM users 
    WHERE id = $1;
  `;
  const { rows } = await pool.query(queryText, [id]);
  return rows[0] || null;
};

/**
 * Creates a new user record.
 * @param {Object} userData - User registration details.
 * @param {string} userData.email - User email.
 * @param {string} userData.passwordHash - Hashed password.
 * @param {string} userData.role - 'athlete' or 'academy'.
 * @returns {Promise<Object>} The created user (excluding password hash).
 */
export const createUser = async ({ email, passwordHash, role }) => {
  const queryText = `
    INSERT INTO users (email, password_hash, role)
    VALUES ($1, $2, $3)
    RETURNING id, email, role, created_at;
  `;
  const values = [email.toLowerCase().trim(), passwordHash, role];
  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

export default {
  createUsersTable,
  findUserByEmail,
  findUserById,
  createUser,
};