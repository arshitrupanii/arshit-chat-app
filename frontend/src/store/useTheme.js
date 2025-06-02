import {create} from 'zustand'

export const Usethemes = create((set)=>({
    theme : localStorage.getItem("chat-theme") || "forest",
    setTheme : (theme) => {
        localStorage.setItem("chat-theme" , theme)
        set({theme})
    }
}))