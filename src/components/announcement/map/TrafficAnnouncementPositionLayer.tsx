import { Geojson } from 'react-native-maps';
import { useTheme } from 'react-native-paper';
import { TrafficAnnouncementFeatureCollection } from '../../../graphql/trafficannouncement';
import type { CustomTheme } from '../../../styles/theme';

type AnnouncementPositionLayerProps = {
  geojson: TrafficAnnouncementFeatureCollection;
};

export default function TrafficAnnouncementPositionLayer({
  geojson,
}: AnnouncementPositionLayerProps) {
  const theme: CustomTheme = useTheme();

  return (
    <Geojson
      geojson={geojson}
      strokeColor={theme.colors.announcement.map.red}
      fillColor={theme.colors.announcement.map.red}
      strokeWidth={8}
    />
  );
}
