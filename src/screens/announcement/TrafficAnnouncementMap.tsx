import { SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import TrafficAnnouncementDetourLayer from '../../components/announcement/map/TrafficAnnouncementDetourLayer';
import MapInfoBox from '../../components/map/infobox/MapInfoBox';
import TrafficAnnouncementPositionLayer from '../../components/announcement/map/TrafficAnnouncementPositionLayer';
import useTrafficAnnouncement from '../../hooks/announcements/useTrafficAnnouncement';
import { AnnouncementStackScreenProps } from '../../navigation/types';
import MapInfoBoxItem from '../../components/map/infobox/MapInfoBoxItem';
import { Text } from 'react-native-paper';

export default function TrafficAnnouncementMap({
  route,
}: AnnouncementStackScreenProps<'AnnouncementMap'>) {
  const { announcementId } = route.params;
  const announcement = useTrafficAnnouncement(announcementId);

  return (
    <SafeAreaView>
      <MapView
        style={styles.map}
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
        <MapInfoBoxItem text="Vaikutusalue" icon="circle" iconColor="rgba(200, 0, 0, 0.7)" />
        <MapInfoBoxItem text="Kiertotie" icon="circle" iconColor="rgba(0, 120, 40, 0.7)" />
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
