import { graphql } from '../generated/gql';
import { minutesToMs } from '../utils/time';

/**
 * Actual frequency is 5-20 minutes so use 5 minutes
 */
const POLL_FREQUENCY = minutesToMs(5);

export const GET_CAR_PARKS = graphql(`
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
`);
