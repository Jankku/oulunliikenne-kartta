import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, MD3Theme } from 'react-native-paper';
import { DefaultTheme as RNDefaultTheme, DarkTheme as RNDarkTheme } from '@react-navigation/native';

export type CustomTheme = MD3Theme & {
  colors: {
    trafficFluency: {
      red: string;
      orange: string;
      green: string;
    };
    announcement: {
      red: string;
      orange: string;
      green: string;
      gray: string;
      map: {
        red: string;
        green: string;
      };
    };
  };
};

const lightTheme: CustomTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    trafficFluency: {
      red: 'rgba(200, 0, 0, 0.7)',
      orange: 'rgba(230, 160, 0, 0.7)',
      green: 'rgba(0, 120, 40, 0.7)',
    },
    announcement: {
      red: 'red',
      orange: 'orange',
      green: 'green',
      gray: '#424242',
      map: {
        red: 'rgba(200, 0, 0, 0.7)',
        green: 'rgba(0, 120, 40, 0.7)',
      },
    },
  },
};

const darkTheme: CustomTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    trafficFluency: {
      red: 'rgba(255, 30, 30, 0.5)',
      orange: 'rgba(229, 122, 0, 0.7)',
      green: 'rgba(0, 180, 40, 0.5)',
    },
    announcement: {
      red: '#e55b5b',
      orange: '#dd9313',
      green: '#4c7f4c',
      gray: '#7c7c7c',
      map: {
        red: 'rgba(229, 68, 68, 0.5)',
        green: 'rgba(0, 150, 40, 0.7)',
      },
    },
  },
};

const { DarkTheme, LightTheme } = adaptNavigationTheme({
  reactNavigationLight: RNDefaultTheme,
  reactNavigationDark: RNDarkTheme,
  materialDark: MD3DarkTheme,
  materialLight: MD3LightTheme,
});

export {
  LightTheme as NavigationLightTheme,
  DarkTheme as NavigationDarkTheme,
  lightTheme,
  darkTheme,
};
