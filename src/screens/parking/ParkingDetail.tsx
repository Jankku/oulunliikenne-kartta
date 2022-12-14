import { View, FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { ParkingModel, ParkingPricing } from '../../models/parking';
import MapView, { Region } from 'react-native-maps';
import ParkingMarker from '../../components/map/marker/ParkingMarker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MapStackScreenProps, ParkingStackScreenProps } from '../../navigation/types';

export function ParkingDetailMapScreen({ route }: MapStackScreenProps<'ParkingDetail'>) {
  return ParkingDetail(route.params.parking);
}

export function ParkingDetailParkingListScreen({
  route,
}: ParkingStackScreenProps<'ParkingDetail'>) {
  return ParkingDetail(route.params.parking);
}

function ParkingDetail(parking: ParkingModel) {
  const region: Region = {
    ...parking.coordinates,
    latitudeDelta: 0.003,
    longitudeDelta: 0.002,
  };

  return (
    <View>
      <Card>
        <Card.Content>
          <View style={mapStyle.container}>
            <MapView
              style={mapStyle.map}
              region={region}
              zoomEnabled={false}
              rotateEnabled={false}
              scrollEnabled={false}
              pitchEnabled={false}
            >
              <ParkingMarker carkPark={parking}></ParkingMarker>
            </MapView>
          </View>
        </Card.Content>
        <FlatList
          ListEmptyComponent={PricingEmptyComponent}
          data={parking.pricing}
          keyExtractor={(_, index) => index.toString()}
          renderItem={PricingElement}
        />
      </Card>
    </View>
  );
}

function PricingEmptyComponent() {
  return (
    <Card>
      <Card.Title
        title="Ei hintatietoja saatavilla"
        left={(props) => (
          <MaterialCommunityIcons name={'exclamation-thick'} color={'red'} {...props} />
        )}
        titleVariant="titleLarge"
      />
    </Card>
  );
}

function PricingElement<T extends ParkingPricing>(info: ListRenderItemInfo<T>): JSX.Element {
  return (
    <Card>
      <Card.Content key={info.index}>
        <Title>{info.item.title}</Title>
        <Paragraph>{info.item.description}</Paragraph>
      </Card.Content>
    </Card>
  );
}

const mapStyle = StyleSheet.create({
  container: {
    borderRadius: 16,
    height: 250,
    minHeight: 5,
    minWidth: 5,
    overflow: 'hidden',
    width: '100%',
  },
  map: {
    height: '100%',
    minHeight: 5,
    minWidth: 5,
    width: '100%',
  },
});
