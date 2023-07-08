import ParkingMarker, { ParkingProps } from './marker/ParkingMarker';
import useCarParkData from '../../hooks/map/useCarParkData';

export type ParkingLayerProps = {
  onItemSelect: ParkingProps['onItemSelect'];
};

export default function ParkingLayer({ onItemSelect }: ParkingLayerProps) {
  const result = useCarParkData();

  if (result.loading || result.error) return null;

  const markers = result.data.map((parking) => (
    <ParkingMarker key={parking.carParkId} carkPark={parking} onItemSelect={onItemSelect} />
  ));

  return <>{markers}</>;
}
