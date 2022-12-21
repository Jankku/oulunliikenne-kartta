import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';
import ListItemSeparator from '../../components/common/ListItemSeparator';
import { CameraImage, CameraModel } from '../../models/camera';
import { CameraStackScreenProps, MapStackScreenProps } from '../../navigation/types';

export function CameraDetailMapScreen({ route }: MapStackScreenProps<'CameraDetail'>) {
  return CameraDetail(route.params.camera);
}

export function CameraDetailCameraListScreen({ route }: CameraStackScreenProps<'CameraDetail'>) {
  return CameraDetail(route.params.camera);
}

function CameraDetail(camera: CameraModel) {
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={() => ListItemSeparator(16)}
      data={camera.images}
      keyExtractor={(item) => item.id}
      renderItem={ImageElement}
    />
  );
}

function ImageElement<T extends CameraImage>(info: ListRenderItemInfo<T>): JSX.Element {
  return (
    <Card key={info.index}>
      <Card.Cover source={{ uri: info.item.imageUrl }} />
      <Card.Content>
        <Title>{info.item.name}</Title>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
  list: { flex: 1 },
});
