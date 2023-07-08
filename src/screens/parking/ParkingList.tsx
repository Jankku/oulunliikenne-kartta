import { Card, List, ProgressBar, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { toErrorMessage } from '../../graphql/error';
import parkingIcon from '../../components/map/marker/parking.png';
import useCarParkData from '../../hooks/map/useCarParkData';
import ListItemSeparator from '../../components/common/ListItemSeparator';
import { ParkingStackScreenProps } from '../../navigation/types';
import { useCallback } from 'react';
import { FlashList } from '@shopify/flash-list';
import { ParkingModel } from '../../models/parking';

export default function ParkingList({ navigation }: ParkingStackScreenProps<'ParkingList'>) {
  const result = useCarParkData();

  const itemSeparator = useCallback(() => <ListItemSeparator height={16} />, []);
  const renderItem = useCallback(
    ({ item }: { item: ParkingModel }) => (
      <Card onPress={() => navigation.navigate('ParkingDetail', { parking: item })}>
        <Card.Title
          title={item.name}
          left={(props) => <List.Icon icon={parkingIcon} {...props} />}
        />
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
      keyExtractor={(item) => item.carParkId}
      ItemSeparatorComponent={itemSeparator}
      contentContainerStyle={styles.contentContainer}
      estimatedItemSize={86}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
});
