import CameraMarker, { CameraProps } from './marker/CameraMarker';
import useTrafficCameras from '../../hooks/map/useTrafficCameras';

export type TrafficCameraLayerProps = {
  onItemSelect: CameraProps['onItemSelect'];
};

export default function TrafficCameraLayer({ onItemSelect }: TrafficCameraLayerProps) {
  const result = useTrafficCameras();

  //For now the layer version might as well show the results or nothing
  if (result.loading || result.error) return null;

  const markers = result.data.map((camera) => (
    <CameraMarker key={camera.cameraId} camera={camera} onItemSelect={onItemSelect} />
  ));

  return <>{markers}</>;
}
