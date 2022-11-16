import { graphql } from '../generated/gql';
import { minutesToMs } from '../utils/time';

/**
 * Actual frequency is 5-15 minutes so use 5 minutes
 */
const POLL_FREQUENCY = minutesToMs(5);

export const GET_CAMERAS = graphql(`
  query GetAllCameras {
    cameras {
      cameraId
      name
      lat
      lon
      presets {
        presetId
        presentationName
        imageUrl
        measuredTime
      }
    }
  }
`);
