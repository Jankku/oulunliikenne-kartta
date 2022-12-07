import { Image, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';
import { Title } from 'react-native-paper';

export default function About() {
  return (
    <SafeAreaView style={styles.about}>
      <Image style={styles.image} source={{ uri: 'https://placekitten.com/g/400/250' }} />
      <Title style={styles.title}>Kelikamera</Title>
      <Text style={styles.text}>Lyhyt kuvaus teksti sovelluksesta</Text>
      <View style={styles.row}>
        <Pressable style={styles.pressable}>
          <Text style={styles.pressableText}>Github</Text>
        </Pressable>
        <Pressable style={styles.pressable}>
          <Text style={styles.pressableText}>Lisenssi</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
