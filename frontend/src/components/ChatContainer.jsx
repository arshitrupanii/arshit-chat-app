import { useChatStore } from "../store/useChatstore.js";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuhstore.js";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);


  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-1.5 sm:p-2 md:p-3 lg:p-4 space-y-2 sm:space-y-3 md:space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-7 sm:size-8 md:size-9 lg:size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePicture || "/avatar.png"
                      : selectedUser.profilePicture || "/avatar.png"
                  }
                  alt="profile pic"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="chat-header mb-0.5 sm:mb-1">
              <time className="text-[9px] sm:text-[10px] md:text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col text-xs sm:text-sm md:text-base max-w-[85%] sm:max-w-[75%] md:max-w-[65%]">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="max-w-full sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] rounded-md mb-2"
                />
              )}
              {message.text && <p className="break-words">{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;