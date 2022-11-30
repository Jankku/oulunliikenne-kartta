import { gql } from '@apollo/client';

export const GET_ROADWORK = gql`
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
`;
