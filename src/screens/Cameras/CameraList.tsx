import { Card, ProgressBar, Text } from 'react-native-paper';
import { FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTrafficCameras from '../../hooks/map/useTrafficCameras';
import { toErrorMessage } from '../../graphql/error';

export default function CameraList() {
  const result = useTrafficCameras();

  if (result.loading) {
    return <ProgressBar indeterminate />;
  }

  if (result.error) {
    return <Text>{toErrorMessage(result.error)}</Text>;
  }

  //Should we check for an empty array and return an error text?

  return (
    <FlatList
      data={result.data}
      keyExtractor={(item) => item.cameraId}
      renderItem={({ item }) => (
        <Card>
          <Card.Title
            title={item.name}
            left={(props) => <MaterialCommunityIcons name="camera" color={'black'} {...props} />}
          />
        </Card>
      )}
    />
  );
}