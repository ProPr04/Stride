import express from 'express';
import agreementController from '../controllers/agreementController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Apply the protect middleware to ensure all requests have a valid JWT
router.use(protect);

/**
 * @route   POST /api/agreements/apply
 * @desc    Apply for an active opportunity
 * @access  Private (Athlete Only)
 */
router.post('/apply', authorize('athlete'), agreementController.applyForOpportunity);

/**
 * @route   GET /api/agreements/me
 * @desc    Get all agreements/applications for the logged-in user
 * @access  Private (Athlete & Academy)
 */
router.get('/me', agreementController.getMyAgreements);

/**
 * @route   PATCH /api/agreements/:id/status
 * @desc    Update the status of an agreement (accept, reject, complete)
 * @access  Private (Academy Only)
 */
router.patch('/:id/status', authorize('academy'), agreementController.updateAgreementStatus);

export default router;