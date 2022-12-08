import { useQuery } from '@apollo/client';
import { ProgressBar, Text, ActivityIndicator } from 'react-native-paper';
import { GET_ROADWORK } from '../../graphql/roadwork';
import { FlatList } from 'react-native';
import RoadWorkCard from '../../components/announcement/RoadWorkCard';
import useUpdateTabTitle from '../../hooks/announcements/useUpdateTabTitle';
import { AnnouncementTabScreenProps } from '../../navigation/types';
import Center from '../../components/util/Center';

export default function RoadWork({ navigation }: AnnouncementTabScreenProps<'RoadWork'>) {
  const result = useQuery(GET_ROADWORK);

  useUpdateTabTitle(navigation, `Tietyöt (${result.data?.roadworks.length ?? 0})`, [
    result.data?.roadworks,
  ]);

  if (result.loading) {
    return (
      <Center>
        <ActivityIndicator animating size={'large'} />
      </Center>
    );
  }

  if (result.error) {
    return <Text>{result.error.message}</Text>;
  }

  if (result.data?.roadworks) {
    return (
      <FlatList
        data={result.data?.roadworks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RoadWorkCard text={item.description.fi} onNavigateToMapPress={() => {}} />
        )}
      />
    );
  }

  return <ProgressBar indeterminate />;
}
