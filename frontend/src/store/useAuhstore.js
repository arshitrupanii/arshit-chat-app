import { create } from 'zustand'
import { Axiosinstance } from '../lib/axios'
import { toast } from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await Axiosinstance.get('/auth/check')
            set({ authUser: res.data })
        } catch (error) {
            console.error('Error checking authentication:', error)
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        try {
            const res = await Axiosinstance.post('/auth/signup', data)
            set({ authUser: res.data })
        } catch (error) {
            console.error('Error signing up:', error)
            toast.error("User is already exists");
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        try {
            const res = await Axiosinstance.post('/auth/login', data)
            set({ authUser: res.data })
        } catch (error) {
            console.error('Error logging in:', error)
            toast.error("Invalid credentials");
        }
    },

    Logout: async () => {
        try {
            await Axiosinstance.post('/auth/logout')
            set({ authUser: null })
        } catch (error) {
            console.error('Error logging out: ', error)
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await Axiosinstance.put("/auth/update-profile", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          toast.error(error.response.data.message);
        } finally {
          set({ isUpdatingProfile: false });
        }
      },

      
      connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
    
        const socket = io(BASE_URL, {
          query: {
            userId: authUser._id,
          },
        });
        socket.connect();
    
        set({ socket: socket });
    
        socket.on("getOnlineUsers", (userIds) => {
          set({ onlineUsers: userIds });
        });
      },
      disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
      },
   
}))