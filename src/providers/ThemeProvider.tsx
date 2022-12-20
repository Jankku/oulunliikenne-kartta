import { createContext, useContext, useEffect, useCallback, useState } from 'react';
import usePersistTheme, { ThemeValue } from '../hooks/usePersistTheme';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};
export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
});

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: ThemeContextProviderProps) {
  const { getThemeFromStorage, setThemeToStorage } = usePersistTheme();
  const [theme, setTheme] = useState<ThemeValue>('light');
  const isDark = theme === 'dark';

  useEffect(() => {
    (async () => {
      const currentTheme = await getThemeFromStorage();
      setTheme(currentTheme);
    })();
  }, [getThemeFromStorage]);

  const toggleTheme = useCallback(async () => {
    const newTheme: ThemeValue = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    await setThemeToStorage(newTheme);
  }, [isDark, setThemeToStorage]);

  const value = {
    isDark,
    toggleTheme,
  };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeProvider() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeProvider must be used within a ThemeProvider');
  }
  return context;
}
