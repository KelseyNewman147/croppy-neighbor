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
      createdAt
      updatedAt
    }
  }
`;
