import { ApolloError } from '@apollo/client';
import { SchemaType, QueryResult, useQuery } from '../../graphql/cameras';
import { CameraModel, fromSchemaToModel } from '../../models/camera';


//This might be a bad assumption, but let's just show the freshest data or nothing
export type LoadingState = {
  loading : true;
}

export type ResultState = {
  loading : false
  error : ApolloError | undefined
  data : CameraModel[]
}

export type TrafficCameraData = ResultState | LoadingState;

export default function useTrafficCameras(): TrafficCameraData {
  const { loading, data, error } : QueryResult = useQuery();

  if(!loading) {
    const cameras = data?.cameras.filter((c) => c && c.cameraId && c.name && c.lat && c.lon)
                                                           .map(fromSchemaToModel);

    return {loading: loading, error : error, data : cameras ? cameras : []};
  }

  return { loading: loading};
}