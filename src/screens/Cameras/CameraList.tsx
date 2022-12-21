import { Card, ProgressBar, Text } from 'react-native-paper';
import { FlatList, StyleSheet } from 'react-native';
import useTrafficCameras from '../../hooks/map/useTrafficCameras';
import { toErrorMessage } from '../../graphql/error';
import { CameraStackScreenProps } from '../../navigation/types';
import ListItemSeparator from '../../components/common/ListItemSeparator';

export default function CameraList({ navigation }: CameraStackScreenProps<'CameraList'>) {
  const result = useTrafficCameras();

  if (result.loading) {
    return <ProgressBar indeterminate />;
  }

  if (result.error) {
    return <Text>{toErrorMessage(result.error)}</Text>;
  }

  return (
    <FlatList
      data={result.data}
      keyExtractor={(item) => item.cameraId}
      numColumns={2}
      ItemSeparatorComponent={() => ListItemSeparator(16)}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => (
        <Card
          style={styles.item}
          onPress={() => navigation.navigate('CameraDetail', { camera: item })}
        >
          <Card.Cover source={{ uri: item.images[0].imageUrl }} />
          <Card.Title title={item.name} subtitle={`${item.images.length} kuvaa`} />
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
  },
  contentContainer: {
    padding: 16,
  },
  item: { flex: 0.48 },
});
