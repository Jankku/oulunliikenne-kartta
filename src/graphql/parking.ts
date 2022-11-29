import { gql, useQuery as useApolloQuery} from '@apollo/client';
import { minutesToMs } from '../utils/time';
import { QueryResult } from './result';

export type SchemaType = {
  carParks: SchemaParking[]
}

export type SchemaParking = {
  carParkId: string;
  name: string;
  lat: number;
  lon: number;
  maxCapacity: number;
  spacesAvailable: number;
};

export type Result = QueryResult<SchemaType>


export function useQuery(): Result {
  return useApolloQuery<SchemaType>(QUERY, { pollInterval: POLL_FREQUENCY });
}

/**
 * Actual frequency is 5-20 minutes so use 5 minutes
 */
const POLL_FREQUENCY = minutesToMs(5);

const QUERY = gql`
  query GetAllCarParks {
    carParks {
      carParkId
      name
      lat
      lon
      maxCapacity
      spacesAvailable
    }
  }
`;

