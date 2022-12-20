import { Geojson } from 'react-native-maps';
import { useTheme } from 'react-native-paper';
import { TrafficAnnouncementFeatureCollection } from '../../../graphql/trafficannouncement';
import type { CustomTheme } from '../../../styles/theme';

type AnnouncementDetourLayerProps = {
  detour: TrafficAnnouncementFeatureCollection;
};

export default function TrafficAnnouncementDetourLayer({ detour }: AnnouncementDetourLayerProps) {
  const theme: CustomTheme = useTheme();

  return (
    <>
      {detour ? (
        <Geojson
          geojson={detour}
          strokeColor={theme.colors.announcement.map.green}
          strokeWidth={8}
        />
      ) : null}
    </>
  );
}
