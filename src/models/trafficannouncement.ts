import {
  TrafficAnnouncementFeatureCollection,
  TrafficAnnouncementSchema,
} from '../graphql/trafficannouncement';

export enum TrafficDisruptionSeverity {
  High = 'HIGH',
  Highest = 'HIGHEST',
  Low = 'LOW',
  Lowest = 'LOWEST',
  Medium = 'MEDIUM',
  None = 'NONE',
  Unknown = 'UNKNOWN',
}

export enum TrafficDisruptionValidityStatus {
  Active = 'ACTIVE',
  DefinedByValidityTimeSpec = 'DEFINED_BY_VALIDITY_TIME_SPEC',
  Suspended = 'SUSPENDED',
}

export enum TrafficDisruptionModeOfTransport {
  Bicycle = 'BICYCLE',
  Car = 'CAR',
  Pedestrian = 'PEDESTRIAN',
  PublicTransport = 'PUBLIC_TRANSPORT',
}

export type TrafficAnnouncementModel = {
  id: string;
  title: string;
  description: string;
  severity: TrafficDisruptionSeverity;
  status: TrafficDisruptionValidityStatus;
  modesOfTransport: TrafficDisruptionModeOfTransport[];
  geojson: TrafficAnnouncementFeatureCollection;
  detour: TrafficAnnouncementFeatureCollection;
};

export const fromSchemaToModel = (
  announcement: TrafficAnnouncementSchema
): TrafficAnnouncementModel => {
  return {
    id: announcement.announcementId,
    title: announcement.title.fi,
    description: announcement.description?.fi,
    severity: announcement.severity,
    status: announcement.status,
    modesOfTransport: announcement.modesOfTransport,
    geojson: announcement.geojson,
    detour: announcement.detour,
  };
};
