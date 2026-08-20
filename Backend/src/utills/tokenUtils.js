import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

/**
 * Generates a JSON Web Token for an authenticated user.
 * 
 * @param {string|number} userId - The unique identifier from the database.
 * @param {string} role - The user's role ('athlete' or 'academy').
 * @returns {string} The signed JWT string.
 */
export const generateToken = (userId, role) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }

  // Payload contains identifying information needed for authorization
  const payload = {
    id: userId,
    role: role,
  };

  // Sign the token with the secret and an expiration time
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * Verifies a given JSON Web Token.
 * 
 * @param {string} token - The JWT string to verify.
 * @returns {Object} The decoded payload if valid.
 * @throws {Error} If the token is invalid or expired.
 */
export const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

export default {
  generateToken,
  verifyToken,
};