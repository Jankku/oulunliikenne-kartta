import { LatLng } from 'react-native-maps';
import { SchemaParking } from '../graphql/parking';

export const INFORMATION_NOT_AVAILABLE = 'Ei tiedossa';

export type ParkingPricing = {
  title: string;
  description: string;
};

export type ParkingModel = {
  carParkId: string;
  name: string;
  coordinates: LatLng;
  maxCapacity: string;
  spacesAvailable: string;
  pricing: ParkingPricing[];
};

export function fromSchemaToModel(schemaObject: SchemaParking): ParkingModel {
  return {
    carParkId: schemaObject.carParkId,
    name: schemaObject.name,
    coordinates: { latitude: schemaObject.lat, longitude: schemaObject.lon },
    maxCapacity: schemaObject.maxCapacity?.toString() ?? INFORMATION_NOT_AVAILABLE,
    spacesAvailable: schemaObject.spacesAvailable?.toString() ?? INFORMATION_NOT_AVAILABLE,
    pricing:
      schemaObject.pricing?.map((pricing) => {
        return { title: pricing.title.fi, description: pricing.value.fi };
      }) ?? [],
  };
}

export const KNOWN_DEMOLISHED_LOCATION_NAMES = new Set<string>(['Medipark']);
