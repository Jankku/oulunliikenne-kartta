import { toOpaqueError } from '../../graphql/error';
import { QueryHookResult } from '../../graphql/result';
import {
  OneResult,
  TrafficAnnouncementSchema,
  useOneQuery,
} from '../../graphql/trafficannouncement';
import { fromSchemaToModel, TrafficAnnouncementModel } from '../../models/trafficannouncement';

export type TrafficAnnouncementResult = QueryHookResult<TrafficAnnouncementModel>;

export default function useTrafficAnnouncement(announcementId: string): TrafficAnnouncementResult {
  const { loading, data, error }: OneResult = useOneQuery(announcementId);

  if (!loading) {
    if (error) {
      return { loading: false, error: toOpaqueError(error) };
    }

    const announcement: TrafficAnnouncementModel = fromSchemaToModel(
      data?.trafficAnnouncement as TrafficAnnouncementSchema
    );

    return { data: announcement, loading: loading };
  }

  return { loading: loading };
}
