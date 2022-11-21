import { useQuery } from '@apollo/client';
import { Card, ProgressBar, Text } from 'react-native-paper';
import { GET_ROADWORK } from '../../graphql/roadwork';
import { FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RoadWork() {
  const { data, loading, error } = useQuery(GET_ROADWORK);

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (data?.roadworks) {
    return (
      <FlatList
        data={data?.roadworks}
        keyExtractor={(item) => item!.id}
        renderItem={({ item }) => (
          <Card>
            <Card.Title
              title={item?.description?.fi ?? 'Ei kuvausta'}
              left={(props) => (
                <MaterialCommunityIcons name="traffic-cone" color={'red'} {...props} />
              )}
            />
          </Card>
        )}
      />
    );
  }

  return <ProgressBar indeterminate />;
}
