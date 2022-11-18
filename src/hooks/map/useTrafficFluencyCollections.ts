import { Feature, Geometry, GeoJsonProperties } from 'geojson';
import { GetTrafficFluencyFeatureCollectionQuery, TrafficFlow } from '../../generated/graphql';
import dayjs from 'dayjs';

type UseTrafficFluencyReturn = {
  collections: TrafficFluencyFeatureCollectionObject | null;
};

export default function useTrafficFluencyCollections(
  data: GetTrafficFluencyFeatureCollectionQuery | undefined
): UseTrafficFluencyReturn {
  if (!data) return { collections: null };

  const colorFiltered = getColorFilteredTrafficFluency(data);
  if (!colorFiltered) return { collections: null };

  const colorCollections = mapFeatureArraysToFeatureCollection(data, colorFiltered);
  return { collections: colorCollections };
}

type TrafficFluencyColors = 'green' | 'orange' | 'red';

type TrafficFluencyFeatureObject = {
  [color in TrafficFluencyColors]: GeoJSON.Feature[];
};

type TrafficFluencyFeatureCollectionObject = {
  [color in TrafficFluencyColors]: GetTrafficFluencyFeatureCollectionQuery | null;
};

const getColorFilteredTrafficFluency = (data: GetTrafficFluencyFeatureCollectionQuery) => {
  if (!data.trafficFluencyFeatureCollection) return;
  const features = data.trafficFluencyFeatureCollection?.features;
  const values: TrafficFluencyFeatureObject = {
    red: [],
    orange: [],
    green: [],
  };

  features.map((i) => {
    const item = i;
    const trafficFlow = item?.properties?.trafficFlow;

    if (!item?.properties?.measuredTime) return;

    const itemMeasuredTime = dayjs(item?.properties?.measuredTime);
    if (!itemMeasuredTime.isValid()) return;

    const itemAge = dayjs().diff(itemMeasuredTime, 'minute');
    if (itemAge > 10) return;

    if (trafficFlow) {
      switch (trafficFlow) {
        case TrafficFlow.TrafficFlowNormal:
          values['green'].push(item as GeoJSON.Feature);
          break;
        case TrafficFlow.TrafficHeavierThanNormal:
          values['orange'].push(item as GeoJSON.Feature);
          break;
        case TrafficFlow.TrafficMuchHeavierThanNormal:
          values['red'].push(item as GeoJSON.Feature);
          break;
        default:
          break;
      }
    }
  });

  return values;
};

const mapFeatureArraysToFeatureCollection = (
  original: GetTrafficFluencyFeatureCollectionQuery,
  featureObject: TrafficFluencyFeatureObject
): TrafficFluencyFeatureCollectionObject => {
  const collections: TrafficFluencyFeatureCollectionObject = {
    green: null,
    orange: null,
    red: null,
  };

  if (!original.trafficFluencyFeatureCollection?.features) return collections;

  Object.keys(featureObject).forEach((k) => {
    const key = k as keyof typeof featureObject;

    const newCollection: GetTrafficFluencyFeatureCollectionQuery = {
      trafficFluencyFeatureCollection: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'MultiLineString',
              coordinates: [],
            },
          },
        ],
      },
    };

    if (!newCollection.trafficFluencyFeatureCollection) return;

    const newFeature: Feature<Geometry, GeoJsonProperties>[] = [];

    Object.values(featureObject[key]).forEach((feature) => {
      newFeature.push(feature);
    });

    newCollection.trafficFluencyFeatureCollection.features = newFeature;
    collections[key] = newCollection;
  });

  return collections;
};
