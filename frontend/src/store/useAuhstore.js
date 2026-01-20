import { create } from "zustand";
import { Axiosinstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const getBaseURL = () => {
  if (import.meta.env.MODE === "development") {
    return "http://localhost:3000";
  }
    return import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL?.replace('/api', '') || "https://arshit-chat-app-backend.vercel.app";
};

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoading: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await Axiosinstance.get("auth/check");
      console.log(res, "from check auth ..");

      set({ authUser: res.data });
      get().connectSocket();

    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isLoading: true });
    try {
      const res = await Axiosinstance.post("auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data) => {
    set({ isLoading: true });

    try {
      const res = await Axiosinstance.post("auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await Axiosinstance.post("auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");

      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isLoading: true });
    try {
      const res = await Axiosinstance.put("auth/update-profile", data);
      set({ authUser: res.data });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  connectSocket: () => {
    try {
      const { authUser } = get();
      if (!authUser || get().socket?.connected) return;

      const socket = io(getBaseURL(), {
        query: {
          userId: authUser._id,
        },
      });

      socket.connect();

      set({ socket: socket });

      socket.on("getOnlineUsers", (userIds) => {
        set({ onlineUsers: userIds });
      });

    } catch (error) {
      // Silently handle socket connection errors in production
      if (import.meta.env.MODE === "development") {
        // eslint-disable-next-line no-console
        console.error("Error connecting socket:", error);
      }
    }
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

}));
