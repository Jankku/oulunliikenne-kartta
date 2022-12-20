import { Marker } from 'react-native-maps';
import { CameraModel } from '../../../models/camera';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cameraBlack from './camera.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cameraWhite from './camera-white.png';
import { useTheme } from 'react-native-paper';

export type CameraProps = {
  camera: CameraModel;
  onItemSelect: (selected: CameraModel) => void;
};

export function CameraMarker({ camera, onItemSelect }: CameraProps): JSX.Element {
  const theme = useTheme();

  return (
    <Marker
      image={theme.dark ? cameraWhite : cameraBlack}
      coordinate={camera.coordinates}
      title={camera.name}
      onCalloutPress={() => onItemSelect(camera)}
    />
  );
}
