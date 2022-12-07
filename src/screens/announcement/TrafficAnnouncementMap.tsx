import { SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import TrafficAnnouncementDetourLayer from '../../components/announcement/map/TrafficAnnouncementDetourLayer';
import TrafficAnnouncementPositionLayer from '../../components/announcement/map/TrafficAnnouncementPositionLayer';
import useTrafficAnnouncement from '../../hooks/announcements/useTrafficAnnouncement';
import { AnnouncementStackScreenProps } from '../../navigation/types';

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});
