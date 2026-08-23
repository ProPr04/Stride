import express from 'express';
import savedController from '../controllers/savedController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('athlete'));

router.post('/', savedController.saveOpportunity);
router.get('/', savedController.getSavedOpportunities);
router.delete('/:opportunityId', savedController.unsaveOpportunity);

export default router;
