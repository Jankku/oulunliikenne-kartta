import { Geojson } from 'react-native-maps';
import { TrafficAnnouncementFeatureCollection } from '../../../graphql/trafficannouncement';

type AnnouncementPositionLayerProps = {
  geojson: TrafficAnnouncementFeatureCollection;
};

export default function TrafficAnnouncementPositionLayer({
  geojson,
}: AnnouncementPositionLayerProps) {
  return <Geojson geojson={geojson} strokeColor={'rgba(255, 0, 0, 0.5)'} strokeWidth={20} />;
}
