import { QueryError, toOpaqueError as toOpaqueError } from '../../graphql/error';
import { SchemaType, QueryResult, useQuery } from '../../graphql/cameras';
import { CameraModel, fromSchemaToModel } from '../../models/camera';

//This might be a bad assumption, but let's just show the freshest data or nothing
export type LoadingState = {
  loading: true;
};

export type ErrorState = {
  loading: false;
  error: QueryError;
};

//Current error settings in client dictates either data or error. Not both
export type ResultState = {
  loading: false;
  error?: undefined;
  data: CameraModel[];
};

export type TrafficCameraData = ResultState | ErrorState | LoadingState;

export default function useTrafficCameras(): TrafficCameraData {
  const { loading, data, error }: QueryResult = useQuery();

  if (!loading) {
    if (error) {
      return { loading: false, error: toOpaqueError(error) };
    }

    const cameras = data?.cameras
      .filter((c) => c && c.cameraId && c.name && c.lat && c.lon)
      .map(fromSchemaToModel);

    return { loading: loading, data: cameras ? cameras : [] };
  }

  return { loading: loading };
}
