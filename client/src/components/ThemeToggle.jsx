import { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("simora-theme") || "dark-theme";
  });

  useEffect(() => {
    document.body.classList.remove("dark-theme", "light-theme");
    document.body.classList.add(theme);
    localStorage.setItem("simora-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark-theme" ? "light-theme" : "dark-theme"));
  };

  return (
    <button onClick={toggleTheme} style={{ fontSize: "14px" }}>
      {theme === "dark-theme" ? "🌙 Midnight Cyan" : "☀️ Daylight Aurora"}
    </button>
  );
}

export default ThemeToggle;