import jwt from 'jsonwebtoken';


export const generateToken = (userId, res) => {
    // Create JWT token with user ID and 7-day expiration
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'});

    // Set token as HTTP-only cookie with security options
    res.cookie('jwt', token,{
        httpOnly: true, // Prevents JavaScript access to cookie
        secure: process.env.NODE_ENV !== 'development', // HTTPS only in production
        sameSite: 'strict', // Protects against CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expires in 7 days (in milliseconds)
    })
        
    return token
};
