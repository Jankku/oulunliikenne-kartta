import { graphql } from '../generated';

export const GET_TRAFFIC_FLUENCY = graphql(`
  query GetTrafficFluencyFeatureCollection {
    trafficFluencyFeatureCollection {
      type
      features {
        type
        geometry
        properties {
          type
          measuredTime
          trafficFlow
        }
      }
    }
  }
`);
