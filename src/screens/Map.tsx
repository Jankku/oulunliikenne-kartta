import { useState } from 'react';
import { SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import ParkingLayer from '../components/map/ParkingLayer';
import TrafficCameraLayer from '../components/map/TrafficCameraLayer';
import TrafficFluencyLayer from '../components/map/TrafficFluency';

export default function Map() {
  const [region, setRegion] = useState<Region>({
    latitude: 65.01,
    longitude: 25.5,
    latitudeDelta: 0.15,
    longitudeDelta: 0.1,
  });

  return (
    <SafeAreaView>
      <MapView style={styles.map} initialRegion={region}>
        <TrafficFluencyLayer />
        <TrafficCameraLayer />
        <ParkingLayer/>
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
