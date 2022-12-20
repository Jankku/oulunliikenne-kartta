import { Geojson } from 'react-native-maps';
import { useTheme } from 'react-native-paper';
import type { CustomTheme } from '../../styles/theme';
import useTrafficFluencyCollections from '../../hooks/map/useTrafficFluencyCollections';
import {
  TrafficFlow,
  TrafficFluencyCollectionModel,
  ValidTrafficFlowValues,
} from '../../models/trafficflow';

type Line = {
  color: string;
  strokeWidth: number;
};

type ColorInfo = {
  [T in ValidTrafficFlowValues]: Line;
};

function TrafficFluencyLayer() {
  const theme: CustomTheme = useTheme();
  const result = useTrafficFluencyCollections();

  const lineStyle: ColorInfo = {
    [TrafficFlow.TrafficFlowNormal]: { color: theme.colors.trafficFluency.green, strokeWidth: 4 },
    [TrafficFlow.TrafficHeavierThanNormal]: {
      color: theme.colors.trafficFluency.orange,
      strokeWidth: 5,
    },
    [TrafficFlow.TrafficMuchHeavierThanNormal]: {
      color: theme.colors.trafficFluency.red,
      strokeWidth: 5,
    },
  };

  //Do not render anything if still loading or got an error
  if (result.loading || result.error) {
    return null;
  }
  const { data } = result;

  return (
    <>
      {toGeoJson(data, TrafficFlow.TrafficFlowNormal, lineStyle)}
      {toGeoJson(data, TrafficFlow.TrafficHeavierThanNormal, lineStyle)}
      {toGeoJson(data, TrafficFlow.TrafficMuchHeavierThanNormal, lineStyle)}
    </>
  );
}

function toGeoJson(
  data: TrafficFluencyCollectionModel,
  which: ValidTrafficFlowValues,
  lineStyle: ColorInfo
): JSX.Element[] {
  return data[which].map((entry) => {
    const { color, strokeWidth } = lineStyle[which];

    return (
      <Geojson
        key={entry.id}
        geojson={entry.geometry}
        strokeColor={color}
        fillColor={color}
        strokeWidth={strokeWidth}
      />
    );
  });
}

export default TrafficFluencyLayer;
