import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import { generateToken } from '../utills/tokenUtils.js';

/**
 * Handles new user registration (Athletes and Academies).
 */
export const registerUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    // 1. Validate inputs
    if (!email || !password || !role) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email, password, and role.',
      });
    }

    if (!['athlete', 'academy'].includes(role)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid role. Must be either "athlete" or "academy".',
      });
    }

    // 2. Check if user already exists
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email is already registered.',
      });
    }

    // 3. Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 4. Create user in database
    const newUser = await userModel.createUser({
      email,
      passwordHash,
      role,
    });

    // 5. Generate JWT
    const token = generateToken(newUser.id, newUser.role);

    // 6. Send response
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles user login.
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password.',
      });
    }

    // 2. Find user by email
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid email or password.',
      });
    }

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid email or password.',
      });
    }

    // 4. Generate JWT
    const token = generateToken(user.id, user.role);

    // 5. Send response (excluding password hash)
    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  registerUser,
  loginUser,
};