import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import { useIntl } from "react-intl";

import CardTitle from "@saleor/components/CardTitle";
import { FetchMoreProps, SearchProps } from "@saleor/types";
import { FormChange } from "@saleor/hooks/useForm";
import SingleAutocompleteSelectField, {
  SingleAutocompleteChoiceType
} from "@saleor/components/SingleAutocompleteSelectField";

interface VisibilityCardProps extends FetchMoreProps, SearchProps {
  data: Record<"warehouse", string>;
  displayValue: string;
  warehouses: SingleAutocompleteChoiceType[];
  onChange: FormChange;
  onWarehouseAdd: () => void;
}

export const ShippingZoneWarehouses: React.FC<VisibilityCardProps> = props => {
  const {
    data,
    displayValue,
    hasMore,
    loading,
    warehouses,
    onChange,
    onFetchMore,
    onSearchChange,
    onWarehouseAdd
  } = props;
  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Warehouse",
          description: "section header"
        })}
      />
      <CardContent>
        <SingleAutocompleteSelectField
          add={{
            label: intl.formatMessage({
              defaultMessage: "Add New Warehouse",
              description: "button"
            }),
            onClick: onWarehouseAdd
          }}
          choices={warehouses}
          fetchChoices={onSearchChange}
          name="warehouse"
          onChange={onChange}
          onFetchMore={onFetchMore}
          hasMore={hasMore}
          helperText={intl.formatMessage({
            defaultMessage:
              "Select warehouse from which you will ship products for this shipping zone. This warehouse address will also be used to calculate taxes."
          })}
          loading={loading}
          placeholder={intl.formatMessage({
            defaultMessage: "Select Warehouse",
            description: "input placeholder"
          })}
          label={intl.formatMessage({
            defaultMessage: "Warehouse",
            id: "shippingZoneWarehouses.autocomplete.label"
          })}
          displayValue={displayValue}
          value={data.warehouse}
        />
      </CardContent>
    </Card>
  );
};
ShippingZoneWarehouses.displayName = "ShippingZoneWarehouses";
export default ShippingZoneWarehouses;
