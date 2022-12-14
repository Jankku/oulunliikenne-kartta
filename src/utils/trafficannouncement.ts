import { RoadworkFilters } from '../screens/announcement/RoadWork';
import type { TrafficAnnouncementFilters } from '../screens/announcement/TrafficAnnouncement';

export const isFilterNotEmpty = (filter: unknown[]) => filter.length !== 0;

export const isAllFiltersEmpty = (filters: TrafficAnnouncementFilters | RoadworkFilters) =>
  Object.values(filters).every((arr) => arr.length === 0);
