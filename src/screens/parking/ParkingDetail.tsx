import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { ParkingModel } from '../../models/parking';
import MapView, { Region } from 'react-native-maps';
import ParkingMarker from '../../components/map/marker/ParkingMarker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MapStackScreenProps, ParkingStackScreenProps } from '../../navigation/types';
import { darkMapStyle, lightMapStyle } from '../../styles/mapstyle';
import type { CustomTheme } from '../../styles/theme';
import { MapReadyProvider } from '../../providers/MapReadyProvider';

export function ParkingDetailMapScreen({ route }: MapStackScreenProps<'ParkingDetail'>) {
  return ParkingDetail(route.params.parking);
}

export function ParkingDetailParkingListScreen({
  route,
}: ParkingStackScreenProps<'ParkingDetail'>) {
  return ParkingDetail(route.params.parking);
}

function ParkingDetail(parking: ParkingModel) {
  const theme: CustomTheme = useTheme();
  const region: Region = {
    ...parking.coordinates,
    latitudeDelta: 0.003,
    longitudeDelta: 0.002,
  };

  const openSpacesText = `Vapaana ${parking.spacesAvailable}/${parking.maxCapacity} paikkaa`;

  return (
    <ScrollView>
      <MapReadyProvider ready={true}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                customMapStyle={theme.dark ? darkMapStyle : lightMapStyle}
                region={region}
                zoomEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}
                pitchEnabled={false}
              >
                <ParkingMarker carkPark={parking} />
              </MapView>
            </View>
          </Card.Content>

          <Card elevation={0} style={styles.card}>
            <Card.Content>
              <Title>{openSpacesText}</Title>
            </Card.Content>
          </Card>

          {parking.pricing.length > 0 ? (
            parking.pricing.map((p, i) => (
              <Card key={i} elevation={0} style={styles.card}>
                <Card.Content>
                  <Title>{p.title}</Title>
                  <Paragraph>{p.description}</Paragraph>
                </Card.Content>
              </Card>
            ))
          ) : (
            <Card style={styles.card}>
              <Card.Title
                title="Ei hintatietoja saatavilla"
                left={() => (
                  <MaterialCommunityIcons
                    name={'exclamation-thick'}
                    color={theme.colors.announcement.red}
                    size={34}
                  />
                )}
                titleVariant="titleLarge"
              />
            </Card>
          )}
        </Card>
      </MapReadyProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
  },
  map: {
    height: '100%',
    minHeight: 5,
    minWidth: 5,
    width: '100%',
  },
  mapContainer: {
    borderRadius: 16,
    height: 250,
    minHeight: 5,
    minWidth: 5,
    overflow: 'hidden',
    width: '100%',
  },
});
