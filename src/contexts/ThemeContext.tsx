import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { getUserPreferences, updateUserPreferences } from '../lib/preferences';

const THEME_STORAGE_KEY = 'workout-app-theme';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const getStoredTheme = (): boolean | null => {
  try {
    const theme = localStorage.getItem(THEME_STORAGE_KEY);
    return theme ? JSON.parse(theme) : null;
  } catch {
    return null;
  }
};

const setStoredTheme = (isDark: boolean): void => {
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDark));
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = getStoredTheme();
    if (stored !== null) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const authContext = useAuth();
  const user = authContext ? authContext.user : null;

  useEffect(() => {
    if (user) {
      getUserPreferences().then(prefs => {
        if (prefs?.dark_mode !== undefined) {
          setIsDarkMode(prefs.dark_mode);
          applyTheme(prefs.dark_mode);
          setStoredTheme(prefs.dark_mode);
        }
      }).catch(console.error);
    }
  }, [user]);

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    applyTheme(newMode);
    setStoredTheme(newMode);

    if (user) {
      await updateUserPreferences({ dark_mode: newMode });
    }
  };

  useEffect(() => {
    applyTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}