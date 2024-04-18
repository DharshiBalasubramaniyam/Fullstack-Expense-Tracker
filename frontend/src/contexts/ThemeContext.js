import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const useTheme = () => {
    const [isDarkMode, setDarkMode] = useState(window.matchMedia('(prefers-color-scheme:dark)').matches)

    const toggleTheme = () => {
        setDarkMode(prev => !prev)
    }

    return [isDarkMode, toggleTheme]
}