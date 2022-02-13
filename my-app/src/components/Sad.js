import React from "react";
import SadLogo from "../assests/sad.png";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  ImageList,
} from "@mui/material";
import { Typography } from "@material-ui/core";

export const Sad = () => {
  return (
    <Grid>
      <img src={SadLogo} alt="Not Found" />
      <div>We are working hard to bring all of your nearby libraries!</div>
    </Grid>
  );
};
