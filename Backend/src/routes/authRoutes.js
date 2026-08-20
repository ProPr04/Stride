import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user (Athlete or Academy)
 * @access  Public
 */
router.post('/register', authController.registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and get token
 * @access  Public
 */
router.post('/login', authController.loginUser);

export default router;