import { toOpaqueError } from '../../graphql/error';
import { QueryHookResult } from '../../graphql/result';
import { OneResult, RoadWorkSchema, useOneQuery } from '../../graphql/roadwork';
import { RoadworkModel, fromSchemaToModel } from '../../models/roadwork';

export type RoadworkResult = QueryHookResult<RoadworkModel>;

export default function useRoadwork(roadworkID: string): RoadworkResult {
  const { loading, data, error }: OneResult = useOneQuery(roadworkID);

  if (!loading) {
    if (error) {
      return { loading: false, error: toOpaqueError(error) };
    }

    const roadwork: RoadworkModel = fromSchemaToModel(data?.roadwork as RoadWorkSchema);

    return { data: roadwork, loading: loading };
  }

  return { loading: loading };
}
