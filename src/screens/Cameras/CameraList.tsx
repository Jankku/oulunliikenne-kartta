import { Card, ProgressBar, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import useTrafficCameras from '../../hooks/map/useTrafficCameras';
import { toErrorMessage } from '../../graphql/error';
import { CameraStackScreenProps } from '../../navigation/types';
import ListItemSeparator from '../../components/common/ListItemSeparator';
import { useCallback } from 'react';
import { FlashList } from '@shopify/flash-list';
import { CameraModel } from '../../models/camera';

export default function CameraList({ navigation }: CameraStackScreenProps<'CameraList'>) {
  const result = useTrafficCameras();

  const itemSeparator = useCallback(() => <ListItemSeparator height={16} />, []);

  const renderItem = useCallback(
    ({ item }: { item: CameraModel }) => (
      <Card
        style={styles.item}
        onPress={() => navigation.navigate('CameraDetail', { camera: item })}
      >
        <Card.Cover fadeDuration={0} source={{ uri: item.images[0].imageUrl }} />
        <Card.Title title={item.name} subtitle={`${item.images.length} kuvaa`} />
      </Card>
    ),
    [navigation]
  );

  if (result.loading) {
    return <ProgressBar indeterminate />;
  }

  if (result.error) {
    return <Text>{toErrorMessage(result.error)}</Text>;
  }

  return (
    <FlashList
      data={result.data}
      keyExtractor={(item) => item.cameraId}
      horizontal={false}
      numColumns={2}
      ItemSeparatorComponent={itemSeparator}
      contentContainerStyle={styles.contentContainer}
      estimatedItemSize={283}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  item: { flex: 1, marginHorizontal: 8 },
});
