import { Box, Typography } from "@material-ui/core";
import React from "react";

function Footer() {
  return (
    <>
      <Box sx={{ backgroundColor: "#010606" }}>
        <Typography
          variant="body1"
          color="textPrimary"
          align="center"
          style={{ color: "#fff" }}
        >
          Copyright © Library Desk 2022
        </Typography>
      </Box>
    </>
  );
}

export default Footer;
