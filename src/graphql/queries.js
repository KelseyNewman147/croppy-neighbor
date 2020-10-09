/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCrop = /* GraphQL */ `
  query GetCrop($id: ID!) {
    getCrop(id: $id) {
      id
      name
      description
      pests
      createdAt
      updatedAt
    }
  }
`;
export const listCrops = /* GraphQL */ `
  query ListCrops(
    $filter: ModelCropFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCrops(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        pests
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
