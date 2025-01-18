import express from 'express';
import { getuserFromSidebar, getMessage, sendMessage } from '../controllers/message.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

// Create an Express router instance for message-related routes
const router = express.Router();

// Route to get all users for the sidebar chat list
// Requires authentication
// GET /api/messages/message
router.get('/message', authMiddleware, getuserFromSidebar);

// Route to get messages between authenticated user and specified user ID
// Requires authentication
// GET /api/messages/:id
router.get('/:id', authMiddleware, getMessage);

// Route to send a new message to a specific user
// Requires authentication
// POST /api/messages/send/:id
router.post('/send/:id', authMiddleware, sendMessage);

// Export the router for use in the main application
export default router;