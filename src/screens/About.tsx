import { Image, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Title, Text } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import logo from '../../assets/icon.png';

export default function About() {
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
      <Title style={styles.title}>Oulun Liikennekartta</Title>
      <Text style={styles.text}>Lyhyt kuvaus teksti sovelluksesta</Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={openGitHub}
        >
          GitHub
        </Button>
        <Button mode="contained" style={styles.button} labelStyle={styles.buttonText}>
          Lisenssi
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  about: {
    alignItems: 'center',
    flex: 1,
    textAlign: 'center',
  },
  button: {
    borderRadius: 8,
    fontSize: '24px',
    height: 50,
    margin: 30,
    padding: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 18,
  },
  image: {
    borderRadius: 100,
    height: 200,
    marginBottom: 50,
    marginTop: 100,
    resizeMode: 'cover',
    width: 200,
  },
  text: {
    fontSize: 18,
    marginBottom: 50,
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
  },
});
