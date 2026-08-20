import express from 'express';
import opportunityController from '../controllers/opportunityController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Apply the protect middleware to ensure all requests have a valid JWT
router.use(protect);

/**
 * @route   POST /api/opportunities
 * @desc    Create a new active opportunity (mandates cash pay + perks)
 * @access  Private (Academy Only)
 */
router.post('/', authorize('academy'), opportunityController.createOpportunity);

/**
 * @route   GET /api/opportunities
 * @desc    Retrieve active opportunities with optional faceted filtering (sport, role)
 * @access  Private (Athlete & Academy)
 */
router.get('/', opportunityController.getActiveOpportunities);

export default router;