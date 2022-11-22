import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Center from '../util/Center';

export default function TrafficAnnouncementListEmpty() {
  return (
    <Center>
      <MaterialCommunityIcons name="alert-circle-check" color={'green'} size={32} />
      <Text variant="titleMedium">Ei tiedotteita</Text>
    </Center>
  );
}
