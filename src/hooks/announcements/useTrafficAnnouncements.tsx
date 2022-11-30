import { toOpaqueError } from '../../graphql/error';
import { QueryHookResult } from '../../graphql/result';
import { Result, useQuery } from '../../graphql/trafficannouncement';
import { fromSchemaToModel, TrafficAnnouncementModel } from '../../models/trafficannouncement';

export type TrafficAnnouncementsResult = QueryHookResult<TrafficAnnouncementModel[]>;

export default function useTrafficAnnouncements(): TrafficAnnouncementsResult {
  const { loading, data, error }: Result = useQuery();

  if (!loading) {
    if (error) {
      return { loading: false, error: toOpaqueError(error) };
    }

    const announcements: TrafficAnnouncementModel[] = [];

    data?.trafficAnnouncements
      .filter((a) => a.id && a.title && a.severity && a.status && a.modesOfTransport)
      .forEach((a) => announcements.push(fromSchemaToModel(a)));

    return { data: announcements, loading: loading };
  }

  return { loading: loading };
}
