// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // 初期値：localStorageにあればそれを使う。なければ 'black'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("app-theme") || "black";
  });

  useEffect(() => {
    // <html>タグにカスタム属性を付与（CSS変数切り替え用）
    document.documentElement.setAttribute("data-theme", theme);
    // ブラウザに保存
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
