import { create } from 'zustand'
import { toast } from 'react-hot-toast'
import Axiosinstance from '../lib/axios'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isUserLoggedIn: false,
    isUserUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await Axiosinstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await Axiosinstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            console.log(error.response.data.message + "error in signup")
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    }
}))

