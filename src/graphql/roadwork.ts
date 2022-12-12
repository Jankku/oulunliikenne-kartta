import { gql, useQuery as useApolloQuery } from '@apollo/client';
import { TrafficDisruptionSeverity } from '../models/trafficannouncement';
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
  severity: TrafficDisruptionSeverity;
  status: string;
  startTime: string;
  endTime: string;
  description: { fi: string };
  constructionWorkType: string;
  roadMaintenanceType: string[];
  temporarySpeedLimit: number;
  subjectTypeOfWorks: string;
  geojson: RoadworkFeatureCollection;
};

type AllRoadworkSchemaType = {
  roadworks: RoadWorkSchema[];
};

type OneRoadworkSchemaType = {
  roadwork: RoadWorkSchema;
};

export type AllResult = QueryResult<AllRoadworkSchemaType>;
export function useAllQuery(): AllResult {
  return useApolloQuery<AllRoadworkSchemaType>(GET_ALL_ROADWORKS, {
    pollInterval: POLL_FREQUENCY,
  });
}

export type OneResult = QueryResult<OneRoadworkSchemaType>;
export function useOneQuery(roadworkId: string): OneResult {
  return useApolloQuery<OneRoadworkSchemaType>(GET_ROADWORK, {
    variables: { roadworkId },
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

export const GET_ROADWORK = gql`
  query GetRoadwork($roadworkId: String!) {
    roadwork(id: $roadworkId) {
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
