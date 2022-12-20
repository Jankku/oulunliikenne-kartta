import { SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import MapView, { LatLng } from 'react-native-maps';
import TrafficAnnouncementDetourLayer from '../../components/announcement/map/TrafficAnnouncementDetourLayer';
import MapInfoBox from '../../components/map/infobox/MapInfoBox';
import TrafficAnnouncementPositionLayer from '../../components/announcement/map/TrafficAnnouncementPositionLayer';
import useTrafficAnnouncement from '../../hooks/announcements/useTrafficAnnouncement';
import { AnnouncementStackScreenProps } from '../../navigation/types';
import MapInfoBoxItem from '../../components/map/infobox/MapInfoBoxItem';
import { Text, useTheme } from 'react-native-paper';
import { createRef } from 'react';
import { darkMapStyle, lightMapStyle } from '../../styles/mapstyle';
import type { CustomTheme } from '../../styles/theme';

const getArrayDepth = (array: unknown): number => {
  return Array.isArray(array) ? 1 + Math.max(0, ...array.map(getArrayDepth)) : 0;
};

// TODO: Fix these type errors
const normalizeDepth = (
  value: GeoJSON.Position | GeoJSON.Position[] | GeoJSON.Position[][] | GeoJSON.Position[][][]
): GeoJSON.Position[][] => {
  if (!Array.isArray(value)) return [value];

  const depth = getArrayDepth(value);
  if (depth === 1) {
    return [value];
  } else if (depth === 2) {
    return value;
  } else {
    return value.flat(1);
  }
};

export default function TrafficAnnouncementMap({
  route,
}: AnnouncementStackScreenProps<'AnnouncementMap'>) {
  const theme: CustomTheme = useTheme();
  const map = createRef<MapView>();
  const { announcementId } = route.params;
  const announcement = useTrafficAnnouncement(announcementId);

  const focusAnnouncement = () => {
    if (!announcement.loading && !announcement.error) {
      const feature = announcement.data.geojson.features[0];
      if (feature.geometry.type === 'GeometryCollection') return;

      const coordinates = normalizeDepth(feature.geometry.coordinates);
      const latLngArray: LatLng[] = coordinates.map((coord) => ({
        latitude: coord[1] as unknown as number,
        longitude: coord[0] as unknown as number,
      }));

      map.current?.fitToCoordinates(latLngArray, { animated: true });
    }
  };

  return (
    <SafeAreaView>
      <MapView
        ref={map}
        onMapLoaded={() => focusAnnouncement()}
        style={styles.map}
        customMapStyle={theme.dark ? darkMapStyle : lightMapStyle}
        initialRegion={{
          latitude: 65.01,
          longitude: 25.5,
          latitudeDelta: 0.3,
          longitudeDelta: 0.2,
        }}
      >
        {!announcement.loading && !announcement.error ? (
          <>
            <TrafficAnnouncementPositionLayer geojson={announcement.data.geojson} />
            <TrafficAnnouncementDetourLayer detour={announcement.data.detour} />
          </>
        ) : null}
      </MapView>
      <MapInfoBox>
        <Text variant="labelMedium" style={styles.infoBoxTitle}>
          Häiriö
        </Text>
        <MapInfoBoxItem text="Paikka" icon="map-marker" iconColor="rgba(230, 0, 0, 1)" />
        <MapInfoBoxItem
          text="Vaikutusalue"
          icon="circle"
          iconColor={theme.colors.announcement.red}
        />
        <MapInfoBoxItem
          text="Kiertotie"
          icon="circle"
          iconColor={theme.colors.announcement.green}
        />
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
