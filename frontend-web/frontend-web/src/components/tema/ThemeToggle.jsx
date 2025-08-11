import { useState, useRef, useEffect } from "react"
import { useTheme } from "../../hooks/useTheme"
import "./ThemeToggle.css"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    setIsOpen(false)
  }

  return (
    <div className="theme-toggle" ref={dropdownRef}>
      <button className="theme-toggle-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Alternar tema">
        <span className="theme-icon sun-icon">☀️</span>
        <span className="theme-icon moon-icon">🌙</span>
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          <button
            className={`theme-option ${theme === "light" ? "active" : ""}`}
            onClick={() => handleThemeChange("light")}
          >
            <span className="option-icon">☀️</span>
            <span>Claro</span>
            {theme === "light" && <span className="check">✓</span>}
          </button>
          <button
            className={`theme-option ${theme === "dark" ? "active" : ""}`}
            onClick={() => handleThemeChange("dark")}
          >
            <span className="option-icon">🌙</span>
            <span>Escuro</span>
            {theme === "dark" && <span className="check">✓</span>}
          </button>
          <button
            className={`theme-option ${theme === "system" ? "active" : ""}`}
            onClick={() => handleThemeChange("system")}
          >
            <span className="option-icon">💻</span>
            <span>Sistema</span>
            {theme === "system" && <span className="check">✓</span>}
          </button>
        </div>
      )}
    </div>
  )
}
