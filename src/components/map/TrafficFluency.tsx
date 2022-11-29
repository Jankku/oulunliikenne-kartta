import { Geojson } from 'react-native-maps';
import useTrafficFluencyCollections from '../../hooks/map/useTrafficFluencyCollections';
import { TrafficFlow, TrafficFluencyCollectionModel, ValidTrafficFlowValues } from '../../models/trafficflow';


type Line = {
  color : string
  strokeWidth : number
}

type ColorInfo = {
  [T in ValidTrafficFlowValues] : Line
}

//TODO: define these in a style
const lineInfo : ColorInfo = {
  [TrafficFlow.TrafficFlowNormal] : { color : 'green', strokeWidth : 4},
  [TrafficFlow.TrafficHeavierThanNormal] :  { color : 'orange', strokeWidth : 2},
  [TrafficFlow.TrafficMuchHeavierThanNormal] :  { color : 'red', strokeWidth : 2},
}

function TrafficFluencyLayer() {
  const result = useTrafficFluencyCollections();

  //Do not render anything if still loading or got an error
  if(result.loading || result.error) {
    return null;
  }
  const {data} = result;

  return (
    <>
    {toGeoJson(data,TrafficFlow.TrafficFlowNormal)} 
    {toGeoJson(data,TrafficFlow.TrafficHeavierThanNormal)}
    {toGeoJson(data,TrafficFlow.TrafficMuchHeavierThanNormal)} 
    </>
  );
}

function toGeoJson(data : TrafficFluencyCollectionModel, which: ValidTrafficFlowValues) : JSX.Element[] {
  return data[which].map((entry) => {
    const {color, strokeWidth} = lineInfo[which];
  
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
