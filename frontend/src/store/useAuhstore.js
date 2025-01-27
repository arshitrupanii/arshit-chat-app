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
            const res = await Axiosinstance.post('/auth/update-profile', data)
            set({ authUser: res.data })
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error('Error updating profile: ', error)
            toast.error("Error updating profile");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

   
}))