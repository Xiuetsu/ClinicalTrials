import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const storageKey = "trialtracker.theme";

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = window.localStorage.getItem(storageKey) as Theme | null;
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);
    window.localStorage.setItem(storageKey, theme);
  }, [theme]);

  useEffect(() => {
    const handler = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};
