import mongoose from 'mongoose';

// Message Schema defines the structure for chat messages between users
const messageSchema = new mongoose.Schema({
    // Reference to the User who sent the message
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // Reference to the User who receives the message
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // Content of the message - required field
    text: { type: String, required: true },
    
    // URL of the attached image - required field
    image: { type: String },
},  { timestamps: true });

// Create the Message model from the schema
const Message = mongoose.model('Message', messageSchema);

// Export the Message model for use in other parts of the application
export default Message;