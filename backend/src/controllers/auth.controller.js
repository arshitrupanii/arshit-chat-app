import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';


// signup controller which will handle the signup process create hash password and generate token
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

        try {
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            return res.status(201).json({
                _id: savedUser._id,
                firstname: savedUser.firstname,
                email: savedUser.email,
                profilePicttureture: savedUser.profilePicttureture,

            });

        } catch (saveError) {
            if (saveError.code === 11000) {
                // Duplicate key error (probably email)
                console.log(saveError)
                return res.status(400).json({
                    message: 'Email already exists'
                });
            }

            console.log("Error saving user:", saveError);
            return res.status(400).json({ message: 'Failed to create user' });
        }

    } catch (error) {
        console.log("error in signup ::", error);
        res.status(500).json({ message: 'Internal server error in signup' });
    }
};

// login controller which will handle the login process and generate token
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
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
            profilePicttureture: user.profilePicttureture,
        });

    } catch (error) {
        console.log("error in login ::", error);
        res.status(500).json({ message: 'Internal server error in login' });
    }


};

// logout controller which will handle the logout process and clear the token
export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt', { maxAge: 0 });
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.log("error in logout ::", error);
        res.status(500).json({ message: 'Internal server error in logout' });
    }
};

// updateProfile controller which will handle the update profile process and update the profile picture
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
      console.log("error in update profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

// getProfile controller which will handle the get profile process and get the profile picture
export const getProfile = async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    return res.status(200).json(user);
}

