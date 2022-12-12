import { toOpaqueError } from '../../graphql/error';
import { QueryHookResult } from '../../graphql/result';
import { Result, useQuery } from '../../graphql/roadwork';
import { fromSchemaToModel, RoadworkModel } from '../../models/roadwork';

export type RoadworksResult = QueryHookResult<RoadworkModel[]>;

export default function useAllRoadworks(): RoadworksResult {
  const { loading, data, error }: Result = useQuery();

  if (!loading) {
    if (error) {
      return { loading: false, error: toOpaqueError(error) };
    }

    const roadworks: RoadworkModel[] = [];

    data?.roadworks
      .filter((r) => r.roadworkId && r.description.fi)
      .forEach((r) => roadworks.push(fromSchemaToModel(r)));

    return { data: roadworks, loading: loading };
  }

  return { loading: loading };
}
