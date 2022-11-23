import { gql, useQuery as useApolloQuery } from '@apollo/client';
import { minutesToMs } from '../utils/time';
import { QueryResult } from './result';


/**
 * Assume that Schema contains all the members defined here.
 * Sanity checks should be done before using the type raw from a query
 */
export type SchemaCamera = {
  cameraId: string;
  name: string;
  lat: number;
  lon: number;
  presets: {
    presetId: string;
    presentationName: string;
    imageUrl: string;
    measuredTime: string;
  }[];
}

export type SchemaType = {
  cameras: SchemaCamera[];
};


export type Result = QueryResult<SchemaType>
/**
 * Query hook for Traffic camera data
 */
export function useQuery() : Result {
  return useApolloQuery<SchemaType>(GET_CAMERAS, { pollInterval: POLL_FREQUENCY });
}

/**
 * Actual frequency is 5-15 minutes so use 5 minutes
 */
const POLL_FREQUENCY = minutesToMs(5);

const GET_CAMERAS = gql`
  query GetAllCameras {
    cameras {
      cameraId
      name
      lat
      lon
      presets {
        presetId
        presentationName
        imageUrl
        measuredTime
      }
    }
  }
`;
