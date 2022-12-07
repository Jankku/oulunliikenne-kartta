import { gql, useQuery as useApolloQuery } from '@apollo/client';
import {
  TrafficDisruptionModeOfTransport,
  TrafficDisruptionSeverity,
  TrafficDisruptionValidityStatus,
} from '../models/trafficannouncement';
import { minutesToMs } from '../utils/time';
import { QueryResult } from './result';

export interface TrafficAnnouncementFeature
  extends GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties> {
  type: 'Feature';
  geometry: GeoJSON.Geometry;
}

export interface TrafficAnnouncementFeatureCollection
  extends GeoJSON.FeatureCollection<GeoJSON.Geometry, GeoJSON.GeoJsonProperties> {
  type: 'FeatureCollection';
  features: TrafficAnnouncementFeature[];
}

export type TrafficAnnouncementSchema = {
  announcementId: string;
  title: { fi: string };
  description: { fi: string };
  severity: TrafficDisruptionSeverity;
  status: TrafficDisruptionValidityStatus;
  startTime: string;
  endTime: string;
  modesOfTransport: TrafficDisruptionModeOfTransport[];
  geojson: TrafficAnnouncementFeatureCollection;
  detour: TrafficAnnouncementFeatureCollection;
};

type AllTrafficAnnouncementsSchemaType = {
  trafficAnnouncements: TrafficAnnouncementSchema[];
};

type TrafficAnnouncementSchemaType = {
  trafficAnnouncement: TrafficAnnouncementSchema;
};

export type AllResult = QueryResult<AllTrafficAnnouncementsSchemaType>;
export function useAllQuery(): AllResult {
  return useApolloQuery<AllTrafficAnnouncementsSchemaType>(GET_ALL_TRAFFIC_ANNOUNCEMENTS, {
    pollInterval: POLL_FREQUENCY,
  });
}

export type OneResult = QueryResult<TrafficAnnouncementSchemaType>;
export function useOneQuery(announcementId: string): OneResult {
  return useApolloQuery<TrafficAnnouncementSchemaType>(GET_TRAFFIC_ANNOUNCEMENT, {
    variables: { announcementId },
    pollInterval: POLL_FREQUENCY,
  });
}

const POLL_FREQUENCY = minutesToMs(5);

const GET_ALL_TRAFFIC_ANNOUNCEMENTS = gql`
  query GetAllTrafficAnnouncements {
    trafficAnnouncements {
      announcementId
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

export const GET_TRAFFIC_ANNOUNCEMENT = gql`
  query GetTrafficAnnouncement($announcementId: String!) {
    trafficAnnouncement(id: $announcementId) {
      announcementId
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
      geojson
      detour
    }
  }
`;
