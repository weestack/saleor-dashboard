import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import { useIntl } from "react-intl";

import CardTitle from "@saleor/components/CardTitle";
import { FetchMoreProps } from "@saleor/types";
import { FormChange } from "@saleor/hooks/useForm";
import SingleAutocompleteSelectField, {
  SingleAutocompleteChoiceType
} from "@saleor/components/SingleAutocompleteSelectField";

interface VisibilityCardProps extends FetchMoreProps {
  data: Record<"warehouse", string>;
  displayValue: string;
  warehouses: SingleAutocompleteChoiceType[];
  onChange: FormChange;
}

export const ShippingZoneWarehouses: React.FC<VisibilityCardProps> = props => {
  const {
    data,
    displayValue,
    hasMore,
    loading,
    onChange,
    onFetchMore,
    warehouses
  } = props;
  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Visibility",
          description: "section header"
        })}
      />
      <CardContent>
        <SingleAutocompleteSelectField
          choices={warehouses}
          name="warehouse"
          onChange={onChange}
          displayValue={displayValue}
          value={data.warehouse}
        />
      </CardContent>
    </Card>
  );
};
ShippingZoneWarehouses.displayName = "ShippingZoneWarehouses";
export default ShippingZoneWarehouses;
