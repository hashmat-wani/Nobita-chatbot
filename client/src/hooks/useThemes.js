import { useCallback, useState } from "react";

const useThemes = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("nobita_chatbot_theme") || "dark"
  );

  const toggleTheme = useCallback(() => {
    if (theme === "light") {
      localStorage.setItem("nobita_chatbot_theme", "dark");
      setTheme("dark");
    } else {
      localStorage.setItem("nobita_chatbot_theme", "light");
      setTheme("light");
    }
  }, [theme]);

  return [theme, toggleTheme];
};

export default useThemes;
