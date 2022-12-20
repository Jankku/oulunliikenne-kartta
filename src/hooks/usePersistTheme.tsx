import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeValue = 'light' | 'dark';
const THEME_KEY = 'theme';

const getThemeFromStorage = async (): Promise<ThemeValue> => {
  try {
    const value = await AsyncStorage.getItem(THEME_KEY);

    if (value === null) {
      await setThemeToStorage('light');
      return 'light';
    }

    return value as ThemeValue;
  } catch (error) {
    return 'light';
  }
};

const setThemeToStorage = async (value: ThemeValue) => {
  try {
    return await AsyncStorage.setItem(THEME_KEY, value);
  } catch (error) {
    console.error(error);
  }
};

export default function usePersistTheme() {
  return { getThemeFromStorage, setThemeToStorage };
}
