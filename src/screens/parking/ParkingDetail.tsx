import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { ParkingModel } from '../../models/parking';
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
    <ScrollView>
      <Card>
        <Card.Content>
          <View style={styles.container}>
            <MapView
              style={styles.map}
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
        <Card>
          <Card.Content>
            <Title>{`Kapasiteetti: ${parking.maxCapacity}`}</Title>
          </Card.Content>
        </Card>

        {parking.pricing.length > 0 ? (
          parking.pricing.map((p, i) => (
            <Card key={i}>
              <Card.Content>
                <Title>{p.title}</Title>
                <Paragraph>{p.description}</Paragraph>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Card>
            <Card.Title
              title="Ei hintatietoja saatavilla"
              left={() => (
                <MaterialCommunityIcons name={'exclamation-thick'} color={'red'} size={34} />
              )}
              titleVariant="titleLarge"
            />
          </Card>
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
