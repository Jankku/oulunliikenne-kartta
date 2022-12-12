import { toOpaqueError } from '../../graphql/error';
import { Result, useQuery } from '../../graphql/parking';
import {
  ParkingModel,
  fromSchemaToModel,
  KNOWN_DEMOLISHED_LOCATION_NAMES,
} from '../../models/parking';
import { QueryHookResult } from '../../graphql/result';

export type CarParkData = QueryHookResult<ParkingModel[]>;

export default function useCarParkData(): CarParkData {
  const { loading, data, error }: Result = useQuery();

  if (!loading) {
    if (error) {
      return { loading: false, error: toOpaqueError(error) };
    }

    const carParks: ParkingModel[] = [];

    data?.carParks.forEach((parking) => {
      if (!(parking.lat && parking.lon && !KNOWN_DEMOLISHED_LOCATION_NAMES.has(parking.name))) {
        //Filters out demolished / out of usage locations
        return;
      }

      carParks.push(fromSchemaToModel(parking));
    });

    return { loading: loading, data: carParks };
  }

  return { loading: loading };
}
