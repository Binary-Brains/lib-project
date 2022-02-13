import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import aboutus from "../../assests/aboutus.svg";
import { Grid } from "@mui/material";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  aboutUsCont: {
    marginTop: "60px",
    display: "flex",
    alignItems: "center",
    marginBottom: "60px",
    ["@media (max-width:900px)"]: {
      flexDirection: "column-reverse",
    },
  },
  infoImg: {
    height: "300px",
    width: "100%",
    ["@media (max-width:900px)"]: {
      height: "280px",
      width: "100%",
    },
  },
  aboutUsTitle: {
    marginLeft: "60px",
    marginRight: "60px",
    ["@media (max-width:900px)"]: {
      marginLeft: "30px",
      marginRight: "30px",
    },
  },
}));

export default function AboutUs() {
  const classes = useStyles();
  return (
    <div id="aboutus">
      <Grid container sx={{ marginTop: "25px" }}>
        <Grid item xs={12} sm={12} md={6}>
          <h1
            style={{
              marginLeft: "60px",
              marginRight: "60px",
              textDecoration: "underline",
              ["@media (max-width:900px)"]: {
                marginLeft: "30px",
                marginRight: "30px",
              },
            }}
          >
            About Us
          </h1>
        </Grid>
      </Grid>
      <Grid container className={classes.aboutUsCont}>
        <Grid item xs={12} sm={12} md={6}>
          <h1 className={classes.aboutUsTitle}>
            We are the team{" "}
            <span style={{ textDecoration: "underline" }}>Binary Brains</span>{" "}
            passionate about building innovative softwares.
          </h1>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <img src={aboutus} className={classes.infoImg} alt="About Us" />
        </Grid>
      </Grid>
    </div>
  );
}
