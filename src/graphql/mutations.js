/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCrop = /* GraphQL */ `
  mutation CreateCrop(
    $input: CreateCropInput!
    $condition: ModelCropConditionInput
  ) {
    createCrop(input: $input, condition: $condition) {
      id
      name
      description
      pests
      rooting_depth
      foot_print
      light_needs
      water_needs
      time_in_field
      family
      labor
      profit
      createdAt
      updatedAt
    }
  }
`;
export const updateCrop = /* GraphQL */ `
  mutation UpdateCrop(
    $input: UpdateCropInput!
    $condition: ModelCropConditionInput
  ) {
    updateCrop(input: $input, condition: $condition) {
      id
      name
      description
      pests
      rooting_depth
      foot_print
      light_needs
      water_needs
      time_in_field
      family
      labor
      profit
      createdAt
      updatedAt
    }
  }
`;
export const deleteCrop = /* GraphQL */ `
  mutation DeleteCrop(
    $input: DeleteCropInput!
    $condition: ModelCropConditionInput
  ) {
    deleteCrop(input: $input, condition: $condition) {
      id
      name
      description
      pests
      rooting_depth
      foot_print
      light_needs
      water_needs
      time_in_field
      family
      labor
      profit
      createdAt
      updatedAt
    }
  }
`;
