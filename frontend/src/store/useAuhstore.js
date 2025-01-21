import { create } from 'zustand'
import { Axiosinstance } from '../lib/axios'
import { toast } from 'react-hot-toast'


export const useAuthStore = create((set) => ({
    authUser: null,
    isSignedIn: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: false,

    checkAuth: async () => {
        try {
            set({ isCheckingAuth: true })
            const response = await Axiosinstance.get('/auth/check')
            set({ authUser: response.data })
        } catch (error) {
            console.error('Error checking authentication:', error)
        } finally {
            set({ isCheckingAuth: false })
        }
    },

   
}))