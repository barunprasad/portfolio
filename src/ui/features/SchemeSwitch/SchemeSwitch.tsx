'use client';

import { useCallback, useEffect, useState } from 'react';
import { ThemeToggle } from '@/ui/components/ThemeToggle';

type ThemeType = 'light' | 'dark';

export function SchemeSwitch() {
  // Set initial theme to null to avoid SSR issues with localStorage
  const [theme, setTheme] = useState<ThemeType | null>(null);

  // Load theme from localStorage on the client side only
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType | null;
    const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';
    setTheme(initialTheme);

    // Apply the theme class to document on initial load
    document.documentElement.classList.add(`theme-${initialTheme}`);
  }, []);

  // Update the theme class and localStorage whenever theme changes
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.remove('theme-light', 'theme-dark');
      document.documentElement.classList.add(`theme-${theme}`);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Toggle theme between light and dark
  const toggleTheme = useCallback((isDarkMode: boolean) => {
    setTheme(isDarkMode ? 'dark' : 'light');
  }, []);

  // Prevent rendering ThemeToggle until theme is loaded
  if (theme === null) return null;

  return (
    <ThemeToggle onToggle={toggleTheme} initialDarkMode={theme === 'dark'} />
  );
}
