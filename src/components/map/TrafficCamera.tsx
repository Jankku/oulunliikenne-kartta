import { useQuery } from '@apollo/client';
import { Marker } from 'react-native-maps';
import { GET_CAMERAS } from '../../graphql/cameras';
import useTrafficCameras from '../../hooks/map/useTrafficCameras';
// @ts-ignore
import cameraIcon from './camera.png';

export default function TrafficCamera() {
  const { data } = useQuery(GET_CAMERAS);
  const { cameras } = useTrafficCameras(data);

  return (
    <>
      {cameras?.map((camera) => {
        return (
          <Marker
            key={camera.cameraId}
            image={cameraIcon}
            coordinate={{ latitude: camera.lat, longitude: camera.lon }}
            title={camera.name}
          />
        );
      })}
    </>
  );
}
