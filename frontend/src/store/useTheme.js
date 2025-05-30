import {create} from 'zustand'

export const Usethemes = create((set)=>({
    theme : localStorage.getItem("chat-theme") || "Forest",
    setTheme : (theme) => {
        localStorage.setItem("chat-theme" , theme)
        set({theme})
    }     
}))