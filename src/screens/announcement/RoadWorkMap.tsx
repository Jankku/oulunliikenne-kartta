import { SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import MapInfoBox from '../../components/map/infobox/MapInfoBox';
import TrafficAnnouncementPositionLayer from '../../components/announcement/map/TrafficAnnouncementPositionLayer';
import { AnnouncementStackScreenProps } from '../../navigation/types';
import MapInfoBoxItem from '../../components/map/infobox/MapInfoBoxItem';
import { Text, useTheme } from 'react-native-paper';
import useRoadwork from '../../hooks/announcements/useRoadwork';
import { createRef } from 'react';
import { darkMapStyle, lightMapStyle } from '../../styles/mapstyle';

export default function RoadWorkMap({ route }: AnnouncementStackScreenProps<'RoadWorkMap'>) {
  const theme = useTheme();
  const map = createRef<MapView>();
  const { roadworkId } = route.params;
  const roadwork = useRoadwork(roadworkId);

  return (
    <SafeAreaView>
      <MapView
        onMapLoaded={() => map.current?.fitToElements({ animated: true })}
        ref={map}
        style={styles.map}
        customMapStyle={theme.dark ? darkMapStyle : lightMapStyle}
        initialRegion={{
          latitude: 65.01,
          longitude: 25.5,
          latitudeDelta: 0.3,
          longitudeDelta: 0.2,
        }}
      >
        {!roadwork.loading && !roadwork.error ? (
          <TrafficAnnouncementPositionLayer geojson={roadwork.data.geojson} />
        ) : null}
      </MapView>

      <MapInfoBox>
        <Text variant="labelMedium" style={styles.infoBoxTitle}>
          Tietyö
        </Text>
        <MapInfoBoxItem text="Paikka" icon="map-marker" iconColor="rgba(230, 0, 0, 1)" />
      </MapInfoBox>
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
