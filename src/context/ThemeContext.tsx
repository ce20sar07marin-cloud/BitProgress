import { createContext, useCallback, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_KEY = "@bitprogress_theme";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: async () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then((value) => {
      if (value === "dark") setIsDark(true);
    });
  }, []);

  const toggleTheme = useCallback(async () => {
    setIsDark((prev) => !prev);
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
