import { Card, List, ProgressBar, Text } from 'react-native-paper';
import { View, FlatList } from 'react-native';
import { toErrorMessage } from '../../graphql/error';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import parkingIcon from '../../components/map/marker/parking.png';
import useCarParkData from '../../hooks/map/useCarParkData';

export default function ParkingList({ navigation }/*: CameraStackScreenProps<'CameraList'>*/) {
  const result = useCarParkData();

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
        keyExtractor={(item) => item.carParkId}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('ParkingDetail', { parking: item })}>
            <Card.Title
              title={item.name}
              left={(props) => <List.Icon icon={parkingIcon} {...props} />}
            />
          </Card>
        )}
      />
    </View>
  );
}
