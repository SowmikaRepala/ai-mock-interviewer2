"use client"; 
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const themes = ["light", "dark", "pastel"];
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.removeAttribute("data-theme");
    } else if (savedTheme === "pastel") {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "pastel");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.removeAttribute("data-theme");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.removeAttribute("data-theme");
    } else if (nextTheme === "pastel") {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "pastel");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.removeAttribute("data-theme");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-primary text-primary-foreground"
    >
      {theme === "dark" ? "🌙 Dark" : theme === "pastel" ? "🎨 Pastel" : "☀️ Light"}
    </button>
  );
}
