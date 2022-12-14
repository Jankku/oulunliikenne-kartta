import { Image } from 'react-native';
import { Marker } from 'react-native-maps';
import { ParkingModel } from '../../../models/parking';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import parkingIcon from './parking.png';

export type ParkingProps = {
  carkPark: ParkingModel;
  onItemSelect?: (selected: ParkingModel) => void;
};

export default function ParkingMarker({ carkPark, onItemSelect }: ParkingProps): JSX.Element {
  const result = Image.resolveAssetSource(parkingIcon);
  /**
   * <Marker/> seems to ignore ImageSource height and width
   * so use a child component to override it with an image
   */
  return (
    <Marker
      coordinate={carkPark.coordinates}
      title={carkPark.name}
      onCalloutPress={onItemSelect ? () => onItemSelect(carkPark) : undefined}
    >
      <Image source={{ uri: result.uri, width: 20, height: 20 }} />
    </Marker>
  );
}
