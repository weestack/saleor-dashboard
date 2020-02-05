import gql from "graphql-tag";

import makeMutation from "@saleor/hooks/makeMutation";
import { countryFragment } from "../taxes/queries";
import { shippingMethodFragment, shippingZoneDetailsFragment } from "./queries";
import {
  BulkDeleteShippingRate,
  BulkDeleteShippingRateVariables
} from "./types/BulkDeleteShippingRate";
import {
  BulkDeleteShippingZone,
  BulkDeleteShippingZoneVariables
} from "./types/BulkDeleteShippingZone";
import {
  CreateShippingRate,
  CreateShippingRateVariables
} from "./types/CreateShippingRate";
import {
  CreateShippingZone,
  CreateShippingZoneVariables
} from "./types/CreateShippingZone";
import {
  DeleteShippingRate,
  DeleteShippingRateVariables
} from "./types/DeleteShippingRate";
import {
  DeleteShippingZone,
  DeleteShippingZoneVariables
} from "./types/DeleteShippingZone";
import {
  UpdateDefaultWeightUnit,
  UpdateDefaultWeightUnitVariables
} from "./types/UpdateDefaultWeightUnit";
import {
  UpdateShippingRate,
  UpdateShippingRateVariables
} from "./types/UpdateShippingRate";
import {
  UpdateShippingZone,
  UpdateShippingZoneVariables
} from "./types/UpdateShippingZone";
import {
  AssignShippingZoneToWarehouse,
  AssignShippingZoneToWarehouseVariables
} from "./types/AssignShippingZoneToWarehouse";
import {
  UnassignShippingZoneToWarehouse,
  UnassignShippingZoneToWarehouseVariables
} from "./types/UnassignShippingZoneToWarehouse";

const deleteShippingZone = gql`
  mutation DeleteShippingZone($id: ID!) {
    shippingZoneDelete(id: $id) {
      errors {
        field
        message
      }
    }
  }
`;
export const useShippingZoneDelete = makeMutation<
  DeleteShippingZone,
  DeleteShippingZoneVariables
>(deleteShippingZone);

const bulkDeleteShippingZone = gql`
  mutation BulkDeleteShippingZone($ids: [ID]!) {
    shippingZoneBulkDelete(ids: $ids) {
      errors {
        field
        message
      }
    }
  }
`;
export const useShippingZoneBulkDelete = makeMutation<
  BulkDeleteShippingZone,
  BulkDeleteShippingZoneVariables
>(bulkDeleteShippingZone);

const updateDefaultWeightUnit = gql`
  mutation UpdateDefaultWeightUnit($unit: WeightUnitsEnum) {
    shopSettingsUpdate(input: { defaultWeightUnit: $unit }) {
      errors {
        field
        message
      }
      shop {
        defaultWeightUnit
      }
    }
  }
`;
export const useDefaultWeightUnitUpdate = makeMutation<
  UpdateDefaultWeightUnit,
  UpdateDefaultWeightUnitVariables
>(updateDefaultWeightUnit);

const createShippingZone = gql`
  ${countryFragment}
  mutation CreateShippingZone($input: ShippingZoneInput!) {
    shippingZoneCreate(input: $input) {
      errors {
        field
        message
      }
      shippingZone {
        countries {
          ...CountryFragment
        }
        default
        id
        name
      }
    }
  }
`;
export const useShippingZoneCreate = makeMutation<
  CreateShippingZone,
  CreateShippingZoneVariables
>(createShippingZone);

const updateShippingZone = gql`
  ${countryFragment}
  mutation UpdateShippingZone($id: ID!, $input: ShippingZoneInput!) {
    shippingZoneUpdate(id: $id, input: $input) {
      errors {
        field
        message
      }
      shippingZone {
        countries {
          ...CountryFragment
        }
        default
        id
        name
      }
    }
  }
`;
export const useShippingZoneUpdate = makeMutation<
  UpdateShippingZone,
  UpdateShippingZoneVariables
>(updateShippingZone);

const updateShippingRate = gql`
  ${shippingMethodFragment}
  mutation UpdateShippingRate($id: ID!, $input: ShippingPriceInput!) {
    shippingPriceUpdate(id: $id, input: $input) {
      errors {
        field
        message
      }
      shippingMethod {
        ...ShippingMethodFragment
      }
    }
  }
`;
export const useShippingRateUpdate = makeMutation<
  UpdateShippingRate,
  UpdateShippingRateVariables
>(updateShippingRate);

const createShippingRate = gql`
  ${shippingZoneDetailsFragment}
  mutation CreateShippingRate($input: ShippingPriceInput!) {
    shippingPriceCreate(input: $input) {
      errors {
        field
        message
      }
      shippingZone {
        ...ShippingZoneDetailsFragment
      }
    }
  }
`;
export const useShippingRateCreate = makeMutation<
  CreateShippingRate,
  CreateShippingRateVariables
>(createShippingRate);

const deleteShippingRate = gql`
  ${shippingZoneDetailsFragment}
  mutation DeleteShippingRate($id: ID!) {
    shippingPriceDelete(id: $id) {
      errors {
        field
        message
      }
      shippingZone {
        ...ShippingZoneDetailsFragment
      }
    }
  }
`;
export const useShippingRateDelete = makeMutation<
  DeleteShippingRate,
  DeleteShippingRateVariables
>(deleteShippingRate);

const bulkDeleteShippingRate = gql`
  mutation BulkDeleteShippingRate($ids: [ID]!) {
    shippingPriceBulkDelete(ids: $ids) {
      errors {
        field
        message
      }
    }
  }
`;
export const useShippingRateBulkDelete = makeMutation<
  BulkDeleteShippingRate,
  BulkDeleteShippingRateVariables
>(bulkDeleteShippingRate);

const assignShippingZoneToWarehouse = gql`
  mutation AssignShippingZoneToWarehouse(
    $warehouseId: ID!
    $shippingZoneId: ID!
  ) {
    assignWarehouseShippingZone(
      id: $warehouseId
      shippingZoneIds: [$shippingZoneId]
    ) {
      warehouseErrors {
        code
        field
      }
    }
  }
`;
export const useAassignShippingZoneToWarehouse = makeMutation<
  AssignShippingZoneToWarehouse,
  AssignShippingZoneToWarehouseVariables
>(assignShippingZoneToWarehouse);

const unassignShippingZoneToWarehouse = gql`
  mutation UnassignShippingZoneToWarehouse(
    $warehouseId: ID!
    $shippingZoneId: ID!
  ) {
    unassignWarehouseShippingZone(
      id: $warehouseId
      shippingZoneIds: [$shippingZoneId]
    ) {
      warehouseErrors {
        code
        field
      }
    }
  }
`;
export const useUnassignShippingZoneToWarehouse = makeMutation<
  UnassignShippingZoneToWarehouse,
  UnassignShippingZoneToWarehouseVariables
>(unassignShippingZoneToWarehouse);
