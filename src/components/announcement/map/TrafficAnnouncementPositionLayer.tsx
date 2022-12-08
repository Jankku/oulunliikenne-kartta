import { Geojson } from 'react-native-maps';
import { TrafficAnnouncementFeatureCollection } from '../../../graphql/trafficannouncement';

type AnnouncementPositionLayerProps = {
  geojson: TrafficAnnouncementFeatureCollection;
};

export default function TrafficAnnouncementPositionLayer({
  geojson,
}: AnnouncementPositionLayerProps) {
  return (
    <Geojson
      geojson={geojson}
      strokeColor={'rgba(200, 0, 0, 0.7)'}
      fillColor={'rgba(200, 0, 0, 0.5)'}
      strokeWidth={8}
    />
  );
}
