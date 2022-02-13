import React from "react";
import DesktopDatePicker from "@mui/lab";

export default function DateForm() {
  return (
    <DesktopDatePicker
      label="Date desktop"
      inputFormat="MM/dd/yyyy"
      //value={value}
      //onChange={handleChange}
      //renderInput={(params) => <TextField {...params} />}
    />
  );
}
