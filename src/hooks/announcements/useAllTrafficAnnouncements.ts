import { toOpaqueError } from '../../graphql/error';
import { QueryHookResult } from '../../graphql/result';
import { AllResult, useAllQuery } from '../../graphql/trafficannouncement';
import { fromSchemaToModel, TrafficAnnouncementModel } from '../../models/trafficannouncement';

export type AllTrafficAnnouncementsResult = QueryHookResult<TrafficAnnouncementModel[]>;

export default function useAllTrafficAnnouncements(): AllTrafficAnnouncementsResult {
  const { loading, data, error }: AllResult = useAllQuery();

  if (!loading) {
    if (error) {
      return { loading: false, error: toOpaqueError(error) };
    }

    const announcements: TrafficAnnouncementModel[] = [];

    data?.trafficAnnouncements
      .filter((a) => a.announcementId && a.title && a.severity && a.status && a.modesOfTransport)
      .forEach((a) => announcements.push(fromSchemaToModel(a)));

    return { data: announcements, loading: loading };
  }

  return { loading: loading };
}
