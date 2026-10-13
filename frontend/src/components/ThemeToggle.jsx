import { MdLightMode, MdDarkMode } from "react-icons/md";

import useTheme from "../hooks/useTheme";

function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`theme-toggle inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 hover:bg-gray-200/70 hover:text-blue-600 transition ${className}`}
    >
      {isDark ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
    </button>
  );
}

export default ThemeToggle;