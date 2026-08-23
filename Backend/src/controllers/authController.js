import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import profileModel from '../models/profileModel.js';
import { generateToken } from '../utils/tokenUtils.js';

/**
 * Handles new user registration (Athletes and Academies).
 */
export const registerUser = async (req, res, next) => {
  try {
    const { email, password, role, fullName, name, sport } = req.body;



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

    if (password.length < 6) {
      return res.status(400).json({
        status: 'fail',
        message: 'Password must be at least 6 characters long.',
      });
    }

    // 2. Check if user already exists
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email is already registered. Please login.',
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

    // 5. Initialize profile for athlete or academy
    const displayName = fullName || name || (role === 'academy' ? 'Partner Academy' : 'Athlete');
    try {
      if (role === 'athlete') {
        await profileModel.upsertAthleteProfile(newUser.id, {
          sport: sport || 'General Sports',
          playing_level: 'Amateur',
          skills: [],
          availability: {},
          bio: `Athlete profile for ${displayName}`,
        });
      } else if (role === 'academy') {
        await profileModel.upsertAcademyProfile(newUser.id, {
          academy_name: displayName,
          location: 'Pune, Maharashtra',
          sports_offered: ['Football', 'Cricket', 'Athletics'],
          facilities: 'Standard Training Grounds & Facilities',
          compensation_structure: {},
        });
      }
    } catch (profileErr) {
      console.warn('Initial profile creation notice:', profileErr.message);
    }

    // 6. Generate JWT
    const token = generateToken(newUser.id, newUser.role);

    // 7. Send response
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          name: displayName,
        },
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
    const { email, password, role } = req.body;

    // Dev bypass when ENABLE_AUTH=false
    if (process.env.ENABLE_AUTH === 'false' || process.env.DISABLE_AUTH === 'true') {
      const selectedRole = role || (email && email.includes('academy') ? 'academy' : 'athlete');
      
      let userId = 1;
      let displayName = selectedRole === 'academy' ? 'Partner Academy' : 'Athlete';

      if (email) {
        const user = await userModel.findUserByEmail(email);
        if (user) {
          userId = user.id;
          if (user.role === 'athlete') {
            const profile = await profileModel.getAthleteProfileByUserId(user.id);
            if (profile && profile.full_name) displayName = profile.full_name;
          } else if (user.role === 'academy') {
            const profile = await profileModel.getAcademyProfileByUserId(user.id);
            if (profile && profile.academy_name) displayName = profile.academy_name;
          }
        }
      }

      const devUser = {
        id: userId,
        email: email ? email.toLowerCase().trim() : 'dev@stride.com',
        role: selectedRole,
        name: displayName,
      };
      const token = generateToken(devUser.id, devUser.role);
      return res.status(200).json({
        status: 'success',
        token,
        data: {
          user: devUser,
        },
      });
    }

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

    // 4. Get profile name
    let name = undefined;
    if (user.role === 'athlete') {
      const profile = await profileModel.getAthleteProfileByUserId(user.id);
      name = profile ? profile.full_name : 'Athlete';
    } else if (user.role === 'academy') {
      const profile = await profileModel.getAcademyProfileByUserId(user.id);
      name = profile ? profile.academy_name : 'Partner Academy';
    }

    // 5. Generate JWT
    const token = generateToken(user.id, user.role);

    // 6. Send response (excluding password hash)
    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name,
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