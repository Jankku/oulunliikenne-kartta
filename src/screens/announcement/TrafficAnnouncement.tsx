import { useQuery } from '@apollo/client';
import { GET_TRAFFIC_ANNOUNCEMENT } from '../../graphql/trafficannouncement';
import TrafficAnnouncementCard from '../../components/announcement/TrafficAnnouncementCard';
import { ActivityIndicator, Text } from 'react-native-paper';
import { FlatList, View, StyleSheet } from 'react-native';
import useFilteredTrafficAnnouncements from '../../hooks/map/useFilteredTrafficAnnouncements';
import TrafficAnnouncementListEmpty from '../../components/announcement/TrafficAnnouncementListEmpty';
import Center from '../../components/util/Center';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    fontWeight: '700',
  },
  listContainer: { flex: 1, justifyContent: 'center', alignContent: 'center' },
});

export default function TrafficAnnouncement() {
  const { data, loading, error } = useQuery(GET_TRAFFIC_ANNOUNCEMENT);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator animating size={'large'} />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <Text style={styles.errorText}>{error.message}</Text>
      </Center>
    );
  }

  const announcements = useFilteredTrafficAnnouncements(data);
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={announcements ? undefined : styles.listContainer}
        data={announcements}
        ListEmptyComponent={TrafficAnnouncementListEmpty}
        renderItem={({ item }) => (
          <TrafficAnnouncementCard
            title={item?.title?.fi ?? 'Ei otsikkoa'}
            description={item?.description?.fi ?? 'Ei kuvausta'}
          />
        )}
      />
    </View>
  );
}
