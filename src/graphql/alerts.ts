import { graphql } from '../generated/gql';
import { minutesToMs } from '../utils/time';

/**
 * API description doesn't mention refresh timing so 5 minutes
 */
const POLL_FREQUENCY = minutesToMs(5);

export const GET_ALERTS = graphql(`
  query GetAllTrafficAnnouncements {
    trafficAnnouncements {
      id
      announcementId
      title {
        fi
        sv
        en
      }
      description {
        fi
        sv
        en
      }
      severity
      status
      startTime
      endTime
      geojson
      modesOfTransport
      class {
        class
        subclass
      }
      trafficDirectionFreeText {
        fi
        sv
        en
      }
      temporarySpeedLimit
      duration
      additionalInfo
      detour
      oversizeLoad
      vehicleSizeLimit
      url
      imageUrls
    }
  }
`);
