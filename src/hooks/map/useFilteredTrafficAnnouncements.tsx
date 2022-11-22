import {
  GetAllTrafficAnnouncementsQuery,
  TrafficDisruptionModeOfTransport,
  TrafficDisruptionValidityStatus,
} from '../../generated/graphql';

export default function useFilteredTrafficAnnouncements(
  data: GetAllTrafficAnnouncementsQuery | undefined
) {
  const announcements = data?.trafficAnnouncements;
  if (!announcements) return null;

  const carAnnouncements = announcements.filter(
    (a) =>
      a?.modesOfTransport?.includes(TrafficDisruptionModeOfTransport.Car) &&
      a.status !== TrafficDisruptionValidityStatus.Suspended
  );

  return carAnnouncements;
}
