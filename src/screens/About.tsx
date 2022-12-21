import { Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import logo from '../../assets/icon.png';
import { AboutStackScreenProps } from '../navigation/types';
import { useEffect } from 'react';
import AppbarActionIcon from '../components/appbar/AppbarActionIcon';
import { useThemeProvider } from '../providers/ThemeProvider';

export default function About({ navigation }: AboutStackScreenProps<'AboutScreen'>) {
  const { isDark, toggleTheme } = useThemeProvider();

  useEffect(() => {
    navigation.setOptions({
      headerRight: (
        <AppbarActionIcon
          icon={isDark ? 'white-balance-sunny' : 'moon-waxing-crescent'}
          onPress={() => toggleTheme()}
        />
      ),
    });
  }, [isDark, navigation, toggleTheme]);

  const openGitHub = async () => {
    try {
      await WebBrowser.openBrowserAsync('https://github.com/Jankku/oulunliikenne-kartta');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.about}>
      <Image style={styles.image} source={logo} />
      <Text variant="titleLarge" style={styles.title}>
        Oulun Liikennekartta
      </Text>
      <Text variant="titleMedium" style={styles.text}>
        Oulun ammattikorkeakoulun Mobiiliprojekti-kurssilla luotu sovellus.
      </Text>
      <Text variant="titleMedium" style={styles.text}>
        Käyttää Oulun liikenteen rajapintoja.
      </Text>
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={openGitHub}
      >
        Lähdekoodi
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  about: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 32,
  },
  button: {
    borderRadius: 8,
    fontSize: '24px',
    height: 50,
    margin: 30,
    padding: 6,
  },
  buttonText: {
    fontSize: 18,
  },
  image: {
    borderRadius: 100,
    height: 150,
    marginBottom: 32,
    marginTop: 50,
    resizeMode: 'cover',
    width: 150,
  },
  text: {
    paddingBottom: 4,
    textAlign: 'center',
  },
  title: {
    marginBottom: 16,
  },
});
