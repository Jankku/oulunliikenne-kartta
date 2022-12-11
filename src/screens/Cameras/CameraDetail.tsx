import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraImage } from '../../models/camera';
import { CameraStackScreenProps } from '../../navigation/types';

export default function CameraDetail({
  navigation,
  route,
}: CameraStackScreenProps<'CameraDetail'>) {
  const { camera } = route.params;
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
