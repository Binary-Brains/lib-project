import React from "react";
import MuiPhoneNumber from "material-ui-phone-number";

export default function PhoneNoField({ value }) {
  return (
    <MuiPhoneNumber
      defaultCountry={"in"}
      variant="outlined"
      fullWidth
      label="Contact No"
      value={value}
      //onChange={handleOnChange}
    />
  );
}
