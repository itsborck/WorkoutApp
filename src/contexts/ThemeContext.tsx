import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { getUserPreferences, updateUserPreferences } from '../lib/preferences';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const authContext = useAuth();
  const user = authContext ? authContext.user : null;

  useEffect(() => {
    // Check system preference initially
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(systemPrefersDark);

    if (user) {
      getUserPreferences().then(prefs => {
        if (prefs?.dark_mode !== undefined) {
          setIsDarkMode(prefs.dark_mode);
          applyTheme(prefs.dark_mode);
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

    if (user) {
      await updateUserPreferences({ dark_mode: newMode });
    }
  };

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