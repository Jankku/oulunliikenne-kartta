import { RoadworkFeatureCollection, RoadWorkSchema } from '../graphql/roadwork';
import { TrafficDisruptionSeverity } from './trafficannouncement';

export type RoadworkModel = {
  id: string;
  description: string;
  severity: TrafficDisruptionSeverity;
  geojson: RoadworkFeatureCollection;
  speedlimit: number;
};

export const fromSchemaToModel = (roadwork: RoadWorkSchema): RoadworkModel => {
  return {
    id: roadwork.roadworkId,
    description: roadwork.description.fi,
    severity: roadwork.severity,
    geojson: roadwork.geojson,
    speedlimit: roadwork.temporarySpeedLimit,
  };
};
