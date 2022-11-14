import * as React from 'react';
import MapView from 'react-native-maps';
import { GraphQLProvider } from './src/graphql/client';
import { StyleSheet, View, Dimensions } from 'react-native';

export default function App() {
  return (
    <GraphQLProvider>
      <View style={styles.container}>
        <MapView style={styles.map} />
      </View>
    </GraphQLProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
