import mongoose from 'mongoose';

// User Schema defines the structure for user documents in MongoDB
// Contains user's personal information and authentication details
const userSchema = new mongoose.Schema({
    // User's first name - required field
    firstname: {
        type: String,
        required: true,
    },
    // User's email address - must be unique
    email: {
        type: String,
        required: true,
        unique: true
    },
    // User's password - stored as hashed string, minimum 6 characters
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    // URL to user's profile picture - empty string by default
    profilePicture: {
        type: String,
        default: ''
    },
}, {
    // Automatically manage createdAt and updatedAt timestamps
    timestamps: true
});

// Export the User model based on the schema
export default mongoose.model('User', userSchema);