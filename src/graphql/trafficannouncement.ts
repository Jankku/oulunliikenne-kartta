import { gql, useQuery as useApolloQuery } from '@apollo/client';
import {
  TrafficDisruptionModeOfTransport,
  TrafficDisruptionSeverity,
  TrafficDisruptionValidityStatus,
} from '../models/trafficannouncement';
import { minutesToMs } from '../utils/time';
import { QueryResult } from './result';

type TrafficAnnouncementFeature = {
  type: string;
  geometry: GeoJSON.Geometry;
};

type TrafficAnnouncementFeatureCollection = {
  type: string;
  features: TrafficAnnouncementFeature[];
};

export type TrafficAnnouncementSchema = {
  id: string;
  title: { fi: string };
  description: { fi: string };
  severity: TrafficDisruptionSeverity;
  status: TrafficDisruptionValidityStatus;
  startTime: string;
  endTime: string;
  modesOfTransport: TrafficDisruptionModeOfTransport[];
  detour: TrafficAnnouncementFeatureCollection;
};

type TrafficAnnouncementSchemaType = {
  trafficAnnouncements: TrafficAnnouncementSchema[];
};

export type Result = QueryResult<TrafficAnnouncementSchemaType>;

export function useQuery(): Result {
  return useApolloQuery<TrafficAnnouncementSchemaType>(GET_TRAFFIC_ANNOUNCEMENTS, {
    pollInterval: POLL_FREQUENCY,
  });
}

const POLL_FREQUENCY = minutesToMs(5);

const GET_TRAFFIC_ANNOUNCEMENTS = gql`
  query GetAllTrafficAnnouncements {
    trafficAnnouncements {
      id
      title {
        fi
      }
      description {
        fi
      }
      severity
      status
      startTime
      endTime
      modesOfTransport
      detour
    }
  }
`;
