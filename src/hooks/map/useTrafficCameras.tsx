import { GetAllCamerasQuery } from '../../generated/graphql';

type TrafficCamera = {
  cameraId: string;
  name: string;
  lat: number;
  lon: number;
};

export default function useTrafficCameras(data: GetAllCamerasQuery | undefined): {
  cameras: TrafficCamera[] | null;
} {
  if (!data) return { cameras: null };

  const validCameras = data.cameras?.filter((c) => c && c.cameraId && c.name && c.lat && c.lon);
  return { cameras: (validCameras as TrafficCamera[]) ?? null };
}
