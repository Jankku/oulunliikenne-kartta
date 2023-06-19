import { Marker } from 'react-native-maps';
import { CameraModel } from '../../../models/camera';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cameraBlack from './camera.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cameraWhite from './camera-white.png';
import { useTheme } from 'react-native-paper';
import { Image } from 'react-native';

export type CameraProps = {
  camera: CameraModel;
  onItemSelect: (selected: CameraModel) => void;
};

export function CameraMarker({ camera, onItemSelect }: CameraProps): JSX.Element {
  const theme = useTheme();
  return (
    <Marker
      coordinate={camera.coordinates}
      title={camera.name}
      onCalloutPress={() => onItemSelect(camera)}
    >
      <Image source={theme.dark ? cameraWhite : cameraBlack} style={{ width: 20, height: 20 }} />
    </Marker>
  );
}
