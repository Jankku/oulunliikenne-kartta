import { gql, useQuery as useApolloQuery } from '@apollo/client';
import { minutesToMs } from '../utils/time';
import { QueryResult } from './result';

export interface RoadworkFeature
  extends GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties> {
  type: 'Feature';
  geometry: GeoJSON.Geometry;
}

export interface RoadworkFeatureCollection
  extends GeoJSON.FeatureCollection<GeoJSON.Geometry, GeoJSON.GeoJsonProperties> {
  type: 'FeatureCollection';
  features: RoadworkFeature[];
}

export type RoadWorkSchema = {
  id: string;
  roadworkId: string;
  severity: string;
  status: string;
  startTime: string;
  endTime: string;
  description: { fi: string };
  constructionWorkType: string;
  roadMaintenanceType: [string];
  temporarySpeedLimit: number;
  subjectTypeOfWorks: string;
  geojson: RoadworkFeatureCollection;
};

type RoadworkSchemaType = {
  roadworks: RoadWorkSchema[];
};

export type Result = QueryResult<RoadworkSchemaType>;

export function useQuery(): Result {
  return useApolloQuery<RoadworkSchemaType>(GET_ALL_ROADWORKS, {
    pollInterval: POLL_FREQUENCY,
  });
}

const POLL_FREQUENCY = minutesToMs(5);

export const GET_ALL_ROADWORKS = gql`
  query GetAllRoadworks {
    roadworks {
      id
      roadworkId
      severity
      status
      startTime
      endTime
      description {
        fi
      }
      geojson
    }
  }
`;
