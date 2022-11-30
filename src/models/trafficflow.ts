import { SchemaTrafficFluencyFeature } from '../graphql/traffic-fluency';

export enum TrafficFlow {
  TrafficFlowUnknown = 'TRAFFIC_FLOW_UNKNOWN',
  TrafficFlowNormal = 'TRAFFIC_FLOW_NORMAL',
  TrafficHeavierThanNormal = 'TRAFFIC_HEAVIER_THAN_NORMAL',
  TrafficMuchHeavierThanNormal = 'TRAFFIC_MUCH_HEAVIER_THAN_NORMAL',
}

export type ValidTrafficFlowValues =
  | TrafficFlow.TrafficFlowNormal
  | TrafficFlow.TrafficHeavierThanNormal
  | TrafficFlow.TrafficMuchHeavierThanNormal;

export type TrafficFluencyModel = {
  id: string;
  //TODO: Evaluate whether to change to more <Polyline/> friendly format?
  //https://github.com/react-native-maps/react-native-maps/blob/master/docs/polyline.md
  geometry: GeoJSON.FeatureCollection;
  trafficFlow: ValidTrafficFlowValues;
  //TODO: Add more properties for map clicking?
};

export class TrafficFluencyCollectionModel implements TrafficFluencyShape {
  [TrafficFlow.TrafficFlowNormal]: TrafficFluencyModel[] = [];
  [TrafficFlow.TrafficHeavierThanNormal]: TrafficFluencyModel[] = [];
  [TrafficFlow.TrafficMuchHeavierThanNormal]: TrafficFluencyModel[] = [];
  values = new Map<string, TrafficFluencyModel>();

  addTrafficFlow(info: TrafficFluencyModel) {
    this.values.set(info.id, info);
    this[info.trafficFlow].push(info);
  }
}

/**
 * Converts an already validated schema type to model
 * @param feature Validated schema type
 * @returns Model version
 */
export function fromSchemaToModel(feature: SchemaTrafficFluencyFeature): TrafficFluencyModel {
  const properties = feature.properties;
  return {
    id: properties.id,
    geometry: wrapWithCollection(feature.geometry),
    trafficFlow: properties.trafficFlow as ValidTrafficFlowValues,
  };
}

function wrapWithCollection(geometry: GeoJSON.Geometry) {
  const wrapped: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: geometry,
        properties: {},
      },
    ],
  };

  return wrapped;
}

type TrafficFluencyShape = {
  [T in ValidTrafficFlowValues]: TrafficFluencyModel[];
};
