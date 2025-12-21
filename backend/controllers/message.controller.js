import User from '../model/user.model.js';
import Message from '../model/message.model.js';
import cloudinary from 'cloudinary';
import { getReceiverSocketId, io } from "../lib/socket.js";

// Controller to get all users except the logged-in user for the sidebar chat list
export const getUserFromSidebar = async (req, res) => {
    try {
        // Get current user's ID from auth middleware
        const loggedInUserId = req.user._id;
        // Find all users except the logged-in user, exclude passwords
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');

        return res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("error in getUserFromSidebar :: ", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// Controller to get messages between two users
export const getMessage = async (req, res) => {
    try {
        // Get ID of user to chat with from URL params
        const { id: userToChatid } = req.params;
        // Get current user's ID from auth middleware
        const myId = req.user._id;

        // Find all messages between these two users (in both directions)
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatid },
                { senderId: userToChatid, receiverId: myId }
            ]
        });

        return res.status(200).json(messages);

    } catch (error) {
        console.log("error in getMessage :: ", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// Controller to send a new message with optional image attachment
export const sendMessage = async (req, res) => {
    // Extract message data from request
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Upload image to Cloudinary if provided
        let imageUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        // Create and save new message
        const newMessage = new Message({ senderId, receiverId, text, image: imageUrl });
        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json(newMessage);

    } catch (error) {
        console.log("error in send message :  ", error)
    }
}