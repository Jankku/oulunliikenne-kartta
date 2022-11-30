import { SchemaTrafficFluencyFeature, useQuery } from '../../graphql/traffic-fluency';
import { QueryHookResult } from '../../graphql/result';
import {
  fromSchemaToModel,
  TrafficFlow,
  TrafficFluencyCollectionModel,
} from '../../models/trafficflow';
import { toOpaqueError } from '../../graphql/error';
import dayjs from 'dayjs';

export type TrafficFluencyData = QueryHookResult<TrafficFluencyCollectionModel>;

export default function useTrafficFluencyCollections(): TrafficFluencyData {
  const { loading, error, data } = useQuery();

  if (!loading) {
    if (error) {
      return { loading: false, error: toOpaqueError(error) };
    }

    const processedData = new TrafficFluencyCollectionModel();
    const validated = new Map<string, SchemaTrafficFluencyFeature>();
    data?.trafficFluencyFeatureCollection.features.forEach((item) => {
      const properties = item.properties;
      //Check required members
      if (
        !(
          item.geometry &&
          properties &&
          properties.id &&
          properties.measuredTime &&
          properties.trafficFlow &&
          properties.trafficFlow !== TrafficFlow.TrafficFlowUnknown
        )
      ) {
        return;
      }

      const itemMeasuredTime = dayjs(properties.measuredTime);
      if (!itemMeasuredTime.isValid()) {
        return;
      }

      const itemAge = dayjs().diff(itemMeasuredTime, 'minute');
      if (itemAge > 10) {
        return;
      }

      const old = validated.get(properties.id);

      if (!old || dayjs(old.properties.measuredTime).isBefore(itemMeasuredTime)) {
        validated.set(properties.id, item);
      }
    });

    validated.forEach((item) => processedData.addTrafficFlow(fromSchemaToModel(item)));

    return { loading: loading, data: processedData };
  }

  return { loading: loading };
}
