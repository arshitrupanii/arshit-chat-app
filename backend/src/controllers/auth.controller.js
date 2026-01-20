import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';


export const signup = async (req, res) => {
    const { firstname, email, password } = req.body;

    try {
        if (!firstname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            firstname,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        generateToken(savedUser._id, res);



        return res.status(201).json({
            _id: savedUser._id,
            firstname: savedUser.firstname,
            email: savedUser.email,
            profilePicture: savedUser.profilePicture,
        });

    } catch (error) {
        console.log("error in signup : ", error);
        res.status(500).json({ message: 'Internal error in signup' });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        generateToken(user._id, res);

        return res.status(200).json({
            _id: user._id,
            firstname: user.firstname,
            email: user.email,
            profilePicture: user.profilePicture,
        });

    } catch (error) {
        console.log("error in login : ", error);
        res.status(500).json({ message: `Internal error in login` });
    }
};


export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt', { maxAge: 0 });
        return res.status(200).json({ message: 'Logout successful' });

    } catch (error) {
        console.log("error in logout : ", error);
        res.status(500).json({ message: 'Internal error in logout' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePicture } = req.body;

        const userId = req.user._id;

        if (!profilePicture) {
            return res.status(400).json({ message: "Profile pic is required" });
        }


        const uploadResponse = await cloudinary.uploader.upload(profilePicture);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("error in update profiless:", error?.message);
        res.status(500).json({ message: "Internal error in Update" });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);

    } catch (error) {
        console.log("error in checkAuth : ", error);
        res.status(500).json({ message: 'Internal Error in checkAuth' });
    }
}