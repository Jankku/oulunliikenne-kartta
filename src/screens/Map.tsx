import { SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import MapInfoBox from '../components/map/infobox/MapInfoBox';
import MapInfoBoxItem from '../components/map/infobox/MapInfoBoxItem';
import ParkingLayer from '../components/map/ParkingLayer';
import TrafficCameraLayer from '../components/map/TrafficCameraLayer';
import TrafficFluencyLayer from '../components/map/TrafficFluencyLayer';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import parkingIcon from '../components/map/marker/parking.png';
import { Text } from 'react-native-paper';
import { MapStackScreenProps } from '../navigation/types';
import { ReactNode, useEffect, useMemo, useReducer, useState } from 'react';
import AppbarActionIcon from '../components/appbar/AppbarActionIcon';
import FilterDialog from '../components/announcement/dialog/FilterDialog';
import MapLayerSection from '../components/announcement/dialog/MapLayerSection';

export type MapLayerLabel = 'Liikenteensujuvuus' | 'Kamerat' | 'Parkkihallit';

export type MapFilters = {
  layers: MapLayerLabel[];
};

export default function Map({ navigation }: MapStackScreenProps<'MapScreen'>) {
  const [filterDialogVisible, toggleFilterDialog] = useReducer((prev) => !prev, false);
  const [filters, setFilters] = useState<MapFilters>({
    layers: ['Kamerat', 'Liikenteensujuvuus', 'Parkkihallit'],
  });

  const mapLayers: Record<MapLayerLabel, ReactNode> = useMemo(
    () => ({
      Kamerat: (
        <TrafficCameraLayer
          key={'layer1'}
          onItemSelect={(selected) => navigation.navigate('CameraDetail', { camera: selected })}
        />
      ),
      Liikenteensujuvuus: <TrafficFluencyLayer key={'layer2'} />,
      Parkkihallit: (
        <ParkingLayer
          key={'layer3'}
          onItemSelect={(selected) => navigation.navigate('ParkingDetail', { parking: selected })}
        />
      ),
    }),
    [navigation]
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: <AppbarActionIcon icon="filter" onPress={() => toggleFilterDialog()} />,
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 65.01,
          longitude: 25.5,
          latitudeDelta: 0.15,
          longitudeDelta: 0.1,
        }}
      >
        {Object.entries(mapLayers).map(([label, layer]) => {
          if (filters.layers.includes(label as MapLayerLabel)) {
            return layer;
          }
        })}
      </MapView>

      <MapInfoBox>
        <Text variant="labelMedium" style={styles.infoBoxTitle}>
          Liikenne
        </Text>
        <MapInfoBoxItem text="Normaali" icon="circle" iconColor="rgba(0, 120, 40, 0.7)" />
        <MapInfoBoxItem text="Pieni ruuhka" icon="circle" iconColor="rgba(230, 160, 0, 0.7)" />
        <MapInfoBoxItem text="Iso ruuhka" icon="circle" iconColor="rgba(200, 0, 0, 0.7)" />
        <Text variant="labelMedium" style={styles.infoBoxTitle}>
          Muut
        </Text>
        <MapInfoBoxItem text="Kelikamera" icon="camera" iconColor="black" />
        <MapInfoBoxItem text="Parkkihalli" icon={parkingIcon} />
      </MapInfoBox>

      <FilterDialog visible={filterDialogVisible} toggleDialog={toggleFilterDialog}>
        <MapLayerSection layers={filters.layers} setFilters={setFilters} />
      </FilterDialog>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  infoBoxTitle: {
    paddingBottom: 4,
  },
  map: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});
