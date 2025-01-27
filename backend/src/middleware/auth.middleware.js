import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to protect routes and verify JWT authentication
// Checks for valid JWT token in cookies and attaches user to request
export const authMiddleware = async (req, res, next) => {
    // Extract JWT token from cookies
    const token = req.cookies.jwt;

    try {
        // Check if token exists
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized user ' });
        }

        // Verify token and decode user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID from token, exclude password from result
        const user = await User.findById(decoded.userId).select('-password');

        // Check if user exists in database
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized user ' });
        }

        // Attach user object to request for use in protected routes
        req.user = user;
        // Pass control to next middleware or route handler
        next();

    } catch (error) {
        // Handle token verification errors
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        console.log("error in authMiddleware ::", error);
        res.status(500).json({ message: 'Internal server error in authMiddleware' });
    }
}

