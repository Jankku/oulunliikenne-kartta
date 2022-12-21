import { Card, List, ProgressBar, Text } from 'react-native-paper';
import { FlatList, StyleSheet } from 'react-native';
import { toErrorMessage } from '../../graphql/error';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import parkingIcon from '../../components/map/marker/parking.png';
import useCarParkData from '../../hooks/map/useCarParkData';
import ListItemSeparator from '../../components/common/ListItemSeparator';
import { ParkingStackScreenProps } from '../../navigation/types';

export default function ParkingList({ navigation }: ParkingStackScreenProps<'ParkingList'>) {
  const result = useCarParkData();

  if (result.loading) {
    return <ProgressBar indeterminate />;
  }

  if (result.error) {
    return <Text>{toErrorMessage(result.error)}</Text>;
  }

  return (
    <FlatList
      data={result.data}
      keyExtractor={(item) => item.carParkId}
      ItemSeparatorComponent={() => ListItemSeparator(16)}
      contentContainerStyle={styles.contentContainer}
      style={styles.list}
      renderItem={({ item }) => (
        <Card onPress={() => navigation.navigate('ParkingDetail', { parking: item })}>
          <Card.Title
            title={item.name}
            left={(props) => <List.Icon icon={parkingIcon} {...props} />}
          />
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
  list: { flex: 1 },
});
