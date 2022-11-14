import { gql } from '@apollo/client';
import { minutesToMs } from '../utils/time';

/**
 * Actual frequency is 5-20 minutes so use 5 minutes
 */
const POLL_FREQUENCY = minutesToMs(5);

const QUERY = gql`
  query GetAllCarParks {
    carParks {
      carParkId
      name
      lat
      lon
      maxCapacity
      spacesAvailable
    }
  }
`;
