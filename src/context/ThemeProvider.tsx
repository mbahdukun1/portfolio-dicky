import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { STORAGE_KEY, ThemeContext, type Theme } from './theme-context';

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';

  const applied = document.documentElement.getAttribute('data-theme');
  return applied === 'light' ? 'light' : 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: light)');

    const handleChange = (event: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        stored = null;
      }
      if (stored === 'light' || stored === 'dark') return;
      setThemeState(event.matches ? 'light' : 'dark');
    };

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((current) => (current === 'dark' ? 'light' : 'dark')),
    [],
  );

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
