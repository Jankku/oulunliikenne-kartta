import { FlatList, ListRenderItemInfo } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraImage, CameraModel } from '../../models/camera';
import { CameraStackScreenProps, MapStackScreenProps } from '../../navigation/types';


export function CameraDetailMapScreen({ route }: MapStackScreenProps<'CameraDetail'>) {
  return CameraDetail(route.params.camera);
}

export function CameraDetailCameraListScreen({ route }: CameraStackScreenProps<'CameraDetail'>) {
  return CameraDetail(route.params.camera);
}

function CameraDetail(camera: CameraModel) {
  return(
  <SafeAreaView>
    <FlatList data={camera.images} keyExtractor={(item) => item.id} renderItem={ImageElement}/>
  </SafeAreaView>
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
