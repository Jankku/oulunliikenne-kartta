import { Geojson } from 'react-native-maps';
import { TrafficAnnouncementFeatureCollection } from '../../../graphql/trafficannouncement';

type AnnouncementDetourLayerProps = {
  detour: TrafficAnnouncementFeatureCollection;
};

export default function TrafficAnnouncementDetourLayer({ detour }: AnnouncementDetourLayerProps) {
  return (
    <>
      {detour ? (
        <Geojson geojson={detour} strokeColor={'rgba(0, 255, 0, 0.5)'} strokeWidth={15} />
      ) : null}
    </>
  );
}
