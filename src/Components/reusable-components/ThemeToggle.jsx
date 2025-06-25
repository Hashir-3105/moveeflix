"use client"

import { Moon, Sun } from "lucide-react"
import * as motion from "motion/react-client"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "dark"
    })
    const [mount , setMount] = useState(false)
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    useEffect(() => {
        setMount(true)},
        [])
        if (!mount) return null
    return (
        <button
            className="toggle-container"
            style={{
                ...container,
                justifyContent: theme === "light" ? 'flex-start' : 'flex-end'
            }}
            onClick={() => { setTheme(theme === "light" ? "dark" : "light") }}
        >
            <motion.div
                className="toggle-handle"
                layout
                transition={{
                    type: "spring",
                    visualDuration: 0.2,
                    bounce: 0.2,
                }}
            >
                {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.div>
        </button>
    )
}

const container = {
    width: 100,
    height: 40,
    backgroundColor: 'rgba(255, 25, 255, 0.2)',
    borderRadius: 50,
    cursor: "pointer",
    display: "flex",
    padding: 10,
}

