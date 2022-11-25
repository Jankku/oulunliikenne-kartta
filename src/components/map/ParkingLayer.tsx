import ParkingMarker from './marker/ParkingMarker';
import useCarParkData from '../../hooks/map/useCarParkData';

export default function ParkingLayer() {
  const result = useCarParkData();
  
  //For now the layer version might as well show the results or nothing
  if(result.loading || result.error)
    return null;

  const markers = result.data.map((parking) => <ParkingMarker key={parking.carParkId} carkPark={parking} />);
  
  return (
    <>
      {markers}
    </>
  );
}
