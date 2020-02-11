import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import AppHeader from "@saleor/components/AppHeader";
import CardSpacer from "@saleor/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import CountryList from "@saleor/components/CountryList";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import { maybe } from "../../../misc";
import { UserError, FetchMoreProps, SearchProps } from "../../../types";
import { ShippingMethodTypeEnum } from "../../../types/globalTypes";
import {
  ShippingZoneDetailsFragment,
  ShippingZoneDetailsFragment_warehouses
} from "../../types/ShippingZoneDetailsFragment";
import ShippingZoneInfo from "../ShippingZoneInfo";
import ShippingZoneRates from "../ShippingZoneRates";
import ShippingZoneWarehouses from "../ShippingZoneWarehouses";

export interface FormData {
  name: string;
  warehouse: string;
}

export interface ShippingZoneDetailsPageProps
  extends FetchMoreProps,
    SearchProps {
  disabled: boolean;
  errors: UserError[];
  saveButtonBarState: ConfirmButtonTransitionState;
  shippingZone: ShippingZoneDetailsFragment;
  warehouses: ShippingZoneDetailsFragment_warehouses[];
  onBack: () => void;
  onCountryAdd: () => void;
  onCountryRemove: (code: string) => void;
  onDelete: () => void;
  onPriceRateAdd: () => void;
  onPriceRateEdit: (id: string) => void;
  onRateRemove: (rateId: string) => void;
  onSubmit: (data: FormData) => void;
  onWarehouseAdd: () => void;
  onWeightRateAdd: () => void;
  onWeightRateEdit: (id: string) => void;
}

const ShippingZoneDetailsPage: React.FC<ShippingZoneDetailsPageProps> = ({
  disabled,
  errors,
  hasMore,
  loading,
  onBack,
  onCountryAdd,
  onCountryRemove,
  onDelete,
  onFetchMore,
  onPriceRateAdd,
  onPriceRateEdit,
  onRateRemove,
  onSearchChange,
  onSubmit,
  onWarehouseAdd,
  onWeightRateAdd,
  onWeightRateEdit,
  saveButtonBarState,
  shippingZone,
  warehouses
}) => {
  const intl = useIntl();

  const initialForm: FormData = {
    name: maybe(() => shippingZone.name, ""),
    warehouse: maybe(() => shippingZone.warehouses[0].id, "")
  };
  const [warehouseDisplayValue, setWarehouseDisplayValue] = useStateFromProps(
    maybe(() => shippingZone.warehouses[0].name, "")
  );

  const warehouseChoices = warehouses.map(w => ({
    label: w.name,
    value: w.id
  }));

  return (
    <Form errors={errors} initial={initialForm} onSubmit={onSubmit}>
      {({ change, data, errors: formErrors, hasChanged, submit }) => {
        const handleWarehouseChange = createSingleAutocompleteSelectHandler(
          change,
          setWarehouseDisplayValue,
          warehouseChoices
        );

        return (
          <Container>
            <AppHeader onBack={onBack}>
              <FormattedMessage defaultMessage="Shipping" />
            </AppHeader>
            <PageHeader title={maybe(() => shippingZone.name)} />
            <Grid>
              <div>
                <ShippingZoneInfo
                  data={data}
                  errors={formErrors}
                  onChange={change}
                />
                <CardSpacer />
                <CountryList
                  countries={maybe(() => shippingZone.countries)}
                  disabled={disabled}
                  emptyText={maybe(
                    () =>
                      shippingZone.default
                        ? intl.formatMessage({
                            defaultMessage:
                              "This is default shipping zone, which means that it covers all of the countries which are not assigned to other shipping zones"
                          })
                        : intl.formatMessage({
                            defaultMessage:
                              "Currently, there are no countries assigned to this shipping zone"
                          }),
                    "..."
                  )}
                  onCountryAssign={onCountryAdd}
                  onCountryUnassign={onCountryRemove}
                  title={intl.formatMessage({
                    defaultMessage: "Countries"
                  })}
                />
                <CardSpacer />
                <ShippingZoneRates
                  disabled={disabled}
                  onRateAdd={onPriceRateAdd}
                  onRateEdit={onPriceRateEdit}
                  onRateRemove={onRateRemove}
                  rates={maybe(() =>
                    shippingZone.shippingMethods.filter(
                      method => method.type === ShippingMethodTypeEnum.PRICE
                    )
                  )}
                  variant="price"
                />
                <CardSpacer />
                <ShippingZoneRates
                  disabled={disabled}
                  onRateAdd={onWeightRateAdd}
                  onRateEdit={onWeightRateEdit}
                  onRateRemove={onRateRemove}
                  rates={maybe(() =>
                    shippingZone.shippingMethods.filter(
                      method => method.type === ShippingMethodTypeEnum.WEIGHT
                    )
                  )}
                  variant="weight"
                />
              </div>
              <div>
                <ShippingZoneWarehouses
                  data={data}
                  displayValue={warehouseDisplayValue}
                  hasMore={hasMore}
                  loading={loading}
                  warehouses={warehouseChoices}
                  onChange={handleWarehouseChange}
                  onFetchMore={onFetchMore}
                  onSearchChange={onSearchChange}
                  onWarehouseAdd={onWarehouseAdd}
                />
              </div>
            </Grid>
            <SaveButtonBar
              disabled={disabled || !hasChanged}
              onCancel={onBack}
              onDelete={onDelete}
              onSave={submit}
              state={saveButtonBarState}
            />
          </Container>
        );
      }}
    </Form>
  );
};
ShippingZoneDetailsPage.displayName = "ShippingZoneDetailsPage";
export default ShippingZoneDetailsPage;
