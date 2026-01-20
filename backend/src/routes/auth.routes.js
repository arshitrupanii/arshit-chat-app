import express from 'express';
import { signup, login, logout, updateProfile, checkAuth  } from '../controllers/auth.controller.js';
import {authMiddleware} from '../middleware/auth.middleware.js';
import validateUser from '../middleware/auth.validator.js';

const router = express.Router();

router.post('/signup', validateUser ,signup);
router.post('/login', validateUser, login);
router.post('/logout', logout);
router.put('/update-profile', authMiddleware, updateProfile);
router.get('/check', authMiddleware, checkAuth );

export default router;