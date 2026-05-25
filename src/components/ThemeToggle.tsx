import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2 rounded-full border border-[var(--border-color)] bg-[var(--surface)] text-[var(--plum)] transition-all duration-300 hover:border-[var(--blush)] hover:text-[var(--blush)] ${className}`}
      aria-label={theme === "day" ? "Switch to night mode" : "Switch to day mode"}
      title={theme === "day" ? "Night mode" : "Day mode"}
    >
      {theme === "day" ? (
        <Moon className="w-4 h-4" strokeWidth={1.5} />
      ) : (
        <Sun className="w-4 h-4" strokeWidth={1.5} />
      )}
    </button>
  );
}
