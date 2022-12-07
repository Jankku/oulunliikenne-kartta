import { Card, Paragraph, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraStackScreenProps } from '../../navigation/types';

const pics = [
  'https://placekitten.com/g/400/250',
  'https://placekitten.com/g/400/250',
  'https://placekitten.com/g/400/250',
];

export default function CameraDetail({
  navigation,
  route,
}: CameraStackScreenProps<'CameraDetail'>) {
  const { cameraId } = route.params;
  return <SafeAreaView>{pics.map(ImageElement)}</SafeAreaView>;
}

function ImageElement(item: string, index: number): JSX.Element {
  return (
    <Card key={index}>
      <Card.Cover source={{ uri: item }} />
      <Card.Content>
        <Title>Card title</Title>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
    </Card>
  );
}
