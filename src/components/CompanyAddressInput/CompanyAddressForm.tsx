import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useIntl } from "react-intl";

import FormSpacer from "@saleor/components/FormSpacer";
import Grid from "@saleor/components/Grid";
import SingleAutocompleteSelectField, {
  SingleAutocompleteChoiceType
} from "@saleor/components/SingleAutocompleteSelectField";
import { AddressTypeInput } from "@saleor/customers/types";
import { ChangeEvent } from "@saleor/hooks/useForm";
import { FormErrors } from "@saleor/types";

export interface CompanyAddressFormProps {
  countries: SingleAutocompleteChoiceType[];
  data: AddressTypeInput;
  displayCountry: string;
  errors: FormErrors<keyof AddressTypeInput>;
  disabled: boolean;
  onChange: (event: ChangeEvent) => void;
  onCountryChange: (event: ChangeEvent) => void;
}

const useStyles = makeStyles(
  {
    root: {}
  },
  { name: "CompanyAddressForm" }
);

const CompanyAddressForm: React.FC<CompanyAddressFormProps> = props => {
  const {
    countries,
    data,
    disabled,
    displayCountry,
    errors,
    onChange,
    onCountryChange
  } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <div className={classes.root}>
      <TextField
        disabled={disabled}
        error={!!errors.companyName}
        helperText={errors.companyName}
        label={intl.formatMessage({
          defaultMessage: "Company"
        })}
        name={"companyName" as keyof AddressTypeInput}
        onChange={onChange}
        value={data.companyName}
        fullWidth
      />
      <FormSpacer />
      <TextField
        disabled={disabled}
        error={!!errors.streetAddress1}
        helperText={errors.streetAddress1}
        label={intl.formatMessage({
          defaultMessage: "Address line 1"
        })}
        name={"streetAddress1" as keyof AddressTypeInput}
        onChange={onChange}
        value={data.streetAddress1}
        fullWidth
      />
      <FormSpacer />
      <TextField
        disabled={disabled}
        error={!!errors.streetAddress2}
        helperText={errors.streetAddress2}
        label={intl.formatMessage({
          defaultMessage: "Address line 2"
        })}
        name={"streetAddress2" as keyof AddressTypeInput}
        onChange={onChange}
        value={data.streetAddress2}
        fullWidth
      />
      <FormSpacer />
      <Grid>
        <TextField
          disabled={disabled}
          error={!!errors.city}
          helperText={errors.city}
          label={intl.formatMessage({
            defaultMessage: "City"
          })}
          name={"city" as keyof AddressTypeInput}
          onChange={onChange}
          value={data.city}
          fullWidth
        />
        <TextField
          disabled={disabled}
          error={!!errors.postalCode}
          helperText={errors.postalCode}
          label={intl.formatMessage({
            defaultMessage: "ZIP / Postal code"
          })}
          name={"postalCode" as keyof AddressTypeInput}
          onChange={onChange}
          value={data.postalCode}
          fullWidth
        />
      </Grid>
      <FormSpacer />
      <Grid>
        <SingleAutocompleteSelectField
          disabled={disabled}
          displayValue={displayCountry}
          error={!!errors.country}
          helperText={errors.country}
          label={intl.formatMessage({
            defaultMessage: "Country"
          })}
          name={"country" as keyof AddressTypeInput}
          onChange={onCountryChange}
          value={data.country}
          choices={countries}
          InputProps={{
            inputProps: {
              autoComplete: "plsdontautocomplete" // Somehow it shuts it down
            }
          }}
        />
        <TextField
          disabled={disabled}
          error={!!errors.countryArea}
          helperText={errors.countryArea}
          label={intl.formatMessage({
            defaultMessage: "Country area"
          })}
          name={"countryArea" as keyof AddressTypeInput}
          onChange={onChange}
          value={data.countryArea}
          fullWidth
        />
      </Grid>
      <FormSpacer />
      <TextField
        disabled={disabled}
        error={!!errors.phone}
        fullWidth
        helperText={errors.phone}
        label={intl.formatMessage({
          defaultMessage: "Phone"
        })}
        name={"phone" as keyof AddressTypeInput}
        value={data.phone}
        onChange={onChange}
      />
    </div>
  );
};
CompanyAddressForm.displayName = "CompanyAddressForm";
export default CompanyAddressForm;
