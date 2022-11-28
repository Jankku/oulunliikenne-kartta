import { TrafficDisruptionValidityStatus } from '../../generated/graphql';
import {
  TrafficAnnouncementFilters,
  TrafficAnnouncementModel,
} from '../../screens/announcement/TrafficAnnouncement';

export default function useFilteredTrafficAnnouncements(
  announcements: TrafficAnnouncementModel[],
  filters: TrafficAnnouncementFilters
): TrafficAnnouncementModel[] {
  const filtered = announcements.filter((a) => {
    const isCorrectModeOfTransport = a.modesOfTransport.some((mode) =>
      filters.modesOfTransport.includes(mode)
    );
    const isNotSuspended = a.status !== TrafficDisruptionValidityStatus.Suspended;

    return isCorrectModeOfTransport && isNotSuspended;
  });

  return filtersNotEmpty(filters) ? filtered : announcements;
}

const filtersNotEmpty = (filters: TrafficAnnouncementFilters) =>
  filters.modesOfTransport.length > 0;
