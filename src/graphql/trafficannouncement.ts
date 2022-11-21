import { graphql } from '../generated';

export const GET_TRAFFIC_ANNOUNCEMENT = graphql(`
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
