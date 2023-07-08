import { Marker } from 'react-native-maps';
import { CameraModel } from '../../../models/camera';
import cameraBlack from './camera.png';
import cameraWhite from './camera-white.png';
import { useTheme } from 'react-native-paper';
import { useMapReady } from '../../../providers/MapReadyProvider';

export type CameraProps = {
  camera: CameraModel;
  onItemSelect: (selected: CameraModel) => void;
};

export default function CameraMarker({ camera, onItemSelect }: CameraProps): JSX.Element {
  const theme = useTheme();
  const ready = useMapReady();

  return (
    <Marker
      coordinate={camera.coordinates}
      title={camera.name}
      icon={theme.dark ? cameraWhite : cameraBlack}
      onCalloutPress={() => onItemSelect(camera)}
      tracksViewChanges={!ready}
    />
  );
}
