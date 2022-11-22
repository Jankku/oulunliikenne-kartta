import { useQuery } from '@apollo/client';
import { Card, ProgressBar, Text } from 'react-native-paper';
import { GET_CAMERAS } from '../../graphql/cameras';
import { FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CameraList() {
  const { data, loading, error } = useQuery(GET_CAMERAS);

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (data?.cameras) {
    return (
      <FlatList
        data={data?.cameras}
        keyExtractor={(item) => item!.cameraId}
        renderItem={({ item }) => (
          <Card>
            <Card.Title
              title={item?.name}
              left={(props) => (
                <MaterialCommunityIcons name="camera" color={'black'} {...props} />
              )}
            />
          </Card>
        )}
      />
    );
  }

  return <ProgressBar indeterminate />;
}
