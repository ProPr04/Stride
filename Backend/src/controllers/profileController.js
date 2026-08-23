import profileModel from '../models/profileModel.js';
import { deleteUploadedFile } from '../utils/fileUtils.js';

/**
 * Retrieves the profile for the currently authenticated user.
 * Routes dynamically based on the user's role (athlete or academy).
 */
export const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role || 'athlete';

    let profile;
    if (role === 'athlete') {
      profile = await profileModel.getAthleteProfileByUserId(userId);
      if (!profile) {
        // Auto-initialize base athlete profile so existing users never get 404
        profile = await profileModel.upsertAthleteProfile(userId, {
          sport: 'General Sports',
          playing_level: 'Amateur',
          full_name: req.user.email ? req.user.email.split('@')[0] : 'Athlete Profile',
          bio: 'Welcome to your athlete profile! Click Edit Profile to update your sporting discipline, personal records, and accomplishments.',
        });
      }
    } else if (role === 'academy') {
      profile = await profileModel.getAcademyProfileByUserId(userId);
      if (!profile) {
        // Auto-initialize base academy profile
        profile = await profileModel.upsertAcademyProfile(userId, {
          academy_name: 'Partner Sports Academy',
          location: 'Pune, Maharashtra',
          sports_offered: ['Cricket', 'Football', 'Tennis'],
        });
      }
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

    let oldProfile;
    if (role === 'athlete') {
      oldProfile = await profileModel.getAthleteProfileByUserId(userId);
    } else if (role === 'academy') {
      oldProfile = await profileModel.getAcademyProfileByUserId(userId);
    }

    let updatedProfile;
    if (role === 'athlete') {
      updatedProfile = await profileModel.upsertAthleteProfile(userId, profileData);

      // Clean up previous avatar if replaced or removed
      const newAvatar = profileData.avatar_url !== undefined ? profileData.avatar_url : profileData.avatar;
      if (oldProfile?.avatar_url && newAvatar !== undefined && oldProfile.avatar_url !== newAvatar) {
        await deleteUploadedFile(oldProfile.avatar_url);
      }

      // Clean up previous cover if replaced or removed
      const newCover = profileData.cover_url !== undefined ? profileData.cover_url : profileData.cover;
      if (oldProfile?.cover_url && newCover !== undefined && oldProfile.cover_url !== newCover) {
        await deleteUploadedFile(oldProfile.cover_url);
      }
    } else if (role === 'academy') {
      updatedProfile = await profileModel.upsertAcademyProfile(userId, profileData);

      // Clean up previous logo if replaced or removed
      const newLogo = profileData.logo_url !== undefined ? profileData.logo_url : profileData.logo;
      if (oldProfile?.logo_url && newLogo !== undefined && oldProfile.logo_url !== newLogo) {
        await deleteUploadedFile(oldProfile.logo_url);
      }
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

/**
 * Retrieves all athletes for scouting and discovery.
 */
export const getAllAthletes = async (req, res, next) => {
  try {
    const athletes = await profileModel.getAllAthletes(req.query);
    res.status(200).json({
      status: 'success',
      results: athletes.length,
      data: {
        athletes,
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
  getAllAthletes,
};
