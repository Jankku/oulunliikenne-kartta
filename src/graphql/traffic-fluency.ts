import { gql, useQuery as useApolloQuery } from '@apollo/client';
import { minutesToMs } from '../utils/time';
import { QueryResult } from './result';

export type SchemaTrafficFluencyCollection = {
  type: string;
  features: SchemaTrafficFluencyFeature[];
};

export type SchemaTrafficFluencyFeature = {
  type: string;
  geometry: GeoJSON.Geometry;
  properties: {
    id: string;
    type: string;
    measuredTime: string;
    trafficFlow: string;
  };
};

export type SchemaType = {
  trafficFluencyFeatureCollection: SchemaTrafficFluencyCollection;
};

export type Result = QueryResult<SchemaType>;

/**
 * Query hook for Traffic fluency data
 */
export function useQuery(): Result {
  return useApolloQuery<SchemaType>(GET_TRAFFIC_FLUENCY, { pollInterval: POLL_FREQUENCY });
}

/**
 * Frequency should be 5 minutes
 */
const POLL_FREQUENCY = minutesToMs(5);

const GET_TRAFFIC_FLUENCY = gql`
  query GetTrafficFluencyFeatureCollection {
    trafficFluencyFeatureCollection {
      type
      features {
        type
        geometry
        properties {
          id
          type
          measuredTime
          trafficFlow
        }
      }
    }
  }
`;
