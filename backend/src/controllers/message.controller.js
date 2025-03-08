import User from '../model/user.model.js';
import Message from '../model/message.model.js';
import cloudinary from '../lib/cloudinary.js';

// Controller to get all users except the logged-in user for the sidebar chat list
export const getuserFromSidebar = async (req, res) => {
    try {
        // Get current user's ID from auth middleware
        const loggedInUserId = req.user._id;
        // Find all users except the logged-in user, exclude passwords
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');

        console.log(filteredUsers)
        return res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("error in getuserFromSidebar :: ", error);
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
                { sender: myId, receiver: userToChatid },
                { sender: userToChatid, receiver: myId }
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
    const { text, image } = req.body;
    const sender = req.user._id;
    const {id:receiverId} = req.params;

    // Upload image to Cloudinary if provided
    let imageUrl ;
    let newMessage;
    if(image){
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
        newMessage = new Message({ sender, receiverId, text, image: imageUrl });
        console.log("newMessage",newMessage);
    }
    else{
        newMessage = new Message({ sender, receiverId, text });
    }

    // Create and save new message
    await newMessage.save();
    return res.status(200).json(newMessage);
}