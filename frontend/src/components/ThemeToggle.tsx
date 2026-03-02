"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 54, height: 28 }} />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`toggle-pill${isDark ? " is-dark" : ""}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="toggle-knob">
        {/* Moon — visible in light mode */}
        <span className="toggle-icon toggle-icon-moon">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="#3a5a8a" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </span>

        {/* Sun — visible in dark mode */}
        <span className="toggle-icon toggle-icon-sun">
          <svg
            width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="#f5c842" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2"  x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
            <line x1="2"  y1="12" x2="5"  y2="12" />
            <line x1="19" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
            <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
          </svg>
        </span>
      </span>
    </button>
  );
}
