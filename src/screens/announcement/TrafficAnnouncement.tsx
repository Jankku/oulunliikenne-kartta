import { useQuery } from '@apollo/client';
import { GET_TRAFFIC_ANNOUNCEMENT } from '../../graphql/trafficannouncement';
import TrafficAnnouncementCard from '../../components/announcement/TrafficAnnouncementCard';
import { ProgressBar, Text } from 'react-native-paper';
import { FlatList } from 'react-native';

export default function TrafficAnnouncement() {
  const { data, loading, error } = useQuery(GET_TRAFFIC_ANNOUNCEMENT);

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (data?.trafficAnnouncements) {
    return (
      <FlatList
        data={data?.trafficAnnouncements}
        renderItem={({ item }) => (
          <TrafficAnnouncementCard
            title={item?.title?.fi ?? 'Ei otsikkoa'}
            description={item?.description?.fi ?? 'Ei kuvausta'}
          />
        )}
      />
    );
  }

  return <ProgressBar indeterminate />;
}
