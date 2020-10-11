/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCrop = /* GraphQL */ `
  query GetCrop($id: ID!) {
    getCrop(id: $id) {
      id
      common_name
      scientific_name
      pests
      rooting_depth
      foot_print
      light_needs
      water_needs
      nutrient_needs
      time_in_field
      family
      labor
      profit
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
        common_name
        scientific_name
        pests
        rooting_depth
        foot_print
        light_needs
        water_needs
        nutrient_needs
        time_in_field
        family
        labor
        profit
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
