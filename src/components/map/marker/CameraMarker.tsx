import React from 'react';
import { Marker } from 'react-native-maps';
import { CameraModel } from '../../../models/camera';
// @ts-ignore
import cameraIcon from './camera.png';

export type CameraProps = {
  camera: CameraModel;
};

export function CameraMarker({ camera }: CameraProps): JSX.Element {
  return (
    <Marker
      image={cameraIcon}
      coordinate={camera.coordinates}
      title={camera.name}
    />
  );
}
