import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function getInitial(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("tripsphere-theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getInitial();
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("tripsphere-theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`grid size-10 place-items-center rounded-full border border-primary/5 bg-card text-primary/70 shadow-sm transition-colors ${className}`}
    >
      {mounted && theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
}
