import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const AdminThemeToggle = ({ showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={label}
      aria-label={label}
      className="inline-flex items-center gap-2 rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
    >
      {isDark ? <Sun size={18} strokeWidth={1.8} /> : <Moon size={18} strokeWidth={1.8} />}
      {showLabel && <span className="text-sm font-medium">{isDark ? "Light mode" : "Dark mode"}</span>}
    </button>
  );
};

export default AdminThemeToggle;
