import express from 'express';
import profileController from '../controllers/profileController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Apply the protect middleware to all routes in this file
router.use(protect);

/**
 * @route   GET /api/profiles/me
 * @desc    Get the profile of the currently logged-in user (Athlete or Academy)
 * @access  Private
 */
router.get('/me', profileController.getMyProfile);

/**
 * @route   PUT /api/profiles/me
 * @desc    Create or update the profile of the currently logged-in user
 * @access  Private
 */
router.put('/me', profileController.updateMyProfile);

/**
 * @route   GET /api/profiles/athlete/:userId
 * @desc    Get the public profile/dossier of an athlete by user ID
 * @access  Private
 */
router.get('/athlete/:userId', profileController.getAthleteProfileById);

export default router;
