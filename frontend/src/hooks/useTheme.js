import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

function readTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/**
 * Shared light/dark theme state.
 * The <html data-theme="..."> attribute is the single source of truth, so every
 * component using this hook (toggle button, charts, toasts) stays in sync.
 */
export default function useTheme() {
  const [theme, setThemeState] = useState(readTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => setThemeState(readTheme()));

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const setTheme = useCallback((next) => {
    document.documentElement.dataset.theme = next;

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable - theme still applies for this visit */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(readTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}