import { Image } from 'react-native';
import { Marker } from 'react-native-maps';
import { ParkingModel } from '../../../models/parking';
import parkingIcon from './parking.png';
import { memo, useCallback } from 'react';
import { useMapReady } from '../../../providers/MapReadyProvider';

export type ParkingProps = {
  carkPark: ParkingModel;
  onItemSelect?: (selected: ParkingModel) => void;
};

function ParkingMarker({ carkPark, onItemSelect }: ParkingProps): JSX.Element {
  const result = Image.resolveAssetSource(parkingIcon);
  const ready = useMapReady();
  const onPress = useCallback(() => onItemSelect?.(carkPark), [carkPark, onItemSelect]);

  return (
    <Marker
      coordinate={carkPark.coordinates}
      title={carkPark.name}
      onCalloutPress={onPress}
      tracksViewChanges={!ready}
    >
      <Image source={{ uri: result.uri, width: 20, height: 20 }} />
    </Marker>
  );
}

export default memo(ParkingMarker);
