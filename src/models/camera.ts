import { LatLng } from 'react-native-maps';
import { SchemaCamera } from '../graphql/cameras';

export type CameraModel = {
  cameraId: string;
  name: string;
  coordinates: LatLng;
  images: CameraImage[];
};

export type CameraImage = {
  id: string;
  name: string;
  imageUrl: string;
  measuredTime: string;
};

/**
 * @param item Schema version of traffic camera
 * @returns model version of camera
 */
export function fromSchemaToModel(item: SchemaCamera): CameraModel {
  return {
    cameraId: item.cameraId,
    name: item.name,
    coordinates: { latitude: item.lat, longitude: item.lon },
    images: item.presets.map((preset) => {
      return {
        id: preset.presetId,
        name: preset.presentationName,
        imageUrl: preset.imageUrl,
        measuredTime: preset.measuredTime,
      };
    }),
  };
}
