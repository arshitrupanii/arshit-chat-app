import express from 'express';
import { signup, login, logout, updateProfile, getProfile } from '../controllers/auth.controller.js';
import {authMiddleware} from '../middleware/auth.middleware.js';

// Create an Express router instance for authentication routes
const router = express.Router();

// Route to handle new user registration
// POST /api/auth/signup
router.post('/signup', signup);

// Route to handle user login with email and password
// POST /api/auth/login
router.post('/login', login);

// Route to handle user logout and clear JWT cookie
// POST /api/auth/logout
router.post('/logout', logout);

// Route to update user's profile picture
// Requires authentication
// POST /api/auth/update-profile
router.post('/update-profile', authMiddleware, updateProfile);

// Route to get authenticated user's profile data
// Requires authentication
// GET /api/auth/check
router.get('/check', authMiddleware, getProfile);

// Export the router for use in the main application
export default router;