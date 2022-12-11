import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();

const darkTheme = "dark";

export default function ThemeProvider({ children }) {
  const toggleTheme = () => {
    const oldTheme = getTheme();
    const newTheme = darkTheme;
    updateTheme(newTheme, oldTheme);
  };

  useEffect(() => {
    const theme = getTheme();
    if (!theme) {
      updateTheme(darkTheme);
    }
    else {
      updateTheme(theme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const getTheme = () => {
  return localStorage.getItem("theme");
}

const updateTheme = (theme, themeToRemove) => {

  if (themeToRemove) {
     document.documentElement.classList.remove(themeToRemove);
  }

  document.documentElement.classList.add(theme);
  localStorage.setItem("theme", theme);
}
