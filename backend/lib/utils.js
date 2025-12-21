import jwt from 'jsonwebtoken';

<<<<<<< HEAD:backend/lib/utils.js

=======
>>>>>>> c73f35997bbcc54f3b676c279484fe5fb7ef19c4:backend/src/lib/utils.js
export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'});

    res.cookie('jwt', token,{
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
        
    return token
};
