import profileModel from '../models/profileModel.js';

/**
 * Retrieves the profile for the currently authenticated user.
 * Routes dynamically based on the user's role (athlete or academy).
 */
export const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let profile;
    if (role === 'athlete') {
      profile = await profileModel.getAthleteProfileByUserId(userId);
    } else if (role === 'academy') {
      profile = await profileModel.getAcademyProfileByUserId(userId);
    }

    if (!profile) {
      return res.status(404).json({
        status: 'fail',
        message: 'Profile not found. Please complete your registration details.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        profile,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Creates or updates the profile for the currently authenticated user.
 * Routes dynamically based on the user's role.
 */
export const updateMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const profileData = req.body;

    let updatedProfile;
    if (role === 'athlete') {
      updatedProfile = await profileModel.upsertAthleteProfile(userId, profileData);
    } else if (role === 'academy') {
      updatedProfile = await profileModel.upsertAcademyProfile(userId, profileData);
    }

    res.status(200).json({
      status: 'success',
      data: {
        profile: updatedProfile,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves the full public dossier/profile of a specific athlete by user ID.
 */
export const getAthleteProfileById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const profile = await profileModel.getPublicAthleteProfileByUserId(userId);

    if (!profile) {
      return res.status(404).json({
        status: 'fail',
        message: 'Athlete profile not found.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        profile,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getMyProfile,
  updateMyProfile,
  getAthleteProfileById,
};