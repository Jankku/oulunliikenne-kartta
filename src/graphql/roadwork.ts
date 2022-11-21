import { graphql } from '../generated';

export const GET_ROADWORK = graphql(`
  query GetAllRoadworks {
    roadworks {
      id
      roadworkId
      severity
      status
      startTime
      endTime
      description {
        fi
      }
      geojson
    }
  }
`);
