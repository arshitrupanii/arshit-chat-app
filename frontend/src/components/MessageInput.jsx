import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatstore";
import { Image, Loader, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [btnLoading, setbtnLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      setbtnLoading(true);

      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setbtnLoading(false);

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-1.5 sm:p-2 md:p-3 lg:p-4 w-full flex-shrink-0">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-1 sm:gap-1.5 md:gap-2"
      >
        <div className="flex-1 flex gap-1 sm:gap-1.5 md:gap-2 min-w-0">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md text-sm sm:text-base"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`flex btn btn-circle btn-sm sm:btn-md
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach image"
          >
            <Image className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {btnLoading ? (
          <Loader className="animate-spin text-primary w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 flex-shrink-0" />
        ) : (
          <button
            type="submit"
            className="btn btn-sm sm:btn-md btn-circle flex-shrink-0"
            disabled={!text.trim() && !imagePreview}
          >
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </button>
        )}
      </form>
    </div>
  );
};
export default MessageInput;
