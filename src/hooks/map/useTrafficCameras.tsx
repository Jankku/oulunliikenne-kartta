import { toOpaqueError } from '../../graphql/error';
import { Result, useQuery } from '../../graphql/cameras';
import { CameraModel, fromSchemaToModel } from '../../models/camera';
import { QueryHookResult } from '../../graphql/result';

export type TrafficCameraData = QueryHookResult<CameraModel[]>;

export default function useTrafficCameras(): TrafficCameraData {
  const { loading, data, error }: Result = useQuery();

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
