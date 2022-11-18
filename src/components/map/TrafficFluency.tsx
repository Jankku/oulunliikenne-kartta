import { useQuery } from '@apollo/client';
import { Geojson } from 'react-native-maps';
import { GET_TRAFFIC_FLUENCY } from '../../graphql/traffic-fluency';
import useTrafficFluencyCollections from '../../hooks/map/useTrafficFluencyCollections';

function TrafficFluency() {
  const { data } = useQuery(GET_TRAFFIC_FLUENCY);
  const { collections } = useTrafficFluencyCollections(data);

  return (
    <>
      {collections
        ? Object.keys(collections).map((key) => {
            const collection = collections[key as keyof typeof collections];
            if (collection === null) return;

            return (
              <Geojson
                key={key}
                geojson={collection.trafficFluencyFeatureCollection as GeoJSON.FeatureCollection}
                strokeColor={key}
                fillColor={key}
                strokeWidth={key !== 'green' ? 4 : 2}
              />
            );
          })
        : null}
    </>
  );
}

export default TrafficFluency;
