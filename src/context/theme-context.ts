import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const STORAGE_KEY = 'dm-portfolio-theme';

export const ThemeContext = createContext<ThemeContextValue | null>(null);
