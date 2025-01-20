import { create } from 'zustand'
import { Axiosinstance } from '../lib/axios'


const BASE_URL = 'http://localhost:4000 '
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

    signup : async (userData) => {
        set({ isSigningUp: true });
        try {
          const response = await fetch(`${BASE_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          set({ authUser: data.user, token: data.token });
          toast.success("Signup successful");
          get().connectSocket();
        } catch (error) {
          console.error("Error during signup:", error);
          toast.error(error.message || "Signup failed");
        } finally {
          set({ isSigningUp: false });
        }
      },
}))