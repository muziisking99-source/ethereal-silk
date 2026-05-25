import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "day" | "night";

const STORAGE_KEY = "onlyliyah-theme";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "day";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "night" || stored === "day") return stored;
  } catch {
    /* ignore */
  }
  return "day";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("day");

  useEffect(() => {
    const initial = getInitialTheme();
    setThemeState(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const setTheme = (next: ThemeMode) => {
    setThemeState(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const toggleTheme = () => setTheme(theme === "day" ? "night" : "day");

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
