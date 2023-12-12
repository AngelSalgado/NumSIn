export const LIST_TRACKABLETYPE = `query listTrackableType( $limit: Int, $nextToken: String ) {
    listTrackableType( limit: $limit, nextToken: $nextToken ) {
        items {
            id
            name
        }
        nextToken
    }
}`;

export const GET_TRACKABLETYPE = `query getTrackableType( $id: ID! ) {
    getTrackableType( trackableTypeId: $id ) {
        id
        name
        schema
    }
}`;

export const LIST_TRACKABLES = `query listTrackable( $limit: Int, $nextToken: String, $partition: Int ) {
    listTrackable( limit: $limit, nextToken: $nextToken, partition: $partition ) {
        items {
            id
            data
            trackableTypeId
            deviceId
            partition
        }
        nextToken
    }
}`;
export const LIST_TRACKABLE_WITH_DEVICE = `query listTrackableWithDevice( $limit: Int, $nextToken: String, $partition: Int ) {
    listTrackableWithDevice( limit: $limit, nextToken: $nextToken, partition: $partition ) {
        items {
            trackableTypeId
            id
            data
            deviceId
            device {
              data
              description
              deviceTypeId
              parserId
              parentMapperId
              id
              name
              properties
            }
          }
        nextToken
    }
}`;

export const GET_TRACKABLE = `query getTrackable( $id: ID! ) {
    getTrackable( trackableId: $id ) {
        id
        data
        trackableTypeId
    }
}`;

export const GET_TRACKABLE_WITH_DEVICES = `query getTrackableWithDevices( $id: ID! , $partition: Int! ) {
    getTrackableWithDevices(trackableId: $id, partition: $partition) {
      data
      id
      trackableTypeId
      devices {
        data
        description
        deviceTypeId
        trackableId
        id
        mapperId
        name
        parserId
      }
    }
  }`;
export const LIST_MAPPER = `query listMapper( $parserId: ID! , $limit: Int, $nextToken: String ) {
    listMapper( parserId: $parserId, limit: $limit, nextToken: $nextToken ) {
        items {
            id
            name
            description
        }
        nextToken
    }
}`;
export const LIST_PARSER = `query listParser( $limit: Int, $nextToken: String ) {
    listParser( limit: $limit, nextToken: $nextToken ) {
        items {
            id
            name
        }
        nextToken
    }
}`;

export const GET_PARSER_VARIABLES = `query getParserVariables( $id: ID!) {
    getParserVariables( parserId: $id) {
        id
        variables
    }
}`;
export const LIST_DEVICETYPE = `query listDeviceType( $limit: Int, $nextToken: String ) {
    listDeviceType( limit: $limit, nextToken: $nextToken ) {
        items {
            id
            name
        }
        nextToken
    }
}`;

export const GET_DEVICETYPE = `query getDeviceType( $id: ID! ) {
    getDeviceType( deviceTypeId: $id ) {
        id
        name
        schema
    }
}`;
export const LIST_DEVICE = `query listDevice( $limit: Int, $nextToken: String, $partition: Int ) {
    listDevice( limit: $limit, nextToken: $nextToken, partition: $partition ) {
        items {
            id
            parserId
            name
            trackableId
            description
            deviceTypeId
            parentMapperId
        }
        nextToken
    }
}`;

export const GET_DEVICE = `query getDevice( $id: ID!, $parserId: ID! ) {
    getDevice( deviceId: $id, parserId: $parserId ) {
        id
        name
        description
        mapperId
        parserId
        data
        deviceTypeId
    }
}`;
export const GET_DEVICE_SETTINGS = `query getDeviceSettings( $id: ID!, $parserId: ID! ) {
    getDeviceSettings( deviceId: $id, parserId: $parserId ) {
        variables
        core
        special
    }
}`;

export const LIST_VARIABLE = `query listVariable( $limit: Int, $nextToken: String ) {
    listVariable( limit: $limit, nextToken: $nextToken) {
        items {
            name
            description
            dataType
        }
        nextToken
    }
}`;

export const GET_VARIABLE = `query getVariable( $id: String! ) {
    getVariable( name: $id ) {
        name
        description
        dataType
    }
}`;

export const LIST_SYSTEM_MAPPER = `query listSystemMapper( $parserId: ID! , $limit: Int, $nextToken: String ) {
    listSystemMapper( parserId: $parserId, limit: $limit, nextToken: $nextToken ) {
        items {
            id
            name
            description
        }
        nextToken
    }
}`;
export const GET_SYSTEM_MAPPER_SETTINGS = `query getSystemMapperSettings( $id: ID!) {
    getSystemMapperSettings( mapperId: $id ) {
        variables
        core
        special
        info
    }
}`;
