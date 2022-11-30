import { LatLng } from 'react-native-maps';
import { SchemaParking } from '../graphql/parking';

export const INFORMATION_NOT_AVAILABLE = 'Ei tiedossa';

export type ParkingModel = {
  carParkId: string;
  name: string;
  coordinates: LatLng;
  maxCapacity: string;
  spacesAvailable: string;
};

export function fromSchemaToModel(schemaObject: SchemaParking): ParkingModel {
  return {
    carParkId: schemaObject.carParkId,
    name: schemaObject.name,
    coordinates: { latitude: schemaObject.lat, longitude: schemaObject.lon },
    maxCapacity: schemaObject.maxCapacity?.toString() ?? INFORMATION_NOT_AVAILABLE,
    spacesAvailable: schemaObject.spacesAvailable?.toString() ?? INFORMATION_NOT_AVAILABLE,
  };
}

export const KNOWN_DEMOLISHED_LOCATION_NAMES = new Set<string>(['Medipark']);
