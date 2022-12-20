import { Card, ProgressBar, Text, useTheme } from 'react-native-paper';
import { View, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTrafficCameras from '../../hooks/map/useTrafficCameras';
import { toErrorMessage } from '../../graphql/error';
import { CameraStackScreenProps } from '../../navigation/types';

export default function CameraList({ navigation }: CameraStackScreenProps<'CameraList'>) {
  const theme = useTheme();
  const result = useTrafficCameras();

  if (result.loading) {
    return <ProgressBar indeterminate />;
  }

  if (result.error) {
    return <Text>{toErrorMessage(result.error)}</Text>;
  }

  //Should we check for an empty array and return an error text?

  return (
    <View>
      <FlatList
        data={result.data}
        keyExtractor={(item) => item.cameraId}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('CameraDetail', { camera: item })}>
            <Card.Title
              title={item.name}
              left={(props) => (
                <MaterialCommunityIcons
                  name="camera"
                  color={theme.dark ? 'white' : 'black'}
                  {...props}
                />
              )}
            />
          </Card>
        )}
      />
    </View>
  );
}
