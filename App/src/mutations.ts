export const CREATE_TRACKABLETYPE = `mutation createTrackableType(
    $name: String!,
    $schema: [AWSJSON!]!
) {
    createTrackableType(
        name: $name,
        schema: $schema
    ) {
        id
        name
        schema
    }
}`;

export const UPDATE_TRACKABLETYPE = `mutation updateTrackableType(
    $id: ID!,
    $name: String!,
    $schema: [AWSJSON!]!
) {
    updateTrackableType(
        trackableTypeId: $id,
        name: $name,
        schema: $schema
    ) {
        id
        name
        schema
    }
}`;

export const CREATE_TRACKABLE = `mutation createTrackable(
    $trackableType: ID!,
    $deviceId: ID,
    $parserId: ID,
    $data: AWSJSON!
) {
    createTrackable(
        trackableTypeId: $trackableType,
        deviceId: $deviceId,
        parserId: $parserId,
        data: $data
    ) {
        id
        data
    }
}`;

export const UPDATE_TRACKABLE = `mutation updateTrackable(
    $id: ID!,
    $data: AWSJSON!
) {
    updateTrackable(
        trackableId: $id,
        data: $data
    ) {
        id
        data
    }
}`;
export const CREATE_DEVICETYPE = `mutation createDeviceType(
    $name: String!,
    $schema: [AWSJSON!]!
) {
    createDeviceType(
        name: $name,
        schema: $schema
    ) {
        id
        name
        schema
    }
}`;

export const UPDATE_DEVICETYPE = `mutation updateDeviceType(
    $id: ID!,
    $name: String!,
    $schema: [AWSJSON!]!
) {
    updateDeviceType(
        deviceTypeId: $id,
        name: $name,
        schema: $schema
    ) {
        id
        name
        schema
    }
}`;

export const CREATE_DEVICE = `mutation createDevice($input: CreateDeviceInput!) {
    createDevice(input: $input) {
        id
        parserId
        name
        deviceTypeId
        parentMapperId
        data
    }
  }`;

export const UPDATE_DEVICE = `mutation updateDevice(
    $id: ID!,
    $parserId: ID!,
    $data: AWSJSON!
) {
    updateDevice(
        deviceId: $id,
        parserId: $parserId,
        data: $data
    ) {
        id
        parserId
        data
    }
}`;
export const UPDATE_DEVICE_SETTINGS = `mutation updateDeviceSettings(
    $id: ID!,
    $parserId: ID!,
    $variables: String!
    $special: String!
) {
    updateDeviceSettings(
        deviceId: $id,
        parserId: $parserId,
        variables: $variables,
        special: $special
    ) {
        core
        variables
        special
    }
}`;

export const LINK_DEVICE = `mutation linkDevice(
    $id: ID!,
    $parserId: ID!,
    $mapperId: ID!,
    $trackableId: ID!
) {
    linkDevice(
        deviceId: $id,
        parserId: $parserId,
        mapperId: $mapperId
        trackableId: $trackableId
    ) {
        id
        name
        description
    }
}`;

export const UNLINK_DEVICE = `mutation unlinkDevice(
    $id: ID!,
    $parserId: ID!
) {
    unlinkDevice(
        deviceId: $id,
        parserId: $parserId,
    ) {
        id
        parserId
    }
}`;
export const UPDATE_VARIABLE = `mutation updateVariable(
    $name: String!,
    $description: String
) {
    updateVariable(
        name: $name,
        description: $description
    ) {
        name
        description
        dataType
    }
}`;

export const CREATE_VARIABLE = `mutation createVariable(
    $name: String!,
    $description: String,
    $dataType: String!
) {
    createVariable(
        name: $name,
        description: $description,
        dataType: $dataType
    ) {
        name
        description
        dataType
    }
}`;
export const DELETE_VARIABLE = `mutation deleteVariable(
    $name: String!
) {
    deleteVariable(
        name: $name
    ) {
        name
        description
        dataType
    }
}`;
