// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import 'react-native-gesture-handler';
import { BottomNav } from './src/navigation/BottomNav';
import { GraphQLProvider } from './src/graphql/client';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import ThemeProvider, { useThemeProvider } from './src/providers/ThemeProvider';
import {
  lightTheme,
  darkTheme,
  NavigationLightTheme,
  NavigationDarkTheme,
} from './src/styles/theme';

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

function ThemedApp() {
  const { isDark } = useThemeProvider();

  return (
    <GraphQLProvider>
      <PaperProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer theme={isDark ? NavigationDarkTheme : NavigationLightTheme}>
          <StatusBar style={isDark ? 'light' : 'dark'} />
          <BottomNav />
        </NavigationContainer>
      </PaperProvider>
    </GraphQLProvider>
  );
}
