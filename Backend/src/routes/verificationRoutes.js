import express from 'express';
import verificationController from '../controllers/verificationController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get current logged-in user's verification roadmap and status
router.get('/my-status', protect, verificationController.getMyVerificationStatus);

// Get any user's public verification profile and history
router.get('/user/:userId', verificationController.getUserVerificationStatus);

// Endorse/promote athlete to Level 4 (Restricted to Academy)
router.post(
  '/promote',
  protect,
  authorize('academy'),
  verificationController.promoteAthlete
);

export default router;

