export default ({ config }) => ({
  ...config,
  expo: {
    name: 'Oulun Liikennekartta',
    slug: 'oulunliikenne-kartta',
    version: '1.0.1',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#6750a4',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#6750a4',
      },
      package: 'com.jankku.oulunliikennekartta',
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GMAPS_API_KEY,
        },
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: '2abf1b3a-7ed3-4e52-b768-72a9ee65e6d0',
      },
    },
  },
});
